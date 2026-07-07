/**
 * Template silo — cấu trúc website luật 2026
 * Chạy: node scripts/seed-template-website-luat-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website công ty luật";

const article = {
  title: "Template Website Công Ty Luật 2026 — Cấu Trúc 8 Trang Văn Phòng Luật",
  slug: "template-website-luat-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website luật sư, cấu trúc văn phòng luật, sitemap công ty luật, layout tư vấn pháp lý",
  metaTitle: "Template Website Luật 2026 | 8 Trang",
  metaDescription:
    "Template website công ty luật 2026: 8 trang — luật sư, lĩnh vực hành nghề, form tư vấn, SEO local. Bứt Phá Marketing.",
  description:
    "Mẫu cấu trúc website công ty luật 8 trang — uy tín luật sư và SEO local.",
  imageUrl: "/tin-tuc/luat/luat-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Công Ty Luật 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "menu", label: "Menu & sitemap" },
  { id: "trang-chu", label: "Trang chủ" },
  { id: "linh-vuc", label: "Lĩnh vực hành nghề" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> — 8 trang văn phòng luật: profile luật sư, silo lĩnh vực (dân sự, doanh nghiệp…), form tư vấn bảo mật. <a href="${SITE}/blog/checklist-website-luat-2026">Checklist</a>.</p>
</div>

<h2 id="menu">Menu &amp; sitemap 8 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu văn phòng</strong> — /gioi-thieu</li>
  <li><strong>Luật sư / Đội ngũ</strong> — /luat-su</li>
  <li><strong>Lĩnh vực</strong> — /linh-vuc (hub) + /dan-su, /doanh-nghiep…</li>
  <li><strong>Vụ việc tiêu biểu</strong> — /vu-viec (mô tả tổng quát)</li>
  <li><strong>Tư vấn pháp lý</strong> — /tu-van (form bảo mật)</li>
  <li><strong>Blog pháp lý</strong> — /blog</li>
  <li><strong>Liên hệ</strong> — /lien-he</li>
</ul>

<h2 id="trang-chu">Block section — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero:</strong> H1 “Công ty luật [Tên] — Tư vấn [Lĩnh vực] tại [TP]”, CTA tư vấn miễn phí.</li>
  <li><strong>Lĩnh vực icon grid:</strong> 6–8 lĩnh vực hành nghề.</li>
  <li><strong>Luật sư nổi bật:</strong> 2–3 profile + chứng chỉ.</li>
  <li><strong>Quy trình tiếp nhận 4 bước.</strong></li>
  <li><strong>FAQ schema</strong> pháp lý phổ biến.</li>
  <li><strong>Hotline + Zalo sticky.</strong></li>
  <li><strong>Maps + giờ làm việc.</strong></li>
</ol>

<h2 id="linh-vuc">Block — Trang lĩnh vực hành nghề</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>H1:</strong> “Luật sư [Lĩnh vực] tại [Quận/TP]”.</li>
  <li><strong>Mô tả dịch vụ tư vấn + tranh tụng.</strong></li>
  <li><strong>Luật sư phụ trách</strong> lĩnh vực.</li>
  <li><strong>FAQ riêng</strong> lĩnh vực — schema.</li>
  <li><strong>CTA form tư vấn</strong> cuối trang.</li>
</ol>

${img(0, "Template cấu trúc website công ty luật chuẩn SEO", "luat")}

<h2 id="silo">Liên kết silo</h2>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li><a href="${SITE}/blog/thiet-ke-website-cong-ty-luat">Money page</a></li>
  <li><a href="${SITE}/blog/checklist-website-luat-2026">Checklist</a></li>
  <li><a href="${SITE}/blog/nganh/luat">Hub</a></li>
</ul>

<h2 id="faq">FAQ</h2>
<h3>Website luật cần trang riêng từng luật sư?</h3>
<p>Nên có — tăng trust và SEO “luật sư [tên] [chuyên môn]”.</p>

<p><strong>Liên kết:</strong> <a href="${SITE}/blog/nganh/luat">Hub</a> · <a href="${SITE}/banggia">Bảng giá</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed template website luật 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-luat-2026");
