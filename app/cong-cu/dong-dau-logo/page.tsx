import type { Metadata } from "next";
import { LogoWatermarkTool } from "@/components/tools/LogoWatermarkTool";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Đóng dấu logo hàng loạt | Công cụ Bứt Phá Marketing",
  description:
    "Đóng dấu logo hàng loạt, preset theo %, watermark chữ, xuất ZIP — xử lý 100% trên trình duyệt, không upload server.",
  path: "/cong-cu/dong-dau-logo",
  keywords: ["đóng dấu logo", "watermark logo", "đóng dấu ảnh hàng loạt"],
});

export default function DongDauLogoPage() {
  return <LogoWatermarkTool />;
}
