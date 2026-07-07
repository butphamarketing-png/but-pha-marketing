import Link from "next/link";
import { buildFaqSchema, buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/ai-marketing/ai-search-optimization",
  title: "AI Search Optimization cho doanh nghiệp",
  description:
    "Tối ưu nội dung để tăng khả năng xuất hiện trong Google AI Overview, ChatGPT và các hệ thống trả lời bằng AI.",
  keywords: ["ai search optimization", "google ai overview seo", "llm seo", "answer engine optimization"],
});

export default function AiSearchOptimizationPage() {
  const serviceLd = buildServiceSchema({
    name: "AI Search Optimization",
    path: "/ai-marketing/ai-search-optimization",
    description: "Tối ưu cấu trúc nội dung để tăng cơ hội hiển thị trong AI Overview và công cụ trả lời AI.",
    serviceType: "AI Search Optimization",
  });
  const faqLd = buildFaqSchema([
    {
      question: "AI Search Optimization có khác SEO truyền thống không?",
      answer:
        "Có. Ngoài kỹ thuật SEO truyền thống, cần tối ưu answer-first, entity rõ ràng và dữ liệu có thể trích xuất cho hệ thống AI.",
    },
    {
      question: "Doanh nghiệp nhỏ có cần AI Search Optimization không?",
      answer:
        "Có. Nếu khách hàng tìm thông tin qua AI assistants, tối ưu sớm giúp thương hiệu có cơ hội được trích dẫn và tăng lead chất lượng.",
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
              <Link href="/ai-marketing" className="font-medium text-indigo-700 hover:text-indigo-900">
                AI Marketing
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li className="font-semibold text-indigo-950">AI Search Optimization</li>
          </ol>
        </nav>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-indigo-950">AI Search Optimization</h1>
        <p className="mt-4 text-lg text-slate-600">
          Chuẩn hóa nội dung theo cấu trúc AI-friendly: answer-first, entity rõ ràng, FAQ giàu ngữ cảnh và
          tín hiệu EEAT để tăng khả năng được trích dẫn.
        </p>
      </div>
    </main>
  );
}
