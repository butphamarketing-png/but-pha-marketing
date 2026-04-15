import type { MetadataRoute } from "next";
import { getPublishedBlogs } from "@/lib/server-blog";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/facebook", "/tiktok", "/instagram", "/zalo", "/google-maps", "/website", "/blog"];
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

