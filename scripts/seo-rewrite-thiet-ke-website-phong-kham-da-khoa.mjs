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

const KEYWORD = "thiết kế website phòng khám đa khoa";
const TITLE = "Thiết Kế Website Phòng Khám Đa Khoa Chuẩn SEO";

export const REWRITE_THIET_KE_WEBSITE_PHONG_KHAM_DA_KHOA = {
  title: TITLE,
  slug: "thiet-ke-website-phong-kham-da-khoa",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website phòng khám đa khoa, thiết kế web y tế, đặt lịch khám online, website phòng khám chuẩn seo",
  metaTitle: "Thiết Kế Website Phòng Khám Đa Khoa | SEO & Báo Giá | Bứt Phá",
  metaDescription:
    "Thiết kế website phòng khám đa khoa: chuyên khoa, bác sĩ trực, đặt lịch, BHYT và SEO local. Quy trình 7 bước, giá 4–12 triệu. Tư vấn Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website phòng khám đa khoa: danh mục chuyên khoa, đặt lịch theo ca, portal xét nghiệm và SEO y tế local.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Phòng Khám Đa Khoa | SEO & Báo Giá | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "da-khoa-la-gi", label: "Website PKĐK là gì?" },
  { id: "vi-sao-can", label: "Vì sao cần website?" },
  { id: "khac-chuyen-khoa", label: "Khác PK chuyên khoa?" },
  { id: "tinh-nang", label: "Tính năng bắt buộc" },
  { id: "cau-truc", label: "Cấu trúc trang chuẩn" },
  { id: "dat-lich", label: "Đặt lịch theo chuyên khoa" },
  { id: "bhyt-quy-trinh", label: "BHYT & quy trình khám" },
  { id: "bao-mat", label: "SSL & bảo mật dữ liệu" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "seo-local", label: "SEO local & Maps" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website phòng khám đa khoa</strong> (PKĐK) là quy trình xây dựng website chuyên biệt cho cơ sở khám chữa bệnh đa chuyên khoa — tập trung <em>danh mục khoa</em> (nội, nhi, sản, da liễu, tai mũi họng…), lịch bác sĩ trực, đặt lịch khám theo chuyên khoa, thông tin BHYT và SEO local “phòng khám + quận”. Khác website nha khoa hay thẩm mỹ viện một chuyên khoa, <strong>${KEYWORD}</strong> phải điều hướng bệnh nhân đúng khoa, giảm quá tải tổng đài và tuân thủ quy định nội dung y tế.`,
    `Bài viết dành cho giám đốc phòng khám, trưởng khoa và marketer y tế đang cần <strong>${KEYWORD}</strong>: checklist tính năng, cấu trúc trang, đặt lịch đa chuyên khoa, portal tra cứu xét nghiệm (tùy chọn), quy trình triển khai và mức giá 2026 — thực chiến cho thị trường Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "PKĐK web = điều hướng chuyên khoa rõ — bệnh nhân không gọi nhầm tổng đài.",
  "Đặt lịch theo khoa + ca trực BS — giảm chờ, tăng trải nghiệm.",
  "SSL bắt buộc — form đặt lịch và portal xét nghiệm cần HTTPS.",
  "SEO: “phòng khám đa khoa [quận]”, từng chuyên khoa một trang.",
  "Bứt Phá: gói 4–12 triệu; đa chi nhánh + schema LocalBusiness.",
])}

${wpImg(0, "Thiết kế website phòng khám đa khoa với đặt lịch theo chuyên khoa")}

<h2 id="da-khoa-la-gi">Thiết kế website phòng khám đa khoa là gì?</h2>

<p><strong>Website phòng khám đa khoa</strong> là trang web thiết kế riêng cho cơ sở y tế có nhiều chuyên khoa — không dùng template shop hay corporate chung. <strong>Thiết kế website phòng khám đa khoa</strong> ưu tiên:</p>

<ul>
  <li><strong>Danh mục chuyên khoa:</strong> Nội, nhi, sản, da liễu, TMH, mắt, xương khớp… — mỗi khoa trang riêng</li>
  <li><strong>Đội ngũ bác sĩ:</strong> Profile, lịch trực, chuyên môn từng BS</li>
  <li><strong>Đặt lịch khám online:</strong> Chọn khoa → bác sĩ/ca → ngày giờ</li>
  <li><strong>Bảng giá / BHYT:</strong> Dịch vụ có/không BHYT, quy trình thanh toán</li>
  <li><strong>Quy trình khám:</strong> Tiếp đón → khám → xét nghiệm → tái khám</li>
  <li><strong>Tin tức y tế:</strong> Cảnh báo mùa dịch, sức khỏe cộng đồng — SEO + trust</li>
  <li><strong>Tra cứu kết quả (tùy chọn):</strong> Portal bảo mật — mã BN + OTP</li>
</ul>

<h2 id="vi-sao-can">Vì sao phòng khám đa khoa cần website?</h2>

<ul>
  <li><strong>Google trước gọi điện:</strong> Bệnh nhân search “phòng khám gần tôi”, “khám nhi quận 7” — không có web = mất bệnh nhân mới.</li>
  <li><strong>Giảm quá tải lễ tân:</strong> FAQ + quy trình + đặt lịch online — nhân viên tập trung ca trực.</li>
  <li><strong>Điều hướng đúng khoa:</strong> Web rõ ràng — bệnh nhân đặt đúng chuyên khoa, giảm chuyển tuyến lộn xộn.</li>
  <li><strong>Uy tín y tế:</strong> Giấy phép hoạt động, đội ngũ, trang thiết bị — trust trước khi đến khám.</li>
  <li><strong>Chuỗi phòng khám:</strong> Một site — chọn chi nhánh, xem BS trực từng cơ sở.</li>
  <li><strong>SEO dài hạn:</strong> Traffic organic “khám [triệu chứng] [quận]” — chi phí thấp hơn ads liên tục.</li>
</ul>

<h2 id="khac-chuyen-khoa">Website PKĐK khác phòng khám chuyên khoa thế nào?</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Chuyên khoa (nha khoa, TMH…)</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phòng khám đa khoa</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Cấu trúc</strong></td>
      <td class="border border-indigo-100 px-3 py-2">1–3 nhóm dịch vụ sâu</td>
      <td class="border border-indigo-100 px-3 py-2">Nhiều khoa — cần menu điều hướng rõ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đặt lịch</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Chọn dịch vụ / BS</td>
      <td class="border border-indigo-100 px-3 py-2">Chọn khoa → BS/ca trực → giờ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>SEO</strong></td>
      <td class="border border-indigo-100 px-3 py-2">“nha khoa + quận”</td>
      <td class="border border-indigo-100 px-3 py-2">“phòng khám + quận” + từng chuyên khoa</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Nội dung</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Sâu một lĩnh vực</td>
      <td class="border border-indigo-100 px-3 py-2">Rộng — blog đa chủ đề sức khỏe</td>
    </tr>
  </tbody>
</table>

<p>So sánh thêm: <a href="${SITE}/blog/thiet-ke-website-nha-khoa">website nha khoa</a>, <a href="${SITE}/blog/thiet-ke-website-tham-my-vien">website thẩm mỹ viện</a>, <a href="${SITE}/blog/thiet-ke-website-y-te-dat-kham">website y tế đặt khám</a>.</p>

<h2 id="tinh-nang">Tính năng website phòng khám đa khoa bắt buộc</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tính năng</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Mục đích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Trang từng chuyên khoa</strong></td>
      <td class="border border-indigo-100 px-3 py-2">SEO “khám nhi quận X”, mô tả dịch vụ khoa</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Lịch bác sĩ trực</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Ca sáng/chiều, BS trực theo ngày — cập nhật CMS</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đặt lịch online</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Chọn khoa + ngày + triệu chứng ngắn</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Thông tin BHYT</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Dịch vụ BHYT chi trả, thủ tục, mức đồng chi trả</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bảng giá tham khảo</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Dịch vụ không BHYT — minh bạch, giảm hỏi giá</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hotline / Zalo</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Sticky mobile — cấp cứu / tư vấn nhanh</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Portal xét nghiệm (tùy chọn)</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Tra cứu kết quả — login bảo mật, HTTPS</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đa chi nhánh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Trang chi nhánh + Maps + schema riêng</td>
    </tr>
  </tbody>
</table>

<h2 id="cau-truc">Cấu trúc trang website PKĐK (10–15 trang)</h2>

<ol>
  <li><strong>Trang chủ:</strong> USP, chuyên khoa nổi bật, hotline, CTA đặt lịch.</li>
  <li><strong>Giới thiệu:</strong> Lịch sử PK, giấy phép, cơ sở vật chất, cam kết chất lượng.</li>
  <li><strong>Chuyên khoa (hub):</strong> Grid các khoa — click vào trang con.</li>
  <li><strong>Trang con từng khoa:</strong> Dịch vụ, BS, quy trình khám, FAQ, CTA.</li>
  <li><strong>Đội ngũ y bác sĩ:</strong> Profile + lịch trực (hoặc link từng khoa).</li>
  <li><strong>Bảng giá / BHYT:</strong> Phân loại dịch vụ, quy trình thanh toán.</li>
  <li><strong>Quy trình khám:</strong> Bước 1–2–3 — giảm anxiety bệnh nhân lần đầu.</li>
  <li><strong>Đặt lịch:</strong> Form tập trung — embed trên mọi trang khoa.</li>
  <li><strong>Tin tức y tế:</strong> Sức khỏe mùa, dịch bệnh, tư vấn cộng đồng.</li>
  <li><strong>Chi nhánh (nếu có):</strong> Địa chỉ, giờ, BS trực, Maps embed.</li>
  <li><strong>Liên hệ:</strong> Form, hotline cấp cứu (nếu có), email, Zalo.</li>
</ol>

${wpImg(1, "Cấu trúc website phòng khám đa khoa — danh mục chuyên khoa")}

<h2 id="dat-lich">Đặt lịch khám theo chuyên khoa &amp; ca trực</h2>

<p>Luồng đặt lịch <strong>${KEYWORD}</strong> nên tối giản trên mobile:</p>

<ol>
  <li>Chọn <strong>chuyên khoa</strong> (Nhi, Nội, Sản…)</li>
  <li>Chọn <strong>ngày</strong> — hiển thị BS/ca trực còn slot</li>
  <li>Chọn <strong>giờ</strong> hoặc ca sáng/chiều</li>
  <li>Nhập tên, SĐT, triệu chứng ngắn (tùy chọn)</li>
  <li>Xác nhận qua Zalo/SMS — giảm no-show</li>
</ol>

<p>Tích hợp plugin booking hoặc form gửi về email/CRM phòng khám. Tránh form 15 trường — tỷ lệ hoàn thành thấp trên mobile.</p>

<h2 id="bhyt-quy-trinh">Thông tin BHYT &amp; quy trình khám trên web</h2>

<p>Bệnh nhân PKĐK thường hỏi: “Có khám BHYT không?” — trang riêng giải thích:</p>

<ul>
  <li>Danh mục dịch vụ <strong>có BHYT</strong> vs <strong>không BHYT</strong></li>
  <li>Thủ tục: thẻ BHYT, giấy chuyển tuyến (nếu cần), mức đồng chi trả</li>
  <li>Giờ tiếp nhận BHYT vs dịch vụ tự trả</li>
  <li>Quy trình khám từ lúc vào cổng đến ra về — infographic dễ hiểu</li>
</ul>

<p>Nội dung trung thực, cập nhật khi thay đổi quy định — tránh hứa “100% BHYT mọi dịch vụ” nếu không đúng.</p>

<h2 id="bao-mat">SSL, bảo mật &amp; portal tra cứu xét nghiệm</h2>

<p><strong>Website phòng khám có cần SSL?</strong> — <strong>Bắt buộc.</strong> HTTPS bảo vệ dữ liệu form đặt lịch (họ tên, SĐT, triệu chứng) và tăng uy tín với Google.</p>

<ul>
  <li>Mọi form POST qua HTTPS — không thu dữ liệu trên HTTP</li>
  <li>Chính sách bảo mật — mô tả cách lưu trữ thông tin bệnh nhân</li>
  <li>Portal tra cứu kết quả XN (nếu có): login + OTP, không index Google</li>
  <li>Tuân thủ tinh thần bảo vệ dữ liệu cá nhân — hạn chế thu thập thừa</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website phòng khám đa khoa — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Số chuyên khoa, chi nhánh, có BHYT không, tích hợp HIS (nếu có).</li>
  <li><strong>Sitemap:</strong> Chốt danh sách khoa — mỗi khoa trang riêng.</li>
  <li><strong>Wireframe:</strong> Luồng đặt lịch, menu chuyên khoa — duyệt mobile trước.</li>
  <li><strong>UI design:</strong> Tông sạch, y tế (xanh/trắng) — dễ đọc, accessibility.</li>
  <li><strong>Lập trình:</strong> CMS, form, lịch trực BS, GA4, SSL.</li>
  <li><strong>Nội dung:</strong> Profile BS, bảng giá, quy trình — PK cung cấp, Bứt Phá hỗ trợ biên tập SEO.</li>
  <li><strong>Go-live &amp; đào tạo:</strong> Cập nhật lịch trực, tin tức y tế, backup.</li>
</ol>

<p><strong>Thời gian:</strong> 4–7 tuần cho website 10–15 trang + đa chuyên khoa.</p>

<h2 id="bang-gia">Bảng giá thiết kế website phòng khám đa khoa 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>PK cơ bản</strong></td>
      <td class="border border-indigo-100 px-3 py-2">4.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">8 trang, 3–4 khoa, form liên hệ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>PK chuẩn</strong></td>
      <td class="border border-indigo-100 px-3 py-2">7.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">12 trang, đặt lịch, BHYT, SEO local</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>PK Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">10.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Lịch BS, blog y tế, đa chi nhánh</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>PK Hệ thống</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ+</td>
      <td class="border border-indigo-100 px-3 py-2">Portal XN, tích hợp HIS, đa ngôn ngữ</td>
    </tr>
  </tbody>
</table>

<h2 id="seo-local">SEO local &amp; Google Maps cho phòng khám</h2>

<ul>
  <li><strong>Google Business Profile:</strong> Mỗi chi nhánh một profile — NAP khớp website.</li>
  <li><strong>Từ khóa:</strong> “phòng khám đa khoa [quận]”, “khám [chuyên khoa] [thành phố]”.</li>
  <li><strong>Schema:</strong> MedicalClinic, Physician — rich snippet local.</li>
  <li><strong>Blog y tế:</strong> Trả lời intent bệnh nhân — trích nguồn uy tín, tránh copy không kiểm chứng.</li>
  <li><strong>Internal link:</strong> Trang chủ → chuyên khoa → BS → đặt lịch.</li>
  <li><strong>Review Google:</strong> Nhắc bệnh nhân hài lòng review — link từ web.</li>
</ul>

<p>Xem thêm <a href="${SITE}/blog/thiet-ke-website-chuan-seo">thiết kế website chuẩn SEO</a> và <a href="${SITE}/google-maps">dịch vụ Google Maps</a>.</p>

<h2 id="sai-lam">Sai lầm khi làm website phòng khám đa khoa</h2>

<ul>
  <li>Gom tất cả khoa vào 1 trang dài — mất SEO và khó điều hướng.</li>
  <li>Không có SSL — mất trust và rủi ro dữ liệu form.</li>
  <li>Lịch BS trực không cập nhật — bệnh nhân đến nhầm ca.</li>
  <li>Copy nội dung y khoa không kiểm chứng — SEO kém + uy tín thấp.</li>
  <li>Thiếu thông tin BHYT — tổng đài bị hỏi lặp lại.</li>
  <li>Web đẹp nhưng chậm trên mobile — bệnh nhân thoát tìm PK khác.</li>
  <li>Không có hotline/Zalo sticky — mất lead cấp cứu / tư vấn nhanh.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Quy trình và giá tổng quan.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-nha-khoa`,
    label: "Website nha khoa",
    desc: "Chuyên khoa răng — đặt lịch & SEO.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-y-te-dat-kham`,
    label: "Website y tế đặt khám",
    desc: "Booking clinic chuyên sâu.",
  },
  {
    href: `${SITE}/website`,
    label: "Đăng ký tư vấn",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website phòng khám đa khoa giá bao nhiêu?",
      a: "Tại Bứt Phá từ 4.000.000đ (PK nhỏ 3–4 khoa) đến 12.000.000đ+ (portal XN, HIS). Báo giá sau khảo sát số khoa và chi nhánh.",
    },
    {
      q: "Website phòng khám có cần SSL không?",
      a: "Bắt buộc. HTTPS bảo vệ dữ liệu form đặt lịch và tăng uy tín với Google. Portal tra cứu xét nghiệm càng cần bảo mật cao.",
    },
    {
      q: "Có hỗ trợ đa chi nhánh không?",
      a: "Có. Trang chi nhánh riêng với schema LocalBusiness cho từng địa điểm — bệnh nhân chọn cơ sở gần nhất.",
    },
    {
      q: "Nội dung y tế viết thế nào cho chuẩn SEO?",
      a: "Trả lời đúng intent bệnh nhân, trích nguồn uy tín (BYT, hiệp hội), tránh copy y khoa không kiểm chứng. Mỗi chuyên khoa 800–1.500 từ.",
    },
    {
      q: "Khác website nha khoa / thẩm mỹ thế nào?",
      a: "PKĐK có nhiều chuyên khoa — cần menu điều hướng và đặt lịch theo khoa. Nha khoa/thẩm mỹ sâu một lĩnh vực.",
    },
    {
      q: "Có tích hợp tra cứu kết quả xét nghiệm không?",
      a: "Có (gói Pro/Hệ thống) — portal login bảo mật, HTTPS. Tích hợp HIS phụ thuộc hệ thống phòng khám.",
    },
    {
      q: "Bao lâu hoàn thành website phòng khám đa khoa?",
      a: "Thường 4–7 tuần. Phụ thuộc số chuyên khoa, profile bác sĩ và tích hợp booking.",
    },
    {
      q: "Bứt Phá có làm website phòng khám không?",
      a: "Có — PKĐK, chuyên khoa, chuỗi clinic. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website phòng khám đa khoa</strong> chuẩn SEO giúp bệnh nhân tìm đúng chuyên khoa, đặt lịch online và hiểu quy trình BHYT trước khi đến — đồng thời giảm tải tổng đài và xây uy tín trên Google Maps. Ưu tiên: SSL, trang từng khoa, lịch BS cập nhật và nội dung y tế có nguồn.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — timeline và báo giá theo số chuyên khoa và chi nhánh của phòng khám bạn.`,
  ],
  ctaLabel: "→ Tư vấn website phòng khám đa khoa",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
