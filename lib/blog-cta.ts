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
        subline: "Bứt Phá Marketing triển khai thiết kế website chuyên nghiệp — chuẩn SEO, bàn giao admin và báo giá minh bạch.",
        primary: { href: "/website", label: "Thiết kế website" },
        secondary: { href: "/banggia", label: "Báo giá thiết kế website" },
        zalo,
      };
    case "facebook":
      return {
        topic,
        topicLabel,
        headline: "Muốn Facebook Marketing hiệu quả hơn?",
        subline: "Thiết kế Fanpage, chăm sóc content và Meta Ads — đồng bộ thương hiệu và tăng inbox.",
        primary: { href: "/facebook", label: "Dịch vụ Facebook Marketing" },
        secondary: { href: "/blog/chu-de/facebook", label: "Hub Facebook" },
        zalo,
      };
    case "google-maps":
      return {
        topic,
        topicLabel,
        headline: "Cần tối ưu Google Maps / Local SEO?",
        subline: "Setup GBP, review, citation và đồng bộ website — tăng hiển thị Local Pack và cuộc gọi.",
        primary: { href: "/google-maps", label: "Dịch vụ Google Maps" },
        secondary: { href: "/blog/chu-de/google-maps", label: "Hub Google Maps" },
        zalo,
      };
    default:
      return {
        topic,
        topicLabel,
        headline: "Cần lộ trình marketing phù hợp?",
        subline: "Bắt đầu từ thiết kế website chuẩn SEO, rồi mở rộng Facebook và Google Maps theo mục tiêu.",
        primary: { href: "/website", label: "Thiết kế website" },
        secondary: { href: "/banggia", label: "Xem báo giá" },
        zalo,
      };
  }
}
