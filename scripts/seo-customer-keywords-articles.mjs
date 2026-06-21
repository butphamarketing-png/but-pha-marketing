import { CUSTOMER_KEYWORDS_100 } from "./seo-customer-keywords-100.mjs";
import { buildRewriteArticle } from "./seo-rewrite-builder.mjs";
import { buildMarketingArticleFromEntry } from "./seo-marketing-builder.mjs";

const REWRITE_SLUG_PREFIXES = ["thiet-ke-website", "bao-gia-thiet-ke"];
const REWRITE_EXACT = new Set([
  "thiet-ke-website",
  "bao-gia-thiet-ke-website",
  "chuyen-nghiep-gia-tot",
  "gia-re-uy-tin",
  "thiet-ke-website-doanh-nghiep",
  "thiet-ke-website-chuan-seo",
  "thiet-ke-website-ban-hang",
  "thiet-ke-website-spa",
  "thiet-ke-website-nha-khoa",
  "thiet-ke-website-cong-ty-xay-dung",
  "thiet-ke-website-nha-hang",
  "thiet-ke-website-toc-do-cao",
  "thiet-ke-website-dich-vu-seo",
  "thiet-ke-website-tphcm",
  "cach-dua-doanh-nghiep-len-google-maps",
  "toi-uu-google-business-profile",
  "seo-local-cho-spa",
  "seo-local-tphcm",
]);

function shouldUseRewriteBuilder(slug) {
  if (slug.endsWith("-la-gi")) return true;
  if (REWRITE_EXACT.has(slug)) return true;
  return REWRITE_SLUG_PREFIXES.some((p) => slug.startsWith(p));
}

export const CUSTOMER_KEYWORD_ARTICLES = CUSTOMER_KEYWORDS_100.map((entry, index) => {
  const base = {
    slug: entry.slug,
    title: entry.h1,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: `${entry.keywordsMain}, ${entry.niche}, bứt phá marketing`,
    description: `${entry.keywordsMain}: ${entry.angle}.`,
  };
  return shouldUseRewriteBuilder(entry.slug)
    ? buildRewriteArticle(base)
    : buildMarketingArticleFromEntry(entry, index);
});
