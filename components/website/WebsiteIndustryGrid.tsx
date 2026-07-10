import Link from "next/link";
import { WEBSITE_INDUSTRY_CATALOG } from "@/lib/website-industry-catalog";
import { getWebsiteIndustryHero } from "@/lib/website-industry-images";
import { IndustryMockupImage } from "@/components/website/IndustryMockupImage";

export function WebsiteIndustryGrid({ id = "theo-nganh" }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-3xl border border-indigo-100 bg-white p-6 md:p-10">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Thiết kế website theo ngành</p>
      <h2 className="mt-2 text-2xl font-bold text-indigo-950 md:text-3xl">
        22+ ngành — landing chuyên sâu chuẩn SEO
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
        Mỗi ngành có trang dịch vụ riêng kèm mockup thật: tính năng đặc thù, FAQ, liên kết hub blog và case study —
        mô hình silo tối ưu từ khóa «thiết kế website + ngành».
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WEBSITE_INDUSTRY_CATALOG.map((item) => {
          const hero = getWebsiteIndustryHero({
            catalogSlug: item.slug,
            primaryKeyword: item.primaryKeyword,
            blogMoneySlug: item.blogMoneySlug,
            title: item.title,
          });
          return (
            <Link
              key={item.slug}
              href={`/website/nganh/${item.slug}`}
              className="group overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm transition hover:border-violet-200 hover:shadow-md"
            >
              <div className="flex items-start justify-center bg-indigo-50 p-2">
                <IndustryMockupImage
                  src={hero.src}
                  alt={hero.alt}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
                  className="max-h-56"
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-sm font-bold text-indigo-950 group-hover:text-violet-800">{item.label}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{item.primaryKeyword}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Không thấy ngành của bạn?{" "}
        <Link href="/lien-he" className="font-semibold text-violet-700 underline">
          Tư vấn website theo yêu cầu
        </Link>
      </p>
    </section>
  );
}
