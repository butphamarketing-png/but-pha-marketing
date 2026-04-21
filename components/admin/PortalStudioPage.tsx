"use client";

import Link from "next/link";
import { ArrowLeft, PanelsTopLeft } from "lucide-react";

export function PortalStudioPage() {
  return (
    <main className="min-h-screen bg-[#0a0510] px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Admin</p>
            <h1 className="mt-2 flex items-center gap-3 text-3xl font-black">
              <PanelsTopLeft className="text-primary" size={28} />
              Quản lý cổng khách hàng
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-gray-300">
              Khu vực này vừa được tạo route nhưng phần studio chi tiết chưa được nối lại. Trang tạm này giữ cho
              dashboard admin và quá trình build hoạt động ổn định trong lúc mình hoàn thiện phần còn lại.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Quay lại admin
          </Link>
        </div>

        <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/10 p-5 text-sm text-gray-200">
          Route `/admin/portals` đã có component hợp lệ, nên sẽ không còn lỗi import file rỗng nữa.
        </div>
      </div>
    </main>
  );
}
