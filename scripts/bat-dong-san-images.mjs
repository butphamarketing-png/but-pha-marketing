/** Mỗi ảnh mockup = 1 alt từ khóa — public/tin-tuc/bat-dong-san/bat-dong-san-{1..6}.png */
export const BAT_DONG_SAN_IMAGE_ALTS = [
  "Thiết kế website bất động sản",
  "Thiết kế website bất động sản cao cấp",
  "Website mua bán bất động sản chuyên nghiệp",
  "Giao diện website dự án bất động sản",
  "Mẫu thiết kế website bất động sản đẹp",
  "Website bất động sản chuẩn SEO",
];

export const BAT_DONG_SAN_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-bat-dong-san": {
    file: "thiet-ke-website-bat-dong-san.png",
    keywordsMain: "thiết kế website bất động sản",
    alt: BAT_DONG_SAN_IMAGE_ALTS[0],
  },
  "thiet-ke-website-du-an-bat-dong-san": {
    file: "bat-dong-san-3.png",
    keywordsMain: "thiết kế website dự án bất động sản",
    alt: BAT_DONG_SAN_IMAGE_ALTS[3],
  },
  "bao-gia-thiet-ke-website-bat-dong-san": {
    file: "bat-dong-san-4.png",
    keywordsMain: "báo giá thiết kế website bất động sản",
    alt: "Báo giá thiết kế website bất động sản chuyên nghiệp",
  },
};

const BAT_DONG_SAN_DIR = "/tin-tuc/bat-dong-san";

export function resolveBatDongSanArticleSlug(slug) {
  if (!slug) return null;
  if (BAT_DONG_SAN_ARTICLE_THUMBNAILS[slug]) return slug;

  const s = slug.toLowerCase();

  if (s.startsWith("bao-gia-thiet-ke-website-bat-dong-san")) {
    return "bao-gia-thiet-ke-website-bat-dong-san";
  }
  if (s.includes("du-an") && s.includes("bat-dong-san")) {
    return "thiet-ke-website-du-an-bat-dong-san";
  }
  if (
    s.includes("bat-dong-san") ||
    s.includes("bat_dong_san") ||
    s.includes("bds") ||
    (s.includes("nha-dat") && s.startsWith("thiet-ke-website"))
  ) {
    return "thiet-ke-website-bat-dong-san";
  }

  return null;
}

export function batDongSanThumbnailPath(slug) {
  const resolved = resolveBatDongSanArticleSlug(slug);
  const entry = resolved ? BAT_DONG_SAN_ARTICLE_THUMBNAILS[resolved] : null;
  return entry ? `${BAT_DONG_SAN_DIR}/${entry.file}` : null;
}

export function getBatDongSanThumbnailAlt(slug) {
  const resolved = resolveBatDongSanArticleSlug(slug);
  const entry = resolved ? BAT_DONG_SAN_ARTICLE_THUMBNAILS[resolved] : null;
  return entry?.alt ?? null;
}

export function getBatDongSanContentImageAlt(index) {
  const contentAlts = BAT_DONG_SAN_IMAGE_ALTS.slice(1);
  return contentAlts[index % contentAlts.length] ?? "Thiết kế website bất động sản";
}

export function isBatDongSanSlug(slug) {
  return Boolean(slug && resolveBatDongSanArticleSlug(slug));
}
