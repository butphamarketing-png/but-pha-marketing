"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Flame, Search, X } from "lucide-react";
import { matchesBlogSearch, resolveBlogTag, type BlogListItem } from "@/lib/blog-utils";
import { getBlogThumbnailAlt } from "@/lib/news-images";
import { BlogOptimizedImage } from "@/components/blog/BlogOptimizedImage";

export function BlogSearchGrid({
  blogs,
  variant = "light",
}: {
  blogs: BlogListItem[];
  variant?: "light" | "deep";
}) {
  const [query, setQuery] = useState("");
  const deep = variant === "deep";

  const filtered = useMemo(() => {
    return blogs.filter((blog) => matchesBlogSearch(blog, query));
  }, [blogs, query]);

  return (
    <>
      <div
        className={
          deep
            ? "mb-8 border border-white/[0.08] bg-white/[0.02] p-4 md:p-5"
            : "mb-8 rounded-[1.75rem] border border-indigo-100 bg-white p-4 shadow-brand md:p-5"
        }
      >
        <label
          htmlFor="blog-search"
          className={deep ? "mb-2 block text-sm font-medium text-white/80" : "mb-2 block text-sm font-semibold text-indigo-950"}
        >
          Tìm bài viết
        </label>
        <div className="relative">
          <Search
            size={18}
            className={
              deep
                ? "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                : "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-violet-500"
            }
          />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo từ khóa: SEO, website, Facebook, thiết kế..."
            className={
              deep
                ? "w-full border border-white/12 bg-[#0c0d12] py-3 pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/20"
                : "w-full rounded-2xl border border-indigo-100 bg-indigo-50/40 py-3 pl-11 pr-11 text-sm text-indigo-950 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
            }
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className={
                deep
                  ? "absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white"
                  : "absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-indigo-50 hover:text-indigo-700"
              }
              aria-label="Xóa tìm kiếm"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <p className={deep ? "mt-2 text-xs text-white/35" : "mt-2 text-xs text-slate-500"}>
          {filtered.length}/{blogs.length} bài viết
          {query ? ` cho "${query}"` : ""}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div
          className={
            deep
              ? "border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center"
              : "rounded-[1.75rem] border border-dashed border-indigo-200 bg-white px-6 py-16 text-center"
          }
        >
          <p className={deep ? "text-lg font-medium text-white" : "text-lg font-bold text-indigo-950"}>
            Không tìm thấy bài phù hợp
          </p>
          <p className={deep ? "mt-2 text-sm text-white/45" : "mt-2 text-sm text-slate-600"}>
            Thử từ khóa khác hoặc xem toàn bộ thư viện bài viết.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className={
                deep
                  ? "group flex h-full flex-col overflow-hidden border border-white/[0.08] bg-white/[0.02] transition duration-300 hover:border-white/15"
                  : "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-indigo-100 bg-white shadow-brand transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-brand-lg"
              }
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
                  height={448}
                  sizes="card"
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className={
                    deep
                      ? "absolute inset-0 bg-gradient-to-t from-[#08090c]/80 via-transparent to-transparent"
                      : "absolute inset-0 bg-gradient-to-t from-indigo-950/50 via-transparent to-transparent"
                  }
                />
                <div
                  className={
                    deep
                      ? "absolute left-4 top-4 inline-flex items-center gap-2 border border-white/15 bg-[#08090c]/85 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
                      : "absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-indigo-900 shadow-sm"
                  }
                >
                  <CalendarDays size={14} className={deep ? "text-white/40" : "text-violet-600"} />
                  {new Date(blog.publishedAt || blog.timestamp).toLocaleDateString("vi-VN")}
                </div>
                {blog.hot && (
                  <div
                    className={
                      deep
                        ? "absolute right-4 top-4 border border-white/20 bg-[#6D5CE6] p-2 text-white"
                        : "absolute right-4 top-4 rounded-full bg-orange-500 p-2 text-white shadow-md"
                    }
                  >
                    <Flame size={16} />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span
                  className={
                    deep
                      ? "mb-3 inline-flex self-start border border-white/15 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-white/40"
                      : "mb-3 inline-flex self-start rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-700"
                  }
                >
                  {resolveBlogTag(blog.title, blog.slug || "")}
                </span>
                <h2
                  className={
                    deep
                      ? "line-clamp-2 text-lg font-medium leading-snug text-white transition group-hover:text-white/80"
                      : "line-clamp-2 text-lg font-black leading-snug text-indigo-950 transition group-hover:text-violet-700"
                  }
                >
                  {blog.title}
                </h2>
                <p className={deep ? "mt-3 line-clamp-3 text-sm leading-relaxed text-white/40" : "mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600"}>
                  {blog.description}
                </p>
                <div className="mt-auto pt-6">
                  <span
                    className={
                      deep
                        ? "inline-flex items-center gap-2 text-sm font-medium text-white/70 transition group-hover:gap-3"
                        : "inline-flex items-center gap-2 text-sm font-bold text-violet-600 transition group-hover:gap-3"
                    }
                  >
                    Xem chi tiết
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

    </>
  );
}
