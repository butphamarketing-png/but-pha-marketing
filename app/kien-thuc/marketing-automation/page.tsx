import Link from "next/link";
import { generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/kien-thuc/marketing-automation",
  title: "Knowledge Hub Marketing Automation",
  description:
    "Trung tâm kiến thức Marketing Automation: lead nurturing, CRM automation, quy trình phối hợp marketing-sales.",
  keywords: ["kien thuc marketing automation", "lead nurturing", "crm automation"],
});

const links = [
  { label: "Lead Nurturing", href: "/marketing-automation/lead-nurturing" },
  { label: "CRM Automation", href: "/marketing-automation/crm-automation" },
  { label: "Pillar Marketing Automation", href: "/marketing-automation" },
];

export default function KnowledgeMarketingAutomationPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-4xl font-black tracking-tight text-indigo-950">
          Knowledge Hub: Marketing Automation
        </h1>
        <p className="text-lg text-slate-600">
          Nơi tổng hợp tài nguyên tự động hóa marketing để giảm thất thoát lead và tăng hiệu suất chuyển đổi.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-2xl border border-indigo-100 bg-white p-4">
              <p className="font-semibold text-indigo-900">{item.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
