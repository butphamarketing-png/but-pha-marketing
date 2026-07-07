/**
 * Checklist silo — website spa 2026
 * Chạy: node scripts/seed-checklist-website-spa-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "checklist website spa";

const article = {
  title: "Checklist Website Spa 2026 — 20 Mục Booking & SEO Local",
  slug: "checklist-website-spa-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website spa cần gì, thiết kế website spa, checklist seo spa, đặt lịch spa online",
  metaTitle: "Checklist Website Spa 2026 | 20 Mục Booking SEO",
  metaDescription:
    "Checklist website spa 2026: 20 mục booking, bảng giá liệu trình, gallery, SEO local. Case study Phước Lai Luxury & Halee Trâm.",
  description:
    "Checklist 20 mục khi thiết kế website spa, phun xăm, nail: booking, gallery và SEO địa phương.",
  imageUrl: "/case-studies/phuoc-lai-luxury/website-homepage.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Checklist Website Spa 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt nhanh" },
  { id: "checklist", label: "20 mục checklist" },
  { id: "case-study", label: "Case study tham chiếu" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt nhanh:</strong> <strong>${KEYWORD}</strong> gồm 20 mục: booking 1-click, bảng giá liệu trình, gallery không gian, SEO “spa + quận” và Zalo chat. Tham chiếu <a href="${SITE}/du-an/phuoc-lai-luxury">Phước Lai Luxury</a> và <a href="${SITE}/du-an/halee-tram">Halee Trâm</a>.</p>
</div>

<h2 id="tom-tat">Checklist website spa là gì?</h2>
<p>Danh sách kiểm tra khi <strong>thiết kế website spa</strong>, phun xăm hoặc nail salon — ưu tiên đặt lịch online, mobile-first và SEO local “spa gần tôi”.</p>

<h2 id="checklist">20 mục checklist website spa 2026</h2>
<ol class="space-y-2 my-6 list-decimal pl-6">
  <li><strong>Booking online:</strong> Chọn dịch vụ + giờ — form ngắn hoặc widget.</li>
  <li><strong>CTA “Đặt lịch” sticky mobile:</strong> Luôn hiển thị khi scroll.</li>
  <li><strong>Bảng giá liệu trình:</strong> Combo, gói — khách spa hỏi giá trước.</li>
  <li><strong>Gallery không gian:</strong> Ảnh phòng, ghế, vibe — tạo cảm giác premium.</li>
  <li><strong>Trang từng dịch vụ:</strong> Massage, facial, nail, phun xăm — silo SEO.</li>
  <li><strong>Trang Academy (nếu có):</strong> Khóa học nail/lash tách lead học viên.</li>
  <li><strong>Showcase Master / thợ:</strong> Portfolio artisan — như <a href="${SITE}/du-an/phuoc-lai-luxury">Phước Lai</a>.</li>
  <li><strong>Zalo / Messenger:</strong> Chat trước khi book.</li>
  <li><strong>Review khách hàng:</strong> Social proof — Google review embed.</li>
  <li><strong>Google Maps:</strong> Địa chỉ, chỉ đường, giờ mở cửa.</li>
  <li><strong>SEO local:</strong> Title “spa [quận]”, “phun xăm [tỉnh]”.</li>
  <li><strong>FAQ schema:</strong> Giờ mở cửa, có đặt lịch walk-in không…</li>
  <li><strong>UI luxury hoặc wellness:</strong> Phù hợp phân khúc — không template generic.</li>
  <li><strong>Tốc độ ảnh gallery:</strong> WebP, lazy load.</li>
  <li><strong>Fanpage liên kết:</strong> Reels before/after, inbox.</li>
  <li><strong>Chương trình khuyến mãi:</strong> Banner hoặc popup có kiểm soát.</li>
  <li><strong>Đa chi nhánh (nếu có):</strong> Chọn cơ sở gần nhất.</li>
  <li><strong>Silo nội bộ:</strong> <a href="${SITE}/blog/nganh/spa">Hub spa</a> ↔ money page ↔ case study.</li>
  <li><strong>Phân biệt spa vs thẩm mỹ viện:</strong> Không claim y khoa nếu chỉ wellness.</li>
  <li><strong>GSC:</strong> Theo dõi long-tail booking intent.</li>
</ol>

${img(0, "Checklist thiết kế website spa chuyên nghiệp chuẩn SEO", "tham-my")}

<h2 id="case-study">Case study tham chiếu</h2>
<ul>
  <li><a href="${SITE}/du-an/phuoc-lai-luxury">Phước Lai Luxury</a> — phun xăm, spa, academy Vũng Tàu.</li>
  <li><a href="${SITE}/du-an/halee-tram">Halee Trâm</a> — nail, nối mi, academy.</li>
</ul>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Website spa cần bao nhiêu trang?</h3>
<p>7–8 tối thiểu: Trang chủ, Dịch vụ, Bảng giá, Gallery, Đặt lịch, Liên hệ, (Academy).</p>
<h3>Giá website spa?</h3>
<p>3–12 triệu. <a href="${SITE}/blog/thiet-ke-website-spa">Chi tiết</a> · <a href="${SITE}/banggia">Bảng giá</a>.</p>

<p><strong>Liên kết silo:</strong> <a href="${SITE}/blog/nganh/spa">Hub spa</a> · <a href="${SITE}/blog/thiet-ke-website-spa">Money page</a></p>
${internalLinks()}
`,
  }),
};

console.log("=== Seed checklist website spa 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/checklist-website-spa-2026");
