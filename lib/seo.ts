import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  image = "/logo.jpg",
}: SeoInput): Metadata {
  const canonical = `${BASE_URL}${path}`;

  return {
    title,
    description,
    keywords,
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
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
