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

const KEYWORD = "thiết kế website mầm non";
const TITLE = "Thiết Kế Website Mầm Non Và Trường Học";

export const REWRITE_THIET_KE_WEBSITE_TRE_EM_MAM_NON = {
  title: TITLE,
  slug: "thiet-ke-website-tre-em-mam-non",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website trường mầm non, đăng ký nhập học, tham quan trường, giáo dục sớm, portal phụ huynh",
  metaTitle: "Thiết Kế Website Mầm Non | Nhập Học & Phụ Huynh 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website mầm non: chương trình giáo dục, gallery an toàn, form tham quan nhập học và SEO local. Quy trình 7 bước, giá 7–14 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website mầm non và trường học: xây dựng trust phụ huynh, đăng ký tham quan, nhập học và portal thông báo tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Mầm Non | Nhập Học & Phụ Huynh 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "mam-non-web-la-gi", label: "Website mầm non là gì?" },
  { id: "vi-sao-can", label: "Vì sao trường cần web chuyên?" },
  { id: "trust-phu-huynh", label: "Xây dựng trust phụ huynh" },
  { id: "cau-truc", label: "Cấu trúc website trường học" },
  { id: "chuong-trinh", label: "Chương trình & đội ngũ" },
  { id: "enrollment", label: "Tham quan & nhập học" },
  { id: "portal", label: "Portal phụ huynh" },
  { id: "seo", label: "SEO trường mầm non local" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website mầm non</strong> là xây dựng nền tảng web cho trường mầm non, nhà trẻ, kindergarten hoặc trung tâm giáo dục sớm — trình bày chương trình học, đội ngũ giáo viên, cơ sở vật chất an toàn, gallery hoạt động hàng ngày, học phí tham khảo, form <em>đăng ký tham quan</em> và <em>nhập học</em> — giúp phụ huynh research trước khi gửi con, chuyển traffic Google “trường mầm non [quận]” thành lịch tham quan thực tế.`,
    `Bài viết dành cho hiệu trưởng, chủ trường tư và team marketing giáo dục đang cần <strong>${KEYWORD}</strong>: cách xây trust phụ huynh online, enrollment funnel, portal thông báo, tuân thủ quyền trẻ em khi đăng ảnh và mức giá triển khai 2026 tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Mầm non web = trust trước enrollment — ảnh thật, giấy phép, chương trình rõ.",
  "Form tham quan + nhập học ngắn mobile — phụ huynh bận, quyết định cả gia đình.",
  "Gallery hoạt động & CSVC — 80% phụ huynh xem ảnh phòng học trước khi đến.",
  "SEO local “mầm non [quận]” + blog nuôi dạy con — organic dài hạn.",
  "Bứt Phá: website mầm non 7–14 triệu tùy portal phụ huynh và đa cơ sở.",
])}

${wpImg(1, "Thiết kế website mầm non chương trình giáo dục và form đăng ký tham quan")}

<h2 id="mam-non-web-la-gi">Website mầm non &amp; trường học là gì?</h2>

<p><strong>Website mầm non</strong> (preschool / kindergarten website) phục vụ giai đoạn <em>phụ huynh tìm trường</em> và <em>sau nhập học</em> — khác website trung tâm tiếng Anh hay elearning thuần online. <strong>Thiết kế website mầm non</strong> thường gồm:</p>

<ul>
  <li><strong>Giới thiệu trường:</strong> Sứ mệnh, giấy phép, năm thành lập, chứng nhận an toàn</li>
  <li><strong>Chương trình giáo dục:</strong> Nhà trẻ, mẫu giáo, Montessori, STEAM sớm…</li>
  <li><strong>Đội ngũ:</strong> Profile cô giáo — bằng cấp, kinh nghiệm</li>
  <li><strong>Cơ sở vật chất:</strong> Phòng học, sân chơi, camera, bếp ăn, y tế</li>
  <li><strong>Gallery:</strong> Hoạt động hàng ngày — có consent phụ huynh</li>
  <li><strong>Học phí &amp; chính sách:</strong> Tham khảo, ăn uống, đưa đón</li>
  <li><strong>Đăng ký:</strong> Form tham quan, nhập học, hỏi đáp</li>
</ul>

<p>So sánh thêm <a href="${SITE}/blog/thiet-ke-website-elearning">website elearning</a> (khóa học online) và <a href="${SITE}/blog/thiet-ke-website-truong-mam-non">website trường mầm non</a> (góc industry tổng quan).</p>

<h2 id="vi-sao-can">Vì sao trường mầm non cần website chuyên?</h2>

<ul>
  <li><strong>Phụ huynh research kỹ:</strong> Gửi con 2–5 tuổi — trust là yếu tố số 1, không phải giá rẻ nhất</li>
  <li><strong>Cạnh tranh local:</strong> Mỗi quận có hàng chục trường — web chuyên nghiệp nổi bật</li>
  <li><strong>Giảm tải tư vấn:</strong> FAQ học phí, giờ học, thực đơn — trả lời trước trên web</li>
  <li><strong>Enrollment funnel:</strong> Google → web → form tham quan → tour → nhập học</li>
  <li><strong>SEO intent:</strong> “Trường mầm non Quận 7”, “nhà trẻ Montessori Thủ Đức”</li>
  <li><strong>Referral:</strong> Phụ huynh cũ chia sẻ link web — social proof</li>
  <li><strong>Đa cơ sở:</strong> Filter chi nhánh — một web nhiều campus</li>
</ul>

<h2 id="trust-phu-huynh">Xây dựng trust phụ huynh trên website</h2>

<p>Trái tim của <strong>${KEYWORD}</strong> — phụ huynh không mua “sản phẩm”, họ gửi <em>đứa con</em>:</p>

<ul>
  <li><strong>Ảnh thật, không stock:</strong> Phòng học, bếp, sân chơi trường mình — stock trẻ em smile generic mất trust</li>
  <li><strong>Giấy phép hiển thị:</strong> Sở GD&amp;ĐT, PCCC, ATTP bếp ăn — scan hoặc số quyết định</li>
  <li><strong>Video tour:</strong> Walkthrough 2–3 phút — phụ huynh bận không đến ngay được</li>
  <li><strong>Testimonial phụ huynh:</strong> Review có tên (che mặt con nếu cần) — video ngắn</li>
  <li><strong>Chính sách an toàn:</strong> Quy trình đón trả, ống nghe, camera policy</li>
  <li><strong>Đội ngũ minh bạch:</strong> Ảnh + CV cô giáo — không chỉ tên chung chung</li>
  <li><strong>Consent ảnh trẻ:</strong> Chỉ đăng ảnh học sinh có phép phụ huynh — ethical bắt buộc</li>
</ul>

${wpImg(2, "Gallery cơ sở vật chất an toàn trên website trường mầm non thu hút phụ huynh")}

<h2 id="cau-truc">Cấu trúc website mầm non chuẩn</h2>

<ol>
  <li><strong>Trang chủ:</strong> Hero ấm áp, USP (Montessori / song ngữ / organic meal), CTA tham quan</li>
  <li><strong>Về trường:</strong> Lịch sử, tầm nhìn, giấy phép</li>
  <li><strong>Chương trình:</strong> Theo độ tuổi — nhà trẻ 18–36 tháng, mẫu giáo 3–5 tuổi</li>
  <li><strong>Đội ngũ giáo viên:</strong> Grid profile cô — credentials</li>
  <li><strong>Cơ sở vật chất:</strong> Phòng, sân, thư viện, phòng y tế</li>
  <li><strong>Thực đơn &amp; lịch:</strong> Menu tuần PDF/embed, lịch năm học</li>
  <li><strong>Học phí:</strong> Bảng tham khảo + form báo giá theo độ tuổi</li>
  <li><strong>Gallery / Tin tức:</strong> Hoạt động Tết, summer camp, field trip</li>
  <li><strong>Blog:</strong> SEO “dấu hiệu con sẵn sàng đi mầm non”, “chọn trường mầm non”</li>
  <li><strong>Liên hệ &amp; đăng ký:</strong> Map, hotline, form tham quan</li>
</ol>

<h2 id="chuong-trinh">Chương trình giáo dục &amp; phương pháp</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Hạng mục</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Nội dung web nên có</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Phương pháp</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Montessori, Reggio, STEAM, song ngữ — giải thích phụ huynh hiểu</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Lịch trong ngày</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Timeline: đón trẻ → ăn sáng → học → ngủ → vui chơi → trả trẻ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Môn ngoại khóa</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Bơi, võ, piano, tiếng Anh — landing riêng nếu ads</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Summer camp</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Landing mùa hè — enrollment ngắn hạn</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đưa đón</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Tuyến xe, phí, vùng phủ — FAQ</td>
    </tr>
  </tbody>
</table>

<h2 id="enrollment">Form tham quan &amp; đăng ký nhập học</h2>

<ul>
  <li><strong>Form tham quan:</strong> Tên PH, SĐT, tuổi con, cơ sở quan tâm, ngày mong muốn — 5 field</li>
  <li><strong>Calendar slot:</strong> Chọn khung giờ tour — tránh quá tải cùng lúc</li>
  <li><strong>Form nhập học:</strong> Sau tour — upload giấy khai sinh, ảnh (link drive), gói học</li>
  <li><strong>Auto-reply ZNS/Email:</strong> “Đã nhận — trường gọi xác nhận trong 24h”</li>
  <li><strong>CRM tag:</strong> Lead mới / đã tour / nhập học — follow-up không sót</li>
  <li><strong>Thank-you upsell:</strong> Tài liệu “Chuẩn bị cho ngày đầu đi học” PDF</li>
  <li><strong>Chat Zalo:</strong> Nút nổi — phụ huynh VN quen Zalo hơn email</li>
</ul>

<p>Flow booking tương tự <a href="${SITE}/blog/thiet-ke-website-dat-lich-hen-online">đặt lịch hẹn online</a> — slot + confirm.</p>

<h2 id="portal">Portal phụ huynh (sau nhập học)</h2>

<ul>
  <li><strong>Đăng nhập PH:</strong> Xem thông báo lớp, thực đơn tuần, lịch nghỉ</li>
  <li><strong>Album riêng:</strong> Ảnh lớp con — members-only, không public Google</li>
  <li><strong>Đóng học phí:</strong> Link MoMo/VNPay hoặc thông báo chuyển khoản</li>
  <li><strong>Xin nghỉ học:</strong> Form digital — thay giấy note</li>
  <li><strong>Phiên họp PH:</strong> Lịch họp, biên bản PDF</li>
</ul>

<p>Portal nâng cao gần <a href="${SITE}/blog/thiet-ke-website-membership">website membership</a> — gated content theo tài khoản phụ huynh.</p>

<h2 id="seo">SEO &amp; marketing trường mầm non local</h2>

<ul>
  <li><strong>Title local:</strong> “Trường mầm non [Quận] | [Tên trường] | Montessori”</li>
  <li><strong>Blog long-tail:</strong> “Trường mầm non tốt Quận X”, “học phí mầm non 2026”</li>
  <li><strong>Schema Preschool / EducationalOrganization:</strong> JSON-LD địa chỉ, giờ</li>
  <li><strong>Google Business:</strong> Ảnh lớp, review phụ huynh — link form tham quan</li>
  <li><strong>Facebook group PH:</strong> Cộng đồng phụ huynh trường — organic referral</li>
  <li><strong>Ads “tuyển sinh”:</strong> Landing tham quan — pixel lead Facebook</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website mầm non — 7 bước</h2>

<ol>
  <li><strong>Brief trường:</strong> Phương pháp, độ tuổi, số cơ sở, học phí range, USP.</li>
  <li><strong>Content &amp; media:</strong> Chụp CSVC, lớp học, cô giáo — video tour nếu có budget.</li>
  <li><strong>Wireframe:</strong> Trust-first homepage, enrollment form mobile, program pages.</li>
  <li><strong>UI design:</strong> Tông tươi sáng (xanh, vàng, cam nhạt), thân thiện — không corporate lạnh.</li>
  <li><strong>Dev + forms:</strong> Tham quan, nhập học, ZNS, CRM webhook.</li>
  <li><strong>Seed blog + gallery:</strong> 5 bài blog + 20 ảnh hoạt động — launch không trống.</li>
  <li><strong>Launch + local SEO:</strong> GBP, schema, ads tuyển sinh test.</li>
</ol>

<p><strong>Thời gian:</strong> 3–6 tuần (website); +2 tuần portal phụ huynh.</p>

<h2 id="bang-gia">Bảng giá thiết kế website mầm non 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Preschool Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">7.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Giới thiệu, chương trình, gallery, form tham quan, SEO cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Preschool Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">10.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Đa cơ sở, học phí, blog, video tour embed, schema local</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Preschool Premium</strong></td>
      <td class="border border-indigo-100 px-3 py-2">14.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Portal phụ huynh, album gated, ZNS, ads landing tuyển sinh</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Landing tuyển sinh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">+2.500.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">1 landing CRO campaign Facebook “tham quan miễn phí”</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website mầm non</h2>

<ul>
  <li>Ảnh stock trẻ em — phụ huynh đến thấy khác, mất trust ngay.</li>
  <li>Đăng ảnh học sinh không consent — vi phạm quyền trẻ em.</li>
  <li>Học phí ẩn hoàn toàn — inquiry rác hoặc phụ huynh bỏ vì “sợ đắt”.</li>
  <li>Web chỉ 1 trang — không có chương trình, đội ngũ chi tiết.</li>
  <li>Form dài 15 field — dropout trên mobile.</li>
  <li>Không cập nhật thực đơn/lịch nghỉ — phụ huynh nghĩ trường không chuyên nghiệp.</li>
  <li>Thiếu thông tin an toàn — camera, đón trả, y tế.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-elearning`,
    label: "Website elearning",
    desc: "Khóa học online giáo dục.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-membership`,
    label: "Website membership",
    desc: "Portal phụ huynh gated.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-dat-lich-hen-online`,
    label: "Đặt lịch hẹn online",
    desc: "Booking tham quan.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn web mầm non",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website mầm non giá bao nhiêu?",
      a: "Tại Bứt Phá từ 7.000.000đ (brochure + form) đến 14.000.000đ (portal phụ huynh). Báo giá theo số cơ sở và tính năng enrollment.",
    },
    {
      q: "Website mầm non cần tone màu gì?",
      a: "Tông tươi sáng, thân thiện — xanh lá, vàng, cam nhạt. Tạo cảm giác an toàn, vui vẻ, không corporate lạnh.",
    },
    {
      q: "Có nên có portal phụ huynh không?",
      a: "Trường 50+ học sinh nên có — thông báo, album lớp, học phí. Trường nhỏ có thể Zalo group + web public trước.",
    },
    {
      q: "Đăng ảnh trẻ em lên web có cần phép không?",
      a: "Bắt buộc — phụ huynh ký consent. Album lớp nên gated members-only, không index Google.",
    },
    {
      q: "SEO “trường mầm non [quận]” mất bao lâu?",
      a: "2–4 tháng local SEO + blog + Google Business. Ads tuyển sinh bù lead khi mở trường mới.",
    },
    {
      q: "Khác gì website trường tiểu học?",
      a: "Focus trust & an toàn trẻ nhỏ, gallery hoạt động, thực đơn — không điểm thi hay tuyển sinh lớp 6.",
    },
    {
      q: "Bao lâu go-live website mầm non?",
      a: "3–6 tuần. Chụp ảnh CSVC và viết chương trình là bước lâu nhất.",
    },
    {
      q: "Bứt Phá có thiết kế website mầm non không?",
      a: "Có — trường tư, kindergarten, trung tâm STEAM sớm. Enrollment + portal PH. Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website mầm non</strong> hiệu quả = trust phụ huynh (ảnh thật, giấy phép, đội ngũ) + chương trình rõ + form tham quan/nhập học mobile nhanh — chuyển research online thành tour và nhập học, giảm inbox hỏi lặp.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — phương pháp giáo dục, số cơ sở và báo giá theo portal phụ huynh bạn cần.`,
  ],
  ctaLabel: "→ Tư vấn website mầm non",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
