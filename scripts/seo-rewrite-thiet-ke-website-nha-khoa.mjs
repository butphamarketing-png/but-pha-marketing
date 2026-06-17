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

const KEYWORD = "thiết kế website nha khoa";
const TITLE = "Thiết Kế Website Nha Khoa Hiện Đại Thu Hút Khách Hàng";

export const REWRITE_THIET_KE_WEBSITE_NHA_KHOA = {
  title: TITLE,
  slug: "thiet-ke-website-nha-khoa",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website phòng khám nha khoa, thiết kế web nha khoa, đặt lịch khám nha khoa online, website nha khoa chuẩn seo",
  metaTitle: "Thiết Kế Website Nha Khoa | Đặt Lịch & SEO | Bứt Phá",
  metaDescription:
    "Thiết kế website nha khoa: implant, niềng răng, đặt lịch online, bảng giá, SEO local Y tế. Quy trình 7 bước, giá 3–12 triệu. Tư vấn Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website nha khoa hiện đại: tính năng đặt khám, tuân thủ quảng cáo y tế, SEO Maps và chọn đối tác uy tín.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Nha Khoa | Đặt Lịch & SEO | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "nha-khoa-la-gi", label: "Website nha khoa là gì?" },
  { id: "vi-sao-can", label: "Vì sao phòng khám cần web?" },
  { id: "tinh-nang", label: "Tính năng bắt buộc" },
  { id: "cau-truc", label: "Cấu trúc trang chuẩn" },
  { id: "quy-dinh-y-te", label: "Quy định nội dung y tế" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá website nha khoa" },
  { id: "seo-local", label: "SEO local & Maps" },
  { id: "chon-doi-tac", label: "Chọn đối tác thiết kế" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website nha khoa</strong> là quy trình xây dựng website chuyên biệt cho phòng khám, nha khoa thẩm mỹ và chuỗi nha khoa — tập trung giới thiệu dịch vụ (implant, niềng răng, tẩy trắng, nha khoa trẻ em), hồ sơ bác sĩ, đặt lịch khám online và SEO local để bệnh nhân tìm “nha khoa gần tôi” trên Google. Khác website spa hay TMĐT, <strong>${KEYWORD}</strong> phải cân bằng <em>uy tín y khoa</em>, minh bạch giá tham khảo và tuân thủ quy định quảng cáo dịch vụ y tế tại Việt Nam.`,
    `Bài viết dành cho chủ phòng khám, quản lý chuỗi nha khoa và marketer y tế đang cần <strong>${KEYWORD}</strong>: checklist tính năng, cấu trúc trang, lưu ý pháp lý nội dung, quy trình triển khai và mức giá 2026 — thực chiến cho thị trường Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Nha khoa cần web: đặt lịch, dịch vụ chi tiết, bác sĩ — giảm tải quầy tiếp đón.",
  "Nội dung y tế: trung thực, không cam kết “chữa khỏi 100%”, ghi giấy phép.",
  "SEO: “nha khoa + quận”, schema MedicalBusiness / Dentist.",
  "Bứt Phá: gói 3–12 triệu; form đặt khám + Zalo xác nhận.",
  "Mobile-first: bệnh nhân tìm và đặt lịch chủ yếu trên điện thoại.",
])}

${wpImg(1, "Thiết kế website nha khoa hiện đại với đặt lịch khám online")}

<h2 id="nha-khoa-la-gi">Thiết kế website nha khoa là gì?</h2>

<p><strong>Website nha khoa</strong> là trang web thiết kế riêng cho ngành nha khoa — không dùng template shop hay corporate chung. <strong>Thiết kế website nha khoa</strong> ưu tiên:</p>

<ul>
  <li>Trang dịch vụ chi tiết: cấy implant, niềng răng, tẩy trắng, nhổ răng khôn, nha khoa trẻ em</li>
  <li>Hồ sơ bác sĩ: bằng cấp, chứng chỉ, kinh nghiệm — tạo trust y khoa</li>
  <li>Giới thiệu trang thiết bị: CT cone beam, scan 3D (nếu có)</li>
  <li>Form <strong>đặt lịch khám</strong> — chọn dịch vụ, ngày giờ, triệu chứng ngắn</li>
  <li>Bảng giá tham khảo — minh bạch, “từ … triệu” theo gói</li>
  <li>Blog giáo dục: chăm sóc răng miệng — SEO + E-E-A-T</li>
</ul>

<h2 id="vi-sao-can">Vì sao phòng khám nha khoa cần website?</h2>

<ul>
  <li><strong>Tìm kiếm Google:</strong> “nha khoa quận 7”, “niềng răng tphcm” — không có web = mất bệnh nhân mới.</li>
  <li><strong>So sánh trước khi đến:</strong> Bệnh nhân xem bác sĩ, giá, review trước khi gọi.</li>
  <li><strong>Giảm chờ điện thoại:</strong> Đặt lịch online 24/7, xác nhận Zalo.</li>
  <li><strong>Chạy ads:</strong> Landing implant/niềng răng — message match chiến dịch.</li>
  <li><strong>Chuỗi nha khoa:</strong> Một site — chọn chi nhánh gần nhất.</li>
</ul>

<h2 id="tinh-nang">Tính năng website nha khoa bắt buộc</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tính năng</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Lợi ích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đặt lịch khám online</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Giảm quá tải lễ tân, hẹn đúng giờ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Trang từng dịch vụ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">SEO “implant”, “niềng răng invisalign”</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đội ngũ bác sĩ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Trust — yếu tố quyết định chọn nha khoa</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bảng giá tham khảo</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Lọc khách phù hợp ngân sách</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Before/after</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Có consent bệnh nhân, không quảng cáo quá đà</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Chat Zalo / hotline</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Tư vấn nhanh trước khi đặt lịch</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đa ngôn ngữ (tùy chọn)</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Khách expat tại TP lớn</td>
    </tr>
  </tbody>
</table>

<h2 id="cau-truc">Cấu trúc trang website nha khoa (8–10 trang)</h2>

<ol>
  <li><strong>Trang chủ:</strong> USP, dịch vụ nổi bật, CTA đặt lịch, review.</li>
  <li><strong>Giới thiệu:</strong> Lịch sử phòng khám, giấy phép hoạt động.</li>
  <li><strong>Dịch vụ:</strong> Hub + trang con implant, niềng răng, tẩy trắng…</li>
  <li><strong>Bảng giá:</strong> Tham khảo — ghi chú “giá có thể thay đổi sau khám”.</li>
  <li><strong>Đội ngũ:</strong> Bác sĩ, chứng chỉ.</li>
  <li><strong>Cơ sở vật chất:</strong> Ảnh phòng khám, máy móc.</li>
  <li><strong>Đặt lịch:</strong> Form tập trung.</li>
  <li><strong>Blog / Kiến thức:</strong> SEO sức khỏe răng miệng.</li>
  <li><strong>Liên hệ:</strong> Maps, giờ làm việc, nhiều chi nhánh.</li>
</ol>

${wpImg(2, "Website phòng khám nha khoa — trang dịch vụ implant và niềng răng")}

<h2 id="quy-dinh-y-te">Quy định nội dung &amp; quảng cáo y tế trên web</h2>

<p>Khi triển khai <strong>${KEYWORD}</strong>, nội dung phải tuân thủ nguyên tắc quảng cáo dịch vụ y tế:</p>

<ul>
  <li><strong>Không cam kết tuyệt đối:</strong> Tránh “chữa khỏi 100%”, “không đau” — dùng ngôn ngữ trung thực.</li>
  <li><strong>Ghi rõ thông tin cơ sở:</strong> Tên phòng khám, địa chỉ, giấy phép (nếu hiển thị công khai).</li>
  <li><strong>Before/after:</strong> Có sự đồng ý của bệnh nhân; không gây hiểu lầm.</li>
  <li><strong>Giá:</strong> “Tham khảo” — nhấn mạnh khám mới có phác đồ chính xác.</li>
  <li><strong>Blog:</strong> Thông tin giáo dục, trích nguồn khi cần — tăng E-E-A-T.</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website nha khoa — 7 bước</h2>

<ol>
  <li><strong>Khảo sát:</strong> Quy mô phòng khám, dịch vụ chủ lực, khu vực, đối tượng bệnh nhân.</li>
  <li><strong>Wireframe:</strong> Sitemap, luồng đặt lịch, trang dịch vụ SEO.</li>
  <li><strong>UI design:</strong> Tone sạch sẽ, tin cậy — xanh/trắng phổ biến ngành y tế.</li>
  <li><strong>Lập trình:</strong> Form booking, Zalo, GA4, tốc độ mobile.</li>
  <li><strong>Nội dung:</strong> Bác sĩ, giá, ảnh phòng khám — phòng khám cung cấp.</li>
  <li><strong>SEO on-page:</strong> Từ khóa địa phương, schema Dentist/MedicalBusiness.</li>
  <li><strong>Go-live:</strong> GSC, đồng bộ Google Business Profile, đào tạo admin.</li>
</ol>

<p><strong>Thời gian:</strong> 3–5 tuần cho website nha khoa 8–10 trang.</p>

<h2 id="bang-gia">Bảng giá thiết kế website nha khoa 2026</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Gói</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giá</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Phù hợp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Giới thiệu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Phòng khám nhỏ, 5–6 trang</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Tối ưu</strong></td>
      <td class="border border-indigo-100 px-3 py-2">6.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Nhiều dịch vụ, đặt lịch, SEO local</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Kinh doanh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">9.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Landing implant/niềng răng, ads</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Hệ thống</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Chuỗi chi nhánh, đa ngôn ngữ</td>
    </tr>
  </tbody>
</table>

<h2 id="seo-local">SEO local &amp; Google Maps cho nha khoa</h2>

<ul>
  <li><strong>Từ khóa:</strong> “nha khoa [quận]”, “niềng răng [thành phố]”, “cấy implant [khu vực]”.</li>
  <li><strong>Trang dịch vụ riêng:</strong> Mỗi dịch vụ một URL — long-tail SEO.</li>
  <li><strong>Schema:</strong> Dentist, MedicalBusiness, FAQPage.</li>
  <li><strong>Review Google:</strong> Nhắc bệnh nhân hài lòng review — link từ web.</li>
  <li><strong>NAP nhất quán:</strong> Tên, địa chỉ, SĐT giống Maps và Facebook.</li>
</ul>

<p>Tham khảo thêm <a href="${SITE}/blog/thiet-ke-website-nha-khoa-nieng-rang">thiết kế website nha khoa niềng răng</a> (nếu chuyên sâu niềng) và <a href="${SITE}/google-maps">dịch vụ Google Maps</a>.</p>

<h2 id="chon-doi-tac">Chọn đối tác thiết kế website nha khoa</h2>

<ul>
  <li>Portfolio có <strong>y tế / nha khoa</strong> — hiểu compliance nội dung</li>
  <li>Demo form đặt lịch trên mobile trước khi ký</li>
  <li>Báo giá tách: số trang dịch vụ, đa ngôn ngữ, tích hợp phần mềm quản lý phòng khám</li>
  <li>Bảo hành cập nhật giá, thêm bác sĩ mới</li>
</ul>

<h2 id="sai-lam">Sai lầm khi làm website nha khoa</h2>

<ul>
  <li>Cam kết kết quả phi thực tế — rủi ro pháp lý và mất trust.</li>
  <li>Không có trang bác sĩ — bệnh nhân không dám tin.</li>
  <li>Ẩn giá hoàn toàn — khách chuyển sang đối thủ minh bạch hơn.</li>
  <li>Chỉ Fanpage — mất SEO “nha khoa gần tôi”.</li>
  <li>Web chậm trên mobile — bounce cao.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-spa`,
    label: "Thiết kế website spa",
    desc: "So sánh booking ngành beauty vs y tế.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website`,
    label: "Thiết kế website — pillar",
    desc: "Quy trình và giá tổng quan.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-dat-lich-hen-online`,
    label: "Website đặt lịch hẹn",
    desc: "Tính năng booking chung.",
  },
  {
    href: `${SITE}/website`,
    label: "Đăng ký làm website nha khoa",
    desc: "Tư vấn Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website nha khoa giá bao nhiêu?",
      a: "Tại Bứt Phá từ 3.000.000đ đến 12.000.000đ tùy số trang dịch vụ và tính năng. Tích hợp phần mềm quản lý phòng khám báo giá riêng.",
    },
    {
      q: "Website nha khoa có cần tuân thủ quy định quảng cáo y tế?",
      a: "Có. Nội dung trung thực, không cam kết tuyệt đối, ghi thông tin cơ sở và giấy phép khi phù hợp.",
    },
    {
      q: "Thời gian triển khai website nha khoa?",
      a: "Thường 3–5 tuần tùy số trang dịch vụ và tốc độ cung cấp nội dung từ phòng khám.",
    },
    {
      q: "Có hỗ trợ SEO từ khóa theo khu vực không?",
      a: "Có — tối ưu “nha khoa + quận/huyện” và schema MedicalBusiness/Dentist.",
    },
    {
      q: "Có tích hợp đặt lịch khám online không?",
      a: "Có — form cơ bản hoặc plugin; xác nhận qua Zalo/SMS.",
    },
    {
      q: "Chuỗi nha khoa nhiều chi nhánh làm một web được không?",
      a: "Được — chọn chi nhánh + Maps từng cơ sở; gói Hệ thống phù hợp.",
    },
    {
      q: "Có làm landing implant riêng cho ads không?",
      a: "Có — landing single offer trong gói Kinh doanh hoặc custom.",
    },
    {
      q: "Bứt Phá có kinh nghiệm website y tế không?",
      a: "Có portfolio ngành dịch vụ và y tế — tư vấn Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website nha khoa</strong> hiện đại giúp phòng khám thu hút bệnh nhân mới qua Google, giảm tải lễ tân và xây uy tín y khoa — với nội dung tuân thủ quy định và đặt lịch online tiện lợi trên mobile.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — timeline và báo giá theo quy mô phòng khám của bạn.`,
  ],
  ctaLabel: "→ Tư vấn thiết kế website nha khoa",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
