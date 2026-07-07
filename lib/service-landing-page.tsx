import { ServiceLandingPage } from "@/components/landing/ServiceLandingPage";
import { getServiceLandingConfig } from "@/lib/service-landing-config";
import { getDynamicMetadata, SITE_URL } from "@/lib/seo";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug?: string[] }> };

function resolveConfig(pathKey: string) {
  const config = getServiceLandingConfig(pathKey);
  if (!config) notFound();
  return config;
}

type LandingMetadataOptions = {
  /** Canonical khác path hiện tại — dùng khi sub-landing trùng intent với money page. */
  canonicalPath?: string;
};

export async function generateLandingMetadata(pathKey: string, options: LandingMetadataOptions = {}) {
  const config = resolveConfig(pathKey);
  const metadata = await getDynamicMetadata(`/${config.slug}`, {
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords,
  });

  if (options.canonicalPath) {
    const canonical = options.canonicalPath.startsWith("/")
      ? options.canonicalPath
      : `/${options.canonicalPath}`;
    metadata.alternates = { canonical: `${SITE_URL}${canonical}` };
  }

  return metadata;
}

export function createServiceLandingPage(pathKey: string) {
  return <ServiceLandingPage slug={pathKey} />;
}
