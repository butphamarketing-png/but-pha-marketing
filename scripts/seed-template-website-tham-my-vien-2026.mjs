/**
 * Template silo — cấu trúc website thẩm mỹ viện 2026
 * Chạy: node scripts/seed-template-website-tham-my-vien-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website thẩm mỹ viện";

const article = {
  title: "Template Website Thẩm Mỹ Viện 2026 — Cấu Trúc 8 Trang Aesthetic",
  slug: "template-website-tham-my-vien-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website thẩm mỹ, cấu trúc website clinic, sitemap thẩm mỹ viện, layout đặt lịch aesthetic",
  metaTitle: "Template Website Thẩm Mỹ Viện 2026 | 8 Trang",
  metaDescription:
    "Template website thẩm mỹ viện 2026: 8 trang — dịch vụ aesthetic, đặt lịch, before/after, SEO local. Case study Thiên Hoàng Kim.",
  description:
    "Mẫu cấu trúc website thẩm mỹ viện 8 trang — menu aesthetic clinic và silo SEO.",
  imageUrl: "/tin-tuc/tham-my/tham-my-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Thẩm Mỹ Viện 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "menu", label: "Menu & sitemap" },
  { id: "trang-chu", label: "Trang chủ" },
  { id: "dich-vu", label: "Trang dịch vụ" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> — 8 trang cho aesthetic clinic: silo filler/botox/căng da, đặt lịch, gallery before/after có consent. Tham chiếu <a href="${SITE}/du-an/tham-my-thien-hoang-kim">Thiên Hoàng Kim</a>.</p>
</div>

<h2 id="menu">Menu &amp; sitemap 8 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu</strong> — /gioi-thieu (bác sĩ, cơ sở vật chất)</li>
  <li><strong>Dịch vụ</strong> — /dich-vu (hub) + sub: /filler, /botox, /cang-da…</li>
  <li><strong>Bảng giá</strong> — /bang-gia</li>
  <li><strong>Thư viện ảnh</strong> — /hinh-anh (before/after)</li>
  <li><strong>Đặt lịch</strong> — /dat-lich</li>
  <li><strong>Kiến thức</strong> — /blog</li>
  <li><strong>Liên hệ</strong> — /lien-he</li>
</ul>

<h2 id="trang-chu">Block section — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero premium:</strong> H1 + video/ảnh clinic cao cấp, CTA “Tư vấn miễn phí”.</li>
  <li><strong>Dịch vụ signature:</strong> 4–6 card dịch vụ chủ lực.</li>
  <li><strong>Bác sĩ / chuyên gia:</strong> Profile ngắn + link chi tiết.</li>
  <li><strong>Before/after slider:</strong> Consent rõ ràng.</li>
  <li><strong>Review Google:</strong> Rating + link đánh giá.</li>
  <li><strong>Instagram feed:</strong> Đồng bộ thương hiệu social.</li>
  <li><strong>Zalo sticky + đặt lịch.</strong></li>
</ol>

<h2 id="dich-vu">Block section — Trang dịch vụ (ví dụ Filler)</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>H1:</strong> “Tiêm Filler [Quận/TP] — [Tên clinic]”.</li>
  <li><strong>Mô tả + lợi ích:</strong> 400–600 từ.</li>
  <li><strong>Quy trình an toàn:</strong> 4 bước y khoa.</li>
  <li><strong>Giá tham khảo:</strong> Từ … triệu / ml.</li>
  <li><strong>FAQ schema</strong> riêng dịch vụ.</li>
  <li><strong>CTA đặt lịch</strong> cuối trang.</li>
</ol>

${img(0, "Template cấu trúc website thẩm mỹ viện aesthetic", "tham-my")}

<h2 id="silo">Liên kết silo</h2>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li><a href="${SITE}/blog/thiet-ke-website-tham-my-vien">Money page</a></li>
  <li><a href="${SITE}/blog/checklist-website-tham-my-vien-2026">Checklist</a></li>
  <li><a href="${SITE}/blog/nganh/tham-my">Hub</a></li>
  <li><a href="${SITE}/du-an/tham-my-thien-hoang-kim">Case study</a></li>
</ul>

<h2 id="faq">FAQ</h2>
<h3>Template thẩm mỹ khác spa?</h3>
<p>Thẩm mỹ viện nhấn bác sĩ, quy trình y khoa, before/after có consent — spa nhấn dịch vụ thư giãn.</p>

<p><strong>Liên kết:</strong> <a href="${SITE}/blog/nganh/tham-my">Hub</a> · <a href="${SITE}/website">Tư vấn</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed template website thẩm mỹ viện 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-tham-my-vien-2026");
