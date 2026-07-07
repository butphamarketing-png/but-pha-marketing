import { SubLandingPage } from "@/components/landing/SubLandingPage";
import { buildFaqSchema, generateLandingMetadata } from "@/lib/landing-seo";
import { SITE_URL } from "@/lib/seo";

export const metadata = generateLandingMetadata({
  path: "/kien-thuc",
  title: "Trung tâm kiến thức Marketing",
  description:
    "Resource Center của Bứt Phá Marketing: hướng dẫn, checklist, template, so sánh và tài liệu thực chiến cho Website, SEO, Maps, Facebook, Automation và AI.",
  keywords: ["kien thuc marketing", "resource center", "checklist marketing", "template website"],
});

const faqs = [
  {
    q: "Trung tâm kiến thức khác blog thế nào?",
    a: "Blog là bài viết chi tiết theo từ khóa. Trung tâm kiến thức là hub điều hướng theo chủ đề dịch vụ — giúp bạn chọn lộ trình học và triển khai đúng thứ tự.",
  },
  {
    q: "Nên bắt đầu từ hub nào?",
    a: "Doanh nghiệp mới: Website → SEO. Đã có website: SEO Website hoặc Google Maps (nếu có cửa hàng). Có nhiều lead: Marketing Automation. Muốn scale content: AI Marketing.",
  },
  {
    q: "Có case study thật không?",
    a: "Có. Mỗi hub liên kết tới case study có số liệu GSC, Facebook Insights — xem tại /du-an.",
  },
];

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Trung tâm kiến thức Marketing",
  url: `${SITE_URL}/kien-thuc`,
  inLanguage: "vi-VN",
  isPartOf: {
    "@type": "WebSite",
    name: "Bứt Phá Marketing",
    url: SITE_URL,
  },
  about: [
    { "@type": "Thing", name: "Website Marketing" },
    { "@type": "Thing", name: "SEO Website" },
    { "@type": "Thing", name: "Marketing Automation" },
    { "@type": "Thing", name: "AI Marketing" },
  ],
};

export default function KnowledgeCenterPage() {
  const faqLd = buildFaqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SubLandingPage
        config={{
          breadcrumbs: [
            { label: "Trang chủ", href: "/" },
            { label: "Kiến thức" },
          ],
          eyebrow: "Resource Center",
          title: "Trung tâm kiến thức Marketing",
          intro:
            "Hệ sinh thái tri thức thực chiến cho doanh nghiệp: tự học, tự đánh giá và triển khai marketing theo hệ thống — Website, SEO, Google Maps, Facebook, Automation và AI. Mỗi hub dẫn tới pillar, checklist, template và case study có số liệu.",
          ctas: [
            { label: "Tư vấn lộ trình học", href: "/lien-he", primary: true },
            { label: "Xem case study", href: "/du-an" },
            { label: "Blog đầy đủ", href: "/blog" },
          ],
          painTitle: "Vì sao cần học theo hệ thống?",
          painIntro: "Đọc bài rời rạc dễ làm sai thứ tự — tốn tiền mà không ra lead.",
          painPoints: [
            "Làm ads trước khi có landing page/Fanpage chuẩn chuyển đổi",
            "Viết blog không theo silo — Google không hiểu chủ đề chính",
            "Không có checklist triển khai — bỏ sót technical SEO hoặc form lead",
            "Thiếu proof thật — khách không tin khi so sánh agency",
          ],
          featuresTitle: "Lộ trình học theo chủ đề",
          features: [
            "Website: pillar thiết kế website A-Z + báo giá + checklist ngành",
            "SEO Website: technical SEO → content cluster → local SEO",
            "Google Maps & Facebook: hub blog chuyên sâu + dịch vụ triển khai",
            "Marketing Automation: lead nurturing + CRM pipeline",
            "AI Marketing: AI Content Ops + AI Search Optimization",
            "Case study: số liệu GSC, Facebook Insights, trước/sau triển khai",
          ],
          processTitle: "Cách dùng Resource Center",
          process: [
            { step: "01", title: "Chọn hub chủ đề", desc: "SEO, Automation, AI — theo mục tiêu kinh doanh hiện tại." },
            { step: "02", title: "Đọc pillar + checklist", desc: "Nắm framework trước khi đọc bài lẻ trong blog." },
            { step: "03", title: "Áp dụng template", desc: "Dùng template/checklist ngành để triển khai nhanh hơn." },
            { step: "04", title: "Đối chiếu proof", desc: "So sánh với case study có số liệu thật tại /du-an." },
            { step: "05", title: "Liên hệ tư vấn", desc: "Khi cần triển khai dịch vụ — Bứt Phá hỗ trợ end-to-end." },
          ],
          kpiTitle: "Tài nguyên nổi bật",
          kpis: [
            <>Pillar: <strong>Thiết kế website A-Z</strong> — hướng dẫn đầy đủ từ khảo sát đến SEO.</>,
            <>Case study: <strong>Nha Khoa Đăng Khoa</strong> — 15,4K impressions, 471 clicks GSC.</>,
            <>Checklist ngành: nha khoa, xây dựng, spa, PCCC — triển khai theo silo 7 URL.</>,
          ],
          relatedTitle: "Knowledge Hub theo dịch vụ",
          relatedLinks: [
            { href: "/kien-thuc/seo-website", label: "SEO Website", desc: "Technical SEO, content cluster, audit checklist." },
            { href: "/kien-thuc/marketing-automation", label: "Marketing Automation", desc: "Lead nurturing, CRM, funnel marketing-sales." },
            { href: "/kien-thuc/ai-marketing", label: "AI Marketing", desc: "AI Content Ops, AI Search Optimization." },
            { href: "/website", label: "Dịch vụ Website", desc: "Money page thiết kế website chuẩn SEO." },
            { href: "/blog/thiet-ke-website", label: "Pillar thiết kế website", desc: "Hướng dẫn chi tiết A-Z." },
            { href: "/blog/chu-de/website", label: "Hub blog Website", desc: "Cụm bài theo chủ đề website." },
            { href: "/blog/chu-de/facebook", label: "Hub blog Facebook", desc: "Kiến thức Fanpage và Meta Ads." },
            { href: "/blog/chu-de/google-maps", label: "Hub blog Google Maps", desc: "Local SEO và GBP." },
            { href: "/du-an", label: "Case study", desc: "Dự án có số liệu GSC và social proof." },
          ],
          faqs,
          ctaBand: {
            eyebrow: "Cần lộ trình riêng?",
            title: "Nhận tư vấn Resource Center theo ngành",
            subline: "Chúng tôi gợi ý thứ tự học và triển khai phù hợp quy mô doanh nghiệp của bạn.",
            primary: { label: "Đặt lịch tư vấn", href: "/lien-he" },
            secondary: { label: "Xem dịch vụ Website", href: "/website" },
          },
        }}
      />
    </main>
  );
}
