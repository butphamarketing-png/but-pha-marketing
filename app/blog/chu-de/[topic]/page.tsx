import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SITE_URL, buildHubMetadata } from "@/lib/seo";
import { getPublishedBlogs } from "@/lib/server-blog";
import { BlogSearchGrid } from "@/components/blog/BlogSearchGrid";
import { BlogTopicNav } from "@/components/blog/BlogTopicNav";
import { BlogTopicPillarCards } from "@/components/blog/BlogTopicPillarCards";
import { BlogInlineCTA } from "@/components/blog/BlogInlineCTA";
import {
  filterBlogsByTopic,
  getBlogTopicHub,
  getPillarsForTopic,
  isBlogTopicSlug,
  sortTopicBlogs,
  toBlogListItems,
  BLOG_TOPIC_SLUGS,
} from "@/lib/blog-topic-hub";

const BASE_URL = SITE_URL;
const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

export const revalidate = 3600;
export const dynamicParams = false;

type Params = { topic: string };

export function generateStaticParams() {
  return BLOG_TOPIC_SLUGS.map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { topic } = await params;
  if (!isBlogTopicSlug(topic)) return {};

  const hub = getBlogTopicHub(topic);

  return buildHubMetadata({
    title: `${hub.title} | Bứt Phá Marketing`,
    description: hub.description,
    path: `/blog/chu-de/${topic}`,
  });
}

export default async function BlogTopicHubPage({ params }: { params: Promise<Params> }) {
  const { topic } = await params;
  if (!isBlogTopicSlug(topic)) notFound();

  const hub = getBlogTopicHub(topic);
  const allBlogs = await getPublishedBlogs();
  const topicBlogs = sortTopicBlogs(filterBlogsByTopic(allBlogs, topic));
  const pillars = getPillarsForTopic(topic);
  const canonical = `${BASE_URL}/blog/chu-de/${topic}`;
  const strategicPillars = [
    {
      href: "/website",
      title: "Thiết kế website",
      desc: "Money Page Website — chuẩn SEO và chuyển đổi.",
    },
    {
      href: "/facebook",
      title: "Facebook Marketing",
      desc: "Money Page Facebook — Fanpage, care và Meta Ads.",
    },
    {
      href: "/google-maps",
      title: "Google Maps",
      desc: "Money Page Maps — GBP, Local SEO và review thật.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.title,
    url: canonical,
    description: hub.description,
    inLanguage: "vi-VN",
    isPartOf: { "@type": "Blog", "@id": `${BASE_URL}/blog#blog`, name: "Tin tức Marketing" },
    hasPart: topicBlogs.slice(0, 12).map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      url: `${BASE_URL}/blog/${blog.slug}`,
      datePublished: blog.publishedAt || new Date(blog.timestamp).toISOString(),
    })),
  };

  return (
    <main className="relative min-h-screen overflow-hidden deep-theme text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(196,149,90,0.16), transparent 58%), radial-gradient(ellipse 45% 40% at 88% 18%, rgba(139,124,246,0.14), transparent 55%), radial-gradient(ellipse 40% 35% at 12% 40%, rgba(109,90,230,0.08), transparent 50%), radial-gradient(ellipse 40% 30% at 20% 30%, rgba(234,88,12,0.06), transparent)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/40">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="font-medium text-amber-200/70 hover:text-amber-100">
                Trang chủ
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/25">
              /
            </li>
            <li>
              <Link href="/blog" className="font-medium text-amber-200/70 hover:text-amber-100">
                Tin tức
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/25">
              /
            </li>
            <li className="font-medium text-white/70" aria-current="page">
              {hub.headline}
            </li>
          </ol>
        </nav>

        <div className="mb-14 flex flex-col gap-8 border-b border-white/[0.06] pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-200/70">
              Chủ đề silo
            </p>
            <h1
              className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-white"
              style={serif}
            >
              {hub.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/45 sm:text-[15px]">
              {hub.description}
            </p>
            <p className="mt-3 text-sm font-medium text-amber-200/60">
              {topicBlogs.length} bài viết trong chủ đề này
            </p>
          </div>

          <Link
            href={hub.serviceHref}
            className="inline-flex items-center gap-2 self-start rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-[#0b0d12] hover:bg-amber-100"
          >
            {hub.serviceLabel}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mb-8">
          <BlogTopicNav active={topic} variant="deep" />
        </div>

        {topic === "website" && (
          <section className="mb-8 border border-amber-200/15 bg-gradient-to-br from-amber-200/[0.07] to-transparent px-6 py-8 sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/60">
              Từ khóa ưu tiên
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl" style={serif}>
              Cụm «thiết kế website»
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45 md:text-base">
              Đọc theo thứ tự: money page → pillar → báo giá. Tránh nhảy thẳng vào bài ngành khi chưa nắm quy trình và giá.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/website"
                className="inline-flex rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-[#0b0d12] hover:bg-amber-100"
              >
                Thiết kế website (Money Page)
              </Link>
              <Link
                href="/banggia"
                className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 hover:border-white/25"
              >
                Báo giá thiết kế website
              </Link>
              <Link
                href="/blog/thiet-ke-website"
                className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 hover:border-white/25"
              >
                Pillar thiết kế website
              </Link>
            </div>
          </section>
        )}

        {topic === "facebook" && (
          <section className="mb-8 border border-amber-200/15 bg-gradient-to-br from-amber-200/[0.07] to-transparent px-6 py-8 sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/60">
              Funnel Facebook
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl" style={serif}>
              Fanpage → Care → Meta Ads
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45 md:text-base">
              Thiết kế Fanpage chuẩn thương hiệu trước, chăm sóc content đều đặn, sau đó mới scale Meta Ads. Case Sao Khuê: 83K lượt xem Fanpage trong 90 ngày.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/facebook"
                className="inline-flex rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-[#0b0d12] hover:bg-amber-100"
              >
                Dịch vụ Facebook (Money Page)
              </Link>
              <Link
                href="/du-an/sao-khue"
                className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 hover:border-white/25"
              >
                Case study Fanpage
              </Link>
            </div>
          </section>
        )}

        {topic === "google-maps" && (
          <section className="mb-8 border border-amber-200/15 bg-gradient-to-br from-amber-200/[0.07] to-transparent px-6 py-8 sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/60">
              Local SEO
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl" style={serif}>
              Google Maps + GBP + Review
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45 md:text-base">
              Tối ưu Google Business Profile, thu review thật và content Maps trước khi chạy Local Ads. Kết hợp website chuẩn SEO để tăng chuyển đổi.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/google-maps"
                className="inline-flex rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-[#0b0d12] hover:bg-amber-100"
              >
                Dịch vụ Google Maps (Money Page)
              </Link>
              <Link
                href="/du-an/nha-khoa-dang-khoa"
                className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 hover:border-white/25"
              >
                Case study
              </Link>
            </div>
          </section>
        )}

        {topic === "marketing" && (
          <section className="mb-8 border border-amber-200/15 bg-gradient-to-br from-amber-200/[0.07] to-transparent px-6 py-8 sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/60">
              Chiến lược đa kênh
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl" style={serif}>
              Website + SEO + Ads + Automation
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45 md:text-base">
              Marketing online hiệu quả cần nền tảng website chuẩn SEO, kênh thu lead (Facebook, Google Maps) và hệ thống đo lường KPI. Đọc pillar theo mục tiêu: tăng traffic organic, giảm CPA ads hoặc nuôi dưỡng lead B2B — tránh nhồi nhét kênh khi chưa có landing page chuyển đổi.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/kien-thuc"
                className="inline-flex rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-[#0b0d12] hover:bg-amber-100"
              >
                Trung tâm kiến thức
              </Link>
              <Link
                href="/blog/marketing-online-la-gi"
                className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 hover:border-white/25"
              >
                Marketing online là gì
              </Link>
              <Link
                href="/marketing-automation"
                className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 hover:border-white/25"
              >
                Marketing Automation
              </Link>
              <Link
                href="/website"
                className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 hover:border-white/25"
              >
                Thiết kế website
              </Link>
            </div>
          </section>
        )}

        <BlogTopicPillarCards pillars={pillars} variant="deep" />

        <section className="mb-8 border-t border-white/[0.06] pt-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">
            Strategic Pillars
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl" style={serif}>
            Trụ cột tăng trưởng liên quan
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {strategicPillars.map((item) => (
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

        <BlogInlineCTA slug={`chu-de-${topic}`} topic={hub.topic} variant="deep" />

        <div className="mt-10">
          <BlogSearchGrid blogs={toBlogListItems(topicBlogs)} variant="deep" />
        </div>
      </div>
    </main>
  );
}
