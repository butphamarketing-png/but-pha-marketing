/**
 * Pha 4 — Chuẩn hóa title + meta description + metaTitle trong content.
 * Chạy: npm run seed:fix-seo-meta
 *       npm run seed:fix-seo-meta -- --dry-run
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { buildSeoMetaFix } from "./seo-meta-fix.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const dryRun = process.argv.includes("--dry-run");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const { data: rows, error } = await supabase
  .from("news")
  .select("id,slug,title,keywords_main,description,content,meta_description")
  .eq("category", "blog")
  .eq("published", true);

if (error) {
  console.error(error.message);
  process.exit(1);
}

let fixed = 0;
let skipped = 0;
let stillBad = 0;

for (const row of rows || []) {
  const fix = buildSeoMetaFix(row);
  if (!fix.changed && fix.check.ok) {
    skipped++;
    continue;
  }
  if (!fix.check.ok && !fix.changed) {
    stillBad++;
    console.warn(`  ⚠ Không sửa được: ${row.slug} — ${fix.check.missing.join(", ")}`);
    continue;
  }

  if (dryRun) {
    console.log(`[dry-run] ${row.slug}: meta ${(row.meta_description || "").length}→${fix.metaDescription.length} chars`);
    fixed++;
    continue;
  }

  const { error: updateError } = await supabase
    .from("news")
    .update({
      title: fix.title,
      content: fix.content,
      meta_description: fix.metaDescription,
      updated_at: new Date().toISOString(),
    })
    .eq("id", row.id);

  if (updateError) {
    console.error(`  ✗ ${row.slug}:`, updateError.message);
    continue;
  }
  console.log(`Fixed: ${row.slug}${fix.check.ok ? "" : ` (${fix.check.missing.join(", ")})`}`);
  fixed++;
}

if (!dryRun && fixed > 0) await revalidateBlogAfterSeed();

console.log(`\n=== Kết quả ===`);
console.log(`Sửa: ${fixed} | Đã OK: ${skipped} | Còn lỗi: ${stillBad}${dryRun ? " (dry-run)" : ""}`);
