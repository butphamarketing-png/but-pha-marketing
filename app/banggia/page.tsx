import { BanggiaPageClient } from "@/components/pricing/BanggiaPageClient";
import { getDynamicMetadata, SITE_URL } from "@/lib/seo";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Giá trên bảng giá có phải giá cuối cùng không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Đây là giá tham khảo. Báo giá chính xác sau khi khảo sát quy mô, tính năng và timeline dự án.",
      },
    },
    {
      "@type": "Question",
      name: "Phí quảng cáo Facebook/Google Maps có nằm trong bảng giá không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Không. Ngân sách ads trả trực tiếp cho Meta/Google. Bảng giá chỉ gồm phí setup và quản lý chiến dịch.",
      },
    },
    {
      "@type": "Question",
      name: "Làm sao chọn gói phù hợp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Website mới: bắt đầu gói cơ bản hoặc doanh nghiệp. Đã có traffic: nâng cấp SEO + care. Có cửa hàng: thêm Google Maps.",
      },
    },
  ],
};

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Bảng giá dịch vụ Marketing",
  url: `${SITE_URL}/banggia`,
  inLanguage: "vi-VN",
  isPartOf: {
    "@type": "WebSite",
    name: "Bứt Phá Marketing",
    url: SITE_URL,
  },
};

export async function generateMetadata() {
  return getDynamicMetadata("/banggia", {
    title: "Bảng giá dịch vụ | Website, Facebook, Google Maps",
    description:
      "Tra cứu bảng giá dịch vụ Website, Facebook Fanpage và Google Maps tại Bứt Phá Marketing. Minh bạch, dễ so sánh theo từng nhóm dịch vụ.",
    keywords: [
      "bảng giá marketing",
      "báo giá thiết kế website",
      "bảng giá fanpage",
      "bảng giá google maps",
      "bứt phá marketing",
    ],
  });
}

export default function BanggiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BanggiaPageClient />
    </>
  );
}
