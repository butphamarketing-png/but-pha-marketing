import Link from "next/link";
import { SubLandingPage } from "@/components/landing/SubLandingPage";
import { DeepPageShell } from "@/components/shared/DeepPageShell";
import { buildFaqSchema, buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/marketing-automation/crm-automation",
  title: "CRM Automation: đồng bộ lead và sales",
  description:
    "Thiết lập CRM Automation để phân loại lead, giao việc cho sales, theo dõi pipeline và tối ưu tỷ lệ chốt.",
  keywords: ["crm automation", "tự động hóa crm", "quản trị lead", "pipeline sales"],
});

const features = [
  "Thu lead tập trung từ website, form, Zalo, fanpage và Google Maps",
  "Phân loại lead tự động theo nguồn, ngành và mức độ quan tâm",
  "Giao lead cho sales đúng người, đúng thời điểm — không bỏ sót",
  "Pipeline trực quan: mới → đang tư vấn → báo giá → chốt / thất bại",
  "Nhắc việc follow-up, SLA phản hồi và báo cáo hiệu suất đội sales",
  "Dashboard funnel: biết kênh nào tạo lead chất, giai đoạn nào rò rỉ",
];

const process = [
  { step: "01", title: "Khảo sát quy trình", desc: "Map luồng lead hiện tại từ marketing → sales → chăm sóc sau bán." },
  { step: "02", title: "Chuẩn hóa dữ liệu", desc: "Thống nhất trường thông tin, nguồn lead và quy tắc phân loại." },
  { step: "03", title: "Tích hợp kênh", desc: "Nối website, CRM, Zalo và ads để lead vào một hệ thống duy nhất." },
  { step: "04", title: "Thiết lập automation", desc: "Workflow phân tuyến, nhắc việc, chuyển trạng thái và báo cáo tự động." },
  { step: "05", title: "Đo lường & tối ưu", desc: "Theo dõi KPI funnel, điều chỉnh quy tắc routing và giảm lead thất thoát." },
];

const faqs = [
  {
    q: "CRM Automation giúp cải thiện gì cho đội sales?",
    a: "Giảm bỏ sót lead, phân bổ nhanh hơn và theo dõi pipeline theo thời gian thực — từ đó tăng tỷ lệ phản hồi và chốt sale.",
  },
  {
    q: "Có thể tích hợp CRM Automation với website hiện tại không?",
    a: "Có. Form website, nút Zalo và landing page có thể đẩy lead thẳng vào CRM kèm nguồn, UTM và thời gian ghi nhận.",
  },
  {
    q: "Doanh nghiệp nhỏ có cần CRM Automation không?",
    a: "Nên có khi bạn nhận lead từ 2+ kênh hoặc có 2+ người sales — nếu không, lead dễ trùng, chậm hoặc mất trong inbox cá nhân.",
  },
  {
    q: "CRM Automation khác Lead Nurturing thế nào?",
    a: "CRM Automation tập trung quản trị pipeline và giao việc cho sales. Lead Nurturing tập trung chuỗi chăm sóc tự động trước khi chuyển sang sales.",
  },
];

export default function CrmAutomationPage() {
  const serviceLd = buildServiceSchema({
    name: "CRM Automation",
    path: "/marketing-automation/crm-automation",
    description: "Đồng bộ lead marketing với sales và tự động phân tuyến theo quy tắc chuyển đổi.",
    serviceType: "CRM Automation",
  });
  const faqLd = buildFaqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <DeepPageShell padded>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SubLandingPage
        config={{
          breadcrumbs: [
            { label: "Trang chủ", href: "/" },
            { label: "Marketing Automation", href: "/marketing-automation" },
            { label: "CRM Automation" },
          ],
          eyebrow: "Marketing Automation",
          title: "CRM Automation — đồng bộ lead & sales",
          intro: (
            <>
              Đừng để lead từ website, fanpage hay Google Maps rơi vào Excel hoặc chat cá nhân.{" "}
              <strong>CRM Automation</strong> giúp marketing và sales làm việc trên cùng một pipeline — phân loại,
              giao việc, nhắc follow-up và đo hiệu quả từng kênh.
            </>
          ),
          ctas: [
            { label: "Tư vấn CRM Automation", href: "/lien-he", primary: true },
            { label: "Thiết kế website thu lead", href: "/website" },
            { label: "Lead Nurturing", href: "/marketing-automation/lead-nurturing" },
          ],
          painTitle: "Vì sao cần CRM Automation?",
          painIntro:
            "Khi lead tăng, vấn đề không phải thiếu khách — mà là mất lead giữa marketing và sales: phản hồi chậm, không biết ai phụ trách, không đo được kênh nào ra đơn.",
          painPoints: [
            "Lead vào nhiều inbox, không có người sở hữu rõ ràng",
            "Sales bỏ sót follow-up vì thiếu nhắc việc tự động",
            "Marketing không biết lead nào chuyển thành doanh thu",
            "Báo cáo thủ công — số liệu chậm và không nhất quán",
          ],
          featuresTitle: "Tính năng triển khai",
          features,
          processTitle: "Quy trình 5 bước",
          process,
          kpiTitle: "KPI tham chiếu sau triển khai",
          kpis: [
            <>
              Giảm <strong>20–35%</strong> lead thất thoát do phản hồi chậm hoặc không phân công
            </>,
            <>
              Tăng <strong>15–25%</strong> tỷ lệ lead được sales liên hệ trong SLA 15–30 phút
            </>,
            "Biết rõ kênh nào tạo lead chất lượng — tối ưu ngân sách marketing",
            <>
              Kết hợp{" "}
              <Link href="/du-an/nha-khoa-dang-khoa" className="font-semibold text-amber-200/80 underline-offset-2 hover:underline">
                case study website + SEO
              </Link>{" "}
              để lead organic vào CRM bền vững
            </>,
          ],
          relatedTitle: "Liên kết trong hệ sinh thái",
          relatedLinks: [
            { href: "/marketing-automation", label: "Marketing Automation", desc: "Tổng quan hệ thống automation" },
            { href: "/marketing-automation/lead-nurturing", label: "Lead Nurturing", desc: "Nuôi dưỡng trước khi chuyển sales" },
            { href: "/website", label: "Thiết kế website", desc: "Form thu lead chuẩn CRM" },
            { href: "/kien-thuc/marketing-automation", label: "Kiến thức Automation", desc: "Hub tài nguyên & checklist" },
          ],
          faqs,
          ctaBand: {
            eyebrow: "Sẵn sàng triển khai",
            title: "Muốn hệ thống CRM gọn — không rối?",
            subline:
              "Bứt Phá Marketing khảo sát quy trình hiện tại, đề xuất workflow phù hợp quy mô SME và tích hợp với website / ads đang chạy.",
            primary: { label: "Đặt lịch tư vấn miễn phí", href: "/lien-he" },
            secondary: { label: "Xem Marketing Automation", href: "/marketing-automation" },
          },
        }}
      />
    </DeepPageShell>
  );
}
