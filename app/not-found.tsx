"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <motion.div
        animate={{ x: [0, 8, -8, 0], y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        className="mb-6 flex justify-center"
      >
        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-primary/20 shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
          <Bot size={80} className="text-primary drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" />
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
