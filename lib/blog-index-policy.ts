import { WEBSITE_INDUSTRY_CATALOG } from "@/lib/website-industry-catalog";
import { resolveIndustryBlogSlug } from "@/lib/blog-industry-resolve";
import { VERTICAL_PROOF_CONFIG } from "@/lib/vertical-proof-engine";
import { SITE_URL } from "@/lib/seo";
import type { ServerBlogItem } from "@/lib/server-blog";

const PILLAR_SLUGS = new Set([
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
]);

/** Money page chính + bài ngành phụ (shop đa brand, công ty xây dựng…). */
const SECONDARY_INDUSTRY_MONEY_SLUGS = [
  "thiet-ke-website-my-pham",
  "thiet-ke-website-cong-ty-xay-dung",
];

const INDUSTRY_BLOG_SLUGS = new Set([
  ...WEBSITE_INDUSTRY_CATALOG.map((item) => item.blogMoneySlug),
  ...Object.values(VERTICAL_PROOF_CONFIG).map((item) => item.moneySlug),
  ...SECONDARY_INDUSTRY_MONEY_SLUGS,
]);

/** Generic long-tail dưới ngưỡng này → noindex + canonical pillar. */
export const THIN_WEBSITE_MIN_CHARS = 12_000;

const BATCH_SUFFIX_RE = /-b\d+$/i;

export function isGenericWebsiteSlug(slug: string): boolean {
  return slug.startsWith("thiet-ke-website-") || slug.startsWith("bao-gia-thiet-ke-website-");
}

export type BlogIndexDecision =
  | { index: true }
  | { index: false; canonical: string };

export function getBlogIndexDecision(
  blog: Pick<ServerBlogItem, "slug" | "content" | "hot">,
): BlogIndexDecision {
  const slug = blog.slug || "";

  if (PILLAR_SLUGS.has(slug) || blog.hot || INDUSTRY_BLOG_SLUGS.has(slug)) {
    return { index: true };
  }

  if (!isGenericWebsiteSlug(slug)) {
    return { index: true };
  }

  const content = blog.content || "";
  if (content.includes('id="nganh"')) {
    return { index: true };
  }

  if (resolveIndustryBlogSlug(slug)) {
    return { index: true };
  }

  if (content.length >= THIN_WEBSITE_MIN_CHARS) {
    return { index: true };
  }

  const pillarSlug = slug.startsWith("bao-gia-") ? "bao-gia-thiet-ke-website" : "thiet-ke-website";
  return {
    index: false,
    canonical: `${SITE_URL}/blog/${pillarSlug}`,
  };
}

/** Heuristic khi không có content (sitemap) — chỉ loại batch mỏng rõ ràng. */
export function shouldExcludeBlogFromSitemap(blog: Pick<ServerBlogItem, "slug" | "hot">): boolean {
  const slug = blog.slug || "";
  if (blog.hot || PILLAR_SLUGS.has(slug) || INDUSTRY_BLOG_SLUGS.has(slug)) {
    return false;
  }
  if (!isGenericWebsiteSlug(slug)) {
    return false;
  }
  if (resolveIndustryBlogSlug(slug)) {
    return false;
  }
  return BATCH_SUFFIX_RE.test(slug);
}
