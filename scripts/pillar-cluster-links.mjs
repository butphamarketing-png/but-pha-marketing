import { SITE } from "./seo-wp-structure.mjs";
import { getPillarHubForArticle, PILLAR_SLUG_SET } from "./seo-pillar-hub.mjs";

const CLUSTER_MARKER = "article-pillar-cluster";
const MAX_PILLAR_LINKS = 3;

function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function orderPillarsForSlug(slug, pillars) {
  const s = normalize(slug);
  const priority = [];

  if (s.includes("bao-gia") || s.includes("gia-website") || s.includes("chi-phi")) {
    priority.push("bao-gia-thiet-ke-website");
  }
  if (s.includes("seo") && !s.includes("google-maps") && !s.includes("facebook")) {
    priority.push("seo-la-gi");
  }
  if (s.includes("fanpage") && !s.includes("quang-cao")) {
    priority.push("thiet-ke-fanpage-facebook");
  }
  if (s.includes("cham-soc")) {
    priority.push("cham-soc-fanpage");
  }
  if (s.includes("quang-cao") && s.includes("facebook")) {
    priority.push("quang-cao-facebook");
  }
  if (s.includes("google-ads") || s.includes("google-adwords")) {
    priority.push("google-ads-la-gi");
  }
  if (s.includes("tu-van")) {
    priority.push("tu-van-marketing-mien-phi");
  }

  const bySlug = Object.fromEntries(pillars.map((p) => [p.slug, p]));
  const ordered = [];
  for (const slugKey of priority) {
    if (bySlug[slugKey]) ordered.push(bySlug[slugKey]);
  }
  for (const pillar of pillars) {
    if (!ordered.some((p) => p.slug === pillar.slug)) ordered.push(pillar);
  }
  return ordered;
}

export function contentHasPillarClusterBlock(content) {
  return content.includes(CLUSTER_MARKER);
}

export function contentLinksToPillar(content, pillarSlug) {
  return (
    content.includes(`/blog/${pillarSlug}`) ||
    content.includes(`${SITE}/blog/${pillarSlug}`)
  );
}

export function buildPillarClusterHtml({ slug, keywordsMain, title }) {
  const hub = getPillarHubForArticle({ slug, keywordsMain, title });
  const candidates = orderPillarsForSlug(slug, hub.links).filter((p) => p.slug !== slug);
  const pillars = candidates.slice(0, MAX_PILLAR_LINKS);
  if (!pillars.length) return null;

  const lis = pillars
    .map(
      (p) =>
        `<li><a href="${SITE}/blog/${p.slug}"><strong>${p.keyword}</strong></a> — ${p.label}</li>`,
    )
    .join("\n");

  const service = hub.service;
  return `<section class="${CLUSTER_MARKER} my-8 rounded-2xl border border-violet-200 bg-violet-50/40 p-6 md:p-8"><h2>Bài pillar cùng chủ đề</h2><p class="mt-2 text-slate-700">Từ khóa ngắn được tổng hợp ở các bài pillar dưới đây. Nên đọc trước để nắm quy trình, báo giá và checklist chuẩn trước khi đi sâu chi tiết.</p><ul class="mt-4 list-disc space-y-2 pl-5 text-indigo-950">${lis}</ul><p class="mt-5 text-sm"><a href="${SITE}${service.serviceHref}" class="font-semibold text-violet-700">${service.serviceLabel} →</a></p></section>`;
}

export function injectPillarClusterBlock(content, block) {
  if (!block) return { content, injected: false, reason: "no-pillars" };

  const insertBeforePatterns = [
    /<section[^>]*id="ket-luan"/i,
    /<section[^>]*class="[^"]*article-implementation/i,
    /<section[^>]*class="[^"]*article-related-links/i,
    /<section[^>]*class="[^"]*article-faq/i,
    /<p[^>]*class="[^"]*article-internal-links/i,
  ];

  for (const pattern of insertBeforePatterns) {
    const match = content.match(pattern);
    if (match?.index != null) {
      const before = content.slice(0, match.index);
      const after = content.slice(match.index);
      return {
        content: `${before}\n${block}\n${after}`,
        injected: true,
        reason: "before-section",
      };
    }
  }

  return {
    content: `${content.trimEnd()}\n\n${block}`,
    injected: true,
    reason: "append",
  };
}

export function shouldProcessArticle({ slug, content }) {
  if (!slug || PILLAR_SLUG_SET.has(slug)) {
    return { process: false, reason: "is-pillar" };
  }
  if (contentHasPillarClusterBlock(content)) {
    return { process: false, reason: "already-has-block" };
  }
  return { process: true };
}

export function applyPillarClusterLinks(article) {
  const { slug, content, keywords_main: keywordsMain, title } = article;
  const check = shouldProcessArticle({ slug, content: content || "" });
  if (!check.process) {
    return { slug, updated: false, reason: check.reason };
  }

  const block = buildPillarClusterHtml({ slug, keywordsMain, title });
  if (!block) {
    return { slug, updated: false, reason: "no-pillars" };
  }

  const missingLinks = getPillarHubForArticle({ slug, keywordsMain, title })
    .links.filter((p) => p.slug !== slug && !contentLinksToPillar(content, p.slug));

  if (!missingLinks.length) {
    return { slug, updated: false, reason: "all-pillar-links-present" };
  }

  const { content: newContent, injected, reason: injectReason } = injectPillarClusterBlock(
    content,
    block,
  );

  if (!injected) {
    return { slug, updated: false, reason: injectReason };
  }

  return {
    slug,
    updated: true,
    reason: injectReason,
    content: newContent,
    pillarCount: Math.min(missingLinks.length, MAX_PILLAR_LINKS),
  };
}
