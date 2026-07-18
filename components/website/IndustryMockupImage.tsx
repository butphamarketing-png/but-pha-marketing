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
  /** card = thumbnail ngành (landscape sắc); hero = mockup landing */
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
    // Thumbnail grid ngành: luôn landscape. Ảnh mới (nganh-thumbs) có thể chưa có trong dimension map.
    const isLandscape =
      !dims || (dims.width ?? 0) >= (dims.height ?? 1) || resolved.includes("/nganh-thumbs/");
    return (
      <div
        className={
          isLandscape
            ? `relative aspect-[16/10] w-full overflow-hidden bg-[#0c0d12] ${className}`
            : `relative mx-auto h-64 w-full max-w-[220px] overflow-hidden bg-[#0c0d12] sm:h-72 ${className}`
        }
      >
        <Image
          src={resolved}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          sizes={sizes ?? "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"}
          className={isLandscape ? "object-cover object-center" : "object-contain object-top p-2"}
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
