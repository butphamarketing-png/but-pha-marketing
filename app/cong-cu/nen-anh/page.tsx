import type { Metadata } from "next";
import { CompressTool } from "@/components/tools/CompressTool";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nén ảnh WebP miễn phí | Công cụ Bứt Phá Marketing",
  description:
    "Giảm dung lượng ảnh sản phẩm WebP/JPG — so sánh trước sau ngay trên trình duyệt, tối ưu tốc độ website.",
  path: "/cong-cu/nen-anh",
  keywords: ["nén ảnh", "compress image", "webp", "giảm dung lượng ảnh"],
});

export default function NenAnhPage() {
  return <CompressTool />;
}
