import { ServiceLandingPage } from "@/components/landing/ServiceLandingPage";
import { getServiceLandingConfig } from "@/lib/service-landing-config";
import { getDynamicMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug?: string[] }> };

function resolveConfig(pathKey: string) {
  const config = getServiceLandingConfig(pathKey);
  if (!config) notFound();
  return config;
}

export async function generateLandingMetadata(pathKey: string) {
  const config = resolveConfig(pathKey);
  return getDynamicMetadata(`/${config.slug}`, {
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords,
  });
}

export function createServiceLandingPage(pathKey: string) {
  return <ServiceLandingPage slug={pathKey} />;
}
