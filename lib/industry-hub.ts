import type { ServerBlogItem } from "@/lib/server-blog";

export const INDUSTRY_HUB_SLUGS = [
  "nha-khoa",
  "xay-dung",
  "tham-my",
  "spa",
  "pccc",
  "my-pham",
  "luat",
  "logistics",
  "co-khi",
  "bao-bi",
  "thang-may",
  "tu-dong-hoa",
  "phong-kham",
  "bat-dong-san",
  "khach-san",
  "o-to",
  "in-an",
  "nha-hang",
  "noi-that",
  "mam-non",
  "anh-ngu",
  "thiet-bi-ve-sinh",
] as const;
export type IndustryHubSlug = (typeof INDUSTRY_HUB_SLUGS)[number];

export type IndustryHubConfig = {
  slug: IndustryHubSlug;
  title: string;
  headline: string;
  description: string;
  keywordsMain: string;
  caseStudySlug?: string;
  blogSlugs: string[];
  serviceHref: string;
  serviceLabel: string;
  /** ISO date — dùng cho sitemap lastModified hub ngành */
  proofReviewedAt?: string;
};

export const INDUSTRY_HUBS: Record<IndustryHubSlug, IndustryHubConfig> = {
  "nha-khoa": {
    slug: "nha-khoa",
    title: "Thiết kế website nha khoa",
    headline: "Website & SEO ngành nha khoa",
    description:
      "Silo kiến thức thiết kế website nha khoa: implant, niềng răng, đặt lịch, SEO local và case study Nha Khoa Đăng Khoa có số liệu GSC.",
    keywordsMain: "thiết kế website nha khoa",
    caseStudySlug: "nha-khoa-dang-khoa",
    proofReviewedAt: "2026-07-08T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-nha-khoa",
      "checklist-website-nha-khoa-2026",
      "template-website-nha-khoa-2026",
      "thiet-ke-website-nha-khoa-nieng-rang",
      "thiet-ke-website-phong-kham-da-khoa",
      "case-study-thiet-ke-website-nha-khoa-dang-khoa",
      "thiet-ke-website",
    ],
    serviceHref: "/website",
    serviceLabel: "Đăng ký làm website nha khoa",
  },
  "xay-dung": {
    slug: "xay-dung",
    title: "Thiết kế website xây dựng",
    headline: "Website & SEO ngành xây dựng",
    description:
      "Silo thiết kế website công ty xây dựng, nhà thầu, kiến trúc — case study Kiến Trúc Sao Khuê và cluster SEO đa tỉnh.",
    keywordsMain: "thiết kế website xây dựng",
    caseStudySlug: "kien-truc-sao-khue",
    proofReviewedAt: "2026-07-08T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-xay-dung-nha-thau",
      "checklist-website-xay-dung-2026",
      "template-website-xay-dung-2026",
      "thiet-ke-website-cong-ty-xay-dung",
      "thiet-ke-website-kien-truc-noi-that",
      "thiet-ke-website-ho-so-nang-luc",
      "case-study-thiet-ke-website-xay-dung-sao-khue",
      "thiet-ke-website",
    ],
    serviceHref: "/website",
    serviceLabel: "Đăng ký làm website xây dựng",
  },
  "tham-my": {
    slug: "tham-my",
    title: "Thiết kế website thẩm mỹ viện",
    headline: "Website & SEO ngành thẩm mỹ",
    description:
      "Silo thiết kế website thẩm mỹ viện, aesthetic clinic — case study Thiên Hoàng Kim, đặt lịch, SEO local TP.HCM.",
    keywordsMain: "thiết kế website thẩm mỹ viện",
    caseStudySlug: "tham-my-thien-hoang-kim",
    proofReviewedAt: "2026-07-08T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-tham-my-vien",
      "checklist-website-tham-my-vien-2026",
      "template-website-tham-my-vien-2026",
      "case-study-thiet-ke-website-tham-my-thien-hoang-kim",
      "thiet-ke-website-spa",
      "thiet-ke-website-phong-kham-da-khoa",
      "thiet-ke-website",
    ],
    serviceHref: "/website",
    serviceLabel: "Đăng ký làm website thẩm mỹ viện",
  },
  spa: {
    slug: "spa",
    title: "Thiết kế website spa",
    headline: "Website & SEO ngành spa & làm đẹp",
    description:
      "Silo website spa, phun xăm, nail — case study Phước Lai Luxury & Halee Trâm, booking và SEO local.",
    keywordsMain: "thiết kế website spa",
    caseStudySlug: "phuoc-lai-luxury",
    proofReviewedAt: "2026-07-08T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-spa",
      "checklist-website-spa-2026",
      "template-website-spa-2026",
      "case-study-thiet-ke-website-spa-phuoc-lai-luxury",
      "case-study-thiet-ke-website-halee-tram",
      "thiet-ke-website-my-pham-lam-dep",
      "thiet-ke-website-tham-my-vien",
      "thiet-ke-website",
    ],
    serviceHref: "/website",
    serviceLabel: "Đăng ký làm website spa",
  },
  pccc: {
    slug: "pccc",
    title: "Thiết kế website công ty PCCC",
    headline: "Website & SEO ngành PCCC",
    description:
      "Silo thiết kế website công ty PCCC, thiết bị phòng cháy — dự án, giấy phép năng lực, form khảo sát hiện trường và case study B2B Bảo An Fire.",
    keywordsMain: "thiết kế website công ty pccc",
    caseStudySlug: "pccc-bao-an-fire",
    proofReviewedAt: "2026-07-08T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-pccc",
      "checklist-website-pccc-2026",
      "template-website-pccc-2026",
      "thiet-ke-website-thiet-bi-pccc",
      "case-study-thiet-ke-website-pccc-bao-an",
      "thiet-ke-website",
    ],
    serviceHref: "/website",
    serviceLabel: "Đăng ký làm website PCCC",
  },
  "my-pham": {
    slug: "my-pham",
    title: "Thiết kế website mỹ phẩm",
    headline: "Website & SEO ngành mỹ phẩm & làm đẹp",
    description:
      "Silo website mỹ phẩm, skincare, nail & lash — case study Halee Trâm, shop online và SEO brand.",
    keywordsMain: "thiết kế website mỹ phẩm",
    caseStudySlug: "glow-dew-cosmetics",
    proofReviewedAt: "2026-07-11T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-my-pham-lam-dep",
      "checklist-website-my-pham-2026",
      "template-website-my-pham-2026",
      "thiet-ke-website-my-pham",
      "case-study-thiet-ke-website-glow-dew-cosmetics",
      "case-study-thiet-ke-website-halee-tram",
      "thiet-ke-website-spa",
      "thiet-ke-website",
    ],
    serviceHref: "/website",
    serviceLabel: "Đăng ký làm website mỹ phẩm",
  },
  luat: {
    slug: "luat",
    title: "Thiết kế website công ty luật",
    headline: "Website & SEO ngành luật",
    description:
      "Silo thiết kế website văn phòng luật, công ty luật — uy tín luật sư, lĩnh vực hành nghề, SEO local.",
    keywordsMain: "thiết kế website công ty luật",
    blogSlugs: [
      "thiet-ke-website-cong-ty-luat",
      "checklist-website-luat-2026",
      "template-website-luat-2026",
      "thiet-ke-website-phap-luat-luat-su",
      "thiet-ke-website",
    ],
    serviceHref: "/website",
    serviceLabel: "Đăng ký làm website luật",
  },
  logistics: {
    slug: "logistics",
    title: "Thiết kế website logistics",
    headline: "Website & SEO ngành logistics & vận tải",
    description:
      "Silo website công ty logistics, vận tải, kho bãi — tra cứu vận đơn, báo giá cước, SEO B2B và case study Kiến Trúc Sao Khuê (83K view Fanpage).",
    keywordsMain: "thiết kế website logistics",
    caseStudySlug: "van-toc-express-logistics",
    proofReviewedAt: "2026-07-11T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-logistics-van-tai",
      "checklist-website-logistics-2026",
      "template-website-logistics-2026",
      "case-study-thiet-ke-website-van-toc-express-logistics",
      "thiet-ke-website",
      "thiet-ke-website-thuong-mai-dien-tu",
    ],
    serviceHref: "/website/nganh/logistics",
    serviceLabel: "Đăng ký làm website logistics",
  },
  "co-khi": {
    slug: "co-khi",
    title: "Thiết kế website cơ khí",
    headline: "Website & SEO ngành cơ khí & gia công",
    description:
      "Silo website xưởng cơ khí, gia công CNC — catalog máy móc, năng lực sản xuất, SEO B2B.",
    keywordsMain: "thiết kế website cơ khí",
    blogSlugs: [
      "thiet-ke-website-co-khi",
      "checklist-website-co-khi-2026",
      "template-website-co-khi-2026",
      "thiet-ke-website-gia-cong-cnc",
      "thiet-ke-website",
    ],
    serviceHref: "/website",
    serviceLabel: "Đăng ký làm website cơ khí",
  },
  "bao-bi": {
    slug: "bao-bi",
    title: "Thiết kế website in ấn bao bì",
    headline: "Website & SEO ngành in ấn bao bì",
    description:
      "Silo website xưởng in, bao bì — catalog mẫu, đặt hàng online, báo giá MOQ và SEO B2B.",
    keywordsMain: "thiết kế website in ấn bao bì",
    blogSlugs: [
      "thiet-ke-website-in-an-bao-bi",
      "checklist-website-bao-bi-2026",
      "thiet-ke-website-catalog-san-pham",
      "thiet-ke-website",
    ],
    serviceHref: "/website",
    serviceLabel: "Đăng ký làm website in ấn bao bì",
  },
  "thang-may": {
    slug: "thang-may",
    title: "Thiết kế website thang máy",
    headline: "Website & SEO ngành thang máy",
    description:
      "Silo website công ty thang máy — catalog dòng thang, dự án lắp đặt, bảo trì và SEO B2B.",
    keywordsMain: "thiết kế website công ty thang máy",
    blogSlugs: [
      "thiet-ke-website-thang-may",
      "checklist-website-thang-may-2026",
      "thiet-ke-website-xay-dung-nha-thau",
      "thiet-ke-website-pccc",
      "thiet-ke-website",
    ],
    serviceHref: "/website",
    serviceLabel: "Đăng ký làm website thang máy",
  },
  "tu-dong-hoa": {
    slug: "tu-dong-hoa",
    title: "Thiết kế website tự động hóa",
    headline: "Website & SEO ngành tự động hóa",
    description:
      "Silo website công ty tự động hóa, PLC, SCADA — giải pháp nhà máy, dự án triển khai và SEO B2B.",
    keywordsMain: "thiết kế website công ty tự động hóa",
    blogSlugs: [
      "thiet-ke-website-tu-dong-hoa",
      "checklist-website-tu-dong-hoa-2026",
      "thiet-ke-website-co-khi",
      "thiet-ke-website-gia-cong-cnc",
      "thiet-ke-website",
    ],
    serviceHref: "/website",
    serviceLabel: "Đăng ký làm website tự động hóa",
  },
  "phong-kham": {
    slug: "phong-kham",
    title: "Thiết kế website phòng khám",
    headline: "Website & SEO ngành y tế & phòng khám",
    description:
      "Silo website phòng khám đa khoa — đặt lịch, hồ sơ bác sĩ, SEO local và case study Nha Khoa Đăng Khoa.",
    keywordsMain: "thiết kế website phòng khám đa khoa",
    caseStudySlug: "nha-khoa-dang-khoa",
    proofReviewedAt: "2026-07-08T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-phong-kham-da-khoa",
      "checklist-website-phong-kham-2026",
      "template-website-phong-kham-2026",
      "thiet-ke-website-nha-khoa",
      "checklist-website-nha-khoa-2026",
      "case-study-thiet-ke-website-nha-khoa-dang-khoa",
      "thiet-ke-website",
    ],
    serviceHref: "/website",
    serviceLabel: "Đăng ký làm website phòng khám",
  },
  "bat-dong-san": {
    slug: "bat-dong-san",
    title: "Thiết kế website bất động sản",
    headline: "Website & SEO ngành bất động sản",
    description:
      "Silo website BĐS: dự án, filter căn hộ, lead CRM — case study Kiến Trúc Sao Khuê (xây dựng & cải tạo nhà đa tỉnh).",
    keywordsMain: "thiết kế website bất động sản",
    caseStudySlug: "kien-truc-sao-khue",
    proofReviewedAt: "2026-07-11T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-bat-dong-san",
      "thiet-ke-website-bat-dong-san-du-an",
      "thiet-ke-website",
      "thiet-ke-website-xay-dung-nha-thau",
    ],
    serviceHref: "/website/nganh/bat-dong-san",
    serviceLabel: "Đăng ký làm website bất động sản",
  },
  "khach-san": {
    slug: "khach-san",
    title: "Thiết kế website khách sạn",
    headline: "Website & SEO ngành khách sạn",
    description:
      "Silo website khách sạn: catalog phòng, đặt phòng, gallery tiện ích — SEO hospitality và đa ngôn ngữ EN/VI.",
    keywordsMain: "thiết kế website khách sạn",
    proofReviewedAt: "2026-07-11T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-khach-san",
      "thiet-ke-website-dat-phong-khach-san",
      "bao-gia-thiet-ke-website-khach-san",
      "thiet-ke-website",
    ],
    serviceHref: "/website/nganh/khach-san",
    serviceLabel: "Đăng ký làm website khách sạn",
  },
  "o-to": {
    slug: "o-to",
    title: "Thiết kế website đại lý ô tô",
    headline: "Website & SEO ngành ô tô & showroom xe",
    description:
      "Silo website đại lý ô tô: catalog xe, filter hãng/giá, form lái thử và SEO local showroom.",
    keywordsMain: "thiết kế website đại lý ô tô",
    proofReviewedAt: "2026-07-11T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-gara-o-to",
      "thiet-ke-website",
      "thiet-ke-website-catalog-san-pham",
    ],
    serviceHref: "/website/nganh/o-to",
    serviceLabel: "Đăng ký làm website đại lý ô tô",
  },
  "in-an": {
    slug: "in-an",
    title: "Thiết kế website công ty in ấn",
    headline: "Website & SEO ngành in ấn quảng cáo",
    description:
      "Silo website in ấn: catalog dịch vụ offset/digital, upload file, báo giá nhanh và SEO B2B.",
    keywordsMain: "thiết kế website in ấn",
    proofReviewedAt: "2026-07-11T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-in-an-quang-cao",
      "thiet-ke-website-in-an-bao-bi",
      "thiet-ke-website-catalog-san-pham",
      "thiet-ke-website",
    ],
    serviceHref: "/website/nganh/in-an",
    serviceLabel: "Đăng ký làm website in ấn",
  },
  "nha-hang": {
    slug: "nha-hang",
    title: "Thiết kế website nhà hàng",
    headline: "Website & SEO ngành nhà hàng & F&B",
    description:
      "Silo website nhà hàng, quán ăn, resort — menu online, đặt bàn, gallery món và SEO local F&B theo quận.",
    keywordsMain: "thiết kế website nhà hàng",
    proofReviewedAt: "2026-07-11T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-nha-hang",
      "thiet-ke-website-nha-hang-menu",
      "thiet-ke-website-resort",
      "thiet-ke-website-khach-san",
      "thiet-ke-website",
    ],
    serviceHref: "/website/nganh/nha-hang",
    serviceLabel: "Đăng ký làm website nhà hàng",
  },
  "noi-that": {
    slug: "noi-that",
    title: "Thiết kế website nội thất",
    headline: "Website & SEO ngành nội thất & thiết kế",
    description:
      "Silo website studio nội thất: portfolio dự án, dịch vụ thiết kế thi công, gallery before/after và SEO phong cách.",
    keywordsMain: "thiết kế website nội thất",
    proofReviewedAt: "2026-07-11T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-noi-that",
      "thiet-ke-website-noi-that-showroom",
      "thiet-ke-website-noi-that-van-phong",
      "thiet-ke-website-kien-truc-noi-that",
      "thiet-ke-website",
    ],
    serviceHref: "/website/nganh/noi-that",
    serviceLabel: "Đăng ký làm website nội thất",
  },
  "mam-non": {
    slug: "mam-non",
    title: "Thiết kế website trường mầm non",
    headline: "Website & SEO ngành giáo dục mầm non",
    description:
      "Silo website trường mầm non: chương trình theo độ tuổi, gallery cơ sở an toàn, form tham quan nhập học và SEO tuyển sinh.",
    keywordsMain: "thiết kế website trường mầm non",
    proofReviewedAt: "2026-07-11T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-truong-mam-non",
      "thiet-ke-website-tre-em-mam-non",
      "thiet-ke-website-trung-tam-anh-ngu",
      "thiet-ke-website",
    ],
    serviceHref: "/website/nganh/mam-non",
    serviceLabel: "Đăng ký làm website mầm non",
  },
  "anh-ngu": {
    slug: "anh-ngu",
    title: "Thiết kế website trung tâm anh ngữ",
    headline: "Website & SEO ngành trung tâm ngoại ngữ",
    description:
      "Silo website trung tâm anh ngữ: khóa học theo trình độ, lịch khai giảng, form placement test và SEO tuyển sinh.",
    keywordsMain: "thiết kế website trung tâm anh ngữ",
    proofReviewedAt: "2026-07-11T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-trung-tam-anh-ngu",
      "thiet-ke-website-truong-mam-non",
      "thiet-ke-website",
    ],
    serviceHref: "/website/nganh/anh-ngu",
    serviceLabel: "Đăng ký làm website anh ngữ",
  },
  "thiet-bi-ve-sinh": {
    slug: "thiet-bi-ve-sinh",
    title: "Thiết kế website thiết bị vệ sinh",
    headline: "Website & SEO ngành thiết bị vệ sinh",
    description:
      "Silo website showroom thiết bị vệ sinh: catalog theo thương hiệu, gallery lắp đặt, báo giá công trình và SEO B2B.",
    keywordsMain: "thiết kế website thiết bị vệ sinh",
    proofReviewedAt: "2026-07-11T00:00:00.000Z",
    blogSlugs: [
      "thiet-ke-website-thiet-bi-ve-sinh",
      "thiet-ke-website-catalog-san-pham",
      "thiet-ke-website",
    ],
    serviceHref: "/website/nganh/thiet-bi-ve-sinh",
    serviceLabel: "Đăng ký làm website thiết bị vệ sinh",
  },
};

export function isIndustryHubSlug(value: string): value is IndustryHubSlug {
  return (INDUSTRY_HUB_SLUGS as readonly string[]).includes(value);
}

export function getIndustryHub(slug: IndustryHubSlug) {
  return INDUSTRY_HUBS[slug];
}

export function filterBlogsByIndustryHub(blogs: ServerBlogItem[], slug: IndustryHubSlug) {
  const hub = getIndustryHub(slug);
  const slugSet = new Set(hub.blogSlugs);
  const matched = blogs.filter((b) => b.slug != null && slugSet.has(b.slug));
  return hub.blogSlugs
    .map((s) => matched.find((b) => b.slug === s))
    .filter((b): b is ServerBlogItem => Boolean(b));
}

export function toIndustryBlogListItems(blogs: ServerBlogItem[]) {
  return blogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    description: blog.description,
    metaDescription: blog.metaDescription,
    keywordsMain: blog.keywordsMain,
    keywordsSecondary: blog.keywordsSecondary,
    imageUrl: blog.imageUrl,
    slug: blog.slug,
    hot: blog.hot,
    publishedAt: blog.publishedAt,
    timestamp: blog.timestamp,
  }));
}
