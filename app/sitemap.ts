import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { blogSitemapChangeFrequency, blogSitemapPriority } from "@/lib/blog-seo";
import { BLOG_TOPIC_SLUGS } from "@/lib/blog-topic-hub";
import { getPublishedBlogs } from "@/lib/server-blog";

const baseUrl = SITE_URL;

/** Next.js yêu cầu literal — không import biến cho segment config. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
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
    "/blog",
    "/gioi-thieu",
    "/lien-he",
    "/banggia",
  ];
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const blogs = await getPublishedBlogs();
  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug || blog.id}`,
    lastModified: new Date(blog.updatedAt || blog.publishedAt || blog.timestamp),
    changeFrequency: blogSitemapChangeFrequency(blog),
    priority: blogSitemapPriority(blog),
  }));

  const topicHubEntries: MetadataRoute.Sitemap = BLOG_TOPIC_SLUGS.map((slug) => ({
    url: `${baseUrl}/blog/chu-de/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.88,
  }));

  return [...staticEntries, ...topicHubEntries, ...blogEntries];
}

