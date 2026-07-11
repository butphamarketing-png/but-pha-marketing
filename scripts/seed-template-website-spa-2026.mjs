/**
 * Template silo — cấu trúc website spa 2026 (expanded ≥12k)
 * Chạy: node scripts/seed-template-website-spa-2026.mjs
 */
import { seedRewriteArticle } from "./seed-rewrite-utils.mjs";
import { wrapArticle, toc, img, internalLinks } from "./seo-article-helpers.mjs";

const SITE = "https://www.butphamarketing.com";
const KEYWORD = "template website spa";

const article = {
  title: "Template Website Spa 2026 — Cấu Trúc 12 Trang Booking & SEO Local",
  slug: "template-website-spa-2026",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "mẫu website spa, cấu trúc website spa, sitemap spa làm đẹp, layout booking spa, wireframe website spa, thiết kế web spa đẹp",
  metaTitle: "Template Website Spa 2026 | 12 Trang Booking Local",
  metaDescription:
    "Template website spa 2026: 12 trang — menu dịch vụ, combo bảng giá, đặt lịch online, gallery, SEO local. Wireframe chi tiết + case Phước Lai Luxury, Sao Khuê 83K views.",
  description:
    "Mẫu cấu trúc website spa 12 trang — wireframe booking, combo giá, gallery và silo SEO local cho spa làm đẹp.",
  imageUrl: "/tin-tuc/tham-my/tham-my-2.png",
  hot: true,
  content: wrapArticle({
    metaTitle: "Template Website Spa 2026 | 12 Trang Booking Local",
    html: `
${toc([
  { id: "tom-tat", label: "Tóm tắt" },
  { id: "la-gi", label: "Template website spa là gì?" },
  { id: "menu", label: "Menu & sitemap 12 trang" },
  { id: "trang-chu", label: "Wireframe trang chủ" },
  { id: "dich-vu", label: "Trang dịch vụ & chi tiết" },
  { id: "bang-gia", label: "Combo & bảng giá" },
  { id: "gallery", label: "Gallery & không gian" },
  { id: "dat-lich", label: "Đặt lịch & form lead" },
  { id: "uu-dai", label: "Khuyến mãi & membership" },
  { id: "blog-seo", label: "Blog & SEO cluster" },
  { id: "ky-thuat", label: "Technical SEO template" },
  { id: "timeline", label: "Timeline triển khai" },
  { id: "silo", label: "Liên kết silo" },
  { id: "faq", label: "FAQ" },
])}

<div class="rounded-2xl border border-violet-200 bg-violet-50/80 p-5 my-6">
<p><strong>Tóm tắt:</strong> <strong>${KEYWORD}</strong> là bộ khung <strong>12 trang</strong> cho spa làm đẹp: menu dịch vụ silo theo nhóm (massage, facial, body), combo bảng giá, đặt lịch online, gallery không gian và SEO local "spa gần đây". Dùng cùng <a href="${SITE}/blog/checklist-website-spa-2026">checklist website spa 2026</a> và <a href="${SITE}/blog/thiet-ke-website-spa">money page thiết kế website spa</a>. Tham chiếu thực tế: <a href="${SITE}/du-an/phuoc-lai-luxury">Phước Lai Luxury</a>, <a href="${SITE}/du-an/halee-tram">Halee Trâm</a>; benchmark Fanpage <strong>83.374 lượt xem</strong> / 90 ngày từ <a href="${SITE}/du-an/sao-khue">Sao Khuê</a>.</p>
</div>

<h2 id="tom-tat">Ai nên dùng template này?</h2>
<p>Template phù hợp spa thư giãn, spa chăm sóc da, massage trị liệu, nail &amp; mi, spa mẹ và bé hoặc chuỗi spa 2–5 cơ sở. Khách vào website spa thường có 3 intent chính: (1) xem dịch vụ và giá cụ thể, (2) xem không gian có sạch đẹp không, (3) đặt lịch hoặc nhắn Zalo ngay. Template ưu tiên 3 intent đó trước khi làm blog hay chương trình membership.</p>
<p>Nếu bạn đang chạy Fanpage tốt nhưng chưa có web, đây chính là lúc cần: Fanpage giữ tương tác, website giữ thứ hạng Google "spa [quận]" — 2 kênh bổ trợ nhau. Case <a href="${SITE}/du-an/sao-khue">Sao Khuê</a> đạt 83K lượt xem Fanpage trong 90 ngày; đổ lượng traffic đó về trang đặt lịch trên website là bước chuyển đổi tự nhiên nhất.</p>

<h2 id="la-gi">Template website spa là gì?</h2>
<p><strong>Template website spa</strong> không phải theme WordPress tải về — là sơ đồ cấu trúc URL, menu, section block và luồng chuyển đổi để designer/dev triển khai website spa đúng chuẩn SEO local. Khác với checklist (kiểm tra sau khi làm xong), template dùng <em>trước</em> khi thiết kế wireframe.</p>
<p>So với website ngành khác: spa cần nhiều hình ảnh ambiance hơn, bảng giá minh bạch theo combo, và nút đặt lịch/Zalo xuất hiện ở mọi màn hình. Khách spa quyết định nhanh theo cảm xúc — website chậm hoặc thiếu giá là mất khách sang đối thủ cách 500m.</p>

<h2 id="menu">Menu &amp; sitemap 12 trang</h2>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Trang chủ</strong> — /</li>
  <li><strong>Giới thiệu</strong> — /gioi-thieu (câu chuyện thương hiệu, đội ngũ kỹ thuật viên)</li>
  <li><strong>Dịch vụ (hub)</strong> — /dich-vu</li>
  <li><strong>Massage &amp; trị liệu</strong> — /dich-vu/massage</li>
  <li><strong>Chăm sóc da mặt</strong> — /dich-vu/cham-soc-da</li>
  <li><strong>Chăm sóc body</strong> — /dich-vu/cham-soc-body</li>
  <li><strong>Combo / Bảng giá</strong> — /bang-gia</li>
  <li><strong>Gallery không gian</strong> — /hinh-anh</li>
  <li><strong>Đặt lịch</strong> — /dat-lich</li>
  <li><strong>Khuyến mãi / Ưu đãi</strong> — /uu-dai</li>
  <li><strong>Blog / Cẩm nang làm đẹp</strong> — /blog</li>
  <li><strong>Liên hệ</strong> — /lien-he (Maps, giờ mở cửa, hotline)</li>
</ul>
<p>Menu sticky desktop/mobile: <strong>Hotline</strong> + nút <strong>Đặt lịch ngay</strong> + icon <strong>Zalo</strong>. Spa nhỏ có thể gộp /uu-dai vào trang chủ, nhưng giữ nguyên 3 silo dịch vụ — đó là nơi SEO local ăn điểm.</p>

<h2 id="trang-chu">Wireframe — Trang chủ</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Hero:</strong> Ảnh/video không gian luxury, H1 "Spa [Tên] — [Quận/TP]", subline USP (không gian riêng tư, kỹ thuật viên 5+ năm).</li>
  <li><strong>CTA kép:</strong> "Đặt lịch ngay" (primary) + "Nhắn Zalo tư vấn" (secondary) — cả 2 track GA4.</li>
  <li><strong>Combo nổi bật:</strong> 3 gói giá hiển thị ngay màn hình 2 — khách quyết nhanh theo giá.</li>
  <li><strong>Grid dịch vụ:</strong> 6–8 card icon + tên + "Từ …đ" — link vào silo /dich-vu/*.</li>
  <li><strong>Gallery ambiance:</strong> 6–8 ảnh không gian thật (không ảnh stock) — lazy load.</li>
  <li><strong>Số liệu trust:</strong> Năm hoạt động, số khách phục vụ, rating Google, số kỹ thuật viên.</li>
  <li><strong>Review khách hàng:</strong> Embed review Google + screenshot feedback Zalo/Facebook.</li>
  <li><strong>Quy trình trải nghiệm 4 bước:</strong> Đặt lịch → tư vấn da/cơ → trải nghiệm → chăm sóc sau.</li>
  <li><strong>Ưu đãi đang chạy:</strong> Banner khuyến mãi + đếm ngược (nếu có).</li>
  <li><strong>Giờ mở cửa + Google Maps</strong> embed lazy load.</li>
  <li><strong>Zalo sticky + nút gọi</strong> mọi màn hình mobile.</li>
  <li><strong>Footer:</strong> Địa chỉ từng cơ sở, hotline, link hub <a href="${SITE}/blog/nganh/spa">/blog/nganh/spa</a>.</li>
</ol>

<h2 id="dich-vu">Wireframe — Trang dịch vụ &amp; chi tiết</h2>
<p>Hub /dich-vu liệt kê nhóm dịch vụ có filter; mỗi trang con /dich-vu/* dùng layout thống nhất:</p>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>H1 long-tail:</strong> "Massage trị liệu [Quận]" / "Chăm sóc da mụn [TP]".</li>
  <li><strong>Mô tả 400–600 từ:</strong> Phù hợp với ai, lợi ích, liệu trình bao nhiêu buổi.</li>
  <li><strong>Card từng liệu trình:</strong> Tên + thời lượng + giá + nút "Đặt ngay" pre-fill dịch vụ.</li>
  <li><strong>Bảng so sánh gói lẻ vs combo:</strong> Khách thấy ngay mua combo lợi bao nhiêu %.</li>
  <li><strong>Ảnh thực tế phòng trị liệu</strong> — alt có keyword "massage [quận]" tự nhiên.</li>
  <li><strong>Review riêng dịch vụ:</strong> 2–3 feedback khách đã dùng đúng liệu trình đó.</li>
  <li><strong>FAQ schema ≥5 câu</strong> riêng dịch vụ (đau không, bao lâu thấy hiệu quả, chống chỉ định).</li>
  <li><strong>CTA:</strong> Đặt lịch + Zalo cuối trang.</li>
  <li><strong>Internal link:</strong> ↔ Hub /dich-vu ↔ /bang-gia ↔ bài blog liên quan.</li>
</ol>

<h2 id="bang-gia">Wireframe — Combo &amp; bảng giá</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>H1:</strong> "Bảng giá spa [Tên] [Quận/TP] — cập nhật 2026".</li>
  <li><strong>Tab theo nhóm:</strong> Massage / Facial / Body / Combo — mobile dạng accordion.</li>
  <li><strong>Bảng giá minh bạch:</strong> Tên liệu trình, thời lượng, giá lẻ, giá combo — không giấu giá.</li>
  <li><strong>3 combo best-seller</strong> highlight màu riêng, badge "Được chọn nhiều nhất".</li>
  <li><strong>Chính sách:</strong> Đặt cọc, đổi lịch, hoàn tiền — giảm lo ngại trước khi đặt.</li>
  <li><strong>CTA từng dòng giá:</strong> Nút "Đặt lịch" pre-fill combo — rút ngắn hành trình.</li>
  <li><strong>Schema Offer/PriceSpecification</strong> nếu giá công khai cố định.</li>
</ol>

${img(0, "Template website spa — wireframe trang chủ booking và combo giá", "tham-my")}

<h2 id="gallery">Wireframe — Gallery &amp; không gian</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Grid masonry ảnh thật:</strong> Phòng trị liệu, khu thư giãn, quầy lễ tân, phòng xông.</li>
  <li><strong>Phân album:</strong> Không gian / Dịch vụ / Sự kiện — khách xem đúng thứ họ cần.</li>
  <li><strong>Ảnh WebP ≤200KB</strong>, kích thước hiển thị đúng — gallery là trang dễ chậm nhất.</li>
  <li><strong>Video tour 30–60s</strong> nhúng YouTube (facade + lazy load) nếu có.</li>
  <li><strong>Alt ảnh mô tả thật:</strong> "Phòng massage đá nóng spa [tên] [quận]" — không nhồi keyword.</li>
  <li><strong>CTA cuối gallery:</strong> "Trải nghiệm không gian này — đặt lịch ngay".</li>
</ol>

<h2 id="dat-lich">Wireframe — Đặt lịch &amp; form lead</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Form ngắn 4 trường:</strong> Tên, SĐT, dịch vụ (dropdown), khung giờ mong muốn.</li>
  <li><strong>Chọn cơ sở</strong> nếu spa nhiều chi nhánh — mỗi cơ sở 1 lịch riêng.</li>
  <li><strong>Xác nhận tức thì:</strong> Thank-you message + "Spa sẽ gọi xác nhận trong 15 phút".</li>
  <li><strong>Kênh thay thế:</strong> Nút Zalo + nút gọi ngay bên cạnh form — khách lớn tuổi thích gọi.</li>
  <li><strong>Tích hợp thông báo:</strong> Email/Zalo OA/Google Sheet cho lễ tân — không sót lead.</li>
  <li><strong>Event tracking:</strong> GA4 conversion "submit_dat_lich" + "click_zalo".</li>
  <li><strong>Nhắc lịch tự động</strong> (nâng cao): SMS/Zalo trước giờ hẹn 2 tiếng — giảm no-show.</li>
</ol>

<h2 id="uu-dai">Wireframe — Khuyến mãi &amp; membership</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Landing ưu đãi theo mùa:</strong> 8/3, 20/10, sinh nhật spa — URL riêng để chạy ads.</li>
  <li><strong>Đếm ngược thời hạn</strong> + số suất còn lại — tạo urgency thật, không fake.</li>
  <li><strong>Thẻ thành viên:</strong> Bảng quyền lợi Silver/Gold/Platinum — tăng khách quay lại.</li>
  <li><strong>Form nhận ưu đãi:</strong> Tên + SĐT — nuôi danh sách remarketing Zalo OA.</li>
  <li><strong>Quy tắc SEO:</strong> Ưu đãi hết hạn → redirect 301 về /uu-dai, không để trang 404.</li>
</ol>

${img(1, "Template website spa — form đặt lịch online và trang ưu đãi", "tham-my")}

<h2 id="blog-seo">Blog &amp; SEO cluster cho template</h2>
<p>Sau khi triển khai 12 trang core, mở rộng content cluster:</p>
<ul class="space-y-2 my-4 list-disc pl-6">
  <li><strong>Commercial:</strong> "Bảng giá massage [quận]", "Combo chăm sóc da giá tốt [TP]".</li>
  <li><strong>Informational:</strong> "Cách chăm sóc da sau liệu trình", "Massage đá nóng có tác dụng gì", "Bao lâu nên facial một lần".</li>
  <li><strong>Local:</strong> "Spa gần đây [quận]", "Spa uy tín [TP]", "Địa chỉ massage trị liệu [khu vực]".</li>
  <li><strong>Internal link:</strong> Mỗi bài blog → 1 trang dịch vụ + /dat-lich + hub <a href="${SITE}/blog/nganh/spa">/blog/nganh/spa</a>.</li>
</ul>

<div class="overflow-x-auto my-6">
<table class="w-full border-collapse text-sm">
  <thead><tr><th class="border border-indigo-100 px-3 py-2 text-left">Trang template</th><th class="border border-indigo-100 px-3 py-2 text-left">Từ khóa gợi ý</th><th class="border border-indigo-100 px-3 py-2 text-left">Intent</th></tr></thead>
  <tbody>
    <tr><td class="border border-indigo-100 px-3 py-2">Trang chủ</td><td class="border border-indigo-100 px-3 py-2">spa [quận/TP]</td><td class="border border-indigo-100 px-3 py-2">Commercial</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/dich-vu/massage</td><td class="border border-indigo-100 px-3 py-2">massage trị liệu [quận]</td><td class="border border-indigo-100 px-3 py-2">Commercial</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/dich-vu/cham-soc-da</td><td class="border border-indigo-100 px-3 py-2">chăm sóc da mặt [quận]</td><td class="border border-indigo-100 px-3 py-2">Commercial</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/bang-gia</td><td class="border border-indigo-100 px-3 py-2">bảng giá spa [TP]</td><td class="border border-indigo-100 px-3 py-2">Transactional</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/dat-lich</td><td class="border border-indigo-100 px-3 py-2">đặt lịch spa online</td><td class="border border-indigo-100 px-3 py-2">Lead</td></tr>
    <tr><td class="border border-indigo-100 px-3 py-2">/hinh-anh</td><td class="border border-indigo-100 px-3 py-2">không gian spa đẹp [TP]</td><td class="border border-indigo-100 px-3 py-2">Trust</td></tr>
  </tbody>
</table>
</div>

<h2 id="ky-thuat">Technical SEO khi triển khai template</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Schema LocalBusiness (HealthAndBeautyBusiness):</strong> Tên, địa chỉ, giờ mở cửa, hotline, geo — đồng bộ Google Business Profile.</li>
  <li><strong>Schema FAQPage</strong> trên trang dịch vụ và /dat-lich.</li>
  <li><strong>Core Web Vitals:</strong> Ảnh hero WebP preload, gallery lazy load — LCP &lt;2,5s trên 4G.</li>
  <li><strong>Canonical</strong> cho từng URL silo — tránh duplicate giữa combo và dịch vụ lẻ.</li>
  <li><strong>Sitemap.xml</strong> gồm 12 trang core + blog cluster; submit GSC ngay khi go-live.</li>
  <li><strong>robots.txt</strong> không chặn /dat-lich, /bang-gia.</li>
  <li><strong>HTTPS + redirect www</strong> thống nhất 1 phiên bản domain.</li>
  <li><strong>NAP nhất quán:</strong> Tên–địa chỉ–SĐT giống hệt trên web, GBP, Fanpage — yếu tố local ranking.</li>
  <li><strong>Alt ảnh không gian/dịch vụ</strong> mô tả thực tế, keyword tự nhiên.</li>
</ol>

<h2 id="timeline">Timeline triển khai theo template</h2>
<ol class="space-y-2 my-4 list-decimal pl-6">
  <li><strong>Tuần 1:</strong> Chốt sitemap 12 trang, chụp ảnh không gian thật, chốt bảng giá combo.</li>
  <li><strong>Tuần 2:</strong> Wireframe + UI trang chủ, /bang-gia, /dat-lich.</li>
  <li><strong>Tuần 3:</strong> Dev form đặt lịch + thông báo Zalo OA/email cho lễ tân.</li>
  <li><strong>Tuần 4:</strong> Silo dịch vụ + gallery + SEO on-page toàn site.</li>
  <li><strong>Tuần 5:</strong> QA mobile, schema, tối ưu tốc độ, GSC submit, go-live.</li>
  <li><strong>Tháng 2–3:</strong> Blog cluster local + đồng bộ nội dung Fanpage về web + theo dõi query GSC.</li>
</ol>

<div class="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 my-6">
<p><strong>Proof tham chiếu:</strong> Cấu trúc booking + SEO local này đã áp dụng cho <a href="${SITE}/du-an/phuoc-lai-luxury">Phước Lai Luxury</a> và <a href="${SITE}/du-an/halee-tram">Halee Trâm</a>. Kết hợp social: Fanpage <a href="${SITE}/du-an/sao-khue">Sao Khuê</a> đạt <strong>83.374 lượt xem</strong> trong 90 ngày — website là điểm hạ cánh chuyển lượt xem thành lượt đặt lịch.</p>
</div>

${img(2, "Template website spa — sitemap 12 trang và silo SEO local", "tham-my")}

<h2 id="silo">Liên kết silo Vertical Proof</h2>
<p>Template nằm trong silo URL ngành spa:</p>
<ul class="space-y-1 my-4 list-disc pl-6">
  <li>Money page: <a href="${SITE}/blog/thiet-ke-website-spa">thiết kế website spa</a></li>
  <li>Checklist: <a href="${SITE}/blog/checklist-website-spa-2026">checklist website spa 2026</a></li>
  <li>Template: <strong>bài này</strong></li>
  <li>Hub: <a href="${SITE}/blog/nganh/spa">/blog/nganh/spa</a></li>
  <li>Case study: <a href="${SITE}/du-an/phuoc-lai-luxury">Phước Lai Luxury</a> · <a href="${SITE}/du-an/halee-tram">Halee Trâm</a> · <a href="${SITE}/du-an/sao-khue">Sao Khuê</a></li>
  <li>Dịch vụ: <a href="${SITE}/website">thiết kế website Bứt Phá</a></li>
</ul>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Template khác checklist thế nào?</h3>
<p>Template = cấu trúc trang dùng trước khi thiết kế; checklist = danh sách kiểm tra sau khi làm xong. Dùng cả hai: template để triển khai, <a href="${SITE}/blog/checklist-website-spa-2026">checklist</a> để nghiệm thu.</p>
<h3>Spa nhỏ 1 cơ sở có cần đủ 12 trang?</h3>
<p>Có thể gộp: /uu-dai vào trang chủ, 3 silo dịch vụ thành 1 trang /dich-vu có anchor. Giữ /bang-gia và /dat-lich — 2 trang chuyển đổi bắt buộc, không được cắt.</p>
<h3>Có nên hiển thị giá công khai trên web?</h3>
<p>Nên. Khách spa so giá trước khi đặt; giấu giá làm tăng tỉ lệ thoát và tốn thời gian lễ tân trả lời inbox. Nếu giá dao động, ghi "Từ …đ" kèm ghi chú tư vấn miễn phí.</p>
<h3>Spa có cần blog không?</h3>
<p>Cần — 5–10 bài "chăm sóc da sau liệu trình", "massage giảm stress", "spa gần đây [quận]" phủ long-tail local, mỗi bài trỏ về trang dịch vụ và /dat-lich.</p>
<h3>Đã có Fanpage mạnh, website còn cần thiết?</h3>
<p>Cần — Fanpage không rank Google "spa [quận]", không kiểm soát thuật toán reach. Case Sao Khuê 83K views/90 ngày cho thấy social kéo attention, website chốt booking và giữ SEO dài hạn.</p>
<h3>Giá triển khai theo template?</h3>
<p>Website spa 5–12 triệu tùy form đặt lịch, số silo dịch vụ và gallery. Xem <a href="${SITE}/banggia">bảng giá</a> và <a href="${SITE}/blog/thiet-ke-website-spa">hướng dẫn chi tiết</a>.</p>
<h3>Bứt Phá có triển khai theo template này?</h3>
<p>Có — <a href="${SITE}/lien-he">đăng ký tư vấn</a> kèm số cơ sở, nhóm dịch vụ chính và yêu cầu đặt lịch online.</p>

<p><strong>Liên kết silo:</strong> <a href="${SITE}/blog/nganh/spa">Hub spa</a> · <a href="${SITE}/blog/checklist-website-spa-2026">Checklist</a> · <a href="${SITE}/blog/thiet-ke-website-spa">Money page</a> · <a href="${SITE}/website">Dịch vụ website</a> · <a href="${SITE}/du-an">Case study</a></p>
${internalLinks({ cluster: "spa" })}
`,
  }),
};

console.log("=== Seed template website spa 2026 (expanded) ===\n");
console.log(`Content length: ${article.content.length} chars`);
await seedRewriteArticle(article);
console.log("\nDone. URL: /blog/template-website-spa-2026");
