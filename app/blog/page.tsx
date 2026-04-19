import type { Metadata } from "next";
import Link from "next/link";
import { Flame } from "lucide-react";
import { getPublishedBlogs } from "@/lib/server-blog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com";

export const metadata: Metadata = {
  title: "Blog Marketing | Bứt Phá Marketing",
  description: "Thư viện bài viết marketing thực chiến, tối ưu SEO và tăng trưởng doanh thu.",
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: "Blog Marketing | Bứt Phá Marketing",
    description: "Thư viện bài viết marketing thực chiến, tối ưu SEO và tăng trưởng doanh thu.",
    url: `${BASE_URL}/blog`,
    type: "website",
    images: [{ url: `${BASE_URL}/opengraph.jpg`, alt: "Blog Bứt Phá Marketing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Marketing | Bứt Phá Marketing",
    description: "Thư viện bài viết marketing thực chiến, tối ưu SEO và tăng trưởng doanh thu.",
    images: [`${BASE_URL}/opengraph.jpg`],
  },
};

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog Marketing",
    url: `${BASE_URL}/blog`,
    description: "Thư viện bài viết marketing thực chiến, tối ưu SEO và tăng trưởng doanh thu.",
    inLanguage: "vi-VN",
    hasPart: blogs.slice(0, 12).map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      url: `${BASE_URL}/blog/${blog.slug}`,
      datePublished: blog.publishedAt || new Date(blog.timestamp).toISOString(),
    })),
  };

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-4xl font-black">Blog Marketing</h1>
      <p className="mt-2 text-sm text-gray-400">Bài viết chuẩn SEO, cập nhật theo xu hướng tăng trưởng mới nhất.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-card">
            <img
              src={blog.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80"}
              alt={blog.title}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="space-y-2 p-4">
              <p className="text-xs text-gray-400">{new Date(blog.publishedAt || blog.timestamp).toLocaleDateString("vi-VN")}</p>
              <div className="flex items-start gap-2">
                <h2 className="line-clamp-2 flex-1 text-lg font-bold text-white">{blog.title}</h2>
                {blog.hot && <Flame size={16} className="mt-1 text-orange-400" />}
              </div>
              <p className="line-clamp-3 text-sm text-gray-300">{blog.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
