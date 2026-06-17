import { revalidatePath, revalidateTag } from "next/cache";
import { BLOG_CACHE_TAG } from "@/lib/server-blog";

export function revalidateBlogCache(slug?: string) {
  revalidateTag(BLOG_CACHE_TAG);
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidateTag(`blog-${slug}`);
    revalidatePath(`/blog/${slug}`);
  }
}
