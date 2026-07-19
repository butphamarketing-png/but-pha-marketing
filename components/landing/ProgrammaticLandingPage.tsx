import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { ProgrammaticLanding } from "@/lib/programmatic-seo";
import type { LocalSeoContent } from "@/lib/local-seo-content";
import type { WebsiteIndustryCatalogItem } from "@/lib/website-industry-catalog";
import { getWebsiteIndustryGallery, getWebsiteIndustryHero } from "@/lib/website-industry-images";
import { IndustryMockupImage } from "@/components/website/IndustryMockupImage";
import { mockupDisplayWidth } from "@/lib/industry-mockup-dimensions.generated";

type ClusterLink = { href: string; name: string };

type ProgrammaticLandingPageProps = {
  landing: ProgrammaticLanding;
  indexable: boolean;
  breadcrumbs: { label: string; href?: string }[];
  clusterLinks: ClusterLink[];
  variant: "industry" | "local";
  industryContent?: WebsiteIndustryCatalogItem;
  localContent?: LocalSeoContent | null;
};

const panel =
  "border border-white/10 bg-[#0e1018] p-5 md:p-6";
const btnPrimary =
  "inline-flex items-center gap-2 rounded-md bg-[#6D5CE6] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-950/20 hover:brightness-105";
const btnSecondary =
  "inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/70 hover:border-white/25";

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
  industryContent,
  localContent,
}: ProgrammaticLandingPageProps) {
  const features =
    variant === "industry" && industryContent
      ? industryContent.features
      : variant === "industry"
        ? industryFeatures(landing.primaryKeyword)
        : localContent?.highlights?.length
          ? localContent.highlights
          : localFeatures(landing.primaryKeyword);
  const faqs =
    variant === "local" && localContent?.faqs?.length
      ? localContent.faqs
      : (industryContent?.faqs ?? []);
  const processSteps =
    variant === "local" && localContent?.processSteps?.length
      ? localContent.processSteps
      : (industryContent?.processSteps ?? []);
  const featureHeading = variant === "local" ? "Điểm khác biệt địa phương" : "Tính năng theo ngành";
  const eyebrow = variant === "industry" ? "Website theo ngành" : "SEO địa phương";
  const heroImage =
    variant === "industry" && industryContent
      ? getWebsiteIndustryHero({
          catalogSlug: industryContent.slug,
          primaryKeyword: industryContent.primaryKeyword,
          blogMoneySlug: industryContent.blogMoneySlug,
          title: industryContent.title,
        })
      : null;
  const galleryImages =
    variant === "industry" && industryContent
      ? getWebsiteIndustryGallery(industryContent.slug, industryContent.primaryKeyword)
      : [];

  return (
    <div className="mx-auto max-w-5xl space-y-8 text-white">
      <nav aria-label="Breadcrumb" className="text-sm text-white/40">
        <ol className="flex flex-wrap items-center gap-1.5">
          {breadcrumbs.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-white/25">
                  /
                </span>
              )}
              {item.href ? (
                <Link href={item.href} className="font-medium text-white/40 hover:text-white/80">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-white/70" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <section className="border border-white/10 bg-[#0e1018] p-5 md:p-6">
        <div className="relative">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-300/75">
          {eyebrow}
        </p>
        <h1
          className="text-[1.75rem] font-semibold leading-snug tracking-tight text-white sm:text-[2.05rem]"
         
        >
          {landing.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/45 md:text-lg">
          {landing.description}
        </p>
        <p className="mt-4 text-sm font-medium text-violet-300/85">
          Từ khóa chính: {landing.primaryKeyword}
          {indexable ? " · Đã tối ưu index" : " · Pilot — noindex"}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/website" className={btnPrimary}>
            Thiết kế website
            <ArrowRight size={18} />
          </Link>
          {industryContent?.blogMoneySlug && (
            <Link href={`/blog/${industryContent.blogMoneySlug}`} className={btnSecondary}>
              Hướng dẫn chi tiết
            </Link>
          )}
          {variant === "local" && (
            <Link href="/banggia" className={btnSecondary}>
              Báo giá / bảng giá
            </Link>
          )}
          <Link href={variant === "local" ? "/google-maps" : "/website"} className={btnSecondary}>
            {variant === "local" ? "Google Maps / GBP" : "Dịch vụ thiết kế website"}
          </Link>
          {variant === "local" && (
            <Link href="/website" className={btnSecondary}>
              Thiết kế website
            </Link>
          )}
        </div>
        </div>
      </section>

      {heroImage && (
        <section className={`${panel} overflow-hidden`}>
          <div
            className="mx-auto w-full"
            style={{ maxWidth: `${mockupDisplayWidth(heroImage.src)}px` }}
          >
            <IndustryMockupImage
              src={heroImage.src}
              alt={heroImage.alt}
              priority
              className="mx-auto rounded-xl shadow-lg ring-1 ring-white/10"
            />
          </div>
          <p className="mt-3 text-center text-xs text-white/40">Xem trước giao diện trên mobile</p>
        </section>
      )}

      {galleryImages.length > 1 && (
        <section className={panel}>
          <h2 className="text-xl font-semibold text-white">
            Mẫu giao diện theo ngành
          </h2>
          <p className="mt-2 text-sm text-white/45">
            Mockup hiển thị kích thước mobile — rõ nét hơn khi xem trên desktop.
          </p>
          <div className="mt-5 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img) => (
              <div
                key={img.src}
                className="w-full max-w-[240px] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"
              >
                <IndustryMockupImage variant="card" src={img.src} alt={img.alt} sizes="220px" />
                <p className="px-3 py-2 text-xs font-medium leading-snug text-white/50">{img.alt}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className={panel}>
        <h2 className="text-xl font-semibold text-white">
          {featureHeading}
        </h2>
        {variant === "local" && localContent?.industryHints?.length ? (
          <p className="mt-2 text-sm text-white/45">
            Ngành trọng tâm khu vực: {localContent.industryHints.join(" · ")}
          </p>
        ) : null}
        <ul className="mt-5 space-y-3">
          {features.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-white/70"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400/80" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {variant === "local" && localContent?.napTips?.length ? (
        <section className="border border-white/10 bg-[#0e1018] p-5 md:p-6">
          <h2 className="text-xl font-semibold text-white">
            Checklist NAP &amp; GBP
          </h2>
          <p className="mt-2 text-sm text-white/45">
            Name – Address – Phone phải khớp trên website, Google Business Profile và citation.
          </p>
          <ul className="mt-5 space-y-3">
            {localContent.napTips.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/70"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {processSteps.length > 0 && (
        <section className={panel}>
          <h2 className="text-xl font-semibold text-white">
            Quy trình triển khai
          </h2>
          <ol className="mt-5 space-y-4">
            {processSteps.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6D5CE6] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-white">{step.title}</p>
                  <p className="mt-1 text-sm text-white/45">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="border border-white/10 bg-[#0e1018] p-5 md:p-6">
        <h2 className="text-xl font-semibold text-emerald-100">
          Proof &amp; tham chiếu
        </h2>
        <ul className="mt-4 space-y-2 text-emerald-100/80">
          {industryContent?.caseStudySlug ? (
            <li>
              Case study ngành:{" "}
              <Link
                href={`/du-an/${industryContent.caseStudySlug}`}
                className="font-semibold text-white/70 underline hover:text-white/80"
              >
                Xem dự án có số liệu GSC
              </Link>
            </li>
          ) : (
            <li>
              Case benchmark:{" "}
              <Link
                href="/du-an/nha-khoa-dang-khoa"
                className="font-semibold text-white/70 underline hover:text-white/80"
              >
                15,4K impressions / 471 clicks
              </Link>{" "}
              từ Google Search Console
            </li>
          )}
          <li>Mô hình: landing {variant === "industry" ? "ngành" : "địa phương"} + content cluster + internal link</li>
          <li>
            <Link href="/du-an" className="font-semibold text-white/70 underline hover:text-white/80">
              Tất cả dự án
            </Link>
            {" · "}
            <Link
              href="/blog/chu-de/website"
              className="font-semibold text-white/70 underline hover:text-white/80"
            >
              Hub chủ đề Website
            </Link>
          </li>
        </ul>
      </section>

      <section className={panel}>
        <h2 className="text-xl font-semibold text-white">
          Liên kết trong cụm
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {clusterLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={link.href === "/lien-he" ? btnPrimary : btnSecondary}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </section>

      <section className={panel}>
        <h2 className="text-xl font-semibold text-white">
          Câu hỏi thường gặp
        </h2>
        <div className="mt-5 space-y-3">
          {faqs.length > 0
            ? faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 open:border-white/15"
                >
                  <summary className="cursor-pointer list-none font-medium text-white marker:hidden">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/45">{faq.a}</p>
                </details>
              ))
            : (
              <>
                <details className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 open:border-white/15">
                  <summary className="cursor-pointer list-none font-medium text-white marker:hidden">
                    Giá {landing.primaryKeyword} bao nhiêu?
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/45">
                    Tham khảo{" "}
                    <Link href="/banggia" className="font-semibold text-white/70 underline hover:text-white/80">
                      bảng giá dịch vụ
                    </Link>{" "}
                    — gói Bứt Phá 3–12 triệu tùy scope.
                  </p>
                </details>
                <details className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 open:border-white/15">
                  <summary className="cursor-pointer list-none font-medium text-white marker:hidden">
                    Có cần làm thêm SEO sau khi lên website?
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/45">
                    Nên có. Website chuẩn SEO từ đầu giúp giảm chi phí — xem{" "}
                    <Link href="/website" className="font-semibold text-white/70 underline hover:text-white/80">
                      dịch vụ thiết kế website
                    </Link>
                    .
                  </p>
                </details>
              </>
            )}
        </div>
      </section>

      <section className="border border-white/10 bg-[#0e1018] p-5 md:p-6">
        <h2 className="text-xl font-semibold text-white sm:text-[1.35rem]">
          Sẵn sàng triển khai {landing.primaryKeyword}?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45 md:text-base">
          Xem dịch vụ và báo giá minh bạch — chọn gói phù hợp quy mô dự án.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={variant === "local" ? "/google-maps" : "/website"}
            className={btnPrimary}
          >
            {variant === "local" ? "Dịch vụ Google Maps" : "Thiết kế website"}
            <ArrowRight size={16} />
          </Link>
          <Link href="/banggia" className={btnSecondary}>
            Báo giá
          </Link>
        </div>
      </section>
    </div>
  );
}
