import Image from "next/image";
import {
  BLOG_CARD_IMAGE_SIZES,
  BLOG_HERO_IMAGE_SIZES,
  BLOG_INLINE_IMAGE_SIZES,
  normalizeBlogImageSrc,
} from "@/lib/blog-image";

type BlogOptimizedImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: "hero" | "card" | "inline" | string;
};

function resolveSizes(sizes: BlogOptimizedImageProps["sizes"]) {
  if (sizes === "hero") return BLOG_HERO_IMAGE_SIZES;
  if (sizes === "card") return BLOG_CARD_IMAGE_SIZES;
  if (sizes === "inline" || !sizes) return BLOG_INLINE_IMAGE_SIZES;
  return sizes;
}

export function BlogOptimizedImage({
  src,
  alt,
  width = 1200,
  height = 675,
  priority = false,
  className = "",
  sizes = "inline",
}: BlogOptimizedImageProps) {
  const normalized = normalizeBlogImageSrc(src);

  return (
    <Image
      src={normalized}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={resolveSizes(sizes)}
      className={className}
    />
  );
}
