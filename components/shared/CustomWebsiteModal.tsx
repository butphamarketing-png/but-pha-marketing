"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Calculator, Sparkles, ShoppingCart, ShieldCheck, Megaphone, Search, Bot } from "lucide-react";

interface FeatureItem {
  id: string;
  name: string;
  price: number;
}

interface FeatureCategory {
  title: string;
  icon: any;
  features: FeatureItem[];
}

const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    title: "GIAO DIỆN (TRẢI NGHIỆM)",
    icon: Sparkles,
    features: [
      { id: "dark_light", name: "Giao diện sáng/tối", price: 800000 },
      { id: "custom_cursor", name: "Con trỏ đẹp", price: 300000 },
      { id: "button_sound", name: "Nút bấm có âm thanh", price: 500000 },
    ],
  },
  {
    title: "BÁN HÀNG",
    icon: ShoppingCart,
    features: [
      { id: "add_to_cart", name: "Thêm vào giỏ hàng", price: 1000000 },
      { id: "flash_sale", name: "Flash sale (giờ vàng)", price: 1500000 },
      { id: "discount_code", name: "Mã giảm giá", price: 1200000 },
      { id: "wishlist", name: "Lưu sản phẩm yêu thích", price: 800000 },
      { id: "compare_products", name: "So sánh sản phẩm", price: 1000000 },
      { id: "variants", name: "Chọn màu/size", price: 1200000 },
      { id: "unique_sku", name: "Mã sản phẩm riêng", price: 800000 },
      { id: "order_history", name: "Xem lại đơn đã mua", price: 800000 },
      { id: "order_tracking", name: "Theo dõi đơn hàng", price: 1000000 },
      { id: "categories", name: "Phân loại sản phẩm", price: 1200000 },
    ],
  },
  {
    title: "HỆ THỐNG",
    icon: ShieldCheck,
    features: [
      { id: "ssl", name: "Bảo mật website (SSL)", price: 1000000 },
      { id: "staff_perms", name: "Phân quyền nhân viên", price: 1500000 },
      { id: "auth", name: "Đăng nhập / đăng ký", price: 800000 },
    ],
  },
  {
    title: "MARKETING",
    icon: Megaphone,
    features: [
      { id: "landing_page", name: "Tạo landing page", price: 2000000 },
      { id: "lead_popup", name: "Popup thu khách", price: 1000000 },
      { id: "email_marketing", name: "Gửi email marketing", price: 2000000 },
      { id: "reg_form", name: "Form đăng ký", price: 800000 },
      { id: "affiliate", name: "Affiliate (cộng tác viên)", price: 2000000 },
      { id: "chatbot", name: "Chat tự động", price: 1500000 },
      { id: "push_notif", name: "Thông báo đẩy", price: 1200000 },
    ],
  },
  {
    title: "TÌM KIẾM & LỌC",
    icon: Search,
    features: [
      { id: "search", name: "Tìm kiếm sản phẩm", price: 1000000 },
      { id: "filters", name: "Lọc theo giá/danh mục", price: 1200000 },
    ],
  },
  {
    title: "AI & NÂNG CAO",
    icon: Bot,
    features: [
      { id: "voice_search", name: "Tìm kiếm bằng giọng nói", price: 2000000 },
      { id: "upsell", name: "Gợi ý mua thêm", price: 1200000 },
      { id: "related_products", name: "Gợi ý sản phẩm liên quan", price: 1200000 },
      { id: "audio_consult", name: "Âm thanh tư vấn khách", price: 1500000 },
      { id: "ai_suggest", name: "Gợi ý sản phẩm thông minh (AI)", price: 2500000 },
      { id: "ai_search", name: "Tìm kiếm thông minh (AI)", price: 2500000 },
      { id: "ai_content", name: "Viết content tự động (AI)", price: 2000000 },
      { id: "loading_effect", name: "Hiển thị loading đẹp", price: 500000 },
      { id: "top_bar", name: "Thanh thông báo đầu trang", price: 500000 },
      { id: "map", name: "Bản đồ chỉ đường", price: 200000 },
    ],
  },
];

const BASE_PRICE = 3000000;

export function CustomWebsiteModal({ isOpen, onClose, primaryColor }: { isOpen: boolean; onClose: () => void; primaryColor: string }) {
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());

  const toggleFeature = (id: string) => {
    const next = new Set(selectedFeatures);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedFeatures(next);
  };

  const totalPrice = useMemo(() => {
    let sum = BASE_PRICE;
    FEATURE_CATEGORIES.forEach(cat => {
      cat.features.forEach(f => {
        if (selectedFeatures.has(f.id)) sum += f.price;
      });
    });
    return sum;
  }, [selectedFeatures]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative flex h-full max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0512] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 p-6 md:px-10">
            <div>
              <h2 className="text-2xl font-black text-white md:text-3xl">Báo Giá Tính Năng Website Custom</h2>
              <p className="mt-1 text-sm text-gray-400">Chọn các tính năng bạn muốn tích hợp cho hệ thống của mình</p>
            </div>
            <button onClick={onClose} className="rounded-full bg-white/5 p-3 text-gray-400 transition hover:bg-white/10 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Default Package Info */}
              <div className="rounded-3xl border border-fuchsia-500/20 bg-fuchsia-500/5 p-6 lg:col-span-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-400">
                    <Check size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Gói cơ bản + Responsive (Mặc định)</h3>
                    <p className="text-sm text-gray-400">Đã bao gồm trong chi phí khởi tạo ban đầu</p>
                  </div>
                  <div className="ml-auto text-xl font-black text-fuchsia-400">{formatPrice(BASE_PRICE)}</div>
                </div>
              </div>

              {FEATURE_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <cat.icon size={18} style={{ color: primaryColor }} />
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">{cat.title}</h4>
                  </div>
                  <div className="grid gap-2">
                    {cat.features.map(f => (
                      <button
                        key={f.id}
                        onClick={() => toggleFeature(f.id)}
                        className={`group flex items-center justify-between rounded-2xl border p-4 transition-all ${
                          selectedFeatures.has(f.id)
                            ? "border-primary/50 bg-primary/10"
                            : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                        }`}
                        style={selectedFeatures.has(f.id) ? { borderColor: `${primaryColor}50`, backgroundColor: `${primaryColor}10` } : {}}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                            selectedFeatures.has(f.id) ? "bg-primary border-primary" : "border-white/20"
                          }`} style={selectedFeatures.has(f.id) ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}>
                            {selectedFeatures.has(f.id) && <Check size={12} className="text-white" />}
                          </div>
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white">{f.name}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{formatPrice(f.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer / Total */}
          <div className="border-t border-white/5 bg-black/40 p-6 md:px-10">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-white">
                  <Calculator size={28} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500">Tổng chi phí ước tính</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white" style={{ color: primaryColor }}>{formatPrice(totalPrice)}</span>
                    <span className="text-sm text-gray-500">({selectedFeatures.size + 1} tính năng)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  alert("Chúng tôi đã nhận được yêu cầu của bạn. Đội ngũ sẽ liên hệ tư vấn chi tiết hơn!");
                  onClose();
                }}
                className="group relative flex items-center gap-3 overflow-hidden rounded-2xl px-10 py-5 text-sm font-black uppercase tracking-widest text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                Đăng ký tư vấn gói này
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
