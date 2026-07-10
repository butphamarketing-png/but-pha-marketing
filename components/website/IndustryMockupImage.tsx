import Image from "next/image";

/** Mockup ngành export ~485×1024 (JPEG trong file .png) — không upscale quá kích thước gốc. */
export const INDUSTRY_MOCKUP_WIDTH = 485;
export const INDUSTRY_MOCKUP_HEIGHT = 1024;

type IndustryMockupImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function IndustryMockupImage({
  src,
  alt,
  priority,
  className = "",
  sizes,
}: IndustryMockupImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={INDUSTRY_MOCKUP_WIDTH}
      height={INDUSTRY_MOCKUP_HEIGHT}
      unoptimized
      priority={priority}
      sizes={sizes ?? `(max-width: 768px) 100vw, ${INDUSTRY_MOCKUP_WIDTH}px`}
      className={`h-auto w-full max-w-[485px] ${className}`}
    />
  );
}
