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

const KEYWORD = "thiết kế website bán hàng";
const TITLE = "Thiết Kế Website Bán Hàng Tăng Tỷ Lệ Chuyển Đổi";

export const REWRITE_THIET_KE_WEBSITE_BAN_HANG = {
  title: TITLE,
  slug: "thiet-ke-website-ban-hang",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website bán hàng online, tăng chuyển đổi, cro website, shop online, thiết kế web bán hàng",
  metaTitle: "Thiết Kế Website Bán Hàng Tăng Chuyển Đổi | CRO & UX | Bứt Phá",
  metaDescription:
    "Hướng dẫn thiết kế website bán hàng: UX mua sắm, trang sản phẩm, giỏ hàng, thanh toán, CRO và SEO. Tăng tỷ lệ chuyển đổi trên mobile. Tư vấn miễn phí.",
  description:
    "Cách thiết kế website bán hàng tối ưu hành trình mua — từ xem sản phẩm đến thanh toán — nhằm tăng tỷ lệ chuyển đổi và doanh số online.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Bán Hàng Tăng Chuyển Đổi | CRO & UX | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "ban-hang-la-gi", label: "Website bán hàng là gì?" },
  { id: "vi-sao-can-web-rieng", label: "Vì sao cần web riêng, không chỉ sàn?" },
  { id: "hanh-trinh-mua", label: "Hành trình mua & điểm chuyển đổi" },
  { id: "trang-san-pham", label: "Thiết kế trang sản phẩm chuẩn CRO" },
  { id: "gio-hang-checkout", label: "Giỏ hàng & checkout" },
  { id: "thanh-toan-van-chuyen", label: "Thanh toán & vận chuyển" },
  { id: "mobile-cro", label: "Mobile & tốc độ tải" },
  { id: "seo-ban-hang", label: "SEO cho website bán hàng" },
  { id: "bang-gia", label: "Chi phí thiết kế website bán hàng" },
  { id: "checklist", label: "Checklist trước khi launch" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} là quá trình xây dựng shop online — giao diện, luồng mua hàng, giỏ hàng, thanh toán và nội dung sản phẩm — được tối ưu để khách không chỉ “xem” mà thực sự đặt hàng. Khác website giới thiệu, web bán hàng đo thành công bằng tỷ lệ chuyển đổi (conversion rate), giá trị đơn trung bình (AOV) và tỷ lệ bỏ giỏ (cart abandonment).`,
    `Bài viết bám tiêu đề <em>${TITLE}</em>: phân tích từng điểm chạm khiến khách mua hoặc bỏ cuộc, cách thiết kế trang sản phẩm thuyết phục, checkout ít ma sát và tích hợp thanh toán phổ biến tại Việt Nam. Phù hợp shop D2C, thương hiệu mỹ phẩm, thời trang, đồ gia dụng và doanh nghiệp muốn bán song song trên website riêng lẫn sàn TMĐT.`,
  ],
})}

${wpKeyTakeaways([
  "Conversion rate shop VN thường 1–3% — tăng 0,5% đã cải thiện doanh thu đáng kể.",
  "Ảnh sản phẩm, giá rõ, phí ship sớm và review thật là 4 yếu tố tin cậy hàng đầu.",
  "Checkout tối đa 3 bước trên mobile; hỗ trợ COD, MoMo, VNPay là bắt buộc thị trường VN.",
  "Web bán hàng cần nhanh (&lt;3s LCP) — mỗi giây chậm có thể giảm conversion ~7%.",
  "Gói Kinh doanh (9 triệu) Bứt Phá phù hợp shop cần CRO + tích hợp marketing.",
])}

${wpImg(2, "Thiết kế website bán hàng tăng tỷ lệ chuyển đổi")}

<h2 id="ban-hang-la-gi">Website bán hàng là gì?</h2>

<p><strong>Website bán hàng</strong> (e-commerce website) là hệ thống web cho phép khách xem catalog, thêm giỏ, thanh toán và nhận xác nhận đơn — không cần qua trung gian sàn (hoặc song song với sàn). Gồm: trang danh mục, trang chi tiết sản phẩm (PDP), giỏ hàng, checkout, tài khoản khách (tùy chọn), trang chính sách đổi trả.</p>

<p><strong>${KEYWORD}</strong> chuyên nghiệp phải giải quyết hai bài toán:</p>
<ul>
  <li><strong>UX (trải nghiệm):</strong> Tìm sản phẩm nhanh, tin tưởng, mua dễ.</li>
  <li><strong>CRO (tối ưu chuyển đổi):</strong> Giảm bước thừa, tăng động lực hoàn tất đơn.</li>
</ul>

<h3>Website bán hàng vs catalog online</h3>
<p>Catalog chỉ hiển thị sản phẩm + form báo giá — phù hợp B2B, máy móc giá trị cao. Website bán hàng có luồng thanh toán trực tiếp — phù hợp SKU rõ giá, hàng tiêu dùng, repeat purchase.</p>

<h2 id="vi-sao-can-web-rieng">Vì sao cần website bán hàng riêng, không chỉ bán trên sàn?</h2>

<p>Shopee, Lazada, TikTok Shop giúp có traffic sẵn — nhưng phí sàn, cạnh tranh giá và không sở hữu dữ liệu khách là hạn chế lớn. <strong>${KEYWORD}</strong> riêng mang lại:</p>

<ul>
  <li><strong>Sở hữu dữ liệu:</strong> Email, SĐT, lịch sử mua — remarketing, CRM, Zalo OA.</li>
  <li><strong>Thương hiệu:</strong> Giao diện độc quyền, storytelling, không lẫn giữa hàng nghìn shop.</li>
  <li><strong>Biên lợi nhuận:</strong> Không phí giao dịch sàn (hoặc thấp hơn nhiều).</li>
  <li><strong>Chiến dịch ads:</strong> Facebook/Google Ads trỏ về web — pixel tracking chính xác.</li>
</ul>

<p>Mô hình phổ biến: <em>sàn để có đơn + website để xây fan trung thành và upsell</em>.</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Sàn TMĐT</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Website bán hàng riêng</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Traffic ban đầu</td>
      <td class="border border-indigo-100 px-3 py-2">Cao (sẵn người mua)</td>
      <td class="border border-indigo-100 px-3 py-2">Cần ads/SEO</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Phí &amp; margin</td>
      <td class="border border-indigo-100 px-3 py-2">Phí sàn, hoa hồng</td>
      <td class="border border-indigo-100 px-3 py-2">Hosting + payment fee</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Dữ liệu khách</td>
      <td class="border border-indigo-100 px-3 py-2">Hạn chế</td>
      <td class="border border-indigo-100 px-3 py-2">Toàn quyền</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Tùy biến CRO</td>
      <td class="border border-indigo-100 px-3 py-2">Template sàn</td>
      <td class="border border-indigo-100 px-3 py-2">Toàn bộ luồng mua</td>
    </tr>
  </tbody>
</table>

<h2 id="hanh-trinh-mua">Hành trình mua hàng và điểm chuyển đổi</h2>

<p>Phễu e-commerce chuẩn khi <strong>${KEYWORD}</strong>:</p>

<ol>
  <li><strong>Nhận biết:</strong> Ads, SEO, mạng xã hội → landing/trang chủ</li>
  <li><strong>Quan tâm:</strong> Danh mục, filter, tìm kiếm</li>
  <li><strong>Cân nhắc:</strong> Trang sản phẩm — ảnh, mô tả, review, so sánh</li>
  <li><strong>Mua:</strong> Thêm giỏ → checkout → thanh toán</li>
  <li><strong>Giữ chân:</strong> Email/Zalo xác nhận, upsell, voucher lần sau</li>
</ol>

<p>Mỗi bước có “điểm rơi”. Thiết kế tốt xác định drop-off bằng GA4 funnel và sửa đúng chỗ — không chỉ đổi màu nút bừa bãi.</p>

<blockquote><p><strong>Ví dụ thực tế:</strong> Shop thời trang phát hiện 60% khách rời ở trang sản phẩm vì thiếu bảng size — bổ sung size chart + video mặc thử có thể tăng add-to-cart 15–25% mà không tăng ngân sách ads.</p></blockquote>

${wpImg(0, "Hành trình mua hàng trên website bán hàng online")}

<h2 id="trang-san-pham">Thiết kế trang sản phẩm (PDP) chuẩn CRO</h2>

<p>Trang sản phẩm là nơi quyết định mua. Checklist <strong>${KEYWORD}</strong> cho PDP:</p>

<h3>Hình ảnh &amp; video</h3>
<ul>
  <li>Ảnh độ phân giải cao, nền sạch, zoom được trên mobile</li>
  <li>Nhiều góc: chi tiết, packaging, context sử dụng</li>
  <li>Video ngắn 15–30 giây nếu sản phẩm cần demo</li>
</ul>

<h3>Thông tin bán hàng</h3>
<ul>
  <li>Giá gốc / giá khuyến mãi / % giảm — hiển thị rõ, không ẩn phí</li>
  <li>Tồn kho (“Còn 3 sản phẩm”) tạo urgency — chỉ khi thật</li>
  <li>Biến thể: size, màu, combo — chọn trước khi thêm giỏ</li>
  <li>Mô tả: lợi ích trước, thông số sau; bullet dễ scan</li>
</ul>

<h3>Tín hiệu tin cậy (trust)</h3>
<ul>
  <li>Review có ảnh khách thật, số sao trung bình</li>
  <li>Chính sách đổi trả 7–30 ngày, bảo hành</li>
  <li>Logo đối tác vận chuyển, thanh toán an toàn</li>
  <li>Hotline / chat Zalo ngay trên PDP</li>
</ul>

<h3>CTA nổi bật</h3>
<p>Nút <strong>“Thêm vào giỏ”</strong> và <strong>“Mua ngay”</strong> cố định cuối màn hình mobile (sticky). Màu tương phản với nền. Tránh CTA quá nhỏ — ngón cái phải bấm dễ.</p>

${wpImg(3, "Trang sản phẩm website bán hàng chuẩn CRO")}

<h2 id="gio-hang-checkout">Giỏ hàng và checkout — giảm bỏ giỏ</h2>

<p>Tỷ lệ bỏ giỏ trung bình e-commerce toàn cầu ~70%. Tại Việt Nam, nguyên nhân hay gặp:</p>
<ul>
  <li>Phí ship hiện ở bước cuối (sticker shock)</li>
  <li>Bắt đăng ký tài khoản trước khi mua</li>
  <li>Form dài, không autofill địa chỉ</li>
  <li>Không có COD — nhiều khách vẫn thích trả khi nhận</li>
</ul>

<h3>Best practice checkout</h3>
<ol>
  <li><strong>Guest checkout:</strong> Mua không cần tạo tài khoản (đăng ký sau)</li>
  <li><strong>3 bước tối đa:</strong> Thông tin → Vận chuyển → Thanh toán</li>
  <li><strong>Hiển thị phí ship sớm:</strong> Ước tính ngay trên giỏ hoặc PDP</li>
  <li><strong>Progress bar:</strong> Khách biết còn bao nhiêu bước</li>
  <li><strong>Tóm tắt đơn:</strong> Ảnh thu nhỏ, số lượng, tổng tiền luôn hiển thị</li>
</ol>

<p>Sau khi <strong>${KEYWORD}</strong>, thiết lập email/SMS abandoned cart (nhắc giỏ bỏ quên sau 1h, 24h) — thường hồi 5–15% đơn.</p>

<h2 id="thanh-toan-van-chuyen">Thanh toán và vận chuyển tại Việt Nam</h2>

<p>Cổng thanh toán nên hỗ trợ:</p>
<ul>
  <li><strong>COD</strong> (thu hộ) — vẫn chiếm tỷ lệ lớn nhiều ngành</li>
  <li><strong>Chuyển khoản / QR</strong> — phổ biến SME</li>
  <li><strong>Ví điện tử:</strong> MoMo, ZaloPay, ShopeePay</li>
  <li><strong>Thẻ / cổng:</strong> VNPay, OnePay, Stripe (nếu bán quốc tế)</li>
</ul>

<p>Vận chuyển: tích hợp GHN, GHTK, Viettel Post — hiển thị phí và thời gian giao theo tỉnh. Miễn ship ngưỡng đơn (vd: “Freeship đơn từ 500k”) nên hiện từ trang chủ và giỏ.</p>

<h3>Vận hành sau đơn</h3>
<p>Email xác nhận tự động, mã vận đơn, trang tra cứu đơn. Dashboard admin: doanh thu, sản phẩm bán chạy, tồn kho. Đồng bộ tồn kho web + sàn nếu bán đa kênh.</p>

${wpImg(1, "Thanh toán và vận chuyển trên website bán hàng")}

<h2 id="mobile-cro">Mobile-first và tốc độ — yếu tố chuyển đổi</h2>

<p>70–80% traffic shop VN từ điện thoại. <strong>${KEYWORD}</strong> bắt buộc mobile-first:</p>
<ul>
  <li>Menu danh mục dạng drawer, search nổi bật</li>
  <li>Giỏ hàng icon + số lượng trên header sticky</li>
  <li>Ảnh sản phẩm tối ưu WebP, LCP &lt; 2,5s</li>
  <li>Form checkout: bàn phím số cho SĐT, dropdown tỉnh/huyện chuẩn VN</li>
</ul>

<p>Test trên thiết bị thật (Android tầm trung) — không chỉ iPhone simulator. PageSpeed mobile dưới 50 thường đi kèm conversion kém.</p>

<h2 id="seo-ban-hang">SEO cho website bán hàng</h2>

<p>Bán hàng vẫn cần organic traffic miễn phí:</p>
<ul>
  <li>URL sản phẩm: <code>/san-pham/ten-san-pham</code> — title unique có từ khóa</li>
  <li>Meta description hấp dẫn click (giá, USP)</li>
  <li>Schema Product (giá, availability) — không đánh dấu giả</li>
  <li>Blog hỗ trợ: “cách chọn…”, “so sánh…” → internal link tới PDP</li>
  <li>Tránh duplicate: 1 sản phẩm 1 URL; canonical đúng khi có filter</li>
</ul>

<p>Kết hợp bài <a href="${SITE}/blog/thiet-ke-website-chuan-seo">thiết kế website chuẩn SEO</a> để technical ổn từ đầu.</p>

${wpImg(4, "SEO và mobile cho website bán hàng online")}

<h2 id="bang-gia">Chi phí thiết kế website bán hàng</h2>

<p>Chi phí <strong>${KEYWORD}</strong> phụ thuộc số SKU, tích hợp thanh toán và mức tùy biến:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói Bứt Phá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp shop</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Tối ưu</td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Shop nhỏ, catalog + form đặt hàng</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Kinh doanh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">TMĐT CRO, CRM, chatbot, tracking ads</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Hệ thống</td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Đa kênh, API, tồn kho, automation</td>
    </tr>
  </tbody>
</table>

<p>Chưa gồm: phí cổng thanh toán (% giao dịch), hosting (gói 5–10GB+ nếu nhiều ảnh), phí vận chuyển. Xem chi tiết tại <a href="${SITE}/website">trang dịch vụ website</a>.</p>

<h2 id="checklist">Checklist trước khi launch shop online</h2>

<ol>
  <li>☐ Test đặt hàng thật (COD + ít nhất 1 cổng online)</li>
  <li>☐ Email/SMS xác nhận đơn hoạt động</li>
  <li>☐ Chính sách đổi trả, bảo mật, điều khoản hiển thị rõ</li>
  <li>☐ GA4 + pixel Facebook/Google events (AddToCart, Purchase)</li>
  <li>☐ Ảnh sản phẩm đồng bộ, mô tả không copy sàn</li>
  <li>☐ Mobile: sticky CTA, giỏ, checkout 3 bước</li>
  <li>☐ PageSpeed mobile ≥ 60, không lỗi 404 sản phẩm</li>
</ol>

${wpImg(5, "Checklist launch website bán hàng thành công")}

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Tổng quan làm web, bảng giá và quy trình.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-thuong-mai-dien-tu`,
    label: "Thiết kế website thương mại điện tử",
    desc: "Giải pháp TMĐT quy mô lớn hơn.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-chuan-seo`,
    label: "Website chuẩn SEO",
    desc: "Kỹ thuật SEO cho shop online.",
  },
  {
    href: `${SITE}/website`,
    label: "Dịch vụ thiết kế website",
    desc: "Đăng ký tư vấn gói Kinh doanh / Hệ thống.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website bán hàng mất bao lâu?",
      a: "Shop cơ bản 50–200 SKU: 3–5 tuần. TMĐT tích hợp thanh toán, vận chuyển, đa kênh: 6–10 tuần tùy phạm vi.",
    },
    {
      q: "Nên dùng WooCommerce, Shopify hay code riêng?",
      a: "WooCommerce linh hoạt, chi phí plugin. Shopify nhanh, phí tháng. Code riêng (Next.js + headless) tốc độ cao, tùy biến sâu — chọn theo quy mô và team vận hành.",
    },
    {
      q: "Làm sao tăng tỷ lệ chuyển đổi website bán hàng?",
      a: "Tối ưu PDP (ảnh, review, size), checkout ngắn, hiện phí ship sớm, COD, tốc độ mobile, remarketing giỏ bỏ. Đo funnel GA4 để sửa đúng bước rơi.",
    },
    {
      q: "Website bán hàng có cần app mobile không?",
      a: "Giai đoạn đầu ưu tiên web responsive + PWA. App native khi có lượng khách quay lại lớn và ngân sách duy trì.",
    },
    {
      q: "Chi phí duy trì shop online hàng năm?",
      a: "Hosting 5–16GB (~5–16 triệu/năm), tên miền ~350k, phí cổng thanh toán theo giao dịch, có thể thêm gói chăm sóc content SEO.",
    },
    {
      q: "Bán trên sàn rồi có cần website không?",
      a: "Nên có — để sở hữu khách, remarketing và giảm phụ thuộc phí sàn. Nhiều thương hiệu dùng web làm hub chính thức.",
    },
    {
      q: "Gói nào của Bứt Phá phù hợp shop mới?",
      a: "Shop cần CRO và tracking ads: gói Kinh doanh 9 triệu. Catalog nhỏ, đặt hàng qua form: gói Tối ưu 6 triệu.",
    },
    {
      q: "Có tích hợp đồng bộ Shopee/Lazada không?",
      a: "Gói Hệ thống hỗ trợ tích hợp API/tồn kho theo yêu cầu. Cần khảo sát riêng tùy sàn và ERP đang dùng.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `${KEYWORD} hiệu quả là web vừa đẹp vừa “bán được”: hành trình mua mạch lạc, trang sản phẩm thuyết phục, checkout ít ma sát và đo conversion liên tục. Tăng tỷ lệ chuyển đổi 0,5–1% đôi khi quan trọng hơn tăng gấp đôi traffic.`,
    `Bắt đầu từ MVP shop gọn — COD, ảnh tốt, mobile nhanh — rồi mở rộng tích hợp và automation khi doanh số ổn. Đừng launch shop thiếu test đặt hàng thật và tracking purchase event.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website bán hàng miễn phí",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
