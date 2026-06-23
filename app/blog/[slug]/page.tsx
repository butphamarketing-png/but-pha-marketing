import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { buildBlogJsonLd, buildBlogMetadataKeywords } from "@/lib/blog-schema";
import { buildBlogAbsoluteTitle } from "@/lib/blog-seo";
import { detectPillarTopic } from "@/lib/seo-pillar-hub";
import { getBlogBySlug, getPublishedBlogSlugs, getRelatedBlogsForSlug } from "@/lib/server-blog";
import { toBlogCardItem } from "@/lib/blog-utils";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { BlogPillarHub } from "@/components/blog/BlogPillarHub";
import { BlogInlineCTA } from "@/components/blog/BlogInlineCTA";
import { BlogArticleExtras } from "@/components/blog/BlogArticleExtras";
import { BlogArticleContent } from "@/components/blog/BlogArticleContent";
import { BlogOptimizedImage } from "@/components/blog/BlogOptimizedImage";

const BASE_URL = SITE_URL;

/** Next.js yêu cầu literal — không import biến cho segment config. */
export const revalidate = 3600;
export const dynamicParams = true;

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return {};
  const blogPath = blog.slug || blog.id;
  const canonical = `${BASE_URL}/blog/${blogPath}`;
  const image = blog.imageUrl || `${BASE_URL}/opengraph.jpg`;
  const imageAlt = blog.keywordsMain?.trim() || blog.title;
  const keywords = buildBlogMetadataKeywords(blog);
  const title = buildBlogAbsoluteTitle(blog.metaTitle || blog.title);
  const description = blog.metaDescription || blog.description;

  return {
    title: { absolute: title },
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      locale: "vi_VN",
      siteName: "Bứt Phá Marketing",
      publishedTime: blog.publishedAt || undefined,
      modifiedTime: blog.updatedAt || blog.publishedAt || undefined,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();
  const related = await getRelatedBlogsForSlug(slug, 4);
  const blogPath = blog.slug || blog.id;
  const canonical = `${BASE_URL}/blog/${blogPath}`;
  const image = blog.imageUrl || `${BASE_URL}/opengraph.jpg`;
  const imageAlt = blog.keywordsMain?.trim() || blog.title;
  const publishedLabel = new Date(blog.publishedAt || blog.timestamp).toLocaleDateString("vi-VN");
  const jsonLd = buildBlogJsonLd({ blog, canonical, baseUrl: BASE_URL, image });
  const topic = detectPillarTopic({ slug: blogPath, keywordsMain: blog.keywordsMain, title: blog.title });

  return (
    <main className="brand-section-muted mx-auto min-h-screen max-w-5xl px-4 py-10 pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600">
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
            <Link href="/blog" className="font-medium text-indigo-700 hover:text-indigo-900">
              Tin tức
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-400">
            /
          </li>
          <li className="line-clamp-1 font-semibold text-indigo-950" aria-current="page">
            {blog.title}
          </li>
        </ol>
      </nav>

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
            <BlogOptimizedImage
              src={image}
              alt={imageAlt}
              width={1200}
              height={675}
              priority
              sizes="hero"
              className="h-72 w-full rounded-[1.75rem] border border-indigo-100 object-cover shadow-brand md:h-[24rem]"
            />
          </div>
        )}

        <div className="px-6 py-8 md:px-10 md:py-10">
          <article className="article-prose">
            <BlogArticleContent html={blog.content} />
          </article>
        </div>
      </section>

      <BlogInlineCTA slug={blogPath} topic={topic} />
      <BlogPillarHub slug={blogPath} keywordsMain={blog.keywordsMain} title={blog.title} />
      <RelatedPosts posts={related.map(toBlogCardItem)} currentSlug={blogPath} />
      <BlogArticleExtras slug={blogPath} topic={topic} />
    </main>
  );
}
