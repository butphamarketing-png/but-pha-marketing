const SITE = "https://www.butphamarketing.com";
const FB = "https://www.facebook.com/butphamarketing";
const ZALO = "https://zalo.me/0937417982";

const IMAGES = [
  `${SITE}/Website.png`,
  `${SITE}/slideshow-hero.png`,
  `${SITE}/slideshow.jpg`,
  `${SITE}/slideshow1.jpg`,
  `${SITE}/GoogleMaps.png`,
];

export function wrapArticle({ metaTitle, html }) {
  return `<!-- BUTPHA_META ${JSON.stringify({ metaTitle })} -->\n${html}`;
}

export function img(index, alt) {
  const src = IMAGES[index % IMAGES.length];
  return `<figure class="my-6"><img src="${src}" alt="${alt}" loading="lazy" width="1200" height="675" class="w-full rounded-2xl border border-indigo-100" /><figcaption class="mt-2 text-center text-sm text-slate-500">${alt}</figcaption></figure>`;
}

export function toc(items) {
  const lis = items
    .map((item) => `<li><a href="#${item.id}">${item.label}</a></li>`)
    .join("\n");
  return `<nav aria-label="Mục lục" class="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5"><h2 id="muc-luc" class="text-lg font-bold text-indigo-950">Mục lục</h2><ol class="mt-3 list-decimal space-y-1 pl-5 text-indigo-900">${lis}</ol></nav>`;
}

export function internalLinks() {
  return `<p>Bạn có thể tìm hiểu thêm dịch vụ tại <a href="${SITE}/">trang chủ Bứt Phá Marketing</a>, đọc <a href="${SITE}/gioi-thieu">giới thiệu về đội ngũ</a> hoặc xem chi tiết <a href="${SITE}/website">gói thiết kế website</a> phù hợp mô hình kinh doanh.</p>`;
}

export function externalLinks() {
  return `<p>Liên hệ nhanh qua <a href="${ZALO}" rel="noopener">Zalo tư vấn 0937417982</a> hoặc theo dõi cập nhật tại <a href="${FB}" rel="noopener">Fanpage Bứt Phá Marketing</a> để nhận case study và ưu đãi mới.</p>`;
}

export { SITE, FB, ZALO };
