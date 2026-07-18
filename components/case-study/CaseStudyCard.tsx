import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Globe } from "lucide-react";
import type { CaseStudyItem } from "@/lib/case-studies";

export function CaseStudyCard({
  study,
  variant = "light",
}: {
  study: CaseStudyItem;
  variant?: "light" | "deep";
}) {
  const topMetric = study.results[0];
  const deep = variant === "deep";

  return (
    <article
      className={
        deep
          ? "group flex h-full flex-col overflow-hidden border border-white/[0.08] bg-[#0c0d12] transition hover:border-amber-200/25"
          : "brand-card group flex h-full flex-col overflow-hidden transition hover:shadow-brand-lg"
      }
    >
      <div
        className={
          deep
            ? "relative aspect-[16/10] overflow-hidden border-b border-white/[0.06] bg-white/[0.03]"
            : "relative aspect-[16/10] overflow-hidden border-b border-indigo-100 bg-indigo-50/40"
        }
      >
        <Image
          src={study.thumbnail}
          alt={`Case study ${study.clientName}`}
          fill
          className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className={
              deep
                ? "border border-white/20 bg-[#08090c]/85 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                : "rounded-full border border-white/30 bg-indigo-950/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm"
            }
          >
            {study.industryLabel}
          </span>
          {study.status === "in-progress" && (
            <span
              className={
                deep
                  ? "border border-amber-200/40 bg-amber-200/90 px-3 py-1 text-xs font-semibold text-[#0b0d12]"
                  : "rounded-full border border-amber-200/50 bg-amber-500/90 px-3 py-1 text-xs font-bold text-white"
              }
            >
              Đang triển khai
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div
          className={
            deep
              ? "flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/55"
              : "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-600"
          }
        >
          <Building2 className="h-3.5 w-3.5" />
          Case study
        </div>
        <h2
          className={
            deep
              ? "mt-2 text-xl font-medium leading-snug text-white md:text-2xl"
              : "mt-2 text-xl font-black leading-snug text-indigo-950 md:text-2xl"
          }
        >
          {study.headline}
        </h2>
        <p className={deep ? "mt-3 flex-1 text-sm leading-relaxed text-white/40" : "mt-3 flex-1 text-sm leading-relaxed text-slate-600"}>
          {study.summary}
        </p>

        {topMetric && (
          <div
            className={
              deep
                ? "mt-5 border border-amber-200/15 bg-amber-200/[0.06] px-4 py-3"
                : "mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3"
            }
          >
            <p
              className={
                deep
                  ? "text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200/55"
                  : "text-xs font-semibold uppercase tracking-wide text-emerald-700"
              }
            >
              {topMetric.label}
            </p>
            <p className={deep ? "mt-1 text-2xl font-semibold text-amber-100" : "mt-1 text-2xl font-black text-emerald-900"}>
              {topMetric.value}
            </p>
            {topMetric.note && (
              <p className={deep ? "mt-1 text-xs text-white/35" : "mt-1 text-xs text-emerald-700/80"}>{topMetric.note}</p>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={`/du-an/${study.slug}`}
            className={
              deep
                ? "inline-flex items-center gap-2 rounded-full bg-amber-200 px-4 py-2.5 text-sm font-semibold text-[#0b0d12] transition hover:bg-amber-100"
                : "inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
            }
          >
            Xem chi tiết
            <ArrowRight className="h-4 w-4" />
          </Link>
          {study.websiteUrl && (
            <a
              href={study.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                deep
                  ? "inline-flex items-center gap-1.5 text-sm font-medium text-amber-200/75 hover:text-amber-100"
                  : "inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
              }
            >
              <Globe className="h-4 w-4" />
              Website KH
            </a>
          )}
          {study.fanpageUrl && !study.websiteUrl && (
            <a
              href={study.fanpageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                deep
                  ? "inline-flex items-center gap-1.5 text-sm font-medium text-amber-200/75 hover:text-amber-100"
                  : "inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900"
              }
            >
              Fanpage
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
