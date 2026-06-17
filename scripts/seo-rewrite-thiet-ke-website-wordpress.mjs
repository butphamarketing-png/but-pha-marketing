import { NEWS_THUMBNAIL } from "./seo-article-helpers.mjs";
import {
  buildWpSeoArticle,
  wpToc,
  wpIntro,
  wpKeyTakeaways,
  wpFaq,
  wpRelatedLinks,
  wpConclusion,
  wpExternalCta,
  wpImg,
  SITE,
} from "./seo-wp-structure.mjs";

const KEYWORD = "thiết kế website wordpress";
const TITLE = "Thiết Kế Website WordPress Có Phải Lựa Chọn Tối Ưu";

export const REWRITE_THIET_KE_WEBSITE_WORDPRESS = {
  title: TITLE,
  slug: "thiet-ke-website-wordpress",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "wordpress doanh nghiệp, web wordpress seo, thiết kế web wordpress, làm website wordpress, website wordpress chuyên nghiệp",
  metaTitle: "Thiết Kế Website WordPress 2026 | Ưu Nhược & Báo Giá | Bứt Phá",
  metaDescription:
    "Thiết kế website WordPress cho doanh nghiệp: ưu nhược điểm, so sánh với code thuần, bảo mật, SEO Yoast/Rank Math, WooCommerce. Báo giá triển khai 3–12 triệu.",
  description:
    "Đánh giá toàn diện thiết kế website WordPress cho SME Việt Nam: khi nào nên chọn, lưu ý bảo mật, tối ưu SEO và chi phí triển khai chuyên nghiệp.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website WordPress 2026 | Ưu Nhược & Báo Giá | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "wordpress-la-gi", label: "WordPress là gì?" },
  { id: "co-phai-toi-uu", label: "WordPress có phải lựa chọn tối ưu?" },
  { id: "uu-diem", label: "Ưu điểm thiết kế website WordPress" },
  { id: "nhuoc-diem", label: "Nhược điểm & khi không nên dùng" },
  { id: "so-sanh", label: "WordPress vs code thuần / website builder" },
  { id: "bao-mat-hieu-nang", label: "Bảo mật và hiệu năng" },
  { id: "seo-wordpress", label: "SEO với website WordPress" },
  { id: "woocommerce-blog", label: "WooCommerce, blog & plugin" },
  { id: "quy-trinh", label: "Quy trình thiết kế WordPress chuẩn" },
  { id: "chi-phi", label: "Chi phí thiết kế website WordPress" },
  { id: "goi-buc-pha", label: "Triển khai tại Bứt Phá Marketing" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} là hình thức xây dựng website trên nền tảng WordPress — CMS mã nguồn mở chiếm hơn 40% thị phần website toàn cầu. Doanh nghiệp nhận giao diện theo thương hiệu, khả năng tự đăng bài, chỉnh trang qua admin và mở rộng tính năng bằng plugin mà không cần viết lại toàn bộ code từ đầu.`,
    `Bài viết bám tiêu đề <em>${TITLE}</em>: phân tích khi WordPress là lựa chọn tối ưu (và khi không), so sánh với website code thuần hay nền tảng kéo-thả, checklist bảo mật — hiệu năng — SEO, quy trình triển khai chuyên nghiệp và khung báo giá 2026 tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "WordPress phù hợp SME cần blog, tự quản trị nội dung, ngân sách vừa phải.",
  "Tối ưu khi: theme nhẹ, plugin tối giản, hosting chất lượng, cập nhật định kỳ.",
  "Không tối ưu khi: app phức tạp, realtime cao, bảo mật đặc thù — cân nhắc code thuần.",
  "SEO WordPress mạnh với Rank Math/Yoast + tốc độ + schema — không tự động top Google.",
  "Bứt Phá triển khai web doanh nghiệp 3–12 triệu — WordPress hoặc stack hiện đại tùy nhu cầu.",
])}

${wpImg(2, "Thiết kế website WordPress chuyên nghiệp cho doanh nghiệp")}

<h2 id="wordpress-la-gi">WordPress là gì? Vì sao doanh nghiệp hay chọn?</h2>

<p><strong>WordPress</strong> là hệ quản trị nội dung (CMS) cho phép tạo trang, bài viết, menu, form và shop qua giao diện quản trị. <strong>${KEYWORD}</strong> nghĩa là agency hoặc dev cài đặt WordPress trên hosting, thiết kế giao diện (theme custom hoặc child theme), cấu hình plugin cần thiết và bàn giao — thay vì bạn tự tải theme miễn phí rồi “vá” tính năng.</p>

<p>WordPress phổ biến vì:</p>
<ul>
  <li>Cộng đồng lớn — tài liệu, plugin, developer dồi dào tại Việt Nam</li>
  <li>SEO-friendly — permalink, heading, plugin schema sẵn có</li>
  <li>WooCommerce — biến site thành cửa hàng online</li>
  <li>Page builder (Elementor, Bricks, Gutenberg) — marketing tự chỉnh layout</li>
  <li>Chi phí license thấp — core miễn phí, trả phí theme/plugin cao cấp nếu cần</li>
</ul>

<h2 id="co-phai-toi-uu">Thiết kế website WordPress có phải lựa chọn tối ưu?</h2>

<p><strong>Có</strong> — với đa số doanh nghiệp vừa và nhỏ cần website giới thiệu, blog, landing page và form lead. <strong>${KEYWORD}</strong> cân bằng tốt giữa thời gian go-live (2–5 tuần), chi phí và khả năng team marketing tự vận hành.</p>

<p><strong>Không tối ưu</strong> khi:</p>
<ul>
  <li>Cần ứng dụng web phức tạp (SaaS, dashboard realtime, matching algorithm…)</li>
  <li>Lưu lượng cực lớn mà không đầu tư hạ tầng/cache chuyên sâu</li>
  <li>Yêu cầu bảo mật đặc thù (ngân hàng, y tế) — cần audit riêng, không chỉ plugin</li>
  <li>Chỉ cần 1 landing page tĩnh — HTML/Next.js có thể nhẹ hơn</li>
</ul>

<p>Quyết định đúng = khớp <em>use case</em>, không phải “WordPress hay không” theo trend.</p>

<h2 id="uu-diem">Ưu điểm thiết kế website WordPress cho doanh nghiệp</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Ưu điểm</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Lợi ích thực tế</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tự quản trị nội dung</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Đăng tin, sửa giá, thêm landing không cần gọi dev mỗi lần</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Mở rộng nhanh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Form, đa ngôn ngữ, membership, CRM qua plugin đã kiểm chứng</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>SEO on-page</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Rank Math, Yoast — meta, schema, sitemap XML</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>E-commerce</strong></td>
      <td class="border border-indigo-100 px-3 py-2">WooCommerce + cổng VN (MoMo, VNPay, COD…)</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Chi phí vận hành</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Nhiều host có gói WordPress managed từ vài trăm nghìn/tháng</td>
    </tr>
  </tbody>
</table>

<p>Khi <strong>${KEYWORD}</strong> được làm bài bản (custom theme/child theme, không nhồi 40 plugin), website vừa đẹp vừa bền vững cho marketing dài hạn.</p>

${wpImg(0, "Ưu điểm thiết kế website WordPress cho doanh nghiệp Việt Nam")}

<h2 id="nhuoc-diem">Nhược điểm và rủi ro cần biết</h2>

<ul>
  <li><strong>Bảo mật:</strong> Core/plugin lỗi thời là vector tấn công phổ biến — cần cập nhật và backup</li>
  <li><strong>Hiệu năng:</strong> Theme nặng + page builder + plugin dư → Core Web Vitals kém</li>
  <li><strong>Phụ thuộc plugin:</strong> Plugin ngừng hỗ trợ có thể “kẹt” tính năng</li>
  <li><strong>Trùng lặp giao diện:</strong> Theme bán chung — đối thủ có thể giống layout nếu không custom</li>
  <li><strong>Chi phí ẩn:</strong> License Elementor Pro, WP Rocket, premium theme — hỏi trước khi ký</li>
</ul>

<p>Thiết kế website WordPress <em>rẻ 1–2 triệu</em> thường = theme free + cài plugin bừa → chậm, khó SEO, dễ hack. Đầu tư triển khai chuẩn rẻ hơn sửa sau 6 tháng.</p>

<h2 id="so-sanh">WordPress vs code thuần (Next.js, Laravel) vs Wix/Sapo</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">WordPress</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Code thuần</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Wix / kéo-thả</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Tự sửa nội dung</td>
      <td class="border border-indigo-100 px-3 py-2">✅ Dễ</td>
      <td class="border border-indigo-100 px-3 py-2">⚠️ Cần CMS hoặc dev</td>
      <td class="border border-indigo-100 px-3 py-2">✅ Rất dễ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Tốc độ / scale</td>
      <td class="border border-indigo-100 px-3 py-2">⚠️ Phụ thuộc cấu hình</td>
      <td class="border border-indigo-100 px-3 py-2">✅ Tối ưu cao</td>
      <td class="border border-indigo-100 px-3 py-2">⚠️ Hạn chế</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">SEO sâu</td>
      <td class="border border-indigo-100 px-3 py-2">✅ Tốt</td>
      <td class="border border-indigo-100 px-3 py-2">✅ Tốt nhất (kiểm soát 100%)</td>
      <td class="border border-indigo-100 px-3 py-2">⚠️ Trung bình</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Chi phí ban đầu</td>
      <td class="border border-indigo-100 px-3 py-2">Trung bình</td>
      <td class="border border-indigo-100 px-3 py-2">Cao hơn</td>
      <td class="border border-indigo-100 px-3 py-2">Thấp</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Sở hữu &amp; migrate</td>
      <td class="border border-indigo-100 px-3 py-2">✅ Host riêng</td>
      <td class="border border-indigo-100 px-3 py-2">✅ Full</td>
      <td class="border border-indigo-100 px-3 py-2">❌ Khó chuyển</td>
    </tr>
  </tbody>
</table>

<p>Bứt Phá triển khai cả <strong>website WordPress</strong> lẫn <strong>stack hiện đại (Next.js)</strong> — tư vấn theo mục tiêu: blog nhiều, shop WooCommerce hay app tùy biến sâu.</p>

<h2 id="bao-mat-hieu-nang">Bảo mật và hiệu năng website WordPress</h2>

<h3>Checklist bảo mật</h3>
<ul>
  <li>Cập nhật WordPress core, theme, plugin hàng tuần/tháng</li>
  <li>Backup tự động hàng ngày (file + database)</li>
  <li>SSL HTTPS, mật khẩu mạnh, 2FA cho admin</li>
  <li>Giới hạn đăng nhập, ẩn hoặc đổi đường dẫn wp-admin</li>
  <li>Plugin bảo mật (Wordfence, iThemes) hoặc WAF hosting</li>
  <li>Chỉ cài plugin từ nguồn uy tín — gỡ plugin không dùng</li>
</ul>

<h3>Checklist hiệu năng</h3>
<ul>
  <li>Hosting WordPress chuyên dụng (LiteSpeed, NVMe)</li>
  <li>Cache: LiteSpeed Cache, WP Rocket hoặc tương đương</li>
  <li>Ảnh WebP, lazy-load, CDN (Cloudflare)</li>
  <li>Theme nhẹ — tránh page builder trên mọi trang nếu không cần</li>
  <li>Database cleanup định kỳ</li>
</ul>

<p><strong>${KEYWORD}</strong> chuyên nghiệp phải giao checklist vận hành kèm bàn giao — không chỉ “xong web là thôi”.</p>

${wpImg(1, "Bảo mật và tối ưu hiệu năng thiết kế website WordPress")}

<h2 id="seo-wordpress">SEO với thiết kế website WordPress</h2>

<p>WordPress <em>thân thiện SEO</em> nhưng không tự lên top. Cần:</p>
<ol>
  <li><strong>Permalink</strong> dạng <code>/ten-bai-viet/</code> — không dùng <code>?p=123</code></li>
  <li><strong>Plugin SEO:</strong> Rank Math hoặc Yoast — focus keyword, meta, schema Article/FAQ</li>
  <li><strong>Cấu trúc heading</strong> H1 duy nhất, H2/H3 logic</li>
  <li><strong>Tốc độ</strong> — Google ưu tiên mobile; Core Web Vitals ảnh hưởng xếp hạng</li>
  <li><strong>Google Search Console + sitemap XML</strong> submit sau go-live</li>
  <li><strong>Nội dung</strong> — pillar + cluster (xem <a href="${SITE}/blog/thiet-ke-website-chuan-seo">thiết kế website chuẩn SEO</a>)</li>
</ol>

<p>Tránh cài 5 plugin SEO cùng lúc — xung đột meta và chậm site.</p>

<h2 id="woocommerce-blog">WooCommerce, blog và hệ sinh thái plugin</h2>

<p><strong>Blog:</strong> Lõi WordPress — category, tag, lịch đăng, author. Phù hợp content marketing và SEO long-tail.</p>

<p><strong>WooCommerce:</strong> Sản phẩm, giỏ hàng, thanh toán, vận chuyển. Cần hosting mạnh hơn site giới thiệu. Tích hợp VN: VNPay, MoMo, COD, GHN/GHTK qua plugin.</p>

<p><strong>Plugin thường dùng cho doanh nghiệp VN:</strong></p>
<ul>
  <li>Form: Contact Form 7, WPForms, Fluent Forms</li>
  <li>Đa ngôn ngữ: Polylang, WPML</li>
  <li>Cache &amp; ảnh: LiteSpeed, ShortPixel</li>
  <li>Schema: Rank Math (tích hợp sẵn)</li>
  <li>Chat Zalo / Messenger widget</li>
</ul>

<p>Nguyên tắc: <em>càng ít plugin càng tốt</em> — mỗi plugin là một điểm rủi ro bảo mật và hiệu năng.</p>

<h2 id="quy-trinh">Quy trình thiết kế website WordPress chuyên nghiệp (7 bước)</h2>

<ol>
  <li><strong>Khảo sát:</strong> Mục tiêu, sitemap, tính năng (shop/blog/form)</li>
  <li><strong>Wireframe &amp; UI:</strong> Mockup desktop/mobile theo brand</li>
  <li><strong>Dev theme:</strong> Child theme hoặc block theme custom — không clone demo nguyên xi</li>
  <li><strong>Cài đặt &amp; cấu hình:</strong> Plugin tối thiểu, form, analytics</li>
  <li><strong>Nội dung &amp; SEO on-page:</strong> Title, meta, alt ảnh từng trang</li>
  <li><strong>Test:</strong> Mobile, form, thanh toán (nếu shop), tốc độ PageSpeed</li>
  <li><strong>Go-live &amp; đào tạo:</strong> Video hướng dẫn admin, bảo hành 3–12 tháng</li>
</ol>

<p>Thời gian <strong>${KEYWORD}</strong> chuẩn: <strong>2–5 tuần</strong> (web giới thiệu 5–8 trang); shop WooCommerce 4–8 tuần.</p>

${wpImg(5, "Quy trình thiết kế website WordPress chuyên nghiệp")}

<h2 id="chi-phi">Chi phí thiết kế website WordPress tham khảo 2026</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Loại hình</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá tham chiếu (VN)</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Web giới thiệu WP</td>
      <td class="border border-indigo-100 px-3 py-2">3 – 6 triệu</td>
      <td class="border border-indigo-100 px-3 py-2">5–8 trang, form, SEO cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Web doanh nghiệp + blog</td>
      <td class="border border-indigo-100 px-3 py-2">6 – 9 triệu</td>
      <td class="border border-indigo-100 px-3 py-2">Custom UI, blog, tốc độ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">WooCommerce</td>
      <td class="border border-indigo-100 px-3 py-2">9 – 15+ triệu</td>
      <td class="border border-indigo-100 px-3 py-2">Tùy số SP, cổng thanh toán</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Duy trì/năm</td>
      <td class="border border-indigo-100 px-3 py-2">15 – 25% giá web hoặc gói tháng</td>
      <td class="border border-indigo-100 px-3 py-2">Hosting, backup, cập nhật, bảo mật</td>
    </tr>
  </tbody>
</table>

<p>Chi tiết bảng giá Bứt Phá: <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a> và trang <a href="${SITE}/website">dịch vụ website</a>.</p>

<h2 id="goi-buc-pha">Triển khai thiết kế website WordPress tại Bứt Phá Marketing</h2>

<p>Bứt Phá nhận <strong>${KEYWORD}</strong> và website stack hiện đại — tư vấn nền tảng phù hợp trước khi code:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp WordPress</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Giới thiệu</td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Landing + vài trang, SEO cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Tối ưu</td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">UI chuyên nghiệp + blog</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Kinh doanh</td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">WooCommerce nhỏ, CRO, tích hợp</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Hệ thống</td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Shop phức tạp hoặc custom + WP headless</td>
    </tr>
  </tbody>
</table>

<p>Tên miền ~350k/năm; hosting từ ~3,3 triệu/năm — báo riêng hoặc gói combo. Xem thêm <a href="${SITE}/blog/thiet-ke-website-tron-goi">thiết kế website trọn gói</a>.</p>

${wpImg(7, "Dịch vụ thiết kế website WordPress tại Bứt Phá Marketing")}

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Tổng quan làm web, quy trình 7 bước và bảng giá.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-chuan-seo`,
    label: "Thiết kế website chuẩn SEO",
    desc: "Yếu tố SEO kỹ thuật áp dụng cho WordPress.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-thuong-mai-dien-tu`,
    label: "Thiết kế website thương mại điện tử",
    desc: "WooCommerce và shop online.",
  },
  {
    href: `${SITE}/website`,
    label: "Đăng ký thiết kế website",
    desc: "Tư vấn WordPress hoặc stack hiện đại.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website WordPress giá bao nhiêu?",
      a: "Web giới thiệu 3–6 triệu; doanh nghiệp + blog 6–9 triệu; WooCommerce từ 9 triệu trở lên. Bứt Phá có gói 3–12 triệu tùy phạm vi.",
    },
    {
      q: "WordPress có bị hack dễ không?",
      a: "Rủi ro giảm mạnh khi cập nhật thường xuyên, hosting chất lượng, plugin tối giản và backup tự động.",
    },
    {
      q: "WordPress có SEO tốt không?",
      a: "Rất tốt nếu cấu hình permalink, plugin Rank Math/Yoast, tốc độ và nội dung chất lượng. Không thay thế chiến lược content.",
    },
    {
      q: "Nên dùng Elementor hay theme custom?",
      a: "Elementor tiện cho marketing tự sửa; theme custom nhẹ hơn và độc quyền hơn. Doanh nghiệp lâu dài nên cân nhắc child theme + block editor.",
    },
    {
      q: "WordPress hay Next.js cho doanh nghiệp?",
      a: "WordPress khi cần tự đăng bài, shop WooCommerce, ngân sách vừa. Next.js khi cần tốc độ cực cao, app phức tạp, scale lớn.",
    },
    {
      q: "Làm web WordPress mất bao lâu?",
      a: "2–5 tuần cho web giới thiệu; 4–8 tuần cho shop WooCommerce tùy số sản phẩm và tích hợp thanh toán.",
    },
    {
      q: "Có thể migrate từ Wix sang WordPress?",
      a: "Có — export nội dung, thiết kế lại theme trên WP, redirect 301 URL cũ để giữ SEO.",
    },
    {
      q: "Ai bảo trì website WordPress sau bàn giao?",
      a: "Khách tự làm (cần đào tạo) hoặc thuê gói bảo trì agency — cập nhật, backup, bảo mật hàng tháng.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} là lựa chọn tối ưu cho đa số doanh nghiệp cần website chuyên nghiệp, blog, form lead và khả năng tự quản trị — với điều kiện triển khai đúng: theme nhẹ, plugin có chọn lọc, hosting tốt và quy trình bảo mật định kỳ.`,
    `Nếu bạn cần shop WooCommerce, content marketing mạnh hoặc ngân sách SME — WordPress xứng đáng cân nhắc. Liên hệ Bứt Phá để được tư vấn WordPress hay giải pháp hiện đại phù hợp mục tiêu kinh doanh.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website WordPress",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
