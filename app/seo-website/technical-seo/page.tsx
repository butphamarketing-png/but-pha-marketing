import Link from "next/link";
import { buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/seo-website/technical-seo",
  title: "Technical SEO: audit crawl/index/CWV",
  description:
    "Dịch vụ Technical SEO giúp website crawl tốt, index chuẩn, cải thiện Core Web Vitals và giảm thất thoát traffic kỹ thuật.",
  keywords: ["technical seo", "audit seo kỹ thuật", "core web vitals", "crawl index"],
});

export default function TechnicalSeoPage() {
  const serviceLd = buildServiceSchema({
    name: "Technical SEO",
    path: "/seo-website/technical-seo",
    description:
      "Audit toàn bộ lớp kỹ thuật của website: crawl, index, canonical, schema và hiệu năng để tăng trưởng organic bền vững.",
    serviceType: "Technical SEO",
  });

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/seo-website" className="font-medium text-indigo-700 hover:text-indigo-900">
                SEO Website
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li className="font-semibold text-indigo-950">Technical SEO</li>
          </ol>
        </nav>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-indigo-950">Technical SEO</h1>
        <p className="mt-4 text-lg text-slate-600">
          Audit toàn bộ các lớp kỹ thuật: robots, sitemap, canonical, schema, internal link và hiệu năng để
          mở trần tăng trưởng organic cho website.
        </p>
      </div>
    </main>
  );
}
