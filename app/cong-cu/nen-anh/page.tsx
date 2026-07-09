import type { Metadata } from "next";
import { CompressTool } from "@/components/tools/CompressTool";

export const metadata: Metadata = {
  title: "Nén ảnh WebP | Công cụ Bứt Phá Marketing",
  description: "Giảm dung lượng ảnh sản phẩm WebP/JPG — so sánh trước sau trên trình duyệt.",
};

export default function NenAnhPage() {
  return <CompressTool />;
}
