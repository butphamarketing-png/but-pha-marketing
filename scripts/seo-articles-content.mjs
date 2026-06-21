import { wrapArticle, img, toc, internalLinks, externalLinks, NEWS_THUMBNAIL } from "./seo-article-helpers.mjs";
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
import { INDUSTRY_ARTICLES } from "./seo-industry-articles.mjs";
import { KEYWORD_ARTICLES } from "./seo-keyword-articles.mjs";
import { LA_GI_ARTICLES } from "./seo-la-gi-articles.mjs";
import { LOCAL_SEO_ARTICLES } from "./seo-local-articles.mjs";
import { WEBSITE_ARTICLES } from "./seo-website-articles.mjs";
import { MARKETING_ARTICLES } from "./seo-marketing-articles.mjs";
import { CUSTOMER_KEYWORD_ARTICLES } from "./seo-customer-keywords-articles.mjs";

function faq(items) {
  const blocks = items
    .map(
      (f) =>
        `<div class="mb-4"><h3 class="text-base font-semibold text-indigo-950">${f.q}</h3><p>${f.a}</p></div>`,
    )
    .join("\n");
  return `<section id="faq"><h2>Câu hỏi thường gặp</h2>${blocks}</section>`;
}

export const SEO_ARTICLES = [
  PILLAR_THIET_KE_WEBSITE,
  REWRITE_THIET_KE_WEBSITE_DOANH_NGHIEP,
  REWRITE_THIET_KE_WEBSITE_CHUAN_SEO,
  REWRITE_THIET_KE_WEBSITE_BAN_HANG,
  REWRITE_THIET_KE_WEBSITE_THEO_YEU_CAU,
  REWRITE_BAO_GIA_THIET_KE_WEBSITE,
  REWRITE_THIET_KE_WEBSITE_CONG_TY,
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
  REWRITE_THIET_KE_WEBSITE_TRON_GOI,
  ...INDUSTRY_ARTICLES,
  ...KEYWORD_ARTICLES,
  ...LA_GI_ARTICLES,
  ...LOCAL_SEO_ARTICLES,
  ...WEBSITE_ARTICLES,
  ...MARKETING_ARTICLES,
  ...CUSTOMER_KEYWORD_ARTICLES,
];
