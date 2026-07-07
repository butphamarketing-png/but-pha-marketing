import { SubLandingPage } from "@/components/landing/SubLandingPage";
import { buildFaqSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/kien-thuc/ai-marketing",
  title: "Knowledge Hub AI Marketing",
  description:
    "Trung tâm kiến thức AI Marketing: AI Content Ops, AI Search Optimization và framework vận hành marketing bằng AI.",
  keywords: ["kien thuc ai marketing", "ai content ops", "ai search optimization"],
});

const faqs = [
  {
    q: "AI Marketing có thay thế agency không?",
    a: "AI là công cụ tăng tốc — chiến lược, kiểm duyệt chất lượng và dữ liệu thật vẫn cần chuyên gia.",
  },
  {
    q: "Làm AI Marketing sao cho an toàn thương hiệu?",
    a: "Workflow có human review, fact-check, không publish draft thô, và gắn proof/case study vào mọi cụm nội dung quan trọng.",
  },
];

export default function KnowledgeAiMarketingPage() {
  const faqLd = buildFaqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SubLandingPage
        config={{
          breadcrumbs: [
            { label: "Trang chủ", href: "/" },
            { label: "Kiến thức", href: "/kien-thuc" },
            { label: "AI Marketing" },
          ],
          eyebrow: "Resource Center",
          title: "Knowledge Hub: AI Marketing",
          intro:
            "Phương pháp ứng dụng AI vào content, SEO và vận hành marketing — tăng tốc sản xuất mà vẫn giữ EEAT, proof và chuyển đổi.",
          ctas: [
            { label: "Tư vấn AI Marketing", href: "/lien-he", primary: true },
            { label: "Pillar AI Marketing", href: "/ai-marketing" },
          ],
          features: [
            "AI Content Ops: brief → draft → review → publish",
            "AI Search Optimization: answer-first, llms.txt, entity",
            "AI hỗ trợ ads creative & A/B testing",
            "AI lead assistant: phân loại, gợi ý phản hồi",
            "Governance: checklist chất lượng trước xuất bản",
            "KPI: tốc độ, pass rate QA, traffic/lead per cluster",
          ],
          relatedLinks: [
            { href: "/ai-marketing", label: "AI Marketing", desc: "Dịch vụ pillar" },
            { href: "/ai-marketing/ai-content", label: "AI Content Ops", desc: "Quy trình nội dung AI" },
            { href: "/ai-marketing/ai-search-optimization", label: "AI Search Optimization", desc: "Tối ưu AI Overview" },
            { href: "/blog/chu-de/website", label: "Hub Website", desc: "Áp dụng cho SEO content" },
          ],
          faqs,
          ctaBand: {
            title: "Muốn triển khai AI có kiểm soát?",
            subline: "Bứt Phá thiết kế workflow AI + human review — không spam nội dung mỏng.",
            primary: { label: "Đặt lịch tư vấn", href: "/lien-he" },
          },
        }}
      />
    </main>
  );
}
