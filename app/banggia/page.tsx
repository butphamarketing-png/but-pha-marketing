import { BanggiaPageClient } from "@/components/pricing/BanggiaPageClient";
import { getDynamicMetadata, SITE_URL } from "@/lib/seo";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Báo giá thiết kế website trên bảng giá có phải giá cuối cùng không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Đây là giá tham khảo. Báo giá thiết kế website chính xác sau khi khảo sát quy mô, tính năng và timeline dự án.",
      },
    },
    {
      "@type": "Question",
      name: "Chi phí thiết kế website phụ thuộc yếu tố nào?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Số trang, tính năng (form, đặt lịch, bán hàng), thiết kế độc quyền hay theo mẫu, và tiến độ bàn giao.",
      },
    },
    {
      "@type": "Question",
      name: "Làm sao chọn gói thiết kế website phù hợp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Website mới: bắt đầu gói cơ bản hoặc doanh nghiệp. Xem phạm vi dịch vụ đầy đủ tại trang thiết kế website.",
      },
    },
  ],
};

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Báo giá thiết kế website & bảng giá Marketing",
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
    title: "Báo giá thiết kế website & bảng giá Marketing 2026",
    description:
      "Báo giá thiết kế website trọn gói, bảng giá Fanpage và Google Maps tại Bứt Phá Marketing. Minh bạch theo gói — nhận tư vấn miễn phí sau khảo sát.",
    keywords: [
      "báo giá thiết kế website",
      "bảng giá thiết kế website",
      "giá làm website",
      "bảng giá marketing",
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
