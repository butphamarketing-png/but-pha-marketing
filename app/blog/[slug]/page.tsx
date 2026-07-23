import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { buildBlogJsonLd, buildBlogMetadataKeywords } from "@/lib/blog-schema";
import { getBlogIndexDecision } from "@/lib/blog-index-policy";
import { buildBlogAbsoluteTitle } from "@/lib/blog-seo";
import { detectPillarTopic } from "@/lib/seo-pillar-hub";
import { getCaseStudySlugForBlog } from "@/lib/case-study-industry-map";
import { getBlogBySlug, getPublishedBlogSlugs, getRelatedBlogsForSlug } from "@/lib/server-blog";
import { getBlogThumbnailAlt } from "@/lib/news-images";
import { toBlogCardItem } from "@/lib/blog-utils";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { BlogCaseStudyBanner } from "@/components/blog/BlogCaseStudyBanner";
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
  const imageAlt = getBlogThumbnailAlt({
    slug: blogPath,
    keywordsMain: blog.keywordsMain,
    title: blog.title,
  });
  const keywords = buildBlogMetadataKeywords(blog);
  const title = buildBlogAbsoluteTitle(blog.metaTitle || blog.title);
  const description = blog.metaDescription || blog.description;
  const indexDecision = getBlogIndexDecision(blog);
  const robotsCanonical = indexDecision.index ? canonical : indexDecision.canonical;

  return {
    title: { absolute: title },
    description,
    keywords,
    robots: {
      index: indexDecision.index,
      follow: true,
      googleBot: {
        index: indexDecision.index,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: { canonical: robotsCanonical },
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
  const imageAlt = getBlogThumbnailAlt({
    slug: blogPath,
    keywordsMain: blog.keywordsMain,
    title: blog.title,
  });
  const publishedLabel = new Date(blog.publishedAt || blog.timestamp).toLocaleDateString("vi-VN");
  const jsonLd = buildBlogJsonLd({ blog, canonical, baseUrl: BASE_URL, image });
  const topic = detectPillarTopic({ slug: blogPath, keywordsMain: blog.keywordsMain, title: blog.title });
  const linkedCaseStudy = getCaseStudySlugForBlog(blogPath);

  return (
    <main className="relative min-h-screen overflow-hidden deep-theme text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[40vh]"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(196,149,90,0.16), transparent 58%), radial-gradient(ellipse 45% 40% at 88% 18%, rgba(139,124,246,0.14), transparent 55%), radial-gradient(ellipse 40% 35% at 12% 40%, rgba(109,90,230,0.08), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 py-12 pb-28 sm:px-6 md:py-16 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/40">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="font-medium text-white/40 hover:text-white">
                Trang chủ
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/25">
              /
            </li>
            <li>
              <Link href="/blog" className="font-medium text-white/40 hover:text-white">
                Tin tức
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/25">
              /
            </li>
            <li className="line-clamp-1 font-medium text-white/70" aria-current="page">
              {blog.title}
            </li>
          </ol>
        </nav>

        <section className="overflow-hidden border border-white/[0.08] bg-[#0c0d12]">
          <div className="border-b border-white/[0.06] px-6 py-10 md:px-10 md:py-14">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
              Bài viết
            </span>
            <h1
              className="mt-5 max-w-4xl text-[1.75rem] font-semibold leading-snug tracking-tight text-white sm:text-[2.05rem]"
             
            >
              {blog.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/45">
              <span className="border border-white/10 bg-white/[0.03] px-3 py-1.5 font-medium text-white/40">
                Ngày đăng: {publishedLabel}
              </span>
              {blog.metaDescription && (
                <span className="max-w-2xl text-sm text-white/40">{blog.metaDescription}</span>
              )}
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
                className="aspect-[16/9] h-auto w-full border border-white/[0.08] object-contain md:max-h-[24rem]"
              />
            </div>
          )}

          <div className="px-6 py-8 md:px-10 md:py-10">
            <article className="article-prose article-prose--deep">
              <BlogArticleContent html={blog.content} />
            </article>
            {linkedCaseStudy && <BlogCaseStudyBanner caseStudySlug={linkedCaseStudy} variant="deep" />}
          </div>
        </section>

        <BlogInlineCTA slug={blogPath} topic={topic} variant="deep" />
        <BlogPillarHub slug={blogPath} keywordsMain={blog.keywordsMain} title={blog.title} variant="deep" />
        <RelatedPosts posts={related.map(toBlogCardItem)} currentSlug={blogPath} variant="deep" />
        <BlogArticleExtras slug={blogPath} topic={topic} variant="deep" />
      </div>
    </main>
  );
}
