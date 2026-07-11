import Image from "next/image";
import {
  getMockupDimensions,
  INDUSTRY_MOCKUP_HD_TARGET,
  mockupDisplayWidth,
} from "@/lib/industry-mockup-dimensions.generated";

/** Fallback khi chưa có entry trong dimension map. */
export const INDUSTRY_MOCKUP_WIDTH = 485;
export const INDUSTRY_MOCKUP_HEIGHT = 1024;

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
  const dims = getMockupDimensions(src);
  const displayWidth = mockupDisplayWidth(src, INDUSTRY_MOCKUP_WIDTH);
  const displayHeight = dims
    ? Math.round((displayWidth / dims.width) * dims.height)
    : INDUSTRY_MOCKUP_HEIGHT;

  if (variant === "card") {
    return (
      <div
        className={`relative h-52 w-full overflow-hidden bg-gradient-to-b from-indigo-50/80 to-white sm:h-56 ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          sizes={sizes ?? "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"}
          className="object-contain object-top p-2"
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={displayWidth}
      height={displayHeight}
      unoptimized
      priority={priority}
      sizes={sizes ?? `(max-width: 768px) 100vw, min(100vw, ${displayWidth}px)`}
      className={`mx-auto h-auto w-full ${className}`}
      style={{ maxWidth: `${Math.min(displayWidth, INDUSTRY_MOCKUP_HD_TARGET)}px` }}
    />
  );
}
