import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Flame } from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { getPublishedBlogs } from "@/lib/server-blog";

const BASE_URL = SITE_URL;
export const dynamic = "force-dynamic";

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

function resolveBlogTag(title: string, slug: string) {
  const value = `${title} ${slug}`.toLowerCase();
  if (value.includes("facebook")) return "Facebook Ads";
  if (value.includes("google maps") || value.includes("maps")) return "Google Maps";
  if (value.includes("website") || value.includes("web")) return "Website";
  if (value.includes("seo")) return "SEO";
  return "Xu hướng";
}

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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-indigo-100 bg-white shadow-brand transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-brand-lg"
            >
              <div className="relative overflow-hidden">
                <img
                  src={blog.imageUrl || "/mascot-home.png"}
                  alt={blog.title}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/50 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-indigo-900 shadow-sm">
                  <CalendarDays size={14} className="text-violet-600" />
                  {new Date(blog.publishedAt || blog.timestamp).toLocaleDateString("vi-VN")}
                </div>
                {blog.hot && (
                  <div className="absolute right-4 top-4 rounded-full bg-orange-500 p-2 text-white shadow-md">
                    <Flame size={16} />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="mb-3 inline-flex self-start rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-700">
                  {resolveBlogTag(blog.title, blog.slug || "")}
                </span>
                <h2 className="line-clamp-2 text-lg font-black leading-snug text-indigo-950 transition group-hover:text-violet-700">
                  {blog.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{blog.description}</p>
                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 transition group-hover:gap-3">
                    Xem chi tiết
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
