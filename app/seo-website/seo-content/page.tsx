import Link from "next/link";
import { SubLandingPage } from "@/components/landing/SubLandingPage";
import { buildFaqSchema, buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/seo-website/seo-content",
  title: "SEO Content: topic cluster và intent",
  description:
    "Triển khai SEO Content theo cụm chủ đề và intent để tăng phủ từ khóa, tăng traffic chất lượng và tăng lead.",
  keywords: ["seo content", "topic cluster", "content seo", "search intent seo"],
});

const faqs = [
  {
    q: "SEO Content khác viết blog thông thường như thế nào?",
    a: "SEO Content dựa trên cụm chủ đề (pillar → cluster), intent tìm kiếm và internal link có chủ đích — không đăng bài rời rạc theo cảm hứng.",
  },
  {
    q: "Bao lâu thì cụm content bắt đầu tăng traffic?",
    a: "Thường 2–3 tháng có tín hiệu rõ nếu technical SEO ổn và internal link đúng cấu trúc silo.",
  },
  {
    q: "Làm sao tránh cannibalization từ khóa?",
    a: "Mỗi URL có 1 intent chính; money page, pillar và cluster được phân vai rõ — canonical và internal link điều hướng juice đúng hướng.",
  },
];

export default function SeoContentPage() {
  const serviceLd = buildServiceSchema({
    name: "SEO Content",
    path: "/seo-website/seo-content",
    description: "Xây dựng content engine theo cluster và intent để mở rộng độ phủ từ khóa có chuyển đổi.",
    serviceType: "SEO Content",
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
            { label: "SEO Website", href: "/seo-website" },
            { label: "SEO Content" },
          ],
          eyebrow: "SEO Website",
          title: "SEO Content — topic cluster & search intent",
          intro: (
            <>
              Xây <strong>content engine</strong> từ pillar → cluster → proof article để tăng topical authority,
              phủ từ khóa dài và chuyển hướng traffic về money page — không cannibalization, có số liệu thật.
            </>
          ),
          ctas: [
            { label: "Tư vấn SEO Content", href: "/lien-he", primary: true },
            { label: "Pillar thiết kế website", href: "/blog/thiet-ke-website" },
            { label: "Technical SEO", href: "/seo-website/technical-seo" },
          ],
          painPoints: [
            "Đăng bài nhiều nhưng không tạo cụm chủ đề — Google không hiểu site về gì",
            "Nhiều URL cùng tranh một từ khóa (cannibalization)",
            "Bài viết thiếu proof, FAQ và CTA — traffic không chuyển đổi",
            "Internal link ngẫu nhiên — pillar không nhận đủ authority",
          ],
          features: [
            "Keyword mapping theo intent: informational, commercial, transactional",
            "Pillar page + cluster ngành/địa phương/checklist/template",
            "Internal link silo + hub chủ đề (/blog/chu-de/website)",
            "Proof layer: case study GSC, số liệu, FAQ schema",
            "Content calendar 90 ngày — ưu tiên URL có ROI cao",
            "Đo lường: impressions, clicks, position theo cụm từ khóa",
          ],
          process: [
            { step: "01", title: "Audit intent & gap", desc: "Phân tích SERP, đối thủ và khoảng trống từ khóa." },
            { step: "02", title: "Kiến trúc silo", desc: "Vẽ pillar, cluster, money page và luồng internal link." },
            { step: "03", title: "Sản xuất content", desc: "Viết/rewrite theo chuẩn EEAT + checklist on-page." },
            { step: "04", title: "Publish & link", desc: "Xuất bản, interlink, schema FAQ/Article." },
            { step: "05", title: "Refresh", desc: "Cập nhật bài cũ, bổ sung proof — content freshness." },
          ],
          kpis: [
            <>
              Mô hình đã áp dụng:{" "}
              <Link href="/blog/thiet-ke-website" className="font-semibold underline">
                pillar thiết kế website
              </Link>{" "}
              + 1000+ bài cluster
            </>,
            "Tăng impressions theo cụm head term và long-tail ngành",
            "Giảm cannibalization nhờ URL governance rõ vai trò",
            "Tăng lead từ blog nhờ CTA và link về /website",
          ],
          relatedLinks: [
            { href: "/blog/chu-de/website", label: "Hub chủ đề Website", desc: "Silo blog website & SEO" },
            { href: "/website", label: "Thiết kế website", desc: "Money page chuyển đổi" },
            { href: "/du-an", label: "Case study", desc: "Proof layer có số liệu" },
            { href: "/seo-website/technical-seo", label: "Technical SEO", desc: "Nền kỹ thuật trước content" },
          ],
          faqs,
          ctaBand: {
            title: "Muốn content scale mà vẫn có chất lượng?",
            subline: "Bứt Phá thiết kế cụm chủ đề, viết/rewrite và interlink theo chuẩn SEO thực chiến.",
            primary: { label: "Đặt lịch tư vấn", href: "/lien-he" },
            secondary: { label: "Hub kiến thức SEO", href: "/kien-thuc/seo-website" },
          },
        }}
      />
    </main>
  );
}
