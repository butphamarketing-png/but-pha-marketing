import { getDynamicMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getDynamicMetadata("/marketing-automation", {
    title: "Marketing Automation cho doanh nghiệp SME",
    description:
      "Thiết kế hệ thống Marketing Automation: thu lead, nuôi dưỡng khách hàng, tự động hóa quy trình bán hàng và đo lường hiệu quả.",
    keywords: [
      "marketing automation",
      "tự động hóa marketing",
      "crm automation",
      "lead nurturing",
      "automation doanh nghiệp",
    ],
  });
}

export default function MarketingAutomationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
