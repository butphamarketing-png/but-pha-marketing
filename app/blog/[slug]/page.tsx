import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogBySlug } from "@/lib/server-blog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com";
export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return {};
  const blogPath = blog.slug || blog.id;
  const canonical = `${BASE_URL}/blog/${blogPath}`;
  const image = blog.imageUrl || `${BASE_URL}/opengraph.jpg`;
  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.description,
    alternates: { canonical },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.description,
      url: canonical,
      type: "article",
      publishedTime: blog.publishedAt || undefined,
      images: [{ url: image, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.description,
      images: [image],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();
  const blogPath = blog.slug || blog.id;
  const canonical = `${BASE_URL}/blog/${blogPath}`;
  const publishedDate = blog.publishedAt || new Date(blog.timestamp).toISOString();
  const image = blog.imageUrl || `${BASE_URL}/opengraph.jpg`;
  const publishedLabel = new Date(blog.publishedAt || blog.timestamp).toLocaleDateString("vi-VN");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    datePublished: publishedDate,
    dateModified: publishedDate,
    description: blog.metaDescription || blog.description,
    image: [image],
    inLanguage: "vi-VN",
    url: canonical,
    author: [{ "@type": "Organization", name: "Bứt Phá Marketing" }],
    publisher: {
      "@type": "Organization",
      name: "Bứt Phá Marketing",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.jpg`,
      },
    },
    mainEntityOfPage: canonical,
  };

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_32px_90px_rgba(7,5,16,0.42)] backdrop-blur-sm">
        <div className="relative overflow-hidden border-b border-white/10 px-6 py-10 md:px-10 md:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.35),transparent_35%),radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]" />
          <div className="relative">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-extrabold uppercase tracking-[0.28em] text-cyan-200">
              Bài viết SEO
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.05em] text-white md:text-6xl">
              {blog.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Ngày viết: {publishedLabel}</span>
              {blog.metaDescription && (
                <span className="max-w-2xl text-sm text-slate-300/90">{blog.metaDescription}</span>
              )}
            </div>
          </div>
        </div>

        {blog.imageUrl && (
          <div className="px-6 pt-6 md:px-10 md:pt-8">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="h-72 w-full rounded-[1.75rem] border border-white/10 object-cover shadow-[0_18px_50px_rgba(0,0,0,0.28)] md:h-[24rem]"
            />
          </div>
        )}

        <div className="px-6 py-8 md:px-10 md:py-10">
          <article className="article-prose" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </section>
    </main>
  );
}
