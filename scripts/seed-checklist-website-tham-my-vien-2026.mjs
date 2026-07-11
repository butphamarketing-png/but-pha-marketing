/**
 * Checklist silo — website thẩm mỹ viện 2026
 * Chạy: node scripts/seed-checklist-website-tham-my-vien-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "checklist website thẩm mỹ viện";

const article = {
  title: "Checklist Website Thẩm Mỹ Viện 2026 — 20 Mục Chuẩn Y Khoa & SEO",
  slug: "checklist-website-tham-my-vien-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website thẩm mỹ viện cần gì, thiết kế website thẩm mỹ, checklist seo thẩm mỹ viện",
  metaTitle: "Checklist Website Thẩm Mỹ Viện 2026 | 20 Mục Chuẩn",
  metaDescription:
    "Checklist website thẩm mỹ viện 2026: 20 mục — bác sĩ, filler/botox, đặt lịch, before/after consent. Case study Thiên Hoàng Kim.",
  description:
    "Checklist 20 mục khi thiết kế website thẩm mỹ viện: uy tín y khoa, đặt lịch, SEO local và tuân thủ quảng cáo.",
  imageUrl: "/case-studies/thien-hoang-kim/website-homepage.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Checklist Website Thẩm Mỹ Viện 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt nhanh" },
  { id: "checklist", label: "20 mục checklist" },
  { id: "case-study", label: "Case study tham chiếu" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt nhanh:</strong> <strong>${KEYWORD}</strong> gồm 20 mục: hồ sơ bác sĩ, trang filler/botox riêng, before/after có consent, CTA đặt lịch, FAQ schema và SEO local. Tham chiếu <a href="${SITE}/du-an/tham-my-thien-hoang-kim">Thiên Hoàng Kim Aesthetic Clinic</a>.</p>
</div>

<h2 id="tom-tat">Checklist website thẩm mỹ viện là gì?</h2>
<p>Danh sách kiểm tra khi <strong>thiết kế website thẩm mỹ viện</strong> — khác spa wellness: nhấn uy tín y khoa, bác sĩ chuyên khoa và tuân thủ quy định quảng cáo dịch vụ y tế tại Việt Nam.</p>

<h2 id="checklist">20 mục checklist website thẩm mỹ viện 2026</h2>
<ol class="space-y-2 my-6 list-decimal pl-6">
  <li><strong>Positioning rõ:</strong> Aesthetic clinic / phòng khám chuyên khoa — không lẫn spa massage.</li>
  <li><strong>Hồ sơ bác sĩ:</strong> Ảnh, chứng chỉ, chuyên khoa trên hero hoặc trang Giới thiệu.</li>
  <li><strong>Trang filler / botox riêng:</strong> Silo SEO long-tail từng dịch vụ.</li>
  <li><strong>Trang phẫu thuật thẩm mỹ:</strong> Tách khỏi tiêm meso/filler nếu có.</li>
  <li><strong>Bảng giá tham khảo:</strong> “Từ … triệu” — minh bạch, lọc khách.</li>
  <li><strong>CTA Đặt lịch ngay:</strong> Nổi bật header + floating mobile.</li>
  <li><strong>Zalo / hotline:</strong> Khách VN chat trước khi đến clinic.</li>
  <li><strong>Before/after có consent:</strong> Không vi phạm quảng cáo y tế.</li>
  <li><strong>FAQ schema:</strong> Đau không, bao lâu hồi phục, ai không nên làm…</li>
  <li><strong>Google Maps + giờ làm việc:</strong> Local pack cho “thẩm mỹ viện + quận”.</li>
  <li><strong>Menu Dịch vụ dropdown:</strong> Cấu trúc silo rõ — như <a href="${SITE}/du-an/tham-my-thien-hoang-kim">Thiên Hoàng Kim</a>.</li>
  <li><strong>Trang Bảng giá &amp; Tin tức:</strong> Commercial + informational SEO.</li>
  <li><strong>Fanpage đồng bộ:</strong> Cover, bio, messaging khớp website.</li>
  <li><strong>4 giá trị cốt lõi:</strong> Bác sĩ · Đẹp tự nhiên · An toàn · Chuẩn Y Khoa.</li>
  <li><strong>Tốc độ mobile:</strong> 80%+ khách tìm clinic trên điện thoại.</li>
  <li><strong>Title/meta local:</strong> “Thẩm mỹ viện [quận/tỉnh]”.</li>
  <li><strong>Schema Organization + FAQ:</strong> JSON-LD chuẩn.</li>
  <li><strong>Silo nội bộ:</strong> <a href="${SITE}/blog/nganh/tham-my">Hub thẩm mỹ</a> ↔ money page ↔ case study.</li>
  <li><strong>Không copy spa:</strong> Ngôn ngữ y khoa, không “thư giãn / massage”.</li>
  <li><strong>GSC theo dõi:</strong> Tối ưu meta theo query có impression.</li>
</ol>

${img(0, "Checklist thiết kế website thẩm mỹ viện chuẩn SEO", "tham-my")}

<h2 id="case-study">Case study — Thiên Hoàng Kim</h2>
<p>Website <a href="https://www.thammythienhoangkim.com/" rel="noopener noreferrer" target="_blank">thammythienhoangkim.com</a> — Hùng Vương TP.HCM, CTA đặt lịch 0938 673 996. <a href="${SITE}/du-an/tham-my-thien-hoang-kim">Xem case study</a>.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Website thẩm mỹ viện khác website spa?</h3>
<p>Thẩm mỹ viện nhấn bác sĩ, dịch vụ xâm lấn y khoa; spa tập trung wellness, massage.</p>
<h3>Giá thiết kế website thẩm mỹ viện?</h3>
<p>3–12 triệu tùy booking và số dịch vụ. <a href="${SITE}/blog/thiet-ke-website-tham-my-vien">Chi tiết</a> · <a href="${SITE}/banggia">Bảng giá</a>.</p>

<p><strong>Liên kết silo:</strong> <a href="${SITE}/blog/nganh/tham-my">Hub thẩm mỹ</a> · <a href="${SITE}/blog/thiet-ke-website-tham-my-vien">Money page</a> · <a href="${SITE}/du-an/tham-my-thien-hoang-kim">Case study</a></p>
${internalLinks({ cluster: "tham-my", caseStudyPath: "/du-an/tham-my-thien-hoang-kim" })}
`,
  }),
};

console.log("=== Seed checklist thẩm mỹ viện 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/checklist-website-tham-my-vien-2026");
