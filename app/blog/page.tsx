import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { getPublishedBlogs } from "@/lib/server-blog";
import { BlogSearchGrid } from "@/components/blog/BlogSearchGrid";
import { BlogTopicNav } from "@/components/blog/BlogTopicNav";

const BASE_URL = SITE_URL;

/** Next.js yêu cầu literal — không import biến cho segment config. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tin tức Marketing | Bứt Phá Marketing",
  description: "Thư viện bài viết marketing thực chiến, tối ưu SEO và tăng trưởng doanh thu.",
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: "Tin tức Marketing | Bứt Phá Marketing",
    description: "Thư viện bài viết marketing thực chiến, tối ưu SEO và tăng trưởng doanh thu.",
    url: `${BASE_URL}/blog`,
    type: "website",
    images: [{ url: `${BASE_URL}/opengraph.jpg`, alt: "Tin tức Bứt Phá Marketing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tin tức Marketing | Bứt Phá Marketing",
    description: "Thư viện bài viết marketing thực chiến, tối ưu SEO và tăng trưởng doanh thu.",
    images: [`${BASE_URL}/opengraph.jpg`],
  },
};

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tin tức Marketing",
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

  const listItems = blogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    description: blog.description,
    metaDescription: blog.metaDescription,
    keywordsMain: blog.keywordsMain,
    keywordsSecondary: blog.keywordsSecondary,
    imageUrl: blog.imageUrl,
    slug: blog.slug,
    hot: blog.hot,
    publishedAt: blog.publishedAt,
    timestamp: blog.timestamp,
  }));

  return (
    <main className="min-h-screen bg-background brand-section-muted px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="brand-eyebrow mb-4">Kiến thức thực chiến</p>
            <h1 className="text-4xl font-bold tracking-tight text-indigo-950 md:text-5xl">
              Tin tức &{" "}
              <span className="brand-gradient-text">Kiến thức</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Cập nhật xu hướng, chiến lược và kiến thức marketing giúp doanh nghiệp tăng trưởng bền vững.
            </p>
          </div>

          <Link href="/lien-he" className="brand-btn-primary self-start">
            Nhận tư vấn miễn phí
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mb-8">
          <BlogTopicNav active="all" />
        </div>

        <BlogSearchGrid blogs={listItems} />
      </div>
    </main>
  );
}
