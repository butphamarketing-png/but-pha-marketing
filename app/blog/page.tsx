import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { getPublishedBlogs } from "@/lib/server-blog";
import { BlogSearchGrid } from "@/components/blog/BlogSearchGrid";
import { BlogTopicNav } from "@/components/blog/BlogTopicNav";
import { BlogCaseStudyStrip } from "@/components/blog/BlogCaseStudyStrip";
import { BlogIndustryNav } from "@/components/blog/BlogIndustryNav";

const BASE_URL = SITE_URL;

/** Next.js yeu cau literal — khong import bien cho segment config. */
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Tin tức Marketing | Bứt Phá Marketing",
  description:
    "Thư viện bài viết marketing thực chiến, tối ưu SEO và tăng trưởng doanh thu.",
  path: "/blog",
  keywords: [
    "tin tức marketing",
    "kiến thức marketing",
    "seo website",
    "facebook ads",
    "google maps",
  ],
});

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
    description:
      "Thư viện bài viết marketing thực chiến, tối ưu SEO và tăng trưởng doanh thu.",
    inLanguage: "vi-VN",
    isPartOf: { "@type": "WebSite", name: "Bứt Phá Marketing", url: BASE_URL },
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
    <main className="relative min-h-screen overflow-hidden deep-theme text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/40">
              Kiến thức thực chiến
            </p>
            <h1 className="mt-2 text-[1.75rem] font-semibold leading-snug tracking-tight text-white sm:text-[2.05rem]">
              Tin tức &amp; Kiến thức
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">
              Cập nhật xu hướng, chiến lược và kiến thức marketing giúp doanh nghiệp tăng trưởng bền vững.
            </p>
          </div>

          <Link
            href="/website"
            className="inline-flex items-center gap-2 self-start rounded-md bg-[#6D5CE6] px-4 py-2 text-sm font-medium text-white hover:bg-[#5B4BD4]"
          >
            Thiết kế website
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mb-5">
          <BlogTopicNav active="all" variant="deep" />
        </div>

        <div className="mb-8">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.12em] text-white/40">
            Silo theo ngành
          </p>
          <BlogIndustryNav variant="deep" />
        </div>

        <BlogCaseStudyStrip variant="deep" />

        <section className="mb-10 border-t border-white/[0.08] pt-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/40">Growth Pillars</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            Nền tảng tăng trưởng
          </h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {growthPillars.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-l border-white/15 pl-5 transition hover:border-white/30"
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
