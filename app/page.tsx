import HomePageClient from "./HomePageClient";
import { getDynamicMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getDynamicMetadata("/", {
    title: "Bứt Phá Marketing | Giải pháp marketing thực chiến",
    description: "Agency marketing toàn diện tại Việt Nam. Dịch vụ Facebook, TikTok, Instagram, Website, Local SEO và chiến lược tăng trưởng doanh thu.",
    keywords: [
      "marketing",
      "facebook ads",
      "tiktok marketing",
      "instagram marketing",
      "website marketing",
      "local seo",
      "agency marketing",
    ],
  });
}

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}#organization`,
        name: "Bứt Phá Marketing",
        url: baseUrl,
        logo: `${baseUrl}/logo.jpg`,
        image: `${baseUrl}/opengraph.jpg`,
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}#website`,
        url: baseUrl,
        name: "Bứt Phá Marketing",
        inLanguage: "vi-VN",
        publisher: {
          "@id": `${baseUrl}#organization`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePageClient />
    </>
  );
}
