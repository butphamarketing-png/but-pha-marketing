"use client";

import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { PillarTopic } from "@/lib/seo-pillar-hub";
import { getBlogCtaConfig } from "@/lib/blog-cta";
import { BlogTrackedLink } from "@/components/blog/BlogTrackedLink";

export function BlogStickyCTA({ slug, topic }: { slug: string; topic: PillarTopic }) {
  const [visible, setVisible] = useState(false);
  const cta = getBlogCtaConfig(topic);
  const baseParams = { blog_slug: slug, blog_topic: topic, placement: "sticky_bar" };

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-[55] px-4 md:bottom-6 md:left-auto md:right-6 md:max-w-md md:px-0">
      <div className="flex items-center gap-2 rounded-2xl border border-indigo-100 bg-white/95 p-2 shadow-brand-lg backdrop-blur md:p-3">
        <BlogTrackedLink
          href={cta.zalo.href}
          external
          eventName="blog_cta_click"
          eventParams={{ ...baseParams, cta_label: cta.zalo.label, cta_type: "zalo" }}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
        >
          <MessageCircle size={16} />
          Zalo
        </BlogTrackedLink>
        <BlogTrackedLink
          href={cta.primary.href}
          eventName="blog_cta_click"
          eventParams={{ ...baseParams, cta_label: cta.primary.label, cta_type: "primary" }}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          {cta.primary.label}
          <ArrowRight size={16} />
        </BlogTrackedLink>
      </div>
    </div>
  );
}
