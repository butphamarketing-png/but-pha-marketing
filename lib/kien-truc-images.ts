/** Alt text cho ảnh mockup website nội thất — public/tin-tuc/kien-truc/kien-truc-{1..7}.png */
export const KIEN_TRUC_IMAGE_ALTS: readonly string[] = [
  "Mockup website nội thất Luxora Interior — hero phòng khách sang trọng và CTA tư vấn",
  "Mockup website Luxora Interior Design — dịch vụ nội thất và dự án tiêu biểu tông vàng đen",
  "Mockup website LUXVIE Interior — portfolio penthouse và dự án cao cấp",
  "Mockup website Luxora Interior — lưới dự án masonry và tin tức xu hướng nội thất",
  "Mockup website LUXORA INTERIOR — giải pháp nội thất toàn diện và dự án filter tab",
  "Mockup website nội thất cao cấp — hero kiến tạo không gian sống và dịch vụ studio",
  "Mockup website Bứt Phá Interior — thiết kế vàng đen, dự án nổi bật và form liên hệ",
];

export type KienTrucThumbEntry = {
  file: string;
  keywordsMain: string;
  alt: string;
};

export const KIEN_TRUC_ARTICLE_THUMBNAILS: Record<string, KienTrucThumbEntry> = {
  "thiet-ke-website-kien-truc-noi-that": {
    file: "kien-truc-1.png",
    keywordsMain: "thiết kế website kiến trúc nội thất",
    alt: KIEN_TRUC_IMAGE_ALTS[0],
  },
  "thiet-ke-website-noi-that": {
    file: "kien-truc-7.png",
    keywordsMain: "thiết kế website nội thất",
    alt: KIEN_TRUC_IMAGE_ALTS[6],
  },
  "thiet-ke-website-noi-that-showroom": {
    file: "kien-truc-5.png",
    keywordsMain: "thiết kế website nội thất showroom",
    alt: KIEN_TRUC_IMAGE_ALTS[4],
  },
  "thiet-ke-website-noi-that-van-phong": {
    file: "kien-truc-3.png",
    keywordsMain: "thiết kế website nội thất văn phòng",
    alt: "Mockup website nội thất văn phòng — portfolio office Infinity và không gian làm việc hiện đại",
  },
  "thiet-ke-website-go-noi-that": {
    file: "kien-truc-4.png",
    keywordsMain: "thiết kế website gỗ nội thất",
    alt: "Mockup website xuất khẩu gỗ nội thất — catalog sản phẩm và dự án thực tế",
  },
  "thiet-ke-website-catalog-3d-noi-that": {
    file: "kien-truc-2.png",
    keywordsMain: "thiết kế website catalog 3D nội thất",
    alt: KIEN_TRUC_IMAGE_ALTS[1],
  },
  "thiet-ke-website-dich-vu-thiet-ke-noi-that": {
    file: "kien-truc-6.png",
    keywordsMain: "thiết kế website dịch vụ thiết kế nội thất",
    alt: KIEN_TRUC_IMAGE_ALTS[5],
  },
  "marketing-kien-truc-noi-that": {
    file: "kien-truc-1.png",
    keywordsMain: "marketing kiến trúc nội thất",
    alt: "Marketing website studio kiến trúc nội thất — showcase portfolio và thu lead",
  },
  // Giữ thumbnail cho bài xây dựng (ảnh pool chung)
  "thiet-ke-website-cong-ty-xay-dung": {
    file: "kien-truc-2.png",
    keywordsMain: "thiết kế website công ty xây dựng",
    alt: KIEN_TRUC_IMAGE_ALTS[1],
  },
  "thiet-ke-website-xay-dung-nha-thau": {
    file: "kien-truc-3.png",
    keywordsMain: "thiết kế website xây dựng",
    alt: KIEN_TRUC_IMAGE_ALTS[2],
  },
  "thiet-ke-website-vat-lieu-xay-dung": {
    file: "kien-truc-4.png",
    keywordsMain: "thiết kế website vật liệu xây dựng",
    alt: KIEN_TRUC_IMAGE_ALTS[3],
  },
  "thiet-ke-website-ho-so-nang-luc": {
    file: "kien-truc-5.png",
    keywordsMain: "thiết kế website hồ sơ năng lực",
    alt: KIEN_TRUC_IMAGE_ALTS[4],
  },
};

const KIEN_TRUC_DIR = "/tin-tuc/kien-truc";

/** Map slug dài (city, ads…) về bài gốc có thumbnail nội thất */
export function resolveKienTrucArticleSlug(slug?: string): string | null {
  if (!slug) return null;
  if (KIEN_TRUC_ARTICLE_THUMBNAILS[slug]) return slug;

  const s = slug.toLowerCase();

  if (s.startsWith("thiet-ke-website-kien-truc") || s.includes("kien-truc-noi-that")) {
    return "thiet-ke-website-kien-truc-noi-that";
  }
  if (s.includes("catalog-3d-noi-that") || s.includes("catalog-3d")) {
    return "thiet-ke-website-catalog-3d-noi-that";
  }
  if (s.includes("van-phong") && s.includes("noi-that")) {
    return "thiet-ke-website-noi-that-van-phong";
  }
  if (s.includes("showroom") && s.includes("noi-that")) {
    return "thiet-ke-website-noi-that-showroom";
  }
  if (s.includes("go-noi-that") || s.includes("xuong-noi-that")) {
    return "thiet-ke-website-go-noi-that";
  }
  if (s.startsWith("thiet-ke-website-noi-that") || s.startsWith("bao-gia-thiet-ke-website-noi-that")) {
    return "thiet-ke-website-noi-that";
  }
  if (s.includes("marketing-kien-truc") || s.includes("marketing-noi-that")) {
    return "marketing-kien-truc-noi-that";
  }
  if (s.includes("dich-vu-thiet-ke-noi-that") || s.includes("studio-noi-that")) {
    return "thiet-ke-website-dich-vu-thiet-ke-noi-that";
  }
  if (
    (s.includes("noi-that") || s.includes("noi_that")) &&
    (s.startsWith("thiet-ke-website") || s.startsWith("quang-cao") || s.startsWith("seo-google-maps"))
  ) {
    return "thiet-ke-website-noi-that";
  }

  return null;
}

export function getKienTrucThumbnailPath(slug?: string): string | null {
  const resolved = resolveKienTrucArticleSlug(slug);
  const entry = resolved ? KIEN_TRUC_ARTICLE_THUMBNAILS[resolved] : undefined;
  return entry ? `${KIEN_TRUC_DIR}/${entry.file}` : null;
}

export function getKienTrucThumbnailAlt(slug?: string): string | null {
  const resolved = resolveKienTrucArticleSlug(slug);
  const entry = resolved ? KIEN_TRUC_ARTICLE_THUMBNAILS[resolved] : undefined;
  return entry?.alt ?? null;
}

export function getKienTrucContentImageAlt(index: number): string {
  return KIEN_TRUC_IMAGE_ALTS[index % KIEN_TRUC_IMAGE_ALTS.length] ?? "Minh họa thiết kế website nội thất";
}
