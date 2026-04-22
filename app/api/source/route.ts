import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { isAdminRequest } from "@/lib/admin-auth";

const ROOT = process.cwd();
const BLOCKED_DIRS = new Set([".git", "node_modules", ".next", ".cursor"]);
const BLOCKED_FILES = [".env", ".env.local", ".env.production"];

async function walk(dir: string, base = ""): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    if (BLOCKED_DIRS.has(entry.name)) continue;
    const rel = path.join(base, entry.name).replace(/\\/g, "/");
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full, rel)));
    } else if (!BLOCKED_FILES.some((blocked) => rel.includes(blocked))) {
      files.push(rel);
    }
  }
  return files;
}

export async function GET(req: Request) {
  try {
    if (!isAdminRequest(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const file = searchParams.get("file");
    if (!file) {
      const files = await walk(ROOT);
      return NextResponse.json({ files: files.sort() });
    }

    const target = path.resolve(ROOT, file);
    if (!target.startsWith(ROOT)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }
    const content = await fs.readFile(target, "utf8");
    return NextResponse.json({ file, content });
  } catch (error) {
    return NextResponse.json({ error: "Unable to read source" }, { status: 500 });
  }
}
