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
    <main className="relative min-h-screen overflow-hidden deep-theme text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/40">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="font-medium text-white/40 hover:text-white/80">
                Trang chủ
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/25">
              /
            </li>
            <li className="font-medium text-white/70" aria-current="page">
              Dự án
            </li>
          </ol>
        </nav>

        <header className="mb-8 max-w-3xl border-b border-white/[0.08] pb-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/40">
            Dự án tiêu biểu
          </p>
          <h1 className="mt-2 text-[1.75rem] font-semibold leading-snug tracking-tight text-white sm:text-[2.05rem]">
            Case study thực chiến
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/45">
            Website, SEO và Facebook Marketing — có số liệu GSC, từ khóa và minh chứng. Đây là{" "}
            <strong className="font-medium text-white/70">proof layer</strong> trong chiến lược topical authority —
            cách MONA dùng portfolio, nhưng Bứt Phá đi sâu theo ngành với số liệu thật.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/40">
            Mỗi case study liên kết với cluster blog ngành (ví dụ:{" "}
            <Link href="/blog/thiet-ke-website-xay-dung-nha-thau" className="text-white/70 underline-offset-2 hover:underline">
              thiết kế website xây dựng
            </Link>
            ) và trang{" "}
            <Link href="/website" className="text-white/70 underline-offset-2 hover:underline">
              thiết kế website
            </Link>{" "}
            — tăng internal link và E-E-A-T.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/website"
              className="inline-flex rounded-md bg-[#6D5CE6] px-4 py-2 text-sm font-medium text-white hover:bg-[#5B4BD4]"
            >
              Dịch vụ thiết kế website
            </Link>
            <Link
              href="/blog/thiet-ke-website"
              className="inline-flex rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/75 hover:border-white/25"
            >
              Hướng dẫn thiết kế website A-Z
            </Link>
            <Link
              href="/blog/bao-gia-thiet-ke-website"
              className="inline-flex rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/75 hover:border-white/25"
            >
              Báo giá thiết kế website
            </Link>
          </div>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} variant="deep" />
          ))}
        </div>
      </div>
    </main>
  );
}
