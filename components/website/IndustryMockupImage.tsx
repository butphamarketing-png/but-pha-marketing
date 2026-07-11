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
      width={INDUSTRY_MOCKUP_WIDTH}
      height={INDUSTRY_MOCKUP_HEIGHT}
      unoptimized
      priority={priority}
      sizes={sizes ?? `(max-width: 768px) 100vw, ${INDUSTRY_MOCKUP_WIDTH}px`}
      className={`mx-auto h-auto w-full max-w-[485px] ${className}`}
    />
  );
}
