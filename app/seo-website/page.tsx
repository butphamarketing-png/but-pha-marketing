import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

const BASE_URL = SITE_URL;

const pillars = [
  {
    title: "SEO Tổng Thể",
    desc: "Lộ trình 6-12 tháng theo mục tiêu traffic và lead.",
  },
  {
    title: "Technical SEO",
    desc: "Crawl/index/Core Web Vitals/schema/canonical.",
    href: "/seo-website/technical-seo",
  },
  {
    title: "Content SEO",
    desc: "Topic cluster, search intent và topical authority.",
    href: "/seo-website/seo-content",
  },
  {
    title: "Local SEO",
    desc: "Khai thác truy vấn địa phương và chuyển đổi cao.",
    href: "/seo-website/dia-phuong/ho-chi-minh",
  },
];

const childPages = [
  {
    href: "/seo-website/technical-seo",
    title: "Technical SEO",
    desc: "Audit crawl, index, canonical, schema và Core Web Vitals.",
  },
  {
    href: "/seo-website/seo-content",
    title: "SEO Content",
    desc: "Xây topic cluster và content plan theo search intent.",
  },
  {
    href: "/seo-website/dia-phuong/ho-chi-minh",
    title: "SEO theo địa phương",
    desc: "Hub TP.HCM + quận: Q.1, Q.3, Q.7, Bình Thạnh, Thủ Đức, Gò Vấp.",
  },
  {
    href: "/seo-website/dia-phuong/ha-noi",
    title: "SEO Hà Nội & quận",
    desc: "Cầu Giấy, Đống Đa, Hai Bà Trưng, Nam Từ Liêm — local pack miền Bắc.",
  },
  {
    href: "/seo-website/dia-phuong/da-nang",
    title: "SEO Đà Nẵng & quận",
    desc: "Hải Châu, Thanh Khê — Maps + website du lịch / dịch vụ.",
  },
];

const processSteps = [
  { step: "01", title: "Audit kỹ thuật", desc: "Crawl, index, canonical, schema, CWV — mở trần cho content." },
  { step: "02", title: "Keyword & intent map", desc: "Phân cụm head/mid/long-tail theo funnel chuyển đổi." },
  { step: "03", title: "Content cluster", desc: "Pillar + cluster + internal link silo theo chủ đề." },
  { step: "04", title: "On-page & proof", desc: "EEAT, case study, FAQ intent, CTA rõ trên mỗi URL." },
  { step: "05", title: "Đo lường & tối ưu", desc: "GSC weekly, điều chỉnh cluster và technical fixes." },
];

const visibleFaqs = [
  {
    q: "SEO Website mất bao lâu để thấy kết quả?",
    a: "Thông thường bắt đầu thấy tín hiệu trong 8-12 tuần và rõ ràng hơn sau 4-6 tháng tùy cạnh tranh ngành.",
  },
  {
    q: "Nên ưu tiên Technical SEO hay Content SEO?",
    a: "Nên xử lý nền tảng kỹ thuật trước để đảm bảo index/crawl tốt, sau đó mở rộng content cluster để tăng phủ từ khóa.",
  },
  {
    q: "SEO Website có cần website mới không?",
    a: "Không bắt buộc. Nếu CWV kém hoặc cấu trúc URL lộn xộn — nên cải tạo kỹ thuật song song với content.",
  },
];

export default function SeoWebsitePage() {
  const canonical = `${BASE_URL}/seo-website`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dịch vụ SEO Website",
    provider: {
      "@type": "Organization",
      name: "Bứt Phá Marketing",
      url: BASE_URL,
    },
    serviceType: "SEO Website",
    url: canonical,
  };
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SEO Website theo hệ thống",
    url: canonical,
    inLanguage: "vi-VN",
    isPartOf: {
      "@type": "WebSite",
      name: "Bứt Phá Marketing",
      url: BASE_URL,
    },
    about: [
      { "@type": "Thing", name: "SEO Website" },
      { "@type": "Thing", name: "Technical SEO" },
      { "@type": "Thing", name: "SEO Content" },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "SEO Website mất bao lâu để thấy kết quả?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Thông thường bắt đầu thấy tín hiệu trong 8-12 tuần và rõ ràng hơn sau 4-6 tháng tùy cạnh tranh ngành.",
        },
      },
      {
        "@type": "Question",
        name: "Nên ưu tiên Technical SEO hay Content SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nên xử lý nền tảng kỹ thuật trước để đảm bảo index/crawl tốt, sau đó mở rộng content cluster để tăng phủ từ khóa.",
        },
      },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden deep-theme text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="relative mx-auto max-w-6xl space-y-10 px-4 py-8 sm:space-y-12 sm:px-6 md:py-10 lg:px-8">
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
              SEO Website
            </li>
          </ol>
        </nav>

        <section className="border-b border-white/[0.08] pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">Pillar SEO</p>
          <h1
            className="mt-4 max-w-3xl text-[1.75rem] font-semibold leading-snug tracking-tight text-white sm:text-[2.05rem]"
           
          >
            SEO Website theo hệ thống
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">
            Trụ cột SEO Website độc lập để phát triển topical authority dài hạn: từ audit kỹ thuật, chiến lược nội dung
            đến tối ưu chuyển đổi lead.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/website"
              className="inline-flex rounded-md bg-[#6D5CE6] px-4 py-2 text-sm font-medium text-white hover:bg-[#5B4BD4]"
            >
              Thiết kế website
            </Link>
            <Link
              href="/lien-he"
              className="inline-flex rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/75 hover:border-white/25"
            >
              Nhận audit SEO miễn phí
            </Link>
            <Link
              href="/blog/chu-de/website"
              className="inline-flex rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/75 hover:border-white/25"
            >
              Cụm bài Website
            </Link>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {pillars.map((item) => {
            const inner = (
              <>
                <h2 className="text-xl font-medium text-white/90">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/40">{item.desc}</p>
              </>
            );
            return "href" in item && item.href ? (
              <Link
                key={item.title}
                href={item.href}
                className="border-l border-white/15 pl-5 transition hover:border-white/20"
              >
                {inner}
              </Link>
            ) : (
              <article key={item.title} className="border-l border-white/15 pl-5">
                {inner}
              </article>
            );
          })}
        </section>

        <section className="border-t border-white/[0.08] pt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">Quy trình</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            Checklist SEO Website
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

        <section className="border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">Proof thực chiến</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            Số liệu GSC, không chỉ lý thuyết
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-white/65">
            <li>
              Nha Khoa Đăng Khoa: <span className="text-white/80">15,4K impressions</span> và{" "}
              <span className="text-white/80">471 clicks</span> từ Google Search.
            </li>
            <li>Mô hình: technical SEO + content cluster + internal links theo silo.</li>
            <li>
              Xem{" "}
              <Link href="/du-an/nha-khoa-dang-khoa" className="text-white/70 underline-offset-2 hover:underline">
                case study có số liệu
              </Link>
              .
            </li>
            <li>
              Hub kiến thức:{" "}
              <Link href="/kien-thuc/seo-website" className="text-white/70 underline-offset-2 hover:underline">
                /kien-thuc/seo-website
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="border-t border-white/[0.08] pt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">Dịch vụ</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-[1.35rem]">
            SEO chuyên sâu
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
