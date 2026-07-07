import { notFound } from "next/navigation";
import { ProgrammaticLandingPage } from "@/components/landing/ProgrammaticLandingPage";
import { buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";
import { SITE_URL } from "@/lib/seo";
import {
  getLocalSeoLanding,
  LOCAL_SEO_LANDINGS,
  resolveIndexPolicy,
} from "@/lib/programmatic-seo";

type Params = { location: string };

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return LOCAL_SEO_LANDINGS.map((item) => ({ location: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { location } = await params;
  const landing = getLocalSeoLanding(location);
  if (!landing) return {};

  return generateLandingMetadata({
    path: `/seo-website/dia-phuong/${landing.slug}`,
    title: landing.title,
    description: landing.description,
    keywords: [landing.primaryKeyword, "seo website", "seo địa phương"],
    indexPolicy: resolveIndexPolicy(landing.qualityScore),
  });
}

export default async function LocalSeoProgrammaticPage({ params }: { params: Promise<Params> }) {
  const { location } = await params;
  const landing = getLocalSeoLanding(location);
  if (!landing) notFound();

  const indexable = resolveIndexPolicy(landing.qualityScore) === "index";
  const serviceLd = buildServiceSchema({
    name: landing.title,
    path: `/seo-website/dia-phuong/${landing.slug}`,
    description: landing.description,
    serviceType: "SEO Website theo địa phương",
  });
  const canonical = `${SITE_URL}/seo-website/dia-phuong/${landing.slug}`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "SEO Website", item: `${SITE_URL}/seo-website` },
      {
        "@type": "ListItem",
        position: 3,
        name: "SEO theo địa phương",
        item: `${SITE_URL}/seo-website/dia-phuong/ho-chi-minh`,
      },
      { "@type": "ListItem", position: 4, name: landing.title, item: canonical },
    ],
  };
  const clusterLinks = [
    { href: "/seo-website", name: "Pillar SEO Website" },
    { href: "/kien-thuc/seo-website", name: "Knowledge hub SEO" },
    { href: "/lien-he", name: "Tư vấn SEO địa phương" },
  ];
  const clusterItemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Liên kết cụm địa phương: ${landing.title}`,
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
        variant="local"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "SEO Website", href: "/seo-website" },
          { label: landing.title },
        ]}
        clusterLinks={clusterLinks}
      />
    </main>
  );
}
