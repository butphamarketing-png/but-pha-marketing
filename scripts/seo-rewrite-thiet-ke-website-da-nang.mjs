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

const KEYWORD = "thiết kế website đà nẵng";
const TITLE = "Thiết Kế Website Đà Nẵng Cho Du Lịch Và Dịch Vụ";
/** Slug cũ trên DB trước khi chuẩn hóa */
export const LEGACY_SLUG_DA_NANG = "thiet-ke-website-da-nang-du-lich";

export const REWRITE_THIET_KE_WEBSITE_DA_NANG = {
  title: TITLE,
  slug: "thiet-ke-website-da-nang",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "làm website đà nẵng, thiết kế web đà nẵng, website du lịch đà nẵng, dịch vụ website miền trung, agency web đà nẵng",
  metaTitle: "Thiết Kế Website Đà Nẵng | Báo Giá 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website Đà Nẵng: du lịch, khách sạn, tour, spa & dịch vụ miền Trung. Quy trình 7 bước, giá 3–12 triệu, SEO local. Tư vấn Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website Đà Nẵng cho du lịch và dịch vụ: đặc thù thị trường miền Trung, tính năng booking, SEO Maps và chọn đối tác uy tín.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Đà Nẵng | Báo Giá 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "da-nang-la-gi", label: "Thiết kế website Đà Nẵng là gì?" },
  { id: "vi-sao-da-nang", label: "Vì sao DN Đà Nẵng cần website?" },
  { id: "thi-truong", label: "Thị trường du lịch & dịch vụ miền Trung" },
  { id: "loai-website", label: "Loại website phổ biến tại Đà Nẵng" },
  { id: "tinh-nang", label: "Tính năng cần có (booking, tour…)" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá website Đà Nẵng" },
  { id: "seo-local", label: "SEO local & Google Maps" },
  { id: "chon-doi-tac", label: "Chọn đối tác uy tín" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website Đà Nẵng</strong> là dịch vụ xây dựng website chuyên nghiệp cho doanh nghiệp tại Đà Nẵng và khu vực miền Trung — đặc biệt các ngành <em>du lịch, khách sạn, tour, spa, F&amp;B và dịch vụ</em> phục vụ khách nội địa lẫn quốc tế. Khác template giá rẻ, <strong>${KEYWORD}</strong> chuẩn bao gồm UI/UX đẹp, đặt lịch/đặt tour, đa ngôn ngữ (khi cần), SEO local và tốc độ mobile — phù hợp mùa cao điểm du lịch Đà Nẵng – Hội An – Bà Nà.`,
    `Bài viết dành cho chủ homestay, công ty lữ hành, spa, nhà hàng và dịch vụ tại Đà Nẵng đang tìm <strong>${KEYWORD}</strong>: giải thích loại web cần làm, tính năng booking, quy trình, giá 2026 và cách xuất hiện trên Google khi khách search “tour đà nẵng”, “khách sạn gần biển”…`,
  ],
})}

${wpKeyTakeaways([
  "Đà Nẵng: du lịch + dịch vụ chiếm tỷ trọng lớn — web cần ảnh đẹp, đặt lịch, mobile nhanh.",
  "Tính năng hay dùng: booking tour/phòng, gallery, đa ngôn ngữ EN cho khách quốc tế.",
  "Bứt Phá: gói 3–12 triệu; hỗ trợ khách Đà Nẵng online hoặc gặp khi cần.",
  "SEO local: Maps, từ khóa “đà nẵng”, review Google nhúng vào web.",
  "Tránh web chỉ đẹp desktop — 80%+ khách du lịch duyệt bằng điện thoại.",
])}

${wpImg(8, "Thiết kế website Đà Nẵng cho du lịch và dịch vụ miền Trung")}

<h2 id="da-nang-la-gi">Thiết kế website Đà Nẵng là gì?</h2>

<p><strong>Thiết kế website Đà Nẵng</strong> là quy trình tạo website tối ưu cho doanh nghiệp hoạt động tại thành phố biển miền Trung — nơi du lịch và dịch vụ chiếm phần lớn nền kinh tế. Website không chỉ giới thiệu công ty mà còn:</p>

<ul>
  <li>Bán tour, combo du lịch, đặt phòng homestay/khách sạn</li>
  <li>Đặt lịch spa, nhà hàng, dịch vụ xe đưa đón sân bay</li>
  <li>Hiển thị gallery điểm đến: Bà Nà, Sơn Trà, Ngũ Hành Sơn, Hội An liền kề</li>
  <li>Hỗ trợ tiếng Anh cho khách Hàn, Nhật, Âu — phổ biến tại Đà Nẵng</li>
  <li>Tối ưu SEO “dịch vụ + đà nẵng” và Google Maps</li>
</ul>

<p><strong>${KEYWORD}</strong> cần hiểu <em>mùa vụ</em>: cao điểm hè và lễ Tết traffic tăng mạnh — web phải chịu tải và chuyển đổi tốt trên mobile.</p>

<h2 id="vi-sao-da-nang">Vì sao doanh nghiệp Đà Nẵng cần website chuyên nghiệp?</h2>

<ul>
  <li><strong>Khách tự tìm trên Google:</strong> Trước khi đến Đà Nẵng, du khách đã book tour, khách sạn online.</li>
  <li><strong>Cạnh tranh OTA:</strong> Booking, Agoda, Klook — website riêng giúp giữ margin và dữ liệu khách.</li>
  <li><strong>Uy tín dịch vụ:</strong> Spa, clinic, garage — khách địa phương và expat tra cứu review + website.</li>
  <li><strong>Mùa thấp điểm:</strong> SEO bền vững mang lead khi không chạy ads du lịch.</li>
  <li><strong>Liên kết vùng:</strong> Tour Đà Nẵng – Hội An – Huế — web là catalog sản phẩm du lịch.</li>
</ul>

<h2 id="thi-truong">Đặc thù thị trường website tại Đà Nẵng (miền Trung)</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Ngành mạnh</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Yêu cầu website</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Lữ hành &amp; tour</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Lịch tour, giá theo mùa, form đặt nhanh, Zalo</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Homestay / khách sạn</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Gallery phòng, calendar, Maps, đa ngôn ngữ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>F&amp;B, cafe view biển</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Menu online, đặt bàn, Instagram embed</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Spa, wellness</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Booking giờ, bảng giá dịch vụ, khuyến mãi</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bất động sản, cho thuê</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Listing căn hộ view sông/biển, lead form</td>
    </tr>
  </tbody>
</table>

<p>Khu vực <strong>Sơn Trà, Ngũ Hành Sơn, Hải Châu</strong> tập trung khách sạn và dịch vụ; <strong>Liên Chiểu, Hòa Vang</strong> nhiều khu công nghiệp và logistics — nội dung web nên phản ánh đúng khu vực phục vụ.</p>

${wpImg(2, "Website tour du lịch Đà Nẵng — gallery và đặt tour online")}

<h2 id="loai-website">Loại website phổ biến khi thiết kế tại Đà Nẵng</h2>

<ul>
  <li><strong>Website công ty lữ hành:</strong> Danh mục tour, blog điểm đến, đặt tour + thanh toán cọc.</li>
  <li><strong>Website khách sạn / homestay:</strong> Phòng, tiện ích, chính sách hủy, liên kết OTA (tùy chọn).</li>
  <li><strong>Landing tour single:</strong> Một tour Bà Nà / cáp treo — chạy ads Facebook/Google.</li>
  <li><strong>Website nhà hàng:</strong> Menu, đặt bàn, sự kiện, tiếng Anh cho khách du lịch.</li>
  <li><strong>Website dịch vụ địa phương:</strong> Spa, y tế, giáo dục — SEO “gần tôi” + Maps.</li>
</ul>

<h2 id="tinh-nang">Tính năng website du lịch &amp; dịch vụ Đà Nẵng</h2>

<p>Khi triển khai <strong>${KEYWORD}</strong> cho ngành du lịch/dịch vụ, cân nhắc:</p>

<ul>
  <li><strong>Đặt lịch / đặt tour:</strong> Form ngắn hoặc plugin booking — xác nhận qua email/Zalo.</li>
  <li><strong>Gallery &amp; video:</strong> Ảnh nén WebP, lazy-load — vẫn đẹp trên 4G.</li>
  <li><strong>Đa ngôn ngữ (i18n):</strong> VI + EN tối thiểu cho tour quốc tế.</li>
  <li><strong>Tích hợp thanh toán:</strong> VNPay, MoMo, chuyển khoản — đặt cọc tour.</li>
  <li><strong>Review &amp; UGC:</strong> Nhúng đánh giá Google, testimonial khách Hàn/Nhật.</li>
  <li><strong>Chat Zalo / WhatsApp:</strong> Khách du lịch hỏi nhanh trước khi book.</li>
  <li><strong>Schema:</strong> TouristTrip, Hotel, LocalBusiness — rich snippet.</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website Đà Nẵng — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Ngành (tour/khách sạn/spa), khách mục tiêu (nội địa/quốc tế), ngân sách.</li>
  <li><strong>Wireframe:</strong> Trang Tour, Giá, Gallery, Đặt lịch, Liên hệ + bản đồ.</li>
  <li><strong>UI design:</strong> Visual “biển, nắng, resort” hoặc tone spa cao cấp — theo brand.</li>
  <li><strong>Lập trình:</strong> Responsive, booking, đa ngôn ngữ (nếu có), GA4.</li>
  <li><strong>SEO on-page:</strong> “thiết kế / tour / spa + đà nẵng”, alt ảnh, internal link.</li>
  <li><strong>Kiểm thử:</strong> Mobile 4G, form gửi, PageSpeed trước mùa cao điểm.</li>
  <li><strong>Go-live:</strong> Domain, SSL, GSC, đồng bộ Google Business Profile.</li>
</ol>

<p><strong>Thời gian:</strong> Landing tour 1–2 tuần; website lữ hành 4–8 tuần; khách sạn nhiều phòng có thể lâu hơn.</p>

<h2 id="bang-gia">Bảng giá thiết kế website Đà Nẵng 2026</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp Đà Nẵng</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Giới thiệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Homestay nhỏ, spa cá nhân, landing đơn giản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tối ưu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Công ty tour, nhà hàng cần SEO &amp; gallery</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Kinh doanh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Booking, CRO, marketing tích hợp</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hệ thống</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Nhiều tour, đa ngôn ngữ, tính năng mở rộng</td>
    </tr>
  </tbody>
</table>

<p>Chi tiết phí ẩn: <a href="${SITE}/blog/bao-gia-thiet-ke-website">báo giá thiết kế website</a>.</p>

<h2 id="seo-local">SEO local &amp; Google Maps Đà Nẵng</h2>

<ul>
  <li><strong>Google Business Profile:</strong> Địa chỉ chính xác (đường ven biển, quận) — đồng bộ với web.</li>
  <li><strong>Từ khóa địa phương:</strong> “tour đà nẵng”, “spa ngũ hành sơn”, “khách sạn sơn trà”.</li>
  <li><strong>Nội dung blog:</strong> Hướng dẫn du lịch — kéo organic mùa thấp điểm.</li>
  <li><strong>Ảnh có geotag &amp; alt:</strong> Mô tả điểm đến bằng text — Google Images.</li>
  <li><strong>Backlink địa phương:</strong> Hợp tác khách sạn, blogger du lịch miền Trung.</li>
</ul>

<p>Xem thêm <a href="${SITE}/google-maps">dịch vụ Google Maps</a> để tối ưu hiển thị pack địa phương.</p>

${wpImg(10, "SEO local Đà Nẵng — Google Maps và website du lịch")}

<h2 id="chon-doi-tac">Chọn đơn vị thiết kế website Đà Nẵng uy tín</h2>

<ul>
  <li>Portfolio có dự án <strong>du lịch/dịch vụ</strong> — không chỉ web công ty generic</li>
  <li>Hiểu booking, mùa cao điểm, đa ngôn ngữ</li>
  <li>Báo giá scope rõ — phí booking plugin, đa ngôn ngữ tách dòng</li>
  <li>Tối ưu tốc độ khi nhiều ảnh gallery</li>
  <li>Hỗ trợ sau go-live — sửa tour, giá Tết trước mùa cao điểm</li>
</ul>

<p>Bứt Phá Marketing nhận dự án <strong>${KEYWORD}</strong> và toàn quốc — tư vấn online, hỗ trợ khách Đà Nẵng khi cần.</p>

<h2 id="sai-lam">Sai lầm khi làm website du lịch Đà Nẵng</h2>

<ul>
  <li>Ảnh gốc quá nặng — web chậm, khách bỏ trang trên 4G biển.</li>
  <li>Chỉ có Fanpage — mất SEO khi khách search Google trước chuyến đi.</li>
  <li>Giá tour không cập nhật — mất niềm tin; cần CMS dễ sửa.</li>
  <li>Không có tiếng Anh — bỏ lỡ khách Hàn/Nhật/Âu tại Đà Nẵng.</li>
  <li>Form đặt tour dài — nên 3–5 trường + Zalo.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Tổng quan quy trình và giá.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-tphcm`,
    label: "Thiết kế website TPHCM",
    desc: "So sánh thị trường Nam – Trung.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-ha-noi`,
    label: "Thiết kế website Hà Nội",
    desc: "Thị trường B2B thủ đô.",
  },
  {
    href: `${SITE}/website`,
    label: "Đăng ký làm website Đà Nẵng",
    desc: "Tư vấn Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website Đà Nẵng giá bao nhiêu?",
      a: "Tại Bứt Phá từ 3.000.000đ đến 12.000.000đ. Website booking tour đa ngôn ngữ có thể cao hơn — báo giá sau khảo sát.",
    },
    {
      q: "Làm website tour Đà Nẵng mất bao lâu?",
      a: "Landing tour 1–2 tuần. Website công ty lữ hành đầy đủ 4–8 tuần tùy số tour và tính năng booking.",
    },
    {
      q: "Có cần tiếng Anh trên web du lịch không?",
      a: "Nên có nếu nhắm khách quốc tế — Đà Nẵng đón nhiều du khách Hàn, Nhật, Âu. Có thể làm giai đoạn 2.",
    },
    {
      q: "Website hay OTA (Booking, Agoda) tốt hơn?",
      a: "Kết hợp: OTA lấy volume; website giữ margin, brand và email khách để remarketing.",
    },
    {
      q: "Có tích hợp đặt phòng / đặt tour không?",
      a: "Có — form đặt cơ bản hoặc plugin booking; thanh toán cọc VNPay/MoMo tùy gói.",
    },
    {
      q: "SEO website Đà Nẵng bao lâu có khách?",
      a: "Từ khóa ít cạnh tranh 1–3 tháng có impression; mùa du lịch cao điểm cần chuẩn bị trước 2–3 tháng.",
    },
    {
      q: "Bứt Phá có làm riêng cho du lịch Đà Nẵng không?",
      a: "Có — tư vấn theo ngành tour, khách sạn, spa; liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
    {
      q: "Web chậm mùa cao điểm có sao không?",
      a: "Rất nguy hiểm — traffic tăng đột biến. Cần hosting ổn định, nén ảnh, CDN; test trước tháng 4–7.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website Đà Nẵng</strong> cho du lịch và dịch vụ đòi hỏi giao diện hấp dẫn, mobile nhanh, booking tiện và SEO local — không chỉ “web giới thiệu”. Đầu tư đúng giúp bạn giữ khách qua mùa thấp điểm và tối đa chuyển đổi khi cao điểm.`,
    `Bắt đầu từ brief ngắn: tour, khách sạn hay spa — Bứt Phá Marketing tư vấn miễn phí gói <strong>${KEYWORD}</strong> và timeline phù hợp mùa kinh doanh của bạn.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website Đà Nẵng",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
