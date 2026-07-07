import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Globe } from "lucide-react";
import type { CaseStudyItem } from "@/lib/case-studies";

export function CaseStudyCard({ study }: { study: CaseStudyItem }) {
  const topMetric = study.results[0];

  return (
    <article className="brand-card group flex h-full flex-col overflow-hidden transition hover:shadow-brand-lg">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-indigo-100 bg-indigo-50/40">
        <Image
          src={study.thumbnail}
          alt={`Case study ${study.clientName}`}
          fill
          className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/30 bg-indigo-950/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
            {study.industryLabel}
          </span>
          {study.status === "in-progress" && (
            <span className="rounded-full border border-amber-200/50 bg-amber-500/90 px-3 py-1 text-xs font-bold text-white">
              Đang triển khai
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-600">
          <Building2 className="h-3.5 w-3.5" />
          Case study
        </div>
        <h2 className="mt-2 text-xl font-black leading-snug text-indigo-950 md:text-2xl">{study.headline}</h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{study.summary}</p>

        {topMetric && (
          <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{topMetric.label}</p>
            <p className="mt-1 text-2xl font-black text-emerald-900">{topMetric.value}</p>
            {topMetric.note && <p className="mt-1 text-xs text-emerald-700/80">{topMetric.note}</p>}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={`/du-an/${study.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            Xem chi tiết
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={study.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
          >
            <Globe className="h-4 w-4" />
            Website KH
          </a>
        </div>
      </div>
    </article>
  );
}
