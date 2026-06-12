import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { getBlogBySlug } from "@/lib/server-blog";

const BASE_URL = SITE_URL;
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
    <main className="brand-section-muted mx-auto min-h-screen max-w-5xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="brand-card overflow-hidden">
        <div className="relative overflow-hidden border-b border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/40 px-6 py-10 md:px-10 md:py-14">
          <div className="relative">
            <span className="brand-eyebrow inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5">
              Bài viết
            </span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-indigo-950 md:text-5xl">
              {blog.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="rounded-full border border-indigo-200 bg-white px-3 py-1.5 font-semibold text-indigo-900">
                Ngày đăng: {publishedLabel}
              </span>
              {blog.metaDescription && (
                <span className="max-w-2xl text-sm text-slate-600">{blog.metaDescription}</span>
              )}
            </div>
          </div>
        </div>

        {blog.imageUrl && (
          <div className="px-6 pt-6 md:px-10 md:pt-8">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="h-72 w-full rounded-[1.75rem] border border-indigo-100 object-cover shadow-brand md:h-[24rem]"
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
