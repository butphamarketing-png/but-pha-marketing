/** Alt text mockup website trường mầm non — public/tin-tuc/mam-non/ */
export const MAM_NON_IMAGE_ALTS: readonly string[] = [
  "Thiết kế website trường mầm non",
  "Thiết kế website mầm non hiện đại",
  "Website trường mầm non chuyên nghiệp",
  "Giao diện website mầm non tuyển sinh",
  "Mẫu thiết kế website mầm non đẹp",
];

export type MamNonThumbEntry = {
  file: string;
  keywordsMain: string;
  alt: string;
};

export const MAM_NON_ARTICLE_THUMBNAILS: Record<string, MamNonThumbEntry> = {
  "thiet-ke-website-truong-mam-non": {
    file: "thiet-ke-website-truong-mam-non.png",
    keywordsMain: "thiết kế website trường mầm non",
    alt: MAM_NON_IMAGE_ALTS[0],
  },
  "thiet-ke-website-tre-em-mam-non": {
    file: "mam-non-2.png",
    keywordsMain: "thiết kế website mầm non",
    alt: MAM_NON_IMAGE_ALTS[1],
  },
  "bao-gia-thiet-ke-website-truong-mam-non": {
    file: "mam-non-3.png",
    keywordsMain: "báo giá thiết kế website trường mầm non",
    alt: "Báo giá thiết kế website trường mầm non chuyên nghiệp",
  },
};

const MAM_NON_DIR = "/tin-tuc/mam-non";

export function resolveMamNonArticleSlug(slug?: string): string | null {
  if (!slug) return null;
  if (MAM_NON_ARTICLE_THUMBNAILS[slug]) return slug;

  const s = slug.toLowerCase();

  if (s.startsWith("bao-gia-thiet-ke-website-truong-mam-non")) {
    return "bao-gia-thiet-ke-website-truong-mam-non";
  }
  if (s.includes("tre-em") && s.includes("mam-non")) {
    return "thiet-ke-website-tre-em-mam-non";
  }
  if (
    s.includes("truong-mam-non") ||
    s.includes("mam-non") ||
    s.includes("mam_non") ||
    s.includes("giao-duc-som") ||
    (s.includes("tre-em") && s.startsWith("thiet-ke-website"))
  ) {
    return "thiet-ke-website-truong-mam-non";
  }

  return null;
}

export function getMamNonThumbnailPath(slug?: string): string | null {
  const resolved = resolveMamNonArticleSlug(slug);
  const entry = resolved ? MAM_NON_ARTICLE_THUMBNAILS[resolved] : undefined;
  return entry ? `${MAM_NON_DIR}/${entry.file}` : null;
}

export function getMamNonThumbnailAlt(slug?: string): string | null {
  const resolved = resolveMamNonArticleSlug(slug);
  const entry = resolved ? MAM_NON_ARTICLE_THUMBNAILS[resolved] : undefined;
  return entry?.alt ?? null;
}

export function getMamNonContentImageAlt(index: number): string {
  const contentAlts = MAM_NON_IMAGE_ALTS.slice(1);
  return contentAlts[index % contentAlts.length] ?? "Thiết kế website trường mầm non";
}
