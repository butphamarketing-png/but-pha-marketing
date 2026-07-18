import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { getPublishedBlogs } from "@/lib/server-blog";
import { BlogSearchGrid } from "@/components/blog/BlogSearchGrid";
import { BlogTopicNav } from "@/components/blog/BlogTopicNav";
import { BlogCaseStudyStrip } from "@/components/blog/BlogCaseStudyStrip";
import { BlogIndustryNav } from "@/components/blog/BlogIndustryNav";

const BASE_URL = SITE_URL;
const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

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
  const growthPillars = [
    {
      href: "/website",
      title: "Thiết kế website",
      desc: "Money Page — dịch vụ thiết kế website chuẩn SEO.",
    },
    {
      href: "/facebook",
      title: "Facebook Marketing",
      desc: "Money Page — Fanpage, content và Meta Ads.",
    },
    {
      href: "/google-maps",
      title: "Google Maps",
      desc: "Money Page — GBP, Local SEO và review thật.",
    },
  ];
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
    <main className="relative min-h-screen overflow-hidden bg-[#08090c] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(196,149,90,0.14), transparent 58%), radial-gradient(ellipse 40% 30% at 20% 30%, rgba(234,88,12,0.06), transparent)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-14 flex flex-col gap-8 border-b border-white/[0.06] pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-200/70">
              Kiến thức thực chiến
            </p>
            <h1
              className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-white"
              style={serif}
            >
              Tin tức &amp; Kiến thức
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/45 sm:text-[15px]">
              Cập nhật xu hướng, chiến lược và kiến thức marketing giúp doanh nghiệp tăng trưởng bền vững.
            </p>
          </div>

          <Link
            href="/website"
            className="inline-flex items-center gap-2 self-start rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-[#0b0d12] hover:bg-amber-100"
          >
            Thiết kế website
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mb-5">
          <BlogTopicNav active="all" variant="deep" />
        </div>

        <div className="mb-10">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/50">
            Silo theo ngành
          </p>
          <BlogIndustryNav variant="deep" />
        </div>

        <BlogCaseStudyStrip variant="deep" />

        <section className="mb-12 border-t border-white/[0.06] pt-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">Growth Pillars</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl" style={serif}>
            Nền tảng tăng trưởng
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {growthPillars.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-l border-amber-200/25 pl-5 transition hover:border-amber-200/50"
              >
                <p className="text-lg font-medium text-white/90">{item.title}</p>
                <p className="mt-2 text-sm text-white/40">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <BlogSearchGrid blogs={listItems} variant="deep" />
      </div>
    </main>
  );
}
