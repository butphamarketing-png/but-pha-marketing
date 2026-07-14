import { notFound } from "next/navigation";
import { ProgrammaticLandingPage } from "@/components/landing/ProgrammaticLandingPage";
import { MoneyKwSiloLinks } from "@/components/seo/MoneyKwSiloLinks";
import {
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
  generateLandingMetadata,
} from "@/lib/landing-seo";
import {
  getLocalSeoContent,
  getLocalSeoLabel,
  getSiblingDistrictSlugs,
  LOCAL_SEO_CHILDREN,
} from "@/lib/local-seo-content";
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
    keywords: [landing.primaryKeyword, "seo website", "seo địa phương", "google maps"],
    indexPolicy: resolveIndexPolicy(landing.qualityScore),
  });
}

function buildClusterLinks(slug: string) {
  const local = getLocalSeoContent(slug);
  const links: { href: string; name: string }[] = [
    { href: "/seo-website", name: "Pillar SEO Website" },
    { href: "/google-maps", name: "Google Maps / GBP" },
    { href: "/website", name: "Thiết kế website" },
    { href: "/banggia", name: "Bảng giá dịch vụ" },
    { href: "/blog/bao-gia-thiet-ke-website", name: "Báo giá thiết kế website" },
    { href: "/kien-thuc/seo-website", name: "Knowledge hub SEO" },
    { href: "/lien-he", name: "Tư vấn SEO địa phương" },
  ];

  if (local?.parentSlug) {
    links.unshift({
      href: `/seo-website/dia-phuong/${local.parentSlug}`,
      name: `Hub ${local.parentLabel ?? getLocalSeoLabel(local.parentSlug)}`,
    });
  }

  const children = LOCAL_SEO_CHILDREN[slug] ?? [];
  for (const child of children.slice(0, 6)) {
    links.push({
      href: `/seo-website/dia-phuong/${child}`,
      name: getLocalSeoLabel(child),
    });
  }

  if (local?.parentSlug) {
    for (const sibling of getSiblingDistrictSlugs(slug).slice(0, 4)) {
      links.push({
        href: `/seo-website/dia-phuong/${sibling}`,
        name: getLocalSeoLabel(sibling),
      });
    }
  }

  return links;
}

export default async function LocalSeoProgrammaticPage({ params }: { params: Promise<Params> }) {
  const { location } = await params;
  const landing = getLocalSeoLanding(location);
  if (!landing) notFound();

  const localContent = getLocalSeoContent(landing.slug);
  const indexable = resolveIndexPolicy(landing.qualityScore) === "index";
  const clusterLinks = buildClusterLinks(landing.slug);
  const serviceLd = buildServiceSchema({
    name: landing.title,
    path: `/seo-website/dia-phuong/${landing.slug}`,
    description: landing.description,
    serviceType: "SEO Website theo địa phương",
  });
  const localBizLd = buildLocalBusinessSchema({
    pageName: landing.title,
    path: `/seo-website/dia-phuong/${landing.slug}`,
    description: landing.description,
    areaServed: localContent?.displayName ?? landing.title,
  });
  const faqLd =
    localContent?.faqs?.length
      ? buildFaqSchema(localContent.faqs.map((f) => ({ question: f.q, answer: f.a })))
      : null;
  const canonical = `${SITE_URL}/seo-website/dia-phuong/${landing.slug}`;
  const parentHref = localContent?.parentSlug
    ? `${SITE_URL}/seo-website/dia-phuong/${localContent.parentSlug}`
    : `${SITE_URL}/seo-website/dia-phuong/ho-chi-minh`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "SEO Website", item: `${SITE_URL}/seo-website` },
      {
        "@type": "ListItem",
        position: 3,
        name: localContent?.parentLabel
          ? `SEO ${localContent.parentLabel}`
          : "SEO theo địa phương",
        item: parentHref,
      },
      { "@type": "ListItem", position: 4, name: landing.title, item: canonical },
    ],
  };
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

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "SEO Website", href: "/seo-website" },
    ...(localContent?.parentSlug
      ? [
          {
            label: localContent.parentLabel ?? getLocalSeoLabel(localContent.parentSlug),
            href: `/seo-website/dia-phuong/${localContent.parentSlug}`,
          },
        ]
      : []),
    { label: landing.title },
  ];

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizLd) }} />
      {faqLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clusterItemListLd) }} />
      <ProgrammaticLandingPage
        landing={landing}
        indexable={indexable}
        variant="local"
        localContent={localContent}
        breadcrumbs={breadcrumbs}
        clusterLinks={clusterLinks}
      />
      {(landing.slug === "ho-chi-minh" || landing.slug === "quan-1") && (
        <div className="mx-auto mt-8 max-w-5xl">
          <MoneyKwSiloLinks excludePath={`/seo-website/dia-phuong/${landing.slug}`} />
        </div>
      )}
    </main>
  );
}
