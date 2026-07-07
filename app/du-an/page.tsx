import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, buildMetadata } from "@/lib/seo";
import { getAllCaseStudies } from "@/lib/case-studies";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";

export const metadata: Metadata = buildMetadata({
  title: "Case Study Thiết Kế Website & SEO | Dự Án Tiêu Biểu",
  description:
    "Case study thiết kế website, SEO và Facebook Marketing có số liệu GSC — proof layer cho topical authority ngành xây dựng, kiến trúc, spa, PCCC.",
  path: "/du-an",
  keywords: [
    "case study thiết kế website",
    "dự án seo website",
    "thiết kế website",
    "thiết kế website xây dựng",
    "marketing xây dựng",
  ],
});

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dự án & Case Study",
    url: `${SITE_URL}/du-an`,
    description: "Case study triển khai website, SEO và marketing cho khách hàng Bứt Phá Marketing.",
    inLanguage: "vi-VN",
    hasPart: studies.map((study) => ({
      "@type": "Article",
      headline: study.headline,
      url: `${SITE_URL}/du-an/${study.slug}`,
      datePublished: study.publishedAt,
    })),
  };

  return (
    <main className="brand-section-muted min-h-screen px-4 py-10 pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-6xl">
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
            <li className="font-semibold text-indigo-950" aria-current="page">
              Dự án
            </li>
          </ol>
        </nav>

        <header className="brand-page-hero mb-10 max-w-3xl">
          <p className="brand-eyebrow">Dự án tiêu biểu</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-indigo-950 md:text-5xl">
            Case study <span className="brand-gradient-text">thực chiến</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
            Website, SEO và Facebook Marketing — có số liệu GSC, từ khóa và minh chứng. Đây là{" "}
            <strong>proof layer</strong> trong chiến lược topical authority — cách MONA dùng portfolio, nhưng Bứt Phá
            đi sâu theo ngành với số liệu thật.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            Mỗi case study liên kết với cluster blog ngành (ví dụ:{" "}
            <Link href="/blog/thiet-ke-website-xay-dung-nha-thau" className="font-semibold text-indigo-700 hover:underline">
              thiết kế website xây dựng
            </Link>
            ) và trang{" "}
            <Link href="/website" className="font-semibold text-indigo-700 hover:underline">
              thiết kế website
            </Link>{" "}
            — tăng internal link và E-E-A-T.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/website" className="brand-btn-primary">
              Dịch vụ thiết kế website
            </Link>
            <Link href="/blog/thiet-ke-website" className="brand-btn-secondary">
              Hướng dẫn thiết kế website A-Z
            </Link>
            <Link href="/blog/bao-gia-thiet-ke-website" className="brand-btn-secondary">
              Báo giá thiết kế website
            </Link>
          </div>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </main>
  );
}
