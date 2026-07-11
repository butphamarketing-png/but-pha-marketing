/**
 * Checklist silo — website nha khoa 2026
 * Chạy: node scripts/seed-checklist-website-nha-khoa-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "checklist website nha khoa";

const article = {
  title: "Checklist Website Nha Khoa 2026 — 20 Mục Chuẩn SEO & Đặt Lịch",
  slug: "checklist-website-nha-khoa-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website nha khoa cần gì, thiết kế website nha khoa, checklist seo nha khoa, website implant",
  metaTitle: "Checklist Website Nha Khoa 2026 | 20 Mục Chuẩn SEO",
  metaDescription:
    "Checklist website nha khoa 2026: 20 mục bắt buộc — hồ sơ bác sĩ, implant, đặt lịch, SEO local. Case study Đăng Khoa 471 click GSC.",
  description:
    "Checklist 20 mục khi thiết kế website nha khoa: uy tín y khoa, đặt lịch, SEO local và chuyển đổi bệnh nhân.",
  imageUrl: "/case-studies/nha-khoa-dang-khoa/website-homepage.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Checklist Website Nha Khoa 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt nhanh" },
  { id: "checklist", label: "20 mục checklist" },
  { id: "case-study", label: "Case study tham chiếu" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt nhanh:</strong> <strong>${KEYWORD}</strong> gồm 20 mục bắt buộc: hồ sơ bác sĩ, trang Implant/niềng răng riêng, đặt lịch Zalo, FAQ schema, SEO local và tốc độ mobile. Tham chiếu <a href="${SITE}/du-an/nha-khoa-dang-khoa">case study Nha Khoa Đăng Khoa</a> — 471 click GSC sau 3 tháng.</p>
</div>

<h2 id="tom-tat">Checklist website nha khoa là gì?</h2>
<p>Danh sách kiểm tra trước/sau khi triển khai <strong>thiết kế website nha khoa</strong> — đảm bảo uy tín y khoa, chuyển đổi đặt lịch và SEO Google local. Khác website spa, nha khoa phải tuân thủ quảng cáo dịch vụ y tế và nhấn bác sĩ chuyên khoa.</p>

<h2 id="checklist">20 mục checklist website nha khoa 2026</h2>
<ol class="space-y-2 my-6 list-decimal pl-6">
  <li><strong>Hồ sơ bác sĩ:</strong> Ảnh, chứng chỉ, chuyên khoa (Răng Hàm Mặt, Implant…) trên hero hoặc trang Giới thiệu.</li>
  <li><strong>Trang Implant riêng:</strong> Silo SEO — “cấy ghép implant + tỉnh/thành”.</li>
  <li><strong>Trang niềng răng / chỉnh nha:</strong> Long-tail tách khỏi trang tổng quan.</li>
  <li><strong>Bảng giá tham khảo:</strong> “Từ … triệu” — lọc khách, giảm inbox hỏi giá.</li>
  <li><strong>CTA đặt lịch nổi bật:</strong> Hotline + nút “Đặt lịch” trên mọi trang dịch vụ.</li>
  <li><strong>Zalo / Messenger:</strong> 70%+ bệnh nhân VN chat trước khi đến.</li>
  <li><strong>FAQ schema:</strong> ≥5 câu (đau không, bảo hành implant, thời gian điều trị…).</li>
  <li><strong>Google Maps nhúng:</strong> Địa chỉ, giờ làm việc, chỉ đường.</li>
  <li><strong>LocalBusiness schema:</strong> JSON-LD tên phòng khám, SĐT, địa chỉ.</li>
  <li><strong>Before/after có consent:</strong> Không vi phạm quy định quảng cáo y tế.</li>
  <li><strong>Trang khách hàng / review:</strong> Social proof — video testimonial nếu có.</li>
  <li><strong>Blog kiến thức:</strong> “Implant có đau không”, “niềng răng bao lâu” — SEO informational.</li>
  <li><strong>Tốc độ mobile:</strong> PageSpeed xanh — bệnh nhân tìm “nha khoa gần tôi” trên điện thoại.</li>
  <li><strong>Title/meta theo tỉnh:</strong> “Nha khoa [Tây Ninh]”, “Implant [tỉnh]”.</li>
  <li><strong>USP nổi bật:</strong> Xe đưa đón, trả góp, bảo hành — như <a href="${SITE}/du-an/nha-khoa-dang-khoa">Đăng Khoa</a>.</li>
  <li><strong>Liên kết fanpage:</strong> Đồng bộ thương hiệu web ↔ Facebook.</li>
  <li><strong>Form đặt lịch ngắn:</strong> Tên + SĐT + dịch vụ — không hỏi 10 field.</li>
  <li><strong>Chính sách bảo mật:</strong> Thu thập thông tin bệnh nhân (GDPR-lite).</li>
  <li><strong>Silo nội bộ:</strong> Link money page ↔ <a href="${SITE}/blog/case-study-thiet-ke-website-nha-khoa-dang-khoa">case study</a> ↔ <a href="${SITE}/blog/nganh/nha-khoa">hub ngành</a>.</li>
  <li><strong>Đo lường GSC:</strong> Theo dõi impression/click hàng tuần, tối ưu title theo query.</li>
</ol>

${img(0, "Checklist thiết kế website nha khoa chuẩn SEO", "nha-khoa")}

<h2 id="case-study">Case study tham chiếu — Nha Khoa Đăng Khoa</h2>
<p>Website <a href="https://hethongnhakhoadangkhoa.vn/" rel="noopener noreferrer" target="_blank">hethongnhakhoadangkhoa.vn</a> áp dụng nhiều mục checklist trên. GSC 3 tháng: <strong>15.400 impression</strong>, <strong>471 click</strong>, vị trí TB <strong>5,3</strong>. <a href="${SITE}/du-an/nha-khoa-dang-khoa">Xem case study đầy đủ</a>.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Website nha khoa cần bao nhiêu trang?</h3>
<p>Tối thiểu 7–8: Trang chủ, Giới thiệu, Implant, Niềng răng, Bảng giá, Kiến thức, Liên hệ, Đặt lịch.</p>
<h3>Checklist website nha khoa khác spa thế nào?</h3>
<p>Nha khoa nhấn bác sĩ, giấy phép hành nghề, quy định quảng cáo y tế — spa không cần hồ sơ y khoa sâu.</p>
<h3>Làm website nha khoa giá bao nhiêu?</h3>
<p>Bứt Phá từ 4–14 triệu tùy booking và SEO local. <a href="${SITE}/banggia">Bảng giá</a> · <a href="${SITE}/blog/thiet-ke-website-nha-khoa">Thiết kế website nha khoa</a>.</p>

<p><strong>Liên kết silo:</strong> <a href="${SITE}/blog/nganh/nha-khoa">Hub nha khoa</a> · <a href="${SITE}/blog/thiet-ke-website-nha-khoa">Money page</a> · <a href="${SITE}/du-an/nha-khoa-dang-khoa">Case study</a></p>
${internalLinks({ cluster: "nha-khoa", caseStudyPath: "/du-an/nha-khoa-dang-khoa" })}
`,
  }),
};

console.log("=== Seed checklist website nha khoa 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/checklist-website-nha-khoa-2026");
