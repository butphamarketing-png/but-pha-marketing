import AboutPageClient from "./AboutPageClient";
import { getDynamicMetadata, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bứt Phá Marketing phù hợp doanh nghiệp nào?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SME và doanh nghiệp địa phương cần website, SEO, Facebook, Google Maps hoặc automation — muốn đo lường được kết quả.",
      },
    },
    {
      "@type": "Question",
      name: "Có cam kết top Google không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Không cam kết thứ hạng cứng. Cam kết quy trình minh bạch, báo cáo GSC/ads và tối ưu liên tục theo dữ liệu thật.",
      },
    },
    {
      "@type": "Question",
      name: "Xem dự án đã làm ở đâu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tại trang Case Study (/du-an) — có số liệu GSC, ảnh trước/sau và link website/Fanpage thực tế.",
      },
    },
  ],
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bứt Phá Marketing",
  url: SITE_URL,
  description:
    "Đơn vị marketing thực chiến: thiết kế website chuẩn SEO, Facebook Marketing, Google Maps và automation.",
  sameAs: [SITE_URL],
};

export async function generateMetadata() {
  return getDynamicMetadata("/gioi-thieu", {
    title: "Giới thiệu | Bứt Phá Marketing",
    description:
      "Tìm hiểu Bứt Phá Marketing: đơn vị đồng hành cùng doanh nghiệp xây dựng hệ thống marketing thực chiến, đo lường được và tăng trưởng bền vững.",
    keywords: [
      "giới thiệu bứt phá marketing",
      "agency marketing thực chiến",
      "dịch vụ marketing doanh nghiệp",
      "thiết kế website seo",
      "google maps marketing",
    ],
  });
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <AboutPageClient />
    </>
  );
}
