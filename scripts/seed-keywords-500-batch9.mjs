/**
 * Seed 500 bài từ khóa long-tail batch 8.
 * Chạy: npm run seed:keywords-500-batch8
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { KEYWORDS_500_BATCH8 } from "./seo-keywords-500-batch8.mjs";
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
let allRows = [];
let from = 0;
while (true) {
  const { data: page, error: pageError } = await supabase.from("news").select("slug").range(from, from + 999);
  if (pageError) {
    console.error(pageError.message);
    process.exit(1);
  }
  if (!page?.length) break;
  allRows = allRows.concat(page);
  if (page.length < 1000) break;
  from += 1000;
}

const dbSlugs = new Set(allRows.map((r) => r.slug));
let targets = KEYWORDS_500_BATCH8.filter((e) => !dbSlugs.has(e.slug));

if (onlySlug) {
  targets = KEYWORDS_500_BATCH8.filter((e) => e.slug === onlySlug);
  if (!targets.length) {
    console.error(`Slug "${onlySlug}" không có trong KEYWORDS_500_BATCH8.`);
    process.exit(1);
  }
}

targets = targets.slice(0, limit);

console.log(`=== Seed 500 từ khóa batch 8 ===`);
console.log(`Batch: ${KEYWORDS_500_BATCH8.length} | DB: ${dbSlugs.size} | Mới: ${targets.length}`);
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
    const article = upgradeArticle(row, i + 3500);
    if (dryRun) {
      created++;
      continue;
    }

    const result = await seedRewriteArticle(article, { log: !quiet });
    if ((i + 1) % 50 === 0 || i === targets.length - 1) {
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
