import Link from "next/link";
import { SITE_URL } from "@/lib/seo";


const useCases = [
  "AI Content Ops: brief → draft → optimize → publish",
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

const processSteps = [
  { step: "01", title: "Audit workflow hiện tại", desc: "Map quy trình content, ads và lead hiện có." },
  { step: "02", title: "Thiết lập governance", desc: "Brief, fact-check, human review trước publish." },
  { step: "03", title: "AI Content Ops", desc: "Brief → draft → optimize → publish theo cluster SEO." },
  { step: "04", title: "AI Search Optimization", desc: "Answer-first, entity, llms.txt cho AI crawler." },
  { step: "05", title: "Đo KPI & scale", desc: "Tốc độ xuất bản, pass rate QA, traffic/lead per cluster." },
];

const visibleFaqs = [
  {
    q: "AI Marketing có thay thế đội content không?",
    a: "AI giúp tăng tốc sản xuất nhưng vẫn cần biên tập và kiểm định bởi chuyên gia để đảm bảo EEAT.",
  },
  {
    q: "Làm AI Marketing sao cho không bị nội dung mỏng?",
    a: "Cần workflow có dữ liệu thật, case study, kiểm duyệt chuyên môn và chuẩn internal link theo cụm chủ đề.",
  },
  {
    q: "AI Search Optimization là gì?",
    a: "Tối ưu nội dung để xuất hiện trong Google AI Overview, Perplexity và LLM retrieval — answer-first, entity rõ, proof thật.",
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
              AI Marketing
            </li>
          </ol>
        </nav>

        <section className="border-b border-white/[0.08] pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">Pillar AI</p>
          <h1
            className="mt-4 max-w-3xl text-[1.75rem] font-semibold leading-snug tracking-tight text-white sm:text-[2.05rem]"
           
          >
            AI Marketing
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">
            Xây hệ thống AI để tăng tốc vận hành marketing, mở rộng sản lượng nội dung chất lượng và nâng hiệu suất
            lead-to-sale.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/65">
            {useCases.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#6D5CE6]/70" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/lien-he"
              className="inline-flex rounded-md bg-[#6D5CE6] px-4 py-2 text-sm font-medium text-white hover:bg-[#5B4BD4]"
            >
              Tư vấn triển khai AI Marketing
            </Link>
            <Link
              href="/kien-thuc/ai-marketing"
              className="inline-flex rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/75 hover:border-white/25"
            >
              Knowledge Hub AI
            </Link>
            <Link
              href="/blog/chu-de/marketing"
              className="inline-flex rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/75 hover:border-white/25"
            >
              Blog Marketing
            </Link>
          </div>
        </section>

        <section className="border-t border-white/[0.08] pt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">Quy trình</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            Triển khai AI Marketing
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((item) => (
              <article key={item.step} className="border-l border-white/15 pl-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Bước {item.step}
                </p>
                <h3 className="mt-2 text-lg font-medium text-white/90">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/[0.08] pt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">Năng lực</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            Module AI Marketing
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
            Proof-driven workflow
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            AI có kiểm duyệt, có dẫn chứng
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-white/65">
            <li>AI hỗ trợ sản xuất nội dung nhưng bắt buộc kiểm duyệt theo dữ liệu thật.</li>
            <li>Mỗi cụm nội dung phải có số liệu, case link và FAQ intent chuyển đổi.</li>
            <li>
              Tham chiếu mẫu proof tại{" "}
              <Link
                href="/du-an/nha-khoa-dang-khoa"
                className="text-white/70 underline-offset-2 hover:underline"
              >
                case GSC thực chiến
              </Link>
              .
            </li>
            <li>
              KPI tham chiếu: tăng <span className="text-white/80">30–50%</span> tốc độ xuất bản nhưng vẫn giữ chuẩn
              nội dung hữu ích và có dẫn chứng.
            </li>
            <li>
              Hub AI:{" "}
              <Link href="/kien-thuc/ai-marketing" className="text-white/70 underline-offset-2 hover:underline">
                /kien-thuc/ai-marketing
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="border-t border-white/[0.08] pt-8 pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">FAQ</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            Câu hỏi thường gặp
          </h2>
          <div className="mt-8 space-y-3">
            {visibleFaqs.map((item) => (
              <details
                key={item.q}
                className="group border border-white/[0.08] bg-white/[0.02] px-5 py-4 open:border-white/20"
              >
                <summary className="cursor-pointer list-none font-medium text-white/90 marker:hidden">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
