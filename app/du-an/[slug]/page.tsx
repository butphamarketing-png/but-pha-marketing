import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL, buildMetadata } from "@/lib/seo";
import {
  CASE_STUDY_SLUGS,
  getAllCaseStudies,
  getCaseStudyBySlug,
} from "@/lib/case-studies";
import { buildCaseStudyJsonLd } from "@/lib/case-study-schema";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";
import { CaseStudyDetail } from "@/components/case-study/CaseStudyDetail";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  return {
    ...buildMetadata({
      title: study.metaTitle,
      description: study.metaDescription,
      path: `/du-an/${slug}`,
      type: "article",
      image: study.thumbnail,
      keywords: [study.keywordsMain, ...study.keywordsSecondary],
    }),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const others = getAllCaseStudies().filter((s) => s.slug !== slug);
  const canonical = `${SITE_URL}/du-an/${slug}`;
  const jsonLd = buildCaseStudyJsonLd({ study, canonical, baseUrl: SITE_URL });

  return (
    <main className="brand-section-muted mx-auto min-h-screen max-w-5xl px-4 py-10 pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
            <Link href="/du-an" className="font-medium text-indigo-700 hover:text-indigo-900">
              Dự án
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-400">
            /
          </li>
          <li className="line-clamp-1 font-semibold text-indigo-950" aria-current="page">
            {study.clientName}
          </li>
        </ol>
      </nav>

      <CaseStudyDetail study={study} />

      {others.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-black text-indigo-950">Dự án khác</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {others.map((item) => (
              <CaseStudyCard key={item.slug} study={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
