import type { Metadata } from "next";
import { RemoveBgTool } from "@/components/tools/RemoveBgTool";

export const metadata: Metadata = {
  title: "Xóa nền AI | Công cụ Bứt Phá Marketing",
  description: "Xóa nền logo hoặc ảnh sản phẩm bằng AI chạy trên trình duyệt.",
};

export default function XoaNenPage() {
  return <RemoveBgTool />;
}
