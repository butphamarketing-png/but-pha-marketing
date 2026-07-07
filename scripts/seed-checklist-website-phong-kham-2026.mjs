/**
 * Checklist silo — website phòng khám 2026
 * Chạy: node scripts/seed-checklist-website-phong-kham-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "checklist website phòng khám đa khoa";

const article = {
  title: "Checklist Website Phòng Khám Đa Khoa 2026 — 20 Mục Chuẩn SEO & Đặt Lịch",
  slug: "checklist-website-phong-kham-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website phòng khám cần gì, thiết kế website phòng khám, checklist seo y tế, đặt lịch khám online",
  metaTitle: "Checklist Website Phòng Khám 2026 | 20 Mục Chuẩn SEO",
  metaDescription:
    "Checklist website phòng khám đa khoa 2026: 20 mục — hồ sơ bác sĩ, đặt lịch, SEO local. Case study Nha Khoa Đăng Khoa 471 click GSC.",
  description:
    "Checklist 20 mục khi thiết kế website phòng khám — đặt lịch, uy tín y khoa và SEO local.",
  imageUrl: "/tin-tuc/phong-kham/phong-kham-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Checklist Website Phòng Khám Đa Khoa 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt nhanh" },
  { id: "checklist", label: "20 mục checklist" },
  { id: "case-study", label: "Case study tham chiếu" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt nhanh:</strong> <strong>${KEYWORD}</strong> gồm 20 mục: hồ sơ bác sĩ, chuyên khoa, đặt lịch online, SEO local “phòng khám + quận” và silo y tế. Xem <a href="${SITE}/blog/nganh/phong-kham">hub silo phòng khám</a> · <a href="${SITE}/du-an/nha-khoa-dang-khoa">case study Đăng Khoa</a>.</p>
</div>

<h2 id="tom-tat">Checklist website phòng khám là gì?</h2>
<p>Danh sách kiểm tra khi <strong>thiết kế website phòng khám đa khoa</strong> — website phải thể hiện uy tín y khoa, đặt lịch tiện lợi và SEO local để bệnh nhân tìm thấy.</p>

<h2 id="checklist">20 mục checklist website phòng khám 2026</h2>
<ol class="space-y-2 my-6 list-decimal pl-6">
  <li><strong>Trang Giới thiệu phòng khám:</strong> Giấy phép hoạt động, năm thành lập.</li>
  <li><strong>Hồ sơ bác sĩ:</strong> Ảnh, chuyên khoa, kinh nghiệm — từng bác sĩ một trang.</li>
  <li><strong>Chuyên khoa tách silo:</strong> Nội, ngoại, nhi, sản, da liễu…</li>
  <li><strong>Bảng giá / gói khám tham khảo:</strong> Tổng quát, chuyên sâu (nếu công khai).</li>
  <li><strong>Đặt lịch online:</strong> Chọn bác sĩ, khung giờ, xác nhận Zalo/SMS.</li>
  <li><strong>Hotline &amp; Zalo sticky:</strong> CTA cấp cứu / tư vấn nhanh.</li>
  <li><strong>Địa chỉ &amp; Google Maps:</strong> Embed bản đồ — SEO local.</li>
  <li><strong>Giờ làm việc &amp; quy trình khám:</strong> 5 bước từ đặt lịch đến tái khám.</li>
  <li><strong>FAQ schema Y tế:</strong> Chuẩn bị khám, bảo hiểm, tái khám…</li>
  <li><strong>Blog sức khỏe:</strong> “Triệu chứng…”, “phòng khám [quận]” — informational SEO.</li>
  <li><strong>SEO head:</strong> “Thiết kế website phòng khám đa khoa”, “đặt lịch khám online”.</li>
  <li><strong>SEO local:</strong> “Phòng khám [quận/tỉnh]”, “bác sĩ [chuyên khoa] [TP]”.</li>
  <li><strong>Schema MedicalClinic / Physician:</strong> JSON-LD phòng khám, bác sĩ.</li>
  <li><strong>Tốc độ &amp; mobile:</strong> Đặt lịch trên điện thoại phải mượt.</li>
  <li><strong>Chính sách bảo mật:</strong> Privacy cho dữ liệu bệnh nhân.</li>
  <li><strong>Liên kết silo y tế:</strong> <a href="${SITE}/blog/thiet-ke-website-nha-khoa">nha khoa</a>, <a href="${SITE}/blog/nganh/nha-khoa">hub nha khoa</a>.</li>
  <li><strong>Silo nội bộ:</strong> <a href="${SITE}/blog/nganh/phong-kham">Hub phòng khám</a> ↔ <a href="${SITE}/blog/thiet-ke-website-phong-kham-da-khoa">money page</a>.</li>
  <li><strong>Đánh giá Google:</strong> Embed review hoặc link GBP.</li>
  <li><strong>Ảnh cơ sở vật chất:</strong> Phòng khám, thiết bị — tăng trust.</li>
  <li><strong>GSC:</strong> Theo dõi query local hàng tuần.</li>
</ol>

${img(0, "Checklist thiết kế website phòng khám đa khoa chuẩn SEO", "phong-kham")}

<h2 id="case-study">Case study tham chiếu</h2>
<p><a href="${SITE}/du-an/nha-khoa-dang-khoa">Nha Khoa Đăng Khoa</a> — 15,4K impression GSC, 471 click, vị trí 5,3 cho cluster implant &amp; niềng răng Tây Ninh. Mô hình đặt lịch + SEO local áp dụng tương tự cho phòng khám đa khoa.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Website phòng khám khác website nha khoa?</h3>
<p>Phòng khám đa khoa có nhiều chuyên khoa; nha khoa chuyên sâu răng — cùng cần đặt lịch và SEO local.</p>
<h3>Giá website phòng khám?</h3>
<p>6–12 triệu tùy đặt lịch và số bác sĩ. <a href="${SITE}/blog/thiet-ke-website-phong-kham-da-khoa">Chi tiết</a> · <a href="${SITE}/banggia">Bảng giá</a>.</p>

<p><strong>Liên kết silo:</strong> <a href="${SITE}/blog/nganh/phong-kham">Hub phòng khám</a> · <a href="${SITE}/blog/thiet-ke-website-phong-kham-da-khoa">Money page</a> · <a href="${SITE}/du-an/nha-khoa-dang-khoa">Case study</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed checklist website phòng khám 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/checklist-website-phong-kham-2026");
