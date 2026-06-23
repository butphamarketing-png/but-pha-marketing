import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getPillarHubForArticle } from "@/lib/seo-pillar-hub";

const TOPIC_LABEL: Record<string, string> = {
  website: "Website",
  facebook: "Facebook & Fanpage",
  "google-maps": "Google Maps & SEO Local",
  marketing: "Marketing tổng thể",
};

export function BlogPillarHub({
  slug,
  keywordsMain,
  title,
}: {
  slug: string;
  keywordsMain?: string;
  title?: string;
}) {
  const hub = getPillarHubForArticle({ slug, keywordsMain, title });
  const topicLabel = TOPIC_LABEL[hub.topic] || "Marketing";

  return (
    <section className="mt-10 rounded-[1.75rem] border border-violet-200 bg-gradient-to-br from-violet-50/90 via-white to-indigo-50/50 p-6 shadow-brand md:p-8">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-xl bg-violet-100 p-2.5 text-violet-700">
          <BookOpen size={22} />
        </div>
        <div>
          <p className="brand-eyebrow mb-1">Chủ đề {topicLabel}</p>
          <h2 className="text-xl font-black text-indigo-950 md:text-2xl">
            {hub.isPillarPage ? "Bài pillar — đọc thêm trong chủ đề" : "Đọc bài pillar trước khi đi sâu"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            {hub.isPillarPage
              ? "Các bài dưới đây bổ sung chi tiết theo ngành, địa phương hoặc từ khóa dài — tất cả liên kết về cùng hệ pillar."
              : "Từ khóa ngắn được tổng hợp ở bài pillar. Nên đọc pillar trước để nắm quy trình, báo giá và checklist chuẩn."}
          </p>
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {hub.links.map((pillar) => (
          <li key={pillar.slug}>
            <Link
              href={`/blog/${pillar.slug}`}
              className={`group flex h-full flex-col rounded-2xl border px-4 py-3.5 transition hover:-translate-y-0.5 hover:shadow-brand ${
                pillar.slug === slug
                  ? "border-violet-400 bg-violet-100/60"
                  : "border-indigo-100 bg-white hover:border-violet-200"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                {pillar.keyword}
              </span>
              <span className="mt-1 text-sm font-bold leading-snug text-indigo-950 group-hover:text-violet-700">
                {pillar.label}
              </span>
              {pillar.slug !== slug && (
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-violet-600">
                  Xem pillar
                  <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
                </span>
              )}
              {pillar.slug === slug && (
                <span className="mt-2 text-xs font-semibold text-violet-700">Bạn đang đọc bài này</span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-violet-100 pt-5">
        <Link
          href={hub.service.serviceHref}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          {hub.service.serviceLabel}
          <ArrowRight size={16} />
        </Link>
        <Link href="/lien-he" className="text-sm font-semibold text-violet-700 hover:text-violet-900">
          Tư vấn miễn phí →
        </Link>
      </div>
    </section>
  );
}
