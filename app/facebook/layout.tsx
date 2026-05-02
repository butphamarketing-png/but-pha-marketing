import { getDynamicMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getDynamicMetadata("/facebook", {
    title: "Dịch vụ Facebook Marketing, quản trị Fanpage và Facebook Ads",
    description: "Dịch vụ Facebook Marketing trọn gói gồm quản trị Fanpage, sáng tạo nội dung và triển khai Facebook Ads giúp tăng lead, đơn hàng và doanh thu bền vững.",
    keywords: ["dịch vụ facebook marketing", "facebook ads", "quản trị fanpage", "chạy quảng cáo facebook", "agency facebook marketing"],
  });
}

export default function FacebookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
