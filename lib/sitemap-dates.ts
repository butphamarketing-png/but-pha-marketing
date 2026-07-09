import { CASE_STUDIES } from "@/lib/case-studies";
import { INDUSTRY_HUBS, type IndustryHubSlug } from "@/lib/industry-hub";

/** Ngày cập nhật thực cho route tĩnh — không dùng `new Date()` khi build sitemap. */
export const STATIC_ROUTE_LAST_MODIFIED: Record<string, string> = {
  "": "2026-07-07T00:00:00.000Z",
  "/kien-thuc": "2026-07-07T00:00:00.000Z",
  "/kien-thuc/seo-website": "2026-07-07T00:00:00.000Z",
  "/kien-thuc/marketing-automation": "2026-07-07T00:00:00.000Z",
  "/kien-thuc/ai-marketing": "2026-07-07T00:00:00.000Z",
  "/facebook": "2026-07-07T00:00:00.000Z",
  "/facebook/thiet-ke-fanpage": "2026-07-07T00:00:00.000Z",
  "/facebook/cham-soc-fanpage": "2026-07-07T00:00:00.000Z",
  "/facebook/quang-cao-fanpage": "2026-07-07T00:00:00.000Z",
  "/google-maps": "2026-07-07T00:00:00.000Z",
  "/google-maps/thiet-ke-google-maps": "2026-07-07T00:00:00.000Z",
  "/google-maps/quang-cao-google-maps": "2026-07-07T00:00:00.000Z",
  "/website": "2026-07-08T00:00:00.000Z",
  "/website/thietkewebsite": "2026-07-07T00:00:00.000Z",
  "/website/van-hanh-website": "2026-07-07T00:00:00.000Z",
  "/website/ten-mien-website": "2026-07-07T00:00:00.000Z",
  "/website/cham-soc-website": "2026-07-07T00:00:00.000Z",
  "/website/quang-cao-website": "2026-07-07T00:00:00.000Z",
  "/seo-website": "2026-07-07T00:00:00.000Z",
  "/seo-website/technical-seo": "2026-07-07T00:00:00.000Z",
  "/seo-website/seo-content": "2026-07-07T00:00:00.000Z",
  "/marketing-automation": "2026-07-07T00:00:00.000Z",
  "/marketing-automation/lead-nurturing": "2026-07-07T00:00:00.000Z",
  "/marketing-automation/crm-automation": "2026-07-07T00:00:00.000Z",
  "/ai-marketing": "2026-07-07T00:00:00.000Z",
  "/ai-marketing/ai-content": "2026-07-07T00:00:00.000Z",
  "/ai-marketing/ai-search-optimization": "2026-07-07T00:00:00.000Z",
  "/blog": "2026-07-08T00:00:00.000Z",
  "/du-an": "2026-07-08T00:00:00.000Z",
  "/gioi-thieu": "2026-07-07T00:00:00.000Z",
  "/lien-he": "2026-07-07T00:00:00.000Z",
  "/banggia": "2026-07-07T00:00:00.000Z",
};

const PROGRAMMATIC_LAST_MODIFIED = "2026-07-07T00:00:00.000Z";
const TOPIC_HUB_LAST_MODIFIED = "2026-07-07T00:00:00.000Z";

export function lastModifiedForStaticRoute(path: string): Date {
  const iso = STATIC_ROUTE_LAST_MODIFIED[path] ?? STATIC_ROUTE_LAST_MODIFIED[""];
  return new Date(iso);
}

export function lastModifiedForProgrammaticRoute(): Date {
  return new Date(PROGRAMMATIC_LAST_MODIFIED);
}

export function lastModifiedForTopicHub(): Date {
  return new Date(TOPIC_HUB_LAST_MODIFIED);
}

export function lastModifiedForIndustryHub(slug: IndustryHubSlug): Date {
  const hub = INDUSTRY_HUBS[slug];
  const reviewed = hub.proofReviewedAt;
  if (reviewed) return new Date(reviewed);
  return new Date(TOPIC_HUB_LAST_MODIFIED);
}

export function lastModifiedForCaseStudy(slug: string): Date {
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  const iso = study?.updatedAt ?? study?.publishedAt ?? TOPIC_HUB_LAST_MODIFIED;
  return new Date(iso);
}
