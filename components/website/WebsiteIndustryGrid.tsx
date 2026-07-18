import Link from "next/link";
import { WEBSITE_INDUSTRY_CATALOG } from "@/lib/website-industry-catalog";
import { getWebsiteIndustryCardThumbnail } from "@/lib/website-industry-images";
import { IndustryMockupImage } from "@/components/website/IndustryMockupImage";

const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' } as const;

export function WebsiteIndustryGrid({
  id = "theo-nganh",
  variant = "light",
}: {
  id?: string;
  variant?: "light" | "deep";
}) {
  const deep = variant === "deep";

  return (
    <section
      id={id}
      className={`scroll-mt-24 ${
        deep
          ? "border-t border-white/[0.06] pt-14"
          : "rounded-3xl border border-indigo-100 bg-white p-6 md:p-10"
      }`}
    >
      <p
        className={
          deep
            ? "text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/55"
            : "text-xs font-bold uppercase tracking-wider text-slate-500"
        }
      >
        Thiết kế website theo ngành
      </p>
      <h2
        className={
          deep
            ? "mt-3 text-3xl font-semibold text-white md:text-4xl"
            : "mt-2 text-2xl font-bold text-indigo-950 md:text-3xl"
        }
        style={deep ? serif : undefined}
      >
        22+ ngành — landing chuyên sâu chuẩn SEO
      </h2>
      <p
        className={
          deep
            ? "mt-4 max-w-2xl text-sm leading-relaxed text-white/45"
            : "mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base"
        }
      >
        Mỗi ngành có trang dịch vụ riêng kèm mockup thật: tính năng đặc thù, FAQ, hub blog và case study — silo «thiết
        kế website + ngành».
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {WEBSITE_INDUSTRY_CATALOG.map((item) => {
          const thumb = getWebsiteIndustryCardThumbnail(item.slug, item.primaryKeyword);
          return (
            <Link
              key={item.slug}
              href={`/website/nganh/${item.slug}`}
              className={`group overflow-hidden transition ${
                deep
                  ? "border border-white/[0.06] bg-white/[0.02] hover:border-amber-200/25 hover:bg-white/[0.04]"
                  : "rounded-2xl border border-indigo-100 bg-white shadow-sm hover:border-violet-200 hover:shadow-md"
              }`}
            >
              <IndustryMockupImage
                variant="card"
                src={thumb.src}
                alt={thumb.alt}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"
              />
              <div className="px-4 py-3">
                <p
                  className={`text-sm font-medium ${
                    deep ? "text-white/85 group-hover:text-amber-100" : "font-bold text-indigo-950 group-hover:text-violet-800"
                  }`}
                >
                  {item.label}
                </p>
                <p className={`mt-0.5 line-clamp-1 text-xs ${deep ? "text-white/35" : "text-slate-500"}`}>
                  {item.primaryKeyword}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <p className={`mt-6 text-sm ${deep ? "text-white/40" : "text-slate-500"}`}>
        Không thấy ngành của bạn?{" "}
        <Link
          href="/banggia"
          className={deep ? "font-semibold text-amber-200/80 underline-offset-2 hover:underline" : "font-semibold text-violet-700 underline"}
        >
          Xem báo giá thiết kế website
        </Link>
      </p>
    </section>
  );
}
