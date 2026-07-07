import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buildFaqSchema, buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/marketing-automation/crm-automation",
  title: "CRM Automation: đồng bộ lead và sales",
  description:
    "Thiết lập CRM Automation để phân loại lead, giao việc cho sales, theo dõi pipeline và tối ưu tỷ lệ chốt.",
  keywords: ["crm automation", "tự động hóa crm", "quản trị lead", "pipeline sales"],
});

const features = [
  "Thu lead tập trung từ website, form, Zalo, fanpage và Google Maps",
  "Phân loại lead tự động theo nguồn, ngành và mức độ quan tâm",
  "Giao lead cho sales đúng người, đúng thời điểm — không bỏ sót",
  "Pipeline trực quan: mới → đang tư vấn → báo giá → chốt / thất bại",
  "Nhắc việc follow-up, SLA phản hồi và báo cáo hiệu suất đội sales",
  "Dashboard funnel: biết kênh nào tạo lead chất, giai đoạn nào rò rỉ",
];

const process = [
  { step: "01", title: "Khảo sát quy trình", desc: "Map luồng lead hiện tại từ marketing → sales → chăm sóc sau bán." },
  { step: "02", title: "Chuẩn hóa dữ liệu", desc: "Thống nhất trường thông tin, nguồn lead và quy tắc phân loại." },
  { step: "03", title: "Tích hợp kênh", desc: "Nối website, CRM, Zalo và ads để lead vào một hệ thống duy nhất." },
  { step: "04", title: "Thiết lập automation", desc: "Workflow phân tuyến, nhắc việc, chuyển trạng thái và báo cáo tự động." },
  { step: "05", title: "Đo lường & tối ưu", desc: "Theo dõi KPI funnel, điều chỉnh quy tắc routing và giảm lead thất thoát." },
];

const faqs = [
  {
    q: "CRM Automation giúp cải thiện gì cho đội sales?",
    a: "Giảm bỏ sót lead, phân bổ nhanh hơn và theo dõi pipeline theo thời gian thực — từ đó tăng tỷ lệ phản hồi và chốt sale.",
  },
  {
    q: "Có thể tích hợp CRM Automation với website hiện tại không?",
    a: "Có. Form website, nút Zalo và landing page có thể đẩy lead thẳng vào CRM kèm nguồn, UTM và thời gian ghi nhận.",
  },
  {
    q: "Doanh nghiệp nhỏ có cần CRM Automation không?",
    a: "Nên có khi bạn nhận lead từ 2+ kênh hoặc có 2+ người sales — nếu không, lead dễ trùng, chậm hoặc mất trong inbox cá nhân.",
  },
  {
    q: "CRM Automation khác Lead Nurturing thế nào?",
    a: "CRM Automation tập trung quản trị pipeline và giao việc cho sales. Lead Nurturing tập trung chuỗi chăm sóc tự động trước khi chuyển sang sales.",
  },
];

export default function CrmAutomationPage() {
  const serviceLd = buildServiceSchema({
    name: "CRM Automation",
    path: "/marketing-automation/crm-automation",
    description: "Đồng bộ lead marketing với sales và tự động phân tuyến theo quy tắc chuyển đổi.",
    serviceType: "CRM Automation",
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
              <Link href="/" className="font-medium text-indigo-700 hover:text-indigo-900">
                Trang chủ
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li>
              <Link href="/marketing-automation" className="font-medium text-indigo-700 hover:text-indigo-900">
                Marketing Automation
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li className="font-semibold text-indigo-950" aria-current="page">
              CRM Automation
            </li>
          </ol>
        </nav>

        <section className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/40 p-8 shadow-sm md:p-12">
          <p className="brand-eyebrow mb-3">Marketing Automation</p>
          <h1 className="text-4xl font-black tracking-tight text-indigo-950 md:text-5xl">
            CRM Automation — đồng bộ lead &amp; sales
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            Đừng để lead từ website, fanpage hay Google Maps rơi vào Excel hoặc chat cá nhân.{" "}
            <strong>CRM Automation</strong> giúp marketing và sales làm việc trên cùng một pipeline — phân
            loại, giao việc, nhắc follow-up và đo hiệu quả từng kênh.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/lien-he" className="brand-btn-primary">
              Tư vấn CRM Automation
              <ArrowRight size={18} />
            </Link>
            <Link href="/website" className="brand-btn-secondary">
              Thiết kế website thu lead
            </Link>
            <Link href="/marketing-automation/lead-nurturing" className="brand-btn-secondary">
              Lead Nurturing
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">Vì sao cần CRM Automation?</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Khi lead tăng, vấn đề không phải thiếu khách — mà là <em>mất lead</em> giữa marketing và sales:
            phản hồi chậm, không biết ai phụ trách, không đo được kênh nào ra đơn.
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              "Lead vào nhiều inbox, không có người sở hữu rõ ràng",
              "Sales bỏ sót follow-up vì thiếu nhắc việc tự động",
              "Marketing không biết lead nào chuyển thành doanh thu",
              "Báo cáo thủ công — số liệu chậm và không nhất quán",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">Tính năng triển khai</h2>
          <ul className="mt-5 space-y-3">
            {features.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-indigo-50 bg-indigo-50/30 px-4 py-3 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">Quy trình 5 bước</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {process.map((item) => (
              <article key={item.step} className="rounded-2xl border border-indigo-100 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-violet-600">Bước {item.step}</p>
                <h3 className="mt-2 font-bold text-indigo-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-emerald-900">KPI tham chiếu sau triển khai</h2>
          <ul className="mt-4 space-y-2 text-emerald-950">
            <li>Giảm <strong>20–35%</strong> lead thất thoát do phản hồi chậm hoặc không phân công</li>
            <li>Tăng <strong>15–25%</strong> tỷ lệ lead được sales liên hệ trong SLA 15–30 phút</li>
            <li>Biết rõ kênh nào tạo lead chất lượng — tối ưu ngân sách marketing</li>
            <li>
              Kết hợp{" "}
              <Link href="/du-an/nha-khoa-dang-khoa" className="font-semibold underline">
                case study website + SEO
              </Link>{" "}
              để lead organic vào CRM bền vững
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">Liên kết trong hệ sinh thái</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/marketing-automation", label: "Marketing Automation", desc: "Tổng quan hệ thống automation" },
              { href: "/marketing-automation/lead-nurturing", label: "Lead Nurturing", desc: "Nuôi dưỡng trước khi chuyển sales" },
              { href: "/website", label: "Thiết kế website", desc: "Form thu lead chuẩn CRM" },
              { href: "/kien-thuc/marketing-automation", label: "Kiến thức Automation", desc: "Hub tài nguyên & checklist" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-indigo-100 p-4 transition hover:border-violet-300 hover:bg-violet-50/30"
              >
                <p className="font-bold text-indigo-950">{item.label}</p>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">Câu hỏi thường gặp</h2>
          <div className="mt-5 space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-indigo-100 bg-indigo-50/20 p-5 open:border-violet-200 open:bg-violet-50/30"
              >
                <summary className="cursor-pointer list-none font-bold text-indigo-950 marker:hidden">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 p-8 text-white md:p-10">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-200">Sẵn sàng triển khai</p>
          <h2 className="mt-2 text-2xl font-black md:text-3xl">Muốn hệ thống CRM gọn — không rối?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-violet-100 md:text-base">
            Bứt Phá Marketing khảo sát quy trình hiện tại, đề xuất workflow phù hợp quy mô SME và tích hợp
            với website / ads đang chạy.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
            >
              Đặt lịch tư vấn miễn phí
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/marketing-automation"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Xem Marketing Automation
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
