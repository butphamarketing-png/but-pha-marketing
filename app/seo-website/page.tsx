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
  },
  {
    title: "Content SEO",
    desc: "Topic cluster, search intent và topical authority.",
  },
  {
    title: "Local SEO",
    desc: "Khai thác truy vấn địa phương và chuyển đổi cao.",
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
    desc: "Cụm landing local SEO với quality gate index/noindex.",
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
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="mx-auto max-w-6xl space-y-8">
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
              SEO Website
            </li>
          </ol>
        </nav>

        <section className="rounded-3xl border border-indigo-100 bg-white p-8 shadow-sm md:p-12">
          <p className="brand-eyebrow mb-3">Pillar mới</p>
          <h1 className="text-4xl font-black tracking-tight text-indigo-950 md:text-5xl">
            SEO Website theo hệ thống
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Đây là trụ cột SEO Website độc lập để phát triển topical authority dài hạn: từ audit kỹ thuật,
            chiến lược nội dung đến tối ưu chuyển đổi lead.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/website" className="brand-btn-primary">
              Thiết kế website
            </Link>
            <Link href="/lien-he" className="brand-btn-secondary">
              Nhận audit SEO miễn phí
            </Link>
            <Link href="/blog/chu-de/website" className="brand-btn-secondary">
              Xem cụm bài Website
            </Link>
            <Link href="/blog/thiet-ke-website" className="brand-btn-secondary">
              Pillar thiết kế website
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {pillars.map((item) => (
            <article key={item.title} className="rounded-2xl border border-indigo-100 bg-white p-6">
              <h2 className="text-xl font-bold text-indigo-950">{item.title}</h2>
              <p className="mt-2 text-slate-600">{item.desc}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-emerald-900">Proof thực chiến</h2>
          <ul className="mt-4 space-y-2 text-emerald-950">
            <li>- Nha Khoa Đăng Khoa: 15,4K impressions và 471 clicks từ Google Search.</li>
            <li>- Mô hình triển khai: technical SEO + content cluster + internal links theo silo.</li>
            <li>
              - Xem chi tiết tại <Link href="/du-an/nha-khoa-dang-khoa" className="underline">case study có số liệu</Link>.
            </li>
            <li>
              - Hub kiến thức SEO: <Link href="/kien-thuc/seo-website" className="underline">/kien-thuc/seo-website</Link>.
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-indigo-950">Dịch vụ SEO chuyên sâu</h2>
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
      </div>
    </main>
  );
}
