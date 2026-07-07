import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

const useCases = [
  "AI Content Ops: brief -> draft -> optimize -> publish",
  "AI hỗ trợ chiến dịch Ads và creative testing",
  "AI Lead Assistant cho phản hồi và phân loại lead",
  "AI Search Optimization cho Google AI Overview và LLM",
];

const childPages = [
  {
    href: "/ai-marketing/ai-content",
    title: "AI Content Ops",
    desc: "Tối ưu quy trình sản xuất nội dung bằng AI có kiểm duyệt chất lượng.",
  },
  {
    href: "/ai-marketing/ai-search-optimization",
    title: "AI Search Optimization",
    desc: "Tối ưu nội dung cho Google AI Overview và công cụ trả lời AI.",
  },
];

export default function AiMarketingPage() {
  const canonical = `${SITE_URL}/ai-marketing`;
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AI Marketing",
    url: canonical,
    inLanguage: "vi-VN",
    isPartOf: {
      "@type": "WebSite",
      name: "Bứt Phá Marketing",
      url: SITE_URL,
    },
    about: [
      { "@type": "Thing", name: "AI Marketing" },
      { "@type": "Thing", name: "AI Content Ops" },
      { "@type": "Thing", name: "AI Search Optimization" },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "AI Marketing có thay thế đội content không?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI giúp tăng tốc sản xuất nhưng vẫn cần biên tập và kiểm định bởi chuyên gia để đảm bảo EEAT.",
        },
      },
      {
        "@type": "Question",
        name: "Làm AI Marketing sao cho không bị nội dung mỏng?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cần workflow có dữ liệu thật, case study, kiểm duyệt chuyên môn và chuẩn internal link theo cụm chủ đề.",
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
              AI Marketing
            </li>
          </ol>
        </nav>

        <section className="rounded-3xl border border-indigo-100 bg-white p-8 shadow-sm md:p-12">
          <p className="brand-eyebrow mb-3">Pillar mới</p>
          <h1 className="text-4xl font-black tracking-tight text-indigo-950 md:text-5xl">AI Marketing</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Xây hệ thống AI để tăng tốc vận hành marketing, mở rộng sản lượng nội dung chất lượng và nâng
            hiệu suất lead-to-sale.
          </p>
          <ul className="mt-6 space-y-2 text-slate-700">
            {useCases.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/lien-he" className="brand-btn-primary">
              Tư vấn triển khai AI Marketing
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">Năng lực AI Marketing</h2>
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
          <h2 className="text-2xl font-bold text-emerald-900">Proof-driven AI workflow</h2>
          <ul className="mt-4 space-y-2 text-emerald-950">
            <li>- AI hỗ trợ sản xuất nội dung nhưng bắt buộc kiểm duyệt theo dữ liệu thật.</li>
            <li>- Mỗi cụm nội dung phải có số liệu, case link và FAQ intent chuyển đổi.</li>
            <li>
              - Tham chiếu mẫu proof tại <Link href="/du-an/nha-khoa-dang-khoa" className="underline">case GSC thực chiến</Link>.
            </li>
            <li>- KPI tham chiếu: tăng 30-50% tốc độ xuất bản nhưng vẫn giữ chuẩn nội dung hữu ích và có dẫn chứng.</li>
            <li>
              - Hub AI: <Link href="/kien-thuc/ai-marketing" className="underline">/kien-thuc/ai-marketing</Link>.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
