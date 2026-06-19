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

const KEYWORD = "thiết kế website logistics";
const TITLE = "Thiết Kế Website Logistics Và Vận Tải Theo Dõi Đơn";

export const REWRITE_THIET_KE_WEBSITE_LOGISTICS_VAN_TAI = {
  title: TITLE,
  slug: "thiet-ke-website-logistics-van-tai",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website vận tải, theo dõi đơn hàng logistics, báo giá cước vận chuyển, công ty logistics web",
  metaTitle: "Thiết Kế Website Logistics | Tracking & Báo Giá 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website logistics: báo giá cước, tra cứu vận đơn, dịch vụ vận tải B2B và SEO local. Quy trình 7 bước, giá 8–16 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website logistics và vận tải: tracking đơn, báo giá cước, dịch vụ kho vận tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Logistics | Tracking & Báo Giá 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "logistics-web-la-gi", label: "Website logistics là gì?" },
  { id: "loai-hinh", label: "Loại hình vận tải & logistics" },
  { id: "cau-truc", label: "Cấu trúc website chuẩn" },
  { id: "tracking", label: "Tra cứu vận đơn & tracking" },
  { id: "bao-gia-cuoc", label: "Báo giá cước online" },
  { id: "dich-vu", label: "Trang dịch vụ logistics" },
  { id: "b2b-portal", label: "Portal khách hàng B2B" },
  { id: "seo", label: "SEO công ty vận tải" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website logistics</strong> là xây dựng nền tảng web cho công ty vận tải, forwarder, kho bãi và chuỗi cung ứng — giới thiệu dịch vụ (vận tải đường bộ, container, hàng không, kho vận, fulfillment), <em>tra cứu vận đơn / tracking đơn hàng</em>, form <em>báo giá cước</em> và portal khách hàng B2B — giảm tải hotline “đơn tới đâu rồi” và tăng lead doanh nghiệp cần logistics ổn định.`,
    `Bài viết dành cho giám đốc công ty vận tải, forwarder và ops logistics đang cần <strong>${KEYWORD}</strong>: cấu trúc tracking UX, calculator cước sơ bộ, trang dịch vụ B2B, SEO “vận chuyển hàng [tuyến]” và mức giá triển khai 2026 tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Logistics web = dịch vụ rõ + tracking self-service + báo giá cước nhanh.",
  "Tra cứu mã vận đơn 24/7 — giảm 40%+ cuộc gọi CSKH.",
  "Form báo giá: tuyến, trọng lượng, loại hàng — sales quote trong SLA.",
  "Portal B2B: lịch sử đơn, COD, đối soát — khách enterprise.",
  "Bứt Phá: website logistics 8–16 triệu tùy tracking API và portal.",
])}

${wpImg(1, "Thiết kế website logistics vận tải tra cứu vận đơn và báo giá cước")}

<h2 id="logistics-web-la-gi">Website logistics / vận tải là gì?</h2>

<p><strong>Website logistics</strong> phục vụ ngành vận tải &amp; supply chain:</p>
<ul>
  <li><strong>Giới thiệu công ty:</strong> Quy mô đội xe, kho, chứng chỉ, mạng lưới</li>
  <li><strong>Dịch vụ:</strong> Vận tải nội địa, liên tỉnh, container, kho vận, fulfillment</li>
  <li><strong>Tracking:</strong> Khách nhập mã vận đơn → trạng thái realtime/near-realtime</li>
  <li><strong>Báo giá cước:</strong> Form hoặc calculator theo tuyến, kg, CBM</li>
  <li><strong>Đăng ký / Ký hợp đồng B2B:</strong> Lead doanh nghiệp, đại lý</li>
  <li><strong>Tuyển dụng tài xế (tùy chọn):</strong> HR logistics</li>
</ul>

<p><strong>Thiết kế website logistics</strong> ưu tiên <em>tin cậy, rõ ràng, mobile</em> — khách B2B và shipper cá nhân đều cần tra cứu nhanh trên điện thoại.</p>

<h2 id="loai-hinh">Loại hình doanh nghiệp cần web logistics</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Loại</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Focus web</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Vận tải đường bộ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Tuyến cố định, báo giá theo km/tấn, tracking xe</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Forwarder / gom hàng</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Air/sea quote, lịch tàu bay, chứng từ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Kho vận / 3PL</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Fulfillment, WMS portal, báo giá lưu kho</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Chành xe / line haul</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Bảng cước tuyến, lịch chạy, gom hàng lẻ</td>
    </tr>
  </tbody>
</table>

<h2 id="cau-truc">Cấu trúc website logistics chuẩn</h2>

<ol>
  <li><strong>Trang chủ:</strong> Hero tracking box nổi bật, dịch vụ chính, USP (COD, SLA giao)</li>
  <li><strong>Tra cứu vận đơn:</strong> Input mã → timeline trạng thái</li>
  <li><strong>Dịch vụ:</strong> Landing từng loại — vận tải lạnh, hàng nguy hiểm…</li>
  <li><strong>Bảng cước / Báo giá:</strong> Tham khảo + form quote chính xác</li>
  <li><strong>Mạng lưới:</strong> Bản đồ tuyến, hub kho</li>
  <li><strong>Khách hàng / Case study:</strong> Logo doanh nghiệp, ngành phục vụ</li>
  <li><strong>Đăng ký gửi hàng:</strong> Form B2B / tài khoản đại lý</li>
  <li><strong>Hỗ trợ:</strong> FAQ, hotline, Zalo CSKH</li>
</ol>

<h2 id="tracking">Tra cứu vận đơn &amp; tracking đơn hàng</h2>

<p>Tính năng must-have trong <strong>${KEYWORD}</strong>:</p>

<ul>
  <li><strong>Search box homepage:</strong> Nhập mã vận đơn / SĐT người nhận</li>
  <li><strong>Timeline:</strong> Đã lấy hàng → đang vận chuyển → đang giao → đã giao</li>
  <li><strong>Chi tiết:</strong> Ngày giờ, hub, ghi chú, ảnh POD (proof of delivery) nếu có</li>
  <li><strong>Notify:</strong> SMS/ZNS khi đổi trạng thái — tích hợp TMS</li>
  <li><strong>API sync:</strong> TMS nội bộ hoặc GHN/GHTK API (nếu reseller)</li>
  <li><strong>Multi-order:</strong> Đăng nhập xem tất cả đơn — portal B2B</li>
</ul>

${wpImg(2, "Giao diện tra cứu vận đơn tracking logistics trên website vận tải")}

<h2 id="bao-gia-cuoc">Báo giá cước vận chuyển online</h2>

<h3>Form báo giá</h3>
<ul>
  <li>Điểm đi / điểm đến (tỉnh, quận)</li>
  <li>Loại hàng: Bao / Pallet / Container / Lẻ</li>
  <li>Trọng lượng (kg), thể tích (CBM) — chargeable weight</li>
  <li>Dịch vụ: Thường / Hỏa tốc / Lạnh</li>
  <li>COD amount (nếu có)</li>
  <li>Thời gian cần lấy hàng</li>
  <li>SĐT, email — sales gửi quote</li>
</ul>

<h3>Calculator tham khảo (tùy chọn)</h3>
<p>JS tính cước nội tỉnh theo bảng giá publish — disclaimer “chưa gồm phụ phí”. Lọc lead có ngân sách phù hợp.</p>

<h2 id="dich-vu">Trang dịch vụ logistics &amp; trust B2B</h2>

<ul>
  <li><strong>SLA cam kết:</strong> Giao nội thành 24h, liên tỉnh 2–3 ngày — realistic</li>
  <li><strong>Chứng chỉ:</strong> ISO, GDP (dược), HACCP (thực phẩm lạnh)</li>
  <li><strong>Đội xe:</strong> Số lượng xe, loại xe, GPS tracking</li>
  <li><strong>Bảo hiểm hàng hóa:</strong> Mức bồi thường — giảm rủi ro khách</li>
  <li><strong>Quy trình gửi hàng:</strong> 5 bước minh bạch — infographic</li>
</ul>

<h2 id="b2b-portal">Portal khách hàng B2B (nâng cao)</h2>

<ul>
  <li>Login doanh nghiệp — tạo vận đơn hàng loạt</li>
  <li>Export Excel đối soát COD cuối tháng</li>
  <li>Lịch sử cước, invoice PDF</li>
  <li>API webhook cho shop TMĐT tích hợp</li>
  <li>Role: Admin / kế toán / ops</li>
</ul>

<h2 id="seo">SEO cho công ty logistics &amp; vận tải</h2>

<ul>
  <li><strong>Title:</strong> “Vận chuyển hàng [Tuyến] | Logistics [Tên công ty]”</li>
  <li><strong>Landing tuyến:</strong> “Chành xe SGN-HAN”, “Vận tải container Cát Lái”</li>
  <li><strong>Schema LocalBusiness / Service:</strong> Khu vực phục vụ</li>
  <li><strong>Blog:</strong> “Cách tính CBM”, “Quy trình gom hàng xuất khẩu”</li>
  <li><strong>GBP:</strong> Hub kho — review B2B local</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website logistics — 7 bước</h2>

<ol>
  <li><strong>Brief dịch vụ:</strong> Loại vận tải, tuyến, có TMS/API tracking không.</li>
  <li><strong>Sitemap:</strong> Tracking, báo giá, portal scope.</li>
  <li><strong>Wireframe:</strong> Tracking UX mobile, form quote wizard.</li>
  <li><strong>UI design:</strong> Professional logistics — blue/navy, trust icons.</li>
  <li><strong>Dev + API:</strong> Tracking sync TMS, form CRM, calculator.</li>
  <li><strong>Content:</strong> Bảng cước tham khảo, FAQ, case study.</li>
  <li><strong>Launch + SEO:</strong> Landing tuyến, ads B2B Google.</li>
</ol>

<p><strong>Thời gian:</strong> 5–8 tuần (tracking + form); 10–14 tuần portal B2B + API.</p>

<h2 id="bang-gia">Bảng giá thiết kế website logistics 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Logistics Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">8.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Giới thiệu, form báo giá, tracking manual/CMS</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Logistics Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Tracking API, calculator cước, landing tuyến, blog SEO</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Logistics Enterprise</strong></td>
      <td class="border border-indigo-100 px-3 py-2">16.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Portal B2B, đối soát COD, multi-user, webhook API</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tích hợp TMS</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Báo giá riêng</td>
      <td class="border border-indigo-100 px-3 py-2">Sync trạng thái realtime từ hệ thống nội bộ</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website logistics</h2>

<ul>
  <li>Tracking giả — trạng thái không cập nhật, khách mất tin.</li>
  <li>Cam kết giao 100% đúng hạn — thực tế traffic/weather không kiểm soát.</li>
  <li>Form báo giá thiếu trọng lượng/CBM — quote sai, mất uy tín.</li>
  <li>Web không mobile — shipper tra cứu trên điện thoại.</li>
  <li>Ẩn bảng cước hoàn toàn — B2B nghi ngờ minh bạch.</li>
  <li>Hotline duy nhất — không self-service tracking, CSKH quá tải.</li>
  <li>Portal B2B lỗi đối soát COD — tranh chấp cuối tháng.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-thuong-mai-dien-tu`,
    label: "Website TMĐT",
    desc: "Shop cần logistics.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-form-lien-he`,
    label: "Form liên hệ",
    desc: "Lead B2B quote.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-api-tich-hop`,
    label: "API tích hợp",
    desc: "TMS webhook.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn web logistics",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website logistics giá bao nhiêu?",
      a: "Tại Bứt Phá từ 8.000.000đ (form + tracking cơ bản) đến 16.000.000đ (portal B2B). Tích hợp TMS báo giá theo API.",
    },
    {
      q: "Tracking có cần phần mềm TMS riêng không?",
      a: "Có TMS thì sync API realtime tốt nhất. SME có thể cập nhật trạng thái thủ công qua CMS trước khi scale.",
    },
    {
      q: "Calculator cước tự động có chính xác không?",
      a: "Là ước tính theo bảng publish — sales confirm phụ phí (xăng, vùng sâu). Vẫn giảm inquiry rác.",
    },
    {
      q: "Portal B2B khác gì form báo giá?",
      a: "Portal: khách login tạo nhiều vận đơn, xem lịch sử, đối soát COD. Form: lead một lần, không account.",
    },
    {
      q: "SEO “vận chuyển hàng [tuyến]” hiệu quả không?",
      a: "Có — landing tuyến + blog logistics mang lead B2B organic. Google Ads bù cạnh tranh cao.",
    },
    {
      q: "Có tích hợp ZNS thông báo trạng thái không?",
      a: "Có — qua webhook TMS → Zalo ZNS khi đơn đổi trạng thái. Cần Zalo OA verified.",
    },
    {
      q: "Bao lâu go-live website logistics?",
      a: "5–8 tuần web + tracking form. Portal + API 10–14 tuần.",
    },
    {
      q: "Bứt Phá có thiết kế website logistics không?",
      a: "Có — vận tải đường bộ, forwarder, kho 3PL. Tracking + báo giá + SEO. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website logistics</strong> hiệu quả = dịch vụ &amp; tuyến rõ + tracking self-service 24/7 + báo giá cước nhanh + trust B2B (chứng chỉ, SLA) — giảm chi phí CSKH và thu lead doanh nghiệp scale.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — loại vận tải, tracking TMS và báo giá theo quy mô fleet/kho của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website logistics",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
