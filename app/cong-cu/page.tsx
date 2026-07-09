import type { Metadata } from "next";
import { ToolsHub } from "@/components/tools/ToolsHub";

export const metadata: Metadata = {
  title: "Công cụ xử lý ảnh | Bứt Phá Marketing",
  description: "Bộ công cụ miễn phí: đóng dấu logo hàng loạt, xóa nền AI — chạy 100% trên trình duyệt.",
};

export default function CongCuPage() {
  return <ToolsHub />;
}
