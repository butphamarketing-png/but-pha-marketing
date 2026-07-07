import { getDynamicMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getDynamicMetadata("/seo-website", {
    title: "Dịch vụ SEO Website tổng thể và Technical SEO",
    description:
      "Dịch vụ SEO Website theo hệ thống: audit kỹ thuật, chiến lược từ khóa, content cluster, internal link và tối ưu chuyển đổi lead.",
    keywords: [
      "seo website",
      "seo tổng thể",
      "technical seo",
      "dịch vụ seo website",
      "seo onpage offpage",
    ],
  });
}

export default function SeoWebsiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
