/** Alt text mockup website thiết bị vệ sinh — public/tin-tuc/thiet-bi-ve-sinh/ */
export const THIET_BI_VE_SINH_IMAGE_ALTS: readonly string[] = [
  "Thiết kế website thiết bị vệ sinh",
  "Thiết kế website thiết bị vệ sinh cao cấp",
  "Website showroom thiết bị vệ sinh",
  "Giao diện website bán thiết bị vệ sinh",
  "Mẫu thiết kế website thiết bị vệ sinh đẹp",
  "Website thiết bị vệ sinh chuẩn SEO",
  "Thiết kế website cửa hàng thiết bị vệ sinh",
];

export type ThietBiVeSinhThumbEntry = {
  file: string;
  keywordsMain: string;
  alt: string;
};

export const THIET_BI_VE_SINH_ARTICLE_THUMBNAILS: Record<string, ThietBiVeSinhThumbEntry> = {
  "thiet-ke-website-thiet-bi-ve-sinh": {
    file: "thiet-ke-website-thiet-bi-ve-sinh.png",
    keywordsMain: "thiết kế website thiết bị vệ sinh",
    alt: THIET_BI_VE_SINH_IMAGE_ALTS[0],
  },
  "thiet-ke-website-showroom-thiet-bi-ve-sinh": {
    file: "thiet-bi-ve-sinh-3.png",
    keywordsMain: "thiết kế website showroom thiết bị vệ sinh",
    alt: THIET_BI_VE_SINH_IMAGE_ALTS[2],
  },
  "bao-gia-thiet-ke-website-thiet-bi-ve-sinh": {
    file: "thiet-bi-ve-sinh-4.png",
    keywordsMain: "báo giá thiết kế website thiết bị vệ sinh",
    alt: "Báo giá thiết kế website thiết bị vệ sinh chuyên nghiệp",
  },
};

const THIET_BI_VE_SINH_DIR = "/tin-tuc/thiet-bi-ve-sinh";

export function resolveThietBiVeSinhArticleSlug(slug?: string): string | null {
  if (!slug) return null;
  if (THIET_BI_VE_SINH_ARTICLE_THUMBNAILS[slug]) return slug;

  const s = slug.toLowerCase();

  if (s.startsWith("bao-gia-thiet-ke-website-thiet-bi-ve-sinh")) {
    return "bao-gia-thiet-ke-website-thiet-bi-ve-sinh";
  }
  if (s.includes("showroom") && s.includes("thiet-bi-ve-sinh")) {
    return "thiet-ke-website-showroom-thiet-bi-ve-sinh";
  }
  if (
    s.includes("thiet-bi-ve-sinh") ||
    s.includes("thiet_bi_ve_sinh") ||
    s.includes("nha-tam") ||
    s.includes("showroom-nha-tam") ||
    (s.includes("tdm") && s.startsWith("thiet-ke-website"))
  ) {
    return "thiet-ke-website-thiet-bi-ve-sinh";
  }

  return null;
}

export function getThietBiVeSinhThumbnailPath(slug?: string): string | null {
  const resolved = resolveThietBiVeSinhArticleSlug(slug);
  const entry = resolved ? THIET_BI_VE_SINH_ARTICLE_THUMBNAILS[resolved] : undefined;
  return entry ? `${THIET_BI_VE_SINH_DIR}/${entry.file}` : null;
}

export function getThietBiVeSinhThumbnailAlt(slug?: string): string | null {
  const resolved = resolveThietBiVeSinhArticleSlug(slug);
  const entry = resolved ? THIET_BI_VE_SINH_ARTICLE_THUMBNAILS[resolved] : undefined;
  return entry?.alt ?? null;
}

export function getThietBiVeSinhContentImageAlt(index: number): string {
  const contentAlts = THIET_BI_VE_SINH_IMAGE_ALTS.slice(1);
  return (
    contentAlts[index % contentAlts.length] ??
    "Thiết kế website thiết bị vệ sinh"
  );
}
