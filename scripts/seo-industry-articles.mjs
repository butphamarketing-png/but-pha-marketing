import {
  wrapArticle,
  img,
  toc,
  internalLinks,
  externalLinks,
  NEWS_THUMBNAIL,
  NEWS_CONTENT_IMAGE_COUNT,
  altFromKeyword,
} from "./seo-article-helpers.mjs";
import { INDUSTRY_ENTRIES } from "./seo-industry-data.mjs";

function faq(items) {
  const blocks = items
    .map(
      (f) =>
        `<div class="mb-4"><h3 class="text-base font-semibold text-indigo-950">${f.q}</h3><p>${f.a}</p></div>`,
    )
    .join("\n");
  return `<section id="faq"><h2>Câu hỏi thường gặp</h2>${blocks}</section>`;
}

function featureList(features) {
  const lis = features.map((f) => `<li>${f}</li>`).join("\n");
  return `<ul class="list-disc space-y-2 pl-5">${lis}</ul>`;
}

function buildIndustryContent(entry, imgOffset) {
  const kw = entry.keywordsSecondary.split(",")[0].trim();
  const niche = entry.niche;
  const industry = entry.industry;
  const alt = altFromKeyword(entry.keywordsMain);

  return `
${toc([
  { id: "tong-quan", label: `Tổng quan ${kw}` },
  { id: "loi-ich", label: "Lợi ích website cho doanh nghiệp" },
  { id: "tinh-nang", label: "Tính năng website cần có" },
  { id: "quy-trinh", label: "Quy trình triển khai" },
  { id: "faq", label: "Câu hỏi thường gặp" },
])}
<p><strong>${entry.title}</strong> là giải pháp giúp doanh nghiệp ngành ${niche} xây dựng thương hiệu số chuyên nghiệp, thu hút khách hàng tiềm năng và tối ưu hiển thị trên Google. Trong thời đại khách hàng tìm kiếm dịch vụ trên mạng trước khi quyết định, một website chuẩn SEO trở thành kênh bán hàng và tư vấn hoạt động 24/7.</p>
<p>Khi triển khai <strong>thiết kế website</strong> cho lĩnh vực ${industry}, doanh nghiệp cần giao diện phù hợp ngành, nội dung trả lời đúng câu hỏi khách hàng và cấu trúc kỹ thuật thân thiện với công cụ tìm kiếm. Đây không chỉ là “có mặt online” mà là đầu tư vào chuyển đổi bền vững.</p>
${img(imgOffset, alt)}
<h2 id="tong-quan">${entry.h1} — Tổng quan và vai trò</h2>
<p>Website ngành ${niche} đóng vai trò trung tâm trong hệ sinh thái marketing. Fanpage thu hút tương tác, Google Maps tăng hiện diện địa phương, nhưng website mới là nơi bạn kiểm soát hoàn toàn nội dung, dữ liệu khách hàng và hành trình chuyển đổi. <strong>Thiết kế website</strong> đúng chuẩn giúp mọi chiến dịch quảng cáo đều có điểm đến thống nhất.</p>
<p>Khách hàng ngành ${industry} thường so sánh 3–5 đơn vị trong vài phút. Website thiếu thông tin, load chậm hoặc không có form liên hệ rõ ràng khiến tỷ lệ rời trang tăng cao. Ngược lại, website chuyên nghiệp với ${kw} tạo ấn tượng tin cậy ngay lần truy cập đầu tiên.</p>
<h3>Vì sao doanh nghiệp ${industry} cần website riêng?</h3>
<p>Thị trường ${niche} cạnh tranh khốc liệt. Website giúp bạn thể hiện năng lực, dịch vụ, bảng giá tham khảo và case study thực tế — những yếu tố khách hàng luôn tìm kiếm trước khi gọi điện hoặc nhắn Zalo.</p>
${img(imgOffset + 1, alt)}
<h2 id="loi-ich">Lợi ích thiết kế website cho ngành ${industry}</h2>
<p><strong>Uy tín thương hiệu:</strong> Giao diện đồng bộ nhận diện, nội dung chuyên nghiệp tạo cảm giác tin cậy. <strong>SEO &amp; Google Maps:</strong> Website chuẩn kỹ thuật kết hợp từ khóa ${entry.keywordsSecondary} giúp xuất hiện khi khách tìm kiếm. <strong>Tăng chuyển đổi:</strong> Form liên hệ, nút gọi, chat Zalo đặt đúng vị trí trên mobile mang về lead chất lượng.</p>
<p>Bên cạnh đó, website hỗ trợ retargeting ads, email marketing và xây dựng nội dung blog theo thời gian — tích lũy traffic organic thay vì phụ thuộc hoàn toàn vào quảng cáo trả phí.</p>
<h2 id="tinh-nang">Tính năng website ${industry} cần có</h2>
<p>Mỗi ngành có yêu cầu riêng. Dưới đây là các module quan trọng khi triển khai <strong>thiết kế website</strong> cho ${niche}:</p>
${featureList(entry.features)}
<p>Các tính năng trên được tùy biến theo quy mô và mục tiêu KPI: tăng lead, đặt lịch, bán hàng online hoặc xây dựng thương hiệu.</p>
${img(imgOffset + 2, alt)}
<h2 id="quy-trinh">Quy trình triển khai website chuẩn SEO</h2>
<p><strong>Giai đoạn 1 — Khảo sát:</strong> Mục tiêu kinh doanh, chân dung khách hàng, đối thủ và từ khóa mục tiêu (${entry.keywordsSecondary}). <strong>Giai đoạn 2 — Thiết kế:</strong> Wireframe, UI theo nhận diện thương hiệu, tối ưu mobile-first. <strong>Giai đoạn 3 — Lập trình:</strong> Tích hợp form, analytics, pixel quảng cáo. <strong>Giai đoạn 4 — SEO on-page:</strong> Meta title, description, heading, schema, tốc độ tải. <strong>Giai đoạn 5 — Bàn giao:</strong> Đào tạo vận hành và bảo trì định kỳ.</p>
<p>Đội triển khai nên bàn giao tài liệu sitemap, hướng dẫn cập nhật nội dung và quy trình backup — giúp doanh nghiệp ${industry} chủ động vận hành lâu dài.</p>
${img(imgOffset + 3, alt)}
<p>Nếu bạn đang cân nhắc <strong>${entry.title.toLowerCase()}</strong>, hãy ưu tiên đối tác có portfolio ngành tương đồng và cam kết minh bạch tiến độ. Đầu tư website đúng từ đầu tiết kiệm chi phí sửa chữa và tối ưu SEO về sau.</p>
${internalLinks()}
${externalLinks()}
${faq(entry.faq)}
`;
}

function buildIndustryArticle(entry, index) {
  const imgOffset = index % NEWS_CONTENT_IMAGE_COUNT;
  const primaryKw = entry.keywordsSecondary.split(",")[0].trim();
  const metaDescription = `${entry.title} — Giải pháp ${primaryKw} chuẩn SEO, tối ưu chuyển đổi và tăng khách hàng. Tư vấn miễn phí tại Bứt Phá Marketing.`;
  const description = `Hướng dẫn ${primaryKw}: lợi ích, tính năng cần có, quy trình triển khai và FAQ dành cho doanh nghiệp ngành ${entry.niche}.`;

  return {
    title: entry.h1,
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: entry.keywordsSecondary,
    metaTitle: entry.title,
    metaDescription,
    description,
    imageUrl: NEWS_THUMBNAIL,
    content: wrapArticle({
      metaTitle: entry.title,
      html: buildIndustryContent(entry, imgOffset),
    }),
  };
}

export const INDUSTRY_ARTICLES = INDUSTRY_ENTRIES.map((entry, index) =>
  buildIndustryArticle(entry, index),
);
