import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Flame } from "lucide-react";
import { getPublishedBlogs } from "@/lib/server-blog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tin Tuc Marketing | But Pha Marketing",
  description: "Thu vien bai viet marketing thuc chien, toi uu SEO va tang truong doanh thu.",
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: "Tin Tuc Marketing | But Pha Marketing",
    description: "Thu vien bai viet marketing thuc chien, toi uu SEO va tang truong doanh thu.",
    url: `${BASE_URL}/blog`,
    type: "website",
    images: [{ url: `${BASE_URL}/opengraph.jpg`, alt: "Tin tuc But Pha Marketing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tin Tuc Marketing | But Pha Marketing",
    description: "Thu vien bai viet marketing thuc chien, toi uu SEO va tang truong doanh thu.",
    images: [`${BASE_URL}/opengraph.jpg`],
  },
};

function resolveBlogTag(title: string, slug: string) {
  const value = `${title} ${slug}`.toLowerCase();
  if (value.includes("facebook")) return "FACEBOOK ADS";
  if (value.includes("google maps") || value.includes("maps")) return "GOOGLE MAPS";
  if (value.includes("website") || value.includes("web")) return "WEBSITE";
  if (value.includes("seo")) return "SEO";
  return "XU HUONG";
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tin tuc Marketing",
    url: `${BASE_URL}/blog`,
    description: "Thu vien bai viet marketing thuc chien, toi uu SEO va tang truong doanh thu.",
    inLanguage: "vi-VN",
    hasPart: blogs.slice(0, 12).map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      url: `${BASE_URL}/blog/${blog.slug}`,
      datePublished: blog.publishedAt || new Date(blog.timestamp).toISOString(),
    })),
  };

  return (
    <main className="min-h-screen bg-[#070310] px-4 py-12 text-slate-900 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-violet-600 shadow-[0_0_20px_rgba(217,70,239,0.95)]" />
              <span className="h-px w-20 bg-gradient-to-r from-violet-600 to-transparent" />
            </div>
            <h1 className="text-4xl font-extrabold uppercase tracking-[-0.02em] text-slate-900 md:text-5xl">
              Tin tức &{" "}
              <span className="bg-gradient-to-r from-violet-500 to-violet-500 bg-clip-text text-transparent">Kiến thức</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-slate-900/72">
              Cập nhật những xu hướng, chiến lược và kiến thức marketing mới nhất giúp bạn tăng trưởng bền vững.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-3 self-start rounded-[1.35rem] border border-violet-600/40 bg-[#12071f] px-7 py-4 text-lg font-semibold text-slate-900 transition hover:border-violet-500 hover:bg-[#1b0a2d]"
          >
            Xem tất cả bài viết
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group flex h-full flex-col rounded-[1.8rem] border border-violet-600/20 bg-[#0a0614] p-4 shadow-[0_30px_90px_rgba(16,8,30,0.55)] transition duration-300 hover:-translate-y-1 hover:border-violet-500/45 hover:shadow-[0_35px_100px_rgba(112,41,225,0.25)]"
            >
              <div className="relative overflow-hidden rounded-[1.4rem] border border-violet-600/15 bg-[#12071f]">
                <img
                  src={blog.imageUrl || "/mascot-home.png"}
                  alt={blog.title}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0614]/80 via-[#0a0614]/10 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#5e2ac6] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(94,42,198,0.4)]">
                  <CalendarDays size={16} />
                  {new Date(blog.publishedAt || blog.timestamp).toLocaleDateString("vi-VN")}
                </div>
                {blog.hot && (
                  <div className="absolute right-4 top-4 rounded-full bg-orange-500/90 p-2 text-white shadow-[0_0_24px_rgba(249,115,22,0.45)]">
                    <Flame size={16} />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                <span className="mb-4 inline-flex self-start rounded-full bg-[#5c1ea8] px-4 py-2 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-slate-900">
                  {resolveBlogTag(blog.title, blog.slug || "")}
                </span>
                <h2 className="line-clamp-2 text-xl font-extrabold leading-tight text-slate-900 transition group-hover:text-violet-600">
                  {blog.title}
                </h2>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-900/60">{blog.description}</p>
                <div className="mt-auto pt-8">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 transition group-hover:text-violet-600">
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
