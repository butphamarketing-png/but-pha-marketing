"use client";

import { BlogStickyCTA } from "@/components/blog/BlogStickyCTA";
import type { PillarTopic } from "@/lib/seo-pillar-hub";

export function BlogArticleExtras({
  slug,
  topic,
  variant = "light",
}: {
  slug: string;
  topic: PillarTopic;
  variant?: "light" | "deep";
}) {
  return <BlogStickyCTA slug={slug} topic={topic} variant={variant} />;
}
