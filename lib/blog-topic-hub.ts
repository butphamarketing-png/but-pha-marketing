import {
  detectPillarTopic,
  SEO_PILLARS,
  PILLAR_SLUG_SET,
  type PillarTopic,
} from "@/lib/seo-pillar-hub";
import type { ServerBlogItem } from "@/lib/server-blog";

export const BLOG_TOPIC_SLUGS = ["website", "facebook", "google-maps", "marketing"] as const;
export type BlogTopicSlug = (typeof BLOG_TOPIC_SLUGS)[number];

export type BlogTopicHubConfig = {
  slug: BlogTopicSlug;
  topic: PillarTopic;
  title: string;
  headline: string;
  description: string;
  serviceHref: string;
  serviceLabel: string;
};

export const BLOG_TOPIC_HUBS: Record<BlogTopicSlug, BlogTopicHubConfig> = {
  website: {
    slug: "website",
    topic: "website",
    title: "Tin tức Website & SEO",
    headline: "Thiết kế website, SEO & báo giá",
    description:
      "Thư viện bài viết về thiết kế website, làm web chuẩn SEO, báo giá và tối ưu chuyển đổi. Bắt đầu từ pillar thiết kế website hoặc trang dịch vụ chính thức.",
    serviceHref: "/website",
    serviceLabel: "Dịch vụ thiết kế website",
  },
  facebook: {
    slug: "facebook",
    topic: "facebook",
    title: "Tin tức Facebook & Fanpage",
    headline: "Quảng cáo Facebook, fanpage & content",
    description:
      "Thư viện bài viết về thiết kế Fanpage, chăm sóc content, Meta Ads và tối ưu inbox chuyển đổi. Funnel đầy đủ: xây dựng Fanpage → care hàng tháng → quảng cáo — có case study Sao Khuê 83K lượt xem Fanpage.",
    serviceHref: "/facebook",
    serviceLabel: "Dịch vụ Facebook Marketing",
  },
  "google-maps": {
    slug: "google-maps",
    topic: "google-maps",
    title: "Tin tức Google Maps & SEO Local",
    headline: "SEO Google Maps & Local Pack",
    description:
      "Hướng dẫn tối ưu Google Business Profile, Local SEO, thu review thật và đưa doanh nghiệp lên Local Pack. Kết hợp website chuẩn SEO để tăng lượt gọi và khách đến cửa hàng.",
    serviceHref: "/google-maps",
    serviceLabel: "Dịch vụ Google Maps Marketing",
  },
  marketing: {
    slug: "marketing",
    topic: "marketing",
    title: "Tin tức Marketing Online",
    headline: "Marketing online & chiến lược đa kênh",
    description:
      "Chiến lược marketing online đa kênh: website, SEO, Facebook, Google Maps, automation và AI. KPI thực chiến, so sánh agency và lộ trình tăng trưởng bền vững cho SME.",
    serviceHref: "/kien-thuc",
    serviceLabel: "Trung tâm kiến thức",
  },
};

export const BLOG_TOPIC_PAGE_SIZE = 24;

export function isBlogTopicSlug(value: string): value is BlogTopicSlug {
  return (BLOG_TOPIC_SLUGS as readonly string[]).includes(value);
}

export function getBlogTopicHub(slug: BlogTopicSlug) {
  return BLOG_TOPIC_HUBS[slug];
}

export function filterBlogsByTopic(blogs: ServerBlogItem[], topic: BlogTopicSlug) {
  const hub = getBlogTopicHub(topic);
  return blogs.filter(
    (blog) =>
      detectPillarTopic({
        slug: blog.slug,
        keywordsMain: blog.keywordsMain,
        title: blog.title,
      }) === hub.topic,
  );
}

export function getPillarsForTopic(topic: BlogTopicSlug) {
  const hub = getBlogTopicHub(topic);
  return SEO_PILLARS.filter((p) => p.topic === hub.topic);
}

export function sortTopicBlogs(blogs: ServerBlogItem[]) {
  return [...blogs].sort((a, b) => {
    const aSlug = a.slug || a.id;
    const bSlug = b.slug || b.id;
    const aPillar = PILLAR_SLUG_SET.has(aSlug) ? 1 : 0;
    const bPillar = PILLAR_SLUG_SET.has(bSlug) ? 1 : 0;
    if (aPillar !== bPillar) return bPillar - aPillar;
    if (a.hot !== b.hot) return (b.hot ? 1 : 0) - (a.hot ? 1 : 0);
    return b.timestamp - a.timestamp;
  });
}

export function toBlogListItems(blogs: ServerBlogItem[]) {
  return blogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    description: blog.description,
    metaDescription: blog.metaDescription,
    keywordsMain: blog.keywordsMain,
    keywordsSecondary: blog.keywordsSecondary,
    imageUrl: blog.imageUrl,
    slug: blog.slug,
    hot: blog.hot,
    publishedAt: blog.publishedAt,
    timestamp: blog.timestamp,
  }));
}
