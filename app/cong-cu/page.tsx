import type { Metadata } from "next";
import { ToolsHub } from "@/components/tools/ToolsHub";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Công cụ xử lý ảnh miễn phí | Bứt Phá Marketing",
  description:
    "Bộ công cụ miễn phí: đóng dấu logo hàng loạt, xóa nền AI, đổi nền ảnh, resize — chạy 100% trên trình duyệt, không upload server.",
  path: "/cong-cu",
  keywords: ["công cụ marketing", "đóng dấu logo", "xóa nền ảnh", "resize ảnh", "công cụ miễn phí"],
});

export default function CongCuPage() {
  return <ToolsHub />;
}
