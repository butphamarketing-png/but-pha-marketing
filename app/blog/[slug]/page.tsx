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
    title: blog.title,
    description: blog.metaDescription || blog.description,
    alternates: { canonical },
    openGraph: {
      title: blog.title,
      description: blog.metaDescription || blog.description,
      url: canonical,
      type: "article",
      publishedTime: blog.publishedAt || undefined,
      images: [{ url: image, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
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
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-4xl font-black leading-tight">{blog.title}</h1>
      <p className="mt-2 text-xs text-gray-400">Ngày viết: {new Date(blog.publishedAt || blog.timestamp).toLocaleDateString("vi-VN")}</p>
      {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="mt-6 h-72 w-full rounded-2xl object-cover" />}
      <article className="prose prose-invert mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </main>
  );
}
