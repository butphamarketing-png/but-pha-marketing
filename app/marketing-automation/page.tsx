import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

const modules = [
  "Lead capture đa kênh (website, maps, fanpage)",
  "Lead scoring và routing cho sales",
  "Workflow chăm sóc theo giai đoạn",
  "Báo cáo hiệu suất theo funnel",
];

const childPages = [
  {
    href: "/marketing-automation/lead-nurturing",
    title: "Lead Nurturing Automation",
    desc: "Kịch bản nuôi dưỡng lead theo hành vi và giai đoạn mua.",
  },
  {
    href: "/marketing-automation/crm-automation",
    title: "CRM Automation",
    desc: "Đồng bộ dữ liệu lead, phân bổ sales và theo dõi funnel.",
  },
];

export default function MarketingAutomationPage() {
  const canonical = `${SITE_URL}/marketing-automation`;
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Marketing Automation",
    url: canonical,
    inLanguage: "vi-VN",
    isPartOf: {
      "@type": "WebSite",
      name: "Bứt Phá Marketing",
      url: SITE_URL,
    },
    about: [
      { "@type": "Thing", name: "Marketing Automation" },
      { "@type": "Thing", name: "Lead Nurturing" },
      { "@type": "Thing", name: "CRM Automation" },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Marketing Automation phù hợp doanh nghiệp nào?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Phù hợp doanh nghiệp có nhiều lead từ nhiều kênh và cần quy trình xử lý chuẩn để không bỏ sót cơ hội.",
        },
      },
      {
        "@type": "Question",
        name: "Có cần CRM trước khi làm automation không?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nên có CRM hoặc tối thiểu một hệ thống lưu lead tập trung để workflow tự động hoạt động ổn định.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
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
            <li className="font-semibold text-indigo-950" aria-current="page">
              Marketing Automation
            </li>
          </ol>
        </nav>

        <section className="rounded-3xl border border-indigo-100 bg-white p-8 shadow-sm md:p-12">
          <p className="brand-eyebrow mb-3">Pillar mới</p>
          <h1 className="text-4xl font-black tracking-tight text-indigo-950 md:text-5xl">
            Marketing Automation
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Tự động hóa hành trình khách hàng từ lead đến chốt sale để tăng hiệu suất marketing và giảm
            thất thoát cơ hội.
          </p>
          <ul className="mt-6 space-y-2 text-slate-700">
            {modules.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/lien-he" className="brand-btn-primary">
              Tư vấn hệ thống automation
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">Giải pháp triển khai</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {childPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-indigo-100 p-5 transition hover:border-violet-300"
              >
                <p className="font-bold text-indigo-950">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-emerald-900">Proof & outcome framework</h2>
          <ul className="mt-4 space-y-2 text-emerald-950">
            <li>- Chuẩn tracking lead theo nguồn: website, maps, fanpage.</li>
            <li>- KPI tham chiếu: giảm 20-35% lead thất thoát, tăng 15-25% tỷ lệ phản hồi và đặt lịch.</li>
            <li>
              - Áp dụng cùng cụm SEO proof tại <Link href="/du-an" className="underline">trang case study</Link>.
            </li>
            <li>
              - Case benchmark: <Link href="/du-an/nha-khoa-dang-khoa" className="underline">15,4K impressions / 471 clicks</Link>.
            </li>
            <li>
              - Hub automation: <Link href="/kien-thuc/marketing-automation" className="underline">/kien-thuc/marketing-automation</Link>.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
