/**
 * Template silo — cấu trúc website nha khoa 2026
 * Chạy: node scripts/seed-template-website-nha-khoa-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website nha khoa";

const article = {
  title: "Template Website Nha Khoa 2026 — Cấu Trúc 8 Trang Chuẩn SEO",
  slug: "template-website-nha-khoa-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website nha khoa, cấu trúc website nha khoa, sitemap nha khoa, layout website implant",
  metaTitle: "Template Website Nha Khoa 2026 | Cấu Trúc 8 Trang",
  metaDescription:
    "Template website nha khoa 2026: cấu trúc 8 trang — Implant, niềng răng, đặt lịch, SEO local. Tham chiếu case study Đăng Khoa 471 click GSC.",
  description:
    "Mẫu cấu trúc website nha khoa 8 trang chuẩn SEO — menu, section từng trang và silo nội bộ.",
  imageUrl: "/case-studies/nha-khoa-dang-khoa/website-homepage.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Nha Khoa 2026",
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
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> là bộ khung 8 trang cho phòng khám nha khoa — tách silo Implant/niềng răng, CTA đặt lịch trên mọi trang, schema LocalBusiness. Kết hợp <a href="${SITE}/blog/checklist-website-nha-khoa-2026">checklist 20 mục</a> và <a href="${SITE}/du-an/nha-khoa-dang-khoa">case study Đăng Khoa</a>.</p>
</div>

<h2 id="tom-tat">Template website nha khoa là gì?</h2>
<p><strong>Template website nha khoa</strong> không phải theme tải về — là sơ đồ cấu trúc trang, menu và section block để dev/design triển khai đúng SEO commercial + local. Khác checklist (kiểm tra sau khi làm), template dùng <em>trước</em> khi thiết kế.</p>

<h2 id="menu">Menu &amp; sitemap 8 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu</strong> — /gioi-thieu (bác sĩ, giấy phép)</li>
  <li><strong>Implant</strong> — /implant (silo SEO chính)</li>
  <li><strong>Niềng răng</strong> — /nieng-rang</li>
  <li><strong>Bảng giá</strong> — /bang-gia</li>
  <li><strong>Kiến thức</strong> — /blog hoặc /kien-thuc</li>
  <li><strong>Đặt lịch</strong> — /dat-lich (form ngắn)</li>
  <li><strong>Liên hệ</strong> — /lien-he (Maps, giờ làm việc)</li>
</ul>
<p>Menu sticky: <strong>Hotline</strong> + nút <strong>Đặt lịch</strong> màu nổi (cam/xanh y tế).</p>

<h2 id="trang-chu">Block section — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero:</strong> H1 “Nha khoa [Tên] — Implant &amp; Niềng răng [Tỉnh]”, ảnh phòng khám, CTA đặt lịch.</li>
  <li><strong>USP 3 cột:</strong> Bảo hành implant, trả góp, xe đưa đón (nếu có).</li>
  <li><strong>Dịch vụ nổi bật:</strong> Card Implant, Niềng răng, Tẩy trắng → link silo.</li>
  <li><strong>Hồ sơ bác sĩ:</strong> Ảnh + chứng chỉ — trust y khoa.</li>
  <li><strong>Before/after:</strong> Gallery có consent bệnh nhân.</li>
  <li><strong>Review / Google:</strong> Embed rating hoặc testimonial.</li>
  <li><strong>FAQ ngắn:</strong> 3–5 câu + link trang FAQ đầy đủ.</li>
  <li><strong>Footer:</strong> Địa chỉ, Maps, fanpage, link silo <a href="${SITE}/blog/nganh/nha-khoa">hub nha khoa</a>.</li>
</ol>

<h2 id="dich-vu">Block section — Trang dịch vụ (Implant / Niềng răng)</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>H1 long-tail:</strong> “Cấy ghép Implant tại [Tỉnh]” hoặc “Niềng răng trong suốt [Quận]”.</li>
  <li><strong>Giới thiệu dịch vụ:</strong> 300–500 từ, keyword tự nhiên.</li>
  <li><strong>Quy trình 4–6 bước:</strong> Infographic khám → chụp CT → cấy → tái khám.</li>
  <li><strong>Bảng giá tham khảo:</strong> “Từ … triệu” — lọc lead.</li>
  <li><strong>FAQ schema:</strong> ≥5 câu riêng cho từng dịch vụ.</li>
  <li><strong>CTA sticky:</strong> Zalo + đặt lịch cuối trang.</li>
  <li><strong>Internal link:</strong> ↔ Trang chủ ↔ Bài blog liên quan ↔ <a href="${SITE}/blog/thiet-ke-website-nha-khoa">money page</a>.</li>
</ol>

${img(0, "Template cấu trúc website nha khoa chuẩn SEO", "nha-khoa")}

<h2 id="silo">Liên kết silo Vertical Proof</h2>
<p>Template này nằm trong silo 7 URL ngành nha khoa:</p>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li>Money page: <a href="${SITE}/blog/thiet-ke-website-nha-khoa">thiết kế website nha khoa</a></li>
  <li>Checklist: <a href="${SITE}/blog/checklist-website-nha-khoa-2026">checklist 20 mục</a></li>
  <li>Template: <strong>bài này</strong></li>
  <li>Hub: <a href="${SITE}/blog/nganh/nha-khoa">/blog/nganh/nha-khoa</a></li>
  <li>Case study: <a href="${SITE}/du-an/nha-khoa-dang-khoa">Nha Khoa Đăng Khoa</a> — 471 click GSC</li>
</ul>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Template khác checklist thế nào?</h3>
<p>Template = cấu trúc trang trước khi làm; checklist = 20 mục kiểm tra sau khi làm.</p>
<h3>Có thể thêm trang Nha khoa trẻ em?</h3>
<p>Có — thêm silo /nha-khoa-tre-em nếu phòng khám có chuyên khoa nhi.</p>
<h3>Bứt Phá có triển khai theo template?</h3>
<p>Có — <a href="${SITE}/website">đăng ký tư vấn</a> hoặc xem <a href="${SITE}/banggia">bảng giá</a>.</p>

<p><strong>Liên kết:</strong> <a href="${SITE}/blog/nganh/nha-khoa">Hub</a> · <a href="${SITE}/blog/checklist-website-nha-khoa-2026">Checklist</a> · <a href="${SITE}/du-an/nha-khoa-dang-khoa">Case study</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed template website nha khoa 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-nha-khoa-2026");
