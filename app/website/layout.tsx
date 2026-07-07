import { getDynamicMetadata } from "@/lib/seo";
import { WebsiteSchema } from "./WebsiteSchema";

export async function generateMetadata() {
  return getDynamicMetadata("/website", {
    title: "Thiết kế website chuyên nghiệp chuẩn SEO | Bứt Phá Marketing",
    description:
      "Dịch vụ thiết kế website cho doanh nghiệp: giao diện chuyên nghiệp, chuẩn SEO, tốc độ nhanh, báo giá 3–12 triệu. Tư vấn miễn phí — Bứt Phá Marketing.",
    keywords: [
      "thiết kế website",
      "làm website",
      "thiết kế web",
      "báo giá thiết kế website",
      "dịch vụ thiết kế website",
      "website chuẩn seo",
    ],
  });
}

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WebsiteSchema />
      {children}
    </>
  );
}
