/**
 * Template silo — cấu trúc website phòng khám 2026
 * Chạy: node scripts/seed-template-website-phong-kham-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website phòng khám";

const article = {
  title: "Template Website Phòng Khám 2026 — Cấu Trúc 9 Trang Đa Khoa",
  slug: "template-website-phong-kham-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website phòng khám, cấu trúc website y tế, sitemap phòng khám đa khoa, layout đặt khám",
  metaTitle: "Template Website Phòng Khám 2026 | 9 Trang",
  metaDescription:
    "Template website phòng khám đa khoa 2026: 9 trang — chuyên khoa, bác sĩ, đặt lịch, SEO local. Case study Nha Khoa Đăng Khoa.",
  description:
    "Mẫu cấu trúc website phòng khám đa khoa 9 trang — menu y tế và đặt lịch online.",
  imageUrl: "/tin-tuc/phong-kham/phong-kham-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Phòng Khám 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "menu", label: "Menu & sitemap" },
  { id: "trang-chu", label: "Trang chủ" },
  { id: "chuyen-khoa", label: "Chuyên khoa" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> — 9 trang phòng khám đa khoa: silo chuyên khoa, profile bác sĩ, đặt lịch online, schema MedicalClinic. Tham chiếu <a href="${SITE}/du-an/nha-khoa-dang-khoa">Đăng Khoa</a> (471 click GSC).</p>
</div>

<h2 id="menu">Menu &amp; sitemap 9 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu</strong> — /gioi-thieu</li>
  <li><strong>Chuyên khoa</strong> — /chuyen-khoa (hub) + /noi-khoa, /nhi-khoa…</li>
  <li><strong>Đội ngũ bác sĩ</strong> — /bac-si</li>
  <li><strong>Bảng giá / Gói khám</strong> — /bang-gia</li>
  <li><strong>Đặt lịch</strong> — /dat-lich</li>
  <li><strong>Tin sức khỏe</strong> — /blog</li>
  <li><strong>Cơ sở vật chất</strong> — /co-so (optional)</li>
  <li><strong>Liên hệ</strong> — /lien-he</li>
</ul>

<h2 id="trang-chu">Block section — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero:</strong> H1 “Phòng khám [Tên] — Đa khoa [Quận/TP]”, CTA đặt lịch + hotline.</li>
  <li><strong>Chuyên khoa icon grid:</strong> 6–8 khoa phổ biến.</li>
  <li><strong>Bác sĩ nổi bật:</strong> 2–3 profile ngắn.</li>
  <li><strong>Quy trình khám 4 bước:</strong> Đặt lịch → khám → xét nghiệm → tái khám.</li>
  <li><strong>Bảng giá tóm tắt:</strong> Gói khám tổng quát “Từ …đ”.</li>
  <li><strong>Maps + giờ làm việc.</strong></li>
  <li><strong>FAQ schema</strong> 3–5 câu.</li>
</ol>

<h2 id="chuyen-khoa">Block — Trang chuyên khoa</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>H1 long-tail:</strong> “Khám Nội tổng quát tại [Quận]”.</li>
  <li><strong>Mô tả dịch vụ + bác sĩ phụ trách.</strong></li>
  <li><strong>Triệu chứng thường gặp</strong> — SEO informational.</li>
  <li><strong>Giá khám tham khảo.</strong></li>
  <li><strong>CTA đặt lịch</strong> theo chuyên khoa.</li>
</ol>

${img(0, "Template cấu trúc website phòng khám đa khoa", "phong-kham")}

<h2 id="silo">Liên kết silo</h2>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li><a href="${SITE}/blog/thiet-ke-website-phong-kham-da-khoa">Money page</a></li>
  <li><a href="${SITE}/blog/checklist-website-phong-kham-2026">Checklist</a></li>
  <li><a href="${SITE}/blog/nganh/phong-kham">Hub</a></li>
  <li><a href="${SITE}/du-an/nha-khoa-dang-khoa">Case study Đăng Khoa</a></li>
</ul>

<h2 id="faq">FAQ</h2>
<h3>Phòng khám đa khoa khác nha khoa?</h3>
<p>Đa khoa có nhiều chuyên khoa; nha khoa chuyên sâu răng — cùng cần đặt lịch và SEO local. Xem <a href="${SITE}/blog/template-website-nha-khoa-2026">template nha khoa</a> nếu chuyên khoa răng.</p>

<p><strong>Liên kết:</strong> <a href="${SITE}/blog/nganh/phong-kham">Hub</a> · <a href="${SITE}/website">Tư vấn</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed template website phòng khám 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-phong-kham-2026");
