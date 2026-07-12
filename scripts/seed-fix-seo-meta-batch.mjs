/**
 * Fix SEO meta/alt fail — paginated (709 bài từ audit-blog-full).
 * Chạy: npm run seed:fix-seo-meta-batch
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { buildSeoMetaFix } from "./seo-meta-fix.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });

const dryRun = process.argv.includes("--dry-run");
const PAGE = 100;

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

let scanned = 0;
let fixed = 0;
let stillBad = 0;
let from = 0;

while (true) {
  const { data, error } = await sb
    .from("news")
    .select("id,slug,title,keywords_main,description,content,meta_description,hot")
    .eq("category", "blog")
    .eq("published", true)
    .order("slug")
    .range(from, from + PAGE - 1);
  if (error) throw error;
  if (!data?.length) break;

  for (const row of data) {
    scanned++;
    const fix = buildSeoMetaFix(row);
    if (!fix.changed) {
      if (!fix.check.ok) stillBad++;
      continue;
    }

    if (dryRun) {
      console.log(`DRY meta ${row.slug}: ${fix.check.missing.join(", ") || "patched"}`);
      fixed++;
      continue;
    }

    const { error: upErr } = await sb
      .from("news")
      .update({
        title: fix.title,
        content: fix.content,
        meta_description: fix.metaDescription,
        updated_at: new Date().toISOString(),
      })
      .eq("id", row.id);
    if (upErr) {
      console.error(`FAIL ${row.slug}:`, upErr.message);
      continue;
    }
    fixed++;
    if (fixed % 50 === 0) console.log(`  ... meta fixed ${fixed}`);
  }

  if (data.length < PAGE) break;
  from += PAGE;
}

if (!dryRun && fixed > 0) await revalidateBlogAfterSeed();

console.log("\n=== Fix SEO meta batch ===");
console.log(`Scanned: ${scanned}`);
console.log(`Fixed: ${fixed}`);
console.log(`Still bad: ${stillBad}`);
console.log(`Mode: ${dryRun ? "dry-run" : "live"}`);
