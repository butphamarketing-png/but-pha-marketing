import { SubLandingPage } from "@/components/landing/SubLandingPage";
import { DeepPageShell } from "@/components/shared/DeepPageShell";
import { buildFaqSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/kien-thuc/marketing-automation",
  title: "Knowledge Hub Marketing Automation",
  description:
    "Trung tâm kiến thức Marketing Automation: lead nurturing, CRM automation, quy trình phối hợp marketing-sales.",
  keywords: ["kien thuc marketing automation", "lead nurturing", "crm automation"],
});

const faqs = [
  {
    q: "Marketing Automation bắt đầu từ đâu?",
    a: "Bắt đầu từ thu lead tập trung (website, form, Zalo) → CRM → workflow phân loại → nurturing → báo cáo funnel.",
  },
  {
    q: "SME cần tool gì cho automation?",
    a: "Tùy quy mô: từ Google Sheet + Zalo đến CRM (HubSpot, Zoho, Pipedrive...) — quan trọng là quy trình rõ, không phụ thuộc tool đắt.",
  },
];

export default function KnowledgeMarketingAutomationPage() {
  const faqLd = buildFaqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <DeepPageShell padded>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SubLandingPage
        config={{
          breadcrumbs: [
            { label: "Trang chủ", href: "/" },
            { label: "Kiến thức", href: "/kien-thuc" },
            { label: "Marketing Automation" },
          ],
          eyebrow: "Resource Center",
          title: "Knowledge Hub: Marketing Automation",
          intro:
            "Tổng hợp framework tự động hóa marketing — từ thu lead, nuôi dưỡng, CRM đến đo funnel — giúp SME giảm thất thoát cơ hội và tăng hiệu suất sales.",
          ctas: [
            { label: "Tư vấn automation", href: "/lien-he", primary: true },
            { label: "Pillar Automation", href: "/marketing-automation" },
          ],
          features: [
            "Lead capture đa kênh: website, fanpage, Google Maps",
            "Lead scoring & routing cho đội sales",
            "Workflow nurturing theo hành vi (email, Zalo, remarketing)",
            "CRM pipeline: mới → tư vấn → báo giá → chốt",
            "Dashboard funnel và KPI theo nguồn lead",
            "Tích hợp với website chuẩn SEO và form thu lead",
          ],
          relatedLinks: [
            { href: "/marketing-automation", label: "Marketing Automation", desc: "Dịch vụ pillar" },
            { href: "/marketing-automation/lead-nurturing", label: "Lead Nurturing", desc: "Nuôi dưỡng tự động" },
            { href: "/marketing-automation/crm-automation", label: "CRM Automation", desc: "Pipeline & sales ops" },
            { href: "/website", label: "Thiết kế website", desc: "Nguồn lead đầu vào" },
          ],
          faqs,
          ctaBand: {
            title: "Cần lộ trình automation phù hợp quy mô?",
            subline: "Bứt Phá khảo sát quy trình hiện tại và đề xuất triển khai từng phase — không làm phức tạp ngay từ đầu.",
            primary: { label: "Liên hệ tư vấn", href: "/lien-he" },
          },
        }}
      />
    </DeepPageShell>
  );
}
