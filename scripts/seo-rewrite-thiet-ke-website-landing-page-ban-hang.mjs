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

const KEYWORD = "thiết kế website landing page bán hàng";
const TITLE = "Thiết Kế Website Landing Page Bán Hàng Tăng Chuyển Đổi";

export const REWRITE_THIET_KE_WEBSITE_LANDING_PAGE_BAN_HANG = {
  title: TITLE,
  slug: "thiet-ke-website-landing-page-ban-hang",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "landing page bán hàng, thiết kế landing page, landing page quảng cáo, landing page chuyển đổi cao",
  metaTitle: "Thiết Kế Website Landing Page Bán Hàng | CRO 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website landing page bán hàng: message match ads, CTA, social proof và pixel Meta. Quy trình 7 bước, giá 2–8 triệu. Tư vấn Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế landing page bán hàng tăng chuyển đổi: cấu trúc CRO, tích hợp quảng cáo Facebook/Google và A/B test.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Landing Page Bán Hàng | CRO 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "landing-la-gi", label: "Landing page là gì?" },
  { id: "vi-sao-can", label: "Vì sao cần landing riêng?" },
  { id: "khac-website", label: "Landing vs website tổng" },
  { id: "cau-truc-cro", label: "Cấu trúc CRO chuẩn" },
  { id: "message-match", label: "Message match & quảng cáo" },
  { id: "mobile", label: "Mobile & tốc độ" },
  { id: "tracking", label: "Pixel & đo conversion" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "ab-test", label: "A/B test & tối ưu" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website landing page bán hàng</strong> là quy trình xây dựng trang web <em>một mục tiêu duy nhất</em> — chốt đơn, thu lead hoặc đăng ký — tối ưu cho traffic từ quảng cáo Facebook, Google Ads, TikTok hoặc Zalo. Khác website nhiều trang, landing loại bỏ menu phân tán, tập trung message match với ads và CTA rõ trên mobile — tỷ lệ chuyển đổi thường cao hơn 2–5 lần so với trỏ ads về trang chủ.`,
    `Bài viết dành cho marketer, chủ shop và agency ads đang cần <strong>${KEYWORD}</strong>: cấu trúc CRO từng block, tích hợp pixel, checklist tốc độ, quy trình triển khai và mức giá 2026 — thực chiến thị trường Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Landing = 1 offer, 1 CTA — không menu 10 mục làm khách lạc.",
  "Message match: headline landing = copy ads — giảm bounce.",
  "Mobile-first: 80%+ ads traffic VN từ điện thoại.",
  "Tốc độ &lt; 2,5s LCP — Google Ads Quality Score + ROAS.",
  "Bứt Phá: landing 2–8 triệu; bundle nhiều landing theo chiến dịch.",
])}

${wpImg(1, "Thiết kế website landing page bán hàng tối ưu chuyển đổi từ quảng cáo")}

<h2 id="landing-la-gi">Landing page bán hàng là gì?</h2>

<p><strong>Landing page bán hàng</strong> (sales landing page) là trang web đơn (hoặc scroll dài) thiết kế để <em>chuyển đổi visitor thành khách mua hoặc lead</em> — không mục tiêu giới thiệu toàn bộ thương hiệu. <strong>Thiết kế website landing page bán hàng</strong> thường gồm:</p>

<ul>
  <li><strong>Hero:</strong> Headline + subheadline khớp quảng cáo + ảnh sản phẩm</li>
  <li><strong>Lợi ích:</strong> 3–6 bullet — giải quyết pain point</li>
  <li><strong>Social proof:</strong> Review, số liệu, logo khách, video UGC</li>
  <li><strong>Chi tiết offer:</strong> Giá, combo, bonus, countdown (nếu có)</li>
  <li><strong>FAQ:</strong> Xử lý objection trước khi mua</li>
  <li><strong>CTA lặp lại:</strong> Nút mua / form — 3–5 lần trên trang</li>
</ul>

<h2 id="vi-sao-can">Vì sao không trỏ ads về trang chủ?</h2>

<ul>
  <li><strong>Phân tán:</strong> Trang chủ có 10 link — khách click sang “Giới thiệu” thay vì mua.</li>
  <li><strong>Message mismatch:</strong> Ads nói “Giảm 50% serum X” — trang chủ không nhắc offer → bounce cao.</li>
  <li><strong>Đo lường sai:</strong> Không biết chiến dịch nào mang đơn — pixel fire nhầm trang.</li>
  <li><strong>ROAS thấp:</strong> CPM/CPC giá cao mà conversion thấp — lỗ ads.</li>
  <li><strong>Quality Score:</strong> Google Ads phạt landing chậm / không liên quan — CPC tăng.</li>
</ul>

<h2 id="khac-website">Landing page vs website tổng vs shop TMĐT</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Loại</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Mục tiêu</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Traffic phù hợp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Landing bán hàng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">1 offer → mua / lead</td>
      <td class="border border-indigo-100 px-3 py-2">Ads paid, campaign ngắn hạn</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Website tổng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Thương hiệu, SEO, đa dịch vụ</td>
      <td class="border border-indigo-100 px-3 py-2">Organic, direct, referral</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Shop TMĐT</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Nhiều SKU, giỏ hàng</td>
      <td class="border border-indigo-100 px-3 py-2">Organic + ads đa sản phẩm</td>
    </tr>
  </tbody>
</table>

<p>Xem thêm <a href="${SITE}/blog/landing-hay-website-tong">landing hay website tổng</a> và <a href="${SITE}/blog/thiet-ke-website-ban-hang">website bán hàng</a>.</p>

<h2 id="cau-truc-cro">Cấu trúc landing page CRO — từng block</h2>

<ol>
  <li><strong>Above the fold:</strong> Headline (lợi ích) + ảnh sản phẩm + CTA primary + trust badge (COD, đổi trả).</li>
  <li><strong>Problem → Solution:</strong> Nỗi đau khách → sản phẩm giải quyết thế nào.</li>
  <li><strong>Benefits (không chỉ features):</strong> “Da sáng hơn 7 ngày” &gt; “Chứa vitamin C 20%”.</li>
  <li><strong>Social proof:</strong> Review có ảnh, video khách, báo chí (có phép).</li>
  <li><strong>Offer stack:</strong> Giá gốc gạch, giá sale, quà tặng, ship free.</li>
  <li><strong>How it works:</strong> 3 bước đặt hàng — đơn giản hóa.</li>
  <li><strong>FAQ:</strong> 5–8 câu — giao hàng, đổi trả, thành phần…</li>
  <li><strong>Final CTA:</strong> Urgency nhẹ (số lượng, hết hạn) — trung thực.</li>
</ol>

${wpImg(2, "Cấu trúc landing page bán hàng — hero, social proof và CTA")}

<h2 id="message-match">Message match với quảng cáo</h2>

<p>Quy tắc vàng <strong>${KEYWORD}</strong>:</p>

<ul>
  <li><strong>Headline landing</strong> = hook video/image ads (cùng từ khóa, cùng offer)</li>
  <li><strong>Ảnh hero</strong> = sản phẩm trong ads — khách không “bị lừa”</li>
  <li><strong>Giá trên landing</strong> = giá trong ads — tránh complaint</li>
  <li><strong>UTM tracking:</strong> utm_campaign → biết landing nào convert</li>
  <li><strong>Nhiều landing:</strong> Mỗi chiến dịch / audience một URL — spa facial vs body khác landing</li>
</ul>

<h2 id="mobile">Mobile-first &amp; tốc độ tải</h2>

<ul>
  <li>CTA sticky cuối màn hình — “Mua ngay” / “Đặt hàng”</li>
  <li>Form checkout tối giản: tên, SĐT, địa chỉ — COD phổ biến VN</li>
  <li>Click-to-call / Zalo — khách muốn hỏi trước mua</li>
  <li>LCP &lt; 2,5s — nén ảnh WebP, không slider nặng</li>
  <li>Font lớn, contrast cao — đọc ngoài trời</li>
</ul>

<h2 id="tracking">Pixel Meta, GA4 &amp; đo conversion</h2>

<ul>
  <li><strong>Meta Pixel:</strong> ViewContent, AddToCart, Purchase / Lead — tối ưu ads</li>
  <li><strong>Google Ads tag:</strong> Conversion tracking — Smart Bidding</li>
  <li><strong>GA4:</strong> Event submit form, scroll depth, time on page</li>
  <li><strong>Thank-you page:</strong> Fire conversion — không fire nhầm trang landing</li>
  <li><strong>CAPI (tùy chọn):</strong> Server-side Meta — iOS14+ chính xác hơn</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế landing page — 7 bước</h2>

<ol>
  <li><strong>Brief offer:</strong> Sản phẩm, giá, audience, copy ads hiện tại.</li>
  <li><strong>Wireframe CRO:</strong> Thứ tự block — duyệt trước design màu.</li>
  <li><strong>UI design:</strong> Mobile mockup trước — 80% traffic.</li>
  <li><strong>Lập trình:</strong> HTML/WordPress/Next.js — form, pixel, thank-you page.</li>
  <li><strong>Copywriting:</strong> Headline, bullet, FAQ — test với team sales.</li>
  <li><strong>Test kỹ thuật:</strong> Form submit, pixel fire, PageSpeed, iOS/Android.</li>
  <li><strong>Go-live + A/B:</strong> Chạy ads nhỏ test ROAS trước scale.</li>
</ol>

<p><strong>Thời gian:</strong> 1–3 tuần / landing (template nhanh hơn custom).</p>

<h2 id="bang-gia">Bảng giá landing page bán hàng 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Landing Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">2.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">1 trang scroll, form COD, pixel cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Landing CRO</strong></td>
      <td class="border border-indigo-100 px-3 py-2">4.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Custom design, FAQ, social proof, GA4</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Landing Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Video hero, A/B variant, MoMo/VNPay</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bundle 3 landing</strong></td>
      <td class="border border-indigo-100 px-3 py-2">8.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">3 offer khác nhau — agency/brand nhiều campaign</td>
    </tr>
  </tbody>
</table>

<h2 id="ab-test">A/B test &amp; tối ưu sau launch</h2>

<ul>
  <li>Test headline — lợi ích vs giá vs urgency</li>
  <li>Test CTA text: “Mua ngay” vs “Nhận ưu đãi”</li>
  <li>Test ảnh hero — sản phẩm vs before/after</li>
  <li>Test form dài vs ngắn — trade-off lead quality</li>
  <li>Chạy đủ traffic (500+ click/variant) trước khi kết luận</li>
</ul>

<h2 id="sai-lam">Sai lầm khi làm landing page bán hàng</h2>

<ul>
  <li>Menu đầy đủ như website tổng — mất focus CRO.</li>
  <li>Headline chung chung — không match ads.</li>
  <li>Web chậm 5s+ — ads đốt tiền, khách thoát.</li>
  <li>Không có social proof — trust thấp với khách lạ.</li>
  <li>Form 15 trường — conversion sụt trên mobile.</li>
  <li>Quên pixel — không tối ưu được ads.</li>
  <li>Cam kết quá đà — ads/account bị report.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-ban-hang`,
    label: "Website bán hàng",
    desc: "Shop đa sản phẩm.",
  },
  {
    href: `${SITE}/blog/landing-hay-website-tong`,
    label: "Landing hay website tổng",
    desc: "Chiến lược funnel.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-landing-seo`,
    label: "Landing SEO cho ads",
    desc: "Message match + kỹ thuật.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn landing",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế landing page bán hàng giá bao nhiêu?",
      a: "Tại Bứt Phá từ 2.000.000đ (landing lite) đến 8.000.000đ (bundle 3 landing). Custom CRO + video báo giá theo scope.",
    },
    {
      q: "Landing page có cần SEO không?",
      a: "Ưu tiên conversion từ ads trước. Có thể index nhẹ — nhưng không thay blog/website SEO dài hạn.",
    },
    {
      q: "Một sản phẩm cần mấy landing?",
      a: "Tối thiểu 1 landing/offer. Nhiều audience (nam/nữ, tuổi) — nên tách landing message match.",
    },
    {
      q: "Landing WordPress hay HTML tĩnh?",
      a: "HTML/Next.js nhanh hơn cho landing thuần ads. WordPress tiện nếu hay sửa giá/offer thường xuyên.",
    },
    {
      q: "Có tích hợp MoMo/VNPay trên landing không?",
      a: "Có — gói Pro. Nhiều shop VN vẫn COD + form — conversion cao hơn bắt buộc thanh toán online.",
    },
    {
      q: "Bao lâu hoàn thành landing page?",
      a: "Thường 1–3 tuần. Template sẵn 3–7 ngày nếu copy đã có.",
    },
    {
      q: "Landing có cần SSL không?",
      a: "Bắt buộc — HTTPS tăng trust và yêu cầu của Meta/Google ads.",
    },
    {
      q: "Bứt Phá có làm landing page bán hàng không?",
      a: "Có — mỹ phẩm, khóa học, dịch vụ, TMĐT. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website landing page bán hàng</strong> hiệu quả = message match ads + cấu trúc CRO rõ + mobile nhanh + pixel đo đúng — không phải trang “đẹp” nhiều menu. Mỗi chiến dịch ads nên có landing riêng; scale budget khi ROAS ổn định sau A/B test.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — timeline và báo giá theo offer, kênh ads và số landing bạn cần.`,
  ],
  ctaLabel: "→ Tư vấn landing page bán hàng",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
