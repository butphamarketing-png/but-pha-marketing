import { getDynamicMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getDynamicMetadata("/ai-marketing", {
    title: "AI Marketing: tăng tốc nội dung và vận hành",
    description:
      "Ứng dụng AI trong marketing: sản xuất nội dung, tối ưu quảng cáo, phân tích insight và tự động hóa quy trình tăng trưởng.",
    keywords: [
      "ai marketing",
      "ứng dụng ai marketing",
      "ai content",
      "ai ads optimization",
      "ai growth",
    ],
  });
}

export default function AiMarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
