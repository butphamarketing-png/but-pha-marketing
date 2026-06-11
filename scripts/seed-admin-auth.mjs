import dotenv from "dotenv";
import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const email = process.env.ADMIN_EMAIL || "butphamarketing@gmail.com";
const password = process.env.ADMIN_PASSWORD || "KTien2003@";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const passwordHash = createHash("sha256").update(password).digest("hex");
const supabase = createClient(url, key);

const { error } = await supabase.from("site_settings").upsert(
  {
    key: "admin_auth_config",
    value: { email, passwordHash },
  },
  { onConflict: "key" },
);

if (error) {
  console.error("Failed to seed admin auth:", error.message);
  process.exit(1);
}

console.log(`Admin auth seeded for ${email}`);
