import AboutPageClient from "./AboutPageClient";
import { getDynamicMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

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
  return <AboutPageClient />;
}
