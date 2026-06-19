import { ThietKeWebsiteLanding } from "@/components/website/ThietKeWebsiteLanding";
import { getDynamicMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getDynamicMetadata("/website/thietkewebsite", {
    title: "Thiết kế website chuyên nghiệp cho doanh nghiệp | Bứt Phá Marketing",
    description:
      "Thiết kế website chuẩn SEO, giao diện chuyên nghiệp, tốc độ nhanh và responsive. Tư vấn miễn phí — Bứt Phá Marketing đồng hành từ thiết kế đến vận hành.",
    keywords: [
      "thiết kế website",
      "thiết kế website chuyên nghiệp",
      "thiết kế web chuẩn seo",
      "làm website doanh nghiệp",
      "bứt phá marketing",
    ],
  });
}

export default function ThietKeWebsitePage() {
  return <ThietKeWebsiteLanding />;
}
