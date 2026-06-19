import { VanHanhWebsiteLanding } from "@/components/website/VanHanhWebsiteLanding";
import { getDynamicMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getDynamicMetadata("/website/van-hanh-website", {
    title: "Vận hành website chuyên nghiệp — Gói hosting & bảo trì | Bứt Phá Marketing",
    description:
      "Gói vận hành website từ 2.500.000đ/năm: theo dõi 24/7, bảo mật, sao lưu, tối ưu tốc độ và hỗ trợ kỹ thuật. Bứt Phá Marketing đồng hành vận hành website doanh nghiệp.",
    keywords: [
      "vận hành website",
      "bảo trì website",
      "hosting website",
      "quản trị website",
      "bứt phá marketing",
    ],
  });
}

export default function VanHanhWebsitePage() {
  return <VanHanhWebsiteLanding />;
}
