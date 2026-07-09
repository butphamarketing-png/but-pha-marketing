/**
 * Seed 100 bài blog theo từ khóa volume cao.
 * Chạy: node scripts/seed-high-volume-keywords-100.mjs
 *       node scripts/seed-high-volume-keywords-100.mjs --dry-run
 *       node scripts/seed-high-volume-keywords-100.mjs --limit=5
 *       node scripts/seed-high-volume-keywords-100.mjs --slug=marketing-online
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HIGH_VOLUME_KEYWORDS_100 } from "./seo-high-volume-keywords-100.mjs";
import { buildRewriteArticle } from "./seo-rewrite-builder.mjs";
import { buildMarketingLongFormFromEntry, validateMarketingArticle } from "./seo-marketing-builder.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { REWRITE_BAO_GIA_THIET_KE_WEBSITE } from "./seo-rewrite-bao-gia-thiet-ke-website.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const CUSTOM_REWRITE = new Map([
  ["bao-gia-thiet-ke-website", REWRITE_BAO_GIA_THIET_KE_WEBSITE],
]);

const REWRITE_SLUGS = new Set([
  "thiet-ke-website",
  "lam-website",
  "gia-re-uy-tin",
  "bao-gia-thiet-ke-website",
  "gia-thiet-ke-website",
  "chuyen-nghiep-gia-tot",
  "thiet-ke-website-chuan-seo",
  "thiet-ke-website-ban-hang",
  "thiet-ke-website-doanh-nghiep",
  "thiet-ke-website-tphcm",
  "thiet-ke-website-ha-noi",
  "thiet-ke-website-da-nang",
  "chi-phi-lam-website",
  "website-gia-bao-nhieu",
  "thiet-ke-web",
  "tao-website",
  "thiet-ke-website-responsive",
  "thiet-ke-website-cong-ty",
  "thiet-ke-website-spa",
  "thiet-ke-website-nha-khoa",
]);

function shouldUseRewriteBuilder(entry) {
  if (CUSTOM_REWRITE.has(entry.slug)) return true;
  if (entry.slug.endsWith("-la-gi")) return true;
  if (REWRITE_SLUGS.has(entry.slug)) return true;
  if (entry.slug.startsWith("thiet-ke-website-") && !entry.slug.includes("dich-vu-seo")) return true;
  const kw = entry.keywordsMain.toLowerCase();
  return (
    kw === "làm website" ||
    kw === "tạo website" ||
    kw === "thiết kế web" ||
    kw.startsWith("thiết kế website") ||
    kw.startsWith("làm website")
  );
}

function buildArticle(entry, index) {
  if (CUSTOM_REWRITE.has(entry.slug)) {
    return CUSTOM_REWRITE.get(entry.slug);
  }
  if (shouldUseRewriteBuilder(entry)) {
    return buildRewriteArticle({
      slug: entry.slug,
      title: entry.h1,
      keywordsMain: entry.keywordsMain,
      keywordsSecondary: `${entry.keywordsMain}, ${entry.niche}, bứt phá marketing`,
      description: entry.angle,
    });
  }
  return buildMarketingLongFormFromEntry(entry, index);
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
const { data: rows, error } = await supabase.from("news").select("id,slug");
if (error) {
  console.error(error.message);
  process.exit(1);
}

const dbSlugs = new Set((rows || []).map((r) => r.slug));
let targets = HIGH_VOLUME_KEYWORDS_100;

if (onlySlug) {
  targets = targets.filter((e) => e.slug === onlySlug);
  if (!targets.length) {
    console.error(`Slug "${onlySlug}" không có trong batch 100 volume cao.`);
    process.exit(1);
  }
}
targets = targets.slice(0, limit);

console.log(`=== Seed 100 từ khóa volume cao ===`);
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
  const mode = shouldUseRewriteBuilder(entry) ? "rewrite" : "marketing";

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
  console.log(`Rewrite builder: ${rewriteCount} | Marketing long-form: ${marketingCount}`);
}
