/** Chuẩn hóa src ảnh blog cho next/image (path tương đối). */
export function normalizeBlogImageSrc(src: string): string {
  const trimmed = src.trim();
  if (!trimmed) return "/mascot-home.png";
  if (trimmed.startsWith("/")) return trimmed;
  try {
    return new URL(trimmed).pathname;
  } catch {
    return trimmed;
  }
}

export const BLOG_CARD_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw";
export const BLOG_HERO_IMAGE_SIZES = "(max-width: 768px) 100vw, 896px";
export const BLOG_INLINE_IMAGE_SIZES = "(max-width: 768px) 100vw, 768px";
