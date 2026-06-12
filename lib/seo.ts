import type { Metadata } from "next";
import { createServerClient } from "./supabase";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com";
const BASE_URL = SITE_URL;

type SeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  image?: string;
};

export async function getDynamicMetadata(path: string, fallback: Partial<SeoInput> = {}): Promise<Metadata> {
  const key = path === "/" ? "home" : path.replace(/^\//, "");
  let dynamicSeo = null;

  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "admin_settings")
      .maybeSingle();

    const seoPages = data?.value?.seoPages ?? {};
    dynamicSeo = seoPages[key] || (key === "google-maps" ? seoPages.googlemaps : undefined) || null;
  } catch (error) {
    console.error(`[SEO] Failed to fetch dynamic metadata for ${path}:`, error);
  }

  const title = dynamicSeo?.title || fallback.title || "Bứt Phá Marketing";
  const description = dynamicSeo?.desc || fallback.description || "";
  const keywordsStr = dynamicSeo?.keywords || (fallback.keywords ? fallback.keywords.join(", ") : "");
  const keywords = keywordsStr ? keywordsStr.split(",").map((k: string) => k.trim()) : [];

  return buildMetadata({
    title,
    description,
    path,
    keywords,
    image: fallback.image,
    type: fallback.type,
  });
}

export async function getGoogleSiteVerification(): Promise<string | undefined> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "admin_settings")
      .maybeSingle();
    const code = typeof data?.value?.googleConsole === "string" ? data.value.googleConsole.trim() : "";
    return code || undefined;
  } catch (error) {
    console.error("[SEO] Failed to fetch Google site verification:", error);
    return undefined;
  }
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  image = "/opengraph.jpg",
}: SeoInput): Metadata {
  const canonical = `${BASE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Bứt Phá Marketing",
      locale: "vi_VN",
      type,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
