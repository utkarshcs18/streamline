import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Waitlist from "@/models/Waitlist";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const dataDir = path.join(process.cwd(), "..", "server", "data");
const signupsFile = path.join(dataDir, "signups.json");

function getLocalSignups(): Array<{ email: string; interest?: string; createdAt: string }> {
  try {
    if (!fs.existsSync(signupsFile)) return [];
    const content = fs.readFileSync(signupsFile, "utf-8").trim();
    if (!content) return [];
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalSignups(data: unknown) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(signupsFile, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write local backup:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const interest = String(body?.interest ?? "").trim().slice(0, 500);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email." },
        { status: 400 }
      );
    }

    // ─── 1. MongoDB Mongoose Integration ───
    const hasDB = await connectToDatabase();
    if (hasDB) {
      const existing = await Waitlist.findOne({ email }).lean();
      if (existing) {
        const count = await Waitlist.countDocuments({ status: { $ne: "unsubscribed" } });
        return NextResponse.json({
          ok: true,
          message: "You're already on the waitlist.",
          count,
        });
      }

      await Waitlist.create({ email, interest });
      const count = await Waitlist.countDocuments({ status: { $ne: "unsubscribed" } });

      return NextResponse.json(
        {
          ok: true,
          message: "You're on the waitlist. We'll be in touch soon.",
          count,
        },
        { status: 201 }
      );
    }

    // ─── 2. Local Fallback (if MONGODB_URI not set yet) ───
    const list = getLocalSignups();
    if (list.some((s) => s.email === email)) {
      return NextResponse.json({
        ok: true,
        message: "You're already on the waitlist.",
        count: list.length,
      });
    }

    list.push({ email, interest, createdAt: new Date().toISOString() });
    saveLocalSignups(list);

    return NextResponse.json(
      {
        ok: true,
        message: "You're on the waitlist. We'll be in touch soon.",
        count: list.length,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Join route error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
