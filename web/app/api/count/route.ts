import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Waitlist from "@/models/Waitlist";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const dataDir = path.join(process.cwd(), "..", "server", "data");
const signupsFile = path.join(dataDir, "signups.json");

export async function GET() {
  try {
    // ─── 1. MongoDB Count ───
    const hasDB = await connectToDatabase();
    if (hasDB) {
      const count = await Waitlist.countDocuments({ status: { $ne: "unsubscribed" } });
      return NextResponse.json({ ok: true, count });
    }

    // ─── 2. Local fallback count ───
    let count = 0;
    if (fs.existsSync(signupsFile)) {
      const raw = fs.readFileSync(signupsFile, "utf-8").trim();
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) count = parsed.length;
    }
    return NextResponse.json({ ok: true, count });
  } catch (err) {
    console.error("Count route error:", err);
    return NextResponse.json({ ok: true, count: 0 });
  }
}
