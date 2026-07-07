import Link from "next/link";
import { SubLandingPage } from "@/components/landing/SubLandingPage";
import { buildFaqSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/kien-thuc/seo-website",
  title: "Knowledge Hub SEO Website",
  description:
    "Trung tâm kiến thức SEO Website: technical SEO, content SEO, audit checklist và hướng dẫn triển khai theo cụm chủ đề.",
  keywords: ["kien thuc seo website", "technical seo", "content seo", "audit seo"],
});

const faqs = [
  {
    q: "Nên bắt đầu học SEO Website từ đâu?",
    a: "Technical SEO nền tảng (crawl, index, CWV) → sau đó content cluster và internal link silo.",
  },
  {
    q: "SEO Website mất bao lâu có kết quả?",
    a: "Từ khóa ít cạnh tranh: 1–3 tháng. Head term và ngành cạnh tranh: 3–6 tháng trở lên với content + link bền vững.",
  },
  {
    q: "Cần thiết kế lại website hay chỉ SEO?",
    a: "Nếu CWV kém, cấu trúc URL lộn xộn hoặc không mobile-friendly — nên cải tạo kỹ thuật song song với content.",
  },
];

export default function KnowledgeSeoWebsitePage() {
  const faqLd = buildFaqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SubLandingPage
        config={{
          breadcrumbs: [
            { label: "Trang chủ", href: "/" },
            { label: "Kiến thức", href: "/kien-thuc" },
            { label: "SEO Website" },
          ],
          eyebrow: "Resource Center",
          title: "Knowledge Hub: SEO Website",
          intro: (
            <>
              Tài nguyên cốt lõi cho <strong>SEO Website</strong>: kỹ thuật vững, content cluster có intent, proof
              số liệu và chuyển đổi về money page — mô hình Bứt Phá đang áp dụng cho cụm «thiết kế website».
            </>
          ),
          ctas: [
            { label: "Dịch vụ SEO Website", href: "/seo-website", primary: true },
            { label: "Thiết kế website", href: "/website" },
            { label: "Pillar A-Z", href: "/blog/thiet-ke-website" },
          ],
          features: [
            "Technical SEO: crawl, index, schema, CWV",
            "SEO Content: pillar, cluster, hub chủ đề",
            "Local SEO: Google Maps, GBP (nếu có địa phương)",
            "Internal link silo và URL governance",
            "Case study & proof: GSC screenshots",
            "Checklist triển khai theo ngành",
          ],
          process: [
            { step: "01", title: "Audit", desc: "Technical + content gap + đối thủ SERP." },
            { step: "02", title: "Kiến trúc", desc: "Pillar, money page, cluster map." },
            { step: "03", title: "Triển khai", desc: "Sửa kỹ thuật + xuất bản content ưu tiên." },
            { step: "04", title: "Interlink", desc: "Hub, pillar block, CTA chuyển đổi." },
            { step: "05", title: "Đo & tối ưu", desc: "GSC weekly, refresh content, backlink." },
          ],
          kpis: [
            <>
              Proof:{" "}
              <Link href="/du-an/nha-khoa-dang-khoa" className="font-semibold underline">
                15,4K impressions / 471 clicks
              </Link>
            </>,
            "Health score SEO ops nội bộ: 93+ (audit automation)",
            "1000+ bài blog cluster website đã chuẩn hóa meta & pillar link",
          ],
          relatedLinks: [
            { href: "/seo-website/technical-seo", label: "Technical SEO", desc: "Audit kỹ thuật" },
            { href: "/seo-website/seo-content", label: "SEO Content", desc: "Topic cluster" },
            { href: "/blog/chu-de/website", label: "Hub chủ đề Website", desc: "Silo blog" },
            { href: "/blog/bao-gia-thiet-ke-website", label: "Báo giá website", desc: "Commercial intent" },
          ],
          faqs,
          ctaBand: {
            title: "Cần lộ trình SEO Website rõ ràng?",
            subline: "Bứt Phá audit miễn phí và đề xuất phase 1–2–3 theo ngân sách SME.",
            primary: { label: "Nhận tư vấn", href: "/lien-he" },
            secondary: { label: "Xem dịch vụ SEO", href: "/seo-website" },
          },
        }}
      />
    </main>
  );
}
