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

const KEYWORD = "thiết kế website ô tô";
const TITLE = "Thiết Kế Website Ô Tô Bán Xe Và Dịch Vụ Garage";

export const REWRITE_THIET_KE_WEBSITE_XE_HOI_O_TO = {
  title: TITLE,
  slug: "thiet-ke-website-xe-hoi-o-to",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website bán xe ô tô, website garage bảo dưỡng, showroom xe online, đặt lịch bảo dưỡng xe",
  metaTitle: "Thiết Kế Website Ô Tô | Bán Xe & Garage 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website ô tô: inventory xe cũ/mới, filter hãng, đặt lịch bảo dưỡng garage và form lái thử. SEO local, giá 8–18 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website ô tô bán xe và dịch vụ garage: inventory, booking bảo dưỡng và lead tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Ô Tô | Bán Xe & Garage 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "oto-web-la-gi", label: "Website ô tô là gì?" },
  { id: "loai-hinh", label: "Showroom vs garage vs đa dịch vụ" },
  { id: "inventory", label: "Inventory xe & filter" },
  { id: "trang-xe", label: "Trang chi tiết xe" },
  { id: "garage", label: "Garage & đặt lịch bảo dưỡng" },
  { id: "lead", label: "Lái thử & form lead" },
  { id: "seo", label: "SEO bán xe & garage" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website ô tô</strong> là xây dựng nền tảng web cho đại lý bán xe mới/cũ, showroom đa hãng, garage bảo dưỡng-sửa chữa và trung tâm chăm sóc xe — trưng bày <em>inventory xe online</em> (ảnh, spec, giá, ODO), filter theo hãng/giá/năm, form đăng ký lái thử và <em>đặt lịch bảo dưỡng garage</em> — giảm phụ thuộc Chợ Tốt, Facebook và walk-in mù quáng.`,
    `Bài viết dành cho chủ showroom xe, quản lý garage và marketing automotive đang cần <strong>${KEYWORD}</strong>: cấu trúc inventory, UX mobile cho người mua xe, booking dịch vụ, SEO “xe [hãng] [tỉnh]” và mức giá triển khai 2026 tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Inventory xe = trái tim web — filter hãng, giá, năm, ODO, số sàn/tự động.",
  "Trang chi tiết xe: 15–25 ảnh, spec bảng, lịch sử bảo dưỡng (xe cũ).",
  "Garage web: đặt lịch bảo dưỡng + báo giá dịch vụ — recurring revenue.",
  "Mobile-first — 80% khách xem xe trên điện thoại.",
  "Bứt Phá: website ô tô 8–18 triệu tùy inventory và booking garage.",
])}

${wpImg(1, "Thiết kế website ô tô bán xe inventory và đặt lịch bảo dưỡng garage")}

<h2 id="oto-web-la-gi">Website ô tô / automotive là gì?</h2>

<p><strong>Website ô tô</strong> phục vụ ngành automotive tại Việt Nam — gồm:</p>
<ul>
  <li><strong>Đại lý / showroom:</strong> Bán xe mới chính hãng hoặc xe cũ đa dòng</li>
  <li><strong>Inventory listing:</strong> Danh sách xe có sẵn — cập nhật khi bán</li>
  <li><strong>Garage / service center:</strong> Bảo dưỡng định kỳ, sửa chữa, đồng sơn</li>
  <li><strong>Phụ kiện &amp; độ xe:</strong> Catalog phụ tùng, gói nâng cấp</li>
  <li><strong>Lead gen:</strong> Lái thử, báo giá xe cũ, định giá xe khách muốn bán</li>
</ul>

<p><strong>Thiết kế website ô tô</strong> khác website doanh nghiệp thông thường — cần <em>database xe</em> dynamic và filter mạnh, tương tự mini-OTA automotive.</p>

<h2 id="loai-hinh">Showroom bán xe vs garage vs mô hình kết hợp</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Mô hình</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Focus web</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Đại lý xe mới</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Model catalog hãng, khuyến mãi, lái thử, trả góp</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Showroom xe cũ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Inventory ODO, giá, lịch sử, filter mạnh</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Garage / service</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Bảng giá dịch vụ, đặt lịch slot, multi-brand</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bán xe + garage</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Cross-sell bảo dưỡng sau bán — LTV cao</td>
    </tr>
  </tbody>
</table>

<h2 id="inventory">Inventory xe online &amp; bộ filter</h2>

<p>Trong <strong>${KEYWORD}</strong>, inventory cần:</p>

<ul>
  <li><strong>Card xe:</strong> Ảnh chính, tên, năm, ODO, giá, hộp số, nhiên liệu</li>
  <li><strong>Filter:</strong> Hãng, dòng xe, giá min-max, năm, ODO, số sàn, màu, tỉnh</li>
  <li><strong>Sort:</strong> Giá tăng/giảm, mới đăng, ODO thấp</li>
  <li><strong>Trạng thái:</strong> Còn hàng / Đã bán — ẩn hoặc archive xe sold</li>
  <li><strong>CMS admin:</strong> Thêm xe mới 10 phút — upload ảnh batch</li>
  <li><strong>Sync (tùy chọn):</strong> Chợ Tốt, Bonbanh — tránh double entry</li>
</ul>

<h2 id="trang-xe">Trang chi tiết xe — conversion</h2>

<ul>
  <li><strong>Gallery:</strong> 15–25 ảnh — ngoại thất, nội thất, máy, lốp, đồng hồ ODO</li>
  <li><strong>Spec table:</strong> Hãng, đời, máy, hộp số, màu, số chỗ, xuất xứ</li>
  <li><strong>Giá:</strong> Rõ ràng — “890 triệu” hoặc “Liên hệ” xe hiếm</li>
  <li><strong>Lịch sử (xe cũ):</strong> Số chủ, bảo dưỡng chính hãng, không đụng đè</li>
  <li><strong>CTA sticky mobile:</strong> Gọi ngay, Zalo, Đăng ký lái thử</li>
  <li><strong>Trả góp calculator (tùy chọn):</strong> Trả trước X%, số tháng — lead qualify</li>
  <li><strong>Similar cars:</strong> Xe cùng tầm giá — giữ user on site</li>
</ul>

${wpImg(2, "Trang chi tiết xe ô tô trên website — gallery ảnh và thông số kỹ thuật")}

<h2 id="garage">Garage — dịch vụ &amp; đặt lịch bảo dưỡng</h2>

<p>Garage trên web automotive:</p>

<ul>
  <li><strong>Danh mục dịch vụ:</strong> Bảo dưỡng 5k/10k km, thay dầu, phanh, gầm, điều hòa…</li>
  <li><strong>Bảng giá tham khảo:</strong> “Từ 800k” — tránh shock khi tới quán</li>
  <li><strong>Đặt lịch online:</strong> Chọn dịch vụ → ngày/giờ → biển số xe → confirm Zalo</li>
  <li><strong>Multi-brand:</strong> Toyota, Hyundai, Mazda… — garage độc lập</li>
  <li><strong>Pickup (tùy chọn):</strong> Form lấy xe tận nhà — premium service</li>
  <li><strong>Lịch sử khách:</strong> CRM biển số — nhắc bảo dưỡng định kỳ email/ZNS</li>
</ul>

<p>Xem <a href="${SITE}/blog/thiet-ke-website-dat-lich-hen-online">đặt lịch hẹn online</a>.</p>

<h2 id="lead">Lái thử, định giá xe cũ &amp; form lead</h2>

<ul>
  <li><strong>Đăng ký lái thử:</strong> Model quan tâm, ngày, SĐT — sales confirm</li>
  <li><strong>Bán xe cho showroom:</strong> Form hãng, năm, ODO, ảnh — định giá sơ bộ</li>
  <li><strong>Báo giá trả góp:</strong> Thu nhập, trả trước — chuyển tín dục partner</li>
  <li><strong>Chat Zalo:</strong> Sticky mọi trang inventory — VN buyer quen Zalo</li>
  <li><strong>Pixel Meta:</strong> ViewContent xe, Lead form — retarget ads</li>
</ul>

<h2 id="seo">SEO cho website bán xe &amp; garage</h2>

<ul>
  <li><strong>Title xe:</strong> “Toyota Vios 2021 số tự động 45000km | [Showroom]”</li>
  <li><strong>Title garage:</strong> “Bảo dưỡng xe Toyota TPHCM | Garage [Tên]”</li>
  <li><strong>Local SEO:</strong> GBP + schema AutoDealer / AutoRepair</li>
  <li><strong>Blog:</strong> “Kinh nghiệm mua xe cũ”, “Bảo dưỡng 10000km cần làm gì”</li>
  <li><strong>URL:</strong> <code>/xe/toyota-vios-2021-at-45000km</code> — readable slug</li>
  <li><strong>Index “đã bán”:</strong> noindex hoặc remove — tránh bounce SEO</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website ô tô — 7 bước</h2>

<ol>
  <li><strong>Brief mô hình:</strong> Bán xe cũ/mới, garage, hay cả hai.</li>
  <li><strong>Inventory schema:</strong> Trường xe bắt buộc, filter, workflow đăng/bán.</li>
  <li><strong>Wireframe:</strong> List xe mobile, detail gallery, booking garage.</li>
  <li><strong>UI design:</strong> Automotive trust — dark hoặc clean white, ảnh hero lớn.</li>
  <li><strong>Dev + CMS:</strong> Admin thêm xe, upload ảnh, mark sold.</li>
  <li><strong>Seed 15–30 xe:</strong> Không launch inventory trống.</li>
  <li><strong>Launch + ads:</strong> Facebook catalog xe, Google local, SEO blog.</li>
</ol>

<p><strong>Thời gian:</strong> 4–8 tuần (inventory + garage booking); 8–12 tuần tích hợp sync sàn.</p>

<h2 id="bang-gia">Bảng giá thiết kế website ô tô 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Auto Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">8.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Inventory 50 xe, filter cơ bản, form lái thử/Zalo</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Auto Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">13.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Filter nâng cao, trả góp calc, SEO schema, blog</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Auto + Garage</strong></td>
      <td class="border border-indigo-100 px-3 py-2">18.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Inventory + đặt lịch bảo dưỡng + bảng giá dịch vụ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Nhập xe hàng loạt</strong></td>
      <td class="border border-indigo-100 px-3 py-2">+2.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Import CSV 100+ xe + training admin</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website ô tô</h2>

<ul>
  <li>Ảnh xe mờ, ít góc — khách nghi chất lượng xe.</li>
  <li>Giá web khác giá gọi — mất trust ngay.</li>
  <li>Xe đã bán vẫn hiện — khách đến phí công, review xấu.</li>
  <li>Filter không hoạt động mobile — UX tệ trên Chợ Tốt competitor.</li>
  <li>Garage không có bảng giá sơ bộ — khách sợ “chặt chém”.</li>
  <li>Form lái thử không auto-reply — lead nguội.</li>
  <li>Web chậm — gallery 30 ảnh chưa nén WebP.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-catalog-san-pham`,
    label: "Catalog sản phẩm",
    desc: "Listing tương tự inventory.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-dat-lich-hen-online`,
    label: "Đặt lịch hẹn online",
    desc: "Booking garage.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-form-lien-he`,
    label: "Form liên hệ",
    desc: "Lead lái thử.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn website ô tô",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website ô tô giá bao nhiêu?",
      a: "Tại Bứt Phá từ 8.000.000đ (inventory cơ bản) đến 18.000.000đ (bán xe + garage booking). Báo giá theo số xe và tính năng filter.",
    },
    {
      q: "Website có thay Chợ Tốt/Bonbanh không?",
      a: "Bổ sung — owned inventory + brand trust. Vẫn nên đăng sàn kéo reach; web là kênh chính showcase chuyên nghiệp.",
    },
    {
      q: "Admin tự đăng xe mới được không?",
      a: "Có — CMS đơn giản: upload ảnh, điền spec, publish. Training 1 buổi cho sales.",
    },
    {
      q: "Có tích hợp trả góp ngân hàng không?",
      a: "Có thể embed calculator + form chuyển hồ sơ — tích hợp API bank tùy đối tác, báo giá riêng.",
    },
    {
      q: "Garage đặt lịch online hoạt động thế nào?",
      a: "Khách chọn dịch vụ + slot → confirm Zalo/SMS. Admin dashboard xem lịch theo ngày — tương tự booking spa.",
    },
    {
      q: "SEO “xe cũ [hãng] [tỉnh]” mất bao lâu?",
      a: "2–4 tháng với inventory URL unique + blog. Mỗi xe = landing long-tail tiềm năng.",
    },
    {
      q: "Bao lâu go-live website ô tô?",
      a: "4–8 tuần. Cần sẵn ảnh xe chuẩn — chụp lại nếu ảnh cũ kém chất lượng.",
    },
    {
      q: "Bứt Phá có thiết kế website ô tô không?",
      a: "Có — showroom xe cũ/mới, garage đa hãng. Inventory + booking + SEO. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website ô tô</strong> hiệu quả = inventory filter mạnh + trang xe ảnh/spec đầy đủ + garage booking tiện + lead Zalo/lái thử nhanh — xây kênh bán xe và dịch vụ owned, không phụ thuộc 100% sàn.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — showroom, garage hay combo và báo giá theo quy mô inventory của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website ô tô",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
