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

const KEYWORD = "thiết kế website du lịch tour";
const TITLE = "Thiết Kế Website Du Lịch Tour Và Đặt Tour Online";

export const REWRITE_THIET_KE_WEBSITE_DU_LICH_TOUR = {
  title: TITLE,
  slug: "thiet-ke-website-du-lich-tour",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website đặt tour online, tour du lịch website, booking tour việt nam, công ty lữ hành web",
  metaTitle: "Thiết Kế Website Du Lịch Tour | Đặt Tour Online 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website du lịch tour: package tour, lịch khởi hành, đặt tour MoMo/VNPay, SEO điểm đến. Quy trình 7 bước, giá 8–18 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website du lịch tour và đặt tour online: showcase package, booking, thanh toán và SEO tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Du Lịch Tour | Đặt Tour Online 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "tour-web-la-gi", label: "Website tour là gì?" },
  { id: "loai-hinh", label: "Loại hình tour online" },
  { id: "cau-truc", label: "Cấu trúc website du lịch" },
  { id: "package-tour", label: "Trang package tour" },
  { id: "dat-tour", label: "Đặt tour & thanh toán" },
  { id: "lich-khoi-hanh", label: "Lịch khởi hành & slot" },
  { id: "seo-diem-den", label: "SEO điểm đến" },
  { id: "marketing", label: "Marketing tour online" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website du lịch tour</strong> là xây dựng nền tảng web cho công ty lữ hành, travel agency hoặc KOL tour — trưng bày <em>package tour</em> (Đà Lạt 3N2Đ, Phú Quốc 4N3Đ, Tây Bắc mùa lúa…), lịch khởi hành, giá trọn gói, lịch trình chi tiết và form <em>đặt tour online</em> với thanh toán cọc MoMo/VNPay — thay vì chỉ bán qua Facebook và Excel thủ công.`,
    `Bài viết dành cho chủ công ty tour, sales du lịch và marketer travel đang cần <strong>${KEYWORD}</strong>: cấu trúc trang tour chuẩn conversion, quản lý slot chỗ, SEO điểm đến, tích hợp payment Việt Nam và mức giá triển khai 2026.`,
  ],
})}

${wpKeyTakeaways([
  "Tour web = catalog package + lịch khởi hành + booking — không chỉ album ảnh.",
  "Giá trọn gói + inclusion/exclusion rõ — giảm tranh chấp sau tour.",
  "Cọc online 30–50% — MoMo/VNPay tăng chốt đơn so với chuyển khoản thủ công.",
  "SEO “tour [điểm đến] [số ngày]” — traffic organic mùa cao điểm.",
  "Bứt Phá: website tour 8–18 triệu tùy số package và booking engine.",
])}

${wpImg(1, "Thiết kế website du lịch tour đặt tour online package và lịch khởi hành")}

<h2 id="tour-web-la-gi">Website du lịch tour là gì?</h2>

<p><strong>Website du lịch tour</strong> là site chuyên cho doanh nghiệp bán tour trọn gói — khác OTA (Traveloka, Klook) vì bạn sở hữu brand và data khách. <strong>Thiết kế website du lịch tour</strong> thường gồm:</p>

<ul>
  <li><strong>Catalog tour:</strong> Danh sách tour theo vùng, thời lượng, giá</li>
  <li><strong>Trang chi tiết tour:</strong> Lịch trình ngày, inclusion, exclusion, hotel</li>
  <li><strong>Lịch khởi hành:</strong> Ngày có tour, số chỗ còn</li>
  <li><strong>Booking:</strong> Form đặt + thanh toán cọc/toàn phần</li>
  <li><strong>Review &amp; gallery:</strong> Ảnh tour thực tế, testimonial</li>
  <li><strong>Blog SEO:</strong> “Kinh nghiệm đi Phú Quốc 4 ngày” → link tour</li>
</ul>

<h2 id="loai-hinh">Loại hình tour phù hợp website booking</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Loại tour</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Đặc thù web</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tour nội địa fixed date</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Lịch khởi hành cố định, ghép đoàn, đếm slot</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tour private / custom</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Form báo giá, không giá cố định — sales follow-up</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tour outbound</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Visa info, multi-currency (USD), installment</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Experience / day tour</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Booking theo ngày, time slot — trekking, diving</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>MICE / corporate</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Lead form B2B, portfolio sự kiện — ít checkout online</td>
    </tr>
  </tbody>
</table>

<h2 id="cau-truc">Cấu trúc website du lịch tour chuẩn</h2>

<ol>
  <li><strong>Trang chủ:</strong> Tour hot, mùa cao điểm, UGC review, search tour</li>
  <li><strong>Danh mục:</strong> Miền Bắc / Trung / Nam, Biển / Núi / Tây Nguyên</li>
  <li><strong>Chi tiết tour:</strong> Hero ảnh, giá từ, duration, highlights</li>
  <li><strong>Itinerary:</strong> Timeline Day 1 → Day N — accordion mobile</li>
  <li><strong>Inclusion / Exclusion:</strong> Bao gồm vé máy bay? bữa ăn? tip?</li>
  <li><strong>Departure calendar:</strong> Chọn ngày → còn X chỗ</li>
  <li><strong>Booking widget:</strong> Số người, loại phòng, tổng tiền, cọc</li>
  <li><strong>Chính sách:</strong> Hủy tour, hoàn cọc, bảo hiểm</li>
</ol>

${wpImg(2, "Trang chi tiết tour du lịch — itinerary lịch trình và form đặt tour online")}

<h2 id="package-tour">Trang package tour — nội dung conversion</h2>

<p>Mỗi package trong <strong>${KEYWORD}</strong> cần:</p>

<ul>
  <li><strong>Headline:</strong> “Phú Quốc 4N3Đ — Resort 4 sao — Bay VietJet”</li>
  <li><strong>Giá “từ”:</strong> Rõ điều kiện — người lớn, phụ thu trẻ em, single room</li>
  <li><strong>Gallery:</strong> Ảnh tour leader chụp thật — không chỉ stock</li>
  <li><strong>Video (tùy chọn):</strong> Reel 30s highlight — embed lazy load</li>
  <li><strong>FAQ tour:</strong> Mang giấy tờ gì? trẻ em bao nhiêu tuổi? đổi ngày được không?</li>
  <li><strong>Sticky CTA mobile:</strong> “Đặt tour — cọc 30%”</li>
</ul>

<h2 id="dat-tour">Đặt tour online &amp; thanh toán</h2>

<h3>Flow booking chuẩn</h3>
<ol>
  <li>Chọn tour + ngày khởi hành</li>
  <li>Nhập số người (NL/TE/EB) — tính giá realtime</li>
  <li>Thông tin liên hệ + ghi chú (ăn chay, dị ứng…)</li>
  <li>Thanh toán cọc hoặc full — MoMo/VNPay/chuyển khoản</li>
  <li>Email xác nhận + mã booking + checklist chuẩn bị</li>
</ol>

<h3>Thanh toán tại Việt Nam</h3>
<ul>
  <li><strong>Cọc 30–50%:</strong> Phổ biến tour nội địa — số dư trước ngày đi 7–15 ngày</li>
  <li><strong>MoMo / VNPay / ZaloPay:</strong> QR trên mobile — conversion cao</li>
  <li><strong>Chuyển khoản:</strong> Hiển thị nội dung CK + upload bill (manual confirm)</li>
  <li><strong>Trả góp:</strong> Tour outbound giá cao — 3–6 kỳ qua đối tác</li>
  <li><strong>Hóa đơn VAT:</strong> Form MST cho khách công ty</li>
</ul>

<h2 id="lich-khoi-hanh">Lịch khởi hành, slot &amp; quản lý chỗ</h2>

<ul>
  <li><strong>Fixed departure:</strong> Admin set ngày + max pax — auto “Hết chỗ”</li>
  <li><strong>Minimum pax:</strong> “Cam kết khởi hành từ 10 khách” — hiển thị số đã đăng ký</li>
  <li><strong>Waitlist:</strong> Tour full — thu email báo khi có chỗ</li>
  <li><strong>Private tour:</strong> “Liên hệ báo giá” — không hiện lịch cố định</li>
  <li><strong>Sync Excel/CRM:</strong> Export booking hàng ngày cho điều hành</li>
</ul>

<h2 id="seo-diem-den">SEO điểm đến &amp; content marketing</h2>

<ul>
  <li><strong>Landing SEO:</strong> “Tour Đà Lạt 3 ngày 2 đêm giá tốt 2026”</li>
  <li><strong>Blog cluster:</strong> Kinh nghiệm → link tour liên quan</li>
  <li><strong>Schema TouristTrip / Product:</strong> JSON-LD giá, duration (tùy phù hợp)</li>
  <li><strong>Internal link:</strong> Tour miền Bắc ↔ blog Sapa ↔ tour Tây Bắc</li>
  <li><strong>Review schema:</strong> Rating tour thật — tăng CTR SERP</li>
</ul>

<p>Xem thêm <a href="${SITE}/blog/thiet-ke-website-da-nang-du-lich">website Đà Nẵng du lịch</a> cho góc local SEO.</p>

<h2 id="marketing">Marketing tour qua website</h2>

<ul>
  <li><strong>Facebook/TikTok Ads:</strong> Video tour thật → landing tour cụ thể</li>
  <li><strong>Flash sale Tết / hè:</strong> Countdown giá — urgency có deadline thật</li>
  <li><strong>Email remarketing:</strong> Khách xem tour chưa book — gửi offer 48h</li>
  <li><strong>Affiliate/KOL:</strong> Mã giới thiệu — tracking commission</li>
  <li><strong>Zalo OA:</strong> Tư vấn itinerary — nút chat trên mọi trang tour</li>
  <li><strong>UGC:</strong> Hashtag tour — repost ảnh khách lên gallery</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website tour — 7 bước</h2>

<ol>
  <li><strong>Audit tour hiện có:</strong> Package, giá, lịch, inclusion template.</li>
  <li><strong>Sitemap &amp; wireframe:</strong> Catalog, detail, booking flow mobile.</li>
  <li><strong>UI design:</strong> Travel aesthetic — ảnh lớn, trust badge, màu fresh.</li>
  <li><strong>Dev + CMS tour:</strong> Nhập tour, ngày khởi hành, giá tier.</li>
  <li><strong>Payment + email:</strong> Cọc MoMo/VNPay, confirm booking template.</li>
  <li><strong>Seed 5–10 tour:</strong> Content itinerary đầy đủ — test book end-to-end.</li>
  <li><strong>Launch + SEO:</strong> Submit sitemap, ads mùa thấp điểm test ROAS.</li>
</ol>

<p><strong>Thời gian:</strong> 4–8 tuần (catalog + booking); 8–12 tuần nếu custom engine phức tạp.</p>

<h2 id="bang-gia">Bảng giá thiết kế website du lịch tour 2026</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói Bứt Phá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Bao gồm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tour Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">8.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">10 tour, form đặt email, gallery, blog cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tour Booking</strong></td>
      <td class="border border-indigo-100 px-3 py-2">13.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Lịch khởi hành, tính giá NL/TE, MoMo/VNPay cọc</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tour Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">18.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Không giới hạn tour, waitlist, affiliate, SEO schema</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bảo trì</strong></td>
      <td class="border border-indigo-100 px-3 py-2">2.500.000đ/tháng</td>
      <td class="border border-indigo-100 px-3 py-2">Cập nhật lịch, backup, hỗ trợ booking</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website tour</h2>

<ul>
  <li>Giá web khác giá sales Zalo — mất niềm tin.</li>
  <li>Itinerary mơ hồ — “tham quan các điểm đẹp” không cụ thể.</li>
  <li>Không ghi exclusion — khách tranh vé, bữa ăn sau tour.</li>
  <li>Booking không confirm email — khách lo lắng chưa giữ chỗ.</li>
  <li>Web chậm mobile — ảnh tour 5MB chưa nén.</li>
  <li>Overbook slot — không sync với Excel điều hành.</li>
  <li>Ảnh stock Maldives cho tour Phú Yên — expectation sai.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-da-nang-du-lich`,
    label: "Website Đà Nẵng du lịch",
    desc: "Local travel SEO.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-dat-phong-khach-san`,
    label: "Website đặt phòng khách sạn",
    desc: "Booking hospitality.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-tich-hop-thanh-toan`,
    label: "Tích hợp thanh toán",
    desc: "MoMo, VNPay cọc tour.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn website tour",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website du lịch tour giá bao nhiêu?",
      a: "Tại Bứt Phá từ 8.000.000đ (catalog + form) đến 18.000.000đ (booking engine đầy đủ). Báo giá theo số tour và payment online.",
    },
    {
      q: "Website tour có cạnh tranh được Traveloka không?",
      a: "Không cùng sân OTA — web riêng xây brand, data khách và tour độc quyền. OTA là kênh bổ sung, không thay web.",
    },
    {
      q: "Có quản lý lịch khởi hành và số chỗ không?",
      a: "Có — gói Booking trở lên: set ngày, max pax, auto hết chỗ. Export danh sách khách cho điều hành.",
    },
    {
      q: "Khách đặt tour online có cần giấy tờ gì?",
      a: "Form thu CCCD/passport tùy tour. Email gửi checklist chuẩn bị sau confirm — tùy chính sách công ty.",
    },
    {
      q: "Tour private không có giá cố định làm sao?",
      a: "Trang tour “Báo giá theo yêu cầu” — form số người, ngày, budget. Sales gọi lại trong 24h.",
    },
    {
      q: "SEO tour mất bao lâu có kết quả?",
      a: "3–6 tháng cho từ khóa cạnh tranh vừa. Blog + internal link tăng tốc. Ads bù traffic mùa cao điểm.",
    },
    {
      q: "Bao lâu go-live website tour?",
      a: "4–8 tuần với 10–20 tour content sẵn. Rush 3 tuần nếu dùng template + ít tour pilot.",
    },
    {
      q: "Bứt Phá có thiết kế website du lịch tour không?",
      a: "Có — công ty lữ hành, agency tour, KOL tour. Catalog + booking + payment VN. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website du lịch tour</strong> hiệu quả = package rõ itinerary + lịch khởi hành minh bạch + booking cọc online mượt + SEO điểm đến — biến Facebook post thành hệ thống bán tour scale được.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — số package, booking engine và báo giá theo quy mô công ty tour của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website du lịch tour",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
