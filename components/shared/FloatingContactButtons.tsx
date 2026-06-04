"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Home } from "lucide-react";
import { SiFacebook, SiMessenger, SiZalo } from "react-icons/si";
import { useAdmin } from "@/lib/AdminContext";
import Link from "next/link";

export function FloatingContactButtons() {
  const { settings } = useAdmin();
  const hotline = settings.hotline || "0937417982";
  const zaloUrl = "https://zalo.me/0937417982";
  const messengerUrl = "https://www.facebook.com/butphadoanhthu";
  const logo = settings.logo || "/logo.png";

  return (
    <div className="fixed right-4 top-1/2 z-[95] hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {/* Home / Logo Button */}
      <Link href="/">
        <motion.div
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-indigo-200 bg-white shadow-2xl backdrop-blur-md transition-colors hover:border-violet-400 hover:bg-indigo-50"
        >
          <img src={logo} alt="Home" className="h-7 w-7 rounded-full object-cover" />
          <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-indigo-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 transition-all group-hover:opacity-100">
            Trang chủ
          </span>
        </motion.div>
      </Link>

      {/* Call Button */}
      <a href={`tel:${hotline.replace(/\s/g, "")}`}>
        <motion.div
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-transform"
        >
          <Phone size={20} fill="currentColor" />
          <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-indigo-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 transition-all group-hover:opacity-100">
            Gọi điện: {hotline}
          </span>
        </motion.div>
      </a>

      {/* Zalo Button */}
      <a href={zaloUrl} target="_blank" rel="noreferrer">
        <motion.div
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg shadow-blue-500/20 transition-transform"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white p-0.5">
             <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" className="h-full w-full" />
          </div>
          <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-indigo-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 transition-all group-hover:opacity-100">
            Zalo: {hotline}
          </span>
        </motion.div>
      </a>

      {/* Messenger Button */}
      <a href={messengerUrl} target="_blank" rel="noreferrer">
        <motion.div
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 transition-transform"
        >
          <SiMessenger className="text-2xl" />
          <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-indigo-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 transition-all group-hover:opacity-100">
            Messenger
          </span>
        </motion.div>
      </a>
    </div>
  );
}
