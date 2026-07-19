import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { resolveBlogTag, type BlogCardItem } from "@/lib/blog-utils";
import { getBlogThumbnailAlt } from "@/lib/news-images";
import { BlogOptimizedImage } from "@/components/blog/BlogOptimizedImage";
import { BlogTrackedLink } from "@/components/blog/BlogTrackedLink";


export function RelatedPosts({
  posts,
  currentSlug,
  variant = "light",
}: {
  posts: BlogCardItem[];
  currentSlug?: string;
  variant?: "light" | "deep";
}) {
  if (!posts.length) return null;

  const deep = variant === "deep";

  if (deep) {
    return (
      <section className="mt-10 border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
              Đọc tiếp
            </p>
            <h2 className="text-xl font-semibold text-white sm:text-[1.35rem]">
              Bài viết liên quan
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden text-sm font-medium text-white/65 hover:text-white/80 md:inline-flex md:items-center md:gap-1"
          >
            Xem tất cả
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((blog) => (
            <BlogTrackedLink
              key={blog.id}
              href={`/blog/${blog.slug}`}
              eventName="blog_related_click"
              eventParams={{
                from_slug: currentSlug,
                to_slug: blog.slug || blog.id,
              }}
              className="group flex h-full flex-col overflow-hidden border border-white/[0.08] bg-[#0c0d12] transition hover:border-white/15"
            >
              <div className="relative overflow-hidden border-b border-white/[0.06]">
                <BlogOptimizedImage
                  src={blog.imageUrl || "/logo.png"}
                  alt={getBlogThumbnailAlt({
                    slug: blog.slug,
                    keywordsMain: blog.keywordsMain,
                    title: blog.title,
                  })}
                  width={640}
                  height={360}
                  sizes="card"
                  className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 border border-white/20 bg-[#08090c]/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/70 backdrop-blur-sm">
                  {resolveBlogTag(blog.title, blog.slug || "")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="line-clamp-2 text-sm font-medium leading-snug text-white/90 group-hover:text-white/80">
                  {blog.title}
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/40">{blog.description}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-white/35">
                  <CalendarDays size={12} />
                  {new Date(blog.publishedAt || blog.timestamp).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </BlogTrackedLink>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 rounded-[1.75rem] border border-indigo-100 bg-white p-6 shadow-brand md:p-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="brand-eyebrow mb-2">Đọc tiếp</p>
          <h2 className="text-2xl font-black text-indigo-950 md:text-3xl">Bài viết liên quan</h2>
        </div>
        <Link href="/blog" className="hidden text-sm font-bold text-violet-600 hover:text-violet-700 md:inline-flex md:items-center md:gap-1">
          Xem tất cả
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((blog) => (
          <BlogTrackedLink
            key={blog.id}
            href={`/blog/${blog.slug}`}
            eventName="blog_related_click"
            eventParams={{
              from_slug: currentSlug,
              to_slug: blog.slug || blog.id,
            }}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50/30 transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-brand"
          >
            <div className="relative overflow-hidden">
              <BlogOptimizedImage
                src={blog.imageUrl || "/logo.png"}
                alt={getBlogThumbnailAlt({
                  slug: blog.slug,
                  keywordsMain: blog.keywordsMain,
                  title: blog.title,
                })}
                width={640}
                height={360}
                sizes="card"
                className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-700">
                {resolveBlogTag(blog.title, blog.slug || "")}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <p className="line-clamp-2 text-sm font-bold leading-snug text-indigo-950 group-hover:text-violet-700">
                {blog.title}
              </p>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">{blog.description}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-slate-500">
                <CalendarDays size={12} />
                {new Date(blog.publishedAt || blog.timestamp).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </BlogTrackedLink>
        ))}
      </div>
    </section>
  );
}
