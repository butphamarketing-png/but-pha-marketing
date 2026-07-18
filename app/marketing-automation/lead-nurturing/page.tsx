import { SubLandingPage } from "@/components/landing/SubLandingPage";
import { DeepPageShell } from "@/components/shared/DeepPageShell";
import { buildFaqSchema, buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/marketing-automation/lead-nurturing",
  title: "Lead Nurturing Automation cho doanh nghiệp",
  description:
    "Thiết kế chuỗi nuôi dưỡng lead tự động qua email, Zalo, remarketing để tăng tỷ lệ chuyển đổi từ MQL sang SQL.",
  keywords: ["lead nurturing", "automation chăm sóc khách hàng", "nuôi dưỡng lead tự động"],
});

const sequences = [
  "Chuỗi chào mừng sau khi khách để lại form website",
  "Nhắc lịch / follow-up Zalo theo SLA đã thống nhất",
  "Gửi nội dung giáo dục theo ngành (case study, checklist, báo giá)",
  "Remarketing ads cho lead chưa phản hồi sau 3–7 ngày",
  "Chuyển sang sales khi lead đạt điểm (lead scoring)",
];

const faqs = [
  {
    q: "Lead Nurturing khác CRM Automation thế nào?",
    a: "Lead Nurturing chăm sóc lead tự động trước khi chuyển sales. CRM Automation quản lý pipeline và giao việc cho đội bán hàng.",
  },
  {
    q: "Cần bao nhiêu kịch bản nuôi dưỡng?",
    a: "Thường bắt đầu 2–3 chuỗi: lead lạnh (mới vào), lead ấm (đã tương tác), lead nóng (sẵn sàng báo giá). Mở rộng theo ngành sau.",
  },
];

export default function LeadNurturingPage() {
  const serviceLd = buildServiceSchema({
    name: "Lead Nurturing Automation",
    path: "/marketing-automation/lead-nurturing",
    description: "Thiết kế workflow nuôi dưỡng lead theo hành vi để tăng tỷ lệ phản hồi và tỷ lệ chốt.",
    serviceType: "Lead Nurturing Automation",
  });
  const faqLd = buildFaqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <DeepPageShell padded>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SubLandingPage
        config={{
          breadcrumbs: [
            { label: "Marketing Automation", href: "/marketing-automation" },
            { label: "Lead Nurturing" },
          ],
          eyebrow: "Marketing Automation",
          title: "Lead Nurturing Automation",
          intro: (
            <>
              Không phải lead nào cũng sẵn sàng mua ngay. <strong>Lead Nurturing</strong> giúp bạn chăm sóc tự
              động theo hành vi — tăng tỷ lệ phản hồi, đặt lịch và chuyển sang sales đúng thời điểm.
            </>
          ),
          ctas: [
            { label: "Tư vấn Lead Nurturing", href: "/lien-he", primary: true },
            { label: "CRM Automation", href: "/marketing-automation/crm-automation" },
          ],
          featuresTitle: "Kịch bản nuôi dưỡng phổ biến",
          features: sequences,
          faqs,
          relatedLinks: [
            {
              href: "/marketing-automation",
              label: "Marketing Automation",
              desc: "Tổng quan hệ thống automation",
            },
            {
              href: "/marketing-automation/crm-automation",
              label: "CRM Automation",
              desc: "Đồng bộ lead với sales pipeline",
            },
            {
              href: "/website",
              label: "Thiết kế website",
              desc: "Form thu lead chuẩn chuyển đổi",
            },
            {
              href: "/kien-thuc/marketing-automation",
              label: "Knowledge Hub Automation",
              desc: "Tài nguyên & checklist",
            },
          ],
          ctaBand: {
            eyebrow: "Nuôi lead đúng nhịp",
            title: "Muốn tăng tỷ lệ MQL → SQL mà không spam?",
            subline:
              "Bứt Phá thiết kế chuỗi nurturing theo ngành — email, Zalo, remarketing và lead scoring gắn với CRM.",
            primary: { label: "Tư vấn miễn phí", href: "/lien-he" },
            secondary: { label: "Xem Marketing Automation", href: "/marketing-automation" },
          },
        }}
      />
    </DeepPageShell>
  );
}
