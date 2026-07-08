/**
 * Seed 500 bài từ khóa long-tail batch 5.
 * Chạy: npm run seed:keywords-500-batch5
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { KEYWORDS_500_BATCH5 } from "./seo-keywords-500-batch5.mjs";
import { upgradeArticle } from "./seo-upgrade-article.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { revalidateBlogAfterSeed } from "./blog-revalidate.mjs";

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
const quiet = args.quiet === true || (!onlySlug && !dryRun && limit === Infinity);

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
let targets = KEYWORDS_500_BATCH5.filter((e) => !dbSlugs.has(e.slug));

if (onlySlug) {
  targets = KEYWORDS_500_BATCH5.filter((e) => e.slug === onlySlug);
  if (!targets.length) {
    console.error(`Slug "${onlySlug}" không có trong KEYWORDS_500_BATCH5.`);
    process.exit(1);
  }
}

const skippedExisting = KEYWORDS_500_BATCH5.filter((e) => dbSlugs.has(e.slug));
targets = targets.slice(0, limit);

console.log(`=== Seed 500 từ khóa batch 5 ===`);
console.log(`Batch: ${KEYWORDS_500_BATCH5.length} | DB: ${dbSlugs.size} | Mới: ${targets.length} | Đã có: ${skippedExisting.length}`);
console.log(`Dry run: ${dryRun ? "YES" : "NO"}\n`);

let created = 0;
let fail = 0;
let warned = 0;

for (let i = 0; i < targets.length; i++) {
  const entry = targets[i];
  const row = {
    slug: entry.slug,
    title: entry.h1,
    keywords_main: entry.keywordsMain,
    description: `${entry.keywordsMain}: ${entry.angle}.`,
  };

  try {
    const article = upgradeArticle(row, i + 2000);
    if (dryRun) {
      console.log(`  [dry] CREATE ${entry.slug} (${article.content.length} chars)`);
      created++;
      continue;
    }

    const result = await seedRewriteArticle(article, { log: !quiet });
    if (!quiet) {
      console.log(`Created: ${entry.slug} (${article.content.length} chars)${result.hot ? " (hot)" : ""}`);
    } else if ((i + 1) % 50 === 0 || i === targets.length - 1) {
      console.log(`  … ${i + 1}/${targets.length} (${entry.slug})`);
    }
    if (!result.seoOk) warned++;
    created++;
  } catch (err) {
    fail++;
    console.error(`  ✗ FAIL ${entry.slug}:`, err.message);
  }
}

if (!dryRun && created > 0) {
  await revalidateBlogAfterSeed();
}

console.log(`\n=== Kết quả ===`);
if (dryRun) {
  console.log(`Sẽ tạo ${created} bài mới`);
} else {
  console.log(`Tạo mới: ${created} | Lỗi: ${fail} | Cảnh báo SEO: ${warned}`);
}
