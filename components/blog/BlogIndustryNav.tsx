import Link from "next/link";
import { INDUSTRY_HUBS, INDUSTRY_HUB_SLUGS } from "@/lib/industry-hub";

export function BlogIndustryNav({ active }: { active?: string }) {
  return (
    <nav aria-label="Silo theo ngành" className="flex flex-wrap gap-2">
      {INDUSTRY_HUB_SLUGS.map((slug) => {
        const hub = INDUSTRY_HUBS[slug];
        const isActive = active === slug;
        return (
          <Link
            key={slug}
            href={`/blog/nganh/${slug}`}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
              isActive
                ? "border-emerald-300 bg-emerald-600 text-white"
                : "border-indigo-100 bg-white text-indigo-900 hover:border-emerald-200 hover:text-emerald-700"
            }`}
          >
            {hub.headline.replace("Website & SEO ngành ", "")}
          </Link>
        );
      })}
    </nav>
  );
}
