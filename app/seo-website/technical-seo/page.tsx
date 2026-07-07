import Link from "next/link";
import { SubLandingPage } from "@/components/landing/SubLandingPage";
import { buildFaqSchema, buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";

export const metadata = generateLandingMetadata({
  path: "/seo-website/technical-seo",
  title: "Technical SEO: audit crawl/index/CWV",
  description:
    "Dịch vụ Technical SEO giúp website crawl tốt, index chuẩn, cải thiện Core Web Vitals và giảm thất thoát traffic kỹ thuật.",
  keywords: ["technical seo", "audit seo kỹ thuật", "core web vitals", "crawl index"],
});

const faqs = [
  {
    q: "Technical SEO khác SEO Content thế nào?",
    a: "Technical SEO xử lý nền móng: crawl, index, tốc độ, schema, canonical. SEO Content xử lý chủ đề, từ khóa và internal link. Cần cả hai để tăng trưởng bền.",
  },
  {
    q: "Audit Technical SEO mất bao lâu?",
    a: "Audit ban đầu thường 3–7 ngày làm việc. Khắc phục lỗi nghiêm trọng ưu tiên trong 2–4 tuần, tối ưu CWV có thể kéo dài 4–8 tuần tùy codebase.",
  },
  {
    q: "Website WordPress có cần Technical SEO riêng không?",
    a: "Có. WordPress dễ phát sinh duplicate URL, plugin nặng, schema thiếu và CWV kém — cần audit kỹ thuật trước khi đẩy content scale.",
  },
];

export default function TechnicalSeoPage() {
  const serviceLd = buildServiceSchema({
    name: "Technical SEO",
    path: "/seo-website/technical-seo",
    description:
      "Audit toàn bộ lớp kỹ thuật của website: crawl, index, canonical, schema và hiệu năng để tăng trưởng organic bền vững.",
    serviceType: "Technical SEO",
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
            { label: "Technical SEO" },
          ],
          eyebrow: "SEO Website",
          title: "Technical SEO — audit kỹ thuật toàn diện",
          intro: (
            <>
              Trước khi viết thêm bài, hãy chắc Google <strong>crawl, index và hiển thị</strong> website đúng
              cách. Technical SEO xử lý robots, sitemap, canonical, schema, internal link và Core Web Vitals —
              mở trần cho content và backlink phát huy hiệu quả.
            </>
          ),
          ctas: [
            { label: "Audit Technical SEO miễn phí", href: "/lien-he", primary: true },
            { label: "SEO Content", href: "/seo-website/seo-content" },
            { label: "Thiết kế website", href: "/website" },
          ],
          painIntro: "Nhiều website có content tốt nhưng traffic không tăng vì lỗi kỹ thuật âm thầm:",
          painPoints: [
            "Trang quan trọng không được index hoặc bị index nhầm bản duplicate",
            "Canonical sai — Google chọn URL không phải money page",
            "CWV kém (LCP, CLS) làm giảm ranking và tỷ lệ chuyển đổi",
            "Schema thiếu/sai — mất rich result và tín hiệu entity",
            "Internal link yếu — PageRank không chảy về trang ưu tiên",
          ],
          featuresTitle: "Hạng mục audit & tối ưu",
          features: [
            "Crawl & index: robots.txt, sitemap, noindex, redirect chain",
            "URL governance: canonical, hreflang (nếu có), trailing slash",
            "On-page kỹ thuật: title, meta, heading, alt, structured data",
            "Core Web Vitals: LCP, INP, CLS — ưu tiên mobile",
            "Log analysis & Search Console: phát hiện trang orphan, 404, soft 404",
            "Báo cáo ưu tiên: critical → high → medium kèm checklist khắc phục",
          ],
          process: [
            { step: "01", title: "Audit baseline", desc: "Quét toàn site + GSC + PageSpeed — lập bản đồ lỗi." },
            { step: "02", title: "Ưu tiên khắc phục", desc: "Sửa index, canonical, redirect trước — impact cao nhất." },
            { step: "03", title: "Schema & entity", desc: "Bổ sung Organization, Service, FAQ, Breadcrumb JSON-LD." },
            { step: "04", title: "CWV & performance", desc: "Tối ưu ảnh, font, JS client-heavy, caching." },
            { step: "05", title: "Monitor", desc: "Theo dõi GSC 2–4 tuần, điều chỉnh theo dữ liệu thật." },
          ],
          kpis: [
            <>
              Case tham chiếu:{" "}
              <Link href="/du-an/nha-khoa-dang-khoa" className="font-semibold underline">
                15,4K impressions / 471 clicks
              </Link>{" "}
              sau technical + content cluster
            </>,
            "Giảm lỗi index/crawl trong GSC Coverage",
            "Cải thiện CWV từ Needs Improvement → Good (mục tiêu từng URL)",
            "Tăng khả năng rich result nhờ schema chuẩn",
          ],
          relatedLinks: [
            { href: "/seo-website", label: "SEO Website", desc: "Pillar dịch vụ SEO tổng thể" },
            { href: "/seo-website/seo-content", label: "SEO Content", desc: "Topic cluster sau nền kỹ thuật vững" },
            { href: "/blog/thiet-ke-website-chuan-seo", label: "Website chuẩn SEO", desc: "Checklist on-page cho dev" },
            { href: "/kien-thuc/seo-website", label: "Knowledge Hub SEO", desc: "Tài nguyên học & triển khai" },
          ],
          faqs,
          ctaBand: {
            eyebrow: "Bắt đầu từ nền móng",
            title: "Website cần audit kỹ thuật trước khi scale content?",
            subline: "Bứt Phá Marketing audit miễn phí lớp technical — báo cáo ưu tiên rõ ràng, không cam kết ảo.",
            primary: { label: "Nhận audit miễn phí", href: "/lien-he" },
            secondary: { label: "Xem SEO Website", href: "/seo-website" },
          },
        }}
      />
    </main>
  );
}
