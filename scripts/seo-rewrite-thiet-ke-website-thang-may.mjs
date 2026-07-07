import { newsThumbnailForArticle } from "./seo-article-helpers.mjs";
import {
  buildWpSeoArticle,
  wpToc,
  wpIntro,
  wpKeyTakeaways,
  wpFaq,
  wpRelatedLinks,
  wpConclusion,
  wpExternalCta,
  wpThangMayImg,
  SITE,
} from "./seo-wp-structure.mjs";

const KEYWORD = "thiết kế website công ty thang máy";
const TITLE = "Thiết Kế Website Công Ty Thang Máy Chuyên Nghiệp";

export const REWRITE_THIET_KE_WEBSITE_THANG_MAY = {
  title: TITLE,
  slug: "thiet-ke-website-thang-may",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website thang máy, lắp đặt thang máy, bảo trì thang máy, thang máy gia đình, thang máy kính",
  metaTitle: "Thiết Kế Website Công Ty Thang Máy | SEO | Bứt Phá",
  metaDescription:
    "Thiết kế website công ty thang máy: catalog, lắp đặt-bảo trì, dự án, form báo giá. SEO ngành elevator. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website công ty thang máy: showcase sản phẩm, dịch vụ lắp đặt-bảo trì, dự án và SEO địa phương ngành elevator.",
  imageUrl: newsThumbnailForArticle({ slug: "thiet-ke-website-thang-may" }),
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Công Ty Thang Máy | SEO | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "thang-may-web-la-gi", label: "Website công ty thang máy là gì?" },
  { id: "vi-sao-can", label: "Vì sao đơn vị thang máy cần web?" },
  { id: "catalog", label: "Catalog sản phẩm thang máy" },
  { id: "dich-vu", label: "Dịch vụ lắp đặt & bảo trì" },
  { id: "du-an", label: "Dự án tiêu biểu" },
  { id: "form-bao-gia", label: "Form báo giá khảo sát" },
  { id: "cau-truc", label: "Cấu trúc website chuẩn" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá website" },
  { id: "seo-thang-may", label: "SEO ngành thang máy" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website công ty thang máy</strong> là quy trình xây dựng website chuyên cho đơn vị cung cấp, lắp đặt và bảo trì thang máy — trưng bày <em>catalog thang gia đình, thang kính, tải khách, tải hàng, bệnh viện, thực phẩm, ô tô và thang cuốn</em>, dịch vụ khảo sát-lắp đặt-bảo trì 24/7, dự án tiêu biểu và form báo giá khảo sát công trình.`,
    `Bài viết dành cho giám đốc công ty thang máy, sales kỹ thuật và marketer đang cần <strong>${KEYWORD}</strong>: cấu trúc trang sản phẩm theo loại hình công trình, UX hotline khẩn cấp, gallery dự án filter theo villa/chung cư/khách sạn và chiến lược SEO “lắp thang máy gia đình + quận”.`,
  ],
})}

${wpKeyTakeaways([
  "Website thang máy = catalog loại hình + dự án thật + chứng nhận an toàn — không chỉ ảnh đẹp.",
  "Hotline 24/7 và form sửa chữa khẩn cấp — conversion cao khi thang hỏng.",
  "Landing theo loại thang (gia đình, kính, tải khách…) — SEO long-tail hiệu quả.",
  "Logo đối tác Fuji, Mitsubishi, Otis… — trust B2B chủ đầu tư.",
  "Bứt Phá: website công ty thang máy 10–18 triệu tùy catalog và form báo giá.",
])}

${wpThangMayImg(0, "Thiết kế website công ty thang máy — giải pháp thang máy toàn diện")}

<h2 id="thang-may-web-la-gi">Thiết kế website công ty thang máy là gì?</h2>

<p><strong>Website công ty thang máy</strong> là nền tảng web chuyên ngành elevator — phục vụ chủ đầu tư, kiến trúc sư, chủ villa và ban quản trị chung cư tìm hiểu sản phẩm, dịch vụ và uy tín đơn vị lắp đặt. <strong>Thiết kế website công ty thang máy</strong> thường gồm:</p>
<ul>
  <li><strong>Catalog sản phẩm:</strong> Thang gia đình, kính panorama, tải khách, tải hàng, bệnh viện, thực phẩm, ô tô, thang cuốn</li>
  <li><strong>Thông số kỹ thuật:</strong> Tải trọng, tốc độ, số điểm dừng, kích thước pit — PDF tải về</li>
  <li><strong>Dịch vụ:</strong> Tư vấn thiết kế, lắp đặt, cải tạo, bảo trì định kỳ, sửa chữa khẩn cấp, kiểm định an toàn</li>
  <li><strong>Dự án:</strong> Gallery filter villa, chung cư, khách sạn, văn phòng, TTTM, nhà máy</li>
  <li><strong>Chứng nhận:</strong> Giấy phép kinh doanh, chứng chỉ an toàn, đại lý thương hiệu quốc tế</li>
  <li><strong>Form lead:</strong> Khảo sát công trình, báo giá, đặt lịch bảo trì</li>
</ul>

<h2 id="vi-sao-can">Vì sao công ty thang máy cần website chuyên nghiệp?</h2>

<ul>
  <li><strong>Chủ đầu tư research online:</strong> So sánh thang gia đình, thương hiệu, giá tham khảo trước khi gọi</li>
  <li><strong>B2B credibility:</strong> Dự án lớn yêu cầu portfolio, chứng nhận, quy trình rõ ràng trên web</li>
  <li><strong>SEO local:</strong> “Lắp thang máy gia đình TP.HCM”, “bảo trì thang máy quận 7” — lead organic</li>
  <li><strong>Hotline khẩn cấp:</strong> Khi thang kẹt, khách tìm “sửa thang máy gấp” — web + Maps quyết định gọi ai</li>
  <li><strong>Tách biệt đối thủ:</strong> Web chuyên nghiệp vs fanpage Zalo — thể hiện quy mô và cam kết bảo hành</li>
</ul>

<h2 id="catalog">Catalog sản phẩm thang máy trên website</h2>

<p>Mỗi loại thang nên có landing riêng — tối ưu SEO và message phù hợp từng đối tượng:</p>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Loại thang</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Đối tượng khách</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Nội dung web cần có</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Thang máy gia đình</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Chủ villa, nhà phố</td>
      <td class="border border-indigo-100 px-3 py-2">Kích thước pit nhỏ, thang kính, tiết kiệm điện, bảo hành</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Thang máy kính</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Biệt thự, penthouse cao cấp</td>
      <td class="border border-indigo-100 px-3 py-2">Gallery cabin panorama, thiết kế sang trọng</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Thang tải khách</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Chung cư, văn phòng, khách sạn</td>
      <td class="border border-indigo-100 px-3 py-2">Tải trọng, tốc độ, số tầng, dự án tham chiếu</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Thang tải hàng / bệnh viện</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Nhà máy, bệnh viện</td>
      <td class="border border-indigo-100 px-3 py-2">Tiêu chuẩn an toàn, cabin rộng, giường bệnh</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Thang cuốn</strong></td>
      <td class="border border-indigo-100 px-3 py-2">TTTM, sân bay, metro</td>
      <td class="border border-indigo-100 px-3 py-2">Công suất, bảo trì, dự án thương mại</td>
    </tr>
  </tbody>
</table>

${wpThangMayImg(1, "Catalog thiết kế website công ty thang máy — thang gia đình và thang kính")}

<h2 id="dich-vu">Dịch vụ lắp đặt, bảo trì &amp; sửa chữa trên web</h2>

<ul>
  <li><strong>Tư vấn &amp; thiết kế:</strong> Khảo sát pit, tư vấn loại thang phù hợp công trình</li>
  <li><strong>Lắp đặt trọn gói:</strong> Cung cấp-thi công-nghiệm thu — timeline rõ</li>
  <li><strong>Cải tạo thang cũ:</strong> Modernize cabin, thay board điều khiển</li>
  <li><strong>Bảo trì định kỳ:</strong> Gói 6/12 tháng — form đăng ký online</li>
  <li><strong>Sửa chữa 24/7:</strong> Hotline nổi, nút “Gọi ngay khi thang kẹt” — sticky mobile</li>
  <li><strong>Kiểm định an toàn:</strong> Quy trình, chứng nhận sau kiểm định</li>
</ul>

<h2 id="du-an">Dự án tiêu biểu &amp; đối tác thương hiệu</h2>

<p>Gallery dự án là yếu tố quyết định trust — nên có filter và thông tin tối thiểu mỗi công trình:</p>
<ul>
  <li><strong>Filter:</strong> Villa, chung cư, khách sạn, văn phòng, TTTM, nhà máy</li>
  <li><strong>Mỗi dự án:</strong> Tên công trình, loại thang, thương hiệu, năm hoàn thành, ảnh thực tế</li>
  <li><strong>Logo đối tác:</strong> Fuji, Mitsubishi, Otis, Schindler, Kone, Hitachi, Hyundai…</li>
  <li><strong>Video:</strong> Clip lắp đặt, cabin hoàn thiện — tăng thời gian on-site</li>
  <li><strong>Testimonial:</strong> Chủ đầu tư, ban quản trị — quote + chức danh</li>
</ul>

${wpThangMayImg(2, "Dự án thang máy tiêu biểu trên website công ty thang máy")}

<h2 id="form-bao-gia">Form báo giá &amp; khảo sát công trình</h2>

<p>Lead thang máy thường cần khảo sát hiện trường — form web thu thập đủ thông tin giúp sales báo giá nhanh:</p>
<ul>
  <li>Loại công trình (villa, chung cư, văn phòng…)</li>
  <li>Số tầng / chiều cao hành trình</li>
  <li>Loại thang quan tâm (gia đình, kính, tải khách…)</li>
  <li>Địa chỉ công trình — tỉnh/thành, quận</li>
  <li>SĐT, email — ưu tiên Zalo callback</li>
  <li>Upload ảnh pit / bản vẽ (tùy chọn)</li>
</ul>

<h2 id="cau-truc">Cấu trúc website công ty thang máy (12–16 trang)</h2>

<ol>
  <li><strong>Trang chủ:</strong> Hero, stats (500+ công trình, 15+ năm…), CTA báo giá</li>
  <li><strong>Giới thiệu:</strong> Lịch sử, chứng nhận, đội ngũ kỹ thuật</li>
  <li><strong>Sản phẩm:</strong> 8 category thang — landing riêng từng loại</li>
  <li><strong>Dịch vụ:</strong> Lắp đặt, bảo trì, sửa chữa, kiểm định</li>
  <li><strong>Dự án:</strong> Gallery filter + case study chi tiết</li>
  <li><strong>Báo giá:</strong> Form khảo sát + hotline</li>
  <li><strong>Blog:</strong> Xu hướng thang gia đình, cách chọn thang, bảo trì định kỳ</li>
  <li><strong>Liên hệ:</strong> Maps, chi nhánh, form CSKH</li>
</ol>

<h2 id="quy-trinh">Quy trình thiết kế website công ty thang máy — 7 bước</h2>

<ol>
  <li><strong>Brief ngành:</strong> Loại thang chính, thương hiệu đại lý, khu vực phục vụ.</li>
  <li><strong>Sitemap:</strong> Category SP, dịch vụ, dự án, blog SEO plan.</li>
  <li><strong>UI design:</strong> Tông navy/gold chuyên nghiệp — trust ngành công nghiệp.</li>
  <li><strong>Dev WordPress:</strong> Form báo giá, gallery filter, schema LocalBusiness.</li>
  <li><strong>Content:</strong> Thông số SP, ảnh dự án thật — kỹ thuật duyệt.</li>
  <li><strong>SEO on-page:</strong> Title/meta từng loại thang, internal link.</li>
  <li><strong>Launch:</strong> Google Maps, Search Console, theo dõi form lead.</li>
</ol>

<p><strong>Thời gian:</strong> 5–8 tuần (website 12–16 trang + 8 landing sản phẩm).</p>

${wpThangMayImg(3, "Quy trình thiết kế website công ty thang máy chuẩn SEO")}

<h2 id="bang-gia">Bảng giá thiết kế website công ty thang máy 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Elevator Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">10.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">8–10 trang, catalog cơ bản, form báo giá, SEO on-page</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Elevator Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">14.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">16 trang, 8 landing SP, gallery dự án filter, blog</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Elevator Enterprise</strong></td>
      <td class="border border-indigo-100 px-3 py-2">18.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Đa chi nhánh, form bảo trì, video, schema nâng cao</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Landing thang gia đình</strong></td>
      <td class="border border-indigo-100 px-3 py-2">+3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">1 landing SEO “lắp thang máy gia đình”</td>
    </tr>
  </tbody>
</table>

<h2 id="seo-thang-may">SEO website ngành thang máy</h2>

<p><strong>${KEYWORD}</strong> SEO thường target:</p>
<ul>
  <li><strong>Product:</strong> “Thang máy gia đình giá bao nhiêu”, “thang máy kính panorama”</li>
  <li><strong>Service:</strong> “Lắp đặt thang máy [tỉnh]”, “bảo trì thang máy định kỳ”</li>
  <li><strong>Emergency:</strong> “Sửa thang máy gấp [quận]” — landing + Maps</li>
  <li><strong>Compare:</strong> “So sánh thang gia đình vs thương mại” — blog authority</li>
  <li><strong>Schema:</strong> LocalBusiness, Service, FAQ — rich snippet</li>
  <li><strong>Local pack:</strong> NAP đồng bộ web ↔ Google Business Profile</li>
</ul>

${wpThangMayImg(4, "SEO thiết kế website công ty thang máy — lắp đặt và bảo trì local")}

<h2 id="sai-lam">Sai lầm khi làm website công ty thang máy</h2>

<ul>
  <li>Chỉ có ảnh stock — không dự án thật, mất trust chủ đầu tư.</li>
  <li>Thiếu hotline 24/7 nổi bật — mất lead sửa chữa khẩn cấp.</li>
  <li>Catalog chung chung — không tách landing từng loại thang cho SEO.</li>
  <li>Không hiển thị chứng nhận, giấy phép — nghi ngờ năng lực pháp lý.</li>
  <li>Form báo giá quá dài — abandonment cao trên mobile.</li>
  <li>Bỏ qua blog kỹ thuật — để đối thủ chiếm traffic “cách chọn thang máy”.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/checklist-website-thang-may-2026`,
    label: "Checklist website thang máy 2026",
    desc: "20 mục catalog & dự án.",
  },
  {
    href: `${SITE}/blog/nganh/thang-may`,
    label: "Hub silo thang máy",
    desc: "Tất cả bài ngành thang máy.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-cong-ty-xay-dung`,
    label: "Website công ty xây dựng",
    desc: "Ngành xây dựng liên quan.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-kien-truc-noi-that`,
    label: "Website kiến trúc",
    desc: "Đối tác thiết kế công trình.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-pccc`,
    label: "Website PCCC",
    desc: "An toàn tòa nhà.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn web thang máy",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website công ty thang máy giá bao nhiêu?",
      a: "Tại Bứt Phá từ 10.000.000đ (website cơ bản) đến 18.000.000đ (đa chi nhánh + landing SP). Báo giá theo số trang và gallery dự án.",
    },
    {
      q: "Website thang máy cần nhấn mạnh gì?",
      a: "Catalog đủ loại thang, dự án thật, chứng nhận an toàn, hotline 24/7 và form báo giá khảo sát nhanh.",
    },
    {
      q: "Có làm landing riêng thang máy gia đình không?",
      a: "Có — gói Pro hoặc +3 triệu/landing. Tối ưu SEO “lắp thang máy gia đình + khu vực”.",
    },
    {
      q: "Form báo giá cần những trường gì?",
      a: "Loại công trình, số tầng, loại thang, địa chỉ, SĐT — đủ để sales gọi tư vấn sơ bộ trước khảo sát.",
    },
    {
      q: "SEO “lắp thang máy” mất bao lâu?",
      a: "3–6 tháng với landing SP + blog kỹ thuật + Maps. Dự án và review tăng tốc local pack.",
    },
    {
      q: "Có cần hiển thị logo Fuji, Mitsubishi…?",
      a: "Nên có nếu là đại lý chính thức — tăng trust. Chỉ dùng logo có thỏa thuận pháp lý với hãng.",
    },
    {
      q: "Bao lâu go-live website thang máy?",
      a: "5–8 tuần với content SP và ảnh dự án sẵn. Thiếu ảnh công trình thật là bottleneck phổ biến.",
    },
    {
      q: "Bứt Phá có thiết kế website công ty thang máy không?",
      a: "Có — catalog đa loại, dự án, form báo giá, SEO local. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website công ty thang máy</strong> thành công = catalog loại hình rõ + dự án &amp; chứng nhận minh bạch + hotline 24/7 + form khảo sát nhanh + SEO landing từng loại thang — chuyển đổi chủ đầu tư và lead sửa chữa khẩn cấp.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — loại thang chính, khu vực phục vụ và báo giá theo quy mô catalog của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website công ty thang máy",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
