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
    <main className="relative min-h-screen overflow-hidden deep-theme text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[40vh]"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(196,149,90,0.16), transparent 58%), radial-gradient(ellipse 45% 40% at 88% 18%, rgba(139,124,246,0.14), transparent 55%), radial-gradient(ellipse 40% 35% at 12% 40%, rgba(109,90,230,0.08), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 py-12 pb-28 sm:px-6 md:py-16 lg:px-8">
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
              <Link href="/du-an" className="font-medium text-white/40 hover:text-white">
                Dự án
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/25">
              /
            </li>
            <li className="line-clamp-1 font-medium text-white/70" aria-current="page">
              {study.clientName}
            </li>
          </ol>
        </nav>

        <CaseStudyDetail study={study} variant="deep" />

        {others.length > 0 && (
          <section className="mt-14 border-t border-white/[0.06] pt-14">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Dự án khác
            </h2>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              {others.map((item) => (
                <CaseStudyCard key={item.slug} study={item} variant="deep" />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
