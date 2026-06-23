export type PillarTopic = "website" | "facebook" | "google-maps" | "marketing";

export type SeoPillar = {
  slug: string;
  keyword: string;
  label: string;
  topic: PillarTopic;
  serviceHref: string;
  serviceLabel: string;
};

/** Pillar chính cho từ khóa ngắn — mỗi chủ đề một URL cố định. */
export const SEO_PILLARS: SeoPillar[] = [
  {
    slug: "thiet-ke-website",
    keyword: "thiết kế website",
    label: "Thiết kế website — hướng dẫn A-Z",
    topic: "website",
    serviceHref: "/website",
    serviceLabel: "Dịch vụ thiết kế website",
  },
  {
    slug: "bao-gia-thiet-ke-website",
    keyword: "báo giá website",
    label: "Báo giá thiết kế website 2026",
    topic: "website",
    serviceHref: "/website",
    serviceLabel: "Nhận báo giá website",
  },
  {
    slug: "seo-la-gi",
    keyword: "SEO",
    label: "SEO — tối ưu lên top Google",
    topic: "website",
    serviceHref: "/website/thietkewebsite",
    serviceLabel: "Dịch vụ SEO website",
  },
  {
    slug: "quang-cao-facebook",
    keyword: "quảng cáo Facebook",
    label: "Quảng cáo Facebook — hướng dẫn chạy ads",
    topic: "facebook",
    serviceHref: "/facebook/quang-cao-fanpage",
    serviceLabel: "Dịch vụ quảng cáo Facebook",
  },
  {
    slug: "thiet-ke-fanpage-facebook",
    keyword: "thiết kế fanpage",
    label: "Thiết kế fanpage Facebook chuyên nghiệp",
    topic: "facebook",
    serviceHref: "/facebook/thiet-ke-fanpage",
    serviceLabel: "Thiết kế fanpage",
  },
  {
    slug: "cham-soc-fanpage",
    keyword: "chăm sóc fanpage",
    label: "Chăm sóc fanpage hàng tháng",
    topic: "facebook",
    serviceHref: "/facebook/cham-soc-fanpage",
    serviceLabel: "Gói chăm sóc fanpage",
  },
  {
    slug: "seo-google-maps-la-gi",
    keyword: "SEO Google Maps",
    label: "SEO Google Maps — tối ưu Local Pack",
    topic: "google-maps",
    serviceHref: "/google-maps/thiet-ke-google-maps",
    serviceLabel: "Thiết kế Google Maps",
  },
  {
    slug: "marketing-online-la-gi",
    keyword: "marketing online",
    label: "Marketing online — chiến lược đa kênh",
    topic: "marketing",
    serviceHref: "/lien-he",
    serviceLabel: "Tư vấn marketing",
  },
  {
    slug: "google-ads-la-gi",
    keyword: "Google Ads",
    label: "Google Ads — chạy quảng cáo hiệu quả",
    topic: "marketing",
    serviceHref: "/website/quang-cao-website",
    serviceLabel: "Quảng cáo Google",
  },
  {
    slug: "tu-van-marketing-mien-phi",
    keyword: "tư vấn marketing",
    label: "Tư vấn marketing miễn phí",
    topic: "marketing",
    serviceHref: "/lien-he",
    serviceLabel: "Đặt lịch tư vấn",
  },
];

export const PILLAR_SLUG_SET = new Set(SEO_PILLARS.map((p) => p.slug));

function normalize(text: string) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function detectPillarTopic(input: {
  slug?: string;
  keywordsMain?: string;
  title?: string;
}): PillarTopic {
  const slug = normalize(input.slug || "");
  const keywords = normalize([input.keywordsMain, input.title].filter(Boolean).join(" "));

  if (
    slug.startsWith("thiet-ke-website") ||
    slug.startsWith("website-") ||
    slug.startsWith("bao-gia-thiet-ke") ||
    slug.startsWith("bao-gia-website") ||
    slug.startsWith("seo-la-gi") ||
    slug.startsWith("seo-website") ||
    slug.startsWith("seo-on-page") ||
    slug.startsWith("seo-cho-") ||
    slug.startsWith("audit-seo") ||
    slug.startsWith("viet-content-chuan-seo") ||
    keywords.includes("thiet ke website") ||
    keywords.includes("lam website") ||
    keywords.includes("bao gia website")
  ) {
    return "website";
  }

  if (
    slug.includes("google-maps") ||
    slug.startsWith("seo-local") ||
    slug.startsWith("seo-maps") ||
    slug.startsWith("seo-dia-phuong") ||
    slug.startsWith("local-seo") ||
    slug.startsWith("toi-uu-google-maps") ||
    slug.startsWith("dang-ky-google-maps") ||
    keywords.includes("google maps") ||
    keywords.includes("seo local") ||
    keywords.includes("seo dia phuong")
  ) {
    return "google-maps";
  }

  if (
    slug.includes("facebook") ||
    slug.includes("fanpage") ||
    slug.includes("meta-ads") ||
    slug.includes("pixel-facebook") ||
    keywords.includes("facebook") ||
    keywords.includes("fanpage") ||
    keywords.includes("quang cao facebook")
  ) {
    return "facebook";
  }

  return "marketing";
}

export function getPillarHubForArticle(input: {
  slug?: string;
  keywordsMain?: string;
  title?: string;
}) {
  const topic = detectPillarTopic(input);
  const currentSlug = input.slug || "";
  const pillars = SEO_PILLARS.filter((p) => p.topic === topic);
  const primary = pillars[0];
  const related = pillars.filter((p) => p.slug !== currentSlug);
  const isPillarPage = PILLAR_SLUG_SET.has(currentSlug);

  return {
    topic,
    isPillarPage,
    primary: isPillarPage ? primary : primary,
    links: related.length ? related : pillars,
    service: pillars[0],
  };
}
