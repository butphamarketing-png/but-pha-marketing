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
          ? "group flex h-full flex-col overflow-hidden border border-white/10 bg-[#0e1018] transition hover:border-white/20"
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
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span
            className={
              deep
                ? "border border-white/15 bg-[#08090c]/85 px-2.5 py-0.5 text-[11px] font-medium text-white/85 backdrop-blur-sm"
                : "rounded-full border border-white/30 bg-indigo-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
            }
          >
            {study.industryLabel}
          </span>
          {study.status === "in-progress" && (
            <span
              className={
                deep
                  ? "border border-violet-400/35 bg-violet-500/90 px-2.5 py-0.5 text-[11px] font-medium text-white"
                  : "rounded-md border border-white/20 bg-[#6D5CE6] px-2.5 py-0.5 text-xs font-medium text-white"
              }
            >
              Đang triển khai
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div
          className={
            deep
              ? "flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/40"
              : "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-600"
          }
        >
          <Building2 className="h-3 w-3" />
          Case study
        </div>
        <h2
          className={
            deep
              ? "mt-1.5 text-[15px] font-medium leading-snug tracking-tight text-white/90 md:text-base"
              : "mt-2 text-lg font-semibold leading-snug text-indigo-950 md:text-xl"
          }
        >
          {study.headline}
        </h2>
        <p
          className={
            deep
              ? "mt-2 flex-1 text-[13px] leading-relaxed text-white/42"
              : "mt-3 flex-1 text-sm leading-relaxed text-slate-600"
          }
        >
          {study.summary}
        </p>

        {topMetric && (
          <div
            className={
              deep
                ? "mt-3.5 border border-white/10 bg-white/[0.03] px-3 py-2.5"
                : "mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3"
            }
          >
            <p
              className={
                deep
                  ? "text-[10px] font-medium uppercase tracking-[0.12em] text-white/40"
                  : "text-xs font-semibold uppercase tracking-wide text-emerald-700"
              }
            >
              {topMetric.label}
            </p>
            <p
              className={
                deep
                  ? "mt-0.5 text-lg font-medium tabular-nums text-white"
                  : "mt-1 text-xl font-semibold text-emerald-900"
              }
            >
              {topMetric.value}
            </p>
            {topMetric.note && (
              <p className={deep ? "mt-0.5 text-[11px] text-white/35" : "mt-1 text-xs text-emerald-700/80"}>
                {topMetric.note}
              </p>
            )}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <Link
            href={`/du-an/${study.slug}`}
            className={
              deep
                ? "inline-flex items-center gap-1.5 rounded-md bg-[#6D5CE6] px-3.5 py-2 text-[13px] font-medium text-white transition hover:bg-[#5B4BD4]"
                : "inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            }
          >
            Xem chi tiết
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {study.websiteUrl && (
            <a
              href={study.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                deep
                  ? "inline-flex items-center gap-1.5 text-[13px] font-medium text-violet-200/70 hover:text-violet-100"
                  : "inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
              }
            >
              <Globe className="h-3.5 w-3.5" />
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
                  ? "inline-flex items-center gap-1.5 text-[13px] font-medium text-violet-200/70 hover:text-violet-100"
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
