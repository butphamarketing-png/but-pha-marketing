"use client";

import Link from "next/link";
import { motion } from "framer-motion";


export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center deep-theme px-4 text-center text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[45vh]"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(196,149,90,0.16), transparent 58%), radial-gradient(ellipse 45% 40% at 88% 18%, rgba(139,124,246,0.14), transparent 55%), radial-gradient(ellipse 40% 35% at 12% 40%, rgba(109,90,230,0.08), transparent 50%)",
        }}
        aria-hidden
      />
      <motion.div
        animate={{ x: [0, 8, -8, 0], y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        className="relative mb-6 flex justify-center"
      >
        <div className="flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm">
          <img
            src="/logo.png"
            alt="Bứt Phá Marketing"
            className="h-24 w-24 rounded-full object-cover"
          />
        </div>
      </motion.div>
      <h1 className="relative mb-3 text-3xl font-semibold text-white md:text-4xl">
        Bạn lạc trôi rồi
      </h1>
      <p className="relative mb-8 max-w-xl text-white/45">
        Bạn lạc trôi rồi, để Bứt Phá Marketing đưa bạn về trang chủ nhé!
      </p>
      <Link
        href="/"
        className="relative rounded-full bg-[#6D5CE6] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5B4BD4]"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
