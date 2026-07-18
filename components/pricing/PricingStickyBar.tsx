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
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#08090c]/95 p-3 shadow-[0_-12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex max-w-lg gap-2">
            <a
              href={getTelHref(settings?.hotline)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-amber-200 py-3 text-sm font-bold text-[#0b0d12]"
            >
              <Phone className="h-4 w-4" />
              Gọi tư vấn
            </a>
            <a
              href={getZaloUrl(settings?.hotline)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-3 text-sm font-bold text-white/85"
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
