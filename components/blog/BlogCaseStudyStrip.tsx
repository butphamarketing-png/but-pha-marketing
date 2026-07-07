import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";
import { getFeaturedCaseStudies } from "@/lib/case-studies";
import { CaseStudyCard } from "@/components/case-study/CaseStudyCard";

export function BlogCaseStudyStrip() {
  const featured = getFeaturedCaseStudies();

  return (
    <section className="mb-10 rounded-[1.75rem] border border-violet-200 bg-gradient-to-br from-violet-50/80 to-indigo-50/60 p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-700">
            <BarChart3 className="h-4 w-4" />
            Proof layer — đối chiếu MONA
          </p>
          <h2 className="mt-2 text-2xl font-black text-indigo-950 md:text-3xl">
            Case study có số liệu GSC &amp; Facebook
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
            Dự án thật với screenshot Google Search Console — không chỉ portfolio ảnh đẹp.
          </p>
        </div>
        <Link href="/du-an" className="brand-btn-secondary shrink-0 self-start px-5 py-3 text-sm font-bold">
          Xem tất cả dự án
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </section>
  );
}
