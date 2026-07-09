import Link from "next/link";
import { WEBSITE_INDUSTRY_CATALOG } from "@/lib/website-industry-catalog";

export function WebsiteIndustryGrid({ id = "theo-nganh" }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-3xl border border-indigo-100 bg-white p-6 md:p-10">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Thiết kế website theo ngành</p>
      <h2 className="mt-2 text-2xl font-bold text-indigo-950 md:text-3xl">
        22+ ngành — landing chuyên sâu chuẩn SEO
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
        Mỗi ngành có trang dịch vụ riêng: tính năng đặc thù, FAQ, liên kết hub blog và case study — mô hình silo
        giống đối thủ hàng đầu, tối ưu cho từ khóa «thiết kế website + ngành».
      </p>
      <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {WEBSITE_INDUSTRY_CATALOG.map((item) => (
          <Link
            key={item.slug}
            href={`/website/nganh/${item.slug}`}
            className="rounded-xl border border-indigo-50 bg-indigo-50/20 px-4 py-3 text-sm font-semibold text-indigo-900 transition hover:border-violet-200 hover:bg-violet-50/50 hover:text-violet-900"
          >
            {item.label}
          </Link>
        ))}
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
