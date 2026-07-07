import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";
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
  const canonical = `${BASE_URL}/blog/nganh/${industry}`;

  return {
    title: `${hub.title} | Silo SEO | Bứt Phá Marketing`,
    description: hub.description,
    alternates: { canonical },
    openGraph: {
      title: hub.title,
      description: hub.description,
      url: canonical,
      type: "website",
      locale: "vi_VN",
      siteName: "Bứt Phá Marketing",
      images: [{ url: `${BASE_URL}/opengraph.jpg`, alt: hub.title }],
    },
  };
}

export default async function IndustryHubPage({ params }: { params: Promise<Params> }) {
  const { industry } = await params;
  if (!isIndustryHubSlug(industry)) notFound();

  const hub = getIndustryHub(industry);
  const allBlogs = await getPublishedBlogs();
  const industryBlogs = filterBlogsByIndustryHub(allBlogs, industry);
  const caseStudy = hub.caseStudySlug ? getCaseStudyBySlug(hub.caseStudySlug) : undefined;
  const canonical = `${BASE_URL}/blog/nganh/${industry}`;
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
            <p className="brand-eyebrow mb-4">Silo ngành — Vertical Proof</p>
            <h1 className="text-4xl font-bold tracking-tight text-indigo-950 md:text-5xl">{hub.headline}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{hub.description}</p>
            <p className="mt-3 text-sm font-semibold text-violet-700">
              {industryBlogs.length} bài trong silo · Keyword chính: {hub.keywordsMain}
            </p>
          </div>

          <Link href={hub.serviceHref} className="brand-btn-primary self-start">
            {hub.serviceLabel}
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Silo ngành khác</p>
          <BlogIndustryNav active={industry} />
        </div>

        {caseStudy && (
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-black text-indigo-950">Case study có số liệu</h2>
              <Link
                href="/du-an"
                className="text-sm font-bold text-violet-700 hover:text-violet-900"
              >
                Tất cả dự án →
              </Link>
            </div>
            <div className="max-w-2xl">
              <CaseStudyCard study={caseStudy} />
            </div>
          </div>
        )}

        <section className="mb-8 rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Internal Link Boost</p>
          <h2 className="text-2xl font-bold tracking-tight text-indigo-950">Liên kết chiến lược trong cụm</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {strategicLinks.map((item) => (
              <Link key={item.href} href={item.href} className="brand-btn-secondary">
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <BlogSearchGrid blogs={toIndustryBlogListItems(industryBlogs)} />
      </div>
    </main>
  );
}
