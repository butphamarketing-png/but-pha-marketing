"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { getTelHref, getZaloUrl } from "@/lib/site-contact";
import { useAdmin } from "@/lib/AdminContext";

export function PricingStickyBar() {
  const { settings } = useAdmin();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex max-w-lg gap-2">
            <a
              href={getTelHref(settings?.hotline)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-sm font-bold text-white"
            >
              <Phone className="h-4 w-4" />
              Gọi tư vấn
            </a>
            <a
              href={getZaloUrl(settings?.hotline)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700"
            >
              <MessageCircle className="h-4 w-4" />
              Zalo
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
