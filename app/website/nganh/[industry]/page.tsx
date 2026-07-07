import Link from "next/link";
import { notFound } from "next/navigation";
import { buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";
import { SITE_URL } from "@/lib/seo";
import {
  getWebsiteIndustryLanding,
  resolveIndexPolicy,
  WEBSITE_INDUSTRY_LANDINGS,
} from "@/lib/programmatic-seo";

type Params = { industry: string };

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return WEBSITE_INDUSTRY_LANDINGS.map((item) => ({ industry: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { industry } = await params;
  const landing = getWebsiteIndustryLanding(industry);
  if (!landing) return {};

  return generateLandingMetadata({
    path: `/website/nganh/${landing.slug}`,
    title: landing.title,
    description: landing.description,
    keywords: [landing.primaryKeyword, "thiết kế website", "website doanh nghiệp"],
    indexPolicy: resolveIndexPolicy(landing.qualityScore),
  });
}

export default async function WebsiteIndustryProgrammaticPage({ params }: { params: Promise<Params> }) {
  const { industry } = await params;
  const landing = getWebsiteIndustryLanding(industry);
  if (!landing) notFound();

  const serviceLd = buildServiceSchema({
    name: landing.title,
    path: `/website/nganh/${landing.slug}`,
    description: landing.description,
    serviceType: "Thiết kế Website theo ngành",
  });
  const canonical = `${SITE_URL}/website/nganh/${landing.slug}`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Website", item: `${SITE_URL}/website` },
      { "@type": "ListItem", position: 3, name: "Website theo ngành", item: `${SITE_URL}/website/nganh/nha-khoa` },
      { "@type": "ListItem", position: 4, name: landing.title, item: canonical },
    ],
  };
  const clusterLinks = [
    { href: `/blog/nganh/${landing.slug}`, name: "Hub bài viết ngành" },
    { href: "/website", name: "Landing Website chính" },
    { href: "/lien-he", name: "Trang liên hệ tư vấn" },
  ];
  const clusterItemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Liên kết cụm ngành: ${landing.title}`,
    itemListElement: clusterLinks.map((link, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}${link.href}`,
      name: link.name,
    })),
  };
  const indexable = resolveIndexPolicy(landing.qualityScore) === "index";

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clusterItemListLd) }} />
      <div className="mx-auto max-w-5xl space-y-8">
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
            <li>
              <Link href="/website" className="font-medium text-indigo-700 hover:text-indigo-900">
                Website
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li className="font-semibold text-indigo-950" aria-current="page">
              {landing.title}
            </li>
          </ol>
        </nav>
        <h1 className="text-4xl font-black tracking-tight text-indigo-950">{landing.title}</h1>
        <p className="text-lg leading-8 text-slate-600">{landing.description}</p>
        <p className="text-sm font-semibold text-violet-700">
          Keyword chính: {landing.primaryKeyword} · Quality score: {landing.qualityScore}/100 ·{" "}
          {indexable ? "Đang index" : "Đang noindex (cần bổ sung nội dung chứng minh)"}
        </p>

        <section className="rounded-2xl border border-indigo-100 bg-white p-6">
          <h2 className="text-xl font-bold text-indigo-950">Liên kết trong cụm ngành</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {clusterLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={link.href === "/lien-he" ? "brand-btn-primary" : "brand-btn-secondary"}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
