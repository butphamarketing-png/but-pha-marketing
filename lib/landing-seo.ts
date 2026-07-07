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

function normalizePath(path: string) {
  if (!path.startsWith("/")) return `/${path}`;
  return path;
}
