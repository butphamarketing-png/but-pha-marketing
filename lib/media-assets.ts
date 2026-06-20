export const DEFAULT_HERO_SLIDE = "/slideshow-hero.png";
export const DEFAULT_INTRO_IMAGE = "/mascot-home.png";
export const DEFAULT_MASCOT_IMAGE = "/mascot-home.png";

const DEPRECATED_SLIDESHOW_SUFFIXES = [
  "/mascot-home.png",
  "/slideshow.jpg",
  "/slideshow1.jpg",
  "/Website.png",
  "/Facebook.png",
  "/GoogleMaps.png",
];

export function isDeprecatedSlideshowAsset(url: string | undefined): boolean {
  const trimmed = (url ?? "").trim();
  if (!trimmed) return true;
  const lower = trimmed.toLowerCase();
  return DEPRECATED_SLIDESHOW_SUFFIXES.some((suffix) => lower.endsWith(suffix.toLowerCase()));
}

export function sanitizeSlideshowItems(items: string[] | undefined): string[] {
  const seen = new Set<string>();
  const sanitized = (items ?? [])
    .map((item) => item.trim())
    .filter((item) => {
      if (!item || isDeprecatedSlideshowAsset(item)) return false;
      if (seen.has(item)) return false;
      seen.add(item);
      return true;
    });

  return sanitized.length > 0 ? sanitized : [DEFAULT_HERO_SLIDE];
}
