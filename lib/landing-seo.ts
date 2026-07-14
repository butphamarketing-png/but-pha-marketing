import type { Metadata } from "next";
import { SITE_URL, buildMetadata } from "@/lib/seo";

type IndexPolicy = "index" | "noindex";

type LandingMetadataInput = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  indexPolicy?: IndexPolicy;
};

type ServiceSchemaInput = {
  name: string;
  path: string;
  description: string;
  serviceType: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export function generateLandingMetadata({
  path,
  title,
  description,
  keywords = [],
  image,
  indexPolicy = "index",
}: LandingMetadataInput): Metadata {
  const metadata = buildMetadata({
    title,
    description,
    path: normalizePath(path),
    keywords,
    image,
    type: "website",
  });

  if (indexPolicy === "noindex") {
    metadata.robots = {
      index: false,
      follow: true,
    };
  }

  return metadata;
}

export function buildServiceSchema(input: ServiceSchemaInput) {
  const path = normalizePath(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "Organization",
      name: "Bứt Phá Marketing",
      url: SITE_URL,
    },
  };
}

export function buildFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** NAP chuẩn BPM — đồng bộ footer / GBP / citation */
export const BPM_NAP = {
  name: "Bứt Phá Marketing",
  phone: "+84937417982",
  phoneDisplay: "0937 417 982",
  streetAddress: "Tổ 8 ấp 6 Bình Mỹ",
  addressLocality: "Củ Chi",
  addressRegion: "Hồ Chí Minh",
  addressCountry: "VN",
} as const;

type LocalBusinessSchemaInput = {
  pageName: string;
  path: string;
  description: string;
  /** Quận/tỉnh phục vụ — areaServed */
  areaServed: string;
};

/**
 * ProfessionalService + NAP + areaServed cho landing local.
 * Không giả địa chỉ chi nhánh ở quận — service-area business.
 */
export function buildLocalBusinessSchema(input: LocalBusinessSchemaInput) {
  const path = normalizePath(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: BPM_NAP.name,
    alternateName: input.pageName,
    description: input.description,
    url: `${SITE_URL}${path}`,
    telephone: BPM_NAP.phone,
    image: `${SITE_URL}/logo.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BPM_NAP.streetAddress,
      addressLocality: BPM_NAP.addressLocality,
      addressRegion: BPM_NAP.addressRegion,
      addressCountry: BPM_NAP.addressCountry,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: input.areaServed,
    },
    sameAs: [
      "https://www.facebook.com/butphamarketing",
      "https://zalo.me/0937417982",
    ],
  };
}

function normalizePath(path: string) {
  if (!path.startsWith("/")) return `/${path}`;
  return path;
}
