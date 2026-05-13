"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Tạm dừng theo dõi khách truy cập để tiết kiệm băng thông Supabase (Egress)
    // Hệ thống sẽ không gửi yêu cầu POST đến /api/visitors nữa
    return;

    /* Logic cũ đã tạm dừng:
    if (!pathname || pathname.startsWith("/admin")) return;
    ...
    */
  }, [pathname]);

  return null;
}
