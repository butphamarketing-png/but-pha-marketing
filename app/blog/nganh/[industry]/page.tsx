import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SITE_URL, buildHubMetadata } from "@/lib/seo";
import { getPublishedBlogs } from "@/lib/server-blog";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { BlogSearchGrid } from "@/components/blog/BlogSearchGrid";
import { BlogIndustryNav } from "@/components/blog/BlogIndustryNav";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";
import {
  filterBlogsByIndustryHub,
  getIndustryHub,
  isIndustryHubSlug,
  INDUSTRY_HUB_SLUGS,
  toIndustryBlogListItems,
} from "@/lib/industry-hub";
import { getVerticalProofLinks, isPriorityVertical } from "@/lib/vertical-proof-engine";

const BASE_URL = SITE_URL;

export const revalidate = 3600;
export const dynamicParams = false;

type Params = { industry: string };

export function generateStaticParams() {
  return INDUSTRY_HUB_SLUGS.map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { industry } = await params;
  if (!isIndustryHubSlug(industry)) return {};

  const hub = getIndustryHub(industry);

  return buildHubMetadata({
    title: `${hub.title} | Silo SEO | Bứt Phá Marketing`,
    description: hub.description,
    path: `/blog/nganh/${industry}`,
  });
}

export default async function IndustryHubPage({ params }: { params: Promise<Params> }) {
  const { industry } = await params;
  if (!isIndustryHubSlug(industry)) notFound();

  const hub = getIndustryHub(industry);
  const allBlogs = await getPublishedBlogs();
  const industryBlogs = filterBlogsByIndustryHub(allBlogs, industry);
  const caseStudy = hub.caseStudySlug ? getCaseStudyBySlug(hub.caseStudySlug) : undefined;
  const canonical = `${BASE_URL}/blog/nganh/${industry}`;
  const proofLinks = isPriorityVertical(industry) ? getVerticalProofLinks(industry) : [];
  const strategicLinks = [
    {
      href: "/website",
      label: "Dịch vụ Website",
    },
    {
      href: "/seo-website",
      label: "SEO Website tổng thể",
    },
    {
      href: "/kien-thuc",
      label: "Trung tâm kiến thức",
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
    about: { "@type": "Thing", name: hub.keywordsMain },
    hasPart: industryBlogs.map((blog) => ({
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
              <Link href="/" className="font-medium text-white/40 hover:text-white">
                Trang chủ
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/25">
              /
            </li>
            <li>
              <Link href="/blog" className="font-medium text-white/40 hover:text-white">
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
              Silo ngành — Vertical Proof
            </p>
            <h1
              className="mt-4 text-[1.75rem] sm:text-[2.05rem] font-semibold leading-[1.08] tracking-tight text-white"
             
            >
              {hub.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/45 sm:text-[15px]">
              {hub.description}
            </p>
            <p className="mt-3 text-sm font-medium text-white/40">
              {industryBlogs.length} bài trong silo · Keyword chính: {hub.keywordsMain}
            </p>
          </div>

          <Link
            href={hub.serviceHref}
            className="inline-flex items-center gap-2 self-start rounded-md bg-[#6D5CE6] px-4 py-2 text-sm font-medium text-white hover:bg-[#5B4BD4]"
          >
            {hub.serviceLabel}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mb-10">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">
            Silo ngành khác
          </p>
          <BlogIndustryNav active={industry} variant="deep" />
        </div>

        {caseStudy && (
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white">
                Case study có số liệu
              </h2>
              <Link href="/du-an" className="text-sm font-medium text-white/65 hover:text-white">
                Tất cả dự án →
              </Link>
            </div>
            <div className="max-w-2xl">
              <CaseStudyCard study={caseStudy} variant="deep" />
            </div>
          </div>
        )}

        {proofLinks.length > 0 && (
          <section className="mb-6 border border-white/10 bg-[#0e1018] px-5 py-5 sm:px-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
              Vertical Proof Engine
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
              Bộ URL proof đầy đủ
            </h2>
            <p className="mt-2 text-sm text-white/45">
              Money · Checklist · Template · Hub · Case study · Cluster — liên kết chéo chuẩn intent.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {proofLinks.map((link) => (
                <Link
                  key={link.slot}
                  href={link.href}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/75 hover:border-white/25 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-10 border-t border-white/[0.06] pt-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Internal Link Boost
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            Liên kết chiến lược trong cụm
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {strategicLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 hover:border-white/25 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <BlogSearchGrid blogs={toIndustryBlogListItems(industryBlogs)} variant="deep" />
      </div>
    </main>
  );
}
