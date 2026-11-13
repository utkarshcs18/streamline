import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "..", "server", "data");
const signupsFile = path.join(dataDir, "signups.json");

function getSignups(): Array<{ email: string; interest?: string; createdAt: string }> {
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

function saveSignups(data: unknown) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(signupsFile, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write signups:", err);
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

    const list = getSignups();
    if (list.some((s) => s.email === email)) {
      return NextResponse.json({
        ok: true,
        message: "You're already on the waitlist.",
        count: list.length,
      });
    }

    list.push({ email, interest, createdAt: new Date().toISOString() });
    saveSignups(list);

    return NextResponse.json(
      {
        ok: true,
        message: "You're on the waitlist. We'll be in touch soon.",
        count: list.length,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
