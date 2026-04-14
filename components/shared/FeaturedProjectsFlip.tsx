"use client";

import { motion } from "framer-motion";

interface CaseItem {
  id: string;
  title: string;
  before: string;
  after: string;
}

export function FeaturedProjectsFlip({ cases }: { cases: CaseItem[] }) {
  if (!cases || cases.length === 0) return null;
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-3 text-center text-3xl font-black text-white md:text-4xl">Dự Án Tiêu Biểu</h2>
        <p className="mb-10 text-center text-gray-400">Lật thẻ để xem trước và sau triển khai</p>
        <div className="grid gap-6 md:grid-cols-3">
          {cases.slice(0, 6).map((item) => (
            <motion.div key={item.id} whileHover={{ rotateY: 180 }} transition={{ duration: 0.6 }} className="group relative h-72 [transform-style:preserve-3d]">
              <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 [backface-visibility:hidden]">
                <img src={item.before} alt={`${item.title} before`} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 px-4 py-3 text-sm font-semibold text-white">{item.title} - Trước</div>
              </div>
              <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <img src={item.after} alt={`${item.title} after`} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 px-4 py-3 text-sm font-semibold text-white">{item.title} - Sau</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
