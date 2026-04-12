import { Phone } from "lucide-react";
import { SiFacebook, SiZalo } from "react-icons/si";
import { motion } from "framer-motion";
import { useAdmin } from "@/lib/AdminContext";

export function QuickContactButtons() {
  const { settings } = useAdmin();
  
  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed left-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-4"
    >
      <a 
        href="https://facebook.com" 
        target="_blank" 
        rel="noreferrer"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg transition-transform hover:scale-110"
      >
        <SiFacebook className="text-2xl" />
        <span className="absolute left-14 scale-0 rounded bg-black/80 px-2 py-1 text-sm font-medium whitespace-nowrap text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
          Facebook
        </span>
      </a>
      <a 
        href={`tel:${settings.hotline.replace(/\s+/g, '')}`}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110"
      >
        <Phone className="text-xl" />
        <span className="absolute left-14 scale-0 rounded bg-black/80 px-2 py-1 text-sm font-medium whitespace-nowrap text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
          Gọi {settings.hotline}
        </span>
      </a>
      <a 
        href="https://zalo.me/0937417982" 
        target="_blank" 
        rel="noreferrer"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg transition-transform hover:scale-110"
      >
        <SiZalo className="text-2xl" />
        <span className="absolute left-14 scale-0 rounded bg-black/80 px-2 py-1 text-sm font-medium whitespace-nowrap text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
          Chat Zalo
        </span>
      </a>
    </motion.div>
  );
}
