/**
 * Template silo — cấu trúc website PCCC 2026
 * Chạy: node scripts/seed-template-website-pccc-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website công ty pccc";

const article = {
  title: "Template Website Công Ty PCCC 2026 — Cấu Trúc 9 Trang B2B",
  slug: "template-website-pccc-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website pccc, cấu trúc website thi công pccc, sitemap công ty phòng cháy, layout năng lực pccc",
  metaTitle: "Template Website PCCC 2026 | 9 Trang B2B",
  metaDescription:
    "Template website công ty PCCC 2026: 9 trang — dự án, năng lực, catalog thiết bị, form khảo sát. Bứt Phá Marketing.",
  description:
    "Mẫu cấu trúc website công ty PCCC 9 trang — thi công, nghiệm thu và SEO B2B.",
  imageUrl: "/tin-tuc/pccc/pccc-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Công Ty PCCC 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "menu", label: "Menu & sitemap" },
  { id: "trang-chu", label: "Trang chủ" },
  { id: "du-an", label: "Dự án & năng lực" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> — 9 trang B2B: gallery dự án nhà máy/chung cư, giấy phép năng lực, form khảo sát hiện trường. Xem <a href="${SITE}/blog/checklist-website-pccc-2026">checklist 20 mục</a>.</p>
</div>

<div class="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 my-6">
<p><strong>Proof benchmark cho template:</strong> Khi triển khai đúng cấu trúc silo + proof section, các dự án dịch vụ địa phương có thể tạo tăng trưởng organic bền vững. Tham khảo case <a href="${SITE}/du-an/nha-khoa-dang-khoa">Nha Khoa Đăng Khoa</a> với <strong>15,4K impressions</strong> và <strong>471 clicks</strong> từ GSC để đặt KPI cho website PCCC.</p>
</div>

<h2 id="menu">Menu &amp; sitemap 9 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu</strong> — /gioi-thieu</li>
  <li><strong>Dịch vụ</strong> — /dich-vu (tư vấn, thi công, bảo trì, nghiệm thu)</li>
  <li><strong>Dự án</strong> — /du-an</li>
  <li><strong>Năng lực / Giấy phép</strong> — /nang-luc (PDF hạng I/II/III)</li>
  <li><strong>Thiết bị</strong> — /thiet-bi (link <a href="${SITE}/blog/thiet-ke-website-thiet-bi-pccc">catalog thiết bị</a>)</li>
  <li><strong>Khảo sát / Báo giá</strong> — /khao-sat (form B2B)</li>
  <li><strong>Tin kỹ thuật</strong> — /blog</li>
  <li><strong>Liên hệ</strong> — /lien-he</li>
</ul>

<h2 id="trang-chu">Block section — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero:</strong> H1 “Công ty PCCC [Tên] — Thi công &amp; Nghiệm thu [Tỉnh]”, hotline khẩn cấp.</li>
  <li><strong>Số liệu:</strong> Số dự án, m² thi công, năm KN.</li>
  <li><strong>Dịch vụ card:</strong> Link silo từng dịch vụ.</li>
  <li><strong>Gallery dự án:</strong> 6 ảnh công trình tiêu biểu.</li>
  <li><strong>Quy trình nghiệm thu QCVN:</strong> Infographic 5–7 bước.</li>
  <li><strong>Form khảo sát ngắn:</strong> Loại công trình + diện tích + SĐT.</li>
  <li><strong>Chứng nhận &amp; đối tác hãng PCCC.</strong></li>
</ol>

<h2 id="du-an">Block — Trang dự án &amp; năng lực</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Filter:</strong> Nhà máy, chung cư, TTMM, kho bãi.</li>
  <li><strong>Chi tiết dự án:</strong> Quy mô, hạng mục PCCC, ảnh thi công.</li>
  <li><strong>Trang năng lực:</strong> Scan giấy phép — nút tải PDF.</li>
  <li><strong>CTA:</strong> “Dự án tương tự? Khảo sát miễn phí”.</li>
</ol>

${img(0, "Template cấu trúc website công ty PCCC thi công B2B", "pccc")}

<h2 id="silo">Liên kết silo</h2>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li><a href="${SITE}/blog/thiet-ke-website-pccc">Money page</a></li>
  <li><a href="${SITE}/blog/checklist-website-pccc-2026">Checklist</a></li>
  <li><a href="${SITE}/blog/nganh/pccc">Hub</a></li>
  <li><a href="${SITE}/du-an/nha-khoa-dang-khoa">Case study có số liệu GSC</a></li>
</ul>

<h2 id="faq">FAQ</h2>
<h3>PCCC thi công khác shop thiết bị?</h3>
<p>Template này cho công ty thi công — nhấn dự án &amp; năng lực; shop thiết bị nhấn catalog &amp; giá.</p>

<p><strong>Liên kết:</strong> <a href="${SITE}/blog/nganh/pccc">Hub</a> · <a href="${SITE}/website">Tư vấn</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed template website PCCC 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-pccc-2026");
