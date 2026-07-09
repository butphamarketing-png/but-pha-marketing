import type { Metadata } from "next";
import { LogoWatermarkTool } from "@/components/tools/LogoWatermarkTool";

export const metadata: Metadata = {
  title: "Công cụ | Đóng dấu logo",
  description:
    "Đóng dấu logo hàng loạt, lưu preset theo tỷ lệ %, và xóa nền AI trực tiếp trên trình duyệt.",
};

export default function CongCuPage() {
  return <LogoWatermarkTool />;
}
