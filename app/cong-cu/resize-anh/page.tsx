import type { Metadata } from "next";
import { ResizeTool } from "@/components/tools/ResizeTool";

export const metadata: Metadata = {
  title: "Resize ảnh hàng loạt | Công cụ Bứt Phá Marketing",
  description: "Đổi kích thước ảnh theo chuẩn Shopee, Facebook, Story — xuất ZIP trên trình duyệt.",
};

export default function ResizeAnhPage() {
  return <ResizeTool />;
}
