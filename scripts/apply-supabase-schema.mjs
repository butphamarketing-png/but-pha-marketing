import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error(
    "Thiếu SUPABASE_DATABASE_URL.\n" +
      "Lấy tại: https://supabase.com/dashboard/project/ogfiaimloatwttcrwmub/settings/database\n" +
      "→ Connection string → URI (chế độ Session) → dán vào .env.local\n" +
      "Hoặc chạy scripts/supabase-schema.sql trong SQL Editor.",
  );
  process.exit(1);
}

const sql = fs.readFileSync(path.join(root, "scripts", "supabase-schema.sql"), "utf8");
const { default: pg } = await import("pg");
const client = new pg.Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  await client.query(sql);
  console.log("Schema applied successfully.");
} finally {
  await client.end().catch(() => undefined);
}
