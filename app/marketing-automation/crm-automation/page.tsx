import Link from "next/link";
import { buildFaqSchema, buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/marketing-automation/crm-automation",
  title: "CRM Automation: đồng bộ lead và sales",
  description:
    "Thiết lập CRM Automation để phân loại lead, giao việc cho sales, theo dõi pipeline và tối ưu tỷ lệ chốt.",
  keywords: ["crm automation", "tự động hóa crm", "quản trị lead", "pipeline sales"],
});

export default function CrmAutomationPage() {
  const serviceLd = buildServiceSchema({
    name: "CRM Automation",
    path: "/marketing-automation/crm-automation",
    description: "Đồng bộ lead marketing với sales và tự động phân tuyến theo quy tắc chuyển đổi.",
    serviceType: "CRM Automation",
  });
  const faqLd = buildFaqSchema([
    {
      question: "CRM Automation giúp cải thiện gì cho đội sales?",
      answer:
        "CRM Automation giúp giảm bỏ sót lead, phân bổ lead nhanh hơn và theo dõi pipeline theo thời gian thực để tăng tỷ lệ chốt.",
    },
    {
      question: "Có thể tích hợp CRM Automation với website hiện tại không?",
      answer:
        "Có, có thể tích hợp form website với CRM và workflow automation để đồng bộ dữ liệu lead ngay khi khách để lại thông tin.",
    },
  ]);

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/marketing-automation" className="font-medium text-indigo-700 hover:text-indigo-900">
                Marketing Automation
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li className="font-semibold text-indigo-950">CRM Automation</li>
          </ol>
        </nav>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-indigo-950">CRM Automation</h1>
        <p className="mt-4 text-lg text-slate-600">
          Đồng bộ dữ liệu marketing-sales, tự động phân tuyến lead và xây dashboard funnel để ra quyết định
          tăng trưởng nhanh hơn.
        </p>
      </div>
    </main>
  );
}
