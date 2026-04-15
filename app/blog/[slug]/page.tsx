import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/server-blog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.butphamarketing.com";

type Params = { slug: string };

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();
  return blogs.map((blog) => ({ slug: blog.slug || blog.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return {};
  const canonical = `${BASE_URL}/blog/${blog.slug}`;
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
      images: blog.imageUrl ? [{ url: blog.imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.metaDescription || blog.description,
      images: blog.imageUrl ? [blog.imageUrl] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    datePublished: blog.publishedAt || new Date(blog.timestamp).toISOString(),
    dateModified: blog.publishedAt || new Date(blog.timestamp).toISOString(),
    description: blog.metaDescription || blog.description,
    image: blog.imageUrl ? [blog.imageUrl] : [],
    author: [{ "@type": "Organization", name: "Bứt Phá Marketing" }],
    publisher: { "@type": "Organization", name: "Bứt Phá Marketing" },
    mainEntityOfPage: `${BASE_URL}/blog/${blog.slug}`,
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

