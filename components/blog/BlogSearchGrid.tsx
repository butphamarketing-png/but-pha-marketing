"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Flame, Search, X } from "lucide-react";
import { matchesBlogSearch, resolveBlogTag, type BlogListItem } from "@/lib/blog-utils";
import { BlogLeadPopup } from "@/components/blog/BlogLeadPopup";
import { BlogOptimizedImage } from "@/components/blog/BlogOptimizedImage";

export function BlogSearchGrid({ blogs }: { blogs: BlogListItem[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return blogs.filter((blog) => matchesBlogSearch(blog, query));
  }, [blogs, query]);

  return (
    <>
      <div className="mb-8 rounded-[1.75rem] border border-indigo-100 bg-white p-4 shadow-brand md:p-5">
        <label htmlFor="blog-search" className="mb-2 block text-sm font-semibold text-indigo-950">
          Tìm bài viết
        </label>
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-violet-500" />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo từ khóa: SEO, website, Facebook, thiết kế..."
            className="w-full rounded-2xl border border-indigo-100 bg-indigo-50/40 py-3 pl-11 pr-11 text-sm text-indigo-950 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-indigo-50 hover:text-indigo-700"
              aria-label="Xóa tìm kiếm"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {filtered.length}/{blogs.length} bài viết
          {query ? ` cho "${query}"` : ""}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[1.75rem] border border-dashed border-indigo-200 bg-white px-6 py-16 text-center">
          <p className="text-lg font-bold text-indigo-950">Không tìm thấy bài phù hợp</p>
          <p className="mt-2 text-sm text-slate-600">Thử từ khóa khác hoặc xem toàn bộ thư viện bài viết.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-indigo-100 bg-white shadow-brand transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-brand-lg"
            >
              <div className="relative overflow-hidden">
                <BlogOptimizedImage
                  src={blog.imageUrl || "/mascot-home.png"}
                  alt={blog.title}
                  width={640}
                  height={448}
                  sizes="card"
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/50 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-indigo-900 shadow-sm">
                  <CalendarDays size={14} className="text-violet-600" />
                  {new Date(blog.publishedAt || blog.timestamp).toLocaleDateString("vi-VN")}
                </div>
                {blog.hot && (
                  <div className="absolute right-4 top-4 rounded-full bg-orange-500 p-2 text-white shadow-md">
                    <Flame size={16} />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="mb-3 inline-flex self-start rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-700">
                  {resolveBlogTag(blog.title, blog.slug || "")}
                </span>
                <h2 className="line-clamp-2 text-lg font-black leading-snug text-indigo-950 transition group-hover:text-violet-700">
                  {blog.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{blog.description}</p>
                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 transition group-hover:gap-3">
                    Xem chi tiết
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <BlogLeadPopup source="blog-list" />
    </>
  );
}
