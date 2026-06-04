"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Check, Calculator, ShieldCheck, Zap } from "lucide-react";
import { db } from "@/lib/useData";

interface DomainItem {
  id: string;
  name: string;
  price: number;
}

interface DomainCategory {
  title: string;
  icon: any;
  domains: DomainItem[];
}

const DOMAIN_CATEGORIES: DomainCategory[] = [
  {
    title: "Tên miền quốc tế",
    icon: Globe,
    domains: [
      { id: "com", name: ".com", price: 350000 },
      { id: "net", name: ".net", price: 400000 },
      { id: "org", name: ".org", price: 400000 },
      { id: "info", name: ".info", price: 600000 },
      { id: "xyz", name: ".xyz", price: 300000 },
    ],
  },
  {
    title: "Tên miền Việt Nam",
    icon: ShieldCheck,
    domains: [
      { id: "vn", name: ".vn", price: 750000 },
      { id: "com_vn", name: ".com.vn", price: 650000 },
      { id: "net_vn", name: ".net.vn", price: 650000 },
      { id: "org_vn", name: ".org.vn", price: 650000 },
    ],
  },
  {
    title: "Tên miền mở rộng",
    icon: Zap,
    domains: [
      { id: "shop", name: ".shop", price: 1000000 },
      { id: "store", name: ".store", price: 1000000 },
      { id: "online", name: ".online", price: 800000 },
      { id: "tech", name: ".tech", price: 1200000 },
    ],
  },
];

export function DomainSelectionModal({ isOpen, onClose, primaryColor }: { isOpen: boolean; onClose: () => void; primaryColor: string }) {
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());
  const [step, setStep] = useState<"select" | "contact" | "success">("select");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    domainName: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const toggleDomain = (id: string) => {
    const next = new Set(selectedDomains);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedDomains(next);
  };

  const totalPrice = useMemo(() => {
    let sum = 0;
    DOMAIN_CATEGORIES.forEach(cat => {
      cat.domains.forEach(d => {
        if (selectedDomains.has(d.id)) sum += d.price;
      });
    });
    return sum;
  }, [selectedDomains]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ/năm";
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.domainName.trim()) {
      setError("Vui lòng điền đủ Họ tên, SĐT và Tên miền muốn đăng ký");
      return;
    }
    setIsSubmitting(true);
    setError("");

    const domainExtensions: string[] = [];
    DOMAIN_CATEGORIES.forEach(cat => {
      cat.domains.forEach(d => {
        if (selectedDomains.has(d.id)) domainExtensions.push(d.name);
      });
    });

    const result = await db.leads.add({
      type: "contact",
      name: form.name.trim(),
      phone: form.phone.trim(),
      service: "Đăng ký tên miền",
      note: `Tên miền: ${form.domainName}\nĐuôi mở rộng: ${domainExtensions.join(", ")}\nTổng dự toán: ${formatPrice(totalPrice)}\nGhi chú: ${form.note}`,
      platform: "website"
    });

    setIsSubmitting(false);
    if (result.error) {
      setError("Lỗi gửi thông tin, vui lòng thử lại");
    } else {
      setStep("success");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="brand-modal-backdrop z-[100]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="brand-modal-panel-lg max-h-[85vh] max-w-4xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-indigo-100 p-6 md:px-10">
            <div>
              <h2 className="text-2xl font-bold text-indigo-950 md:text-3xl">Đăng ký tên miền</h2>
              <p className="mt-1 text-sm text-slate-600">Chọn đuôi tên miền phù hợp cho thương hiệu của bạn</p>
            </div>
            <button onClick={onClose} className="rounded-full p-3 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-900">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10">
            {step === "select" ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {DOMAIN_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-indigo-100 pb-2">
                      <cat.icon size={18} style={{ color: primaryColor }} />
                      <h4 className="text-xs font-semibold tracking-wide text-slate-500">{cat.title}</h4>
                    </div>
                    <div className="grid gap-2">
                      {cat.domains.map(d => (
                        <button
                          key={d.id}
                          onClick={() => toggleDomain(d.id)}
                          className={`group flex items-center justify-between p-4 transition-all ${
                            selectedDomains.has(d.id) ? "platform-feature-chip--selected" : "platform-feature-chip"
                          }`}
                          style={selectedDomains.has(d.id) ? { borderColor: `${primaryColor}55`, backgroundColor: `${primaryColor}10` } : {}}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                              selectedDomains.has(d.id) ? "" : "border-indigo-200"
                            }`} style={selectedDomains.has(d.id) ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}>
                              {selectedDomains.has(d.id) && <Check size={12} className="text-white" />}
                            </div>
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-950">{d.name}</span>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-500">{new Intl.NumberFormat("vi-VN").format(d.price)}đ</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : step === "contact" ? (
              <div className="mx-auto max-w-lg space-y-6 py-10">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-indigo-950">Xác nhận đăng ký</h3>
                  <p className="mt-2 text-sm text-slate-600">Nhập thông tin tên miền bạn muốn mua</p>
                </div>
                <div className="space-y-4">
                  <input
                    placeholder="Nhập tên miền muốn đăng ký (VD: butphamarketing) *"
                    value={form.domainName}
                    onChange={e => setForm({ ...form, domainName: e.target.value })}
                    className="brand-input"
                  />
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
                  <textarea
                    placeholder="Ghi chú thêm..."
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
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                  <Check size={48} />
                </div>
                <h3 className="text-3xl font-bold text-indigo-950">Đã gửi yêu cầu!</h3>
                <p className="mt-4 text-slate-600">Đội ngũ sẽ kiểm tra sự tồn tại của tên miền và liên hệ báo giá chính xác cho bạn.</p>
                <button
                  onClick={onClose}
                  className="brand-btn-secondary mt-8"
                >
                  Đóng
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {step !== "success" && (
            <div className="border-t border-indigo-100 bg-indigo-50/50 p-6 md:px-10">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Globe size={28} style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Dự toán phí hàng năm</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold" style={{ color: primaryColor }}>{new Intl.NumberFormat("vi-VN").format(totalPrice)}đ</span>
                      <span className="text-sm text-slate-500">({selectedDomains.size} tên miền)</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  {step === "contact" && (
                    <button onClick={() => setStep("select")} className="brand-btn-secondary px-8 py-5">Quay lại</button>
                  )}
                  <button
                    onClick={() => {
                      if (selectedDomains.size === 0) {
                        alert("Vui lòng chọn ít nhất 1 đuôi tên miền");
                        return;
                      }
                      if (step === "select") setStep("contact");
                      else handleSubmit();
                    }}
                    disabled={isSubmitting}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-2xl px-10 py-5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                    {isSubmitting ? "Đang gửi..." : step === "select" ? "Tiếp theo" : "Xác nhận đăng ký"}
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
