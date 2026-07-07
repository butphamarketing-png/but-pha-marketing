import Link from "next/link";
import { notFound } from "next/navigation";
import { buildServiceSchema, generateLandingMetadata } from "@/lib/landing-seo";
import { SITE_URL } from "@/lib/seo";
import { getLocalSeoLanding, LOCAL_SEO_LANDINGS, resolveIndexPolicy } from "@/lib/programmatic-seo";

type Params = { location: string };

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return LOCAL_SEO_LANDINGS.map((item) => ({ location: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { location } = await params;
  const landing = getLocalSeoLanding(location);
  if (!landing) return {};

  return generateLandingMetadata({
    path: `/seo-website/dia-phuong/${landing.slug}`,
    title: landing.title,
    description: landing.description,
    keywords: [landing.primaryKeyword, "seo website", "seo địa phương"],
    indexPolicy: resolveIndexPolicy(landing.qualityScore),
  });
}

export default async function LocalSeoProgrammaticPage({ params }: { params: Promise<Params> }) {
  const { location } = await params;
  const landing = getLocalSeoLanding(location);
  if (!landing) notFound();

  const indexable = resolveIndexPolicy(landing.qualityScore) === "index";
  const serviceLd = buildServiceSchema({
    name: landing.title,
    path: `/seo-website/dia-phuong/${landing.slug}`,
    description: landing.description,
    serviceType: "SEO Website theo địa phương",
  });
  const canonical = `${SITE_URL}/seo-website/dia-phuong/${landing.slug}`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "SEO Website", item: `${SITE_URL}/seo-website` },
      {
        "@type": "ListItem",
        position: 3,
        name: "SEO theo địa phương",
        item: `${SITE_URL}/seo-website/dia-phuong/ho-chi-minh`,
      },
      { "@type": "ListItem", position: 4, name: landing.title, item: canonical },
    ],
  };
  const clusterLinks = [
    { href: "/seo-website", name: "Pillar SEO Website" },
    { href: "/kien-thuc/seo-website", name: "Knowledge hub SEO" },
    { href: "/lien-he", name: "Tư vấn SEO địa phương" },
  ];
  const clusterItemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Liên kết cụm địa phương: ${landing.title}`,
    itemListElement: clusterLinks.map((link, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}${link.href}`,
      name: link.name,
    })),
  };

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clusterItemListLd) }} />
      <div className="mx-auto max-w-5xl space-y-8">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="font-medium text-indigo-700 hover:text-indigo-900">
                Trang chủ
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li>
              <Link href="/seo-website" className="font-medium text-indigo-700 hover:text-indigo-900">
                SEO Website
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li className="font-semibold text-indigo-950" aria-current="page">
              {landing.title}
            </li>
          </ol>
        </nav>
        <h1 className="text-4xl font-black tracking-tight text-indigo-950">{landing.title}</h1>
        <p className="text-lg leading-8 text-slate-600">{landing.description}</p>
        <p className="text-sm font-semibold text-violet-700">
          Keyword chính: {landing.primaryKeyword} · Quality score: {landing.qualityScore}/100 ·{" "}
          {indexable ? "Đang index" : "Đang noindex (pilot)"}
        </p>

        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
          <h2 className="text-xl font-bold text-emerald-900">Proof SEO địa phương</h2>
          <ul className="mt-3 space-y-2 text-emerald-950">
            <li>- Case benchmark: Nha Khoa Đăng Khoa đạt 15,4K impressions và 471 clicks từ GSC.</li>
            <li>- Mô hình local SEO: landing địa phương + cluster nội dung + case link nội bộ.</li>
            <li>
              - Tham chiếu tại <Link href="/du-an/nha-khoa-dang-khoa" className="underline">case study có số liệu</Link>.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-indigo-100 bg-white p-6">
          <h2 className="text-xl font-bold text-indigo-950">Liên kết cụm địa phương</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {clusterLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={link.href === "/lien-he" ? "brand-btn-primary" : "brand-btn-secondary"}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-100 bg-white p-6">
          <h2 className="text-xl font-bold text-indigo-950">Câu hỏi thường gặp</h2>
          <p className="mt-3 text-slate-600">
            SEO địa phương thường cần 8-12 tuần để thấy tín hiệu đầu tiên nếu đã có landing chuẩn và cụm nội
            dung hỗ trợ.
          </p>
        </section>
      </div>
    </main>
  );
}
