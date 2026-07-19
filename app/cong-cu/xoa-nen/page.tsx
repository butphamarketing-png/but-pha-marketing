import type { Metadata } from "next";
import { RemoveBgTool } from "@/components/tools/RemoveBgTool";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Xóa nền ảnh AI miễn phí | Công cụ Bứt Phá Marketing",
  description:
    "Xóa nền logo hoặc ảnh sản phẩm bằng AI chạy trên trình duyệt — nhanh, miễn phí, không cần tài khoản.",
  path: "/cong-cu/xoa-nen",
  keywords: ["xóa nền ảnh", "remove background", "xóa nền logo AI"],
});

export default function XoaNenPage() {
  return <RemoveBgTool />;
}
