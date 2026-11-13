import mongoose from "mongoose";
import Waitlist from "../models/Waitlist.js";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_DATA_FILE = path.join(__dirname, "..", "data", "signups.json");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Helper for local JSON fallback when MongoDB is offline
async function getLocalSignups() {
  try {
    const raw = await fs.readFile(LOCAL_DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveLocalSignup(entry) {
  try {
    await fs.mkdir(path.dirname(LOCAL_DATA_FILE), { recursive: true });
    const list = await getLocalSignups();
    if (!list.some((s) => s.email === entry.email)) {
      list.push(entry);
      await fs.writeFile(LOCAL_DATA_FILE, JSON.stringify(list, null, 2));
    }
    return list.length;
  } catch (err) {
    console.error("Local backup error:", err);
    return 1;
  }
}

/**
 * POST /api/join
 * Register a new email onto the waitlist
 */
export async function joinWaitlist(req, res) {
  try {
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const interest = String(req.body?.interest ?? "").trim().slice(0, 500);

    // Validation
    if (!email || !EMAIL_RE.test(email) || email.length > 254) {
      return res.status(400).json({
        ok: false,
        error: "Please enter a valid email address.",
      });
    }

    const ipAddress = req.ip || req.headers["x-forwarded-for"] || null;
    const userAgent = req.headers["user-agent"] || null;

    // ─── 1. Primary: Save to MongoDB via Mongoose ───
    if (mongoose.connection.readyState === 1) {
      // Check if email already enrolled
      const existing = await Waitlist.findOne({ email }).lean();
      if (existing) {
        const total = await Waitlist.countDocuments({ status: { $ne: "unsubscribed" } });
        return res.status(200).json({
          ok: true,
          message: "You're already on the waitlist.",
          count: total,
        });
      }

      // Create new waitlist document
      const newEntry = await Waitlist.create({
        email,
        interest,
        ipAddress: String(ipAddress),
        userAgent: String(userAgent),
      });

      const total = await Waitlist.countDocuments({ status: { $ne: "unsubscribed" } });
      console.log(`✨ [New Waitlist Entry]: ${email} (Total in MongoDB: ${total})`);

      return res.status(201).json({
        ok: true,
        message: "You're on the waitlist. We'll be in touch soon.",
        count: total,
        id: newEntry._id,
      });
    }

    // ─── 2. Fallback: Save to local store if DB connection is pending ───
    console.warn("⚠️  [MongoDB not connected]: Storing waitlist entry in local data store.");
    const count = await saveLocalSignup({
      email,
      interest,
      createdAt: new Date().toISOString(),
      ipAddress,
      userAgent,
    });

    return res.status(201).json({
      ok: true,
      message: "You're on the waitlist. We'll be in touch soon.",
      count,
    });
  } catch (error) {
    // Handle duplicate key error if race condition occurs
    if (error.code === 11000) {
      const count = await Waitlist.countDocuments({ status: { $ne: "unsubscribed" } });
      return res.status(200).json({
        ok: true,
        message: "You're already on the waitlist.",
        count,
      });
    }

    console.error("❌ [Waitlist join error]:", error);
    return res.status(500).json({
      ok: false,
      error: "Something went wrong while processing your request. Please try again.",
    });
  }
}

/**
 * GET /api/count
 * Retrieve current dynamic waitlist count
 */
export async function getWaitlistCount(req, res) {
  try {
    if (mongoose.connection.readyState === 1) {
      const count = await Waitlist.countDocuments({ status: { $ne: "unsubscribed" } });
      return res.status(200).json({ ok: true, count });
    }

    // Fallback count
    const local = await getLocalSignups();
    return res.status(200).json({ ok: true, count: local.length });
  } catch (error) {
    console.error("❌ [Waitlist count error]:", error);
    return res.status(200).json({ ok: true, count: 0 });
  }
}

/**
 * GET /api/health
 * Service and database health probe
 */
export function getHealth(req, res) {
  const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];
  const dbState = dbStates[mongoose.connection.readyState] || "unknown";

  res.status(200).json({
    ok: true,
    service: "streamline-api",
    database: {
      type: "mongodb",
      status: dbState,
      connected: mongoose.connection.readyState === 1,
    },
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}
