import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "..", "server", "data");
const signupsFile = path.join(dataDir, "signups.json");

export async function GET() {
  let count = 0;
  try {
    if (fs.existsSync(signupsFile)) {
      const raw = fs.readFileSync(signupsFile, "utf-8").trim();
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) count = parsed.length;
    }
  } catch {
    count = 0;
  }

  return NextResponse.json({ ok: true, count });
}
