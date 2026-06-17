"use client";

import { useMemo } from "react";
import { BlogOptimizedImage } from "@/components/blog/BlogOptimizedImage";

const IMG_TAG_RE = /<img\s+([^>]*?)\/?>/gi;

function readAttr(attrs: string, name: string) {
  const match = attrs.match(new RegExp(`${name}=["']([^"']*)["']`, "i"));
  return match?.[1] ?? "";
}

function readNumberAttr(attrs: string, name: string, fallback: number) {
  const raw = readAttr(attrs, name);
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

type Segment =
  | { type: "html"; value: string }
  | { type: "image"; src: string; alt: string; width: number; height: number; className: string };

function segmentArticleHtml(html: string): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;

  for (const match of html.matchAll(IMG_TAG_RE)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      segments.push({ type: "html", value: html.slice(lastIndex, index) });
    }

    const attrs = match[1] ?? "";
    segments.push({
      type: "image",
      src: readAttr(attrs, "src"),
      alt: readAttr(attrs, "alt") || "Minh họa bài viết Bứt Phá Marketing",
      width: readNumberAttr(attrs, "width", 1200),
      height: readNumberAttr(attrs, "height", 675),
      className: readAttr(attrs, "class") || "w-full rounded-2xl border border-indigo-100",
    });

    lastIndex = index + match[0].length;
  }

  if (lastIndex < html.length) {
    segments.push({ type: "html", value: html.slice(lastIndex) });
  }

  return segments;
}

export function BlogArticleContent({ html }: { html: string }) {
  const segments = useMemo(() => segmentArticleHtml(html), [html]);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === "html") {
          return (
            <span
              key={`html-${index}`}
              className="contents"
              dangerouslySetInnerHTML={{ __html: segment.value }}
            />
          );
        }

        return (
          <BlogOptimizedImage
            key={`img-${index}`}
            src={segment.src}
            alt={segment.alt}
            width={segment.width}
            height={segment.height}
            sizes="inline"
            className={segment.className}
          />
        );
      })}
    </>
  );
}
