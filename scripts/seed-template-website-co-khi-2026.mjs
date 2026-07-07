/**
 * Template silo — cấu trúc website cơ khí 2026
 * Chạy: node scripts/seed-template-website-co-khi-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website cơ khí";

const article = {
  title: "Template Website Cơ Khí 2026 — Cấu Trúc 8 Trang Gia Công B2B",
  slug: "template-website-co-khi-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website xưởng cơ khí, cấu trúc website gia công cnc, sitemap catalog máy móc, layout báo giá gia công",
  metaTitle: "Template Website Cơ Khí 2026 | 8 Trang B2B",
  metaDescription:
    "Template website cơ khí 2026: 8 trang — catalog máy CNC, gallery sản phẩm, form gửi bản vẽ, SEO B2B. Bứt Phá Marketing.",
  description:
    "Mẫu cấu trúc website xưởng cơ khí & gia công CNC 8 trang — catalog B2B.",
  imageUrl: "/tin-tuc/co-khi/co-khi-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Cơ Khí 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "menu", label: "Menu & sitemap" },
  { id: "trang-chu", label: "Trang chủ" },
  { id: "catalog", label: "Catalog & RFQ" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> — 8 trang xưởng cơ khí: catalog máy CNC, gallery chi tiết gia công, form upload bản vẽ RFQ. <a href="${SITE}/blog/checklist-website-co-khi-2026">Checklist</a>.</p>
</div>

<h2 id="menu">Menu &amp; sitemap 8 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu xưởng</strong> — /gioi-thieu</li>
  <li><strong>Dịch vụ gia công</strong> — /dich-vu (CNC, hàn, khuôn mẫu…)</li>
  <li><strong>Catalog máy móc</strong> — /may-moc</li>
  <li><strong>Sản phẩm / Gallery</strong> — /san-pham</li>
  <li><strong>Vật liệu gia công</strong> — /vat-lieu</li>
  <li><strong>Báo giá / Gửi bản vẽ</strong> — /bao-gia (upload DWG/PDF)</li>
  <li><strong>Liên hệ</strong> — /lien-he</li>
</ul>

<h2 id="trang-chu">Block section — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero:</strong> H1 “Xưởng cơ khí [Tên] — Gia công CNC [Tỉnh]”, CTA gửi bản vẽ.</li>
  <li><strong>Số liệu:</strong> Số máy CNC, diện tích xưởng, nhân sự.</li>
  <li><strong>Catalog máy nổi bật:</strong> 4–6 máy + thông số.</li>
  <li><strong>Gallery sản phẩm</strong> đã gia công.</li>
  <li><strong>Quy trình QC 5 bước.</strong></li>
  <li><strong>Logo khách hàng công nghiệp.</strong></li>
  <li><strong>Hotline kỹ thuật.</strong></li>
</ol>

<h2 id="catalog">Block — Catalog &amp; form RFQ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Bảng máy:</strong> Tên máy, hành trình, độ chính xác.</li>
  <li><strong>Trang chi tiết máy</strong> — SEO “gia công CNC [vật liệu]”.</li>
  <li><strong>Form RFQ:</strong> Upload file + mô tả + SĐT.</li>
  <li><strong>Bảng giá tham khảo</strong> theo giờ máy/kg (nếu có).</li>
</ol>

${img(0, "Template cấu trúc website xưởng cơ khí gia công CNC", "co-khi")}

<h2 id="silo">Liên kết silo</h2>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li><a href="${SITE}/blog/thiet-ke-website-co-khi">Money page</a></li>
  <li><a href="${SITE}/blog/thiet-ke-website-gia-cong-cnc">Gia công CNC</a></li>
  <li><a href="${SITE}/blog/checklist-website-co-khi-2026">Checklist</a></li>
  <li><a href="${SITE}/blog/nganh/co-khi">Hub</a></li>
</ul>

<h2 id="faq">FAQ</h2>
<h3>Xưởng nhỏ cần bao nhiêu trang?</h3>
<p>Tối thiểu 6: chủ, giới thiệu, dịch vụ, gallery, báo giá, liên hệ — mở rộng catalog khi có nhiều máy.</p>

<p><strong>Liên kết:</strong> <a href="${SITE}/blog/nganh/co-khi">Hub</a> · <a href="${SITE}/banggia">Bảng giá</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed template website cơ khí 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-co-khi-2026");
