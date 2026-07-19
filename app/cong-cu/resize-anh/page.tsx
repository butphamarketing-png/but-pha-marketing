import type { Metadata } from "next";
import { ResizeTool } from "@/components/tools/ResizeTool";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Resize ảnh hàng loạt | Công cụ Bứt Phá Marketing",
  description:
    "Đổi kích thước ảnh theo chuẩn Shopee, Facebook, Story — xuất ZIP trên trình duyệt, miễn phí.",
  path: "/cong-cu/resize-anh",
  keywords: ["resize ảnh", "đổi kích thước ảnh", "ảnh shopee", "ảnh facebook"],
});

export default function ResizeAnhPage() {
  return <ResizeTool />;
}
