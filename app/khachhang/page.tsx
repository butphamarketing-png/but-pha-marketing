import { CustomerManagement } from "@/components/admin/CustomerManagement";

export const metadata = {
  title: "Quản lý khách hàng | Bứt Phá Marketing",
  robots: { index: false, follow: false },
};

export default function KhachHangPage() {
  return <CustomerManagement />;
}
