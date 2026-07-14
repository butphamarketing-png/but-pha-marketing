import {
  getMockupDimensions,
  hdMockupVariantSrc,
  INDUSTRY_MOCKUP_HD_TARGET,
} from "@/lib/industry-mockup-dimensions.generated";

/** Chuẩn hóa src ảnh blog cho next/image (path tương đối). */
export function normalizeBlogImageSrc(src: string): string {
  const trimmed = src.trim();
  if (!trimmed) return "/logo.png";
  if (trimmed.startsWith("/")) return trimmed;
  try {
    return new URL(trimmed).pathname;
  } catch {
    return trimmed;
  }
}

/**
 * Ưu tiên bản HD WebP khi có — tránh stretch PNG ~480px full-width → mờ.
 */
export function resolveSharpBlogImage(src: string, fallbackWidth = 1200, fallbackHeight = 675) {
  const normalized = normalizeBlogImageSrc(src);
  const hd = hdMockupVariantSrc(normalized);
  if (hd && getMockupDimensions(hd)) {
    const d = getMockupDimensions(hd)!;
    return {
      src: hd,
      width: Math.min(d.width, INDUSTRY_MOCKUP_HD_TARGET),
      height: Math.round((Math.min(d.width, INDUSTRY_MOCKUP_HD_TARGET) / d.width) * d.height),
      isHd: true,
    };
  }
  const d = getMockupDimensions(normalized);
  if (d) {
    return {
      src: normalized,
      width: d.width,
      height: d.height,
      isHd: false,
    };
  }
  return { src: normalized, width: fallbackWidth, height: fallbackHeight, isHd: false };
}

export const BLOG_CARD_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw";
export const BLOG_HERO_IMAGE_SIZES = "(max-width: 768px) 100vw, 896px";
export const BLOG_INLINE_IMAGE_SIZES = "(max-width: 768px) 100vw, 768px";
