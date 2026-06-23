/**
 * Pha 1 — Sửa cannibalization: keywords_main generic → long-tail theo slug.
 * Chạy: npm run seed:fix-keywords-main
 *       npm run seed:fix-keywords-main -- --dry-run
 *       npm run seed:fix-keywords-main -- --slug=thiet-ke-website-spa
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import {
  needsCannibalizationFix,
  buildKeywordsMainFix,
  KEYWORD_FIX_SKIP_SLUGS,
} from "./seo-keywords-from-slug.mjs";
import { buildSeoMetaFix } from "./seo-meta-fix.mjs";
import { keywordInText, seoImageAlt, validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const dryRun = process.argv.includes("--dry-run");
const onlySlug = process.argv.find((a) => a.startsWith("--slug="))?.split("=")[1] || null;

function patchContentAlts(content, keywordsMain) {
  let html = String(content || "");
  html = html.replace(/alt="([^"]*)"/g, (match, alt) => {
    if (keywordInText(alt, keywordsMain)) return match;
    const next = seoImageAlt(keywordsMain, alt).replace(/"/g, "&quot;");
    return `alt="${next}"`;
  });
  return html;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const { data: rows, error } = await supabase
  .from("news")
  .select("id,slug,title,keywords_main,keywords_secondary,description,content,meta_description")
  .eq("category", "blog")
  .eq("published", true)
  .order("slug");

if (error) {
  console.error(error.message);
  process.exit(1);
}

let targets = (rows || []).filter(needsCannibalizationFix);
if (onlySlug) {
  targets = (rows || []).filter((r) => r.slug === onlySlug);
  if (!targets.length) {
    console.error(`Slug "${onlySlug}" không tìm thấy hoặc không cần sửa.`);
    process.exit(1);
  }
}

console.log(`=== Fix keywords_main cannibalization ===`);
console.log(`Tổng blog: ${rows?.length ?? 0} | Cần sửa: ${targets.length} | Skip pillar: ${KEYWORD_FIX_SKIP_SLUGS.size}`);
console.log(`Dry run: ${dryRun ? "YES" : "NO"}\n`);

let fixed = 0;
let failed = 0;
const samples = [];

for (const row of targets) {
  const fix = buildKeywordsMainFix(row);
  const meta = buildSeoMetaFix({
    ...row,
    keywords_main: fix.keywordsMain,
    title: fix.title,
  });
  const content = patchContentAlts(meta.content, fix.keywordsMain);

  const check = validateSeoKeywordPlacement({
    keywordsMain: fix.keywordsMain,
    title: meta.title,
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
    description: row.description,
    html: content,
  });
  if (!check.ok) {
    console.warn(`  ⚠ ${row.slug}: sau sửa vẫn thiếu — ${check.missing.join(", ")}`);
  }

  if (dryRun) {
    console.log(`[dry-run] ${row.slug}`);
    console.log(`  kw: "${row.keywords_main}" → "${fix.keywordsMain}"`);
    if (row.title !== fix.title) console.log(`  title: "${row.title?.slice(0, 60)}…" → "${fix.title?.slice(0, 60)}…"`);
    fixed++;
    continue;
  }

  const { error: updateError } = await supabase
    .from("news")
    .update({
      keywords_main: fix.keywordsMain,
      keywords_secondary: fix.keywordsSecondary,
      title: meta.title,
      content,
      meta_description: meta.metaDescription,
      updated_at: new Date().toISOString(),
    })
    .eq("id", row.id);

  if (updateError) {
    console.error(`  ✗ ${row.slug}:`, updateError.message);
    failed++;
    continue;
  }

  if (samples.length < 8) {
    samples.push({ slug: row.slug, from: row.keywords_main, to: fix.keywordsMain });
  }
  fixed++;
}

if (!dryRun && fixed > 0) await revalidateBlogAfterSeed();

console.log(`\n=== Kết quả ===`);
console.log(`Đã sửa: ${fixed} | Lỗi: ${failed}${dryRun ? " (dry-run)" : ""}`);
if (samples.length) {
  console.log("\nMẫu:");
  for (const s of samples) {
    console.log(`  ${s.slug}: "${s.from}" → "${s.to}"`);
  }
}
