import Link from "next/link";
import { buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/marketing-automation/lead-nurturing",
  title: "Lead Nurturing Automation cho doanh nghiệp",
  description:
    "Thiết kế chuỗi nuôi dưỡng lead tự động qua email, Zalo, remarketing để tăng tỷ lệ chuyển đổi từ MQL sang SQL.",
  keywords: ["lead nurturing", "automation chăm sóc khách hàng", "nuôi dưỡng lead tự động"],
});

export default function LeadNurturingPage() {
  const serviceLd = buildServiceSchema({
    name: "Lead Nurturing Automation",
    path: "/marketing-automation/lead-nurturing",
    description: "Thiết kế workflow nuôi dưỡng lead theo hành vi để tăng tỷ lệ phản hồi và tỷ lệ chốt.",
    serviceType: "Lead Nurturing Automation",
  });

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
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
            <li className="font-semibold text-indigo-950">Lead Nurturing</li>
          </ol>
        </nav>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-indigo-950">Lead Nurturing Automation</h1>
        <p className="mt-4 text-lg text-slate-600">
          Chuẩn hóa các kịch bản chăm sóc lead theo hành vi để tăng tỷ lệ phản hồi, tăng tỷ lệ đặt lịch và
          rút ngắn chu kỳ chốt sale.
        </p>
      </div>
    </main>
  );
}
