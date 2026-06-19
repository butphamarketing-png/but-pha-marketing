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
import { REWRITE_THIET_KE_WEBSITE_DAT_PHONG_KHACH_SAN } from "./seo-rewrite-thiet-ke-website-dat-phong-khach-san.mjs";
import { REWRITE_THIET_KE_WEBSITE_CONG_TY_XAY_DUNG } from "./seo-rewrite-thiet-ke-website-cong-ty-xay-dung.mjs";
import { REWRITE_THIET_KE_WEBSITE_KIEN_TRUC_NOI_THAT } from "./seo-rewrite-thiet-ke-website-kien-truc-noi-that.mjs";
import { REWRITE_THIET_KE_WEBSITE_CO_KHI } from "./seo-rewrite-thiet-ke-website-co-khi.mjs";
import { REWRITE_THIET_KE_WEBSITE_GIA_CONG_CNC } from "./seo-rewrite-thiet-ke-website-gia-cong-cnc.mjs";
import { REWRITE_THIET_KE_WEBSITE_BAT_DONG_SAN } from "./seo-rewrite-thiet-ke-website-bat-dong-san.mjs";
import { REWRITE_THIET_KE_WEBSITE_BAT_DONG_SAN_DU_AN } from "./seo-rewrite-thiet-ke-website-bat-dong-san-du-an.mjs";
import { REWRITE_THIET_KE_WEBSITE_CONG_TY_LUAT } from "./seo-rewrite-thiet-ke-website-cong-ty-luat.mjs";
import { REWRITE_THIET_KE_WEBSITE_PORTFOLIO_CA_NHAN } from "./seo-rewrite-thiet-ke-website-portfolio-ca-nhan.mjs";
import { REWRITE_THIET_KE_WEBSITE_GIOI_THIEU_CONG_TY } from "./seo-rewrite-thiet-ke-website-gioi-thieu-cong-ty.mjs";
import { REWRITE_THIET_KE_WEBSITE_HO_SO_NANG_LUC } from "./seo-rewrite-thiet-ke-website-ho-so-nang-luc.mjs";
import { REWRITE_THIET_KE_WEBSITE_THAM_MY_VIEN } from "./seo-rewrite-thiet-ke-website-tham-my-vien.mjs";
import { REWRITE_THIET_KE_WEBSITE_PHONG_KHAM_DA_KHOA } from "./seo-rewrite-thiet-ke-website-phong-kham-da-khoa.mjs";
import { REWRITE_THIET_KE_WEBSITE_WORDPRESS_VS_SHOPIFY } from "./seo-rewrite-thiet-ke-website-wordpress-vs-shopify.mjs";
import { REWRITE_THIET_KE_WEBSITE_CATALOG_SAN_PHAM } from "./seo-rewrite-thiet-ke-website-catalog-san-pham.mjs";
import { REWRITE_THIET_KE_WEBSITE_DAT_LICH_HEN_ONLINE } from "./seo-rewrite-thiet-ke-website-dat-lich-hen-online.mjs";
import { REWRITE_THIET_KE_WEBSITE_BLOG_TIN_TUC } from "./seo-rewrite-thiet-ke-website-blog-tin-tuc.mjs";
import { REWRITE_THIET_KE_WEBSITE_LANDING_PAGE_BAN_HANG } from "./seo-rewrite-thiet-ke-website-landing-page-ban-hang.mjs";
import { REWRITE_THIET_KE_WEBSITE_BAN_HANG_OMNI } from "./seo-rewrite-thiet-ke-website-ban-hang-omni.mjs";
import { REWRITE_THIET_KE_WEBSITE_DROPSHIP } from "./seo-rewrite-thiet-ke-website-dropship.mjs";
import { REWRITE_THIET_KE_WEBSITE_MEMBERSHIP } from "./seo-rewrite-thiet-ke-website-membership.mjs";
import { REWRITE_THIET_KE_WEBSITE_TUYEN_DUNG } from "./seo-rewrite-thiet-ke-website-tuyen-dung.mjs";
import { REWRITE_THIET_KE_WEBSITE_SU_KIEN_EVENT } from "./seo-rewrite-thiet-ke-website-su-kien-event.mjs";
import { REWRITE_THIET_KE_WEBSITE_ELEARNING } from "./seo-rewrite-thiet-ke-website-elearning.mjs";
import { REWRITE_THIET_KE_WEBSITE_NHA_HANG_MENU } from "./seo-rewrite-thiet-ke-website-nha-hang-menu.mjs";
import { REWRITE_THIET_KE_WEBSITE_DU_LICH_TOUR } from "./seo-rewrite-thiet-ke-website-du-lich-tour.mjs";
import { REWRITE_THIET_KE_WEBSITE_Y_TE_DAT_KHAM } from "./seo-rewrite-thiet-ke-website-y-te-dat-kham.mjs";
import { REWRITE_THIET_KE_WEBSITE_PHAP_LUAT_LUAT_SU } from "./seo-rewrite-thiet-ke-website-phap-luat-luat-su.mjs";
import { REWRITE_THIET_KE_WEBSITE_NOI_THAT_SHOWROOM } from "./seo-rewrite-thiet-ke-website-noi-that-showroom.mjs";
import { REWRITE_THIET_KE_WEBSITE_XE_HOI_O_TO } from "./seo-rewrite-thiet-ke-website-xe-hoi-o-to.mjs";
import { REWRITE_THIET_KE_WEBSITE_THOI_TRANG_FASHION } from "./seo-rewrite-thiet-ke-website-thoi-trang-fashion.mjs";
import { REWRITE_THIET_KE_WEBSITE_MY_PHAM_LAM_DEP } from "./seo-rewrite-thiet-ke-website-my-pham-lam-dep.mjs";
import { REWRITE_THIET_KE_WEBSITE_NONG_SAN_ORGANIC } from "./seo-rewrite-thiet-ke-website-nong-san-organic.mjs";
import { REWRITE_THIET_KE_WEBSITE_XAY_DUNG_NHA_THAU } from "./seo-rewrite-thiet-ke-website-xay-dung-nha-thau.mjs";
import { REWRITE_THIET_KE_WEBSITE_IN_AN_BAO_BI } from "./seo-rewrite-thiet-ke-website-in-an-bao-bi.mjs";
import { REWRITE_THIET_KE_WEBSITE_LOGISTICS_VAN_TAI } from "./seo-rewrite-thiet-ke-website-logistics-van-tai.mjs";
import { REWRITE_THIET_KE_WEBSITE_NHA_KHOA_NIENG_RANG } from "./seo-rewrite-thiet-ke-website-nha-khoa-nieng-rang.mjs";
import { REWRITE_THIET_KE_WEBSITE_GYM_YOGA_PILATES } from "./seo-rewrite-thiet-ke-website-gym-yoga-pilates.mjs";
import { REWRITE_THIET_KE_WEBSITE_TRE_EM_MAM_NON } from "./seo-rewrite-thiet-ke-website-tre-em-mam-non.mjs";
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
  REWRITE_THIET_KE_WEBSITE_DAT_PHONG_KHACH_SAN,
  REWRITE_THIET_KE_WEBSITE_CONG_TY_XAY_DUNG,
  REWRITE_THIET_KE_WEBSITE_KIEN_TRUC_NOI_THAT,
  REWRITE_THIET_KE_WEBSITE_CO_KHI,
  REWRITE_THIET_KE_WEBSITE_GIA_CONG_CNC,
  REWRITE_THIET_KE_WEBSITE_BAT_DONG_SAN,
  REWRITE_THIET_KE_WEBSITE_BAT_DONG_SAN_DU_AN,
  REWRITE_THIET_KE_WEBSITE_CONG_TY_LUAT,
  REWRITE_THIET_KE_WEBSITE_PORTFOLIO_CA_NHAN,
  REWRITE_THIET_KE_WEBSITE_GIOI_THIEU_CONG_TY,
  REWRITE_THIET_KE_WEBSITE_HO_SO_NANG_LUC,
  REWRITE_THIET_KE_WEBSITE_THAM_MY_VIEN,
  REWRITE_THIET_KE_WEBSITE_PHONG_KHAM_DA_KHOA,
  REWRITE_THIET_KE_WEBSITE_WORDPRESS_VS_SHOPIFY,
  REWRITE_THIET_KE_WEBSITE_CATALOG_SAN_PHAM,
  REWRITE_THIET_KE_WEBSITE_DAT_LICH_HEN_ONLINE,
  REWRITE_THIET_KE_WEBSITE_BLOG_TIN_TUC,
  REWRITE_THIET_KE_WEBSITE_LANDING_PAGE_BAN_HANG,
  REWRITE_THIET_KE_WEBSITE_BAN_HANG_OMNI,
  REWRITE_THIET_KE_WEBSITE_DROPSHIP,
  REWRITE_THIET_KE_WEBSITE_MEMBERSHIP,
  REWRITE_THIET_KE_WEBSITE_TUYEN_DUNG,
  REWRITE_THIET_KE_WEBSITE_SU_KIEN_EVENT,
  REWRITE_THIET_KE_WEBSITE_ELEARNING,
  REWRITE_THIET_KE_WEBSITE_NHA_HANG_MENU,
  REWRITE_THIET_KE_WEBSITE_DU_LICH_TOUR,
  REWRITE_THIET_KE_WEBSITE_Y_TE_DAT_KHAM,
  REWRITE_THIET_KE_WEBSITE_PHAP_LUAT_LUAT_SU,
  REWRITE_THIET_KE_WEBSITE_NOI_THAT_SHOWROOM,
  REWRITE_THIET_KE_WEBSITE_XE_HOI_O_TO,
  REWRITE_THIET_KE_WEBSITE_THOI_TRANG_FASHION,
  REWRITE_THIET_KE_WEBSITE_MY_PHAM_LAM_DEP,
  REWRITE_THIET_KE_WEBSITE_NONG_SAN_ORGANIC,
  REWRITE_THIET_KE_WEBSITE_XAY_DUNG_NHA_THAU,
  REWRITE_THIET_KE_WEBSITE_IN_AN_BAO_BI,
  REWRITE_THIET_KE_WEBSITE_LOGISTICS_VAN_TAI,
  REWRITE_THIET_KE_WEBSITE_NHA_KHOA_NIENG_RANG,
  REWRITE_THIET_KE_WEBSITE_GYM_YOGA_PILATES,
  REWRITE_THIET_KE_WEBSITE_TRE_EM_MAM_NON,
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
