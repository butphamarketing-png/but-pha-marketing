import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageCircle } from "lucide-react";
import { db } from "@/lib/useData";

export function ConsultModal({ isOpen, onClose, platformColor = "#6B21A8" }: { isOpen: boolean; onClose: () => void, platformColor?: string }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    consultTime: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const combinedNote = `Email: ${form.email} | Địa chỉ: ${form.address} | Thời gian: ${form.consultTime} | Nội dung: ${form.note}`;
      await db.leads.add({ 
        type: "contact", 
        name: form.name, 
        phone: form.phone, 
        note: combinedNote 
      });
      alert("Đã gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ sớm nhất.");
      onClose();
    } catch (err) {
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative w-full max-w-lg my-auto overflow-hidden rounded-2xl border border-white/10 bg-card p-6 shadow-2xl"
          style={{ boxShadow: `0 10px 40px -10px ${platformColor}40` }}
        >
          <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white z-10">
            <X size={20} />
          </button>
          
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Đăng ký tư vấn trực tiếp</h2>
          
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                required 
                type="text" 
                placeholder="Họ và tên *" 
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-primary" 
              />
              <input 
                required 
                type="tel" 
                placeholder="Số điện thoại *" 
                value={form.phone}
                onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-primary" 
              />
            </div>
            
            <input 
              required 
              type="email" 
              placeholder="Gmail (Email) *" 
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-primary" 
            />

            <input 
              required 
              type="text" 
              placeholder="Địa chỉ tư vấn *" 
              value={form.address}
              onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-primary" 
            />

            <div className="space-y-1">
              <label className="text-[10px] uppercase text-gray-500 font-bold ml-1">Thời gian tư vấn mong muốn *</label>
              <input 
                required 
                type="datetime-local" 
                value={form.consultTime}
                onChange={e => setForm(prev => ({ ...prev, consultTime: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-primary" 
              />
            </div>

            <textarea 
              placeholder="Nội dung bạn cần tư vấn" 
              value={form.note}
              onChange={e => setForm(prev => ({ ...prev, note: e.target.value }))}
              rows={3} 
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-primary" 
            />
            
            <button 
              disabled={loading}
              type="submit" 
              className="mt-2 w-full rounded-lg bg-primary py-4 font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50" 
              style={{ backgroundColor: platformColor }}
            >
              {loading ? "Đang xử lý..." : "Gửi yêu cầu tư vấn ngay"}
            </button>
            <p className="text-center text-[10px] text-gray-500 italic">Chúng tôi sẽ bảo mật thông tin của bạn tuyệt đối.</p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

