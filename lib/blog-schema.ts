import type { ServerBlogItem } from "@/lib/server-blog";

export type FaqItem = { question: string; answer: string };

function stripHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Parse FAQ blocks from article HTML (`section#faq` with h3 + p pairs). */
export function extractFaqFromHtml(html: string): FaqItem[] {
  const sectionMatch = html.match(/<section[^>]*\bid=["']faq["'][^>]*>([\s\S]*?)<\/section>/i);
  if (!sectionMatch) return [];

  const section = sectionMatch[1];
  const items: FaqItem[] = [];
  const blockRegex = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match: RegExpExecArray | null;

  while ((match = blockRegex.exec(section)) !== null) {
    const question = stripHtml(match[1]);
    const answer = stripHtml(match[2]);
    if (question && answer) items.push({ question, answer });
  }

  return items;
}

function estimateWordCount(html: string) {
  const text = stripHtml(html);
  if (!text) return undefined;
  return text.split(/\s+/).filter(Boolean).length;
}

function blogKeywords(blog: ServerBlogItem) {
  const secondary = (blog.keywordsSecondary || "")
    .split(/[,|]/)
    .map((k) => k.trim())
    .filter(Boolean);
  const main = blog.keywordsMain?.trim();
  return [...new Set([...(main ? [main] : []), ...secondary])];
}

type BuildBlogJsonLdInput = {
  blog: ServerBlogItem;
  canonical: string;
  baseUrl: string;
  image: string;
};

export function buildBlogJsonLd({ blog, canonical, baseUrl, image }: BuildBlogJsonLdInput) {
  const publishedDate = blog.publishedAt || new Date(blog.timestamp).toISOString();
  const modifiedDate = blog.updatedAt || publishedDate;
  const faqItems = extractFaqFromHtml(blog.content);
  const keywords = blogKeywords(blog);
  const wordCount = estimateWordCount(blog.content);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      headline: blog.title,
      name: blog.title,
      description: blog.metaDescription || blog.description,
      datePublished: publishedDate,
      dateModified: modifiedDate,
      image: [image],
      inLanguage: "vi-VN",
      url: canonical,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      articleSection: blog.category || "Marketing",
      ...(keywords.length ? { keywords: keywords.join(", ") } : {}),
      ...(wordCount ? { wordCount } : {}),
      author: [{ "@type": "Organization", name: "Bứt Phá Marketing", url: baseUrl }],
      publisher: {
        "@type": "Organization",
        name: "Bứt Phá Marketing",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.jpg`,
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tin tức",
          item: `${baseUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: blog.title,
          item: canonical,
        },
      ],
    },
  ];

  if (faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildBlogMetadataKeywords(blog: ServerBlogItem) {
  return blogKeywords(blog);
}
