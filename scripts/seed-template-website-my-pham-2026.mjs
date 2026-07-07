/**
 * Template silo — cấu trúc website mỹ phẩm 2026
 * Chạy: node scripts/seed-template-website-my-pham-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website mỹ phẩm";

const article = {
  title: "Template Website Mỹ Phẩm 2026 — Cấu Trúc 8 Trang Shop & Brand",
  slug: "template-website-my-pham-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website mỹ phẩm, cấu trúc shop skincare, sitemap thương hiệu làm đẹp, layout bán mỹ phẩm online",
  metaTitle: "Template Website Mỹ Phẩm 2026 | 8 Trang Shop",
  metaDescription:
    "Template website mỹ phẩm 2026: 8 trang — shop online, review sản phẩm, SEO brand. Case study Halee Trâm nail & academy.",
  description:
    "Mẫu cấu trúc website mỹ phẩm & làm đẹp 8 trang — shop, brand storytelling và silo SEO.",
  imageUrl: "/tin-tuc/my-pham/my-pham-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Mỹ Phẩm 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "menu", label: "Menu & sitemap" },
  { id: "trang-chu", label: "Trang chủ" },
  { id: "shop", label: "Trang shop" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> — 8 trang cho thương hiệu mỹ phẩm/skincare hoặc nail &amp; lash academy. Kết hợp <a href="${SITE}/blog/checklist-website-my-pham-2026">checklist</a> · <a href="${SITE}/du-an/halee-tram">case study Halee Trâm</a>.</p>
</div>

<h2 id="menu">Menu &amp; sitemap 8 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu thương hiệu</strong> — /gioi-thieu</li>
  <li><strong>Sản phẩm / Shop</strong> — /san-pham (category + chi tiết SP)</li>
  <li><strong>Thương hiệu / Ingredients</strong> — /thuong-hieu (story, thành phần)</li>
  <li><strong>Review / Blog</strong> — /blog</li>
  <li><strong>Đào tạo / Academy</strong> — /khoa-hoc (nếu nail/lash)</li>
  <li><strong>Giỏ hàng / Mua</strong> — /gio-hang hoặc link Shopee</li>
  <li><strong>Liên hệ</strong> — /lien-he</li>
</ul>

<h2 id="trang-chu">Block section — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero brand:</strong> H1 + tagline + ảnh campaign, CTA “Mua ngay” / “Đặt lịch”.</li>
  <li><strong>Best-seller:</strong> 4–6 sản phẩm chủ lực.</li>
  <li><strong>USP:</strong> Clean beauty, organic, made in VN…</li>
  <li><strong>Before/after hoặc UGC:</strong> Review khách hàng.</li>
  <li><strong>Instagram / TikTok feed.</strong></li>
  <li><strong>Newsletter / Zalo OA.</strong></li>
</ol>

<h2 id="shop">Block — Trang shop &amp; chi tiết sản phẩm</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Filter category:</strong> Skincare, makeup, nail, lash…</li>
  <li><strong>Card SP:</strong> Ảnh, giá, nút thêm giỏ.</li>
  <li><strong>Trang chi tiết:</strong> Mô tả, thành phần INCI, hướng dẫn dùng, review schema.</li>
  <li><strong>Cross-sell:</strong> “Mua kèm” combo — tăng AOV.</li>
  <li><strong>SEO:</strong> “Kem dưỡng [thương hiệu]”, “serum vitamin C [brand]”.</li>
</ol>

${img(0, "Template cấu trúc website mỹ phẩm shop online", "my-pham")}

<h2 id="silo">Liên kết silo</h2>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li><a href="${SITE}/blog/thiet-ke-website-my-pham-lam-dep">Money page</a></li>
  <li><a href="${SITE}/blog/checklist-website-my-pham-2026">Checklist</a></li>
  <li><a href="${SITE}/blog/nganh/my-pham">Hub</a></li>
  <li><a href="${SITE}/du-an/halee-tram">Case study Halee Trâm</a></li>
</ul>

<h2 id="faq">FAQ</h2>
<h3>Shop mỹ phẩm cần WooCommerce?</h3>
<p>Tùy quy mô — có thể dùng landing + Shopee/Lazada, hoặc WooCommerce/Shopify full cart.</p>

<p><strong>Liên kết:</strong> <a href="${SITE}/blog/nganh/my-pham">Hub</a> · <a href="${SITE}/banggia">Bảng giá</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed template website mỹ phẩm 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-my-pham-2026");
