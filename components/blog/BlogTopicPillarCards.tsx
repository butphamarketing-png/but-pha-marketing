import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { SeoPillar } from "@/lib/seo-pillar-hub";

export function BlogTopicPillarCards({ pillars }: { pillars: SeoPillar[] }) {
  if (!pillars.length) return null;

  return (
    <section className="mb-10 rounded-[1.75rem] border border-violet-200 bg-gradient-to-br from-violet-50/80 via-white to-indigo-50/40 p-6 md:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-violet-100 p-2.5 text-violet-700">
          <BookOpen size={22} />
        </div>
        <div>
          <p className="brand-eyebrow mb-1">Bài pillar — đọc trước</p>
          <h2 className="text-xl font-black text-indigo-950 md:text-2xl">Hướng dẫn tổng quan theo chủ đề</h2>
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <li key={pillar.slug}>
            <Link
              href={`/blog/${pillar.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-indigo-100 bg-white px-4 py-3.5 transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-brand"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600">{pillar.keyword}</span>
              <span className="mt-1 text-sm font-bold leading-snug text-indigo-950 group-hover:text-violet-700">
                {pillar.label}
              </span>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-violet-600">
                Đọc pillar
                <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
