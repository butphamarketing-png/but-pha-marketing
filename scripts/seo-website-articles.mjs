import {
  wrapArticle,
  img,
  toc,
  internalLinks,
  externalLinks,
  NEWS_THUMBNAIL,
  NEWS_CONTENT_IMAGE_COUNT,
  altFromKeyword,
  validateSeoKeywordPlacement,
} from "./seo-article-helpers.mjs";
import { WEBSITE_SEEDS } from "./seo-website-seeds.mjs";
import { INDUSTRY_ENTRIES } from "./seo-industry-data.mjs";
import { KEYWORD_ENTRIES } from "./seo-keyword-data.mjs";
import { LA_GI_ENTRIES } from "./seo-la-gi-data.mjs";
import { LOCAL_SEO_ENTRIES } from "./seo-local-data.mjs";

const BASE_SLUGS = new Set([
  "thiet-ke-website-doanh-nghiep",
  "thiet-ke-website-chuan-seo",
  "thiet-ke-website-ban-hang",
  "thiet-ke-website-theo-yeu-cau",
  "bao-gia-thiet-ke-website",
  "thiet-ke-website-cong-ty",
  "thiet-ke-website-wordpress",
  "thiet-ke-website-responsive",
  "thiet-ke-website-thuong-mai-dien-tu",
  "thiet-ke-website-tron-goi",
  "thiet-ke-website-la-gi",
  "thiet-ke-website-tphcm",
  "thiet-ke-website-tphcm-uy-tin",
  "thiet-ke-website-ha-noi",
  "thiet-ke-website-ha-noi-chuyen-nghiep",
  "thiet-ke-website-da-nang",
  "thiet-ke-website-da-nang-du-lich",
  "thiet-ke-website-dat-phong-khach-san",
  "thiet-ke-website-bat-dong-san-du-an",
  "website-la-gi",
  ...INDUSTRY_ENTRIES.map((e) => e.slug),
  ...KEYWORD_ENTRIES.map((e) => e.slug),
  ...LA_GI_ENTRIES.map((e) => e.slug),
  ...LOCAL_SEO_ENTRIES.map((e) => e.slug),
]);

function faq(items) {
  const blocks = items
    .map(
      (f) =>
        `<div class="mb-4"><h3 class="text-base font-semibold text-indigo-950">${f.q}</h3><p>${f.a}</p></div>`,
    )
    .join("\n");
  return `<section id="faq"><h2>Câu hỏi thường gặp</h2>${blocks}</section>`;
}

function checklist(items) {
  const lis = items.map((item) => `<li>${item}</li>`).join("\n");
  return `<ul class="list-disc space-y-2 pl-5">${lis}</ul>`;
}

function seedToSlug(seed) {
  if (seed.niche === "guide" || seed.niche === "compare") return seed.slug;
  if (seed.niche === "local") return `thiet-ke-website-${seed.slug}`;
  return `thiet-ke-website-${seed.slug}`;
}

function expandSeed(seed) {
  const slug = seedToSlug(seed);
  const kw = seed.keywordsMain;
  const checklistItems = [
    `Xác định mục tiêu ${seed.angle} trước khi wireframe`,
    "UI/UX mobile-first, menu rõ ràng, CTA nổi bật",
    `Tối ưu SEO on-page cho từ khóa "${kw}"`,
    "Tích hợp form liên hệ, Zalo và đo lường GA4",
    "Test tốc độ PageSpeed và Core Web Vitals trước launch",
    "Đào tạo quản trị nội dung và bảo trì định kỳ",
  ];
  return {
    slug,
    h1: seed.h1,
    keywordsMain: kw,
    keywordsSecondary: `${kw}, website chuẩn seo, ${seed.niche}, bứt phá marketing`,
    angle: seed.angle,
    checklist: checklistItems,
    faq: [
      {
        q: `${seed.h1.split("?")[0].slice(0, 50)}… mất bao lâu?`,
        a: "Thường 2–6 tuần tùy số trang, tính năng và vòng duyệt thiết kế.",
      },
      {
        q: `Chi phí ${kw} khoảng bao nhiêu?`,
        a: "Từ vài triệu (landing) đến 15–40 triệu website doanh nghiệp chuẩn SEO; báo giá sau khảo sát.",
      },
      {
        q: "Có hỗ trợ quản trị sau bàn giao không?",
        a: "Có — đào tạo CMS, bảo hành kỹ thuật và gói bảo trì theo năm.",
      },
    ],
  };
}

function buildWebsiteContent(entry, imgOffset) {
  const kw = entry.keywordsMain;
  const alt = altFromKeyword(kw);
  return `
${toc([
  { id: "tong-quan", label: "Tổng quan" },
  { id: "loi-ich", label: "Lợi ích" },
  { id: "tinh-nang", label: "Tính năng cần có" },
  { id: "quy-trinh", label: "Quy trình triển khai" },
  { id: "faq", label: "Câu hỏi thường gặp" },
])}
<p><strong>${kw}</strong> là giải pháp phù hợp khi doanh nghiệp cần ${entry.angle}. Khách hàng ngày nay tra cứu trên Google trước khi liên hệ — website chuyên nghiệp giúp bạn tạo ấn tượng tin cậy và chuyển đổi lead ngay từ lần truy cập đầu.</p>
<p>Triển khai <strong>${kw}</strong> đúng hướng không chỉ là giao diện đẹp: cần cấu trúc SEO, tốc độ tải, CTA rõ ràng và nội dung trả lời đúng câu hỏi khách hàng.</p>
${img(imgOffset, alt)}
<h2 id="tong-quan">${entry.h1.replace(/\?.*$/, "").trim()} — Tổng quan</h2>
<p><strong>${kw}</strong> tập trung vào ${entry.angle}. Khác với template rẻ tái sử dụng, giải pháp custom giúp bạn kiểm soát thương hiệu, tích hợp CRM và scale marketing lâu dài.</p>
<p>Mục tiêu là biến website thành kênh bán hàng và tư vấn 24/7 — đo được lượt form, cuộc gọi và nguồn traffic từ SEO, ads.</p>
<h2 id="loi-ich">Lợi ích khi đầu tư ${kw}</h2>
<p>Uy tín thương hiệu, SEO bền vững, tích hợp marketing (Zalo, email, ads) và sở hữu dữ liệu khách hàng — không phụ thuộc hoàn toàn vào sàn TMĐT hay Fanpage.</p>
<p>Với ${entry.angle}, website giúp đội sales nhận lead có context, giảm thời gian giải thích và tăng tỷ lệ chốt.</p>
${img(imgOffset + 1, alt)}
<h2 id="tinh-nang">Tính năng website cần có</h2>
<p>Khi triển khai <strong>${kw}</strong>, nên cân nhắc các module sau:</p>
${checklist(entry.checklist)}
<h2 id="quy-trinh">Quy trình triển khai ${kw}</h2>
<p><strong>Bước 1 — Khảo sát:</strong> Mục tiêu, đối tượng, từ khóa và đối thủ. <strong>Bước 2 — Wireframe/UI:</strong> Thiết kế theo nhận diện thương hiệu. <strong>Bước 3 — Lập trình:</strong> Responsive, form, analytics. <strong>Bước 4 — SEO on-page:</strong> Meta, heading, schema, tốc độ. <strong>Bước 5 — Bàn giao:</strong> Đào tạo và bảo hành.</p>
<p>Đội Bứt Phá Marketing đồng hành từ brief đến go-live — đảm bảo <strong>${kw}</strong> đạt chuẩn kỹ thuật và sẵn sàng chạy quảng cáo.</p>
${img(imgOffset + 2, alt)}
<p>Nếu bạn đang tìm đối tác <strong>${kw}</strong>, liên hệ Bứt Phá Marketing để nhận tư vấn và báo giá minh bạch.</p>
${internalLinks()}
${externalLinks()}
${faq(entry.faq)}
`;
}

function buildWebsiteArticle(entry, index) {
  const imgOffset = (index + 17) % NEWS_CONTENT_IMAGE_COUNT;
  const metaDescription = `${entry.keywordsMain.charAt(0).toUpperCase() + entry.keywordsMain.slice(1)} — ${entry.angle}. Tư vấn và báo giá tại Bứt Phá Marketing.`;
  const description = `${entry.keywordsMain}: ${entry.angle}. Checklist triển khai và FAQ.`;

  return {
    title: entry.h1,
    slug: entry.slug,
    keywordsMain: entry.keywordsMain,
    keywordsSecondary: entry.keywordsSecondary,
    metaTitle: `${entry.h1.replace(/\?.*$/, "").trim()} | Bứt Phá Marketing`,
    metaDescription,
    description,
    imageUrl: NEWS_THUMBNAIL,
    content: wrapArticle({
      metaTitle: `${entry.h1.replace(/\?.*$/, "").trim()} | Bứt Phá Marketing`,
      html: buildWebsiteContent(entry, imgOffset),
    }),
  };
}

function assertWebsiteArticle(article) {
  const alt = altFromKeyword(article.keywordsMain);
  const check = validateSeoKeywordPlacement({
    keywordsMain: article.keywordsMain,
    title: article.title,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    description: article.description,
    imageAlts: [alt, alt, alt],
  });
  if (!check.ok) {
    console.warn(`[SEO website] ${article.slug}: thiếu từ khóa "${article.keywordsMain}" ở ${check.missing.join(", ")}`);
  }
}

const expanded = WEBSITE_SEEDS.map(expandSeed).filter((e) => !BASE_SLUGS.has(e.slug));

export const WEBSITE_SKIPPED_SLUGS = WEBSITE_SEEDS.map(expandSeed)
  .filter((e) => BASE_SLUGS.has(e.slug))
  .map((e) => e.slug);

export const WEBSITE_ARTICLES = expanded.map((entry, index) => {
  const article = buildWebsiteArticle(entry, index);
  assertWebsiteArticle(article);
  return article;
});

if (WEBSITE_ARTICLES.length < 100) {
  console.warn(`[SEO website] Chỉ tạo được ${WEBSITE_ARTICLES.length}/100 bài (bỏ qua ${WEBSITE_SKIPPED_SLUGS.length} slug trùng).`);
}
