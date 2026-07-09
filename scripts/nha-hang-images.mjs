export const NHA_HANG_IMAGE_ALTS = [
  "Thiết kế website nhà hàng",
  "Thiết kế website nhà hàng hiện đại",
  "Thiết kế website nhà hàng chuyên nghiệp",
  "Mẫu thiết kế website nhà hàng đẹp",
  "Website nhà hàng chuẩn SEO",
  "Giao diện website nhà hàng cao cấp",
];

export const NHA_HANG_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-nha-hang": {
    file: "thiet-ke-website-nha-hang.png",
    keywordsMain: "thiết kế website nhà hàng",
    alt: NHA_HANG_IMAGE_ALTS[0],
  },
  "thiet-ke-website-nha-hang-menu": {
    file: "nha-hang-2.png",
    keywordsMain: "thiết kế website nhà hàng menu",
    alt: "Thiết kế website nhà hàng menu online và QR",
  },
  "bao-gia-thiet-ke-website-nha-hang": {
    file: "nha-hang-3.png",
    keywordsMain: "báo giá thiết kế website nhà hàng",
    alt: "Báo giá thiết kế website nhà hàng chuyên nghiệp",
  },
};

const NHA_HANG_DIR = "/tin-tuc/nha-hang";

export function resolveNhaHangArticleSlug(slug) {
  if (!slug) return null;
  if (NHA_HANG_ARTICLE_THUMBNAILS[slug]) return slug;

  const s = slug.toLowerCase();

  if (s.includes("nha-hang-menu") || s.includes("menu-nha-hang") || s.includes("menu-qr")) {
    return "thiet-ke-website-nha-hang-menu";
  }
  if (s.startsWith("bao-gia-thiet-ke-website-nha-hang")) {
    return "bao-gia-thiet-ke-website-nha-hang";
  }
  if (
    s.includes("nha-hang") ||
    s.includes("quan-an") ||
    s.includes("nha_hang") ||
    (s.includes("fnb") && s.startsWith("thiet-ke-website"))
  ) {
    return "thiet-ke-website-nha-hang";
  }

  return null;
}

export function nhaHangThumbnailPath(slug) {
  const resolved = resolveNhaHangArticleSlug(slug);
  const entry = resolved ? NHA_HANG_ARTICLE_THUMBNAILS[resolved] : null;
  return entry ? `${NHA_HANG_DIR}/${entry.file}` : null;
}

export function getNhaHangThumbnailAlt(slug) {
  const resolved = resolveNhaHangArticleSlug(slug);
  const entry = resolved ? NHA_HANG_ARTICLE_THUMBNAILS[resolved] : null;
  return entry?.alt ?? null;
}

export function getNhaHangContentImageAlt(index) {
  const contentAlts = NHA_HANG_IMAGE_ALTS.slice(1);
  return contentAlts[index % contentAlts.length] ?? "Thiết kế website nhà hàng";
}

export function isNhaHangSlug(slug) {
  return Boolean(resolveNhaHangArticleSlug(slug));
}
