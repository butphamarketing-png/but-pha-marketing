import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { resolveBlogTag, type BlogCardItem } from "@/lib/blog-utils";
import { BlogOptimizedImage } from "@/components/blog/BlogOptimizedImage";

export function RelatedPosts({ posts }: { posts: BlogCardItem[] }) {
  if (!posts.length) return null;

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
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50/30 transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-brand"
          >
            <div className="relative overflow-hidden">
              <BlogOptimizedImage
                src={blog.imageUrl || "/logo.png"}
                alt={blog.title}
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
          </Link>
        ))}
      </div>
    </section>
  );
}
