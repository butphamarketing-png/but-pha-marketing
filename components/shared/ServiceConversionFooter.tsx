import Link from "next/link";
import { ZaloConsultCta } from "@/components/blog/ZaloConsultCta";

export function ServiceConversionFooter({ title = "Tư vấn & tài liệu liên quan" }: { title?: string }) {
  return (
    <section className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-8">
      <h2 className="text-xl font-bold text-indigo-950">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">
        Xem thêm hướng dẫn trên{" "}
        <Link href="/blog" className="font-semibold text-violet-700 underline">
          blog
        </Link>
        , case study tại{" "}
        <Link href="/du-an" className="font-semibold text-violet-700 underline">
          dự án tiêu biểu
        </Link>{" "}
        hoặc{" "}
        <Link href="/website" className="font-semibold text-violet-700 underline">
          xem dịch vụ thiết kế website
        </Link>
        .
      </p>
      <div className="mt-4">
        <ZaloConsultCta />
      </div>
    </section>
  );
}
