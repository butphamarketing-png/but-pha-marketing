import Link from "next/link";
import { buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/ai-marketing/ai-content",
  title: "AI Content Ops cho SEO và Marketing",
  description:
    "Vận hành AI Content theo quy trình chuẩn để tăng tốc xuất bản mà vẫn đảm bảo chất lượng, độ chính xác và chuyển đổi.",
  keywords: ["ai content", "ai content ops", "quy trình nội dung ai", "seo content ai"],
});

export default function AiContentPage() {
  const serviceLd = buildServiceSchema({
    name: "AI Content Ops",
    path: "/ai-marketing/ai-content",
    description: "Thiết kế workflow AI cho sản xuất nội dung có kiểm duyệt chất lượng và chuẩn SEO.",
    serviceType: "AI Content Operations",
  });

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
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
            <li className="font-semibold text-indigo-950">AI Content Ops</li>
          </ol>
        </nav>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-indigo-950">AI Content Ops</h1>
        <p className="mt-4 text-lg text-slate-600">
          Tổ chức dây chuyền nội dung bằng AI: nghiên cứu → tạo nháp → kiểm duyệt → tối ưu SEO → xuất
          bản, giúp tăng sản lượng mà vẫn giữ chất lượng.
        </p>
      </div>
    </main>
  );
}
