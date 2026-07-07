/**
 * Bài rewrite cho từ khóa thương mại còn thiếu slug chính.
 */
import { buildRewriteArticle } from "./seo-rewrite-builder.mjs";

const MISSING_COMMERCIAL = [
  {
    slug: "lam-website",
    h1: "Làm Website Chuẩn SEO — Quy Trình, Giá Và Checklist 2026",
    keywordsMain: "làm website",
    keywordsSecondary: "làm web, tạo website, chi phí làm website, làm website giá rẻ, làm website doanh nghiệp",
    angle: "quy trình làm website từ A-Z cho doanh nghiệp và cá nhân tại Việt Nam",
  },
  {
    slug: "gia-thiet-ke-website",
    h1: "Giá Thiết Kế Website 2026 — Bảng Giá Và Yếu Tố Ảnh Hưởng",
    keywordsMain: "giá thiết kế website",
    keywordsSecondary: "giá làm website, chi phí thiết kế web, bảng giá website, giá web doanh nghiệp 2026",
    angle: "bảng giá minh bạch và các yếu tố làm tăng giảm chi phí thiết kế website",
  },
  {
    slug: "seo-website",
    h1: "SEO Website — Dịch Vụ & Hướng Dẫn Đưa Web Lên Top Google",
    keywordsMain: "seo website",
    keywordsSecondary: "dịch vụ seo website, tối ưu seo website, seo on page, đưa website lên google",
    angle: "dịch vụ SEO website và checklist on-page giúp tăng thứ hạng Google bền vững",
  },
  {
    slug: "quang-cao-google",
    h1: "Quảng Cáo Google — Google Ads Cho Doanh Nghiệp Việt Nam",
    keywordsMain: "quảng cáo google",
    keywordsSecondary: "google ads, chạy quảng cáo google, quảng cáo google giá rẻ, google search ads",
    angle: "triển khai quảng cáo Google Search và Display hiệu quả cho SME",
  },
];

export const MISSING_COMMERCIAL_ARTICLES = MISSING_COMMERCIAL.map((entry) =>
  buildRewriteArticle({
    slug: entry.slug,
    title: entry.h1,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: entry.keywordsSecondary,
    description: entry.angle,
  }),
);
