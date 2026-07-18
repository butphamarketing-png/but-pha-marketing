"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import type { PillarTopic } from "@/lib/seo-pillar-hub";
import { getBlogCtaConfig } from "@/lib/blog-cta";
import { BlogTrackedLink } from "@/components/blog/BlogTrackedLink";

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

export function BlogInlineCTA({
  slug,
  topic,
  variant = "light",
}: {
  slug: string;
  topic: PillarTopic;
  variant?: "light" | "deep";
}) {
  const cta = getBlogCtaConfig(topic);
  const baseParams = { blog_slug: slug, blog_topic: topic, placement: "inline_cta" };
  const deep = variant === "deep";

  if (deep) {
    return (
      <section className="mt-10 overflow-hidden border border-amber-200/20 bg-gradient-to-br from-[#12141c] via-[#0c0e14] to-[#16120e] p-6 md:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/60">
          Tư vấn {cta.topicLabel}
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-white md:text-3xl" style={serif}>
          {cta.headline}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45 md:text-base">{cta.subline}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <BlogTrackedLink
            href={cta.primary.href}
            eventName="blog_cta_click"
            eventParams={{ ...baseParams, cta_label: cta.primary.label, cta_type: "primary" }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-[#0b0d12] transition hover:bg-amber-100"
          >
            {cta.primary.label}
            <ArrowRight size={16} />
          </BlogTrackedLink>

          <BlogTrackedLink
            href={cta.secondary.href}
            eventName="blog_cta_click"
            eventParams={{ ...baseParams, cta_label: cta.secondary.label, cta_type: "secondary" }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-amber-200/40 hover:text-amber-100"
          >
            {cta.secondary.label}
          </BlogTrackedLink>

          <BlogTrackedLink
            href={cta.zalo.href}
            external
            eventName="blog_cta_click"
            eventParams={{ ...baseParams, cta_label: cta.zalo.label, cta_type: "zalo" }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-500/25"
          >
            <MessageCircle size={16} />
            {cta.zalo.label}
          </BlogTrackedLink>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 overflow-hidden rounded-[1.75rem] border border-violet-200 bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 p-6 text-white shadow-brand-lg md:p-8">
      <p className="text-xs font-bold uppercase tracking-wider text-violet-200">Tư vấn {cta.topicLabel}</p>
      <h2 className="mt-2 text-2xl font-black leading-tight md:text-3xl">{cta.headline}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-violet-100 md:text-base">{cta.subline}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <BlogTrackedLink
          href={cta.primary.href}
          eventName="blog_cta_click"
          eventParams={{ ...baseParams, cta_label: cta.primary.label, cta_type: "primary" }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
        >
          {cta.primary.label}
          <ArrowRight size={16} />
        </BlogTrackedLink>

        <BlogTrackedLink
          href={cta.secondary.href}
          eventName="blog_cta_click"
          eventParams={{ ...baseParams, cta_label: cta.secondary.label, cta_type: "secondary" }}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
        >
          {cta.secondary.label}
        </BlogTrackedLink>

        <BlogTrackedLink
          href={cta.zalo.href}
          external
          eventName="blog_cta_click"
          eventParams={{ ...baseParams, cta_label: cta.zalo.label, cta_type: "zalo" }}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300/40 bg-emerald-500/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500/30"
        >
          <MessageCircle size={16} />
          {cta.zalo.label}
        </BlogTrackedLink>
      </div>
    </section>
  );
}
