"use client";

import { BlogLeadPopup } from "@/components/blog/BlogLeadPopup";
import { BlogStickyCTA } from "@/components/blog/BlogStickyCTA";

export function BlogArticleExtras() {
  return (
    <>
      <BlogStickyCTA />
      <BlogLeadPopup source="blog-article" />
    </>
  );
}
