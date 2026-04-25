import { buildExcerpt, buildMetaDescription, buildMetaTitle, buildReliableSlug, buildSeoFriendlyTitle, slugify, stripHtml } from "@/lib/seo-studio-draft";
import { evaluateSeoArticle } from "@/lib/seo-quality";

type InternalLinkSuggestion = {
  slug: string;
  title: string;
  anchorText?: string;
};

function normalize(value: string) {
  return (value || "").replace(/\s+/g, " ").trim();
}

function countWords(text: string) {
  return stripHtml(text).split(/\s+/).filter(Boolean).length;
}

function ensureH1(content: string, title: string) {
  if (/<h1[^>]*>/i.test(content)) return content;
  return `<h1>${title}</h1>${content}`;
}

function ensureH3(content: string, keyword: string) {
  if (/<h3[^>]*>/i.test(content)) return content;
  return `${content}<h3 id="${slugify(`${keyword} thuc chien`)}">${keyword} thuc chien</h3><p>${keyword} can duoc trien khai dong bo voi noi dung, du lieu va toi uu chuyen doi de tao ket qua ben vung.</p>`;
}

function ensureKeywordDensity(content: string, keyword: string) {
  if (!keyword) return content;
  const text = normalize(stripHtml(content)).toLowerCase();
  if (text.includes(keyword.toLowerCase())) return content;
  return `<p>${keyword} la trong tam cua bai viet nay va duoc trien khai theo huong thuc chien, ro rang, de tang kha nang tim kiem va chuyen doi.</p>${content}`;
}

function ensureWordDepth(content: string, keyword: string) {
  if (countWords(content) >= 900) return content;
  return `${content}<section class="article-depth"><h2 id="ke-hoach-trien-khai-${slugify(keyword)}">Ke hoach trien khai ${keyword}</h2><p>De trien khai ${keyword} hieu qua, doanh nghiep can xac dinh dung nhu cau tim kiem, xay dung thong diep ro rang, toi uu cac diem cham chuyen doi va theo doi hieu qua bang du lieu thuc te. Mot bai viet chuan SEO khong chi de co luot truy cap ma con phai giai dap dung cau hoi cua khach hang va dan ho den hanh dong tiep theo.</p><p>Trong giai doan van hanh, nen uu tien noi dung co tinh ung dung cao, vi du cach chon giai phap phu hop, nhung sai lam can tranh, muc tieu ngan sach, KPI can theo doi va lo trinh toi uu theo tung thang. Khi bai viet co them vi du, FAQ, internal link, outbound link va hinh anh co alt text, kha nang duoc Google hieu dung chu de va xep hang tot hon se cao hon.</p></section>`;
}

function ensureAltText(content: string, keyword: string) {
  return content.replace(/<img\b(?![^>]*\balt=)([^>]*)>/gi, `<img alt="${keyword}"$1>`);
}

function ensureOutboundLink(content: string, keyword: string) {
  if (/<a\s+[^>]*href=["']https?:\/\//i.test(content)) return content;
  return `${content}<p>Xem them tai <a href="https://support.google.com/webmasters/" target="_blank" rel="nofollow noopener">tai lieu Search Console</a> de tham khao cach Google danh gia noi dung ${keyword}.</p>`;
}

function ensureInternalLinks(content: string, suggestions: InternalLinkSuggestion[]) {
  const currentCount = (content.match(/<a\s+[^>]*href=["']\/blog\//gi) || []).length;
  if (currentCount >= 2 || suggestions.length === 0) return content;
  const needed = Math.max(0, 2 - currentCount);
  const items = suggestions.slice(0, needed).map((item) => `<li><a href="/blog/${item.slug}">${item.anchorText || item.title}</a></li>`).join("");
  if (!items) return content;
  return `${content}<section class="article-internal-links"><h2 id="bai-viet-lien-quan">Bai viet lien quan</h2><ul>${items}</ul></section>`;
}

function ensureImageAltMeta(imageUrls: string[], title: string) {
  return imageUrls.map((url, index) => ({
    url,
    altText: `${title} - hinh minh hoa ${index + 1}`,
  }));
}

export function autoFixSeoDraft(input: {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  description?: string;
  slug?: string;
  content: string;
  keywords?: string[];
  imageUrls?: string[];
  internalLinks?: InternalLinkSuggestion[];
  serviceKeywords?: string[];
}) {
  const keyword = normalize(input.keywords?.[0] || input.serviceKeywords?.[0] || input.title);
  const title = buildSeoFriendlyTitle({ title: input.title, keyword });
  const slug = buildReliableSlug({ title, keyword });
  const description = buildExcerpt({
    description: input.description,
    content: input.content,
    maxLength: 165,
  });
  const metaTitle = buildMetaTitle({ title, keyword });
  const metaDescription = buildMetaDescription({
    title,
    keyword,
    description,
    content: input.content,
  });

  let content = input.content || "";
  content = ensureH1(content, title);
  content = ensureH3(content, keyword);
  content = ensureKeywordDensity(content, keyword);
  content = ensureWordDepth(content, keyword);
  content = ensureAltText(content, keyword);
  content = ensureOutboundLink(content, keyword);
  content = ensureInternalLinks(content, input.internalLinks || []);

  const keywords = Array.from(new Set([keyword, ...(input.keywords || []).map(normalize).filter(Boolean)])).slice(0, 6);

  const evaluation = evaluateSeoArticle({
    title,
    metaDescription,
    slug,
    keywords,
    content,
    serviceKeywords: input.serviceKeywords,
  });

  return {
    title,
    slug,
    description,
    metaTitle,
    metaDescription,
    content,
    keywords,
    images: ensureImageAltMeta(input.imageUrls || [], title),
    evaluation,
  };
}
