import { buildRewriteArticle } from "./seo-rewrite-builder.mjs";
import { newsThumbnailForArticle } from "./seo-article-helpers.mjs";

/** Rewrite từ industry entry + keyword chuyên ngành điện công nghiệp */
const built = buildRewriteArticle({
  slug: "thiet-ke-website-dien-cong-nghiep",
  title: "Thiết Kế Website Công Ty Điện Công Nghiệp Chuẩn SEO",
  keywordsMain: "thiết kế website điện công nghiệp",
  keywordsSecondary:
    "website điện công nghiệp, website tủ điện, website nhà thầu điện, thiết kế web lắp đặt điện nhà máy",
  description:
    "Hướng dẫn thiết kế website công ty điện công nghiệp: catalog tủ điện, năng lực lắp đặt, chứng chỉ và SEO B2B.",
});

export const REWRITE_THIET_KE_WEBSITE_DIEN_CONG_NGHIEP = {
  ...built,
  imageUrl: newsThumbnailForArticle({ slug: "thiet-ke-website-dien-cong-nghiep" }),
};
