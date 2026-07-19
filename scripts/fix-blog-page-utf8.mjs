import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "app/blog/page.tsx");

const content = `import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { getPublishedBlogs } from "@/lib/server-blog";
import { BlogSearchGrid } from "@/components/blog/BlogSearchGrid";
import { BlogTopicNav } from "@/components/blog/BlogTopicNav";
import { BlogCaseStudyStrip } from "@/components/blog/BlogCaseStudyStrip";
import { BlogIndustryNav } from "@/components/blog/BlogIndustryNav";

const BASE_URL = SITE_URL;
const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

/** Next.js yeu cau literal — khong import bien cho segment config. */
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Tin t\\u1ee9c Marketing | B\\u1ee9t Ph\\u00e1 Marketing",
  description:
    "Th\\u01b0 vi\\u1ec7n b\\u00e0i vi\\u1ebft marketing th\\u1ef1c chi\\u1ebfn, t\\u1ed1i \\u01b0u SEO v\\u00e0 t\\u0103ng tr\\u01b0\\u1edfng doanh thu.",
  path: "/blog",
  keywords: [
    "tin t\\u1ee9c marketing",
    "ki\\u1ebfn th\\u1ee9c marketing",
    "seo website",
    "facebook ads",
    "google maps",
  ],
});

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();
  const growthPillars = [
    {
      href: "/website",
      title: "Thi\\u1ebft k\\u1ebf website",
      desc: "Money Page \\u2014 d\\u1ecbch v\\u1ee5 thi\\u1ebft k\\u1ebf website chu\\u1ea9n SEO.",
    },
    {
      href: "/facebook",
      title: "Facebook Marketing",
      desc: "Money Page \\u2014 Fanpage, content v\\u00e0 Meta Ads.",
    },
    {
      href: "/google-maps",
      title: "Google Maps",
      desc: "Money Page \\u2014 GBP, Local SEO v\\u00e0 review th\\u1eadt.",
    },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tin t\\u1ee9c Marketing",
    url: \`\${BASE_URL}/blog\`,
    description:
      "Th\\u01b0 vi\\u1ec7n b\\u00e0i vi\\u1ebft marketing th\\u1ef1c chi\\u1ebfn, t\\u1ed1i \\u01b0u SEO v\\u00e0 t\\u0103ng tr\\u01b0\\u1edfng doanh thu.",
    inLanguage: "vi-VN",
    isPartOf: { "@type": "WebSite", name: "B\\u1ee9t Ph\\u00e1 Marketing", url: BASE_URL },
    hasPart: blogs.slice(0, 12).map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      url: \`\${BASE_URL}/blog/\${blog.slug}\`,
      datePublished: blog.publishedAt || new Date(blog.timestamp).toISOString(),
    })),
  };

  const listItems = blogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    description: blog.description,
    metaDescription: blog.metaDescription,
    keywordsMain: blog.keywordsMain,
    keywordsSecondary: blog.keywordsSecondary,
    imageUrl: blog.imageUrl,
    slug: blog.slug,
    hot: blog.hot,
    publishedAt: blog.publishedAt,
    timestamp: blog.timestamp,
  }));

  return (
    <main className="relative min-h-screen overflow-hidden deep-theme text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(196,149,90,0.16), transparent 58%), radial-gradient(ellipse 45% 40% at 88% 18%, rgba(139,124,246,0.14), transparent 55%), radial-gradient(ellipse 40% 35% at 12% 40%, rgba(109,90,230,0.08), transparent 50%), radial-gradient(ellipse 40% 30% at 20% 30%, rgba(234,88,12,0.06), transparent)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-14 flex flex-col gap-8 border-b border-white/[0.06] pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-200/70">
              Ki\\u1ebfn th\\u1ee9c th\\u1ef1c chi\\u1ebfn
            </p>
            <h1
              className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-white"
              style={serif}
            >
              Tin t\\u1ee9c &amp; Ki\\u1ebfn th\\u1ee9c
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/45 sm:text-[15px]">
              C\\u1eadp nh\\u1eadt xu h\\u01b0\\u1edbng, chi\\u1ebfn l\\u01b0\\u1ee3c v\\u00e0 ki\\u1ebfn th\\u1ee9c marketing gi\\u00fap doanh nghi\\u1ec7p t\\u0103ng tr\\u01b0\\u1edfng b\\u1ec1n v\\u1eefng.
            </p>
          </div>

          <Link
            href="/website"
            className="inline-flex items-center gap-2 self-start rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-[#0b0d12] hover:bg-amber-100"
          >
            Thi\\u1ebft k\\u1ebf website
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mb-5">
          <BlogTopicNav active="all" variant="deep" />
        </div>

        <div className="mb-10">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/50">
            Silo theo ng\\u00e0nh
          </p>
          <BlogIndustryNav variant="deep" />
        </div>

        <BlogCaseStudyStrip variant="deep" />

        <section className="mb-12 border-t border-white/[0.06] pt-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55">Growth Pillars</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl" style={serif}>
            N\\u1ec1n t\\u1ea3ng t\\u0103ng tr\\u01b0\\u1edfng
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {growthPillars.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-l border-amber-200/25 pl-5 transition hover:border-amber-200/50"
              >
                <p className="text-lg font-medium text-white/90">{item.title}</p>
                <p className="mt-2 text-sm text-white/40">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <BlogSearchGrid blogs={listItems} variant="deep" />
      </div>
    </main>
  );
}
`;

// Decode unicode escapes in string literals by evaluating as JS template via Function
const decoded = content.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
  String.fromCharCode(parseInt(hex, 16)),
);

fs.writeFileSync(file, decoded, "utf8");
console.log("Wrote", file, "bytes", fs.statSync(file).size);
console.log(fs.readFileSync(file, "utf8").split("\n")[17]);
