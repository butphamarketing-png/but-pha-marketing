"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Lock, User, Key, Globe } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useAdmin } from "@/lib/AdminContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/useData";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, user } = useAuth();
  const { settings } = useAdmin();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    platform: "facebook",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const platforms = [
    { key: "facebook", label: settings?.platformNames?.facebook || "Facebook" },
    { key: "tiktok", label: settings?.platformNames?.tiktok || "TikTok" },
    { key: "instagram", label: settings?.platformNames?.instagram || "Instagram" },
    { key: "zalo", label: settings?.platformNames?.zalo || "Zalo" },
    { key: "googlemaps", label: settings?.platformNames?.googlemaps || "Google Maps" },
    { key: "website", label: settings?.platformNames?.website || "Website" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await db.clientPortals.login(
        formData.username,
        formData.password,
        formData.platform,
      );

      if (result.error) {
        setError(result.error);
        return;
      }

      const res = result.data;
      if (res) {
        login({
          name: res.clientName,
          email: res.username,
          phone: res.phone,
          portalId: res.id,
          platform: res.platform,
        });
        onClose();
        router.push("/dashboard");
      } else {
        setError("Sai tai khoan, mat khau hoac nen tang.");
      }
    } catch {
      setError("Co loi xay ra, vui long thu lai.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToDashboard = () => {
    onClose();
    router.push("/dashboard");
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Dong"
              className="absolute right-6 top-6 z-10 text-gray-400 transition-colors hover:text-white"
            >
              <X size={24} />
            </button>

            {user ? (
              <div className="p-8 text-center md:p-12">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                  <Lock size={32} />
                </div>
                <h2 className="text-2xl font-black text-white">Xin chao, {user.name}!</h2>
                <p className="mt-2 text-sm text-gray-400">
                  Ban da dang nhap. Nhan de vao trang lo trinh du an.
                </p>
                <button
                  onClick={handleGoToDashboard}
                  className="mt-6 w-full rounded-xl bg-primary py-4 font-black text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]"
                >
                  Xem lo trinh du an →
                </button>
              </div>
            ) : (
              <div className="p-8 md:p-12">
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                    <Lock size={32} />
                  </div>
                  <h2 className="text-3xl font-black text-white">Kiem tra lo trinh</h2>
                  <p className="mt-2 text-sm text-gray-400">
                    Nhap dung tai khoan, mat khau va nen tang do {settings?.title || "But Pha Marketing"} cap de xem du lieu noi bo cua ban.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      required
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="Ten dang nhap"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition-colors focus:border-primary"
                    />
                  </div>

                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <select
                      required
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition-colors focus:border-primary"
                    >
                      {platforms.map((platform) => (
                        <option key={platform.key} value={platform.key} className="bg-[#120a1d] text-white">
                          {platform.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      required
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Mat khau"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition-colors focus:border-primary"
                    />
                  </div>

                  {error ? <p className="text-center text-xs font-bold text-red-400">{error}</p> : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-primary py-4 font-black text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  >
                    {loading ? "DANG KIEM TRA..." : "XEM LO TRINH DU AN →"}
                  </button>
                </form>

                <p className="mt-6 text-center text-xs text-gray-500">
                  Chua co tai khoan?{" "}
                  <a href={`tel:${settings?.hotline || "0937417982"}`} className="text-primary hover:underline">
                    Lien he {settings?.hotline || "0937 417 982"}
                  </a>
                </p>
              </div>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
