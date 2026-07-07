import { notFound } from "next/navigation";
import { ProgrammaticLandingPage } from "@/components/landing/ProgrammaticLandingPage";
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

  const indexable = resolveIndexPolicy(landing.qualityScore) === "index";
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
    { href: "/website", name: "Dịch vụ thiết kế website" },
    { href: "/blog/thiet-ke-website", name: "Pillar thiết kế website" },
    { href: "/lien-he", name: "Tư vấn miễn phí" },
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

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clusterItemListLd) }} />
      <ProgrammaticLandingPage
        landing={landing}
        indexable={indexable}
        variant="industry"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Website", href: "/website" },
          { label: landing.title },
        ]}
        clusterLinks={clusterLinks}
      />
    </main>
  );
}
