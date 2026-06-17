import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getPublishedBlogs, BLOG_REVALIDATE_SECONDS } from "@/lib/server-blog";

const baseUrl = SITE_URL;
export const revalidate = BLOG_REVALIDATE_SECONDS;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/facebook", "/google-maps", "/website", "/blog", "/gioi-thieu", "/lien-he"];
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const blogs = await getPublishedBlogs();
  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug || blog.id}`,
    lastModified: new Date(blog.publishedAt || blog.timestamp),
    changeFrequency: "monthly",
    priority: blog.hot ? 0.9 : 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}

