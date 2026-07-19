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
    <main className="relative min-h-screen overflow-hidden deep-theme text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="relative mx-auto max-w-5xl space-y-10 px-4 py-8 sm:space-y-12 sm:px-6 md:py-10 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-white/40">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="font-medium text-white/40 hover:text-white/80">
                Trang chủ
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/25">
              /
            </li>
            <li className="font-medium text-white/70" aria-current="page">
              Marketing Automation
            </li>
          </ol>
        </nav>

        <section className="border-b border-white/[0.08] pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">Pillar Automation</p>
          <h1
            className="mt-4 max-w-3xl text-[1.75rem] font-semibold leading-snug tracking-tight text-white sm:text-[2.05rem]"
           
          >
            Marketing Automation
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">
            Tự động hóa hành trình khách hàng từ lead đến chốt sale để tăng hiệu suất marketing và giảm thất thoát cơ
            hội.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/65">
            {modules.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#6D5CE6]/70" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/lien-he"
              className="inline-flex rounded-md bg-[#6D5CE6] px-4 py-2 text-sm font-medium text-white hover:bg-[#5B4BD4]"
            >
              Tư vấn hệ thống automation
            </Link>
          </div>
        </section>

        <section className="border-t border-white/[0.08] pt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">Giải pháp</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            Triển khai theo module
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {childPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-l border-white/15 pl-5 transition hover:border-white/20"
              >
                <p className="text-lg font-medium text-white/90">{item.title}</p>
                <p className="mt-2 text-sm text-white/40">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Proof & outcome
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            Framework đo hiệu quả
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-white/65">
            <li>Chuẩn tracking lead theo nguồn: website, maps, fanpage.</li>
            <li>
              KPI tham chiếu: giảm <span className="text-white/80">20–35%</span> lead thất thoát, tăng{" "}
              <span className="text-white/80">15–25%</span> tỷ lệ phản hồi và đặt lịch.
            </li>
            <li>
              Áp dụng cùng cụm SEO proof tại{" "}
              <Link href="/du-an" className="text-white/70 underline-offset-2 hover:underline">
                trang case study
              </Link>
              .
            </li>
            <li>
              Case benchmark:{" "}
              <Link
                href="/du-an/nha-khoa-dang-khoa"
                className="text-white/70 underline-offset-2 hover:underline"
              >
                15,4K impressions / 471 clicks
              </Link>
              .
            </li>
            <li>
              Hub automation:{" "}
              <Link
                href="/kien-thuc/marketing-automation"
                className="text-white/70 underline-offset-2 hover:underline"
              >
                /kien-thuc/marketing-automation
              </Link>
              .
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
