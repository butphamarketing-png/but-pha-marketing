import Link from "next/link";
import type { BlogTopicSlug } from "@/lib/blog-topic-hub";

export function BlogTopicPagination({
  topic,
  page,
  totalPages,
}: {
  topic: BlogTopicSlug;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const base = `/blog/chu-de/${topic}`;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => {
    if (totalPages <= 7) return true;
    return p === 1 || p === totalPages || Math.abs(p - page) <= 1;
  });

  return (
    <nav aria-label="Phân trang" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link
          href={page === 2 ? base : `${base}?page=${page - 1}`}
          className="rounded-xl border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-indigo-900 hover:border-violet-200"
        >
          ← Trước
        </Link>
      )}
      {pages.map((p, idx) => {
        const prev = pages[idx - 1];
        const showEllipsis = prev != null && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-2">
            {showEllipsis && <span className="px-1 text-slate-400">…</span>}
            <Link
              href={p === 1 ? base : `${base}?page=${p}`}
              className={`min-w-[2.5rem] rounded-xl border px-3 py-2 text-center text-sm font-semibold ${
                p === page
                  ? "border-violet-300 bg-violet-600 text-white"
                  : "border-indigo-100 bg-white text-indigo-900 hover:border-violet-200"
              }`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </Link>
          </span>
        );
      })}
      {page < totalPages && (
        <Link
          href={`${base}?page=${page + 1}`}
          className="rounded-xl border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-indigo-900 hover:border-violet-200"
        >
          Sau →
        </Link>
      )}
    </nav>
  );
}
