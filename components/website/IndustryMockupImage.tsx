import Image from "next/image";
import {
  getMockupDimensions,
  hdMockupVariantSrc,
  INDUSTRY_MOCKUP_DISPLAY_MAX,
  mockupDisplayWidth,
} from "@/lib/industry-mockup-dimensions.generated";

/** Fallback khi chưa có entry trong dimension map. */
export const INDUSTRY_MOCKUP_WIDTH = 420;
export const INDUSTRY_MOCKUP_HEIGHT = 900;

function resolveMockupSrc(src: string): string {
  const hd = hdMockupVariantSrc(src);
  if (hd && getMockupDimensions(hd)) return hd;
  return src;
}

type IndustryMockupImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  /** card = thumbnail grid; hero = full mockup landing */
  variant?: "hero" | "card";
};

export function IndustryMockupImage({
  src,
  alt,
  priority,
  className = "",
  sizes,
  variant = "hero",
}: IndustryMockupImageProps) {
  const resolved = resolveMockupSrc(src);
  const dims = getMockupDimensions(resolved);
  const displayWidth = mockupDisplayWidth(resolved, INDUSTRY_MOCKUP_WIDTH);
  const displayHeight = dims
    ? Math.round((displayWidth / dims.width) * dims.height)
    : INDUSTRY_MOCKUP_HEIGHT;

  if (variant === "card") {
    return (
      <div
        className={`relative mx-auto h-64 w-full max-w-[220px] overflow-hidden bg-gradient-to-b from-indigo-50/80 to-white sm:h-72 ${className}`}
      >
        <Image
          src={resolved}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          sizes={sizes ?? "(max-width: 640px) 45vw, 220px"}
          className="object-contain object-top p-2"
        />
      </div>
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      width={displayWidth}
      height={displayHeight}
      unoptimized
      priority={priority}
      sizes={sizes ?? `(max-width: 768px) 90vw, ${displayWidth}px`}
      className={`mx-auto h-auto w-full ${className}`}
      style={{ maxWidth: `${Math.min(displayWidth, INDUSTRY_MOCKUP_DISPLAY_MAX)}px` }}
    />
  );
}
