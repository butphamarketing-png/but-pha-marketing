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
      href: "/seo-website",
      title: "SEO Website",
      desc: "Audit kỹ thuật, content cluster và lộ trình tăng trưởng organic.",
    },
    {
      href: "/marketing-automation",
      title: "Marketing Automation",
      desc: "Hệ thống thu lead, nuôi dưỡng và đồng bộ marketing-sales.",
    },
    {
      href: "/ai-marketing",
      title: "AI Marketing",
      desc: "Ứng dụng AI cho content ops và AI search optimization.",
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
    <main className="min-h-screen bg-background brand-section-muted px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="font-medium text-indigo-700 hover:text-indigo-900">
                Trang chủ
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li>
              <Link href="/blog" className="font-medium text-indigo-700 hover:text-indigo-900">
                Tin tức
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li className="font-semibold text-indigo-950" aria-current="page">
              {hub.headline}
            </li>
          </ol>
        </nav>

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="brand-eyebrow mb-4">Chủ đề silo</p>
            <h1 className="text-4xl font-bold tracking-tight text-indigo-950 md:text-5xl">{hub.headline}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{hub.description}</p>
            <p className="mt-3 text-sm font-semibold text-violet-700">
              {topicBlogs.length} bài viết trong chủ đề này
            </p>
          </div>

          <Link href={hub.serviceHref} className="brand-btn-primary self-start">
            {hub.serviceLabel}
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mb-8">
          <BlogTopicNav active={topic} />
        </div>

        {topic === "website" && (
          <section className="mb-8 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-indigo-50/40 p-6 md:p-8">
            <p className="brand-eyebrow mb-2">Từ khóa ưu tiên</p>
            <h2 className="text-2xl font-black text-indigo-950 md:text-3xl">Cụm «thiết kế website»</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Đọc theo thứ tự: money page → pillar → báo giá. Tránh nhảy thẳng vào bài ngành khi chưa nắm quy trình và giá.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/website" className="brand-btn-primary">
                Thiết kế website (dịch vụ)
              </Link>
              <Link href="/blog/thiet-ke-website" className="brand-btn-secondary">
                Pillar thiết kế website
              </Link>
              <Link href="/blog/bao-gia-thiet-ke-website" className="brand-btn-secondary">
                Báo giá thiết kế website
              </Link>
              <Link href="/seo-website" className="brand-btn-secondary">
                SEO Website
              </Link>
            </div>
          </section>
        )}

        {topic === "facebook" && (
          <section className="mb-8 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/40 p-6 md:p-8">
            <p className="brand-eyebrow mb-2">Funnel Facebook</p>
            <h2 className="text-2xl font-black text-indigo-950 md:text-3xl">Fanpage → Care → Meta Ads</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Thiết kế Fanpage chuẩn thương hiệu trước, chăm sóc content đều đặn, sau đó mới scale Meta Ads. Case Sao Khuê: 83K lượt xem Fanpage trong 90 ngày.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/facebook" className="brand-btn-primary">
                Dịch vụ Facebook
              </Link>
              <Link href="/facebook/thiet-ke-fanpage" className="brand-btn-secondary">
                Thiết kế Fanpage
              </Link>
              <Link href="/du-an/sao-khue" className="brand-btn-secondary">
                Case study Fanpage
              </Link>
              <Link href="/banggia" className="brand-btn-secondary">
                Bảng giá
              </Link>
            </div>
          </section>
        )}

        {topic === "google-maps" && (
          <section className="mb-8 rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50/80 via-white to-amber-50/40 p-6 md:p-8">
            <p className="brand-eyebrow mb-2">Local SEO</p>
            <h2 className="text-2xl font-black text-indigo-950 md:text-3xl">Google Maps + GBP + Review</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Tối ưu Google Business Profile, thu review thật và content Maps trước khi chạy Local Ads. Kết hợp website chuẩn SEO để tăng chuyển đổi.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/google-maps" className="brand-btn-primary">
                Dịch vụ Google Maps
              </Link>
              <Link href="/google-maps/thiet-ke-google-maps" className="brand-btn-secondary">
                Thiết kế GBP
              </Link>
              <Link href="/seo-website/dia-phuong/ho-chi-minh" className="brand-btn-secondary">
                SEO địa phương HCM
              </Link>
              <Link href="/du-an/nha-khoa-dang-khoa" className="brand-btn-secondary">
                Case study SEO
              </Link>
            </div>
          </section>
        )}

        {topic === "marketing" && (
          <section className="mb-8 rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50/80 via-white to-fuchsia-50/40 p-6 md:p-8">
            <p className="brand-eyebrow mb-2">Chiến lược đa kênh</p>
            <h2 className="text-2xl font-black text-indigo-950 md:text-3xl">Website + SEO + Ads + Automation</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Marketing online hiệu quả cần nền tảng website chuẩn SEO, kênh thu lead (Facebook, Google Maps) và hệ thống đo lường KPI. Đọc pillar theo mục tiêu: tăng traffic organic, giảm CPA ads hoặc nuôi dưỡng lead B2B — tránh nhồi nhét kênh khi chưa có landing page chuyển đổi.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/kien-thuc" className="brand-btn-primary">
                Trung tâm kiến thức
              </Link>
              <Link href="/blog/marketing-online-la-gi" className="brand-btn-secondary">
                Marketing online là gì
              </Link>
              <Link href="/marketing-automation" className="brand-btn-secondary">
                Marketing Automation
              </Link>
              <Link href="/lien-he" className="brand-btn-secondary">
                Tư vấn chiến lược
              </Link>
            </div>
          </section>
        )}

        <BlogTopicPillarCards pillars={pillars} />

        <section className="mb-8 rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Strategic Pillars</p>
          <h2 className="text-2xl font-bold tracking-tight text-indigo-950">Trụ cột tăng trưởng liên quan</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {strategicPillars.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-indigo-100 p-4 transition hover:border-violet-300"
              >
                <p className="font-semibold text-indigo-950">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <BlogInlineCTA slug={`chu-de-${topic}`} topic={hub.topic} />

        <BlogSearchGrid blogs={toBlogListItems(topicBlogs)} />
      </div>
    </main>
  );
}
