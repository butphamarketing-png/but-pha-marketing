import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";
import { getFeaturedCaseStudies } from "@/lib/case-studies";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

export function BlogCaseStudyStrip({ variant = "light" }: { variant?: "light" | "deep" }) {
  const featured = getFeaturedCaseStudies();
  const deep = variant === "deep";

  return (
    <section
      className={
        deep
          ? "mb-12 border border-amber-200/15 bg-gradient-to-br from-amber-200/[0.07] to-transparent p-6 md:p-8"
          : "mb-10 rounded-[1.75rem] border border-violet-200 bg-gradient-to-br from-violet-50/80 to-indigo-50/60 p-6 md:p-8"
      }
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p
            className={
              deep
                ? "inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/60"
                : "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-700"
            }
          >
            <BarChart3 className="h-4 w-4" />
            Proof layer — đối chiếu MONA
          </p>
          <h2
            className={
              deep
                ? "mt-3 text-3xl font-semibold text-white md:text-4xl"
                : "mt-2 text-2xl font-black text-indigo-950 md:text-3xl"
            }
            style={deep ? serif : undefined}
          >
            Case study có số liệu GSC &amp; Facebook
          </h2>
          <p
            className={
              deep
                ? "mt-3 text-sm leading-relaxed text-white/45 md:text-[15px]"
                : "mt-2 text-sm leading-relaxed text-slate-600 md:text-base"
            }
          >
            Dự án thật với screenshot Google Search Console — không chỉ portfolio ảnh đẹp.
          </p>
        </div>
        <Link
          href="/du-an"
          className={
            deep
              ? "inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/75 hover:border-white/25"
              : "brand-btn-secondary shrink-0 self-start px-5 py-3 text-sm font-bold"
          }
        >
          Xem tất cả dự án
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((study) => (
          <CaseStudyCard key={study.slug} study={study} variant={variant} />
        ))}
      </div>
    </section>
  );
}
