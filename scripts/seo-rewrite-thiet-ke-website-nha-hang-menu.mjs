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

const KEYWORD = "thiết kế website nhà hàng menu";
const TITLE = "Thiết Kế Website Nhà Hàng Menu Online Đẹp";

export const REWRITE_THIET_KE_WEBSITE_NHA_HANG_MENU = {
  title: TITLE,
  slug: "thiet-ke-website-nha-hang-menu",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "menu online nhà hàng, menu QR code, website menu điện tử, đặt bàn nhà hàng online",
  metaTitle: "Thiết Kế Website Nhà Hàng Menu Online | QR Menu 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website nhà hàng menu: menu QR, ảnh món đẹp, đa ngôn ngữ, đặt bàn và order online. Quy trình 7 bước, giá 5–12 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website nhà hàng menu online: QR menu, showcase món ăn, đặt bàn và order tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Nhà Hàng Menu Online | QR Menu 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "menu-online-la-gi", label: "Menu online là gì?" },
  { id: "vi-sao-can", label: "Vì sao cần menu web?" },
  { id: "qr-menu", label: "Menu QR & scan tại bàn" },
  { id: "cau-truc", label: "Cấu trúc website menu" },
  { id: "anh-mon-an", label: "Ảnh món & UX đọc menu" },
  { id: "da-ngon-ngu", label: "Đa ngôn ngữ & giá" },
  { id: "dat-ban", label: "Đặt bàn & order online" },
  { id: "seo-local", label: "SEO local nhà hàng" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website nhà hàng menu</strong> là xây dựng trang web (hoặc microsite) hiển thị <em>thực đơn điện tử</em> — ảnh món, mô tả, giá, allergen — thay hoặc bổ sung menu giấy in, kèm QR code trên bàn để khách quét xem menu trên điện thoại, đặt bàn trước hoặc order mang về/giao hàng.`,
    `Bài viết dành cho chủ quán, F&amp;B chain và marketing nhà hàng đang cần <strong>${KEYWORD}</strong>: menu QR chuẩn UX, chụp ảnh món, cập nhật giá nhanh, đa ngôn ngữ cho khách du lịch, tích hợp đặt bàn và mức giá triển khai 2026 tại Việt Nam.`,
  ],
})}

${wpKeyTakeaways([
  "Menu web = cập nhật giá/món realtime — không in lại menu giấy mỗi tháng.",
  "QR trên bàn: quét → menu mobile — giảm chi phí in, hygiene post-COVID.",
  "Ảnh món chất lượng quyết định 80% quyết định gọi món.",
  "Đa ngôn ngữ VN/EN — quận du lịch, expat, khách sạn.",
  "Bứt Phá: menu online 5–12 triệu tùy QR, đặt bàn và order.",
])}

${wpImg(1, "Thiết kế website nhà hàng menu online QR code và ảnh món ăn đẹp")}

<h2 id="menu-online-la-gi">Website menu nhà hàng là gì?</h2>

<p><strong>Website menu nhà hàng</strong> (digital menu / online menu) là trang web tập trung hiển thị thực đơn — không nhất thiết full website corporate. <strong>Thiết kế website nhà hàng menu</strong> thường gồm:</p>

<ul>
  <li><strong>Danh mục món:</strong> Khai vị, món chính, tráng miệng, đồ uống — filter/tag</li>
  <li><strong>Ảnh + mô tả:</strong> Nguyên liệu, size, cay/nhạt, vegetarian</li>
  <li><strong>Giá:</strong> Cập nhật CMS — hiển thị VND rõ ràng</li>
  <li><strong>QR code:</strong> In standee bàn — link tới menu mobile</li>
  <li><strong>CTA:</strong> Đặt bàn, gọi ship, Zalo order</li>
</ul>

<p>Khác <a href="${SITE}/blog/thiet-ke-website-nha-hang">website nhà hàng</a> tổng quát (giới thiệu, gallery, sự kiện) — menu site focus <em>conversion gọi món</em>.</p>

<h2 id="vi-sao-can">Vì sao không chỉ dùng menu PDF hoặc ảnh Facebook?</h2>

<ul>
  <li><strong>Cập nhật giá:</strong> Tăng giá nguyên liệu — sửa web 5 phút vs in menu mới.</li>
  <li><strong>Hết món:</strong> Ẩn món tạm thời — tránh khách gọi món không còn.</li>
  <li><strong>Mobile UX:</strong> PDF zoom khó đọc — web responsive tối ưu thumb scroll.</li>
  <li><strong>SEO:</strong> “Nhà hàng [tên] menu” — khách Google tìm món trước khi tới.</li>
  <li><strong>Analytics:</strong> Món nào xem nhiều — insight cho chef/marketing.</li>
  <li><strong>Đa chi nhánh:</strong> Menu khác nhau theo location — một CMS nhiều link QR.</li>
</ul>

<h2 id="qr-menu">Menu QR code — quy trình tại bàn</h2>

<ol>
  <li>In QR standee/tent card trên mỗi bàn — link <code>menu.nhahang.vn</code></li>
  <li>Khách quét → mở menu mobile — không cần app</li>
  <li>Chọn món → ghi chú gửi bếp (tùy tích hợp) hoặc gọi phục vụ</li>
  <li>Nhân viên order trên POS — hoặc self-order tablet</li>
</ol>

<p>Lưu ý UX QR:</p>
<ul>
  <li>Landing thẳng menu — không popup quảng cáo che màn hình</li>
  <li>Font lớn, contrast cao — ánh sáng quán yếu vẫn đọc được</li>
  <li>WiFi password trên standee (tùy chọn) — tải nhanh hơn 4G</li>
  <li>Fallback menu giấy cho khách không dùng smartphone</li>
</ul>

<h2 id="cau-truc">Cấu trúc website menu nhà hàng chuẩn</h2>

<ol>
  <li><strong>Header:</strong> Logo, giờ mở cửa, hotline, nút “Đặt bàn”</li>
  <li><strong>Category nav:</strong> Sticky tab — Khai vị / Món chính / Tráng miệng / Drink</li>
  <li><strong>Card món:</strong> Ảnh vuông, tên, mô tả ngắn, giá, tag (Best seller, Spicy, Veg)</li>
  <li><strong>Combo / set:</strong> Highlight margin cao — lunch set, couple set</li>
  <li><strong>Allergen &amp; note:</strong> Icon gluten, đậu phộng, hải sản</li>
  <li><strong>Footer:</strong> Địa chỉ, map, social, chính sách</li>
</ol>

${wpImg(2, "Cấu trúc menu online nhà hàng — category sticky và card món ăn")}

<h2 id="anh-mon-an">Ảnh món ăn &amp; UX đọc menu</h2>

<ul>
  <li><strong>Chụp chuyên nghiệp</strong> hoặc styled phone — ánh sáng tự nhiên, nền sạch</li>
  <li><strong>Tỷ lệ 1:1</strong> grid đồng nhất — không ảnh dọc ngang lẫn lộn</li>
  <li><strong>Mô tả sensory:</strong> “Giòn rụm, sốt bơ tỏi thơm” — không chỉ liệt kê nguyên liệu</li>
  <li><strong>Best seller badge:</strong> Social proof — “Món được gọi nhiều nhất”</li>
  <li><strong>Lazy load:</strong> Menu 80+ món — tải ảnh khi scroll</li>
  <li><strong>Dark mode (tùy chọn):</strong> Fine dining — aesthetic tối</li>
</ul>

<h2 id="da-ngon-ngu">Đa ngôn ngữ, giá &amp; cập nhật CMS</h2>

<p><strong>${KEYWORD}</strong> cho khu du lịch (Đà Nẵng, Phú Quốc, Q1) nên có:</p>
<ul>
  <li>Tiếng Việt + English — toggle góc màn hình</li>
  <li>Giá VND — ghi rõ “++” service charge nếu có</li>
  <li>CMS WordPress/custom — staff sửa giá không cần dev</li>
  <li>Schedule: Happy hour giá khác 17h–19h (advanced)</li>
  <li>Seasonal menu: Tab “Mùa hè 2026” — archive menu cũ</li>
</ul>

<h2 id="dat-ban">Đặt bàn, order mang về &amp; giao hàng</h2>

<ul>
  <li><strong>Đặt bàn:</strong> Form ngày/giờ/số người — confirm Zalo/SMS</li>
  <li><strong>Order takeaway:</strong> Chọn món + giỏ → checkout COD hoặc MoMo</li>
  <li><strong>GrabFood/ShopeeFood:</strong> Link nút “Order delivery” — không duplicate menu manual</li>
  <li><strong>Zalo OA:</strong> Nút chat — khách hỏi món, đặt nhanh</li>
</ul>

<p>Xem <a href="${SITE}/blog/thiet-ke-website-dat-lich-hen-online">đặt lịch hẹn online</a> cho logic booking tương tự.</p>

<h2 id="seo-local">SEO local cho menu nhà hàng</h2>

<ul>
  <li><strong>Title:</strong> “Menu [Tên quán] — [Món signature] | [Quận]”</li>
  <li><strong>Schema Restaurant + Menu:</strong> JSON-LD hasMenu, servesCuisine</li>
  <li><strong>Google Business Profile:</strong> Link menu web trên GBP</li>
  <li><strong>Alt ảnh:</strong> “Phở bò [tên quán] menu online”</li>
  <li><strong>Blog (tùy chọn):</strong> “Cách chọn wine pairing” — traffic organic</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website menu — 7 bước</h2>

<ol>
  <li><strong>Audit menu hiện tại:</strong> Excel/PDF món, giá, ảnh có sẵn.</li>
  <li><strong>Chụp/thu thập ảnh:</strong> Ưu tiên best seller và món margin cao.</li>
  <li><strong>Wireframe mobile:</strong> Category sticky, card layout, QR landing.</li>
  <li><strong>UI design:</strong> Match brand quán — casual, fine dining, cafe.</li>
  <li><strong>Dev + CMS:</strong> Nhập món, QR generate, đặt bàn form.</li>
  <li><strong>In QR standee:</strong> Test quét trên iOS + Android nhiều bàn.</li>
  <li><strong>Train staff:</strong> Cập nhật hết món, giá — SOP hàng tuần.</li>
</ol>

<p><strong>Thời gian:</strong> 2–4 tuần (menu 50–100 món); 1–2 tuần nếu menu ngắn + template.</p>

<h2 id="bang-gia">Bảng giá thiết kế website menu nhà hàng 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Menu QR Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">5.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Menu mobile, QR, CMS cập nhật giá, đến 60 món</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Menu Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">8.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Đa ngôn ngữ, đặt bàn, SEO local, ảnh tối ưu</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Menu Chain</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Multi-branch menu, QR từng chi nhánh, order takeaway</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Chụp ảnh món</strong></td>
      <td class="border border-indigo-100 px-3 py-2">+3.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">20 món onsite — styling cơ bản</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm menu online</h2>

<ul>
  <li>Ảnh stock generic — khách không tin món thật.</li>
  <li>Giá web khác giá quán — tranh chấp, review 1 sao.</li>
  <li>QR link chết hoặc chậm 5s — khách bực, gọi nhân viên.</li>
  <li>Menu chỉ PDF embed — UX mobile tệ.</li>
  <li>Quá nhiều popup quảng cáo trước menu — bounce cao.</li>
  <li>Không train staff cập nhật hết món — order nhầm.</li>
  <li>Thiếu allergen info — rủi ro sức khỏe, pháp lý.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-nha-hang`,
    label: "Website nhà hàng",
    desc: "Brand &amp; gallery F&amp;B.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-dat-lich-hen-online`,
    label: "Đặt lịch hẹn online",
    desc: "Booking bàn.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-da-ngon-ngu`,
    label: "Website đa ngôn ngữ",
    desc: "VN/EN menu.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn menu online",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website nhà hàng menu giá bao nhiêu?",
      a: "Tại Bứt Phá từ 5.000.000đ (menu QR cơ bản) đến 12.000.000đ (multi-branch + order). Báo giá theo số món và tính năng đặt bàn.",
    },
    {
      q: "Menu QR có cần app riêng không?",
      a: "Không — quét mở web responsive trên browser. App chỉ cần khi self-order phức tạp tích hợp POS.",
    },
    {
      q: "Tự cập nhật giá món được không?",
      a: "Có — CMS WordPress hoặc admin panel đơn giản. Đào tạo 1 buổi cho quản lý/quầy.",
    },
    {
      q: "Menu online có thay hoàn toàn menu giấy không?",
      a: "Nên giữ vài bản giấy backup. Đa số quán chuyển 80% sang QR — tiết kiệm in ấn.",
    },
    {
      q: "Có tích hợp order giao hàng không?",
      a: "Có — form order takeaway + MoMo/COD. Hoặc link GrabFood/ShopeeFood nếu đã có trên sàn.",
    },
    {
      q: "Menu đa chi nhánh khác nhau thế nào?",
      a: "Một CMS — mỗi chi nhánh URL hoặc QR riêng, menu subset theo location.",
    },
    {
      q: "Bao lâu hoàn thành website menu?",
      a: "2–4 tuần nếu có sẵn ảnh và list món. Thêm 1 tuần nếu chụp ảnh onsite.",
    },
    {
      q: "Bứt Phá có thiết kế website nhà hàng menu không?",
      a: "Có — cafe, nhà hàng, bar, chain F&amp;B. QR menu + CMS + đặt bàn. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website nhà hàng menu</strong> hiệu quả = ảnh món hấp dẫn + UX mobile mượt + QR ổn định + CMS cập nhật giá dễ — giảm chi phí in menu và nâng trải nghiệm khách tại bàn.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — QR menu, đa ngôn ngữ, đặt bàn và báo giá theo số món và chi nhánh của bạn.`,
  ],
  ctaLabel: "→ Tư vấn menu online nhà hàng",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
