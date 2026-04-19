"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    login({
      name: "Khách hàng",
      email: formData.username.trim(),
      phone: "",
    });

    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#120a1d]/95 p-6 shadow-[0_30px_120px_rgba(80,0,160,0.35)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">Client Portal</p>
              <h2 className="mt-3 text-3xl font-black text-white">🔒 Khu vực khách hàng</h2>
              <p className="mt-3 text-sm leading-6 text-gray-300">
                Đăng nhập để xem tiến độ &amp; báo cáo dự án của bạn
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">Tài khoản hoặc email</label>
                <input
                  required
                  type="text"
                  value={formData.username}
                  onChange={(event) => setFormData((current) => ({ ...current, username: event.target.value }))}
                  placeholder="long1234 hoặc ban@company.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-400 focus:bg-white/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">Password</label>
                <input
                  required
                  type="password"
                  value={formData.password}
                  onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-400 focus:bg-white/10"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-3 text-sm font-bold text-white transition hover:from-purple-400 hover:to-fuchsia-400"
              >
                Xem dự án của bạn →
              </button>
            </form>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
