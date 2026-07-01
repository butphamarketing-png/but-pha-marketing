import { BanggiaPageClient } from "@/components/pricing/BanggiaPageClient";
import { getDynamicMetadata } from "@/lib/seo";

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
  return <BanggiaPageClient />;
}
