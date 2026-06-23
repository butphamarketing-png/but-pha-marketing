/**
 * Cập nhật 10 pillar cho từ khóa ngắn + đánh dấu hot.
 * Chạy: node scripts/seed-pillar-short-keywords.mjs
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PILLAR_THIET_KE_WEBSITE } from "./seo-pillar-thiet-ke-website.mjs";
import { REWRITE_BAO_GIA_THIET_KE_WEBSITE } from "./seo-rewrite-bao-gia-thiet-ke-website.mjs";
import { buildRewriteArticle } from "./seo-rewrite-builder.mjs";
import { LOCAL_SEO_ARTICLES } from "./seo-local-articles.mjs";
import { CUSTOMER_KEYWORD_ARTICLES } from "./seo-customer-keywords-articles.mjs";
import { LA_GI_ENTRIES } from "./seo-la-gi-data.mjs";
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const LA_GI_PILLARS = ["seo-la-gi", "marketing-online-la-gi", "google-ads-la-gi"];

const FACEBOOK_PILLARS = ["quang-cao-facebook", "thiet-ke-fanpage-facebook", "cham-soc-fanpage", "tu-van-marketing-mien-phi"];

const laGiBySlug = Object.fromEntries(LA_GI_ENTRIES.map((e) => [e.slug, e]));

function articleForSlug(slug) {
  if (slug === "thiet-ke-website") return PILLAR_THIET_KE_WEBSITE;
  if (slug === "bao-gia-thiet-ke-website") return REWRITE_BAO_GIA_THIET_KE_WEBSITE;
  if (slug === "seo-google-maps-la-gi") {
    return LOCAL_SEO_ARTICLES.find((a) => a.slug === slug) || null;
  }
  if (LA_GI_PILLARS.includes(slug)) {
    const entry = laGiBySlug[slug];
    if (!entry) return null;
    return buildRewriteArticle({
      slug,
      title: entry.h1,
      keywordsMain: entry.keywordsMain,
      keywordsSecondary: entry.keywordsSecondary,
      description: entry.definition,
    });
  }
  if (FACEBOOK_PILLARS.includes(slug)) {
    return CUSTOMER_KEYWORD_ARTICLES.find((a) => a.slug === slug) || null;
  }
  return null;
}

const PILLAR_SLUGS = [
  "thiet-ke-website",
  "bao-gia-thiet-ke-website",
  "seo-la-gi",
  "quang-cao-facebook",
  "thiet-ke-fanpage-facebook",
  "cham-soc-fanpage",
  "seo-google-maps-la-gi",
  "marketing-online-la-gi",
  "google-ads-la-gi",
  "tu-van-marketing-mien-phi",
];

console.log(`Cập nhật ${PILLAR_SLUGS.length} pillar từ khóa ngắn...\n`);

let ok = 0;
let fail = 0;

for (const slug of PILLAR_SLUGS) {
  try {
    const article = articleForSlug(slug);
    if (!article) throw new Error("Không tìm thấy nguồn bài viết");

    const result = await seedRewriteArticle(
      { ...article, hot: true },
      { log: true },
    );
    if (result.seoOk) ok++;
    else console.warn(`  ⚠ SEO warnings: ${slug}`);
  } catch (err) {
    fail++;
    console.error(`  ✗ ${slug}:`, err.message);
  }
}

console.log(`\nHoàn tất: ${ok} OK, ${fail} lỗi.`);
