import Link from "next/link";
import { generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/kien-thuc/ai-marketing",
  title: "Knowledge Hub AI Marketing",
  description:
    "Trung tâm kiến thức AI Marketing: AI Content Ops, AI Search Optimization và framework vận hành marketing bằng AI.",
  keywords: ["kien thuc ai marketing", "ai content ops", "ai search optimization"],
});

const links = [
  { label: "AI Content Ops", href: "/ai-marketing/ai-content" },
  { label: "AI Search Optimization", href: "/ai-marketing/ai-search-optimization" },
  { label: "Pillar AI Marketing", href: "/ai-marketing" },
];

export default function KnowledgeAiMarketingPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-4xl font-black tracking-tight text-indigo-950">Knowledge Hub: AI Marketing</h1>
        <p className="text-lg text-slate-600">
          Tập hợp phương pháp ứng dụng AI vào nội dung, SEO và vận hành để tăng tốc tăng trưởng bền vững.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-2xl border border-indigo-100 bg-white p-4">
              <p className="font-semibold text-indigo-900">{item.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
