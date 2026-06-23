"use client";

import { BlogLeadPopup } from "@/components/blog/BlogLeadPopup";
import { BlogStickyCTA } from "@/components/blog/BlogStickyCTA";
import type { PillarTopic } from "@/lib/seo-pillar-hub";

export function BlogArticleExtras({ slug, topic }: { slug: string; topic: PillarTopic }) {
  return (
    <>
      <BlogStickyCTA slug={slug} topic={topic} />
      <BlogLeadPopup source="blog-article" slug={slug} topic={topic} />
    </>
  );
}
