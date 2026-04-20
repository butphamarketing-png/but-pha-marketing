"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <motion.div
        animate={{ x: [0, 8, -8, 0], y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        className="mb-6 flex justify-center"
      >
        <div className="flex h-44 w-44 items-center justify-center rounded-full bg-primary/10 shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm border border-white/10">
          <img
            src="/mascot-home.png"
            alt="AI Mascot"
            className="h-36 w-36 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
          />
        </div>
      </motion.div>
      <h1 className="mb-3 text-3xl font-black text-white md:text-4xl">Bạn lạc trôi rồi</h1>
      <p className="mb-8 max-w-xl text-gray-300">
        Bạn lạc trôi rồi, để Bứt Phá Marketing đưa bạn về trang chủ nhé!
      </p>
      <Link href="/" className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white">
        Về trang chủ
      </Link>
    </div>
  );
}
