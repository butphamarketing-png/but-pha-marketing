/**
 * Checklist silo — website cơ khí / gia công CNC 2026
 * Chạy: node scripts/seed-checklist-website-co-khi-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "checklist website cơ khí";

const article = {
  title: "Checklist Website Cơ Khí 2026 — 20 Mục Chuẩn SEO & Catalog B2B",
  slug: "checklist-website-co-khi-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website xưởng cơ khí cần gì, thiết kế website gia công cnc, checklist seo cơ khí, catalog máy móc",
  metaTitle: "Checklist Website Cơ Khí 2026 | 20 Mục Catalog B2B",
  metaDescription:
    "Checklist website cơ khí 2026: 20 mục — catalog máy CNC, năng lực sản xuất, form báo giá gia công, SEO B2B. Bứt Phá Marketing.",
  description:
    "Checklist 20 mục khi thiết kế website xưởng cơ khí & gia công CNC — catalog B2B và SEO commercial.",
  imageUrl: "/tin-tuc/co-khi/co-khi-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Checklist Website Cơ Khí 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt nhanh" },
  { id: "checklist", label: "20 mục checklist" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt nhanh:</strong> <strong>${KEYWORD}</strong> gồm 20 mục: catalog máy CNC, năng lực gia công, gallery sản phẩm, form gửi bản vẽ và SEO “gia công + vật liệu + tỉnh”. Xem <a href="${SITE}/blog/nganh/co-khi">hub silo cơ khí</a>.</p>
</div>

<h2 id="tom-tat">Checklist website cơ khí là gì?</h2>
<p>Danh sách kiểm tra khi <strong>thiết kế website xưởng cơ khí</strong> — website phải chứng minh năng lực máy móc, quy trình gia công và thu lead B2B qua form gửi bản vẽ.</p>

<h2 id="checklist">20 mục checklist website cơ khí 2026</h2>
<ol class="space-y-2 my-6 list-decimal pl-6">
  <li><strong>Trang Giới thiệu xưởng:</strong> Diện tích, năm thành lập, số nhân sự kỹ thuật.</li>
  <li><strong>Catalog máy móc:</strong> CNC milling, lathe, laser, hàn — thông số từng máy.</li>
  <li><strong>Dịch vụ gia công tách silo:</strong> CNC, cơ khí chính xác, khuôn mẫu, gia công theo bản vẽ.</li>
  <li><strong>Vật liệu gia công:</strong> Thép, nhôm, inox, đồng — bảng tương thích.</li>
  <li><strong>Gallery sản phẩm:</strong> Chi tiết đã gia công — ảnh trước/sau.</li>
  <li><strong>Form gửi bản vẽ:</strong> Upload file DWG/PDF/STEP — thu lead B2B.</li>
  <li><strong>Bảng báo giá tham khảo:</strong> Gia công theo giờ/máy hoặc theo kg (nếu công khai).</li>
  <li><strong>Quy trình sản xuất 5–7 bước:</strong> Nhận bản vẽ → DFM → gia công → QC → giao hàng.</li>
  <li><strong>Chứng nhận ISO / khách hàng:</strong> Logo đối tác công nghiệp.</li>
  <li><strong>Hotline kỹ thuật:</strong> CTA tư vấn vật liệu &amp; gia công.</li>
  <li><strong>Zalo / email B2B:</strong> Gửi báo giá, hợp đồng nguyên tắc.</li>
  <li><strong>SEO head:</strong> “Thiết kế website cơ khí”, “website gia công CNC”.</li>
  <li><strong>SEO long-tail:</strong> “Gia công CNC [vật liệu]”, “xưởng cơ khí [tỉnh]”.</li>
  <li><strong>Schema Organization:</strong> JSON-LD tên xưởng, dịch vụ gia công.</li>
  <li><strong>Blog kỹ thuật:</strong> “Gia công nhôm CNC”, “chọn xưởng cơ khí” — informational.</li>
  <li><strong>FAQ schema:</strong> Thời gian gia công, độ chính xác, MOQ…</li>
  <li><strong>Tốc độ &amp; ảnh:</strong> Nén ảnh gallery — nhiều ảnh sản phẩm.</li>
  <li><strong>Silo nội bộ:</strong> <a href="${SITE}/blog/nganh/co-khi">Hub cơ khí</a> ↔ <a href="${SITE}/blog/thiet-ke-website-co-khi">money page</a> ↔ <a href="${SITE}/blog/thiet-ke-website-gia-cong-cnc">gia công CNC</a>.</li>
  <li><strong>Đa ngôn ngữ (xuất khẩu):</strong> Việt/Anh cho khách nước ngoài.</li>
  <li><strong>GSC:</strong> Theo dõi query commercial B2B hàng tuần.</li>
</ol>

${img(0, "Checklist thiết kế website cơ khí gia công CNC chuẩn SEO", "co-khi")}

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Website cơ khí cần catalog máy?</h3>
<p>Khách B2B so sánh năng lực máy trước khi gửi bản vẽ — catalog chi tiết tăng trust.</p>
<h3>Giá website xưởng cơ khí?</h3>
<p>6–14 triệu tùy gallery và form upload bản vẽ. <a href="${SITE}/blog/thiet-ke-website-co-khi">Chi tiết</a> · <a href="${SITE}/banggia">Bảng giá</a>.</p>

<p><strong>Liên kết silo:</strong> <a href="${SITE}/blog/nganh/co-khi">Hub cơ khí</a> · <a href="${SITE}/blog/thiet-ke-website-co-khi">Money page</a> · <a href="${SITE}/blog/thiet-ke-website-gia-cong-cnc">Gia công CNC</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed checklist website cơ khí 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/checklist-website-co-khi-2026");
