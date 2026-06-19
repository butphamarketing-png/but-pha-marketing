"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAdmin } from "@/lib/AdminContext";
import { SiteNavMenu } from "@/components/shared/SiteNavMenu";
import { SIMPLE_NAV_LINKS } from "@/lib/site-navigation";

export function ThemeToggleButton() {
  const { settings, updateSettings } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);

  const mascotEnabled = settings.mascotEnabled !== false;

  const toggleMascot = () => {
    updateSettings({ mascotEnabled: !mascotEnabled });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={toggleMascot}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed left-3 top-[calc(50%-20px)] z-[55] flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 bg-white/95 text-indigo-90 shadow-xl backdrop-blur-sm transition-all hover:border-violet-400"
        title={mascotEnabled ? "Tắt linh vật" : "Bật linh vật"}
        aria-label={mascotEnabled ? "Tắt linh vật" : "Bật linh vật"}
      >
        {mascotEnabled ? <Eye size={18} /> : <EyeOff size={18} />}
      </motion.button>

      <motion.button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed left-3 top-[calc(50%+24px)] z-[55] flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 bg-white/95 text-indigo-90 shadow-xl backdrop-blur-sm transition-all hover:border-violet-400"
        aria-label="Menu"
        title="Menu"
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed left-14 top-[calc(50%-40px)] z-[54] max-h-[min(70vh,520px)] w-[min(18rem,calc(100vw-5rem))] overflow-y-auto rounded-2xl border border-indigo-100 bg-white/95 p-2 shadow-2xl backdrop-blur-md"
          >
            <SiteNavMenu tone="panel" layout="stack" onNavigate={closeMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
