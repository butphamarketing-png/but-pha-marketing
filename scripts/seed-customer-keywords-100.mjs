/**
 * Viết 100 bài tin tức theo từ khóa khách hay tìm.
 * Chạy: node scripts/seed-customer-keywords-100.mjs
 *       node scripts/seed-customer-keywords-100.mjs --dry-run
 *       node scripts/seed-customer-keywords-100.mjs --limit=10
 *       node scripts/seed-customer-keywords-100.mjs --slug=dich-vu-marketing
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CUSTOMER_KEYWORDS_100 } from "./seo-customer-keywords-100.mjs";
import { buildRewriteArticle } from "./seo-rewrite-builder.mjs";
import { buildMarketingArticleFromEntry, validateMarketingArticle } from "./seo-marketing-builder.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const REWRITE_SLUG_PREFIXES = ["thiet-ke-website", "bao-gia-thiet-ke"];
const REWRITE_EXACT = new Set([
  "thiet-ke-website",
  "bao-gia-thiet-ke-website",
  "chuyen-nghiep-gia-tot",
  "gia-re-uy-tin",
  "thiet-ke-website-doanh-nghiep",
  "thiet-ke-website-chuan-seo",
  "thiet-ke-website-ban-hang",
  "thiet-ke-website-spa",
  "thiet-ke-website-nha-khoa",
  "thiet-ke-website-cong-ty-xay-dung",
  "thiet-ke-website-nha-hang",
  "thiet-ke-website-toc-do-cao",
  "thiet-ke-website-dich-vu-seo",
  "thiet-ke-website-tphcm",
  "bao-gia-thiet-ke-website",
  "cach-dua-doanh-nghiep-len-google-maps",
  "toi-uu-google-business-profile",
  "seo-local-cho-spa",
  "seo-local-tphcm",
]);

function shouldUseRewriteBuilder(slug) {
  if (slug.endsWith("-la-gi")) return true;
  if (REWRITE_EXACT.has(slug)) return true;
  return REWRITE_SLUG_PREFIXES.some((p) => slug.startsWith(p));
}

function buildArticle(entry, index) {
  const base = {
    slug: entry.slug,
    title: entry.h1,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: `${entry.keywordsMain}, ${entry.niche}, bứt phá marketing`,
    description: `${entry.keywordsMain}: ${entry.angle}.`,
  };

  if (shouldUseRewriteBuilder(entry.slug)) {
    return buildRewriteArticle(base);
  }
  return buildMarketingArticleFromEntry(entry, index);
}

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
const { data: rows, error } = await supabase.from("news").select("id,slug,title");
if (error) {
  console.error(error.message);
  process.exit(1);
}

const dbSlugs = new Map((rows || []).map((r) => [r.slug, r]));
let targets = CUSTOMER_KEYWORDS_100;

if (onlySlug) {
  targets = targets.filter((e) => e.slug === onlySlug);
  if (!targets.length) {
    console.error(`Slug "${onlySlug}" không có trong batch 100 từ khóa.`);
    process.exit(1);
  }
}

targets = targets.slice(0, limit);

// Kiểm tra slug trùng trong batch (file data đã check, double-check runtime)
const batchSlugs = targets.map((e) => e.slug);
if (new Set(batchSlugs).size !== batchSlugs.length) {
  console.error("Lỗi: slug trùng trong batch đang chạy.");
  process.exit(1);
}

console.log(`=== Seed 100 từ khóa khách hàng ===`);
console.log(`Mục tiêu: ${targets.length} bài | DB hiện có: ${dbSlugs.size} slug`);
console.log(`Dry run: ${dryRun ? "YES" : "NO"}\n`);

let created = 0;
let updated = 0;
let rewriteCount = 0;
let marketingCount = 0;
let fail = 0;

for (let i = 0; i < targets.length; i++) {
  const entry = targets[i];
  const exists = dbSlugs.has(entry.slug);
  const mode = shouldUseRewriteBuilder(entry.slug) ? "rewrite" : "marketing";

  try {
    const article = buildArticle(entry, i);
    if (mode === "rewrite") rewriteCount++;
    else marketingCount++;

    if (mode === "marketing") {
      const check = validateMarketingArticle(article);
      if (!check.ok) {
        console.warn(`  ⚠ SEO [${entry.slug}]: thiếu ở ${check.missing.join(", ")}`);
      }
    }

    if (dryRun) {
      console.log(`  [dry] ${exists ? "UPDATE" : "CREATE"} [${mode}] ${entry.slug} (${article.content.length} chars)`);
      continue;
    }

    await seedRewriteArticle(article, { log: true });
    if (exists) updated++;
    else created++;
  } catch (err) {
    fail++;
    console.error(`  ✗ FAIL ${entry.slug}:`, err.message);
  }
}

console.log(`\n=== Kết quả ===`);
if (dryRun) {
  console.log(`Sẽ xử lý ${targets.length} bài (rewrite: ${rewriteCount}, marketing: ${marketingCount})`);
} else {
  console.log(`Tạo mới: ${created} | Cập nhật: ${updated} | Lỗi: ${fail}`);
  console.log(`Rewrite builder: ${rewriteCount} | Marketing builder: ${marketingCount}`);
}
