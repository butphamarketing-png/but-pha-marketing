import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getPillarHubForArticle } from "@/lib/seo-pillar-hub";
import { BlogTrackedLink } from "@/components/blog/BlogTrackedLink";

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
  variant = "light",
}: {
  slug: string;
  keywordsMain?: string;
  title?: string;
  variant?: "light" | "deep";
}) {
  const hub = getPillarHubForArticle({ slug, keywordsMain, title });
  const topicLabel = TOPIC_LABEL[hub.topic] || "Marketing";
  const deep = variant === "deep";

  if (deep) {
    return (
      <section className="mt-10 border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
        <div className="mb-5 flex items-start gap-3">
          <div className="border border-white/15 bg-white/[0.04] p-2.5 text-white/70">
            <BookOpen size={22} />
          </div>
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
              Chủ đề {topicLabel}
            </p>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              {hub.isPillarPage ? "Bài pillar — đọc thêm trong chủ đề" : "Đọc bài pillar trước khi đi sâu"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/40">
              {hub.isPillarPage
                ? "Các bài dưới đây bổ sung chi tiết theo ngành, địa phương hoặc từ khóa dài — tất cả liên kết về cùng hệ pillar."
                : "Từ khóa ngắn được tổng hợp ở bài pillar. Nên đọc pillar trước để nắm quy trình, báo giá và checklist chuẩn."}
            </p>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {hub.links.map((pillar) => (
            <li key={pillar.slug}>
              <BlogTrackedLink
                href={`/blog/${pillar.slug}`}
                eventName="blog_pillar_click"
                eventParams={{
                  from_slug: slug,
                  pillar_slug: pillar.slug,
                  blog_topic: hub.topic,
                }}
                className={`group flex h-full flex-col border px-4 py-3.5 transition hover:border-white/20 ${
                  pillar.slug === slug
                    ? "border-white/20 bg-white/[0.04]"
                    : "border-white/[0.08] bg-white/[0.02]"
                }`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  {pillar.keyword}
                </span>
                <span className="mt-1 text-sm font-medium leading-snug text-white/90 group-hover:text-white/80">
                  {pillar.label}
                </span>
                {pillar.slug !== slug && (
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-white/40">
                    Xem pillar
                    <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
                  </span>
                )}
                {pillar.slug === slug && (
                  <span className="mt-2 text-xs font-medium text-white/70">Bạn đang đọc bài này</span>
                )}
              </BlogTrackedLink>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-5">
          <Link
            href={`/blog/chu-de/${hub.topic}`}
            className="text-sm font-medium text-white/65 hover:text-white/80"
          >
            Xem tất cả bài {TOPIC_LABEL[hub.topic]} →
          </Link>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <BlogTrackedLink
            href={hub.service.serviceHref}
            eventName="blog_cta_click"
            eventParams={{
              blog_slug: slug,
              blog_topic: hub.topic,
              placement: "pillar_hub",
              cta_label: hub.service.serviceLabel,
              cta_type: "service",
            }}
            className="inline-flex items-center gap-2 rounded-md bg-[#6D5CE6] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5B4BD4]"
          >
            {hub.service.serviceLabel}
            <ArrowRight size={16} />
          </BlogTrackedLink>
          <BlogTrackedLink
            href={hub.topic === "website" ? "/banggia" : hub.service.serviceHref}
            eventName="blog_cta_click"
            eventParams={{
              blog_slug: slug,
              blog_topic: hub.topic,
              placement: "pillar_hub",
              cta_label: hub.topic === "website" ? "Báo giá thiết kế website" : hub.service.serviceLabel,
              cta_type: hub.topic === "website" ? "pricing" : "service",
            }}
            className="text-sm font-medium text-white/65 hover:text-white/80"
          >
            {hub.topic === "website" ? "Báo giá thiết kế website →" : `${hub.service.serviceLabel} →`}
          </BlogTrackedLink>
        </div>
      </section>
    );
  }

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
            <BlogTrackedLink
              href={`/blog/${pillar.slug}`}
              eventName="blog_pillar_click"
              eventParams={{
                from_slug: slug,
                pillar_slug: pillar.slug,
                blog_topic: hub.topic,
              }}
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
            </BlogTrackedLink>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-violet-100 pt-5">
        <Link
          href={`/blog/chu-de/${hub.topic}`}
          className="text-sm font-semibold text-violet-700 hover:text-violet-900"
        >
          Xem tất cả bài {TOPIC_LABEL[hub.topic]} →
        </Link>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <BlogTrackedLink
          href={hub.service.serviceHref}
          eventName="blog_cta_click"
          eventParams={{
            blog_slug: slug,
            blog_topic: hub.topic,
            placement: "pillar_hub",
            cta_label: hub.service.serviceLabel,
            cta_type: "service",
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          {hub.service.serviceLabel}
          <ArrowRight size={16} />
        </BlogTrackedLink>
        <BlogTrackedLink
          href={hub.topic === "website" ? "/banggia" : hub.service.serviceHref}
          eventName="blog_cta_click"
          eventParams={{
            blog_slug: slug,
            blog_topic: hub.topic,
            placement: "pillar_hub",
            cta_label: hub.topic === "website" ? "Báo giá thiết kế website" : hub.service.serviceLabel,
            cta_type: hub.topic === "website" ? "pricing" : "service",
          }}
          className="text-sm font-semibold text-violet-700 hover:text-violet-900"
        >
          {hub.topic === "website" ? "Báo giá thiết kế website →" : `${hub.service.serviceLabel} →`}
        </BlogTrackedLink>
      </div>
    </section>
  );
}
