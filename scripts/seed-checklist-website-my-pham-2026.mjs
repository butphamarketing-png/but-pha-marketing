/**
 * Checklist silo — website mỹ phẩm 2026
 * Chạy: node scripts/seed-checklist-website-my-pham-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "checklist website mỹ phẩm";

const article = {
  title: "Checklist Website Mỹ Phẩm 2026 — 20 Mục SEO & Bán Online",
  slug: "checklist-website-my-pham-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website mỹ phẩm cần gì, thiết kế website skincare, checklist seo mỹ phẩm, shop mỹ phẩm online",
  metaTitle: "Checklist Website Mỹ Phẩm 2026 | 20 Mục Chuẩn SEO",
  metaDescription:
    "Checklist website mỹ phẩm 2026: 20 mục — INCI, review, COD/MoMo, SEO brand. Case study Halee Trâm nail & lash.",
  description:
    "Checklist 20 mục khi thiết kế website mỹ phẩm, skincare brand và shop làm đẹp online.",
  imageUrl: "/case-studies/halee-tram/hero.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Checklist Website Mỹ Phẩm 2026",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt nhanh" },
  { id: "checklist", label: "20 mục checklist" },
  { id: "case-study", label: "Case study tham chiếu" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt nhanh:</strong> <strong>${KEYWORD}</strong> gồm 20 mục: thành phần INCI, review chuẩn, thanh toán COD/MoMo/VNPay, SEO brand và landing ads. Tham chiếu <a href="${SITE}/du-an/halee-tram">Halee Trâm</a> (nail/lash/academy). <a href="${SITE}/blog/nganh/my-pham">Hub mỹ phẩm</a>.</p>
</div>

<h2 id="tom-tat">Checklist website mỹ phẩm là gì?</h2>
<p>Danh sách kiểm tra khi <strong>thiết kế website mỹ phẩm</strong> — skincare brand D2C, shop đa thương hiệu hoặc salon làm đẹy bán kèm sản phẩm.</p>

<h2 id="checklist">20 mục checklist website mỹ phẩm 2026</h2>
<ol class="space-y-2 my-6 list-decimal pl-6">
  <li><strong>Trang sản phẩm chuẩn:</strong> Ảnh, giá, variant (ml/size), tồn kho.</li>
  <li><strong>Thành phần INCI:</strong> Minh bạch — khách skincare quan tâm.</li>
  <li><strong>Review &amp; rating:</strong> Schema Product + AggregateRating.</li>
  <li><strong>Thanh toán đa kênh:</strong> COD, MoMo, VNPay, chuyển khoản.</li>
  <li><strong>Giỏ hàng &amp; checkout ngắn:</strong> Mobile-first — 80% mua trên điện thoại.</li>
  <li><strong>Chính sách đổi trả:</strong> Rõ ràng — giảm khiếu nại.</li>
  <li><strong>Trang thương hiệu / About:</strong> Story brand, nguồn gốc sản phẩm.</li>
  <li><strong>Blog skincare:</strong> “Cách dùng serum”, “routine da dầu” — SEO informational.</li>
  <li><strong>Landing page ads:</strong> Single SKU cho Facebook/TikTok Ads.</li>
  <li><strong>SEO brand:</strong> Tên thương hiệu + “mua chính hãng”.</li>
  <li><strong>SEO category:</strong> “Kem chống nắng”, “serum vitamin C” — long-tail.</li>
  <li><strong>Pixel Meta + GA4:</strong> Đo add-to-cart, purchase.</li>
  <li><strong>Zalo OA:</strong> Tư vấn da, chốt đơn.</li>
  <li><strong>Gallery salon (nếu có):</strong> Dịch vụ nail/lash — như <a href="${SITE}/du-an/halee-tram">Halee Trâm</a>.</li>
  <li><strong>Academy / khóa học (nếu có):</strong> Tách lead học viên.</li>
  <li><strong>Tốc độ ảnh sản phẩm:</strong> WebP, lazy load.</li>
  <li><strong>Schema Product:</strong> JSON-LD giá, availability.</li>
  <li><strong>Silo nội bộ:</strong> <a href="${SITE}/blog/nganh/my-pham">Hub mỹ phẩm</a> ↔ shop ↔ làm đẹp.</li>
  <li><strong>Phân biệt shop vs brand:</strong> Đa brand cần filter thương hiệu; brand D2C nhấn story.</li>
  <li><strong>GSC:</strong> Tối ưu meta theo query có impression.</li>
</ol>

${img(0, "Checklist thiết kế website mỹ phẩm chuẩn SEO", "my-pham")}

<h2 id="case-study">Case study — Halee Trâm (làm đẹp &amp; academy)</h2>
<p><a href="https://www.haleetram.com/" rel="noopener noreferrer" target="_blank">haleetram.com</a> — Eyelash / Nail / Academy. <a href="${SITE}/du-an/halee-tram">Xem case study</a>.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Website mỹ phẩm cần bao nhiêu trang?</h3>
<p>Shop: Trang chủ, Danh mục, Sản phẩm, Giỏ hàng, Chính sách, Blog. Brand D2C thêm About, Ingredients.</p>
<h3>Giá website mỹ phẩm?</h3>
<p>9–18 triệu tùy TMĐT và số SKU. <a href="${SITE}/blog/thiet-ke-website-my-pham-lam-dep">Chi tiết</a>.</p>

<p><strong>Liên kết silo:</strong> <a href="${SITE}/blog/nganh/my-pham">Hub mỹ phẩm</a> · <a href="${SITE}/blog/thiet-ke-website-my-pham-lam-dep">Money page</a> · <a href="${SITE}/du-an/halee-tram">Case study</a></p>
${internalLinks({ cluster: "my-pham", caseStudyPath: "/du-an/halee-tram" })}
`,
  }),
};

console.log("=== Seed checklist website mỹ phẩm 2026 ===\n");
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/checklist-website-my-pham-2026");
