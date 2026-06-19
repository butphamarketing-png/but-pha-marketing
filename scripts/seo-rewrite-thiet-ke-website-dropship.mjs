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

const KEYWORD = "thiết kế website dropship";
const TITLE = "Thiết Kế Website Dropship Tối Ưu Vận Hành";

export const REWRITE_THIET_KE_WEBSITE_DROPSHIP = {
  title: TITLE,
  slug: "thiet-ke-website-dropship",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website dropshipping, dropship việt nam, bán hàng không giữ kho, shop dropship online",
  metaTitle: "Thiết Kế Website Dropship | Không Giữ Kho 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website dropship: chọn niche, tích hợp nhà cung cấp, COD, ads và vận hành không giữ kho. Quy trình 7 bước, giá 8–15 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website dropship tối ưu vận hành: mô hình không kho, nguồn hàng, checkout COD và marketing tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Dropship | Không Giữ Kho 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "dropship-la-gi", label: "Dropship là gì?" },
  { id: "vi-sao-can-web", label: "Vì sao cần website riêng?" },
  { id: "web-vs-san", label: "Web dropship vs sàn" },
  { id: "chon-niche", label: "Chọn niche & sản phẩm" },
  { id: "nguon-hang", label: "Nguồn hàng & nhà cung cấp" },
  { id: "cau-truc-web", label: "Cấu trúc website dropship" },
  { id: "checkout-cod", label: "Checkout COD & thanh toán" },
  { id: "van-hanh-don", label: "Vận hành đơn dropship" },
  { id: "marketing", label: "Marketing & quảng cáo" },
  { id: "nen-tang", label: "Nền tảng kỹ thuật" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website dropship</strong> là xây dựng cửa hàng online bán sản phẩm mà shop <em>không giữ tồn kho</em> — khi có đơn, bạn chuyển thông tin cho nhà cung cấp (NCC) hoặc kho dropship để họ đóng gói và giao thẳng cho khách. Mô hình phù hợp người mới kinh doanh, marketer test sản phẩm ads, hoặc brand muốn mở rộng SKU không đầu tư kho.`,
    `Bài viết dành cho người đang cân nhắc <strong>${KEYWORD}</strong> tại Việt Nam: chọn niche, nguồn hàng nội địa vs Trung Quốc, cấu trúc web tối ưu chuyển đổi, COD checkout, quy trình xử lý đơn, ads Facebook/TikTok và mức giá triển khai 2026 — thực tế, không hứa “làm giàu nhanh”.`,
  ],
})}

${wpKeyTakeaways([
  "Dropship = bạn bán, NCC giao — margin = giá bán − giá gốc − ads − phí sàn.",
  "Website riêng giữ brand + pixel + remarketing — tốt hơn chỉ bán fanpage.",
  "COD vẫn là chuẩn VN — checkout đơn giản, form ngắn trên mobile.",
  "Chọn NCC uy tín quan trọng hơn theme web đẹp — review xấu kill shop.",
  "Bứt Phá: website dropship 8–15 triệu + landing ads tùy chiến dịch.",
])}

${wpImg(1, "Thiết kế website dropship bán hàng không giữ kho tối ưu vận hành")}

<h2 id="dropship-la-gi">Dropshipping là gì?</h2>

<p><strong>Dropshipping</strong> (bán hàng không giữ kho) là mô hình: shop nhận đơn và thu tiền khách → chuyển đơn + địa chỉ giao cho nhà cung cấp → NCC ship hàng → shop giữ phần chênh lệch (margin). Bạn không mua trước hàng, không thuê kho (hoặc kho tối thiểu).</p>

<p><strong>Thiết kế website dropship</strong> tập trung vào:</p>
<ul>
  <li>Trưng bày sản phẩm hấp dẫn — ảnh, copy, review</li>
  <li>Checkout nhanh — COD, form SĐT + địa chỉ</li>
  <li>Tích hợp form → sheet/CRM → chuyển NCC</li>
  <li>Pixel ads — đo ROAS từng sản phẩm</li>
  <li>Chính sách đổi trả rõ — giảm khiếu nại</li>
</ul>

<h3>Dropship vs bán hàng truyền thống</h3>
<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Tiêu chí</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Dropship</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Giữ kho</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Vốn ban đầu</td>
      <td class="border border-indigo-100 px-3 py-2">Thấp — chủ yếu web + ads</td>
      <td class="border border-indigo-100 px-3 py-2">Mua hàng, kho, nhân sự</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Kiểm soát chất lượng</td>
      <td class="border border-indigo-100 px-3 py-2">Phụ thuộc NCC</td>
      <td class="border border-indigo-100 px-3 py-2">Tự kiểm tra trước giao</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Thời gian giao</td>
      <td class="border border-indigo-100 px-3 py-2">2–7 ngày (NCC VN) / 7–21 ngày (import)</td>
      <td class="border border-indigo-100 px-3 py-2">1–3 ngày nếu kho sẵn</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2">Margin</td>
      <td class="border border-indigo-100 px-3 py-2">20–40% nếu ads tốt</td>
      <td class="border border-indigo-100 px-3 py-2">30–60% tùy ngành</td>
    </tr>
  </tbody>
</table>

<h2 id="vi-sao-can-web">Vì sao dropship cần website riêng?</h2>

<ul>
  <li><strong>Pixel &amp; remarketing:</strong> Meta/TikTok pixel trên domain riêng — tối ưu ads chính xác.</li>
  <li><strong>Thương hiệu:</strong> Tên shop, logo, story — không bị “shop lạ” trên sàn.</li>
  <li><strong>Margin:</strong> Không hoa hồng Shopee 5–15% — nếu traffic tự kiếm được.</li>
  <li><strong>Landing từ ads:</strong> Message match — chuyển đổi cao hơn trang chủ chung chung.</li>
  <li><strong>Email/SMS:</strong> Thu SĐT khách — tái marketing (ZNS, SMS).</li>
</ul>

<p>Nhiều dropshipper bắt đầu bằng landing + form COD; sau scale mở catalog đa sản phẩm. Xem <a href="${SITE}/blog/thiet-ke-website-landing-page-ban-hang">landing page bán hàng</a>.</p>

<h2 id="web-vs-san">Website dropship vs bán trên sàn</h2>

<p>Shopee/TikTok Shop phù hợp test nhanh; <strong>${KEYWORD}</strong> phù hợp khi:</p>
<ul>
  <li>Chạy ads Facebook/TikTok về trang riêng — ROAS đo được</li>
  <li>Sản phẩm ngách, copy dài, video UGC — cần landing custom</li>
  <li>Muốn xây brand dài hạn — không phụ thuộc tài khoản sàn</li>
</ul>

<p>Chiến lược phổ biến: <em>web chính + sàn phụ</em> hoặc ngược lại — xem <a href="${SITE}/blog/thiet-ke-website-ban-hang-omni">bán hàng đa kênh</a>.</p>

<h2 id="chon-niche">Chọn niche &amp; sản phẩm dropship</h2>

<p>Website đẹp không cứu sản phẩm tệ. Tiêu chí chọn niche cho dropship VN:</p>

<ul>
  <li><strong>Giá bán 150k–800k:</strong> COD dễ chốt; quá rẻ margin mỏng, quá đắt cần trust cao</li>
  <li><strong>Visual appeal:</strong> Mỹ phẩm, gia dụng, phụ kiện — demo video ads được</li>
  <li><strong>Giải quyết pain rõ:</strong> “Hết mụn”, “Gọn nhà”, “Ngủ ngon” — copy dễ viết</li>
  <li><strong>NCC VN có sẵn:</strong> Giao 2–4 ngày — giảm hủy đơn COD</li>
  <li><strong>Ít hoàn trả phức tạp:</strong> Tránh thiết bị y tế, điện tử đắt nếu chưa có kho test</li>
</ul>

<p>Tránh: sản phẩm vi phạm bản quyền, hàng giả thương hiệu, cam kết y tế quá đà — ads/account dễ bị khóa.</p>

${wpImg(2, "Chọn niche và nguồn hàng dropship trước khi thiết kế website bán online")}

<h2 id="nguon-hang">Nguồn hàng &amp; nhà cung cấp dropship</h2>

<h3>NCC trong Việt Nam</h3>
<ul>
  <li>Kho sỉ Tân Bình, Nhật Tảo (điện tử), làng nghề — ship COD hộ</li>
  <li>Nền tảng sỉ online: Accesstrade, các group Zalo sỉ</li>
  <li>Ưu: Giao nhanh, COD tin cậy, hỗ trợ tiếng Việt</li>
  <li>Nhược: Margin thấp hơn import, catalog hạn chế</li>
</ul>

<h3>Nguồn Trung Quốc / AliExpress / 1688</h3>
<ul>
  <li>Margin cao, đa dạng SKU</li>
  <li>Thời gian giao 10–20 ngày — tỷ lệ hủy COD cao ở VN</li>
  <li>Cần order sample trước — kiểm chất lượng, đóng gói, tem</li>
</ul>

<h3>Checklist chọn NCC</h3>
<ul>
  <li>☐ Giao sample trong 3 ngày</li>
  <li>☐ Ship COD, đổi trả khi lỗi NCC</li>
  <li>☐ Bảng giá sỉ rõ, không ẩn phí ship</li>
  <li>☐ Không dán bill giá sỉ lên hộp (white label)</li>
  <li>☐ SLA phản hồi đơn &lt; 24h</li>
</ul>

<h2 id="cau-truc-web">Cấu trúc website dropship chuẩn CRO</h2>

<p><strong>Thiết kế website dropship</strong> thường theo một trong hai mô hình:</p>

<h3>Mô hình A: Single-product landing</h3>
<ul>
  <li>1 URL = 1 sản phẩm hero — tối ưu ads</li>
  <li>Scroll dài: hero → benefit → review → FAQ → form COD</li>
  <li>Phù hợp test sản phẩm mới, budget ads hạn chế</li>
</ul>

<h3>Mô hình B: Catalog shop</h3>
<ul>
  <li>Trang chủ + danh mục + trang sản phẩm</li>
  <li>Giỏ hàng hoặc form đơn giản</li>
  <li>Phù hợp nhiều SKU cùng niche, SEO dài hạn</li>
</ul>

<p>Block bắt buộc trên mọi trang:</p>
<ul>
  <li>Ảnh sản phẩm thật / UGC — không chỉ ảnh stock Trung Quốc</li>
  <li>Giá, combo, freeship — rõ ràng</li>
  <li>Review có ảnh (thật hoặc seed có ethics)</li>
  <li>Chính sách: giao 2–5 ngày, đổi trả 7 ngày, hotline/Zalo</li>
  <li>Nút CTA sticky mobile — “Đặt hàng COD”</li>
</ul>

<h2 id="checkout-cod">Checkout COD &amp; thanh toán</h2>

<p>Ở Việt Nam, <strong>COD (thu tiền khi giao)</strong> vẫn chiếm phần lớn đơn dropship. UX checkout nên:</p>

<ul>
  <li>Form 4–6 trường: Họ tên, SĐT, Tỉnh/Quận, Địa chỉ, Số lượng, Ghi chú</li>
  <li>Dropdown tỉnh thành — GHN/GHTK tính phí tự động (nếu có)</li>
  <li>Xác nhận đơn qua ZNS/SMS — giảm bom hàng</li>
  <li>Trang cảm ơn + mã đơn — fire pixel Purchase/Lead</li>
  <li>MoMo/VNPay (tùy chọn) — khách trẻ, tin thanh toán trước</li>
</ul>

<h2 id="van-hanh-don">Vận hành đơn dropship hàng ngày</h2>

<ol>
  <li><strong>Nhận đơn:</strong> Form web → Google Sheet / CRM / Pancake</li>
  <li><strong>Xác minh:</strong> Gọi/Zalo xác nhận COD (đơn &gt;500k nên gọi)</li>
  <li><strong>Chuyển NCC:</strong> Excel/API — địa chỉ, SKU, số lượng</li>
  <li><strong>Tracking:</strong> NCC gửi mã vận đơn → cập nhật khách</li>
  <li><strong>Hậu mãi:</strong> Đổi trả lỗi NCC — shop chịu trách nhiệm với khách</li>
  <li><strong>Đối soát:</strong> COD về — trừ giá gốc + ship NCC = lợi nhuận thực</li>
</ol>

<p>Công cụ gợi ý: Google Sheet + Apps Script, Pancake, Haravan form, Notion template — tùy quy mô 10–500 đơn/ngày.</p>

<h2 id="marketing">Marketing &amp; quảng cáo cho dropship</h2>

<ul>
  <li><strong>Facebook/TikTok Ads:</strong> Video 15–30s demo sản phẩm → landing</li>
  <li><strong>Pixel events:</strong> ViewContent, AddToCart, Purchase — tối ưu conversion</li>
  <li><strong>ROAS mục tiêu:</strong> Breakeven 1.5–2.5 tùy margin — test 3–5 ngày/adset</li>
  <li><strong>Organic:</strong> TikTok/Reels UGC — kéo traffic free bổ sung ads</li>
  <li><strong>Email/ZNS:</strong> Khách cũ — upsell combo, không chỉ ads lạnh</li>
</ul>

<p>Website phải <em>nhanh trên mobile</em> — bounce cao = CPC lãng phí. Xem <a href="${SITE}/blog/thiet-ke-website-toc-do-cao">tốc độ website</a>.</p>

<h2 id="nen-tang">Nền tảng kỹ thuật cho website dropship</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Nền tảng</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Ưu điểm dropship</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Nhược</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Landing HTML/Next.js</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Cực nhanh, CRO cao, form custom</td>
      <td class="border border-indigo-100 px-3 py-2">Ít catalog, cần dev mỗi SP mới</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>WooCommerce</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Nhiều SKU, plugin COD, SEO</td>
      <td class="border border-indigo-100 px-3 py-2">Cần tối ưu tốc độ</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Shopify</strong></td>
      <td class="border border-indigo-100 px-3 py-2">App dropship, payment quốc tế</td>
      <td class="border border-indigo-100 px-3 py-2">Phí tháng, COD VN cần app</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Haravan/Sapo</strong></td>
      <td class="border border-indigo-100 px-3 py-2">COD, GHN sẵn, vận hành VN</td>
      <td class="border border-indigo-100 px-3 py-2">Template hạn chế custom ads landing</td>
    </tr>
  </tbody>
</table>

<h2 id="quy-trinh">Quy trình thiết kế website dropship — 7 bước</h2>

<ol>
  <li><strong>Chọn niche + test NCC:</strong> Order sample, đo thời gian giao thực tế.</li>
  <li><strong>Brief landing/shop:</strong> 1 hero product hoặc catalog — copy + ảnh UGC.</li>
  <li><strong>Thiết kế UI mobile-first:</strong> CTA COD, trust badge, review block.</li>
  <li><strong>Dev + form:</strong> Sheet/CRM webhook, thank-you page, pixel Meta.</li>
  <li><strong>Chính sách pháp lý:</strong> Điều khoản, đổi trả, thông tin shop trên web.</li>
  <li><strong>Test end-to-end:</strong> Đặt đơn thử → NCC nhận → ship → COD về.</li>
  <li><strong>Launch ads nhỏ:</strong> 500k–2tr test ROAS → scale khi margin dương.</li>
</ol>

<p><strong>Thời gian:</strong> 2–4 tuần (landing + 1 NCC); 4–6 tuần (shop catalog + tích hợp).</p>

<h2 id="bang-gia">Bảng giá thiết kế website dropship 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Dropship Landing</strong></td>
      <td class="border border-indigo-100 px-3 py-2">8.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">1 sản phẩm, form COD, pixel Meta</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Dropship Shop</strong></td>
      <td class="border border-indigo-100 px-3 py-2">12.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Catalog WooCommerce, 50 SKU, GHN/GHTK</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Dropship Pro</strong></td>
      <td class="border border-indigo-100 px-3 py-2">15.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">3 landing + shop hub, sheet sync, GA4</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Landing thêm</strong></td>
      <td class="border border-indigo-100 px-3 py-2">2.500.000đ/trang</td>
      <td class="border border-indigo-100 px-3 py-2">Test sản phẩm ads mới</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm phổ biến khi làm dropship</h2>

<ul>
  <li>Web đẹp nhưng NCC giao chậm 2 tuần — review 1 sao, ads chết.</li>
  <li>Copy ads quá đà — vi phạm chính sách Meta/TikTok.</li>
  <li>Không test sample — hàng lỗi, khác ảnh quảng cáo.</li>
  <li>Form dài, web chậm mobile — conversion thấp.</li>
  <li>Không gọi xác nhận COD — tỷ lệ bom hàng cao.</li>
  <li>Scale ads khi chưa tính margin thực (sau ship NCC + ads).</li>
  <li>Bán hàng nhái thương hiệu — rủi ro pháp lý và khóa shop.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-landing-page-ban-hang`,
    label: "Landing page bán hàng",
    desc: "CRO cho ads.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-ban-hang-omni`,
    label: "Bán hàng đa kênh",
    desc: "Web + sàn.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-thuong-mai-dien-tu`,
    label: "Website TMĐT",
    desc: "Shop giữ kho.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn dropship",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website dropship giá bao nhiêu?",
      a: "Tại Bứt Phá từ 8.000.000đ (landing 1 SP) đến 15.000.000đ (shop + nhiều landing). Báo giá theo số trang và tích hợp form/CRM.",
    },
    {
      q: "Dropship có cần đăng ký kinh doanh không?",
      a: "Khi doanh thu ổn định nên đăng ký hộ kinh doanh/công ty và hóa đơn — tránh rủi ro thuế. Web nên có thông tin shop rõ ràng.",
    },
    {
      q: "Nên dropship hàng Việt hay Trung Quốc?",
      a: "Người mới nên NCC Việt — giao nhanh, COD ổn. Import margin cao hơn nhưng hủy đơn và khiếu nại nhiều hơn.",
    },
    {
      q: "Website dropship có cần giỏ hàng không?",
      a: "Landing 1 SP thường chỉ form COD. Shop nhiều SKU nên có giỏ hàng hoặc combo — tăng AOV.",
    },
    {
      q: "Làm sao tránh NCC gửi bill giá sỉ cho khách?",
      a: "Thỏa thuận white label trước — NCC không chèn phiếu giá. Test bằng đơn mẫu gửi về địa chỉ bạn.",
    },
    {
      q: "Dropship có kiếm tiền được không?",
      a: "Có — nếu chọn đúng sản phẩm, NCC uy tín, web chuyển đổi tốt và ads có ROAS dương. Không phải thu nhập thụ động; cần vận hành đơn và CSKH.",
    },
    {
      q: "Bao lâu hoàn thành website dropship?",
      a: "Landing 1–2 tuần; shop catalog 3–4 tuần. Song song test NCC trong lúc dev.",
    },
    {
      q: "Bứt Phá có thiết kế website dropship không?",
      a: "Có — landing COD, shop WooCommerce, tích hợp pixel và form sheet. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website dropship</strong> thành công = sản phẩm &amp; NCC đúng + web mobile nhanh + checkout COD đơn giản + quy trình chuyển đơn rõ — không chỉ theme đẹp. Test sample và ROAS nhỏ trước khi scale ads và mở thêm landing.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — mô hình landing hay shop, tích hợp form và timeline phù hợp ngân sách ads của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website dropship",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
