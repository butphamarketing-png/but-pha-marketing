/** Mỗi ảnh mockup = 1 alt từ khóa — public/tin-tuc/khach-san/khach-san-{1..7}.png */
export const KHACH_SAN_IMAGE_ALTS = [
  "Thiết kế website khách sạn",
  "Thiết kế website khách sạn sang trọng",
  "Thiết kế website khách sạn 5 sao",
  "Giao diện đặt phòng khách sạn trực tuyến",
  "Website resort nghỉ dưỡng chuẩn SEO",
  "Mẫu thiết kế website khách sạn đẹp",
  "Website khách sạn cao cấp view biển",
];

export const KHACH_SAN_ARTICLE_THUMBNAILS = {
  "thiet-ke-website-khach-san": {
    file: "thiet-ke-website-khach-san.png",
    keywordsMain: "thiết kế website khách sạn",
    alt: KHACH_SAN_IMAGE_ALTS[0],
  },
  "thiet-ke-website-dat-phong-khach-san": {
    file: "khach-san-3.png",
    keywordsMain: "thiết kế website đặt phòng khách sạn",
    alt: KHACH_SAN_IMAGE_ALTS[3],
  },
  "thiet-ke-website-resort": {
    file: "khach-san-4.png",
    keywordsMain: "thiết kế website resort",
    alt: KHACH_SAN_IMAGE_ALTS[4],
  },
  "bao-gia-thiet-ke-website-khach-san": {
    file: "khach-san-5.png",
    keywordsMain: "báo giá thiết kế website khách sạn",
    alt: KHACH_SAN_IMAGE_ALTS[5],
  },
};

const KHACH_SAN_DIR = "/tin-tuc/khach-san";

export function resolveKhachSanArticleSlug(slug) {
  if (!slug) return null;
  if (KHACH_SAN_ARTICLE_THUMBNAILS[slug]) return slug;

  const s = slug.toLowerCase();

  if (s.includes("dat-phong") && s.includes("khach-san")) {
    return "thiet-ke-website-dat-phong-khach-san";
  }
  if (s.startsWith("bao-gia-thiet-ke-website-khach-san")) {
    return "bao-gia-thiet-ke-website-khach-san";
  }
  if (s.includes("resort") && s.startsWith("thiet-ke-website")) {
    return "thiet-ke-website-resort";
  }
  if (
    s.includes("khach-san") ||
    s.includes("homestay") ||
    s.includes("khach_san") ||
    (s.includes("hotel") && s.startsWith("thiet-ke-website"))
  ) {
    return "thiet-ke-website-khach-san";
  }

  return null;
}

export function khachSanThumbnailPath(slug) {
  const resolved = resolveKhachSanArticleSlug(slug);
  const entry = resolved ? KHACH_SAN_ARTICLE_THUMBNAILS[resolved] : null;
  return entry ? `${KHACH_SAN_DIR}/${entry.file}` : null;
}

export function getKhachSanThumbnailAlt(slug) {
  const resolved = resolveKhachSanArticleSlug(slug);
  const entry = resolved ? KHACH_SAN_ARTICLE_THUMBNAILS[resolved] : null;
  return entry?.alt ?? null;
}

export function getKhachSanContentImageAlt(index) {
  const contentAlts = KHACH_SAN_IMAGE_ALTS.slice(1);
  return contentAlts[index % contentAlts.length] ?? "Thiết kế website khách sạn";
}

export function isKhachSanSlug(slug) {
  return Boolean(resolveKhachSanArticleSlug(slug));
}
