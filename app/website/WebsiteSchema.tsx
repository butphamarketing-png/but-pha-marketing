import { SITE_URL } from "@/lib/seo";
import { SITE_CONTACT } from "@/lib/site-contact";

const BASE_URL = SITE_URL;

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Dịch vụ thiết kế website",
  serviceType: "Thiết kế website",
  description:
    "Thiết kế website chuẩn SEO cho doanh nghiệp: giao diện chuyên nghiệp, tốc độ nhanh, tối ưu chuyển đổi và bảo trì bền vững.",
  url: `${BASE_URL}/website`,
  areaServed: { "@type": "Country", name: "Vietnam" },
  provider: {
    "@type": "LocalBusiness",
    name: "Bứt Phá Marketing",
    url: BASE_URL,
    telephone: `+84${SITE_CONTACT.hotline.replace(/^0/, "")}`,
    email: SITE_CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONTACT.address,
      addressLocality: "Hồ Chí Minh",
      addressCountry: "VN",
    },
  },
  offers: {
    "@type": "Offer",
    url: `${BASE_URL}/banggia`,
    priceCurrency: "VND",
    price: "3000000",
    availability: "https://schema.org/InStock",
    description: "Gói thiết kế website Giới thiệu từ 3.000.000đ — tư vấn miễn phí.",
  },
};

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Thiết kế website chuyên nghiệp | Bứt Phá Marketing",
  url: `${BASE_URL}/website`,
  inLanguage: "vi-VN",
  about: { "@type": "Thing", name: "thiết kế website" },
  isPartOf: { "@type": "WebSite", name: "Bứt Phá Marketing", url: BASE_URL },
  mainEntity: { "@id": `${BASE_URL}/website#service` },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Thiết kế website mất bao lâu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Landing page 3–5 ngày. Website doanh nghiệp 1–2 tuần. E-commerce 3–4 tuần tùy phạm vi.",
      },
    },
    {
      "@type": "Question",
      name: "Giá thiết kế website bao nhiêu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gói Giới thiệu từ 3.000.000đ, Tối ưu 6.000.000đ, Kinh doanh 9.000.000đ, Hệ thống 12.000.000đ. Chưa gồm tên miền và hosting.",
      },
    },
    {
      "@type": "Question",
      name: "Thiết kế website có chuẩn SEO không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Có — meta, heading, schema, tốc độ tải và sitemap được tối ưu từ đầu để hỗ trợ lên top Google.",
      },
    },
  ],
};

export function WebsiteSchema() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
