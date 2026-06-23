/**
 * Pha 3 — Seed bài long-tail ngành/địa phương chưa có slug.
 * Chạy: npm run seed:longtail-gaps
 *       npm run seed:longtail-gaps -- --dry-run
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LONGTAIL_GAP_ENTRIES } from "./seo-longtail-gaps.mjs";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const dryRun = args["dry-run"] === true;
const limit = args.limit ? Number(args.limit) : Infinity;
const onlySlug = typeof args.slug === "string" ? args.slug : null;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}

const supabase = createClient(url, key);
const { data: rows, error } = await supabase.from("news").select("slug");
if (error) {
  console.error(error.message);
  process.exit(1);
}

const dbSlugs = new Set((rows || []).map((r) => r.slug));
let targets = LONGTAIL_GAP_ENTRIES.filter((e) => !dbSlugs.has(e.slug));

if (onlySlug) {
  targets = LONGTAIL_GAP_ENTRIES.filter((e) => e.slug === onlySlug);
  if (!targets.length) {
    console.error(`Slug "${onlySlug}" không có trong danh sách long-tail.`);
    process.exit(1);
  }
  if (dbSlugs.has(onlySlug)) {
    console.error(`Slug "${onlySlug}" đã tồn tại trên DB — bỏ qua.`);
    process.exit(1);
  }
}

targets = targets.slice(0, limit);

const skipped = LONGTAIL_GAP_ENTRIES.length - targets.length - (onlySlug ? 0 : LONGTAIL_GAP_ENTRIES.filter((e) => dbSlugs.has(e.slug)).length);
const already = LONGTAIL_GAP_ENTRIES.filter((e) => dbSlugs.has(e.slug));

console.log(`=== Pha 3 — Long-tail gaps ===`);
console.log(`Mục tiêu: ${targets.length} bài mới | DB: ${dbSlugs.size} slug`);
if (already.length) console.log(`Đã có (bỏ qua): ${already.map((e) => e.slug).join(", ")}`);
console.log(`Dry run: ${dryRun ? "YES" : "NO"}\n`);

let created = 0;
let fail = 0;

for (let i = 0; i < targets.length; i++) {
  const entry = targets[i];
  const row = {
    slug: entry.slug,
    title: entry.h1,
    keywords_main: entry.keywordsMain,
    description: `${entry.keywordsMain}: ${entry.angle}.`,
  };

  try {
    const article = upgradeArticle(row, i + 100);
    if (dryRun) {
      console.log(`  [dry] CREATE ${entry.slug} (${article.content.length} chars)`);
      created++;
      continue;
    }
    await seedRewriteArticle(article, { log: true });
    created++;
  } catch (err) {
    fail++;
    console.error(`  ✗ FAIL ${entry.slug}:`, err.message);
  }
}

console.log(`\n=== Kết quả ===`);
if (dryRun) {
  console.log(`Sẽ tạo ${created} bài mới`);
} else {
  console.log(`Tạo mới: ${created} | Lỗi: ${fail}`);
}
