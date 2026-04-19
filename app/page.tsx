import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Bứt Phá Marketing | Giải pháp marketing thực chiến",
  description:
    "Agency marketing toàn diện tại Việt Nam. Dịch vụ Facebook, TikTok, Instagram, Website, Local SEO và chiến lược tăng trưởng doanh thu.",
  path: "/",
  keywords: [
    "marketing",
    "facebook ads",
    "tiktok marketing",
    "instagram marketing",
    "website marketing",
    "local seo",
    "agency marketing",
  ],
});

export default function Home() {
  return <HomePageClient />;
}
