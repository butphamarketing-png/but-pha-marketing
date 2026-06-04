"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useAdmin } from "@/lib/AdminContext";
import Link from "next/link";

const DISMISS_KEY = "quick-action-dismissed";

export function QuickActionBar() {
  const { settings } = useAdmin();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) { setIsVisible(false); return; }
      setIsVisible(window.scrollY > 300);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const hotline = settings.hotline || "0937417982";
  const zaloUrl = "https://zalo.me/0937417982";
  const messengerUrl = "https://www.facebook.com/butphadoanhthu";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[60] flex items-center justify-around border-t border-indigo-100 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(49,46,129,0.08)] backdrop-blur-lg md:hidden"
        >
          {/* Home */}
          <Link href="/" className="flex flex-col items-center gap-1 text-indigo-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 border border-indigo-200">
              <Home size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Trang chủ</span>
          </Link>

          {/* Call */}
          <a href={`tel:${hotline.replace(/\s/g, "")}`} className="flex flex-col items-center gap-1 text-indigo-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20">
              <Phone size={20} fill="currentColor" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Gọi điện</span>
          </a>

          {/* Zalo */}
          <a href={zaloUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 text-indigo-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0068FF]">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Zalo</span>
          </a>

          {/* Facebook */}
          <a href={messengerUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 text-indigo-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2]">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Facebook</span>
          </a>

          {/* Close */}
          <button
            onClick={() => { setIsVisible(false); setDismissed(true); window.sessionStorage.setItem(DISMISS_KEY, "1"); }}
            className="flex flex-col items-center gap-1 text-gray-500"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <X size={18} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Đóng</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
