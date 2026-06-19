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

const KEYWORD = "thiết kế website y tế đặt khám";
const TITLE = "Thiết Kế Website Y Tế Đặt Khám Trực Tuyến";

export const REWRITE_THIET_KE_WEBSITE_Y_TE_DAT_KHAM = {
  title: TITLE,
  slug: "thiet-ke-website-y-te-dat-kham",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website phòng khám đặt khám, đặt lịch khám online, clinic booking việt nam, website y tế chuyên khoa",
  metaTitle: "Thiết Kế Website Y Tế Đặt Khám | Clinic Booking 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website y tế đặt khám: chuyên khoa, lịch bác sĩ, form booking, Zalo & bảo mật dữ liệu. Quy trình 7 bước, giá 8–18 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website y tế đặt khám trực tuyến: clinic booking, chuyên khoa, UX bệnh nhân và tuân thủ tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Y Tế Đặt Khám | Clinic Booking 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "y-te-web-la-gi", label: "Website y tế đặt khám là gì?" },
  { id: "vi-sao-can", label: "Vì sao phòng khám cần web?" },
  { id: "cau-truc", label: "Cấu trúc website y tế" },
  { id: "chuyen-khoa", label: "Trang chuyên khoa & bác sĩ" },
  { id: "dat-kham", label: "Đặt khám online" },
  { id: "bao-mat", label: "Bảo mật & pháp lý" },
  { id: "zalo-cskh", label: "Zalo & chăm sóc bệnh nhân" },
  { id: "seo-y-te", label: "SEO y tế local" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website y tế đặt khám</strong> là xây dựng nền tảng web cho phòng khám, bệnh viện tư nhân hoặc trung tâm chuyên khoa — giới thiệu dịch vụ y tế, profile bác sĩ, bảng giá khám và <em>hệ thống đặt lịch khám trực tuyến</em> — bệnh nhân chọn chuyên khoa, bác sĩ, khung giờ trống và nhận xác nhận qua SMS/Zalo thay vì gọi điện chờ lâu.`,
    `Bài viết dành cho chủ phòng khám, quản lý y tế và marketing clinic đang cần <strong>${KEYWORD}</strong>: cấu trúc web chuẩn y tế, booking engine, tuân thủ bảo vệ dữ liệu cá nhân (NĐ 13/2023), SEO local “khám [chuyên khoa] [quận]” và mức giá triển khai 2026 tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Web y tế = trust + đặt khám 24/7 — giảm tải lễ tân gọi điện.",
  "Trang chuyên khoa + bác sĩ — SEO và conversion song song.",
  "Booking: chọn khoa → bác sĩ → ngày/giờ → xác nhận — mobile-first.",
  "Bảo mật dữ liệu bệnh nhân — HTTPS, consent form, không lưu trữ lỏng lẻo.",
  "Bứt Phá: website y tế đặt khám 8–18 triệu tùy booking và số chuyên khoa.",
])}

${wpImg(1, "Thiết kế website y tế đặt khám trực tuyến phòng khám chuyên khoa")}

<h2 id="y-te-web-la-gi">Website y tế đặt khám là gì?</h2>

<p><strong>Website y tế đặt khám</strong> là site tập trung:</p>
<ul>
  <li><strong>Giới thiệu cơ sở y tế:</strong> Giấy phép, thiết bị, quy trình khám</li>
  <li><strong>Chuyên khoa:</strong> Nội, ngoại, nhi, sản, da liễu, tai mũi họng…</li>
  <li><strong>Đội ngũ bác sĩ:</strong> Học vị, kinh nghiệm, lịch khám</li>
  <li><strong>Bảng giá / gói khám:</strong> Minh bạch — giảm hỏi giá qua điện thoại</li>
  <li><strong>Đặt khám online:</strong> Form hoặc calendar slot realtime</li>
  <li><strong>Tư vấn:</strong> Hotline, Zalo OA, chat (trong giờ hành chính)</li>
</ul>

<p><strong>Thiết kế website y tế đặt khám</strong> khác website giới thiệu chung — UX phải <em>đơn giản, tin cậy, accessible</em> cho mọi lứa tuổi, kể cả người lớn tuổi ít quen công nghệ.</p>

<h2 id="vi-sao-can">Vì sao phòng khám cần website đặt khám?</h2>

<ul>
  <li><strong>Giảm quá tải lễ tân:</strong> 40–60% lịch hẹn có thể book online — đặc biệt ngoài giờ</li>
  <li><strong>SEO local:</strong> “Khám nội khoa Quận 7”, “đặt khám sản phụ khoa TPHCM”</li>
  <li><strong>Trust:</strong> Giấy phép BYT, ảnh cơ sở, review Google — web chuyên nghiệp</li>
  <li><strong>Remarketing:</strong> Nhắc tái khám, gói sức khỏe định kỳ qua email/ZNS</li>
  <li><strong>Cạnh tranh:</strong> Phòng khám cùng khu có web booking — bạn mất bệnh nhân nếu không có</li>
</ul>

<p>Xem thêm <a href="${SITE}/blog/thiet-ke-website-phong-kham-da-khoa">website phòng khám đa khoa</a> và <a href="${SITE}/blog/thiet-ke-website-dat-lich-hen-online">đặt lịch hẹn online</a>.</p>

<h2 id="cau-truc">Cấu trúc website y tế chuẩn</h2>

<ol>
  <li><strong>Trang chủ:</strong> USP, chuyên khoa nổi bật, CTA “Đặt khám ngay”, hotline</li>
  <li><strong>Giới thiệu:</strong> Sứ mệnh, giấy phép, thiết bị y tế</li>
  <li><strong>Chuyên khoa:</strong> Landing từng khoa — triệu chứng, quy trình khám</li>
  <li><strong>Bác sĩ:</strong> Profile + lịch khám + nút đặt với bác sĩ đó</li>
  <li><strong>Bảng giá / gói:</strong> Khám tổng quát, gói doanh nghiệp, vaccine</li>
  <li><strong>Đặt khám:</strong> Wizard booking — 3–5 bước mobile</li>
  <li><strong>Tin tức y khoa:</strong> Blog SEO — không thay thế tư vấn y tế</li>
  <li><strong>Liên hệ:</strong> Map, giờ làm việc, nhiều chi nhánh</li>
</ol>

<h2 id="chuyen-khoa">Trang chuyên khoa &amp; profile bác sĩ</h2>

<p>Mỗi chuyên khoa trong <strong>${KEYWORD}</strong> nên có trang riêng:</p>
<ul>
  <li><strong>Triệu chứng thường gặp</strong> — khi nào nên khám (disclaimer: không chẩn đoán online)</li>
  <li><strong>Quy trình khám</strong> — thời gian, cần nhịn ăn? mang giấy tờ gì?</li>
  <li><strong>Thiết bị / kỹ thuật</strong> — nội soi, siêu âm 4D…</li>
  <li><strong>Bác sĩ phụ trách</strong> — link profile đặt lịch trực tiếp</li>
  <li><strong>FAQ chuyên khoa</strong> — giá khám, bảo hiểm y tế (nếu có)</li>
</ul>

<p>Profile bác sĩ: ảnh chuyên nghiệp, bằng cấp, nơi đào tạo, số năm kinh nghiệm, ngôn ngữ (VN/EN cho expat).</p>

${wpImg(2, "Trang chuyên khoa và đặt lịch bác sĩ trên website y tế")}

<h2 id="dat-kham">Hệ thống đặt khám online</h2>

<h3>Flow booking chuẩn</h3>
<ol>
  <li>Chọn chuyên khoa (hoặc triệu chứng gợi ý khoa)</li>
  <li>Chọn bác sĩ — hoặc “Bác sĩ bất kỳ sớm nhất”</li>
  <li>Chọn ngày + khung giờ trống (sync lịch bác sĩ)</li>
  <li>Nhập: Họ tên, SĐT, ngày sinh, ghi chú triệu chứng</li>
  <li>Xác nhận — SMS/ZNS/email mã lịch hẹn</li>
  <li>Nhắc lịch 24h và 2h trước khám</li>
</ol>

<h3>Mức độ tích hợp</h3>
<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Mức</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Mô tả</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Form + email</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Lễ tân gọi xác nhận slot</td>
      <td class="border border-indigo-100 px-3 py-2">Phòng khám nhỏ, &lt;30 lịch/ngày</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Calendar slot</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Admin set giờ trống — auto confirm</td>
      <td class="border border-indigo-100 px-3 py-2">Clinic 2–5 bác sĩ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Sync HIS/EMR</strong></td>
      <td class="border border-indigo-100 px-3 py-2">API phần mềm quản lý phòng khám</td>
      <td class="border border-indigo-100 px-3 py-2">Bệnh viện tư, chuỗi clinic</td>
    </tr>
  </tbody>
</table>

<h3>Thanh toán (tùy chọn)</h3>
<ul>
  <li>Đặt cọc khám online — MoMo/VNPay giảm no-show</li>
  <li>Thanh toán sau khám tại quầy — phổ biến VN</li>
  <li>Gói khám doanh nghiệp — invoice B2B</li>
</ul>

<h2 id="bao-mat">Bảo mật dữ liệu &amp; tuân thủ pháp lý</h2>

<ul>
  <li><strong>HTTPS bắt buộc</strong> — mọi form bệnh nhân</li>
  <li><strong>Consent checkbox:</strong> Đồng ý xử lý dữ liệu cá nhân theo NĐ 13/2023</li>
  <li><strong>Chính sách bảo mật</strong> — ai truy cập hồ sơ, thời gian lưu</li>
  <li><strong>Không public triệu chứng nhạy cảm</strong> — form gửi encrypted, admin login</li>
  <li><strong>Disclaimer y tế:</strong> Web không thay tư vấn trực tiếp bác sĩ — tránh cam kết chữa bệnh</li>
  <li><strong>Giấy phép hiển thị:</strong> Số GP hoạt động BYT trên footer</li>
</ul>

<h2 id="zalo-cskh">Zalo OA, hotline &amp; chăm sóc sau đặt khám</h2>

<ul>
  <li><strong>Zalo OA:</strong> Nút chat — tư vấn chọn khoa trước khi book</li>
  <li><strong>ZNS:</strong> Xác nhận lịch, nhắc tái khám — open rate cao hơn SMS</li>
  <li><strong>Hotline sticky mobile:</strong> Người già ưu tiên gọi — song song web</li>
  <li><strong>Đa chi nhánh:</strong> Chọn cơ sở gần nhất trước khi chọn bác sĩ</li>
</ul>

<p>Xem <a href="${SITE}/blog/thiet-ke-website-tich-hop-zalo">tích hợp Zalo</a>.</p>

<h2 id="seo-y-te">SEO local cho website y tế</h2>

<ul>
  <li><strong>Title:</strong> “Khám [chuyên khoa] [Quận/Huyện] | [Tên phòng khám]”</li>
  <li><strong>Google Business Profile:</strong> Link đặt khám web trên GBP</li>
  <li><strong>Schema MedicalClinic / Physician:</strong> JSON-LD địa chỉ, giờ mở</li>
  <li><strong>Blog:</strong> “Dấu hiệu nên khám nội khoa” — E-E-A-T, bác sĩ duyệt nội dung</li>
  <li><strong>Review:</strong> Nhắc bệnh nhân hài lòng review Google — không fake</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website y tế — 7 bước</h2>

<ol>
  <li><strong>Brief clinic:</strong> Chuyên khoa, bác sĩ, giờ khám, quy trình hiện tại.</li>
  <li><strong>Sitemap &amp; wireframe:</strong> Booking flow mobile — test với lễ tân.</li>
  <li><strong>UI design:</strong> Clean, medical trust — xanh/trắng, font rõ.</li>
  <li><strong>Dev + CMS:</strong> Trang khoa, bác sĩ, form/calendar booking.</li>
  <li><strong>Email/SMS/ZNS:</strong> Template xác nhận, nhắc lịch, hủy lịch.</li>
  <li><strong>Train staff:</strong> Lễ tân xử lý booking web — SOP sync lịch bác sĩ.</li>
  <li><strong>Launch + SEO:</strong> GBP, schema, ads local nếu cần fill slot.</li>
</ol>

<p><strong>Thời gian:</strong> 4–8 tuần (form + calendar); 8–14 tuần nếu sync HIS.</p>

<h2 id="bang-gia">Bảng giá thiết kế website y tế đặt khám 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Clinic Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">8.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">5 chuyên khoa, form đặt khám, profile bác sĩ, SEO local</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Clinic Booking</strong></td>
      <td class="border border-indigo-100 px-3 py-2">13.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Calendar slot, ZNS confirm, multi-branch, blog y khoa</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Clinic Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">18.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">10+ khoa, cọc MoMo, admin dashboard, schema Medical</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bảo trì</strong></td>
      <td class="border border-indigo-100 px-3 py-2">2.500.000đ/tháng</td>
      <td class="border border-indigo-100 px-3 py-2">Cập nhật lịch bác sĩ, backup, hỗ trợ booking</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website y tế đặt khám</h2>

<ul>
  <li>Cam kết chữa khỏi 100% — vi phạm quảng cáo y tế, mất trust.</li>
  <li>Booking không sync lịch bác sĩ — trùng slot, bệnh nhân đến phải chờ.</li>
  <li>Form quá dài — bỏ dở trên mobile.</li>
  <li>Không nhắc lịch — no-show cao, lỗ doanh thu.</li>
  <li>Thiếu giấy phép BYT trên web — nghi ngờ pháp lý.</li>
  <li>Blog copy nội dung y khoa không duyệt bác sĩ — sai chuyên môn.</li>
  <li>Web chậm, không HTTPS — bệnh nhân không tin gửi thông tin.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-phong-kham-da-khoa`,
    label: "Phòng khám đa khoa",
    desc: "Clinic tổng quát.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-nha-khoa`,
    label: "Website nha khoa",
    desc: "Booking nha khoa.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-dat-lich-hen-online`,
    label: "Đặt lịch hẹn online",
    desc: "Logic booking chung.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn website y tế",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website y tế đặt khám giá bao nhiêu?",
      a: "Tại Bứt Phá từ 8.000.000đ (form + chuyên khoa) đến 18.000.000đ (calendar + multi-branch). Báo giá theo số khoa và tích hợp ZNS/HIS.",
    },
    {
      q: "Website có thay phần mềm quản lý phòng khám không?",
      a: "Không — web là cửa đặt khám và marketing. EMR/HIS quản lý hồ sơ bệnh án; có thể tích hợp API nếu vendor hỗ trợ.",
    },
    {
      q: "Bệnh nhân có đặt khám ngoài giờ được không?",
      a: "Có — form/calendar 24/7. Lễ tân xác nhận sáng hôm sau hoặc auto-confirm nếu cấu hình slot cố định.",
    },
    {
      q: "Có cần thanh toán online khi đặt khám không?",
      a: "Không bắt buộc — nhiều clinic VN thu phí tại quầy. Cọc online giúp giảm no-show — tùy chọn gói Pro.",
    },
    {
      q: "SEO “khám nội khoa quận X” mất bao lâu?",
      a: "2–4 tháng local SEO với GBP + content chuyên khoa. Ads Google Local bù traffic ban đầu.",
    },
    {
      q: "Web y tế có cần đa ngôn ngữ không?",
      a: "Khu expat, du lịch y tế — nên có EN. Phòng khám địa phương thường chỉ VN.",
    },
    {
      q: "Bao lâu go-live website y tế?",
      a: "4–8 tuần với form booking. Calendar + nhiều chi nhánh 8–10 tuần.",
    },
    {
      q: "Bứt Phá có thiết kế website y tế đặt khám không?",
      a: "Có — phòng khám, trung tâm chuyên khoa, chuỗi clinic. Booking + SEO local. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website y tế đặt khám</strong> hiệu quả = trust y tế (giấy phép, bác sĩ rõ ràng) + booking mobile đơn giản + nhắc lịch ZNS + bảo mật dữ liệu — giảm tải lễ tân và tăng bệnh nhân mới qua SEO local.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — số chuyên khoa, mức booking và báo giá theo quy mô phòng khám của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website y tế đặt khám",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
