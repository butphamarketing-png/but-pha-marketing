/**
 * Audit toàn bộ coverage SEO: rewrite registry, keyword-data, industry template.
 * Chạy: node scripts/audit-all-seo-coverage.mjs
 */
import { REWRITE_ARTICLES } from "./seo-rewrite-registry.mjs";
import { PILLAR_THIET_KE_WEBSITE } from "./seo-pillar-thiet-ke-website.mjs";
import { KEYWORD_ENTRIES } from "./seo-keyword-data.mjs";
import { INDUSTRY_ENTRIES } from "./seo-industry-data.mjs";
import { validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";
import { buildRewriteArticle } from "./seo-rewrite-builder.mjs";

const SKIP = new Set([
  "thiet-ke-website-spa",
  "thiet-ke-website-nha-khoa",
  "thiet-ke-website-nha-khoa-nieng-rang",
  "thiet-ke-website-nha-hang",
  "thiet-ke-website-khach-san",
  "thiet-ke-website-resort",
  "thiet-ke-website-cong-ty-xay-dung",
  "thiet-ke-website-kien-truc-noi-that",
  "thiet-ke-website-pccc",
  "thiet-ke-website-thiet-bi-pccc",
  "thiet-ke-website-my-pham",
  "thiet-ke-website-my-pham-lam-dep",
  "thiet-ke-website-thang-may",
  "thiet-ke-website-co-khi",
  "thiet-ke-website-gia-cong-cnc",
  "thiet-ke-website-bat-dong-san",
  "thiet-ke-website-cong-ty-luat",
  "thiet-ke-website-phap-luat-luat-su",
  "thiet-ke-website-tham-my-vien",
  "thiet-ke-website-phong-kham-da-khoa",
  "thiet-ke-website-logistics-van-tai",
  "thiet-ke-website-in-an-bao-bi",
  "thiet-ke-website-tu-dong-hoa",
  "thiet-ke-website-dien-cong-nghiep",
]);

const allRewrites = [...REWRITE_ARTICLES];
const rewriteSlugs = new Set(allRewrites.map((a) => a.slug));

let rewriteFail = 0;
const rewriteIssues = [];

console.log("=== AUDIT REWRITE CHẤT LƯỢNG CAO ===\n");

for (const article of allRewrites) {
  const seo = validateSeoKeywordPlacement({
    keywordsMain: article.keywordsMain,
    title: article.title,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    description: article.description,
    html: article.content,
  });
  const len = article.content.length;
  const hasPillar = article.content.includes("/blog/thiet-ke-website");
  const issues = [];
  if (!seo.ok) issues.push(`seo:${seo.missing.join(",")}`);
  if (len < 12000) issues.push(`short:${len}`);
  if (!hasPillar) issues.push("no-pillar-link");

  const ok = issues.length === 0;
  if (!ok) {
    rewriteFail++;
    rewriteIssues.push({ slug: article.slug, issues });
    console.log(`FAIL ${article.slug}: ${issues.join(" | ")}`);
  }
}

console.log(`\nRewrite OK: ${allRewrites.length - rewriteFail}/${allRewrites.length}`);

console.log("\n=== KEYWORD-DATA (builder preview) ===\n");
let kwFail = 0;
for (const entry of KEYWORD_ENTRIES) {
  const a = buildRewriteArticle({
    slug: entry.slug,
    title: entry.h1,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: entry.keywordsSecondary,
    description: entry.angle,
  });
  const seo = validateSeoKeywordPlacement({
    keywordsMain: a.keywordsMain,
    title: a.title,
    metaTitle: a.metaTitle,
    metaDescription: a.metaDescription,
    description: a.description,
    html: a.content,
  });
  if (!seo.ok || a.content.length < 12000) {
    kwFail++;
    console.log(`FAIL ${entry.slug}`);
  }
}
console.log(`Keyword-data ready: ${KEYWORD_ENTRIES.length - kwFail}/${KEYWORD_ENTRIES.length}`);

console.log("\n=== INDUSTRY TEMPLATE (chưa upgrade) ===\n");
const pending = INDUSTRY_ENTRIES.filter((e) => !SKIP.has(e.slug) && !rewriteSlugs.has(e.slug));
console.log(`Còn ${pending.length} ngành template — chạy: node scripts/seed-phase10.mjs --industry-batch`);

console.log("\n=== TÓM TẮT ===");
console.log(`Rewrite issues: ${rewriteFail}`);
console.log(`Industry pending upgrade: ${pending.length}`);
if (rewriteIssues.length) {
  console.log("\nTop rewrite cần sửa:");
  rewriteIssues.slice(0, 10).forEach((r) => console.log(`  - ${r.slug}: ${r.issues.join(", ")}`));
}

process.exit(rewriteFail > 0 ? 1 : 0);
