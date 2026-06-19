"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Calculator, Sparkles, ShoppingCart, ShieldCheck, Megaphone, Search, Bot } from "lucide-react";
import { db } from "@/lib/useData";

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

export function CustomWebsiteModal({
  isOpen,
  onClose,
  primaryColor,
  hidePrices = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  primaryColor: string;
  hidePrices?: boolean;
}) {
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [step, setStep] = useState<"select" | "contact" | "success">("select");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    consultTime: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Vui lòng điền đầy đủ Họ tên và Số điện thoại");
      return;
    }
    setIsSubmitting(true);
    setError("");

    const featureNames: string[] = [];
    FEATURE_CATEGORIES.forEach(cat => {
      cat.features.forEach(f => {
        if (selectedFeatures.has(f.id)) featureNames.push(f.name);
      });
    });

    const priceLine = hidePrices ? "" : `\nTổng giá: ${formatPrice(totalPrice)}`;
    const result = await db.leads.add({
      type: "contact",
      name: form.name.trim(),
      phone: form.phone.trim(),
      service: "Website Custom",
      note: `Gói: Website Custom\nTính năng: ${featureNames.join(", ")}${priceLine}\nEmail: ${form.email}\nĐịa chỉ: ${form.address}\nThời gian: ${form.consultTime}\nGhi chú: ${form.note}`,
      platform: "website"
    });

    setIsSubmitting(false);
    if (result.error) {
      setError("Lỗi gửi thông tin, vui lòng thử lại");
    } else {
      setStep("success");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="brand-modal-backdrop z-[100]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="brand-modal-panel-lg h-full max-h-[90vh] max-w-5xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-indigo-100 p-6 md:px-10">
            <div>
              <h2 className="text-2xl font-bold text-indigo-950 md:text-3xl">
                {hidePrices ? "Tính năng Website Custom" : "Báo giá tính năng Website Custom"}
              </h2>
              <p className="mt-1 text-sm text-slate-600">Chọn các tính năng bạn muốn tích hợp cho hệ thống của mình</p>
            </div>
            <button onClick={onClose} className="rounded-full p-3 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-900">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10">
            {step === "select" ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Default Package Info */}
                <div className="rounded-3xl border border-violet-200 bg-violet-50/80 p-6 lg:col-span-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                      <Check size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-indigo-950">Gói cơ bản + Responsive (Mặc định)</h3>
                      <p className="text-sm text-slate-600">Đã bao gồm trong chi phí khởi tạo ban đầu</p>
                    </div>
                    {!hidePrices && (
                      <div className="ml-auto text-xl font-bold text-violet-600">{formatPrice(BASE_PRICE)}</div>
                    )}
                  </div>
                </div>

                {FEATURE_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-indigo-100 pb-2">
                      <cat.icon size={18} style={{ color: primaryColor }} />
                      <h4 className="text-xs font-semibold tracking-wide text-slate-500">{cat.title}</h4>
                    </div>
                    <div className="grid gap-2">
                      {cat.features.map(f => (
                        <button
                          key={f.id}
                          onClick={() => toggleFeature(f.id)}
                          className={`group flex items-center justify-between p-4 transition-all ${
                            selectedFeatures.has(f.id) ? "platform-feature-chip--selected" : "platform-feature-chip"
                          }`}
                          style={selectedFeatures.has(f.id) ? { borderColor: `${primaryColor}55`, backgroundColor: `${primaryColor}10` } : {}}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                              selectedFeatures.has(f.id) ? "" : "border-indigo-200"
                            }`} style={selectedFeatures.has(f.id) ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}>
                              {selectedFeatures.has(f.id) && <Check size={12} className="text-white" />}
                            </div>
                            <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-950">{f.name}</span>
                          </div>
                          {!hidePrices && (
                            <span className="text-xs font-semibold text-slate-500">{formatPrice(f.price)}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : step === "contact" ? (
              <div className="mx-auto max-w-lg space-y-6 py-10">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-indigo-950">Nhập thông tin tư vấn</h3>
                  <p className="mt-2 text-sm text-slate-600">Đội ngũ sẽ liên hệ tư vấn chi tiết về các tính năng bạn đã chọn</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="Họ và tên *"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="brand-input"
                    />
                    <input
                      placeholder="Số điện thoại *"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="brand-input"
                    />
                  </div>
                  <input
                    placeholder="Gmail (Email)"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="brand-input"
                  />
                  <input
                    placeholder="Địa chỉ tư vấn"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    className="brand-input"
                  />
                  <div className="space-y-2">
                    <label className="ml-1 text-xs font-medium text-slate-500">Thời gian tư vấn mong muốn</label>
                    <input
                      type="datetime-local"
                      value={form.consultTime}
                      onChange={e => setForm({ ...form, consultTime: e.target.value })}
                      className="brand-input"
                    />
                  </div>
                  <textarea
                    placeholder="Nội dung cần tư vấn thêm..."
                    value={form.note}
                    onChange={e => setForm({ ...form, note: e.target.value })}
                    rows={3}
                    className="brand-input resize-none"
                  />
                  {error && <p className="text-center text-xs font-bold text-rose-500">{error}</p>}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  <Check size={48} />
                </div>
                <h3 className="text-3xl font-bold text-indigo-950">Đã nhận yêu cầu!</h3>
                <p className="mt-4 text-slate-600">Đội ngũ Bứt Phá Marketing sẽ liên hệ với bạn sớm nhất.</p>
                <button
                  onClick={onClose}
                  className="brand-btn-secondary mt-8"
                >
                  Đóng cửa sổ
                </button>
              </div>
            )}
          </div>

          {/* Footer / Total */}
          {step !== "success" && (
            <div className="border-t border-indigo-100 bg-indigo-50/50 p-6 md:px-10">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-900 shadow-sm">
                    <Calculator size={28} style={{ color: primaryColor }} />
                  </div>
                  <div>
                    {hidePrices ? (
                      <>
                        <p className="text-xs font-medium text-slate-500">Đã chọn</p>
                        <p className="text-lg font-bold text-indigo-950">
                          {selectedFeatures.size + 1} tính năng
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs font-medium text-slate-500">Tổng chi phí ước tính</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold" style={{ color: primaryColor }}>{formatPrice(totalPrice)}</span>
                          <span className="text-sm text-slate-500">({selectedFeatures.size + 1} tính năng)</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  {step === "contact" && (
                    <button
                      onClick={() => setStep("select")}
                      className="brand-btn-secondary px-8 py-5"
                    >
                      Quay lại
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (step === "select") setStep("contact");
                      else handleSubmit();
                    }}
                    disabled={isSubmitting}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-2xl px-10 py-5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                    {isSubmitting ? "Đang gửi..." : step === "select" ? "Đăng ký tư vấn gói này" : "Xác nhận gửi yêu cầu"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
