import dotenv from "dotenv";
import pg from "pg";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const url = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
const client = new pg.Client({
  connectionString: url,
  ssl: url?.includes("supabase.com") ? { rejectUnauthorized: false } : undefined,
});

await client.connect();
const { rows } = await client.query(`
  SELECT column_name FROM information_schema.columns
  WHERE table_schema = 'erp' AND table_name = 'invoices'
  ORDER BY ordinal_position
`);
console.log("erp.invoices columns:", rows.map((r) => r.column_name).join(", "));
await client.end();
