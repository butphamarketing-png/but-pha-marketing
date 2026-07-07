import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";
import { getCaseStudyBySlug } from "@/lib/case-studies";

export function BlogCaseStudyBanner({ caseStudySlug }: { caseStudySlug: string }) {
  const study = getCaseStudyBySlug(caseStudySlug);
  if (!study) return null;

  const topMetric = study.results[0];

  return (
    <aside className="my-10 overflow-hidden rounded-[1.75rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50/50 p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Case study thực tế</p>
          <h2 className="mt-2 text-xl font-black text-indigo-950 md:text-2xl">
            {study.clientName} — {study.keywordsMain}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{study.answerFirst}</p>
          {topMetric && (
            <p className="mt-3 text-sm font-semibold text-emerald-800">
              {topMetric.label}: <span className="text-lg font-black">{topMetric.value}</span>
              {topMetric.note ? ` · ${topMetric.note}` : ""}
            </p>
          )}
        </div>
        <BarChart3 className="hidden h-12 w-12 text-emerald-400 md:block" aria-hidden />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/du-an/${study.slug}`}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
        >
          Xem case study đầy đủ
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/website"
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
        >
          Thiết kế website tương tự
        </Link>
        <a
          href={study.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
        >
          Website khách hàng
        </a>
      </div>
    </aside>
  );
}
