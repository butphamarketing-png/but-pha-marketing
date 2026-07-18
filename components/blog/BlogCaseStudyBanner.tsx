import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";
import { getCaseStudyBySlug } from "@/lib/case-studies";

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

export function BlogCaseStudyBanner({
  caseStudySlug,
  variant = "light",
}: {
  caseStudySlug: string;
  variant?: "light" | "deep";
}) {
  const study = getCaseStudyBySlug(caseStudySlug);
  if (!study) return null;

  const topMetric = study.results[0];
  const deep = variant === "deep";

  if (deep) {
    return (
      <aside className="my-10 overflow-hidden border border-amber-200/15 bg-gradient-to-br from-amber-200/[0.07] to-transparent p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/60">
              Case study thực tế
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white md:text-2xl" style={serif}>
              {study.clientName} — {study.keywordsMain}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/45">{study.answerFirst}</p>
            {topMetric && (
              <p className="mt-3 text-sm font-medium text-amber-100/90">
                {topMetric.label}: <span className="text-lg font-semibold text-amber-100">{topMetric.value}</span>
                {topMetric.note ? ` · ${topMetric.note}` : ""}
              </p>
            )}
          </div>
          <BarChart3 className="hidden h-12 w-12 text-amber-200/40 md:block" aria-hidden />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/du-an/${study.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-amber-200 px-4 py-2.5 text-sm font-semibold text-[#0b0d12] transition hover:bg-amber-100"
          >
            Xem case study đầy đủ
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/website"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white/75 transition hover:border-amber-200/40 hover:text-amber-100"
          >
            Thiết kế website tương tự
          </Link>
          <a
            href={study.websiteUrl || study.fanpageUrl || "/du-an"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white/75 transition hover:border-amber-200/40 hover:text-amber-100"
          >
            {study.websiteUrl ? "Website khách hàng" : "Fanpage khách hàng"}
          </a>
        </div>
      </aside>
    );
  }

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
          href={study.websiteUrl || study.fanpageUrl || "/du-an"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
        >
          {study.websiteUrl ? "Website khách hàng" : "Fanpage khách hàng"}
        </a>
      </div>
    </aside>
  );
}
