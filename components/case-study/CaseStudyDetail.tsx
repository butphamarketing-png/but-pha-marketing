import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Facebook,
  Globe,
  MapPin,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";
import type { CaseStudyItem } from "@/lib/case-studies";
import { getRelatedBlogsForCaseStudy } from "@/lib/case-study-industry-map";
import { resolveSharpBlogImage } from "@/lib/blog-image";

export function CaseStudyDetail({ study }: { study: CaseStudyItem }) {
  const publishedLabel = new Date(study.publishedAt).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const relatedBlogs = getRelatedBlogsForCaseStudy(study.slug);

  return (
    <div className="space-y-10">
      <section className="brand-card overflow-hidden">
        <div className="border-b border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/40 px-6 py-10 md:px-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="brand-eyebrow">Case study — {study.industryLabel}</span>
            {study.status === "in-progress" && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                Dự án đang triển khai
              </span>
            )}
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-indigo-950 md:text-5xl">
            {study.headline}
          </h1>

          <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50/80 p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Tóm tắt nhanh</p>
            <p className="mt-2 text-base leading-relaxed text-indigo-950 md:text-lg">{study.answerFirst}</p>
          </div>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">{study.summary}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={study.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2.5 text-sm font-bold text-indigo-800 shadow-sm transition hover:bg-indigo-50"
            >
              <Globe className="h-4 w-4" />
              {study.websiteUrl.replace(/^https?:\/\/(www\.)?/, "")}
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
            {study.fanpageUrl && (
              <a
                href={study.fanpageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-800 transition hover:bg-blue-100"
              >
                <Facebook className="h-4 w-4" />
                Fanpage Facebook
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </a>
            )}
          </div>

          <p className="mt-4 text-sm text-slate-500">Cập nhật: {publishedLabel}</p>
        </div>

        {study.heroImage && (
          <div className="px-6 pt-6 md:px-10 md:pt-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] border border-indigo-100 shadow-brand">
              <Image
                src={resolveSharpBlogImage(study.heroImage).src}
                alt={`Kết quả SEO ${study.clientName}`}
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 960px"
              />
            </div>
          </div>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {study.results.map((metric) => (
          <div
            key={metric.label}
            className="brand-card p-5 md:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{metric.label}</p>
            <p className="mt-2 flex items-center gap-2 text-3xl font-black text-indigo-950">
              {metric.trend === "up" && <TrendingUp className="h-6 w-6 text-emerald-600" />}
              {metric.value}
            </p>
            {metric.note && <p className="mt-2 text-sm text-slate-600">{metric.note}</p>}
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="brand-card p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-rose-600" />
            <h2 className="text-xl font-black text-indigo-950">Thách thức</h2>
          </div>
          <ul className="mt-5 space-y-3">
            {study.challenge.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-rose-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="brand-card p-6 md:p-8">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <h2 className="text-xl font-black text-indigo-950">Giải pháp Bứt Phá triển khai</h2>
          </div>
          <ul className="mt-5 space-y-3">
            {study.solution.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="brand-card p-6 md:p-8">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-violet-600" />
          <h2 className="text-xl font-black text-indigo-950">Bản đồ từ khóa SEO</h2>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Cụm từ khóa đang tối ưu cho {study.clientName} — theo khu vực và intent tìm kiếm.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {study.keywordClusters.map((cluster) => (
            <div key={cluster.region} className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-900">
                <MapPin className="h-4 w-4 text-violet-600" />
                {cluster.region}
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cluster.keywords.map((kw) => (
                  <li
                    key={kw}
                    className="rounded-full border border-indigo-200/80 bg-white px-3 py-1 text-xs font-medium text-indigo-900"
                  >
                    {kw}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="brand-card p-6 md:p-8">
        <h2 className="text-xl font-black text-indigo-950">Dịch vụ triển khai</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {study.services.map((service) => (
            <div key={service.name} className="rounded-2xl border border-violet-100 bg-violet-50/40 p-5">
              <h3 className="font-bold text-indigo-950">{service.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {study.gallery.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-black text-indigo-950">Minh chứng số liệu</h2>
          <div className="grid gap-6">
            {study.gallery.map((item) => (
              <figure key={item.src} className="brand-card overflow-hidden">
                <div className="relative aspect-[16/9] w-full bg-slate-100">
                  <Image
                    src={resolveSharpBlogImage(item.src).src}
                    alt={item.alt}
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                  />
                </div>
                {item.caption && (
                  <figcaption className="border-t border-indigo-100 px-6 py-4 text-sm text-slate-600">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {study.faq.length > 0 && (
        <section className="brand-card p-6 md:p-8">
          <h2 className="text-xl font-black text-indigo-950">Câu hỏi thường gặp về dự án</h2>
          <div className="mt-5 space-y-4">
            {study.faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-indigo-100 bg-white p-5 open:border-violet-200 open:bg-violet-50/30"
              >
                <summary className="cursor-pointer list-none font-bold text-indigo-950 marker:hidden">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {relatedBlogs.length > 0 && (
        <section className="brand-card p-6 md:p-8">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-black text-indigo-950">
              Kiến thức liên quan — silo {study.industryLabel.toLowerCase()}
            </h2>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Các bài pillar/cluster hỗ trợ SEO ngành — liên kết nội bộ theo mô hình topical authority (đối chiếu MONA
            Media).
          </p>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {relatedBlogs.map((blog) => (
              <li key={blog.slug}>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="flex flex-col rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 transition hover:border-violet-300 hover:bg-violet-50/50"
                >
                  <span className="font-bold text-indigo-950">{blog.label}</span>
                  <span className="mt-1 text-xs text-violet-700">{blog.keyword}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {study.testimonial && (
        <blockquote className="rounded-[1.75rem] border border-indigo-200 bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white shadow-brand-lg md:p-10">
          <p className="text-lg font-medium leading-relaxed md:text-xl">&ldquo;{study.testimonial}&rdquo;</p>
          <footer className="mt-4 text-sm font-semibold text-indigo-100">— {study.clientName}</footer>
        </blockquote>
      )}

      <section className="brand-card overflow-hidden border-violet-200 bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 p-8 text-white md:p-10">
        <p className="text-xs font-bold uppercase tracking-wider text-violet-200">Bạn cần tương tự?</p>
        <h2 className="mt-2 text-2xl font-black md:text-3xl">Làm website + SEO + Facebook cho ngành của bạn</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-violet-100 md:text-base">
          Bứt Phá Marketing triển khai trọn gói: thiết kế website, SEO theo khu vực, fanpage và content — giống mô hình
          đã áp dụng cho {study.clientName}.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/website"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
          >
            Thiết kế website
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
          >
            Nhận tư vấn miễn phí
          </Link>
          <Link
            href="/blog/thiet-ke-website"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
          >
            Hướng dẫn thiết kế website A-Z
          </Link>
        </div>
      </section>
    </div>
  );
}
