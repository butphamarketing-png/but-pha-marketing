/**
 * Template silo — cấu trúc website mỹ phẩm 2026 (expanded ≥12k)
 * Chạy: node scripts/seed-template-website-my-pham-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website mỹ phẩm";

const article = {
  title: "Template Website Mỹ Phẩm 2026 — Cấu Trúc 12 Trang Shop & Brand",
  slug: "template-website-my-pham-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website mỹ phẩm, cấu trúc shop skincare, sitemap thương hiệu làm đẹp, layout bán mỹ phẩm online, wireframe website mỹ phẩm",
  metaTitle: "Template Website Mỹ Phẩm 2026 | 12 Trang Shop",
  metaDescription:
    "Template website mỹ phẩm 2026: 12 trang — shop online, brand story, review INCI, academy nail/lash. Wireframe chi tiết từng trang.",
  description:
    "Mẫu cấu trúc website mỹ phẩm & làm đẹp 12 trang — shop D2C, brand storytelling, silo SEO và conversion.",
  imageUrl: "/tin-tuc/my-pham/my-pham-1.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Mỹ Phẩm 2026 | 12 Trang Shop",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "la-gi", label: "Template mỹ phẩm là gì?" },
  { id: "menu", label: "Menu & sitemap 12 trang" },
  { id: "trang-chu", label: "Wireframe trang chủ" },
  { id: "shop", label: "Trang shop & sản phẩm" },
  { id: "thuong-hieu", label: "Brand & thành phần" },
  { id: "dich-vu", label: "Dịch vụ salon / academy" },
  { id: "mua-hang", label: "Giỏ hàng & checkout" },
  { id: "blog-seo", label: "Blog & SEO cluster" },
  { id: "ky-thuat", label: "Technical SEO template" },
  { id: "timeline", label: "Timeline triển khai" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> là bộ khung <strong>12 trang</strong> cho thương hiệu mỹ phẩm/skincare D2C hoặc salon nail &amp; lash academy: shop online, brand story, thành phần INCI, review UGC và silo SEO commercial. Dùng cùng <a href="${SITE}/blog/checklist-website-my-pham-2026">checklist 20 mục</a> và <a href="${SITE}/blog/thiet-ke-website-my-pham-lam-dep">money page mỹ phẩm</a>.</p>
</div>

<h2 id="tom-tat">Ai nên dùng template này?</h2>
<p>Template phù hợp thương hiệu mỹ phẩm D2C (skincare, makeup, clean beauty), shop mỹ phẩm đa brand, salon nail/lash kèm bán sản phẩm và academy đào tạo nghề. Khách vào web thường cần: (1) tin tưởng thành phần và thương hiệu, (2) xem review/UGC, (3) mua nhanh hoặc đặt lịch dịch vụ — template ưu tiên 3 intent đó trước blog hay feed social.</p>
<p>Khác website spa thuần dịch vụ: mỹ phẩm nhấn catalog sản phẩm, INCI, giỏ hàng và cross-sell combo. Nếu chỉ spa không bán hàng, xem <a href="${SITE}/blog/template-website-spa-2026">template spa</a>.</p>

<h2 id="la-gi">Template website mỹ phẩm là gì?</h2>
<p><strong>Template website mỹ phẩm</strong> không phải theme Shopify tải về — là sơ đồ cấu trúc URL, menu, section block và luồng chuyển đổi để designer/dev triển khai website làm đẹp đúng SEO brand và conversion TMĐT. Khác checklist (kiểm tra sau khi làm), template dùng <em>trước</em> khi thiết kế wireframe.</p>
<p>So với shop đa ngành: mỹ phẩm cần trang thành phần INCI chi tiết, review schema, before/after (nếu có dịch vụ), gallery salon/academy và trust signal (chứng nhận, nguồn gốc).</p>

<h2 id="menu">Menu &amp; sitemap 12 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu thương hiệu</strong> — /gioi-thieu (story, mission, chứng nhận)</li>
  <li><strong>Sản phẩm (hub)</strong> — /san-pham</li>
  <li><strong>Skincare</strong> — /san-pham/skincare</li>
  <li><strong>Makeup</strong> — /san-pham/makeup</li>
  <li><strong>Thương hiệu / Ingredients</strong> — /thuong-hieu</li>
  <li><strong>Dịch vụ salon</strong> — /dich-vu (nail, lash, facial — nếu có)</li>
  <li><strong>Academy / Khóa học</strong> — /khoa-hoc</li>
  <li><strong>Review / Blog</strong> — /blog</li>
  <li><strong>Mua hàng / Shop</strong> — /mua-hang (cart + checkout hoặc link Shopee)</li>
  <li><strong>Chính sách</strong> — /chinh-sach (đổi trả, vận chuyển, bảo mật)</li>
  <li><strong>Liên hệ</strong> — /lien-he</li>
</ul>
<p>Menu sticky desktop/mobile: <strong>Hotline / Zalo</strong> + nút <strong>Mua ngay</strong> hoặc <strong>Đặt lịch</strong> + icon giỏ hàng.</p>

<h2 id="trang-chu">Wireframe — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero brand:</strong> H1 “[Tên thương hiệu] — Mỹ phẩm [skincare/clean beauty]”, tagline + ảnh campaign.</li>
  <li><strong>CTA kép:</strong> “Mua ngay” (primary) + “Xem bộ sưu tập” (secondary).</li>
  <li><strong>Best-seller:</strong> 4–6 sản phẩm chủ lực — card ảnh, giá, nút thêm giỏ.</li>
  <li><strong>USP:</strong> Clean beauty, organic, made in VN, cruelty-free…</li>
  <li><strong>Before/after hoặc UGC:</strong> Review khách hàng — carousel 6–8 ảnh.</li>
  <li><strong>Brand story ngắn:</strong> 2–3 câu + link /thuong-hieu.</li>
  <li><strong>Instagram / TikTok feed</strong> hoặc embed Reels.</li>
  <li><strong>Newsletter / Zalo OA</strong> — voucher first order.</li>
  <li><strong>FAQ ngắn 3 câu</strong> về giao hàng, đổi trả.</li>
  <li><strong>Footer:</strong> Chính sách, MST, link hub <a href="${SITE}/blog/nganh/my-pham">mỹ phẩm</a>.</li>
</ol>

<h2 id="shop">Wireframe — Trang shop &amp; chi tiết sản phẩm</h2>
<p>Hub /san-pham/* và trang chi tiết SP dùng layout thống nhất:</p>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Filter category:</strong> Skincare, makeup, nail, lash, combo…</li>
  <li><strong>Card SP:</strong> Ảnh, giá, badge “Bán chạy”, nút thêm giỏ.</li>
  <li><strong>Trang chi tiết:</strong> Gallery 4–6 ảnh, mô tả, thành phần INCI, hướng dẫn dùng.</li>
  <li><strong>Review schema:</strong> Rating, số review — aggregate nếu có nhiều.</li>
  <li><strong>Cross-sell:</strong> “Mua kèm” combo — tăng AOV 15–30%.</li>
  <li><strong>SEO:</strong> “Kem dưỡng [thương hiệu]”, “serum vitamin C [brand]”.</li>
  <li><strong>CTA sticky mobile:</strong> Thêm giỏ + Mua ngay.</li>
  <li><strong>Internal link:</strong> ↔ Hub /san-pham ↔ /thuong-hieu ↔ Blog review.</li>
</ol>

<h2 id="thuong-hieu">Wireframe — Brand story &amp; thành phần</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>H1:</strong> “Câu chuyện thương hiệu [Tên]”.</li>
  <li><strong>Timeline brand:</strong> Ra đời, milestone, chứng nhận.</li>
  <li><strong>Ingredients hub:</strong> Giải thích retinol, niacinamide, HA… — SEO informational.</li>
  <li><strong>Cam kết:</strong> Không paraben, vegan, dermatologist-tested (nếu có proof).</li>
  <li><strong>CTA:</strong> Link best-seller + newsletter.</li>
</ol>

${img(0, "Template website mỹ phẩm — wireframe trang chủ shop skincare D2C", "my-pham")}

<h2 id="dich-vu">Wireframe — Dịch vụ salon &amp; academy</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Dịch vụ nail/lash/facial:</strong> Bảng giá, thời lượng, gallery before/after.</li>
  <li><strong>Form đặt lịch:</strong> Chọn dịch vụ + ngày/giờ + SĐT.</li>
  <li><strong>Academy /khoa-hoc:</strong> Khóa cơ bản–nâng cao, lịch khai giảng, học phí.</li>
  <li><strong>Portfolio học viên:</strong> Ảnh thực tế — trust cho academy.</li>
  <li><strong>CTA:</strong> “Đăng ký khóa” + hotline tư vấn.</li>
</ol>

<h2 id="mua-hang">Wireframe — Giỏ hàng &amp; checkout</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Giỏ hàng:</strong> Sản phẩm, số lượng, mã giảm giá, phí ship ước tính.</li>
  <li><strong>Checkout:</strong> COD, MoMo, VNPay, chuyển khoản — tối thiểu 2 phương thức.</li>
  <li><strong>Chưa có TMĐT full:</strong> Landing + nút “Mua trên Shopee/Lazada” + form pre-order.</li>
  <li><strong>Thank-you page:</strong> Mã đơn + hướng dẫn theo dõi + cross-sell.</li>
  <li><strong>Event tracking:</strong> GA4 “add_to_cart”, “purchase”.</li>
</ol>

${img(1, "Template website mỹ phẩm — trang shop INCI review và form đặt lịch salon", "my-pham")}

<h2 id="blog-seo">Blog &amp; SEO cluster cho template</h2>
<p>Sau khi triển khai 12 trang core, mở rộng content cluster:</p>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Commercial:</strong> “Mỹ phẩm [thương hiệu]”, “Kem dưỡng [loại da]”, “Serum [ingredient]”.</li>
  <li><strong>Informational:</strong> “Cách chọn kem dưỡng cho da dầu”, “Retinol dùng thế nào”.</li>
  <li><strong>Local:</strong> “Salon nail [quận]”, “Khóa học nối mi [TP]”.</li>
  <li><strong>Internal link:</strong> Mỗi bài blog → 1 sản phẩm + shop + hub <a href="${SITE}/blog/nganh/my-pham">/blog/nganh/my-pham</a>.</li>
</ul>

<div class="overflow-x-auto my-6">
<table class="w-full border-collapse text-sm">
  <thead><tr><th class="border border-indigo-100 px-3 py-2 text-left">Trang template</th><th class="border border-indigo-100 px-3 py-2 text-left">Từ khóa gợi ý</th><th class="border border-indigo-100 px-3 py-2 text-left">Intent</th></tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2">Trang chủ</td><td class="border border-indigo-100 px-3 py-2">mỹ phẩm [thương hiệu]</td><td class="border border-indigo-100 px-3 py-2">Brand</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/san-pham/skincare</td><td class="border border-indigo-100 px-3 py-2">kem dưỡng [loại da]</td><td class="border border-indigo-100 px-3 py-2">Commercial</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/mua-hang</td><td class="border border-indigo-100 px-3 py-2">mua mỹ phẩm online</td><td class="border border-indigo-100 px-3 py-2">Transaction</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/khoa-hoc</td><td class="border border-indigo-100 px-3 py-2">khóa học nối mi [TP]</td><td class="border border-indigo-100 px-3 py-2">Lead</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/thuong-hieu</td><td class="border border-indigo-100 px-3 py-2">thương hiệu mỹ phẩm việt nam</td><td class="border border-indigo-100 px-3 py-2">Trust</td></tr>
  </tbody>
</table>
</div>

<h2 id="ky-thuat">Technical SEO khi triển khai template</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Schema Organization + Product:</strong> Tên brand, logo, sản phẩm best-seller.</li>
  <li><strong>Schema FAQPage</strong> trên trang shop và /chinh-sach.</li>
  <li><strong>Review schema</strong> trên trang chi tiết SP — chỉ khi có review thật.</li>
  <li><strong>Core Web Vitals:</strong> Ảnh SP WebP, lazy load gallery — LCP &lt; 2,5s.</li>
  <li><strong>Canonical</strong> cho filter category — tránh duplicate ?sort=.</li>
  <li><strong>Sitemap.xml</strong> gồm 12 trang core + sản phẩm + blog.</li>
  <li><strong>robots.txt</strong> không chặn /san-pham, /mua-hang.</li>
  <li><strong>HTTPS + redirect www</strong> thống nhất.</li>
  <li><strong>Alt ảnh sản phẩm</strong> mô tả + tên SP tự nhiên.</li>
</ol>

<h2 id="timeline">Timeline triển khai theo template</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Tuần 1:</strong> Chốt sitemap 12 trang, thu content (ảnh SP, INCI, brand story).</li>
  <li><strong>Tuần 2:</strong> Wireframe + UI trang chủ, /san-pham, /thuong-hieu.</li>
  <li><strong>Tuần 3:</strong> Dev shop/cart hoặc tích hợp Shopee + form đặt lịch salon.</li>
  <li><strong>Tuần 4:</strong> Silo category + trang academy + SEO on-page.</li>
  <li><strong>Tuần 5:</strong> QA mobile, schema Product, GSC submit, go-live.</li>
  <li><strong>Tháng 2–3:</strong> Blog cluster + ads landing + theo dõi query brand trên GSC.</li>
</ol>

<div class="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 my-6">
<p><strong>Proof tham chiếu:</strong> Mô hình brand + salon/academy tương tự đã áp dụng cho <a href="${SITE}/du-an/halee-tram">Halee Trâm</a> — website <a href="https://www.haleetram.com/" rel="noopener noreferrer" target="_blank">haleetram.com</a> với dịch vụ Eyelash/Nail/Academy, gallery dịch vụ và silo SEO làm đẹp. Template mỹ phẩm kết hợp shop D2C + dịch vụ salon — 2 luồng conversion song song.</p>
</div>

${img(2, "Template website mỹ phẩm — sitemap 12 trang và silo SEO brand", "my-pham")}

<h2 id="silo">Liên kết silo Vertical Proof</h2>
<p>Template nằm trong silo 7 URL ngành mỹ phẩm:</p>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li>Money page: <a href="${SITE}/blog/thiet-ke-website-my-pham-lam-dep">thiết kế website mỹ phẩm làm đẹp</a></li>
  <li>Checklist: <a href="${SITE}/blog/checklist-website-my-pham-2026">checklist 20 mục</a></li>
  <li>Template: <strong>bài này</strong></li>
  <li>Hub: <a href="${SITE}/blog/nganh/my-pham">/blog/nganh/my-pham</a></li>
  <li>Landing: <a href="${SITE}/website/nganh/my-pham">/website/nganh/my-pham</a></li>
  <li>Dịch vụ: <a href="${SITE}/website">thiết kế website Bứt Phá</a></li>
</ul>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Template khác checklist thế nào?</h3>
<p>Template = cấu trúc trang trước khi làm; checklist = 20 mục kiểm tra sau khi làm xong.</p>
<h3>Shop mỹ phẩm cần WooCommerce?</h3>
<p>Tùy quy mô — có thể dùng landing + Shopee/Lazada, hoặc WooCommerce/Shopify full cart. Template hỗ trợ cả hai.</p>
<h3>12 trang có quá nhiều cho brand mới?</h3>
<p>Có thể gộp: /san-pham hub + 2 category; /dich-vu gộp /khoa-hoc nếu chưa có academy. Giữ /san-pham và /mua-hang — 2 trang conversion bắt buộc.</p>
<h3>Chưa có sản phẩm đủ SKU có làm shop?</h3>
<p>Có — pre-launch với 3–5 SP chủ lực + form pre-order. Không để trang shop trống.</p>
<h3>Giá triển khai theo template?</h3>
<p>Website mỹ phẩm 9–18 triệu tùy TMĐT, số SKU và academy. Xem <a href="${SITE}/banggia">bảng giá</a> và <a href="${SITE}/blog/thiet-ke-website-my-pham-lam-dep">hướng dẫn chi tiết</a>.</p>
<h3>Template có hỗ trợ SEO brand?</h3>
<p>Có — trang /thuong-hieu, blog INCI và review schema được thiết kế cho brand + commercial long-tail.</p>
<h3>Bứt Phá có triển khai theo template?</h3>
<p>Có — <a href="${SITE}/lien-he">đăng ký tư vấn</a> kèm số SKU, kênh bán (web/Shopee) và yêu cầu salon/academy.</p>

<p><strong>Liên kết silo:</strong> <a href="${SITE}/blog/nganh/my-pham">Hub mỹ phẩm</a> · <a href="${SITE}/blog/checklist-website-my-pham-2026">Checklist</a> · <a href="${SITE}/blog/thiet-ke-website-my-pham-lam-dep">Money page</a> · <a href="${SITE}/website">Dịch vụ website</a> · <a href="${SITE}/du-an/halee-tram">Case study Halee Trâm</a></p>
${internalLinks({ cluster: "my-pham", caseStudyPath: "/du-an/halee-tram" })}
`,
  }),
};

console.log("=== Seed template website mỹ phẩm 2026 (expanded) ===\n");
console.log(`Content length: ${article.content.length} chars`);
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-my-pham-2026");
