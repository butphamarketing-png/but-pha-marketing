/**
 * Audit bài blog dùng keywords_main generic (cạnh tranh head term).
 * Chạy: npm run audit:keywords-cannibalization
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import {
  isGenericWebsiteKeyword,
  needsCannibalizationFix,
  resolveKeywordsMain,
  KEYWORD_FIX_SKIP_SLUGS,
} from "./seo-keywords-from-slug.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const { data: rows, error } = await supabase
  .from("news")
  .select("slug,keywords_main,keywords_secondary")
  .eq("category", "blog")
  .eq("published", true)
  .order("slug");

if (error) {
  console.error(error.message);
  process.exit(1);
}

const generic = [];
const toFix = [];

for (const row of rows || []) {
  if (isGenericWebsiteKeyword(row.keywords_main) && !KEYWORD_FIX_SKIP_SLUGS.has(row.slug)) {
    generic.push(row);
  }
  if (needsCannibalizationFix(row)) {
    toFix.push({
      slug: row.slug,
      from: row.keywords_main,
      to: resolveKeywordsMain(row.slug, row),
    });
  }
}

console.log(`=== Audit cannibalization — ${rows?.length ?? 0} bài ===`);
console.log(`Generic keywords_main (không pillar): ${generic.length}`);
console.log(`Cần sửa (needsCannibalizationFix): ${toFix.length}\n`);

console.log("Mẫu generic (15 đầu):");
for (const row of generic.slice(0, 15)) {
  console.log(`  ${row.slug}: "${row.keywords_main}"`);
}

console.log("\nMẫu sẽ sửa (20 đầu):");
for (const item of toFix.slice(0, 20)) {
  console.log(`  ${item.slug}: "${item.from}" → "${item.to}"`);
}
