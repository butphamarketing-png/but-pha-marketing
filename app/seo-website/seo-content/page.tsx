import Link from "next/link";
import { buildFaqSchema, buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/seo-website/seo-content",
  title: "SEO Content: topic cluster và intent",
  description:
    "Triển khai SEO Content theo cụm chủ đề và intent để tăng phủ từ khóa, tăng traffic chất lượng và tăng lead.",
  keywords: ["seo content", "topic cluster", "content seo", "search intent seo"],
});

export default function SeoContentPage() {
  const serviceLd = buildServiceSchema({
    name: "SEO Content",
    path: "/seo-website/seo-content",
    description: "Xây dựng content engine theo cluster và intent để mở rộng độ phủ từ khóa có chuyển đổi.",
    serviceType: "SEO Content",
  });
  const faqLd = buildFaqSchema([
    {
      question: "SEO Content khác viết bài blog thông thường như thế nào?",
      answer:
        "SEO Content dựa trên cấu trúc cụm chủ đề, intent tìm kiếm và internal link để tăng authority tổng thể, không chỉ đăng bài rời rạc.",
    },
    {
      question: "Bao lâu thì cụm content bắt đầu tăng traffic?",
      answer:
        "Thường sau 2-3 tháng có tín hiệu rõ hơn nếu website đã có nền tảng kỹ thuật tốt và bài viết được liên kết nội bộ đúng cấu trúc.",
    },
  ]);

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/seo-website" className="font-medium text-indigo-700 hover:text-indigo-900">
                SEO Website
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li className="font-semibold text-indigo-950">SEO Content</li>
          </ol>
        </nav>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-indigo-950">SEO Content</h1>
        <p className="mt-4 text-lg text-slate-600">
          Thiết kế content engine từ pillar → cluster → proof article để tăng topical authority bền vững
          và chống cannibalization.
        </p>
      </div>
    </main>
  );
}
