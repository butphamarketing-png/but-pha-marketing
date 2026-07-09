import {
  wrapArticle,
  img,
  seoImageAlt,
  NEWS_CONTENT_IMAGE_COUNT,
  KIEN_TRUC_CONTENT_IMAGE_COUNT,
  NHA_HANG_CONTENT_IMAGE_COUNT,
  KHACH_SAN_CONTENT_IMAGE_COUNT,
  MAM_NON_CONTENT_IMAGE_COUNT,
  THIET_BI_VE_SINH_CONTENT_IMAGE_COUNT,
  BAT_DONG_SAN_CONTENT_IMAGE_COUNT,
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
  getKhachSanContentImageAlt,
  getMamNonContentImageAlt,
  getThietBiVeSinhContentImageAlt,
  getBatDongSanContentImageAlt,
  getIndustryMockupContentAlt,
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

/** Ảnh minh họa trong bài — pool public/tin-tuc/khach-san (6 ảnh nội dung: index 0–5). */
export function wpKhachSanImg(index, alt) {
  const resolvedAlt = alt || getKhachSanContentImageAlt(index);
  return img(index % KHACH_SAN_CONTENT_IMAGE_COUNT, resolvedAlt, "khach-san");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/mam-non (5 ảnh: index 0–4). */
export function wpMamNonImg(index, alt) {
  const resolvedAlt = alt || getMamNonContentImageAlt(index);
  return img(index % MAM_NON_CONTENT_IMAGE_COUNT, resolvedAlt, "mam-non");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/thiet-bi-ve-sinh (7 ảnh: index 0–6). */
export function wpThietBiVeSinhImg(index, alt) {
  const resolvedAlt = alt || getThietBiVeSinhContentImageAlt(index);
  return img(index % THIET_BI_VE_SINH_CONTENT_IMAGE_COUNT, resolvedAlt, "thiet-bi-ve-sinh");
}

/** Ảnh minh họa trong bài — pool public/tin-tuc/bat-dong-san (6 ảnh: index 0–5). */
export function wpBatDongSanImg(index, alt) {
  const resolvedAlt = alt || getBatDongSanContentImageAlt(index);
  return img(index % BAT_DONG_SAN_CONTENT_IMAGE_COUNT, resolvedAlt, "bat-dong-san");
}

/** Ảnh nội dung bài — pool ảnh #2..n (ảnh #1 = thumbnail, không lặp trong bài). */
export function wpPcccImg(index, alt) {
  const resolvedAlt = alt || getIndustryMockupContentAlt("pccc", index);
  return img(index % PCCC_CONTENT_IMAGE_COUNT, resolvedAlt, "pccc");
}

/** Ảnh nội dung bài — pool ảnh #2..n. */
export function wpMyPhamImg(index, alt) {
  const resolvedAlt = alt || getIndustryMockupContentAlt("my-pham", index);
  return img(index % MY_PHAM_CONTENT_IMAGE_COUNT, resolvedAlt, "my-pham");
}

/** Ảnh nội dung bài — pool ảnh #2..n. */
export function wpThangMayImg(index, alt) {
  const resolvedAlt = alt || getIndustryMockupContentAlt("thang-may", index);
  return img(index % THANG_MAY_CONTENT_IMAGE_COUNT, resolvedAlt, "thang-may");
}

/** Ảnh nội dung bài — pool ảnh #2..n. */
export function wpNhaKhoaImg(index, alt) {
  const resolvedAlt = alt || getIndustryMockupContentAlt("nha-khoa", index);
  return img(index % NHA_KHOA_CONTENT_IMAGE_COUNT, resolvedAlt, "nha-khoa");
}

/** Ảnh nội dung bài — pool ảnh #2..n. */
export function wpLuatImg(index, alt) {
  const resolvedAlt = alt || getIndustryMockupContentAlt("luat", index);
  return img(index % LUAT_CONTENT_IMAGE_COUNT, resolvedAlt, "luat");
}

/** Ảnh nội dung bài — pool ảnh #2..n. */
export function wpThamMyImg(index, alt) {
  const resolvedAlt = alt || getIndustryMockupContentAlt("tham-my", index);
  return img(index % THAM_MY_CONTENT_IMAGE_COUNT, resolvedAlt, "tham-my");
}

/** Ảnh nội dung bài — pool ảnh #2..n. */
export function wpPhongKhamImg(index, alt) {
  const resolvedAlt = alt || getIndustryMockupContentAlt("phong-kham", index);
  return img(index % PHONG_KHAM_CONTENT_IMAGE_COUNT, resolvedAlt, "phong-kham");
}

/** Ảnh nội dung bài — pool ảnh #2..n. */
export function wpLogisticsImg(index, alt) {
  const resolvedAlt = alt || getIndustryMockupContentAlt("logistics", index);
  return img(index % LOGISTICS_CONTENT_IMAGE_COUNT, resolvedAlt, "logistics");
}

/** Ảnh nội dung bài — pool ảnh #2..n. */
export function wpCoKhiImg(index, alt) {
  const resolvedAlt = alt || getIndustryMockupContentAlt("co-khi", index);
  return img(index % CO_KHI_CONTENT_IMAGE_COUNT, resolvedAlt, "co-khi");
}

/** Ảnh nội dung bài — pool ảnh #2..n. */
export function wpBaoBiImg(index, alt) {
  const resolvedAlt = alt || getIndustryMockupContentAlt("bao-bi", index);
  return img(index % BAO_BI_CONTENT_IMAGE_COUNT, resolvedAlt, "bao-bi");
}

/** Ảnh nội dung bài — pool ảnh #2..n. */
export function wpTuDongHoaImg(index, alt) {
  const resolvedAlt = alt || getIndustryMockupContentAlt("tu-dong-hoa", index);
  return img(index % TU_DONG_HOA_CONTENT_IMAGE_COUNT, resolvedAlt, "tu-dong-hoa");
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
