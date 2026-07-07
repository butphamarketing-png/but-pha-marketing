import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buildFaqSchema, buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/marketing-automation/lead-nurturing",
  title: "Lead Nurturing Automation cho doanh nghiệp",
  description:
    "Thiết kế chuỗi nuôi dưỡng lead tự động qua email, Zalo, remarketing để tăng tỷ lệ chuyển đổi từ MQL sang SQL.",
  keywords: ["lead nurturing", "automation chăm sóc khách hàng", "nuôi dưỡng lead tự động"],
});

const sequences = [
  "Chuỗi chào mừng sau khi khách để lại form website",
  "Nhắc lịch / follow-up Zalo theo SLA đã thống nhất",
  "Gửi nội dung giáo dục theo ngành (case study, checklist, báo giá)",
  "Remarketing ads cho lead chưa phản hồi sau 3–7 ngày",
  "Chuyển sang sales khi lead đạt điểm (lead scoring)",
];

const faqs = [
  {
    q: "Lead Nurturing khác CRM Automation thế nào?",
    a: "Lead Nurturing chăm sóc lead tự động trước khi chuyển sales. CRM Automation quản lý pipeline và giao việc cho đội bán hàng.",
  },
  {
    q: "Cần bao nhiêu kịch bản nuôi dưỡng?",
    a: "Thường bắt đầu 2–3 chuỗi: lead lạnh (mới vào), lead ấm (đã tương tác), lead nóng (sẵn sàng báo giá). Mở rộng theo ngành sau.",
  },
];

export default function LeadNurturingPage() {
  const serviceLd = buildServiceSchema({
    name: "Lead Nurturing Automation",
    path: "/marketing-automation/lead-nurturing",
    description: "Thiết kế workflow nuôi dưỡng lead theo hành vi để tăng tỷ lệ phản hồi và tỷ lệ chốt.",
    serviceType: "Lead Nurturing Automation",
  });
  const faqLd = buildFaqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="mx-auto max-w-5xl space-y-8">
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
            <li className="font-semibold text-indigo-950" aria-current="page">
              Lead Nurturing
            </li>
          </ol>
        </nav>

        <section className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/40 p-8 shadow-sm md:p-12">
          <p className="brand-eyebrow mb-3">Marketing Automation</p>
          <h1 className="text-4xl font-black tracking-tight text-indigo-950 md:text-5xl">
            Lead Nurturing Automation
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            Không phải lead nào cũng sẵn sàng mua ngay. <strong>Lead Nurturing</strong> giúp bạn chăm sóc tự
            động theo hành vi — tăng tỷ lệ phản hồi, đặt lịch và chuyển sang sales đúng thời điểm.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/lien-he" className="brand-btn-primary">
              Tư vấn Lead Nurturing
              <ArrowRight size={18} />
            </Link>
            <Link href="/marketing-automation/crm-automation" className="brand-btn-secondary">
              CRM Automation
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">Kịch bản nuôi dưỡng phổ biến</h2>
          <ul className="mt-5 space-y-3">
            {sequences.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-indigo-50 bg-indigo-50/30 px-4 py-3 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">Câu hỏi thường gặp</h2>
          <div className="mt-5 space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-indigo-100 bg-indigo-50/20 p-5 open:border-violet-200"
              >
                <summary className="cursor-pointer list-none font-bold text-indigo-950 marker:hidden">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
