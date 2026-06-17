import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);
const tables = ["site_settings", "news", "push_subscriptions", "leads", "orders", "media", "page_content", "services"];

console.log("Supabase URL:", url);

for (const table of tables) {
  const { error } = await supabase.from(table).select("*", { head: true, count: "exact" });
  if (error) {
    console.log(`✗ ${table}: [${error.code || "error"}] ${error.message || "unknown"}`);
  } else {
    console.log(`✓ ${table}: OK`);
  }
}
