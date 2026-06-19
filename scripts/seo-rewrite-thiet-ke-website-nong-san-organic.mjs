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

const KEYWORD = "thiết kế website nông sản";
const TITLE = "Thiết Kế Website Nông Sản Sạch Và OCOP";

export const REWRITE_THIET_KE_WEBSITE_NONG_SAN_ORGANIC = {
  title: TITLE,
  slug: "thiet-ke-website-nong-san-organic",
  keywordsMain: KEYWORD,
  keywordsSecondary:
    "website nông sản sạch, OCOP online, farm to table, đặt hàng rau củ quả, thương hiệu nông sản",
  metaTitle: "Thiết Kế Website Nông Sản | OCOP & Farm To Table 2026 | Bứt Phá",
  metaDescription:
    "Thiết kế website nông sản: rau củ sạch, OCOP, farm to table, đặt hàng COD và truy xuất nguồn gốc. Quy trình 7 bước, giá 7–15 triệu. Bứt Phá Marketing.",
  description:
    "Hướng dẫn thiết kế website nông sản sạch và OCOP: farm to table, đặt hàng online, truy xuất nguồn gốc tại Việt Nam.",
  imageUrl: NEWS_THUMBNAIL,
  content: buildWpSeoArticle({
    metaTitle: "Thiết Kế Website Nông Sản | OCOP & Farm To Table 2026 | Bứt Phá",
    keyword: KEYWORD,
    html: `
${wpToc([
  { id: "nong-san-web-la-gi", label: "Website nông sản là gì?" },
  { id: "ocop-farm", label: "OCOP & farm to table" },
  { id: "cau-truc", label: "Cấu trúc website chuẩn" },
  { id: "san-pham", label: "Catalog rau củ & đặc sản" },
  { id: "dat-hang", label: "Đặt hàng & giao tươi" },
  { id: "truy-xuat", label: "Truy xuất nguồn gốc" },
  { id: "seo", label: "SEO nông sản local" },
  { id: "marketing", label: "Marketing & đa kênh" },
  { id: "quy-trinh", label: "Quy trình 7 bước" },
  { id: "bang-gia", label: "Bảng giá 2026" },
  { id: "sai-lam", label: "Sai lầm cần tránh" },
  { id: "faq", label: "Câu hỏi thường gặp" },
  { id: "ket-luan", label: "Kết luận" },
])}

${wpIntro({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website nông sản</strong> là xây dựng nền tảng web cho hợp tác xã, trang trại, thương hiệu rau củ sạch và sản phẩm <em>OCOP</em> (Một sản phẩm quê hương) — giới thiệu nguồn gốc farm to table, catalog theo mùa vụ, đặt hàng online giao tươi COD/MoMo và truy xuất nguồn gốc QR — giúp nông dân/HTX bán trực tiếp cho người tiêu dùng và đại lý thay vì phụ thuộc chợ đầu mối.`,
    `Bài viết dành cho chủ trang trại, quản lý HTX OCOP và startup agri-food đang cần <strong>${KEYWORD}</strong>: cấu trúc catalog mùa vụ, logistics giao tươi, trust certification, SEO “rau sạch [tỉnh]” và mức giá triển khai 2026.`,
  ],
})}

${wpKeyTakeaways([
  "Nông sản web = tin cậy nguồn gốc + đặt hàng dễ — ảnh farm thật quan trọng hơn stock.",
  "Catalog theo mùa vụ — cập nhật có/không có hàng theo tuần.",
  "Combo tuần / gói gia đình — tăng AOV, giảm lãng phí lẻ.",
  "COD + giao slot sáng/chiều — phù hợp rau tươi VN.",
  "Bứt Phá: website nông sản 7–15 triệu tùy OCOP catalog và đặt hàng.",
])}

${wpImg(1, "Thiết kế website nông sản sạch OCOP farm to table đặt hàng online")}

<h2 id="nong-san-web-la-gi">Website nông sản sạch là gì?</h2>

<p><strong>Website nông sản</strong> phục vụ chuỗi <em>farm to table</em>:</p>
<ul>
  <li><strong>Giới thiệu trang trại / HTX:</strong> Quy trình canh tác, chứng nhận VietGAP, organic</li>
  <li><strong>Catalog sản phẩm:</strong> Rau củ, trái cây, gạo, mật ong, đặc sản OCOP</li>
  <li><strong>Đặt hàng online:</strong> Giỏ hàng, combo tuần, giao theo slot</li>
  <li><strong>Truy xuất:</strong> QR trên bao bì link về lô sản xuất</li>
  <li><strong>B2B (tùy chọn):</strong> Form đại lý, nhà hàng, quán ăn số lượng lớn</li>
</ul>

<p><strong>Thiết kế website nông sản</strong> khác shop TMĐT thông thường — sản phẩm <em>theo mùa, hạn dùng ngắn</em>, cần UX “còn hàng hôm nay” và cutoff time đặt cho giao sáng mai.</p>

<h2 id="ocop-farm">OCOP, nông sản sạch &amp; farm to table</h2>

<table class="w-full border-collapse text-sm my-6">
  <thead>
    <tr class="bg-indigo-50">
      <th class="border border-indigo-100 px-3 py-2 text-left">Mô hình</th>
      <th class="border border-indigo-100 px-3 py-2 text-left">Đặc thù web</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Rau củ sạch giao tươi</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Đặt trước 22h — giao sáng hôm sau, combo tuần</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>OCOP đặc sản</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Story làng nghề, sao OCOP, quà tặng — ship toàn quốc</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>HTX / hợp tác xã</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Nhiều sản phẩm nhiều xã — filter theo vùng</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Trang trại tham quan</strong></td>
      <td class="border border-indigo-100 px-3 py-2">Tour farm + bán tại chỗ — booking tham quan</td>
    </tr>
  </tbody>
</table>

<h2 id="cau-truc">Cấu trúc website nông sản chuẩn</h2>

<ol>
  <li><strong>Trang chủ:</strong> Hero farm, sản phẩm mùa này, cam kết sạch, CTA đặt hàng</li>
  <li><strong>Sản phẩm:</strong> Rau ăn lá / củ / trái / đặc sản — filter organic, OCOP</li>
  <li><strong>Combo / Gói:</strong> “Gói gia đình 4 người tuần” — fixed basket</li>
  <li><strong>Về nông trại:</strong> Ảnh thực tế, video canh tác, chứng nhận</li>
  <li><strong>OCOP / Câu chuyện:</strong> Từng sản phẩm — người làm, vùng nguyên liệu</li>
  <li><strong>Đặt hàng:</strong> Giỏ, chọn ngày giao, địa chỉ, COD/MoMo</li>
  <li><strong>Chính sách:</strong> Đổi trả rau héo, cam kết tươi, vùng giao hàng</li>
  <li><strong>Tin tức:</strong> Mùa vụ, thu hoạch, workshop farm</li>
</ol>

<h2 id="san-pham">Catalog rau củ &amp; sản phẩm OCOP</h2>

<ul>
  <li><strong>Ảnh thật:</strong> Sản phẩm vừa thu hoạch — không stock generic</li>
  <li><strong>Đơn vị:</strong> Kg, bó, hộp — rõ ràng tránh tranh cãi cân</li>
  <li><strong>Trạng thái:</strong> “Còn hàng hôm nay” / “Hết mùa — báo khi có”</li>
  <li><strong>Xuất xứ:</strong> Trang trại X, huyện Y — map embed</li>
  <li><strong>Chứng nhận badge:</strong> VietGAP, Organic EU, OCOP 4 sao</li>
  <li><strong>Hướng dẫn bảo quản:</strong> Tủ lạnh mấy ngày — giảm khiếu nại</li>
  <li><strong>Quà tặng:</strong> Set OCOP Tết — landing riêng</li>
</ul>

${wpImg(2, "Catalog nông sản sạch và sản phẩm OCOP trên website đặt hàng")}

<h2 id="dat-hang">Đặt hàng online &amp; logistics giao tươi</h2>

<ul>
  <li><strong>Cutoff time:</strong> “Đặt trước 21h giao sáng mai” — hiển thị countdown</li>
  <li><strong>Slot giao:</strong> Sáng 6–9h / Chiều 16–19h — khách chọn</li>
  <li><strong>Phí ship:</strong> Theo quận hoặc freeship đơn từ 300k</li>
  <li><strong>COD:</strong> Phổ biến — kiểm hàng trước khi nhận</li>
  <li><strong>MoMo/VNPay:</strong> Khách thành thị, giảm tiền lẻ COD</li>
  <li><strong>Combo subscription:</strong> Giao cố định thứ 3, 6 hàng tuần — LTV</li>
  <li><strong>B2B form:</strong> Nhà hàng đặt số lượng — báo giá sỉ riêng</li>
</ul>

<p>Xem <a href="${SITE}/blog/thiet-ke-website-thuong-mai-dien-tu">website TMĐT</a> cho checkout cơ bản.</p>

<h2 id="truy-xuat">Truy xuất nguồn gốc &amp; trust</h2>

<ul>
  <li><strong>QR trên bao bì:</strong> Scan → trang lô: ngày thu hoạch, nông dân, quy trình</li>
  <li><strong>Video farm:</strong> Livestream thu hoạch — transparency</li>
  <li><strong>Chứng nhận scan:</strong> PDF VietGAP, OCOP — downloadable verify</li>
  <li><strong>Cam kết không thuốc:</strong> Test report batch (nếu có) — upload periodic</li>
  <li><strong>Đối tác:</strong> Logo nhà hàng/ cửa hàng sạch phân phối</li>
</ul>

<h2 id="seo">SEO local cho nông sản &amp; OCOP</h2>

<ul>
  <li><strong>Title:</strong> “Rau sạch [Quận/Huyện] giao tươi | [Thương hiệu]”</li>
  <li><strong>Long-tail:</strong> “Mật ong rừng [tỉnh] OCOP”, “gạo ST25 chính hãng”</li>
  <li><strong>Google Business:</strong> Nếu có điểm bán — link web đặt hàng</li>
  <li><strong>Blog:</strong> “Cách chọn rau sạch”, “Đặc sản OCOP [tỉnh] làm quà”</li>
  <li><strong>Schema Product / LocalBusiness:</strong> JSON-LD vùng phục vụ</li>
</ul>

<h2 id="marketing">Marketing nông sản đa kênh</h2>

<ul>
  <li><strong>Zalo OA:</strong> Nhóm khách VIP — báo mùa vụ, flash rau hiếm</li>
  <li><strong>Facebook:</strong> Livestream bán rau trực tiếp — link web checkout</li>
  <li><strong>Shopee/TikTok:</strong> OCOP đặc sản ship xa — web giữ combo giao tươi local</li>
  <li><strong>Corporate:</strong> Gói quà doanh nghiệp Tết — landing B2B</li>
  <li><strong>Referral:</strong> Giới thiệu bạn −10% — viral trong cộng đồng phụ huynh</li>
</ul>

<h2 id="quy-trinh">Quy trình thiết kế website nông sản — 7 bước</h2>

<ol>
  <li><strong>Brief sản phẩm:</strong> Loại nông sản, vùng giao, OCOP hay rau tươi.</li>
  <li><strong>Catalog structure:</strong> Category, đơn vị, combo, cutoff rules.</li>
  <li><strong>UI design:</strong> Organic, earthy tone — green, warm, authentic photos.</li>
  <li><strong>Dev shop:</strong> WooCommerce + slot giao + vùng ship.</li>
  <li><strong>Content farm:</strong> Ảnh trang trại, story OCOP, chứng nhận.</li>
  <li><strong>Test order:</strong> End-to-end đặt → giao → COD — SOP kho.</li>
  <li><strong>Launch:</strong> SEO local, Zalo group seed, ads radius 10km (nếu local).</li>
</ol>

<p><strong>Thời gian:</strong> 4–7 tuần (shop + combo); +2 tuần nếu truy xuất QR custom.</p>

<h2 id="bang-gia">Bảng giá thiết kế website nông sản 2026</h2>

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
      <td class="border border-indigo-100 px-3 py-2"><strong>Agri Lite</strong></td>
      <td class="border border-indigo-100 px-3 py-2">7.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Catalog 40 SP, form/COD, story farm, SEO cơ bản</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Agri Fresh</strong></td>
      <td class="border border-indigo-100 px-3 py-2">11.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Combo tuần, slot giao, MoMo, vùng ship, blog</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Agri OCOP</strong></td>
      <td class="border border-indigo-100 px-3 py-2">15.000.000đ</td>
      <td class="border border-indigo-100 px-3 py-2">Multi OCOP, QR truy xuất, B2B form, subscription</td>
    </tr>
    <tr>
      <td class="border border-indigo-100 px-3 py-2"><strong>Bảo trì mùa vụ</strong></td>
      <td class="border border-indigo-100 px-3 py-2">1.500.000đ/tháng</td>
      <td class="border border-indigo-100 px-3 py-2">Cập nhật có/hết hàng, banner mùa vụ</td>
    </tr>
  </tbody>
</table>

<h2 id="sai-lam">Sai lầm khi làm website nông sản</h2>

<ul>
  <li>Ảnh stock không liên quan — mất trust “sạch thật”.</li>
  <li>Không cập nhật hết mùa — khách đặt rau không có, review xấu.</li>
  <li>Giao không đúng slot — rau héo, khiếu nại.</li>
  <li>Giá web khác giá giao — tranh cãi cân điện tử.</li>
  <li>Quảng cáo “organic” không chứng nhận — rủi ro pháp lý.</li>
  <li>Web chậm mobile — khách Zalo/Facebook thoát nhanh.</li>
  <li>Không nói rõ vùng giao — đặt xa không ship, frustration.</li>
</ul>

${wpRelatedLinks([
  {
    href: `${SITE}/blog/thiet-ke-website-thuong-mai-dien-tu`,
    label: "Website TMĐT",
    desc: "Checkout & COD.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-ban-hang-omni`,
    label: "Bán hàng đa kênh",
    desc: "Web + sàn OCOP.",
  },
  {
    href: `${SITE}/blog/thiet-ke-website-catalog-san-pham`,
    label: "Catalog sản phẩm",
    desc: "Showcase không giỏ hàng.",
  },
  {
    href: `${SITE}/website`,
    label: "Tư vấn web nông sản",
    desc: "Bứt Phá Marketing.",
  },
])}

${wpFaq({
  keyword: KEYWORD,
  items: [
    {
      q: "Thiết kế website nông sản giá bao nhiêu?",
      a: "Tại Bứt Phá từ 7.000.000đ (catalog cơ bản) đến 15.000.000đ (OCOP + truy xuất QR). Báo giá theo số sản phẩm và logic giao tươi.",
    },
    {
      q: "Rau tươi có bán online ship xa được không?",
      a: "Rau giao local 1–2 ngày — web nên giới hạn vùng ship rõ. OCOP đặc sản (mật ong, gạo, khô) ship toàn quốc dễ hơn.",
    },
    {
      q: "Combo giao hàng tuần có làm được không?",
      a: "Có — gói Agri Fresh: subscription chọn ngày giao cố định, admin quản lý basket tuần.",
    },
    {
      q: "Truy xuất nguồn gốc QR trên web thế nào?",
      a: "Mỗi lô sản xuất có URL/QR — scan xem ngày thu hoạch, nông trại, chứng nhận. Gói Agri OCOP.",
    },
    {
      q: "HTX nhiều xã nhiều sản phẩm — web quản lý thế nào?",
      a: "CMS filter theo xã/vùng, tag OCOP sao. Admin HTX cập nhật tồn — training 1 buổi.",
    },
    {
      q: "SEO “rau sạch [quận]” mất bao lâu?",
      a: "2–4 tháng local SEO + GBP. Content farm story + blog mùa vụ hỗ trợ.",
    },
    {
      q: "Bao lâu go-live website nông sản?",
      a: "4–7 tuần. Cần sẵn ảnh farm và list sản phẩm + giá + vùng giao.",
    },
    {
      q: "Bứt Phá có thiết kế website nông sản không?",
      a: "Có — trang trại, HTX OCOP, thương hiệu rau sạch. Catalog + đặt hàng + story. Liên hệ Zalo 0937417982 hoặc /lien-he.",
    },
  ],
})}

${wpConclusion({
  keyword: KEYWORD,
  paragraphs: [
    `<strong>Thiết kế website nông sản</strong> hiệu quả = story farm/OCOP chân thật + catalog mùa vụ cập nhật + đặt hàng slot giao rõ + truy xuất trust — kết nối nông dân với bàn ăn đô thị không qua quá nhiều trung gian.`,
    `Liên hệ Bứt Phá Marketing để nhận tư vấn <strong>${KEYWORD}</strong> miễn phí — rau tươi local, OCOP đặc sản và báo giá theo quy mô HTX/trang trại của bạn.`,
  ],
  ctaLabel: "→ Tư vấn website nông sản",
  ctaHref: `${SITE}/website`,
})}

${wpExternalCta()}
`,
  }),
};
