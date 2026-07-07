import type { ServerBlogItem } from "@/lib/server-blog";

const GENERIC_KEYWORD = "thiết kế website";
const PILLAR_SLUGS = new Set([
  "thiet-ke-website",
  "bao-gia-thiet-ke-website",
  "seo-la-gi",
  "quang-cao-facebook",
  "thiet-ke-fanpage-facebook",
  "cham-soc-fanpage",
  "seo-google-maps-la-gi",
  "marketing-online-la-gi",
  "google-ads-la-gi",
  "tu-van-marketing-mien-phi",
]);

/** Title tuyệt đối — tránh template root layout chèn thêm "| Bứt Phá Marketing". */
export function buildBlogAbsoluteTitle(rawTitle: string): string {
  let title = rawTitle.trim();
  if (!title) return "Bứt Phá Marketing";

  // Viết hoa chữ cái đầu mỗi từ nếu title đang toàn chữ thường (SERP đẹp hơn)
  if (title[0] === title[0].toLowerCase()) {
    title = title
      .split(/\s+/)
      .map((word) => {
        const lower = word.toLowerCase();
        if (lower === "seo") return "SEO";
        if (/^[a-z]/.test(word)) return word.charAt(0).toUpperCase() + word.slice(1);
        return word;
      })
      .join(" ");
  }

  if (/bứt phá\s*marketing/i.test(title)) return title;
  if (/bứt phá/i.test(title)) {
    return title.replace(/\s*\|\s*bứt phá\s*$/i, " | Bứt Phá Marketing");
  }

  const withBrand = `${title} | Bứt Phá Marketing`;
  // Google thường hiển thị ~50–60 ký tự; nếu quá dài giữ title gốc (đã tối ưu trong metaTitle).
  return withBrand.length <= 60 ? withBrand : title;
}

export function isQualitySeoArticle(blog: Pick<ServerBlogItem, "slug" | "keywordsMain">): boolean {
  const slug = blog.slug || "";
  if (PILLAR_SLUGS.has(slug)) return true;

  const kw = (blog.keywordsMain || "").trim().toLowerCase();
  if (!kw) return false;
  if (kw === GENERIC_KEYWORD) return false;
  return kw.startsWith("thiết kế website") || kw.includes("website");
}

export function blogSitemapPriority(
  blog: Pick<ServerBlogItem, "slug" | "keywordsMain" | "hot">,
): number {
  if (blog.slug === "thiet-ke-website") return 0.99;
  if (blog.slug === "bao-gia-thiet-ke-website") return 0.97;
  if (PILLAR_SLUGS.has(blog.slug || "")) return 0.95;
  if (blog.hot) return 0.9;
  if (isQualitySeoArticle(blog)) return 0.85;
  return 0.7;
}

export function blogSitemapChangeFrequency(
  blog: Pick<ServerBlogItem, "slug" | "keywordsMain" | "hot" | "updatedAt">,
): "weekly" | "monthly" {
  if (isQualitySeoArticle(blog) || blog.hot) return "weekly";
  return "monthly";
}
