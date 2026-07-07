import Link from "next/link";
import { buildFaqSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/kien-thuc/seo-website",
  title: "Knowledge Hub SEO Website",
  description:
    "Trung tâm kiến thức SEO Website: technical SEO, content SEO, audit checklist và hướng dẫn triển khai theo cụm chủ đề.",
  keywords: ["kien thuc seo website", "technical seo", "content seo", "audit seo"],
});

const links = [
  { label: "Dịch vụ thiết kế website", href: "/website" },
  { label: "Technical SEO", href: "/seo-website/technical-seo" },
  { label: "SEO Content", href: "/seo-website/seo-content" },
  { label: "Pillar Thiết kế Website", href: "/blog/thiet-ke-website" },
  { label: "Hub chủ đề Website", href: "/blog/chu-de/website" },
];

export default function KnowledgeSeoWebsitePage() {
  const faqLd = buildFaqSchema([
    {
      question: "Nên bắt đầu học SEO Website từ đâu?",
      answer: "Nên bắt đầu từ technical SEO nền tảng, sau đó chuyển sang content cluster và internal link.",
    },
  ]);

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-4xl font-black tracking-tight text-indigo-950">Knowledge Hub: SEO Website</h1>
        <p className="text-lg text-slate-600">
          Tập hợp tài nguyên cốt lõi cho SEO Website theo hướng kỹ thuật vững, nội dung sâu và chuyển đổi tốt.
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
