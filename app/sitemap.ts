import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { blogSitemapChangeFrequency, blogSitemapPriority } from "@/lib/blog-seo";
import { shouldExcludeBlogFromSitemap } from "@/lib/blog-index-policy";
import { BLOG_TOPIC_SLUGS } from "@/lib/blog-topic-hub";
import { INDUSTRY_HUB_SLUGS } from "@/lib/industry-hub";
import { CASE_STUDY_SLUGS } from "@/lib/case-studies";
import { getPublishedBlogs } from "@/lib/server-blog";
import { getIndexableProgrammaticPaths } from "@/lib/programmatic-seo";
import {
  lastModifiedForCaseStudy,
  lastModifiedForIndustryHub,
  lastModifiedForProgrammaticRoute,
  lastModifiedForStaticRoute,
  lastModifiedForTopicHub,
} from "@/lib/sitemap-dates";
import type { IndustryHubSlug } from "@/lib/industry-hub";

const baseUrl = SITE_URL;

/** Next.js yêu cầu literal — không import biến cho segment config. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/kien-thuc",
    "/kien-thuc/seo-website",
    "/kien-thuc/marketing-automation",
    "/kien-thuc/ai-marketing",
    "/facebook",
    "/facebook/thiet-ke-fanpage",
    "/facebook/cham-soc-fanpage",
    "/facebook/quang-cao-fanpage",
    "/google-maps",
    "/google-maps/thiet-ke-google-maps",
    "/google-maps/quang-cao-google-maps",
    "/website",
    "/website/thietkewebsite",
    "/website/van-hanh-website",
    "/website/ten-mien-website",
    "/website/cham-soc-website",
    "/website/quang-cao-website",
    "/seo-website",
    "/seo-website/technical-seo",
    "/seo-website/seo-content",
    "/marketing-automation",
    "/marketing-automation/lead-nurturing",
    "/marketing-automation/crm-automation",
    "/ai-marketing",
    "/ai-marketing/ai-content",
    "/ai-marketing/ai-search-optimization",
    "/blog",
    "/du-an",
    "/gioi-thieu",
    "/lien-he",
    "/banggia",
  ];
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: lastModifiedForStaticRoute(path),
    changeFrequency: path === "" || path === "/website" ? "daily" : "weekly",
    priority:
      path === ""
        ? 1
        : path === "/website"
          ? 0.98
          : path === "/website/thietkewebsite"
            ? 0.45
            : 0.8,
  }));
  const programmaticEntries: MetadataRoute.Sitemap = getIndexableProgrammaticPaths().map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: lastModifiedForProgrammaticRoute(),
    changeFrequency: "weekly",
    priority: 0.78,
  }));

  const blogs = await getPublishedBlogs();
  const blogEntries: MetadataRoute.Sitemap = blogs
    .filter((blog) => !shouldExcludeBlogFromSitemap(blog))
    .map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug || blog.id}`,
    lastModified: new Date(blog.updatedAt || blog.publishedAt || blog.timestamp),
    changeFrequency: blogSitemapChangeFrequency(blog),
    priority: blogSitemapPriority(blog),
  }));

  const topicHubEntries: MetadataRoute.Sitemap = BLOG_TOPIC_SLUGS.map((slug) => ({
    url: `${baseUrl}/blog/chu-de/${slug}`,
    lastModified: lastModifiedForTopicHub(),
    changeFrequency: "weekly",
    priority: 0.88,
  }));

  const industryHubEntries: MetadataRoute.Sitemap = INDUSTRY_HUB_SLUGS.map((slug) => ({
    url: `${baseUrl}/blog/nganh/${slug}`,
    lastModified: lastModifiedForIndustryHub(slug as IndustryHubSlug),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = CASE_STUDY_SLUGS.map((slug) => ({
    url: `${baseUrl}/du-an/${slug}`,
    lastModified: lastModifiedForCaseStudy(slug),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    ...staticEntries,
    ...programmaticEntries,
    ...topicHubEntries,
    ...industryHubEntries,
    ...caseStudyEntries,
    ...blogEntries,
  ];
}

