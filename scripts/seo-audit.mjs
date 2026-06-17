/**
 * Audit các bài rewrite chất lượng (pillar + cluster + local + industry).
 * Chạy: node scripts/seo-audit.mjs
 */
import { PILLAR_THIET_KE_WEBSITE } from "./seo-pillar-thiet-ke-website.mjs";
import { REWRITE_THIET_KE_WEBSITE_DOANH_NGHIEP } from "./seo-rewrite-thiet-ke-website-doanh-nghiep.mjs";
import { REWRITE_THIET_KE_WEBSITE_CHUAN_SEO } from "./seo-rewrite-thiet-ke-website-chuan-seo.mjs";
import { REWRITE_THIET_KE_WEBSITE_BAN_HANG } from "./seo-rewrite-thiet-ke-website-ban-hang.mjs";
import { REWRITE_THIET_KE_WEBSITE_THEO_YEU_CAU } from "./seo-rewrite-thiet-ke-website-theo-yeu-cau.mjs";
import { REWRITE_BAO_GIA_THIET_KE_WEBSITE } from "./seo-rewrite-bao-gia-thiet-ke-website.mjs";
import { REWRITE_THIET_KE_WEBSITE_CONG_TY } from "./seo-rewrite-thiet-ke-website-cong-ty.mjs";
import { REWRITE_THIET_KE_WEBSITE_TRON_GOI } from "./seo-rewrite-thiet-ke-website-tron-goi.mjs";
import { REWRITE_THIET_KE_WEBSITE_WORDPRESS } from "./seo-rewrite-thiet-ke-website-wordpress.mjs";
import { REWRITE_THIET_KE_WEBSITE_RESPONSIVE } from "./seo-rewrite-thiet-ke-website-responsive.mjs";
import { REWRITE_THIET_KE_WEBSITE_THUONG_MAI_DIEN_TU } from "./seo-rewrite-thiet-ke-website-thuong-mai-dien-tu.mjs";
import { REWRITE_THIET_KE_WEBSITE_LA_GI } from "./seo-rewrite-thiet-ke-website-la-gi.mjs";
import { REWRITE_THIET_KE_WEBSITE_TPHCM } from "./seo-rewrite-thiet-ke-website-tphcm.mjs";
import { REWRITE_THIET_KE_WEBSITE_HA_NOI } from "./seo-rewrite-thiet-ke-website-ha-noi.mjs";
import { REWRITE_THIET_KE_WEBSITE_DA_NANG } from "./seo-rewrite-thiet-ke-website-da-nang.mjs";
import { REWRITE_THIET_KE_WEBSITE_SPA } from "./seo-rewrite-thiet-ke-website-spa.mjs";
import { REWRITE_THIET_KE_WEBSITE_NHA_KHOA } from "./seo-rewrite-thiet-ke-website-nha-khoa.mjs";
import { REWRITE_THIET_KE_WEBSITE_NHA_HANG } from "./seo-rewrite-thiet-ke-website-nha-hang.mjs";
import { REWRITE_THIET_KE_WEBSITE_KHACH_SAN } from "./seo-rewrite-thiet-ke-website-khach-san.mjs";
import { REWRITE_THIET_KE_WEBSITE_RESORT } from "./seo-rewrite-thiet-ke-website-resort.mjs";
import { validateSeoKeywordPlacement } from "./seo-article-helpers.mjs";
import { isQualitySeoArticle } from "./seed-rewrite-utils.mjs";

const REWRITE_ARTICLES = [
  PILLAR_THIET_KE_WEBSITE,
  REWRITE_THIET_KE_WEBSITE_DOANH_NGHIEP,
  REWRITE_THIET_KE_WEBSITE_CHUAN_SEO,
  REWRITE_THIET_KE_WEBSITE_BAN_HANG,
  REWRITE_THIET_KE_WEBSITE_THEO_YEU_CAU,
  REWRITE_BAO_GIA_THIET_KE_WEBSITE,
  REWRITE_THIET_KE_WEBSITE_CONG_TY,
  REWRITE_THIET_KE_WEBSITE_TRON_GOI,
  REWRITE_THIET_KE_WEBSITE_WORDPRESS,
  REWRITE_THIET_KE_WEBSITE_RESPONSIVE,
  REWRITE_THIET_KE_WEBSITE_THUONG_MAI_DIEN_TU,
  REWRITE_THIET_KE_WEBSITE_LA_GI,
  REWRITE_THIET_KE_WEBSITE_TPHCM,
  REWRITE_THIET_KE_WEBSITE_HA_NOI,
  REWRITE_THIET_KE_WEBSITE_DA_NANG,
  REWRITE_THIET_KE_WEBSITE_SPA,
  REWRITE_THIET_KE_WEBSITE_NHA_KHOA,
  REWRITE_THIET_KE_WEBSITE_NHA_HANG,
  REWRITE_THIET_KE_WEBSITE_KHACH_SAN,
  REWRITE_THIET_KE_WEBSITE_RESORT,
];

const rows = REWRITE_ARTICLES.map((article) => {
  const check = validateSeoKeywordPlacement({
    keywordsMain: article.keywordsMain,
    title: article.title,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    description: article.description,
    html: article.content,
  });
  return {
    slug: article.slug,
    keyword: article.keywordsMain,
    chars: article.content.length,
    metaTitleLen: (article.metaTitle || "").length,
    metaDescLen: (article.metaDescription || "").length,
    quality: isQualitySeoArticle(article),
    ok: check.ok,
    issues: check.missing,
  };
});

const failed = rows.filter((r) => !r.ok);
const longTitles = rows.filter((r) => r.metaTitleLen > 65);
const longDescs = rows.filter((r) => r.metaDescLen > 160);

console.log(`=== SEO AUDIT: ${rows.length} bài rewrite chất lượng ===\n`);
console.log(`Pass: ${rows.length - failed.length}/${rows.length}`);

if (failed.length) {
  console.log("\n--- Cần sửa ---");
  for (const r of failed) console.log(`  ${r.slug}: ${r.issues.join(", ")}`);
}

if (longTitles.length) {
  console.log("\n--- Meta title > 65 ký tự ---");
  for (const r of longTitles) console.log(`  ${r.slug}: ${r.metaTitleLen}`);
}

if (longDescs.length) {
  console.log("\n--- Meta description > 160 ký tự ---");
  for (const r of longDescs) console.log(`  ${r.slug}: ${r.metaDescLen}`);
}

if (!failed.length && !longTitles.length && !longDescs.length) {
  console.log("\nTất cả bài rewrite đạt checklist SEO nội bộ.");
}
