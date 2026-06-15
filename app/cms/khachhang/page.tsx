import { Suspense } from "react";
import Link from "next/link";
import { CustomerManagement } from "@/components/admin/CustomerManagement";

export const metadata = {
  title: "Quản lý khách hàng | CMS",
  robots: { index: false, follow: false },
};

function CmsKhachHangFallback() {
  return <div className="min-h-screen bg-[#0b0f19] p-8 text-white">Đang tải...</div>;
}

export default function CmsKhachHangPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19]">
      <div className="border-b border-white/10 bg-[#111827]">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-4 py-2.5 sm:px-6">
          <Link
            href="/cms"
            className="text-xs font-semibold text-violet-300 hover:text-violet-200 hover:underline"
          >
            ← CMS Dashboard
          </Link>
          <span className="text-xs text-gray-500">|</span>
          <Link
            href="/cms/tax"
            className="text-xs font-semibold text-orange-300 hover:text-orange-200 hover:underline"
          >
            Trách nhiệm thuế →
          </Link>
          <span className="text-xs text-gray-500">|</span>
          <span className="text-xs font-bold text-white">Quản lý Khách Hàng</span>
          <span className="text-xs text-gray-500">
            Nguồn chính — tự đồng bộ ERP (thu/chi, kỳ thu, HĐ)
          </span>
        </div>
      </div>
      <Suspense fallback={<CmsKhachHangFallback />}>
        <CustomerManagement variant="cms" />
      </Suspense>
    </div>
  );
}
