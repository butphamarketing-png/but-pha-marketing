import type { Metadata } from "next";
import { LogoWatermarkTool } from "@/components/tools/LogoWatermarkTool";

export const metadata: Metadata = {
  title: "Đóng dấu logo | Công cụ Bứt Phá Marketing",
  description: "Đóng dấu logo hàng loạt, preset theo %, watermark chữ, xuất ZIP — xử lý trên trình duyệt.",
};

export default function DongDauLogoPage() {
  return <LogoWatermarkTool />;
}
