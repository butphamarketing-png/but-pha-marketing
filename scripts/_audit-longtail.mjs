import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { LONGTAIL_GAP_ENTRIES } from "./seo-longtail-gaps.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data } = await supabase.from("news").select("slug");
const db = new Set((data || []).map((r) => r.slug));

const missing = LONGTAIL_GAP_ENTRIES.filter((e) => !db.has(e.slug));
const exists = LONGTAIL_GAP_ENTRIES.filter((e) => db.has(e.slug));

console.log(`Long-tail candidates: ${LONGTAIL_GAP_ENTRIES.length}`);
console.log(`Missing (new): ${missing.length}`);
console.log(`Already exist: ${exists.length}`);
if (exists.length) console.log("Exists:", exists.map((e) => e.slug).join(", "));
console.log("\nWill seed:");
for (const e of missing) console.log(`  ${e.slug}`);
