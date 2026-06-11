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
    "Thiếu SUPABASE_DATABASE_URL hoặc DATABASE_URL.\n" +
      "Lấy tại Supabase → Project Settings → Database → Connection string (URI, Session mode).\n" +
      "Dán vào .env.local rồi chạy lại: npm run setup:cms-db",
  );
  process.exit(1);
}

const sql = fs.readFileSync(path.join(root, "scripts", "cms-schema.sql"), "utf8");
const { default: pg } = await import("pg");
const client = new pg.Client({
  connectionString: databaseUrl,
  ssl: databaseUrl.includes("supabase.com") ? { rejectUnauthorized: false } : undefined,
});

try {
  await client.connect();
  await client.query(sql);
  console.log("CMS ERP schema (erp.*) applied successfully.");
} catch (error) {
  console.error("Failed to apply CMS schema:", error.message);
  process.exit(1);
} finally {
  await client.end().catch(() => undefined);
}
