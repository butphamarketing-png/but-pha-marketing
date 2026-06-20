export type NewsImageTopic = "website" | "facebook" | "google-maps" | "marketing";

const NEWS_DIR = "/tin-tuc";

const THUMBNAIL_FILES: Record<NewsImageTopic, string> = {
  website: "thiet-ke-website.png",
  facebook: "facebook-marketing.png",
  "google-maps": "google-maps-marketing.png",
  marketing: "tin-tuc-marketing.png",
};

const CONTENT_IMAGE_FILES: Record<NewsImageTopic, string[]> = {
  website: [
    "thiet-ke-website.png",
    ...Array.from({ length: 10 }, (_, i) => `thiet-ke-website-${i + 1}.png`),
  ],
  facebook: [
    "facebook-marketing.png",
    ...Array.from({ length: 8 }, (_, i) => `facebook-marketing-${i + 1}.png`),
  ],
  "google-maps": [
    "google-maps-marketing.png",
    ...Array.from({ length: 5 }, (_, i) => `google-maps-marketing-${i + 1}.png`),
  ],
  marketing: ["tin-tuc-marketing.png"],
};

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

export function detectNewsTopic(input: {
  slug?: string;
  keywordsMain?: string;
  keywordsSecondary?: string;
  title?: string;
  niche?: string;
}): NewsImageTopic {
  const slug = normalizeText(input.slug || "");
  const keywords = normalizeText(
    [input.keywordsMain, input.keywordsSecondary, input.title, input.niche].filter(Boolean).join(" "),
  );

  if (
    slug.startsWith("thiet-ke-website") ||
    slug.startsWith("website-") ||
    slug.startsWith("bao-gia-thiet-ke") ||
    slug.startsWith("quy-trinh-thiet-ke")
  ) {
    return "website";
  }

  const googleMapsSlug =
    slug.startsWith("marketing-seo-local") ||
    slug.startsWith("seo-local") ||
    slug.includes("google-maps") ||
    slug.startsWith("seo-maps") ||
    slug.startsWith("seo-dia-phuong") ||
    slug.startsWith("local-pack") ||
    slug.startsWith("nap-seo") ||
    slug.startsWith("local-citation") ||
    slug.startsWith("danh-gia-google-maps") ||
    slug.startsWith("dang-ky-google-maps") ||
    slug.startsWith("cach-dua-doanh-nghiep-len-google-maps") ||
    slug.startsWith("tang-hang-google-maps") ||
    slug.startsWith("google-maps-marketing") ||
    slug.startsWith("embed-google-maps") ||
    slug.startsWith("quang-cao-google-maps") ||
    slug.startsWith("gan-toi-google-maps") ||
    slug.startsWith("checklist-seo-local") ||
    slug.startsWith("local-seo");

  if (googleMapsSlug) return "google-maps";

  const facebookSlug =
    slug.includes("facebook") ||
    slug.includes("fanpage") ||
    slug.includes("meta-ads") ||
    slug.includes("pixel-facebook") ||
    (slug.includes("instagram") && !slug.includes("website"));

  if (facebookSlug) return "facebook";

  if (
    keywords.includes("google maps") ||
    keywords.includes("google-maps") ||
    keywords.includes("seo maps") ||
    keywords.includes("seo local") ||
    keywords.includes("local pack") ||
    keywords.includes("google business") ||
    keywords.includes("maps marketing") ||
    keywords.includes("danh gia google maps") ||
    keywords.includes("seo dia phuong")
  ) {
    const websiteMapsArticle =
      keywords.includes("thiet ke website") &&
      !keywords.includes("google maps marketing") &&
      !keywords.includes("seo local");
    if (!websiteMapsArticle) return "google-maps";
  }

  if (
    keywords.includes("facebook") ||
    keywords.includes("fanpage") ||
    keywords.includes("meta ads") ||
    keywords.includes("pixel facebook") ||
    keywords.includes("quang cao facebook") ||
    keywords.includes("marketing facebook") ||
    keywords.includes("instagram ads")
  ) {
    return "facebook";
  }

  if (
    keywords.includes("thiet ke website") ||
    keywords.includes("wordpress") ||
    keywords.includes("landing page") ||
    keywords.includes("responsive") ||
    keywords.includes("web design") ||
    keywords.includes("bao gia website")
  ) {
    return "website";
  }

  if (input.niche === "facebook-ads") return "facebook";
  if (input.niche === "social" && keywords.includes("facebook")) return "facebook";

  return "marketing";
}

export function getNewsThumbnailPath(topic: NewsImageTopic): string {
  return `${NEWS_DIR}/${THUMBNAIL_FILES[topic]}`;
}

export function getNewsContentImagePaths(topic: NewsImageTopic): string[] {
  return CONTENT_IMAGE_FILES[topic].map((file) => `${NEWS_DIR}/${file}`);
}

export function resolveBlogImageUrl(input: {
  slug?: string;
  keywordsMain?: string;
  keywordsSecondary?: string;
  title?: string;
  imageUrl?: string;
}): string {
  const topic = detectNewsTopic(input);
  const expected = getNewsThumbnailPath(topic);
  const current = (input.imageUrl || "").trim();

  if (!current) return expected;

  let normalizedCurrent = current;
  if (current.startsWith("http")) {
    try {
      normalizedCurrent = new URL(current).pathname;
    } catch {
      normalizedCurrent = current;
    }
  }

  if (normalizedCurrent.endsWith("tin-tuc-marketing.png") && topic !== "marketing") {
    return expected;
  }

  return normalizedCurrent.startsWith("/") ? normalizedCurrent : expected;
}
