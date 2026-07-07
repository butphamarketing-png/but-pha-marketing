import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { ProgrammaticLanding } from "@/lib/programmatic-seo";

type ClusterLink = { href: string; name: string };

type ProgrammaticLandingPageProps = {
  landing: ProgrammaticLanding;
  indexable: boolean;
  breadcrumbs: { label: string; href?: string }[];
  clusterLinks: ClusterLink[];
  variant: "industry" | "local";
};

function industryFeatures(keyword: string) {
  return [
    `Giao diện chuyên ngành phù hợp từ khóa «${keyword}»`,
    "Form thu lead + Zalo / hotline nổi bật trên mobile",
    "SEO on-page: title, meta, heading, schema Service",
    "Tốc độ tải nhanh và CWV tối ưu cho chuyển đổi",
    "Liên kết hub blog ngành + case study proof",
    "Bàn giao admin và hướng dẫn cập nhật nội dung",
  ];
}

function localFeatures(keyword: string) {
  return [
    `Tối ưu SEO địa phương cho «${keyword}»`,
    "Google Business Profile + landing page message-match",
    "Schema LocalBusiness / Service và NAP nhất quán",
    "Content cluster địa phương + internal link silo",
    "Theo dõi GSC: impressions, clicks theo query địa phương",
    "Tích hợp form lead vào CRM / Zalo",
  ];
}

export function ProgrammaticLandingPage({
  landing,
  indexable,
  breadcrumbs,
  clusterLinks,
  variant,
}: ProgrammaticLandingPageProps) {
  const features = variant === "industry" ? industryFeatures(landing.primaryKeyword) : localFeatures(landing.primaryKeyword);
  const eyebrow = variant === "industry" ? "Website theo ngành" : "SEO địa phương";

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-1.5">
          {breadcrumbs.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true" className="text-slate-400">/</span>}
              {item.href ? (
                <Link href={item.href} className="font-medium text-indigo-700 hover:text-indigo-900">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-indigo-950" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <section className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/40 p-8 shadow-sm md:p-12">
        <p className="brand-eyebrow mb-3">{eyebrow}</p>
        <h1 className="text-4xl font-black tracking-tight text-indigo-950 md:text-5xl">{landing.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">{landing.description}</p>
        <p className="mt-4 text-sm font-semibold text-violet-700">
          Từ khóa chính: {landing.primaryKeyword} · Quality score: {landing.qualityScore}/100 ·{" "}
          {indexable ? "Đang index" : "Pilot — noindex cho đến khi đủ proof"}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/lien-he" className="brand-btn-primary">
            Tư vấn miễn phí
            <ArrowRight size={18} />
          </Link>
          <Link href="/website" className="brand-btn-secondary">
            Dịch vụ thiết kế website
          </Link>
          <Link href="/blog/thiet-ke-website" className="brand-btn-secondary">
            Pillar thiết kế website
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold text-indigo-950">Phạm vi triển khai</h2>
        <ul className="mt-5 space-y-3">
          {features.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-indigo-50 bg-indigo-50/30 px-4 py-3 text-slate-700"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-emerald-900">Proof &amp; tham chiếu</h2>
        <ul className="mt-4 space-y-2 text-emerald-950">
          <li>
            Case benchmark:{" "}
            <Link href="/du-an/nha-khoa-dang-khoa" className="font-semibold underline">
              15,4K impressions / 471 clicks
            </Link>{" "}
            từ Google Search Console
          </li>
          <li>Mô hình: landing {variant === "industry" ? "ngành" : "địa phương"} + content cluster + internal link</li>
          <li>
            Xem thêm{" "}
            <Link href="/du-an" className="font-semibold underline">
              dự án tiêu biểu
            </Link>{" "}
            và{" "}
            <Link href="/blog/chu-de/website" className="font-semibold underline">
              hub chủ đề Website
            </Link>
          </li>
        </ul>
      </section>

      <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold text-indigo-950">Liên kết trong cụm</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {clusterLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={link.href === "/lien-he" ? "brand-btn-primary" : "brand-btn-secondary"}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold text-indigo-950">Câu hỏi thường gặp</h2>
        <div className="mt-5 space-y-3">
          <details className="rounded-2xl border border-indigo-100 bg-indigo-50/20 p-5 open:border-violet-200">
            <summary className="cursor-pointer list-none font-bold text-indigo-950 marker:hidden">
              {variant === "industry"
                ? `Giá ${landing.primaryKeyword} bao nhiêu?`
                : `SEO ${landing.primaryKeyword} mất bao lâu có kết quả?`}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {variant === "industry" ? (
                <>
                  Tham khảo{" "}
                  <Link href="/blog/bao-gia-thiet-ke-website" className="font-semibold text-indigo-700 underline">
                    báo giá thiết kế website
                  </Link>{" "}
                  — gói Bứt Phá 3–12 triệu tùy scope. Báo giá chính xác sau khảo sát nhu cầu ngành.
                </>
              ) : (
                <>
                  SEO địa phương thường 8–12 tuần thấy tín hiệu đầu tiên nếu có landing chuẩn, GBP tối ưu và cụm
                  nội dung hỗ trợ.
                </>
              )}
            </p>
          </details>
          <details className="rounded-2xl border border-indigo-100 bg-indigo-50/20 p-5 open:border-violet-200">
            <summary className="cursor-pointer list-none font-bold text-indigo-950 marker:hidden">
              Có cần làm thêm SEO sau khi lên website?
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Nên có. Website chuẩn kỹ thuật là nền; SEO content cluster và local (nếu có) giúp duy trì traffic
              organic bền vững. Xem{" "}
              <Link href="/seo-website" className="font-semibold text-indigo-700 underline">
                dịch vụ SEO Website
              </Link>
              .
            </p>
          </details>
        </div>
      </section>

      <section className="rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 p-8 text-white md:p-10">
        <h2 className="text-2xl font-black md:text-3xl">Sẵn sàng triển khai {landing.primaryKeyword}?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-violet-100 md:text-base">
          Bứt Phá Marketing tư vấn miễn phí — đề xuất scope, timeline và báo giá minh bạch.
        </p>
        <div className="mt-6">
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
          >
            Liên hệ ngay
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
