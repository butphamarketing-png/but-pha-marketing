import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { getPublishedBlogs } from "@/lib/server-blog";
import { BlogSearchGrid } from "@/components/blog/BlogSearchGrid";
import { BlogTopicNav } from "@/components/blog/BlogTopicNav";
import { BlogTopicPillarCards } from "@/components/blog/BlogTopicPillarCards";
import { BlogInlineCTA } from "@/components/blog/BlogInlineCTA";
import {
  filterBlogsByTopic,
  getBlogTopicHub,
  getPillarsForTopic,
  isBlogTopicSlug,
  sortTopicBlogs,
  toBlogListItems,
  BLOG_TOPIC_SLUGS,
} from "@/lib/blog-topic-hub";

const BASE_URL = SITE_URL;

export const revalidate = 3600;
export const dynamicParams = false;

type Params = { topic: string };

export function generateStaticParams() {
  return BLOG_TOPIC_SLUGS.map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { topic } = await params;
  if (!isBlogTopicSlug(topic)) return {};

  const hub = getBlogTopicHub(topic);
  const canonical = `${BASE_URL}/blog/chu-de/${topic}`;

  return {
    title: `${hub.title} | Bứt Phá Marketing`,
    description: hub.description,
    alternates: { canonical },
    openGraph: {
      title: hub.title,
      description: hub.description,
      url: canonical,
      type: "website",
      locale: "vi_VN",
      siteName: "Bứt Phá Marketing",
      images: [{ url: `${BASE_URL}/opengraph.jpg`, alt: hub.title }],
    },
  };
}

export default async function BlogTopicHubPage({ params }: { params: Promise<Params> }) {
  const { topic } = await params;
  if (!isBlogTopicSlug(topic)) notFound();

  const hub = getBlogTopicHub(topic);
  const allBlogs = await getPublishedBlogs();
  const topicBlogs = sortTopicBlogs(filterBlogsByTopic(allBlogs, topic));
  const pillars = getPillarsForTopic(topic);
  const canonical = `${BASE_URL}/blog/chu-de/${topic}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.title,
    url: canonical,
    description: hub.description,
    inLanguage: "vi-VN",
    isPartOf: { "@type": "Blog", "@id": `${BASE_URL}/blog#blog`, name: "Tin tức Marketing" },
    hasPart: topicBlogs.slice(0, 12).map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      url: `${BASE_URL}/blog/${blog.slug}`,
      datePublished: blog.publishedAt || new Date(blog.timestamp).toISOString(),
    })),
  };

  return (
    <main className="min-h-screen bg-background brand-section-muted px-4 py-12 md:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-7xl">
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
            <li className="font-semibold text-indigo-950" aria-current="page">
              {hub.headline}
            </li>
          </ol>
        </nav>

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="brand-eyebrow mb-4">Chủ đề silo</p>
            <h1 className="text-4xl font-bold tracking-tight text-indigo-950 md:text-5xl">{hub.headline}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{hub.description}</p>
            <p className="mt-3 text-sm font-semibold text-violet-700">
              {topicBlogs.length} bài viết trong chủ đề này
            </p>
          </div>

          <Link href={hub.serviceHref} className="brand-btn-primary self-start">
            {hub.serviceLabel}
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mb-8">
          <BlogTopicNav active={topic} />
        </div>

        <BlogTopicPillarCards pillars={pillars} />

        <BlogInlineCTA slug={`chu-de-${topic}`} topic={hub.topic} />

        <BlogSearchGrid blogs={toBlogListItems(topicBlogs)} />
      </div>
    </main>
  );
}
