import Image from "next/image";
import {
  BLOG_CARD_IMAGE_SIZES,
  BLOG_HERO_IMAGE_SIZES,
  BLOG_INLINE_IMAGE_SIZES,
  resolveSharpBlogImage,
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
  const sharp = resolveSharpBlogImage(src, width, height);
  /** PNG thấp không stretch full cột — giữ độ nét; HD thì full-width OK */
  const constrained = !sharp.isHd && sharp.width < 900;
  const imgClass = constrained
    ? `${className} mx-auto h-auto max-w-full`.replace(/\bw-full\b/g, "").trim()
    : className;

  return (
    <Image
      src={sharp.src}
      alt={alt}
      width={sharp.width}
      height={sharp.height}
      priority={priority}
      sizes={resolveSizes(sizes)}
      className={imgClass}
      style={constrained ? { maxWidth: `${sharp.width}px` } : undefined}
      /* Bypass Vercel Image Optimization — Hobby quota 402 breaks new blog thumbs */
      unoptimized
    />
  );
}
