/**
 * Re-seed bài rewrite chất lượng: alt ảnh, hot flag, updated_at cho sitemap.
 * Chạy: node scripts/seo-boost-quality.mjs
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
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";

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

console.log(`Re-seeding ${REWRITE_ARTICLES.length} bài rewrite...\n`);

const results = [];
for (const article of REWRITE_ARTICLES) {
  try {
    results.push(await seedRewriteArticle(article));
  } catch (error) {
    console.error(`FAIL ${article.slug}:`, error.message);
    results.push({ slug: article.slug, seoOk: false, error: error.message });
  }
}

console.log(`\nDone: ${results.filter((r) => r.seoOk).length}/${results.length} pass SEO, ${results.filter((r) => r.hot).length} hot.`);
