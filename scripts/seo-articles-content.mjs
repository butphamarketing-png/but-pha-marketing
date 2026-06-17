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
import { INDUSTRY_ARTICLES } from "./seo-industry-articles.mjs";
import { KEYWORD_ARTICLES } from "./seo-keyword-articles.mjs";
import { LA_GI_ARTICLES } from "./seo-la-gi-articles.mjs";
import { LOCAL_SEO_ARTICLES } from "./seo-local-articles.mjs";
import { WEBSITE_ARTICLES } from "./seo-website-articles.mjs";
import { MARKETING_ARTICLES } from "./seo-marketing-articles.mjs";

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
  REWRITE_THIET_KE_WEBSITE_TRON_GOI,
  ...INDUSTRY_ARTICLES,
  ...KEYWORD_ARTICLES,
  ...LA_GI_ARTICLES,
  ...LOCAL_SEO_ARTICLES,
  ...WEBSITE_ARTICLES,
  ...MARKETING_ARTICLES,
];
