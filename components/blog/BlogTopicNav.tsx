import Link from "next/link";
import { BLOG_TOPIC_HUBS, BLOG_TOPIC_SLUGS, type BlogTopicSlug } from "@/lib/blog-topic-hub";

export function BlogTopicNav({ active }: { active?: BlogTopicSlug | "all" }) {
  return (
    <nav aria-label="Chủ đề tin tức" className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
          active === "all" || !active
            ? "border-violet-300 bg-violet-600 text-white"
            : "border-indigo-100 bg-white text-indigo-900 hover:border-violet-200 hover:text-violet-700"
        }`}
      >
        Tất cả
      </Link>
      {BLOG_TOPIC_SLUGS.map((slug) => {
        const hub = BLOG_TOPIC_HUBS[slug];
        const isActive = active === slug;
        return (
          <Link
            key={slug}
            href={`/blog/chu-de/${slug}`}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
              isActive
                ? "border-violet-300 bg-violet-600 text-white"
                : "border-indigo-100 bg-white text-indigo-900 hover:border-violet-200 hover:text-violet-700"
            }`}
          >
            {hub.headline.split(",")[0].split("&")[0].trim()}
          </Link>
        );
      })}
    </nav>
  );
}
