"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="mb-6 text-7xl"
      >
        🚀
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
