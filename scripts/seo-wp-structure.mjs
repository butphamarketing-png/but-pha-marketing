import {
  wrapArticle,
  img,
  seoImageAlt,
  NEWS_CONTENT_IMAGE_COUNT,
  KIEN_TRUC_CONTENT_IMAGE_COUNT,
  NHA_HANG_CONTENT_IMAGE_COUNT,
  PCCC_CONTENT_IMAGE_COUNT,
  MY_PHAM_CONTENT_IMAGE_COUNT,
  THANG_MAY_CONTENT_IMAGE_COUNT,
  NHA_KHOA_CONTENT_IMAGE_COUNT,
  LUAT_CONTENT_IMAGE_COUNT,
  THAM_MY_CONTENT_IMAGE_COUNT,
  PHONG_KHAM_CONTENT_IMAGE_COUNT,
  LOGISTICS_CONTENT_IMAGE_COUNT,
  CO_KHI_CONTENT_IMAGE_COUNT,
  BAO_BI_CONTENT_IMAGE_COUNT,
  TU_DONG_HOA_CONTENT_IMAGE_COUNT,
  getKienTrucContentImageAlt,
  getNhaHangContentImageAlt,
  SITE,
  ZALO,
  FB,
} from "./seo-article-helpers.mjs";

function ensureKeywordInImageAlts(html, keyword) {
  if (!keyword) return html;
  return html.replace(/<img([^>]*?)alt="([^"]*)"([^>]*?)>/gi, (_match, before, alt, after) => {
    const safeAlt = seoImageAlt(keyword, alt).replace(/"/g, "&quot;");
    return `<img${before}alt="${safeAlt}"${after}>`;
  });
}

/**
 * Cấu trúc bài viết chuẩn SEO WordPress (Yoast / Rank Math):
 * 1. Focus keyphrase trong 100 từ đầu + ít nhất 1 H2
 * 2. Mục lục (TOC)
 * 3. Thân bài: H2 → H3, đoạn ngắn 2–4 câu, list/table
 * 4. Key takeaways (blockquote)
 * 5. FAQ (schema-friendly)
 * 6. Liên kết nội bộ + CTA kết luận
 */

export function wpToc(items) {
  const lis = items
    .map((item) => `<li><a href="#${item.id}">${item.label}</a></li>`)
    .join("\n");
  return `<nav aria-label="Mục lục" class="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5"><p class="text-sm font-semibold uppercase tracking-wide text-indigo-950">Mục lục bài viết</p><ol class="mt-3 list-decimal space-y-1 pl-5 text-indigo-950">${lis}</ol></nav>`;
}

export function wpIntro({ keyword, paragraphs }) {
  const kw = `<strong>${keyword}</strong>`;
  const first = paragraphs[0].replace(keyword, kw);
  const rest = paragraphs.slice(1).map((p) => `<p>${p}</p>`).join("\n");
  return `<p>${first}</p>\n${rest}`;
}

export function wpKeyTakeaways(items) {
  const lis = items.map((item) => `<li>${item}</li>`).join("\n");
  return `<aside class="article-depth my-8 rounded-2xl border border-indigo-100 p-6"><p class="mb-3 text-sm font-bold uppercase tracking-wide text-indigo-800">Tóm tắt nhanh</p><ul class="list-disc space-y-2 pl-5">${lis}</ul></aside>`;
}

export function wpFaq({ keyword, items }) {
  const blocks = items
    .map(
      (f) =>
        `<div class="mb-5 border-b border-indigo-100 pb-5 last:mb-0 last:border-0 last:pb-0"><h3 class="text-base font-semibold text-indigo-950">${f.q}</h3><p class="mt-2">${f.a}</p></div>`,
    )
    .join("\n");
  return `<section id="faq" class="article-faq my-10 rounded-2xl border border-indigo-100 p-6 md:p-8"><h2>Câu hỏi thường gặp về ${keyword}</h2>${blocks}</section>`;
}

export function wpRelatedLinks(links) {
  const lis = links
    .map((l) => `<li><a href="${l.href}">${l.label}</a> — ${l.desc}</li>`)
    .join("\n");
  return `<section class="article-related-links my-8 rounded-2xl border border-indigo-100 p-6"><h2>Bài viết &amp; dịch vụ liên quan</h2><ul class="mt-3 list-disc space-y-2 pl-5">${lis}</ul></section>`;
}

export function wpConclusion({ keyword, paragraphs, ctaLabel, ctaHref }) {
  const body = paragraphs.map((p) => `<p>${p.replace(keyword, `<strong>${keyword}</strong>`)}</p>`).join("\n");
  return `<section id="ket-luan" class="article-implementation my-10 rounded-2xl border border-indigo-100 p-6 md:p-8"><h2>Kết luận</h2>${body}<p class="mt-4"><a href="${ctaHref}" class="font-semibold">${ctaLabel}</a></p></section>`;
}

export function wpExternalCta() {
  return `<p class="article-internal-links rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 text-sm">Liên hệ nhanh: <a href="${ZALO}" rel="noopener">Zalo 0937417982</a> · <a href="${FB}" rel="noopener">Fanpage Bứt Phá Marketing</a> · <a href="${SITE}/website">Xem bảng giá thiết kế website</a></p>`;
}

export function wpImg(index, alt) {
  return img(index % NEWS_CONTENT_IMAGE_COUNT, alt);
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/kien-truc (5 ảnh / bài: index 0–4). */
export function wpKienTrucImg(index, alt) {
  const resolvedAlt = alt || getKienTrucContentImageAlt(index);
  return img(index % KIEN_TRUC_CONTENT_IMAGE_COUNT, resolvedAlt, "kien-truc");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/nha-hang (5 ảnh / bài: index 0–4). */
export function wpNhaHangImg(index, alt) {
  const resolvedAlt = alt || getNhaHangContentImageAlt(index);
  return img(index % NHA_HANG_CONTENT_IMAGE_COUNT, resolvedAlt, "nha-hang");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/pccc (5 ảnh / bài: index 0–4). */
export function wpPcccImg(index, alt) {
  return img(index % PCCC_CONTENT_IMAGE_COUNT, alt, "pccc");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/my-pham (5 ảnh / bài: index 0–4). */
export function wpMyPhamImg(index, alt) {
  return img(index % MY_PHAM_CONTENT_IMAGE_COUNT, alt, "my-pham");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/thang-may (5 ảnh / bài: index 0–4). */
export function wpThangMayImg(index, alt) {
  return img(index % THANG_MAY_CONTENT_IMAGE_COUNT, alt, "thang-may");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/nha-khoa (5 ảnh / bài: index 0–4). */
export function wpNhaKhoaImg(index, alt) {
  return img(index % NHA_KHOA_CONTENT_IMAGE_COUNT, alt, "nha-khoa");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/luat (5 ảnh / bài: index 0–4). */
export function wpLuatImg(index, alt) {
  return img(index % LUAT_CONTENT_IMAGE_COUNT, alt, "luat");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/tham-my (5 ảnh / bài: index 0–4). */
export function wpThamMyImg(index, alt) {
  return img(index % THAM_MY_CONTENT_IMAGE_COUNT, alt, "tham-my");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/phong-kham (5 ảnh / bài: index 0–4). */
export function wpPhongKhamImg(index, alt) {
  return img(index % PHONG_KHAM_CONTENT_IMAGE_COUNT, alt, "phong-kham");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/logistics (5 ảnh / bài: index 0–4). */
export function wpLogisticsImg(index, alt) {
  return img(index % LOGISTICS_CONTENT_IMAGE_COUNT, alt, "logistics");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/co-khi (5 ảnh / bài: index 0–4). */
export function wpCoKhiImg(index, alt) {
  return img(index % CO_KHI_CONTENT_IMAGE_COUNT, alt, "co-khi");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/bao-bi (5 ảnh / bài: index 0–4). */
export function wpBaoBiImg(index, alt) {
  return img(index % BAO_BI_CONTENT_IMAGE_COUNT, alt, "bao-bi");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/tu-dong-hoa (5 ảnh / bài: index 0–4). */
export function wpTuDongHoaImg(index, alt) {
  return img(index % TU_DONG_HOA_CONTENT_IMAGE_COUNT, alt, "tu-dong-hoa");
}

/**
 * @param {object} config
 * @param {string} config.metaTitle
 * @param {string} config.keyword
 * @param {string} config.html
 */
export function buildWpSeoArticle({ metaTitle, keyword, html }) {
  const optimizedHtml = ensureKeywordInImageAlts(html, keyword);
  return wrapArticle({ metaTitle, html: optimizedHtml });
}

export { SITE };
