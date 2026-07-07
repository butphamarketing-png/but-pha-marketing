import Link from "next/link";
import { SubLandingPage } from "@/components/landing/SubLandingPage";
import { buildFaqSchema, buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/ai-marketing/ai-search-optimization",
  title: "AI Search Optimization cho doanh nghiệp",
  description:
    "Tối ưu nội dung để tăng khả năng xuất hiện trong Google AI Overview, ChatGPT và các hệ thống trả lời bằng AI.",
  keywords: ["ai search optimization", "google ai overview seo", "llm seo", "answer engine optimization"],
});

const faqs = [
  {
    q: "AI Search Optimization có khác SEO truyền thống không?",
    a: "Có. Ngoài SEO cổ điển, cần answer-first, entity rõ, FAQ giàu ngữ cảnh, llms.txt và dữ liệu có thể trích xuất cho LLM.",
  },
  {
    q: "Doanh nghiệp nhỏ có cần tối ưu AI search không?",
    a: "Nên làm sớm nếu khách tìm thông tin qua AI assistant — giúp thương hiệu được trích dẫn và tăng discovery.",
  },
  {
    q: "llms.txt có tác dụng gì?",
    a: "File llms.txt giúp LLM crawler hiểu cấu trúc site, URL quan trọng và dịch vụ chính — bổ trợ cho SEO entity.",
  },
];

export default function AiSearchOptimizationPage() {
  const serviceLd = buildServiceSchema({
    name: "AI Search Optimization",
    path: "/ai-marketing/ai-search-optimization",
    description: "Tối ưu cấu trúc nội dung để tăng cơ hội hiển thị trong AI Overview và công cụ trả lời AI.",
    serviceType: "AI Search Optimization",
  });
  const faqLd = buildFaqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SubLandingPage
        config={{
          breadcrumbs: [
            { label: "Trang chủ", href: "/" },
            { label: "AI Marketing", href: "/ai-marketing" },
            { label: "AI Search Optimization" },
          ],
          eyebrow: "AI Marketing",
          title: "AI Search Optimization — Answer Engine & AI Overview",
          intro: (
            <>
              Chuẩn hóa nội dung <strong>AI-friendly</strong>: answer-first, entity rõ ràng, FAQ có ngữ cảnh, proof
              số liệu và tín hiệu EEAT — tăng khả năng được Google AI Overview và LLM trích dẫn.
            </>
          ),
          ctas: [
            { label: "Tư vấn AI Search", href: "/lien-he", primary: true },
            { label: "AI Content Ops", href: "/ai-marketing/ai-content" },
            { label: "llms.txt", href: "/llms.txt" },
          ],
          features: [
            "Answer-first blocks (quick answer) đầu bài pillar",
            "Entity & schema: Organization, Service, FAQPage, Article",
            "llms.txt + cấu trúc URL ưu tiên cho crawler AI",
            "Proof snippets: số liệu GSC, case study có nguồn",
            "FAQ intent chuyển đổi — không filler AI generic",
            "Monitor brand mention trong AI answers (manual + GSC)",
          ],
          process: [
            { step: "01", title: "Entity audit", desc: "Rà soát brand, service, NAP, schema hiện có." },
            { step: "02", title: "Answer architecture", desc: "Quick answer, FAQ, comparison blocks." },
            { step: "03", title: "llms.txt & hubs", desc: "Khai báo URL pillar, money page, case study." },
            { step: "04", title: "Content refresh", desc: "Cập nhật bài có proof và internal link." },
            { step: "05", title: "Test & iterate", desc: "Kiểm tra AI Overview, điều chỉnh theo SERP." },
          ],
          kpis: [
            <>
              Site đã có{" "}
              <Link href="/llms.txt" className="font-semibold underline">
                llms.txt
              </Link>{" "}
              khai báo cụm «thiết kế website»
            </>,
            "Tăng brand query và citation trong AI-generated answers",
            "Cải thiện CTR từ SERP có AI Overview",
            "Đồng bộ với SEO Content cluster dài hạn",
          ],
          relatedLinks: [
            { href: "/ai-marketing", label: "AI Marketing", desc: "Pillar AI tổng quan" },
            { href: "/blog/thiet-ke-website", label: "Pillar website", desc: "Mẫu answer-first + proof" },
            { href: "/seo-website", label: "SEO Website", desc: "Nền technical + content" },
            { href: "/kien-thuc/ai-marketing", label: "Knowledge Hub AI", desc: "Tài nguyên học thêm" },
          ],
          faqs,
          ctaBand: {
            title: "Muốn thương hiệu xuất hiện trong câu trả lời AI?",
            subline: "Bứt Phá tối ưu entity, answer blocks và llms.txt — gắn với cụm SEO đang triển khai.",
            primary: { label: "Đặt lịch tư vấn", href: "/lien-he" },
            secondary: { label: "Xem AI Marketing", href: "/ai-marketing" },
          },
        }}
      />
    </main>
  );
}
