import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

const BASE_URL = SITE_URL;

export const metadata: Metadata = {
  title: "Trung tâm kiến thức Marketing | Bứt Phá Marketing",
  description:
    "Resource Center của Bứt Phá Marketing: hướng dẫn, checklist, template, so sánh và tài liệu thực chiến cho Website, SEO, Maps, Facebook, Automation và AI.",
  alternates: { canonical: `${BASE_URL}/kien-thuc` },
  openGraph: {
    title: "Trung tâm kiến thức Marketing | Bứt Phá Marketing",
    description:
      "Hệ sinh thái kiến thức marketing thực chiến cho doanh nghiệp tăng trưởng bền vững.",
    url: `${BASE_URL}/kien-thuc`,
    type: "website",
    images: [{ url: `${BASE_URL}/opengraph.jpg`, alt: "Trung tâm kiến thức Marketing" }],
  },
};

const resources = [
  { label: "Dịch vụ thiết kế website", href: "/website" },
  { label: "Pillar: Thiết kế website A-Z", href: "/blog/thiet-ke-website" },
  { label: "Báo giá thiết kế website", href: "/blog/bao-gia-thiet-ke-website" },
  { label: "Knowledge Hub: SEO Website", href: "/kien-thuc/seo-website" },
  { label: "Knowledge Hub: Marketing Automation", href: "/kien-thuc/marketing-automation" },
  { label: "Knowledge Hub: AI Marketing", href: "/kien-thuc/ai-marketing" },
  { label: "Hướng dẫn chuyên sâu", href: "/blog/chu-de/website" },
  { label: "Checklist triển khai", href: "/blog/nganh/nha-khoa" },
  { label: "Template thực chiến", href: "/blog" },
  { label: "Case study có số liệu", href: "/du-an" },
];

export default function KnowledgeCenterPage() {
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Trung tâm kiến thức Marketing",
    url: `${BASE_URL}/kien-thuc`,
    inLanguage: "vi-VN",
    isPartOf: {
      "@type": "WebSite",
      name: "Bứt Phá Marketing",
      url: BASE_URL,
    },
    about: [
      { "@type": "Thing", name: "Website Marketing" },
      { "@type": "Thing", name: "SEO Website" },
      { "@type": "Thing", name: "Marketing Automation" },
      { "@type": "Thing", name: "AI Marketing" },
    ],
  };
  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <div className="mx-auto max-w-6xl space-y-8">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
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
              Kiến thức
            </li>
          </ol>
        </nav>

        <section className="rounded-3xl border border-indigo-100 bg-white p-8 shadow-sm md:p-12">
          <p className="brand-eyebrow mb-3">Resource Center</p>
          <h1 className="text-4xl font-black tracking-tight text-indigo-950 md:text-5xl">
            Trung tâm kiến thức Marketing
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Nền tảng tri thức để doanh nghiệp tự học, tự đánh giá và triển khai marketing theo hệ thống:
            Website, SEO, Google Maps, Facebook, Automation và AI.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {resources.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-2xl border border-indigo-100 bg-white p-6 font-semibold text-indigo-900 transition hover:border-violet-300 hover:text-violet-700"
            >
              {item.label}
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
