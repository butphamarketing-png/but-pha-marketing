import { getDynamicMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getDynamicMetadata("/website", {
    title: "Dịch vụ Website Marketing, thiết kế web và SEO website",
    description: "Dịch vụ Website Marketing bao gồm thiết kế website, tối ưu SEO website và bảo trì kỹ thuật để tăng tốc độ tải trang, trải nghiệm người dùng và chuyển đổi kinh doanh.",
    keywords: ["dịch vụ website marketing", "thiết kế website", "seo website", "bảo trì website", "thiết kế web chuẩn seo"],
  });
}

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
