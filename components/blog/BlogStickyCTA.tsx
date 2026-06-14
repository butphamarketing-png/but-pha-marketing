"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function BlogStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-[55] px-4 md:bottom-6 md:left-auto md:right-6 md:max-w-md md:px-0">
      <div className="flex items-center gap-2 rounded-2xl border border-indigo-100 bg-white/95 p-2 shadow-brand-lg backdrop-blur md:p-3">
        <Link
          href="/lien-he"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          <MessageCircle size={16} />
          Tư vấn miễn phí
        </Link>
        <Link
          href="/website"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-100"
        >
          Báo giá website
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
