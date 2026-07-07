import { SubLandingPage } from "@/components/landing/SubLandingPage";
import { buildFaqSchema, buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/ai-marketing/ai-content",
  title: "AI Content Ops cho SEO và Marketing",
  description:
    "Vận hành AI Content theo quy trình chuẩn để tăng tốc xuất bản mà vẫn đảm bảo chất lượng, độ chính xác và chuyển đổi.",
  keywords: ["ai content", "ai content ops", "quy trình nội dung ai", "seo content ai"],
});

const faqs = [
  {
    q: "AI Content Ops có thay thế copywriter không?",
    a: "Không hoàn toàn. AI tăng tốc draft và research; chuyên gia kiểm duyệt fact, tone, EEAT và SEO on-page trước khi publish.",
  },
  {
    q: "Làm sao tránh nội dung AI mỏng?",
    a: "Bắt buộc có brief intent, dữ liệu thật (case study, số liệu), checklist chất lượng và human review trước xuất bản.",
  },
];

export default function AiContentPage() {
  const serviceLd = buildServiceSchema({
    name: "AI Content Ops",
    path: "/ai-marketing/ai-content",
    description: "Thiết kế workflow AI cho sản xuất nội dung có kiểm duyệt chất lượng và chuẩn SEO.",
    serviceType: "AI Content Operations",
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
            { label: "AI Content Ops" },
          ],
          eyebrow: "AI Marketing",
          title: "AI Content Ops — sản xuất nội dung có kiểm soát",
          intro:
            "Tổ chức dây chuyền nội dung bằng AI: nghiên cứu → tạo nháp → kiểm duyệt → tối ưu SEO → xuất bản. Tăng 30–50% tốc độ xuất bản mà vẫn giữ chuẩn hữu ích và có dẫn chứng.",
          ctas: [
            { label: "Tư vấn AI Content Ops", href: "/lien-he", primary: true },
            { label: "SEO Content", href: "/seo-website/seo-content" },
            { label: "AI Search Optimization", href: "/ai-marketing/ai-search-optimization" },
          ],
          features: [
            "Brief template theo intent và cụm từ khóa",
            "AI draft + outline tự động từ pillar/cluster map",
            "Human review: fact-check, tone, EEAT, plagiarism",
            "SEO on-page: title, meta, heading, alt, internal link",
            "Publish workflow: CMS, revalidate, sitemap",
            "KPI: thời gian/bài, pass rate QA, traffic per cluster",
          ],
          process: [
            { step: "01", title: "Chuẩn hóa brief", desc: "Intent, keyword, outline, nguồn proof bắt buộc." },
            { step: "02", title: "AI draft", desc: "Sinh nháp theo template — không publish thẳng." },
            { step: "03", title: "Editor review", desc: "Sửa fact, thêm case study, checklist chất lượng." },
            { step: "04", title: "SEO pass", desc: "On-page, schema, interlink theo silo." },
            { step: "05", title: "Publish & measure", desc: "Xuất bản, theo dõi GSC và điều chỉnh." },
          ],
          relatedLinks: [
            { href: "/ai-marketing", label: "AI Marketing", desc: "Pillar tổng quan" },
            { href: "/blog/chu-de/website", label: "Hub Website", desc: "Áp dụng cho cụm SEO" },
            { href: "/kien-thuc/ai-marketing", label: "Knowledge Hub AI", desc: "Tài nguyên & framework" },
            { href: "/du-an/nha-khoa-dang-khoa", label: "Case study GSC", desc: "Proof cho nội dung" },
          ],
          faqs,
          ctaBand: {
            title: "Muốn scale content mà không mất chất lượng?",
            subline: "Bứt Phá thiết kế workflow AI + human review phù hợp team marketing SME.",
            primary: { label: "Tư vấn miễn phí", href: "/lien-he" },
            secondary: { label: "Xem AI Marketing", href: "/ai-marketing" },
          },
        }}
      />
    </main>
  );
}
