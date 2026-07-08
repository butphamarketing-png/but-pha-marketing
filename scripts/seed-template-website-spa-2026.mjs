/**
 * Template silo — cấu trúc website spa 2026
 * Chạy: node scripts/seed-template-website-spa-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website spa";

const article = {
  title: "Template Website Spa 2026 — Cấu Trúc 7 Trang Booking & SEO Local",
  slug: "template-website-spa-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website spa, cấu trúc website spa, sitemap spa làm đẹp, layout booking spa",
  metaTitle: "Template Website Spa 2026 | Cấu Trúc 7 Trang",
  metaDescription:
    "Template website spa 2026: 7 trang — dịch vụ, bảng giá, đặt lịch, combo, SEO local. Case study Phước Lai Luxury.",
  description:
    "Mẫu cấu trúc website spa 7 trang — menu, booking và silo SEO local.",
  imageUrl: "/tin-tuc/tham-my/tham-my-2.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Spa 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "menu", label: "Menu & sitemap" },
  { id: "trang-chu", label: "Trang chủ" },
  { id: "dich-vu", label: "Dịch vụ & combo" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> — 7 trang tối ưu booking: menu dịch vụ, combo giá, gallery không gian, CTA Zalo/đặt lịch. Tham chiếu <a href="${SITE}/du-an/phuoc-lai-luxury">Phước Lai Luxury</a>. Benchmark Fanpage: <strong>83.374 lượt xem</strong> / 90 ngày (<a href="${SITE}/du-an/sao-khue">Sao Khuê</a>).</p>
</div>

<h2 id="menu">Menu &amp; sitemap 7 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Dịch vụ</strong> — /dich-vu (massage, facial, phun xăm…)</li>
  <li><strong>Combo / Bảng giá</strong> — /bang-gia</li>
  <li><strong>Gallery</strong> — /hinh-anh (không gian spa)</li>
  <li><strong>Đặt lịch</strong> — /dat-lich</li>
  <li><strong>Khuyến mãi</strong> — /uu-dai (optional)</li>
  <li><strong>Liên hệ</strong> — /lien-he (Maps, giờ mở cửa)</li>
</ul>

<h2 id="trang-chu">Block section — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero:</strong> Ảnh không gian luxury, H1 “Spa [Tên] — [Quận/TP]”, CTA đặt lịch.</li>
  <li><strong>Combo nổi bật:</strong> 3 gói giá — chuyển đổi nhanh.</li>
  <li><strong>Dịch vụ grid:</strong> Icon + tên + “Từ …đ”.</li>
  <li><strong>Gallery không gian:</strong> 6–8 ảnh ambiance.</li>
  <li><strong>Review / Facebook:</strong> Social proof.</li>
  <li><strong>Giờ mở cửa + Maps.</strong></li>
  <li><strong>Zalo sticky.</strong></li>
</ol>

<h2 id="dich-vu">Block — Trang dịch vụ &amp; combo</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Danh mục filter:</strong> Massage, facial, body, nail…</li>
  <li><strong>Card dịch vụ:</strong> Thời lượng + giá + nút “Đặt ngay”.</li>
  <li><strong>Trang chi tiết dịch vụ:</strong> Mô tả, lợi ích, FAQ — silo SEO “massage [quận]”.</li>
  <li><strong>Combo bundle:</strong> Giảm % khi mua gói — tăng AOV.</li>
</ol>

${img(0, "Template cấu trúc website spa booking SEO local", "tham-my")}

<h2 id="silo">Liên kết silo</h2>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li><a href="${SITE}/blog/thiet-ke-website-spa">Money page</a></li>
  <li><a href="${SITE}/blog/checklist-website-spa-2026">Checklist</a></li>
  <li><a href="${SITE}/blog/nganh/spa">Hub</a></li>
  <li><a href="${SITE}/du-an/phuoc-lai-luxury">Case study Phước Lai</a></li>
  <li><a href="${SITE}/du-an/halee-tram">Case study Halee Trâm</a></li>
</ul>

<h2 id="faq">FAQ</h2>
<h3>Spa có cần blog?</h3>
<p>Nên có 5–10 bài “chăm sóc da”, “massage giảm stress” — long-tail local.</p>

<p><strong>Liên kết:</strong> <a href="${SITE}/blog/nganh/spa">Hub</a> · <a href="${SITE}/banggia">Bảng giá</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed template website spa 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-spa-2026");
