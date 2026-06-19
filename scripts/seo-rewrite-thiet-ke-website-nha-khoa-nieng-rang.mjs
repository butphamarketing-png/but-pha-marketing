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

const KEYWORD = "thiết kế website nha khoa niềng răng";
const TITLE = "Thiết Kế Website Nha Khoa Niềng Răng Thu Hút Khách";

export const REWRITE_THIET_KE_WEBSITE_NHA_KHOA_NIENG_RANG = {
  title: TITLE,
  slug: "thiet-ke-website-nha-khoa-nieng-rang",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website niềng răng, nha khoa chỉnh nha, invisalign website, before after niềng răng",
  metaTitle: "Thiết Kế Website Nha Khoa Niềng Răng | Chỉnh Nha 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website nha khoa niềng răng: before/after, tư vấn Invisalign, đặt lịch khám và SEO local. Quy trình 7 bước, giá 8–16 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website nha khoa niềng răng: chỉnh nha, before/after, form tư vấn và đặt lịch tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Nha Khoa Niềng Răng | Chỉnh Nha 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "nieng-rang-web-la-gi", label: "Website niềng răng là gì?" },
  { id: "vi-sao-can", label: "Vì sao phòng khám cần web riêng?" },
  { id: "cau-truc", label: "Cấu trúc website chỉnh nha" },
  { id: "before-after", label: "Before/After & case study" },
  { id: "dich-vu", label: "Niềng sắt vs Invisalign" },
  { id: "tu-van-dat-lich", label: "Tư vấn & đặt lịch khám" },
  { id: "seo", label: "SEO nha khoa niềng răng" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website nha khoa niềng răng</strong> là xây dựng nền tảng web chuyên cho phòng khám / bác sĩ <em>chỉnh nha</em> — trưng bày dịch vụ niềng răng mắc cài, khay trong suốt (Invisalign), before/after có consent, quy trình điều trị, bảng giá tham khảo, form <em>tư vấn miễn phí</em> và đặt lịch khám — chuyển đổi traffic Google “niềng răng [quận]” và ads Facebook thành lịch hẹn thực tế.`,
    `Bài viết dành cho bác sĩ chỉnh nha, quản lý phòng khám nha khoa và marketing y tế đang cần <strong>${KEYWORD}</strong>: cấu trúc case study, compliance quảng cáo y khoa, booking online và mức giá triển khai 2026 tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Niềng răng web = before/after thật + bác sĩ chỉnh nha profile — trust số 1.",
  "Landing Invisalign vs mắc cài — message match ads riêng.",
  "Form tư vấn + đặt lịch mobile — khách trẻ research trên điện thoại.",
  "Không cam kết “đẹp 100% X tháng” — tuân thủ quảng cáo y tế.",
  "Bứt Phá: website niềng răng 8–16 triệu tùy case gallery và booking.",
])}

${wpImg(1, "Thiết kế website nha khoa niềng răng before after và form tư vấn chỉnh nha")}

<h2 id="nieng-rang-web-la-gi">Website nha khoa niềng răng là gì?</h2>

<p><strong>Website nha khoa niềng răng</strong> (orthodontics website) tập trung dịch vụ <em>chỉnh nha</em> — khác website nha khoa tổng quát (cấy implant, nhổ răng, tẩy trắng). <strong>Thiết kế website nha khoa niềng răng</strong> thường gồm:</p>

<ul>
  <li><strong>Dịch vụ chỉnh nha:</strong> Mắc cài kim loại, sứ, self-ligating, Invisalign</li>
  <li><strong>Case before/after:</strong> Gallery có consent bệnh nhân</li>
  <li><strong>Quy trình điều trị:</strong> Khám → scan 3D → plan → gắn mắc → tái khám</li>
  <li><strong>Bác sĩ chỉnh nha:</strong> Học vị, chứng chỉ, kinh nghiệm case</li>
  <li><strong>Bảng giá tham khảo:</strong> Gói niềng — disclaimer cá nhân hóa</li>
  <li><strong>Đặt lịch / Tư vấn:</strong> Form + hotline + Zalo</li>
</ul>

<p>Xem tổng quan <a href="${SITE}/blog/thiet-ke-website-nha-khoa">website nha khoa</a> và <a href="${SITE}/blog/thiet-ke-website-dat-lich-hen-online">đặt lịch hẹn online</a>.</p>

<h2 id="vi-sao-can">Vì sao phòng khám chỉnh nha cần website chuyên sâu?</h2>

<ul>
  <li><strong>Giá trị cao:</strong> Niềng răng 30–100+ triệu — khách research kỹ trước khi quyết định</li>
  <li><strong>Visual proof:</strong> Before/after quyết định 70% conversion — cần gallery đẹp</li>
  <li><strong>SEO intent:</strong> “Niềng răng Invisalign Quận 1”, “chỉnh nha trẻ em”</li>
  <li><strong>Ads landing:</strong> Facebook/TikTok niềng răng — URL riêng message match</li>
  <li><strong>Trust bác sĩ:</strong> Profile chuyên chỉnh nha — không general dentist generic</li>
  <li><strong>Giảm tư vấn lặp:</strong> FAQ, quy trình, giá tham khảo trên web</li>
</ul>

<h2 id="cau-truc">Cấu trúc website chỉnh nha chuẩn</h2>

<ol>
  <li><strong>Trang chủ:</strong> Hero smile, USP (scan 3D miễn phí), CTA đặt lịch</li>
  <li><strong>Giới thiệu phòng khám:</strong> Giấy phép, thiết bị scan, phòng vô trùng</li>
  <li><strong>Dịch vụ niềng:</strong> Landing mắc cài / Invisalign / trẻ em riêng</li>
  <li><strong>Before/After:</strong> Filter loại case — hô, móm, lệch lạc, trẻ em</li>
  <li><strong>Quy trình:</strong> Timeline điều trị — kỳ vọng realistic</li>
  <li><strong>Bảng giá / Trả góp:</strong> Tham khảo + form báo giá cá nhân</li>
  <li><strong>Bác sĩ:</strong> BS chỉnh nha — credentials</li>
  <li><strong>Blog:</strong> SEO “ăn gì khi niềng răng”, “Invisalign vs mắc cài”</li>
  <li><strong>Đặt lịch:</strong> Calendar slot + form triệu chứng</li>
</ol>

<h2 id="before-after">Before/After &amp; case study chỉnh nha</h2>

<p>Trái tim của <strong>${KEYWORD}</strong>:</p>

<ul>
  <li><strong>Consent bệnh nhân:</strong> Chữ ký cho phép đăng ảnh — bắt buộc ethically</li>
  <li><strong>Slider before/after:</strong> UX trực quan — cùng góc chụp</li>
  <li><strong>Metadata case:</strong> Tuổi, loại niềng, thời gian điều trị — không guarantee copycat</li>
  <li><strong>Video testimonial:</strong> Khách chia sẻ — trust cao</li>
  <li><strong>Filter:</strong> Invisalign / mắc cài / trẻ em — khách tìm case tương tự</li>
  <li><strong>Disclaimer:</strong> “Kết quả phụ thuộc tình trạng từng người”</li>
</ul>

${wpImg(2, "Gallery before after niềng răng trên website nha khoa chỉnh nha")}

<h2 id="dich-vu">Niềng mắc cài vs Invisalign — landing riêng</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Loại</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Nội dung landing</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Mắc cài kim loại/sứ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Giá phải chăng, hiệu quả mạnh, trẻ em</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Self-ligating</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Giảm ma sát, tái khám ít hơn</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Invisalign / khay trong suốt</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Thẩm mỹ, tháo được, scan 3D preview smile</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Niềng trẻ em</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Phụ huynh trust, growth guidance</td>
    </tr>
  </tbody>
</table>

<h2 id="tu-van-dat-lich">Form tư vấn &amp; đặt lịch khám chỉnh nha</h2>

<ul>
  <li><strong>Form ngắn:</strong> Họ tên, tuổi, SĐT, loại quan tâm (Invisalign/mắc cài), upload ảnh nụ cười (tùy chọn)</li>
  <li><strong>Calendar booking:</strong> Chọn ngày khám tư vấn — confirm ZNS</li>
  <li><strong>Lead magnet:</strong> “Tải checklist trước khi niềng răng” — thu email</li>
  <li><strong>Chat Zalo:</strong> Tư vấn nhanh — phổ biến VN</li>
  <li><strong>Pixel ads:</strong> Lead event — tối ưu Facebook niềng răng</li>
  <li><strong>Auto-reply:</strong> “Đã nhận — phòng khám gọi trong 2h làm việc”</li>
</ul>

<h2 id="seo">SEO &amp; quảng cáo nha khoa niềng răng</h2>

<ul>
  <li><strong>Title local:</strong> “Niềng răng [Quận] | Invisalign | [Tên PK]”</li>
  <li><strong>Blog long-tail:</strong> “Chi phí niềng răng 2026”, “Niềng răng bao lâu”</li>
  <li><strong>Schema Dentist / MedicalClinic:</strong> JSON-LD địa chỉ</li>
  <li><strong>Google Business:</strong> Ảnh phòng, review — link đặt lịch web</li>
  <li><strong>Compliance ads:</strong> Không before/after quá đà, không “đẹp tức thì”</li>
  <li><strong>E-E-A-T:</strong> Bài blog bác sĩ chỉnh nha ký duyệt</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website niềng răng — 7 bước</h2>

<ol>
  <li><strong>Brief phòng khám:</strong> Dịch vụ chỉnh nha, bác sĩ, case có sẵn, vùng target.</li>
  <li><strong>Content case:</strong> Thu thập before/after có consent — chụp bổ sung nếu thiếu.</li>
  <li><strong>Wireframe:</strong> Gallery filter, landing Invisalign, booking mobile.</li>
  <li><strong>UI design:</strong> Clean medical, smile-focused — ảnh lớn, CTA rõ.</li>
  <li><strong>Dev + booking:</strong> Form, calendar, ZNS confirm, pixel Meta.</li>
  <li><strong>Seed 10+ case + 5 blog:</strong> Launch không trống — SEO sẵn.</li>
  <li><strong>Launch + ads:</strong> Local SEO, Facebook lead campaign test.</li>
</ol>

<p><strong>Thời gian:</strong> 4–7 tuần (website + gallery); +1 tuần landing ads riêng.</p>

<h2 id="bang-gia">Bảng giá thiết kế website nha khoa niềng răng 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Ortho Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">8.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">10 case before/after, form tư vấn, profile BS, SEO cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Ortho Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Landing Invisalign + mắc cài, booking calendar, blog, schema</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Ortho Premium</strong></td>
      <td class="border border-indigo-100 px-3 py-2">16.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">30+ case gallery, video embed, trả góp info, ads landing</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Landing ads</strong></td>
      <td class="border border-indigo-100 px-3 py-2">+3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">1 landing CRO cho campaign Facebook/TikTok</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website niềng răng</h2>

<ul>
  <li>Before/after Photoshop quá đà — vi phạm quảng cáo y tế, mất trust.</li>
  <li>Cam kết thời gian cố định — mỗi case khác nhau.</li>
  <li>Ảnh case không consent — rủi ro pháp lý.</li>
  <li>Web chung nha khoa — không highlight chỉnh nha, SEO yếu.</li>
  <li>Form dài — dropout trên mobile.</li>
  <li>Không có profile bác sĩ chỉnh nha — khách nghi general dentist.</li>
  <li>Giá ẩn hoàn toàn — inquiry rác hoặc bounce.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-nha-khoa`,
    label: "Website nha khoa",
    desc: "Tổng quan nha khoa.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-y-te-dat-kham`,
    label: "Y tế đặt khám",
    desc: "Booking clinic.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-tham-my-vien`,
    label: "Website thẩm mỹ viện",
    desc: "Before/after y tế.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn web niềng răng",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website nha khoa niềng răng giá bao nhiêu?",
      a: "Tại Bứt Phá từ 8.000.000đ (gallery + form) đến 16.000.000đ (premium + ads landing). Báo giá theo số case và booking calendar.",
    },
    {
      q: "Khác gì website nha khoa tổng quát?",
      a: "Focus 100% chỉnh nha — case before/after, landing Invisalign, SEO “niềng răng”. Web nha khoa chung cover implant, tẩy trắng…",
    },
    {
      q: "Có cần landing riêng cho Invisalign không?",
      a: "Nên có — ads Invisalign cần message match URL riêng, conversion cao hơn trang chủ.",
    },
    {
      q: "Before/after đăng web có cần consent không?",
      a: "Bắt buộc — bệnh nhân ký đồng ý sử dụng hình ảnh. Phòng khám chịu trách nhiệm pháp lý.",
    },
    {
      q: "SEO “niềng răng [quận]” mất bao lâu?",
      a: "2–4 tháng local SEO + blog + GBP. Ads Facebook/Google bù lead giai đoạn đầu.",
    },
    {
      q: "Có tích hợp đặt lịch online không?",
      a: "Có — calendar slot + ZNS confirm. Sync Google Calendar phòng khám tùy cấu hình.",
    },
    {
      q: "Bao lâu go-live website niềng răng?",
      a: "4–7 tuần. Chuẩn bị case before/after có consent là bước quan trọng nhất.",
    },
    {
      q: "Bứt Phá có thiết kế website nha khoa niềng răng không?",
      a: "Có — phòng khám chỉnh nha, Invisalign provider. Gallery + booking + SEO. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website nha khoa niềng răng</strong> hiệu quả = before/after thật có consent + landing dịch vụ rõ (Invisalign/mắc cài) + bác sĩ chỉnh nha profile + đặt lịch mobile nhanh — tuân thủ quảng cáo y tế, không hứa hẹn phi thực tế.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — số case, dịch vụ Invisalign và báo giá theo quy mô phòng khám của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website nha khoa niềng răng",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
