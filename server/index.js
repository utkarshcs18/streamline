import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const SIGNUPS_FILE = path.join(DATA_DIR, "signups.json");

const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.WEB_ORIGIN || "http://localhost:3000";

const app = express();
app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001"] }));
app.use(express.json({ limit: "16kb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many requests. Please try again later." },
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const BASE_WAITLIST_COUNT = 0;

async function readSignups() {
  try {
    return JSON.parse(await fs.readFile(SIGNUPS_FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeSignups(list) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(SIGNUPS_FILE, JSON.stringify(list, null, 2));
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "streamline-api" });
});

app.get("/api/count", async (_req, res) => {
  try {
    const list = await readSignups();
    res.json({ ok: true, count: BASE_WAITLIST_COUNT + list.length });
  } catch {
    res.json({ ok: true, count: BASE_WAITLIST_COUNT });
  }
});

app.post("/api/join", limiter, async (req, res) => {
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const interest = String(req.body?.interest ?? "").trim().slice(0, 500);

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email." });
  }

  try {
    const list = await readSignups();
    if (list.some((s) => s.email === email)) {
      return res.json({
        ok: true,
        message: "You're already on the waitlist.",
        count: BASE_WAITLIST_COUNT + list.length,
      });
    }
    list.push({ email, interest, createdAt: new Date().toISOString() });
    await writeSignups(list);
    return res.status(201).json({
      ok: true,
      message: "You're on the waitlist. We'll be in touch soon.",
      count: BASE_WAITLIST_COUNT + list.length,
    });
  } catch (err) {
    console.error("signup failed", err);
    return res.status(500).json({ ok: false, error: "Something went wrong. Try again." });
  }
});

app.listen(PORT, () => {
  console.log(`streamline-api listening on http://localhost:${PORT}`);
});
