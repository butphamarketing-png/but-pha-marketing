export const revalidate = 3600;

import HomePageClient from "./HomePageClient";
import { getDynamicMetadata, SITE_URL } from "@/lib/seo";
import { SITE_CONTACT } from "@/lib/site-contact";

export async function generateMetadata() {
  return getDynamicMetadata("/", {
    title: "Thiết kế website & Marketing thực chiến | Bứt Phá Marketing",
    description:
      "Agency thiết kế website chuẩn SEO, Facebook Ads, Google Maps và marketing automation. Tư vấn miễn phí — tăng trưởng doanh thu bền vững.",
    keywords: [
      "thiết kế website",
      "làm website",
      "dịch vụ thiết kế website",
      "marketing",
      "facebook ads",
      "local seo",
      "agency marketing",
    ],
  });
}

export default function Home() {
  const baseUrl = SITE_URL;
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
        email: SITE_CONTACT.email,
        telephone: `+84${SITE_CONTACT.hotline.replace(/^0/, "")}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE_CONTACT.address,
          addressLocality: "Hồ Chí Minh",
          addressCountry: "VN",
        },
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
        about: {
          "@type": "Service",
          name: "Thiết kế website",
          url: `${baseUrl}/website`,
          provider: { "@id": `${baseUrl}#organization` },
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
