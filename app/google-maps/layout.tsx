import { getDynamicMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getDynamicMetadata("/google-maps", {
    title: "Dịch vụ Google Maps Marketing, Local SEO và Google Business Profile",
    description:
      "Dịch vụ Google Maps Marketing gồm tối ưu Google Business Profile, Local SEO, thu thập đánh giá 5 sao và quảng cáo Maps giúp tăng cuộc gọi và khách đến cửa hàng.",
    keywords: [
      "google maps marketing",
      "local seo",
      "google business profile",
      "quảng cáo google maps",
      "tối ưu google maps",
    ],
  });
}

export default function GoogleMapsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
