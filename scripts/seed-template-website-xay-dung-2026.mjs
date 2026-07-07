/**
 * Template silo — cấu trúc website xây dựng 2026
 * Chạy: node scripts/seed-template-website-xay-dung-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website xây dựng";

const article = {
  title: "Template Website Xây Dựng 2026 — Cấu Trúc 9 Trang Nhà Thầu",
  slug: "template-website-xay-dung-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website nhà thầu, cấu trúc website xây dựng, sitemap công ty xây dựng, layout hồ sơ năng lực",
  metaTitle: "Template Website Xây Dựng 2026 | Cấu Trúc 9 Trang",
  metaDescription:
    "Template website xây dựng 2026: 9 trang — gallery dự án, hồ sơ năng lực, báo giá, SEO đa tỉnh. Case study Kiến Trúc Sao Khuê.",
  description:
    "Mẫu cấu trúc website công ty xây dựng 9 trang — menu, section và silo SEO nhà thầu.",
  imageUrl: "/case-studies/kien-truc-sao-khue/website-homepage.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Xây Dựng 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "menu", label: "Menu & sitemap" },
  { id: "trang-chu", label: "Trang chủ" },
  { id: "du-an", label: "Trang dự án" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> — khung 9 trang cho nhà thầu: gallery công trình, hồ sơ năng lực PDF, form báo giá và landing đa tỉnh. Tham chiếu <a href="${SITE}/du-an/kien-truc-sao-khue">Kiến Trúc Sao Khuê</a> · <a href="${SITE}/blog/checklist-website-xay-dung-2026">checklist</a>.</p>
</div>

<h2 id="tom-tat">Template website xây dựng là gì?</h2>
<p>Sơ đồ <strong>cấu trúc website công ty xây dựng</strong> — menu, block section và silo landing theo tỉnh/dịch vụ. Dùng làm brief trước khi thiết kế UI.</p>

<h2 id="menu">Menu &amp; sitemap 9 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu</strong> — /gioi-thieu</li>
  <li><strong>Dịch vụ</strong> — /dich-vu (sửa chữa, thi công, thiết kế…)</li>
  <li><strong>Dự án</strong> — /du-an (gallery + filter loại công trình)</li>
  <li><strong>Hồ sơ năng lực</strong> — /ho-so-nang-luc (PDF tải về)</li>
  <li><strong>Báo giá</strong> — /bao-gia hoặc form</li>
  <li><strong>Khu vực</strong> — /xay-dung-[tinh] (landing SEO local)</li>
  <li><strong>Tin tức</strong> — /tin-tuc</li>
  <li><strong>Liên hệ</strong> — /lien-he</li>
</ul>

<h2 id="trang-chu">Block section — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero:</strong> H1 “Công ty xây dựng [Tên] — Thi công &amp; Sửa chữa [Tỉnh]”, CTA báo giá.</li>
  <li><strong>Số liệu trust:</strong> Năm KN, số công trình, m² thi công.</li>
  <li><strong>Dịch vụ card:</strong> Link silo từng dịch vụ.</li>
  <li><strong>Dự án tiêu biểu:</strong> 6–9 ảnh công trình → /du-an.</li>
  <li><strong>Quy trình thi công:</strong> 5 bước infographic.</li>
  <li><strong>Đối tác / chứng nhận:</strong> Logo ISO, nhà cung cấp.</li>
  <li><strong>Form báo giá ngắn:</strong> Loại công trình + diện tích + SĐT.</li>
  <li><strong>Footer:</strong> Hotline, Maps, link <a href="${SITE}/blog/nganh/xay-dung">hub xây dựng</a>.</li>
</ol>

<h2 id="du-an">Block section — Trang dự án</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Filter:</strong> Nhà phố, chung cư, văn phòng, sửa chữa.</li>
  <li><strong>Card dự án:</strong> Ảnh + tên + địa điểm + quy mô m².</li>
  <li><strong>Trang chi tiết dự án:</strong> Gallery trước/sau, mô tả, thời gian thi công — URL riêng cho SEO.</li>
  <li><strong>CTA:</strong> “Dự án tương tự? Báo giá ngay”.</li>
</ol>

${img(0, "Template cấu trúc website xây dựng nhà thầu", "kien-truc")}

<h2 id="silo">Liên kết silo</h2>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li><a href="${SITE}/blog/thiet-ke-website-xay-dung-nha-thau">Money page</a></li>
  <li><a href="${SITE}/blog/checklist-website-xay-dung-2026">Checklist</a></li>
  <li>Template — bài này</li>
  <li><a href="${SITE}/blog/nganh/xay-dung">Hub</a></li>
  <li><a href="${SITE}/du-an/kien-truc-sao-khue">Case study Sao Khuê</a></li>
</ul>

<h2 id="faq">FAQ</h2>
<h3>Cần bao nhiêu landing tỉnh?</h3>
<p>Bắt đầu 3–5 tỉnh trọng điểm — mỗi trang unique content, không copy.</p>
<h3>Hồ sơ năng lực đặt ở đâu?</h3>
<p>Trang riêng /ho-so-nang-luc + nút tải PDF trên header.</p>

<p><strong>Liên kết:</strong> <a href="${SITE}/blog/nganh/xay-dung">Hub</a> · <a href="${SITE}/blog/thiet-ke-website-xay-dung-nha-thau">Money page</a> · <a href="${SITE}/banggia">Bảng giá</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed template website xây dựng 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-xay-dung-2026");
