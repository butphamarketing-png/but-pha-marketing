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

const KEYWORD = "thiết kế website sự kiện";
const TITLE = "Thiết Kế Website Sự Kiện Và Đăng Ký Tham Dự";

export const REWRITE_THIET_KE_WEBSITE_SU_KIEN_EVENT = {
  title: TITLE,
  slug: "thiet-ke-website-su-kien-event",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website sự kiện, event landing page, đăng ký sự kiện online, bán vé sự kiện",
  metaTitle: "Thiết Kế Website Sự Kiện | Đăng Ký & Vé 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website sự kiện: landing hội thảo, form đăng ký, bán vé MoMo/VNPay và check-in QR. Quy trình 7 bước, giá 6–16 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website sự kiện và đăng ký tham dự: event landing, agenda, speaker, vé online và check-in tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Sự Kiện | Đăng Ký & Vé 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "event-web-la-gi", label: "Website sự kiện là gì?" },
  { id: "loai-su-kien", label: "Loại sự kiện cần web" },
  { id: "landing-vs-hub", label: "Landing vs event hub" },
  { id: "cau-truc", label: "Cấu trúc trang sự kiện" },
  { id: "dang-ky-ve", label: "Đăng ký & bán vé" },
  { id: "thanh-toan", label: "Thanh toán MoMo/VNPay" },
  { id: "checkin-qr", label: "Check-in QR & email vé" },
  { id: "marketing", label: "Marketing sự kiện" },
  { id: "seo-schema", label: "SEO & schema Event" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website sự kiện</strong> là xây dựng trang web (hoặc landing) chuyên cho một sự kiện cụ thể — hội thảo, workshop, gala, triển lãm, concert, networking — nơi khách xem thông tin (thời gian, địa điểm, agenda, diễn giả), <em>đăng ký tham dự</em> hoặc <em>mua vé online</em>, nhận email xác nhận và mã QR check-in tại cửa.`,
    `Bài viết dành cho event organizer, marketing agency và doanh nghiệp B2B đang cần <strong>${KEYWORD}</strong>: cấu trúc event landing chuẩn CRO, form RSVP, bán vé có phí/miễn phí, tích hợp thanh toán Việt Nam, check-in ngày sự kiện và mức giá triển khai 2026.`,
  ],
})}

${wpKeyTakeaways([
  "Event web = 1 URL tập trung mọi thông tin — thay PDF + Google Form rời rạc.",
  "Agenda + speaker + countdown tăng đăng ký — CTA rõ trên mobile.",
  "Vé miễn phí vẫn cần form — thu lead và số lượng chính xác.",
  "Email vé + QR check-in — giảm queue ngày sự kiện.",
  "Bứt Phá: event landing 6–16 triệu tùy bán vé, multi-track và check-in.",
])}

${wpImg(1, "Thiết kế website sự kiện đăng ký tham dự và bán vé online chuyên nghiệp")}

<h2 id="event-web-la-gi">Website sự kiện là gì?</h2>

<p><strong>Website sự kiện</strong> (event website / event landing page) là trang web tập trung cho <em>một hoặc một chuỗi sự kiện</em>, khác website công ty tổng quát. <strong>Thiết kế website sự kiện</strong> thường gồm:</p>

<ul>
  <li><strong>Hero:</strong> Tên sự kiện, ngày giờ, địa điểm, countdown</li>
  <li><strong>About:</strong> Mục đích, đối tượng tham dự, lợi ích</li>
  <li><strong>Agenda:</strong> Lịch trình theo track/session</li>
  <li><strong>Speakers:</strong> Diễn giả, moderator — ảnh + bio</li>
  <li><strong>Sponsors:</strong> Logo nhà tài trợ (nếu có)</li>
  <li><strong>Đăng ký / Mua vé:</strong> Form hoặc checkout</li>
  <li><strong>FAQ &amp; contact:</strong> Dress code, parking, hoàn vé</li>
</ul>

<h2 id="loai-su-kien">Loại sự kiện cần website riêng</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Loại</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Đặc thù web</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hội thảo / conference B2B</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Agenda nhiều track, speaker, sponsor, vé Early Bird</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Workshop / training</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Giới hạn chỗ, vé có phí, pre-work material</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Networking / meetup</strong></td>
      <td class="border border-indigo-100 px-3 py-2">RSVP miễn phí, form ngắn, waitlist</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Triển lãm / expo</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Floor plan, exhibitor list, đăng ký tham quan</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Concert / show</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Bán vé tier (VIP/Standard), seat map (nếu có)</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hybrid / webinar</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Chọn onsite hoặc online — link Zoom sau đăng ký</td>
    </tr>
  </tbody>
</table>

<h2 id="landing-vs-hub">Event landing vs event hub (nhiều sự kiện)</h2>

<ul>
  <li><strong>Single event landing:</strong> 1 URL = 1 sự kiện — tối ưu ads Facebook/Google, CRO cao</li>
  <li><strong>Event hub:</strong> Trang chủ liệt kê sự kiện sắp tới + archive — phù hợp tổ chức thường xuyên</li>
  <li><strong>Microsite subdomain:</strong> <code>summit2026.company.vn</code> — brand lớn, nhiều sponsor</li>
</ul>

<p>Xem thêm <a href="${SITE}/blog/thiet-ke-website-landing-page-ban-hang">landing page</a> cho chiến dịch quảng cáo sự kiện.</p>

<h2 id="cau-truc">Cấu trúc website sự kiện chuẩn CRO</h2>

<ol>
  <li><strong>Above the fold:</strong> Tên event + ngày + địa điểm + nút “Đăng ký ngay”</li>
  <li><strong>Social proof:</strong> Số người đã đăng ký, logo công ty tham dự năm trước</li>
  <li><strong>Value proposition:</strong> 3–5 lý do nên tham dự — bullet rõ</li>
  <li><strong>Agenda:</strong> Timeline hoặc tab theo ngày/track</li>
  <li><strong>Speakers:</strong> Grid ảnh — click xem bio</li>
  <li><strong>Venue / map:</strong> Google Maps embed, hướng dẫn đỗ xe</li>
  <li><strong>Pricing / vé:</strong> Bảng giá Early Bird → Regular → Last minute</li>
  <li><strong>FAQ:</strong> Hủy vé, dress code, có recording không</li>
  <li><strong>CTA lặp:</strong> Sticky “Đăng ký” trên mobile</li>
</ol>

${wpImg(2, "Cấu trúc website sự kiện — agenda speaker và form đăng ký tham dự")}

<h2 id="dang-ky-ve">Form đăng ký &amp; bán vé online</h2>

<h3>Sự kiện miễn phí (RSVP)</h3>
<ul>
  <li>Họ tên, Email, SĐT, Công ty, Chức danh</li>
  <li>Checkbox đồng ý nhận email từ organizer</li>
  <li>Giới hạn số chỗ — hiển thị “Còn X suất”</li>
  <li>Waitlist khi full — email khi có chỗ</li>
</ul>

<h3>Sự kiện có phí</h3>
<ul>
  <li>Chọn loại vé: Standard / VIP / Group (3+ người)</li>
  <li>Mã giảm giá (promo code) — Early Bird, partner</li>
  <li>Checkout MoMo/VNPay/chuyển khoản</li>
  <li>Hóa đơn VAT (tùy chọn B2B)</li>
  <li>Email xác nhận + PDF vé / QR</li>
</ul>

<h3>Hybrid registration</h3>
<ul>
  <li>Radio: “Tham dự trực tiếp” / “Online qua Zoom”</li>
  <li>Giá khác nhau — online rẻ hơn onsite</li>
</ul>

<h2 id="thanh-toan">Thanh toán vé sự kiện tại Việt Nam</h2>

<ul>
  <li><strong>MoMo / VNPay / ZaloPay:</strong> Phổ biến — QR trên mobile</li>
  <li><strong>Chuyển khoản:</strong> SME event — manual confirm trong 24h</li>
  <li><strong>Thẻ quốc tế:</strong> Stripe — sự kiện có khách nước ngoài</li>
  <li><strong>COD:</strong> Hiếm với vé event — trừ khi giao vé vật lý</li>
  <li><strong>Invoice công ty:</strong> Form thêm MST, tên công ty — xuất HĐ sau</li>
</ul>

<h2 id="checkin-qr">Check-in QR, email automation &amp; ngày sự kiện</h2>

<ul>
  <li><strong>Email trigger:</strong> Đăng ký thành công → calendar invite (.ics) + QR unique</li>
  <li><strong>Reminder:</strong> Email/ZNS 1 ngày và 2 giờ trước event</li>
  <li><strong>Check-in app/web:</strong> Quét QR — đánh dấu attended, in badge</li>
  <li><strong>Walk-in:</strong> Form tại cửa — sync database realtime (WiFi ổn định)</li>
  <li><strong>Post-event:</strong> Email survey NPS + link recording/slide</li>
</ul>

<h2 id="marketing">Marketing &amp; kéo đăng ký sự kiện</h2>

<ul>
  <li><strong>Facebook/Google Ads:</strong> Trỏ landing event — message match headline</li>
  <li><strong>LinkedIn:</strong> B2B conference — sponsor post, InMail</li>
  <li><strong>Email list:</strong> Invite khách cũ — segment theo ngành</li>
  <li><strong>Partners &amp; speakers:</strong> Co-marketing — UTM riêng từng kênh</li>
  <li><strong>Early Bird urgency:</strong> Countdown giá tăng — tăng conversion</li>
  <li><strong>Social proof realtime:</strong> “127 người đã đăng ký” — FOMO có ethics</li>
</ul>

<h2 id="seo-schema">SEO &amp; schema Event cho website sự kiện</h2>

<p>Sự kiện một lần vẫn nên tối ưu SEO local và rich result:</p>

<ul>
  <li><strong>Title/meta:</strong> Tên event + ngày + thành phố</li>
  <li><strong>Schema Event (JSON-LD):</strong> name, startDate, endDate, location, offers, performer</li>
  <li><strong>Open Graph:</strong> Ảnh 1200×630 — share Facebook/Zalo đẹp</li>
  <li><strong>URL sạch:</strong> <code>/su-kien/marketing-summit-2026</code></li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website sự kiện — 7 bước</h2>

<ol>
  <li><strong>Brief event:</strong> Mục tiêu, audience, vé free/paid, capacity.</li>
  <li><strong>Content kit:</strong> Agenda, speaker bio, sponsor logo, ảnh venue.</li>
  <li><strong>Wireframe landing:</strong> Thứ tự block, mobile CTA sticky.</li>
  <li><strong>UI design:</strong> Visual theo theme event — professional hoặc creative.</li>
  <li><strong>Dev + form/payment:</strong> Register, vé, email, QR generation.</li>
  <li><strong>Test flow:</strong> Đăng ký test → email → QR scan → admin list.</li>
  <li><strong>Launch + ads:</strong> UTM tracking, dashboard đăng ký theo ngày.</li>
</ol>

<p><strong>Thời gian:</strong> 2–4 tuần (RSVP landing); 4–8 tuần (bán vé + check-in + multi-track).</p>

<h2 id="bang-gia">Bảng giá thiết kế website sự kiện 2026</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói Bứt Phá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Event RSVP</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Landing miễn phí, form, email xác nhận, agenda</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Event Ticket</strong></td>
      <td class="border border-indigo-100 px-3 py-2">11.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Bán vé tier, MoMo/VNPay, QR vé, admin export</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Event Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">16.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Multi-track, check-in QR, waitlist, schema Event</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Event hub</strong></td>
      <td class="border border-indigo-100 px-3 py-2">+5.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Trang liệt kê nhiều sự kiện + archive</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website sự kiện</h2>

<ul>
  <li>Chỉ dùng Google Form — thiếu brand, khó bán vé có phí đẹp.</li>
  <li>Thông tin ngày/giờ/địa điểm mơ hồ — ứng viên không tin tưởng.</li>
  <li>Web chậm mobile — ads event đốt tiền, bounce cao.</li>
  <li>Không giới hạn chỗ — overbook venue.</li>
  <li>Quên email reminder — no-show rate cao.</li>
  <li>Check-in thủ công danh sách Excel — queue dài cửa vào.</li>
  <li>Không có chính sách hoàn vé — tranh chấp khi hủy event.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-landing-page-ban-hang`,
    label: "Landing page bán hàng",
    desc: "CRO cho ads event.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-form-lien-he`,
    label: "Form liên hệ thông minh",
    desc: "Thu lead sự kiện.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-tich-hop-thanh-toan`,
    label: "Tích hợp thanh toán",
    desc: "MoMo, VNPay vé.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn website sự kiện",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website sự kiện giá bao nhiêu?",
      a: "Tại Bứt Phá từ 6.000.000đ (RSVP miễn phí) đến 16.000.000đ (bán vé + check-in QR). Báo giá theo số track và tích hợp payment.",
    },
    {
      q: "Sự kiện miễn phí có cần website riêng không?",
      a: "Nên có — landing chuyên nghiệp tăng đăng ký hơn Google Form. Thu lead và đo conversion ads.",
    },
    {
      q: "Có tích hợp Zoom cho webinar không?",
      a: "Có — sau đăng ký gửi link unique hoặc add vào calendar. Hybrid onsite + online supported.",
    },
    {
      q: "Bán vé online có cần giấy phép gì?",
      a: "Tùy loại sự kiện (văn hóa, thể thao). Doanh nghiệp nên xuất hóa đơn khi bán vé có phí — tư vấn kế toán riêng.",
    },
    {
      q: "Check-in QR hoạt động thế nào?",
      a: "Mỗi đăng ký sinh mã QR unique — staff quét bằng web/app check-in, cập nhật trạng thái attended realtime.",
    },
    {
      q: "Website sự kiện có cần SEO không?",
      a: "Có — schema Event + title ngày/địa điểm giúp Google hiển thị rich result. Ads vẫn là kênh chính cho event ngắn hạn.",
    },
    {
      q: "Bao lâu hoàn thành website sự kiện?",
      a: "RSVP landing 2–3 tuần; bán vé + check-in 4–6 tuần. Rush 10 ngày có thể với template — phụ thuộc content sẵn.",
    },
    {
      q: "Bứt Phá có thiết kế website sự kiện không?",
      a: "Có — hội thảo, workshop, gala, hybrid. Landing + vé + email automation. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website sự kiện</strong> hiệu quả = thông tin rõ ràng + agenda/speaker thuyết phục + đăng ký/vé mượt trên mobile + email &amp; QR check-in — biến sự kiện từ “post Facebook” thành funnel đo lường được.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — RSVP hay bán vé, timeline và báo giá theo quy mô sự kiện của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website sự kiện",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
