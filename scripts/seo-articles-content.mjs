import { wrapArticle, img, toc, internalLinks, externalLinks, NEWS_THUMBNAIL } from "./seo-article-helpers.mjs";
import { PILLAR_THIET_KE_WEBSITE } from "./seo-pillar-thiet-ke-website.mjs";
import { REWRITE_THIET_KE_WEBSITE_DOANH_NGHIEP } from "./seo-rewrite-thiet-ke-website-doanh-nghiep.mjs";
import { REWRITE_THIET_KE_WEBSITE_CHUAN_SEO } from "./seo-rewrite-thiet-ke-website-chuan-seo.mjs";
import { REWRITE_THIET_KE_WEBSITE_BAN_HANG } from "./seo-rewrite-thiet-ke-website-ban-hang.mjs";
import { REWRITE_THIET_KE_WEBSITE_THEO_YEU_CAU } from "./seo-rewrite-thiet-ke-website-theo-yeu-cau.mjs";
import { REWRITE_BAO_GIA_THIET_KE_WEBSITE } from "./seo-rewrite-bao-gia-thiet-ke-website.mjs";
import { REWRITE_THIET_KE_WEBSITE_CONG_TY } from "./seo-rewrite-thiet-ke-website-cong-ty.mjs";
import { REWRITE_THIET_KE_WEBSITE_TRON_GOI } from "./seo-rewrite-thiet-ke-website-tron-goi.mjs";
import { REWRITE_THIET_KE_WEBSITE_WORDPRESS } from "./seo-rewrite-thiet-ke-website-wordpress.mjs";
import { INDUSTRY_ARTICLES } from "./seo-industry-articles.mjs";
import { KEYWORD_ARTICLES } from "./seo-keyword-articles.mjs";
import { LA_GI_ARTICLES } from "./seo-la-gi-articles.mjs";
import { LOCAL_SEO_ARTICLES } from "./seo-local-articles.mjs";
import { WEBSITE_ARTICLES } from "./seo-website-articles.mjs";
import { MARKETING_ARTICLES } from "./seo-marketing-articles.mjs";

function faq(items) {
  const blocks = items
    .map(
      (f) =>
        `<div class="mb-4"><h3 class="text-base font-semibold text-indigo-950">${f.q}</h3><p>${f.a}</p></div>`,
    )
    .join("\n");
  return `<section id="faq"><h2>Câu hỏi thường gặp</h2>${blocks}</section>`;
}

export const SEO_ARTICLES = [
  PILLAR_THIET_KE_WEBSITE,
  REWRITE_THIET_KE_WEBSITE_DOANH_NGHIEP,
  REWRITE_THIET_KE_WEBSITE_CHUAN_SEO,
  REWRITE_THIET_KE_WEBSITE_BAN_HANG,
  REWRITE_THIET_KE_WEBSITE_THEO_YEU_CAU,
  REWRITE_BAO_GIA_THIET_KE_WEBSITE,
  REWRITE_THIET_KE_WEBSITE_CONG_TY,
  REWRITE_THIET_KE_WEBSITE_WORDPRESS,
  {
    title: "Thiết Kế Website Responsive Cho Mọi Thiết Bị",
    slug: "thiet-ke-website-responsive",
    keywordsMain: "thiết kế website responsive",
    keywordsSecondary: "web responsive, mobile friendly",
    metaTitle: "Thiết Kế Website Responsive Tối Ưu Trải Nghiệm",
    metaDescription: "Thiết kế website responsive giúp giao diện hiển thị tốt trên điện thoại, máy tính bảng và máy tính.",
    description: "Hướng dẫn thiết kế website responsive tối ưu trải nghiệm đa thiết bị.",
    imageUrl: NEWS_THUMBNAIL,
    content: wrapArticle({
      metaTitle: "Thiết Kế Website Responsive Tối Ưu Trải Nghiệm",
      html: `
${toc([
  { id: "responsive", label: "Responsive là gì?" },
  { id: "mobile", label: "Mobile-first" },
  { id: "kiem-tra", label: "Kiểm tra chất lượng" },
  { id: "faq", label: "Câu hỏi thường gặp" },
])}
<p><strong>Thiết kế website responsive</strong> đảm bảo giao diện tự co giãn phù hợp màn hình điện thoại, tablet và desktop. Tại Việt Nam, hơn 70% traffic website đến từ mobile — bỏ qua responsive đồng nghĩa mất phần lớn khách hàng tiềm năng.</p>
<p>Google áp dụng mobile-first indexing: phiên bản mobile quyết định xếp hạng. <strong>Thiết kế website responsive</strong> không còn là “tùy chọn” mà là tiêu chuẩn bắt buộc.</p>
${img(4, "Thiết Kế Website Responsive Cho Mọi Thiết Bị")}
<h2 id="responsive">Nguyên tắc thiết kế website responsive</h2>
<p>Fluid grid, breakpoint hợp lý (320, 768, 1024, 1280px), ảnh srcset, typography scale. Menu hamburger trên mobile, CTA thumb-friendly. Tránh pop-up che nội dung trên màn nhỏ.</p>
<h3>Ảnh hưởng đến chuyển đổi</h3>
<p>Form một cột, nút đủ lớn, số điện thoại click-to-call. Checkout mobile tối giản. <strong>Thiết kế website responsive</strong> tốt giảm bounce rate rõ rệt.</p>
${img(0, "Thiết Kế Website Responsive Cho Mọi Thiết Bị")}
<h2 id="mobile">Chiến lược mobile-first</h2>
<p>Thiết kế mobile trước, mở rộng lên desktop. Ưu tiên nội dung quan trọng above the fold. Lazy-load ảnh dưới fold. Test trên thiết bị thật, không chỉ Chrome DevTools.</p>
<h2 id="kiem-tra">Công cụ kiểm tra responsive</h2>
<p>Google Mobile-Friendly Test, PageSpeed Insights, Search Console. Kiểm tra ngang/dọc, font size tối thiểu 16px, khoảng cách tap target 48px.</p>
${img(1, "Thiết Kế Website Responsive Cho Mọi Thiết Bị")}
${internalLinks()}
${externalLinks()}
${faq([
  { q: "Responsive khác adaptive?", a: "Responsive một codebase linh hoạt; adaptive có bản layout riêng từng thiết bị." },
  { q: "Có cần app riêng?", a: "Chỉ khi cần push notification native hoặc tính năng offline phức tạp." },
  { q: "AMP còn cần thiết?", a: "Ít phổ biến; ưu tiên Core Web Vitals và responsive chuẩn." },
])}
`,
    }),
  },
  {
    title: "Thiết Kế Website Thương Mại Điện Tử Chuyên Nghiệp",
    slug: "thiet-ke-website-thuong-mai-dien-tu",
    keywordsMain: "thiết kế website thương mại điện tử",
    keywordsSecondary: "website tmđt, ecommerce việt nam",
    metaTitle: "Thiết Kế Website Thương Mại Điện Tử Hiệu Quả",
    metaDescription: "Giải pháp thiết kế website thương mại điện tử giúp doanh nghiệp mở rộng hoạt động bán hàng trực tuyến.",
    description: "Chiến lược thiết kế website thương mại điện tử bền vững cho thị trường Việt.",
    imageUrl: NEWS_THUMBNAIL,
    content: wrapArticle({
      metaTitle: "Thiết Kế Website Thương Mại Điện Tử Hiệu Quả",
      html: `
${toc([
  { id: "tmdt", label: "TMĐT và xu hướng" },
  { id: "tinh-nang", label: "Tính năng cốt lõi" },
  { id: "marketing", label: "Marketing & vận hành" },
  { id: "faq", label: "Câu hỏi thường gặp" },
])}
<p><strong>Thiết kế website thương mại điện tử</strong> mở ra kênh bán hàng 24/7, mở rộng ra toàn quốc mà không cần thêm chi nhánh vật lý. Khác sàn marketplace, website TMĐT riêng giúp chủ shop kiểm soát margin, dữ liệu khách và chương trình loyalty.</p>
<p>Thành công của <strong>thiết kế website thương mại điện tử</strong> phụ thuộc logistics, thanh toán, CSKH và marketing đồng bộ — không chỉ giao diện đẹp.</p>
${img(0, "Thiết Kế Website Thương Mại Điện Tử Chuyên Nghiệp")}
<h2 id="tmdt">Bối cảnh TMĐT Việt Nam</h2>
<p>Người mua quen COD, freeship, đổi trả dễ dàng. Livestream bán hàng kéo traffic nhưng website vẫn là nơi lưu catalog bền vững, SEO sản phẩm dài hạn.</p>
<h3>Mô hình phù hợp website TMĐT</h3>
<p>Thương hiệu D2C, phân phối độc quyền, B2B đặt hàng sỉ online. <strong>Thiết kế website thương mại điện tử</strong> tùy biến theo ngành: thời trang, mỹ phẩm, điện máy, FMCG.</p>
${img(2, "Thiết Kế Website Thương Mại Điện Tử Chuyên Nghiệp")}
<h2 id="tinh-nang">Tính năng bắt buộc</h2>
<p>Quản lý SKU, biến thể, tồn kho, mã giảm giá, upsell/cross-sell. Tích hợp vận chuyển, hóa đơn điện tử. Báo cáo GA4 + pixel Meta/TikTok. Bảo mật PCI-DSS khi lưu thẻ (qua cổng trung gian).</p>
<h2 id="marketing">Marketing cho website TMĐT</h2>
<p>SEO danh mục, Google Shopping, email automation, remarketing. Nội dung review, UGC, video sản phẩm. <strong>Thiết kế website thương mại điện tử</strong> kết hợp CRM giữ khách quay lại.</p>
${img(1, "Thiết Kế Website Thương Mại Điện Tử Chuyên Nghiệp")}
${internalLinks()}
${externalLinks()}
${faq([
  { q: "Website TMĐT hay sàn tốt hơn?", a: "Kết hợp: sàn lấy volume, website xây thương hiệu và biên lợi nhuận." },
  { q: "Bao lâu hoàn vốn?", a: "6–18 tháng tùy ngành, AOV và chi phí traffic." },
  { q: "Cần bao nhiêu sản phẩm ban đầu?", a: "Tối thiểu 20–50 SKU chất lượng để test conversion." },
])}
`,
    }),
  },
  REWRITE_THIET_KE_WEBSITE_TRON_GOI,
  ...INDUSTRY_ARTICLES,
  ...KEYWORD_ARTICLES,
  ...LA_GI_ARTICLES,
  ...LOCAL_SEO_ARTICLES,
  ...WEBSITE_ARTICLES,
  ...MARKETING_ARTICLES,
];
