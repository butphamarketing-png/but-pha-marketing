import { Suspense } from "react";
import { CustomerManagement } from "@/components/admin/CustomerManagement";

export const metadata = {
  title: "Quản lý khách hàng | Bứt Phá Marketing",
  robots: { index: false, follow: false },
};

export default function AdminKhachHangPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0f19] p-8 text-white">Đang tải...</div>}>
      <CustomerManagement />
    </Suspense>
  );
}
