import type { PillarTopic } from "@/lib/seo-pillar-hub";
import { getZaloUrl } from "@/lib/site-contact";

export type BlogCtaLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type BlogCtaConfig = {
  topic: PillarTopic;
  topicLabel: string;
  headline: string;
  subline: string;
  primary: BlogCtaLink;
  secondary: BlogCtaLink;
  zalo: BlogCtaLink;
};

const TOPIC_LABEL: Record<PillarTopic, string> = {
  website: "Website",
  facebook: "Facebook & Fanpage",
  "google-maps": "Google Maps",
  marketing: "Marketing",
};

export function getBlogCtaConfig(topic: PillarTopic): BlogCtaConfig {
  const topicLabel = TOPIC_LABEL[topic];
  const zalo = { href: getZaloUrl(), label: "Chat Zalo", external: true };

  switch (topic) {
    case "website":
      return {
        topic,
        topicLabel,
        headline: "Cần dịch vụ thiết kế website chuẩn SEO?",
        subline: "Bứt Phá Marketing triển khai thiết kế website chuyên nghiệp — tốc độ nhanh, form thu lead và báo giá minh bạch 3–12 triệu.",
        primary: { href: "/website", label: "Thiết kế website" },
        secondary: { href: "/blog/thiet-ke-website", label: "Hướng dẫn A-Z" },
        zalo,
      };
    case "facebook":
      return {
        topic,
        topicLabel,
        headline: "Muốn chạy Facebook Ads hiệu quả hơn?",
        subline: "Tư vấn chiến dịch, creative và landing page message-match — giảm CPA, tăng inbox và chốt đơn.",
        primary: { href: "/facebook/quang-cao-fanpage", label: "Dịch vụ quảng cáo Facebook" },
        secondary: { href: "/lien-he", label: "Nhận tư vấn miễn phí" },
        zalo,
      };
    case "google-maps":
      return {
        topic,
        topicLabel,
        headline: "Cần tối ưu Google Maps / Local SEO?",
        subline: "Setup GBP, review, citation và đồng bộ website — tăng hiển thị Local Pack và cuộc gọi.",
        primary: { href: "/google-maps/thiet-ke-google-maps", label: "Dịch vụ Google Maps" },
        secondary: { href: "/lien-he", label: "Tư vấn miễn phí" },
        zalo,
      };
    default:
      return {
        topic,
        topicLabel,
        headline: "Cần lộ trình marketing phù hợp?",
        subline: "Tư vấn miễn phí chiến lược đa kênh: website, SEO, ads và đo KPI rõ ràng.",
        primary: { href: "/lien-he", label: "Tư vấn marketing" },
        secondary: { href: "/website", label: "Thiết kế website" },
        zalo,
      };
  }
}
