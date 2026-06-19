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

const KEYWORD = "thiết kế website wordpress hay shopify";
const TITLE = "Thiết Kế Website WordPress Hay Shopify — Nên Chọn Gì?";

export const REWRITE_THIET_KE_WEBSITE_WORDPRESS_VS_SHOPIFY = {
  title: TITLE,
  slug: "thiet-ke-website-wordpress-vs-shopify",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "wordpress hay shopify, woocommerce vs shopify, nên chọn wordpress hay shopify, thiết kế web bán hàng",
  metaTitle: "Thiết Kế Website WordPress Hay Shopify | 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website wordpress hay shopify: so sánh chi phí, SEO, WooCommerce, thanh toán VN và quy mô shop. Bảng quyết định + báo giá. Tư vấn Bứt Phá Marketing.",
  description:
    "So sánh chi tiết thiết kế website WordPress (WooCommerce) và Shopify: ưu nhược, chi phí, SEO, thanh toán Việt Nam và gợi ý chọn theo mô hình kinh doanh.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website WordPress Hay Shopify | 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "tong-quan", label: "Tóm tắt nhanh" },
  { id: "wordpress-la-gi", label: "WordPress + WooCommerce" },
  { id: "shopify-la-gi", label: "Shopify là gì?" },
  { id: "bang-so-sanh", label: "Bảng so sánh chi tiết" },
  { id: "chi-phi", label: "Chi phí thực tế 2026" },
  { id: "seo", label: "SEO & content" },
  { id: "thanh-toan-vn", label: "Thanh toán tại Việt Nam" },
  { id: "chon-wordpress", label: "Khi nên chọn WordPress" },
  { id: "chon-shopify", label: "Khi nên chọn Shopify" },
  { id: "quy-trinh", label: "Quy trình triển khai" },
  { id: "sai-lam", label: "Sai lầm khi chọn nền tảng" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `Câu hỏi <strong>${KEYWORD}</strong> xuất hiện rất nhiều khi doanh nghiệp Việt chuẩn bị bán hàng online — đặc biệt shop vừa và nhỏ đang cân nhắc giữa <em>WordPress + WooCommerce</em> (tự host, linh hoạt) và <em>Shopify</em> (SaaS, dễ vận hành). Không có đáp án “luôn đúng”: lựa chọn phụ thuộc quy mô SKU, ngân sách, năng lực kỹ thuật nội bộ, thị trường (Việt Nam vs xuất khẩu) và mức tùy biến giao diện bạn cần.`,
    `Bài viết so sánh trung thực hai hướng <strong>${KEYWORD}</strong> theo tiêu chí thực chiến: chi phí 12 tháng đầu, SEO, thanh toán VN (VNPay, MoMo, COD), tốc độ ra mắt, bảo mật và khả năng scale — kèm bảng quyết định giúp bạn chọn nền tảng phù hợp trước khi ký hợp đồng thiết kế.`,
  ],
})}

${wpKeyTakeaways([
  "WordPress + WooCommerce: linh hoạt, SEO mạnh, chi phí hosting — cần bảo trì.",
  "Shopify: ra mắt nhanh, ít lo kỹ thuật — phí hàng tháng + giới hạn tùy biến sâu.",
  "Shop VN, COD nhiều, blog SEO dài hạn → thường nghiêng WordPress.",
  "Bán quốc tế, dropship, scale nhanh ít dev → Shopify cạnh tranh.",
  "Bứt Phá triển khai cả hai — tư vấn miễn phí theo mô hình shop của bạn.",
])}

${wpImg(4, "So sánh thiết kế website WordPress và Shopify cho shop online")}

<h2 id="tong-quan">WordPress hay Shopify — tóm tắt nhanh</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">WordPress + WooCommerce</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Shopify</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Loại hình</strong></td>
      <td class="border border-indigo-100 px-3 py-2">CMS mã nguồn mở + plugin shop — tự host</td>
      <td class="border border-indigo-100 px-3 py-2">SaaS ecommerce — Shopify host hộ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Ra mắt nhanh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">2–6 tuần (tùy tùy biến)</td>
      <td class="border border-indigo-100 px-3 py-2">1–3 tuần với theme sẵn</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Chi phí cố định</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Hosting + domain/năm</td>
      <td class="border border-indigo-100 px-3 py-2">$29–$299/tháng + % giao dịch</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>SEO &amp; blog</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Rất mạnh — kiểm soát full</td>
      <td class="border border-indigo-100 px-3 py-2">Ổn — blog cơ bản, URL ít linh hoạt hơn</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tùy biến sâu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Cao — code, plugin, theme custom</td>
      <td class="border border-indigo-100 px-3 py-2">Trung bình — Liquid theme, app store</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bảo trì</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Bạn/agency: update WP, plugin, backup</td>
      <td class="border border-indigo-100 px-3 py-2">Shopify lo phần lớn hạ tầng</td>
    </tr>
  </tbody>
</table>

<h2 id="wordpress-la-gi">WordPress + WooCommerce — khi nào phù hợp?</h2>

<p><strong>WordPress</strong> là CMS mã nguồn mở; <strong>WooCommerce</strong> là plugin biến WordPress thành shop online. Khi <strong>thiết kế website wordpress hay shopify</strong>, hướng WordPress mạnh ở:</p>

<ul>
  <li><strong>SEO &amp; content:</strong> Blog, landing, silo chủ đề — kiểm soát URL, schema, internal link (<a href="${SITE}/blog/thiet-ke-website-wordpress">thiết kế website WordPress</a>)</li>
  <li><strong>Tùy biến:</strong> Giao diện unique, tích hợp ERP, CRM, form phức tạp</li>
  <li><strong>Chi phí dài hạn:</strong> Không phí % giao dịch Shopify — chỉ hosting + bảo trì</li>
  <li><strong>Thanh toán VN:</strong> Plugin VNPay, MoMo, ZaloPay, COD — phổ biến, linh hoạt</li>
  <li><strong>Website + shop một nền:</strong> Trang giới thiệu, tuyển dụng, blog + TMĐT cùng domain</li>
</ul>

<p>Nhược điểm: cần hosting tốt, cập nhật bảo mật, plugin nặng dễ chậm nếu cấu hình kém.</p>

<h2 id="shopify-la-gi">Shopify — khi nào phù hợp?</h2>

<p><strong>Shopify</strong> là nền tảng SaaS ecommerce — bạn thuê gian hàng online, Shopify lo server, SSL, cập nhật core. Mạnh ở:</p>

<ul>
  <li><strong>Time-to-market:</strong> Theme + app — mở shop vài ngày đến vài tuần</li>
  <li><strong>Vận hành đơn giản:</strong> Admin trực quan — ít cần dev nội bộ</li>
  <li><strong>Bán quốc tế:</strong> Đa tiền tệ, shipping app, Shopify Payments (khu vực hỗ trợ)</li>
  <li><strong>Dropship / POD:</strong> Tích hợp Oberlo, Printful… sẵn ecosystem</li>
  <li><strong>Scale traffic cao:</strong> Hạ tầng Shopify chịu tải — không lo server sập Tết</li>
</ul>

<p>Nhược điểm: phí tháng + phí giao dịch (trừ Shopify Payments), tùy biến sâu tốn chi phí dev Liquid, SEO/blog kém linh hoạt hơn WordPress.</p>

<h2 id="bang-so-sanh">Bảng so sánh chi tiết WordPress vs Shopify</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Hạng mục</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">WordPress + WooCommerce</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Shopify</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Phí nền tảng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Miễn phí (WP + Woo) + hosting</td>
      <td class="border border-indigo-100 px-3 py-2">Basic ~$29/tháng (~750k) trở lên</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Phí giao dịch</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Chỉ phí cổng (VNPay, MoMo…)</td>
      <td class="border border-indigo-100 px-3 py-2">0,5–2% nếu không dùng Shopify Payments</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Sở hữu dữ liệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Full — export DB bất cứ lúc nào</td>
      <td class="border border-indigo-100 px-3 py-2">Trên Shopify — migrate được nhưng phụ thuộc</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Plugin / App</strong></td>
      <td class="border border-indigo-100 px-3 py-2">60.000+ plugin WP — chọn lọc cẩn thận</td>
      <td class="border border-indigo-100 px-3 py-2">Shopify App Store — chất lượng kiểm duyệt</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đa kênh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Plugin sync Shopee, Facebook — cấu hình phức tạp hơn</td>
      <td class="border border-indigo-100 px-3 py-2">Shopify Markets, social selling tích hợp sẵn</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bảo mật</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Phụ thuộc hosting + update — cần agency bảo trì</td>
      <td class="border border-indigo-100 px-3 py-2">Shopify PCI compliant — ít lo patch server</td>
    </tr>
  </tbody>
</table>

${wpImg(5, "Bảng quyết định WordPress WooCommerce hay Shopify cho doanh nghiệp Việt Nam")}

<h2 id="chi-phi">Chi phí thực tế 12 tháng đầu (2026)</h2>

<h3>WordPress + WooCommerce (shop VN ~200 SKU)</h3>
<ul>
  <li>Thiết kế + lập trình: <strong>6–15 triệu</strong> (tùy custom)</li>
  <li>Hosting WooCommerce: <strong>3–8 triệu/năm</strong></li>
  <li>Domain .com: ~350.000đ/năm</li>
  <li>Plugin trả phí (nếu có): 0–3 triệu/năm</li>
  <li>Bảo trì: 500k–2 triệu/tháng (tùy gói)</li>
</ul>

<h3>Shopify Basic (shop tương đương)</h3>
<ul>
  <li>Thiết kế theme + setup: <strong>5–12 triệu</strong></li>
  <li>Shopify Basic: ~<strong>9 triệu/năm</strong> ($29×12)</li>
  <li>App trả phí: 0–5 triệu/năm</li>
  <li>Phí giao dịch ngoài Shopify Payments: cộng thêm vào P&amp;L</li>
</ul>

<p>Năm đầu chi phí có thể ngang nhau; <strong>năm 2–3</strong> WordPress thường rẻ hơn nếu không scale phí SaaS. Shopify tiện hơn nếu bạn không muốn thuê bảo trì WP.</p>

<h2 id="seo">SEO &amp; content marketing</h2>

<p>Với <strong>${KEYWORD}</strong>, nếu chiến lược dài hạn là <em>SEO organic + blog</em> — WordPress thường thắng:</p>

<ul>
  <li>URL tùy chỉnh, category/tag linh hoạt</li>
  <li>Plugin Yoast / Rank Math — kiểm soát meta từng sản phẩm + bài viết</li>
  <li>Landing page không giới hạn — không phụ thuộc app</li>
  <li>Internal link silo: blog → category → sản phẩm</li>
</ul>

<p>Shopify SEO <em>đủ dùng</em> cho shop nhỏ, nhưng blog và cấu trúc content phức tạp kém linh hoạt. Shop 100% ads (Meta/TikTok) ít phụ thuộc SEO → Shopify vẫn hợp lý.</p>

<h2 id="thanh-toan-vn">Thanh toán &amp; vận hành tại Việt Nam</h2>

<p>Shop online VN thường cần: <strong>COD</strong>, <strong>MoMo</strong>, <strong>VNPay</strong>, <strong>chuyển khoản</strong>.</p>

<ul>
  <li><strong>WordPress:</strong> WooCommerce + plugin VNPay/MoMo/ZaloPay — triển khai phổ biến tại agency VN</li>
  <li><strong>Shopify:</strong> Cần app third-party hoặc Shopify Payments (chưa phổ biến VN) — kiểm tra app trước khi chọn</li>
  <li><strong>COD:</strong> Cả hai đều hỗ trợ — cấu hình shipping zone Việt Nam</li>
  <li><strong>Hóa đơn VAT:</strong> Tích hợp phần mềm kế toán VN — WordPress linh hoạt hơn qua custom/API</li>
</ul>

<p>Xem thêm <a href="${SITE}/blog/thiet-ke-website-thuong-mai-dien-tu">thiết kế website thương mại điện tử</a> và <a href="${SITE}/blog/thiet-ke-website-woocommerce-wordpress">WooCommerce WordPress</a>.</p>

<h2 id="chon-wordpress">Khi nên chọn WordPress + WooCommerce</h2>

<ul>
  <li>Shop chủ yếu thị trường Việt Nam, COD + ví điện tử</li>
  <li>Cần blog SEO, nhiều landing, content marketing mạnh</li>
  <li>Muốn giao diện custom, không giống theme Shopify hàng nghìn shop</li>
  <li>Có agency bảo trì hoặc nhân sự quản trị WP</li>
  <li>Website corporate + shop trên cùng domain</li>
  <li>Ngân sách dài hạn — tránh phí % giao dịch khi doanh thu lớn</li>
</ul>

<h2 id="chon-shopify">Khi nên chọn Shopify</h2>

<ul>
  <li>Cần mở shop <strong>nhanh</strong>, ít thời gian quản lý kỹ thuật</li>
  <li>Bán <strong>quốc tế</strong>, đa tiền tệ, shipping phức tạp</li>
  <li>Dropship, print-on-demand — ecosystem app sẵn</li>
  <li>Traffic ads lớn Tết/11.11 — lo hạ tầng server</li>
  <li>Team nhỏ, không muốn update plugin bảo mật</li>
  <li>Chấp nhận phí tháng đổi lấy vận hành đơn giản</li>
</ul>

<h2 id="quy-trinh">Quy trình triển khai — Bứt Phá Marketing</h2>

<ol>
  <li><strong>Tư vấn nền tảng:</strong> Brief SKU, kênh bán, ngân sách 12 tháng, năng lực nội bộ.</li>
  <li><strong>Chốt WordPress hoặc Shopify</strong> — bảng quyết định trên.</li>
  <li><strong>Thiết kế UI:</strong> Mobile-first, checkout tối giản.</li>
  <li><strong>Lập trình + tích hợp:</strong> Thanh toán VN, shipping, GA4, pixel ads.</li>
  <li><strong>Nhập sản phẩm &amp; test:</strong> COD, MoMo, email xác nhận.</li>
  <li><strong>SEO on-page:</strong> Meta sản phẩm, schema Product.</li>
  <li><strong>Go-live &amp; đào tạo:</strong> Quản lý đơn, đổi giá, backup.</li>
</ol>

<p><strong>Thời gian:</strong> WordPress shop 3–6 tuần; Shopify 2–4 tuần (theme sẵn nhanh hơn).</p>

<h2 id="sai-lam">Sai lầm khi chọn WordPress hay Shopify</h2>

<ul>
  <li>Chọn Shopify vì “đang hot” — trong khi cần SEO blog VN dài hạn.</li>
  <li>Chọn WordPress rồi không bảo trì — hack, chậm, mất dữ liệu.</li>
  <li>Cài 30 plugin WooCommerce — web nặng, Core Web Vitals đỏ.</li>
  <li>Quên tính phí Shopify 12–36 tháng — chỉ so chi phí thiết kế ban đầu.</li>
  <li>Shop VN mà không test COD + MoMo trước go-live.</li>
  <li>Copy sản phẩm đối thủ — SEO trùng lặp, không khác biệt.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-wordpress`,
    label: "Thiết kế website WordPress",
    desc: "Ưu nhược WP cho doanh nghiệp.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-thuong-mai-dien-tu`,
    label: "Website thương mại điện tử",
    desc: "Checklist shop online VN.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-shopify-quoc-te`,
    label: "Website Shopify quốc tế",
    desc: "Bán hàng cross-border.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn chọn nền tảng",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Nên chọn WordPress hay Shopify cho shop nhỏ Việt Nam?",
      a: "Shop nhỏ VN, COD nhiều, cần SEO blog — thường WordPress + WooCommerce. Cần mở nhanh, ít quản trị kỹ thuật — Shopify cân nhắc.",
    },
    {
      q: "WordPress có bán hàng tốt như Shopify không?",
      a: "Có — WooCommerce đủ mạnh cho shop vừa. Shopify tiện vận hành hơn; WordPress linh hoạt SEO và tùy biến hơn.",
    },
    {
      q: "Chi phí WordPress rẻ hơn Shopify không?",
      a: "Dài hạn thường rẻ hơn (không phí tháng SaaS). Năm đầu có thể ngang nhau khi cộng thiết kế + hosting vs Shopify + app.",
    },
    {
      q: "Shopify có SEO tốt không?",
      a: "Ổn cho shop cơ bản. WordPress mạnh hơn cho content marketing và SEO sâu nhiều trang.",
    },
    {
      q: "Có thể chuyển từ Shopify sang WordPress không?",
      a: "Có — export sản phẩm, redirect 301 URL. Nên thuê agency có kinh nghiệm migration để giữ SEO.",
    },
    {
      q: "WooCommerce có tích hợp VNPay MoMo không?",
      a: "Có — plugin phổ biến tại VN. Kiểm tra phiên bản và phí cổng trước triển khai.",
    },
    {
      q: "Bứt Phá thiết kế WordPress hay Shopify?",
      a: "Cả hai — tư vấn theo mô hình shop của bạn. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
    {
      q: "Shop chỉ chạy Facebook Ads có cần WordPress không?",
      a: "Không bắt buộc — landing Shopify hoặc WordPress đều được. WordPress lợi thế nếu sau này làm SEO organic.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website wordpress hay shopify</strong> không phải cuộc chiến “cái nào tốt hơn” — mà là <em>cái nào phù hợp mô hình</em> của bạn: WordPress + WooCommerce cho linh hoạt, SEO và thị trường VN; Shopify cho tốc độ ra mắt, vận hành nhẹ và bán quốc tế. Hãy liệt kê SKU, kênh thanh toán, nguồn traffic và ngân sách 12 tháng trước khi ký hợp đồng.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — chúng tôi triển khai cả hai nền tảng và đề xuất hướng tối ưu chi phí–hiệu quả cho shop của bạn.`,
  ],
  ctaLabel: "→ Tư vấn WordPress hay Shopify",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
