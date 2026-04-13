import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Phone as PhoneIcon } from "lucide-react";
import { db } from "@/lib/useData";
import { useRouter } from "next/navigation";

export function DecisionTreeQuiz({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", phone: "" });
  const router = useRouter();

  const nextStep = (answer: string) => {
    setAnswers({ ...answers, [step]: answer });
    if (step < 3) setStep(step + 1);
    else setStep(4); // Info step
  };

  const restart = () => {
    setStep(1);
    setAnswers({});
    setUserInfo({ name: "", phone: "" });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.phone) return alert("Vui lòng nhập đầy đủ thông tin");
    
    setLoading(true);
    try {
      const pkgName = answers[3] === "Dưới 3tr" ? "Cơ Bản" : answers[3] === "3-7tr" ? "Pro" : "VIP";
      await db.leads.add({ 
        type: "audit", 
        platform: answers[1], 
        service: `Gói ${pkgName}`, 
        name: userInfo.name,
        phone: userInfo.phone,
        note: `Đã có kênh: ${answers[2]}, Ngân sách: ${answers[3]}`,
      });
      alert("Chuẩn đoán thành công! Đang chuyển hướng bạn đến trang đăng ký gói dịch vụ phù hợp...");
      onClose();
      // Redirect to the corresponding platform page
      const path = answers[1].toLowerCase().replace(" ", "-");
      router.push(`/${path}`);
    } catch (err) {
      alert("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-primary/30 bg-card p-8 shadow-2xl shadow-primary/20"
        >
          <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
            <X size={24} />
          </button>
          
          {step < 5 && (
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-sm text-gray-400">
                <span>Câu hỏi {step}/3</span>
                <span>{Math.round((Math.min(step, 3) / 3) * 100)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-purple-400"
                  initial={{ width: `${((step - 1) / 3) * 100}%` }}
                  animate={{ width: `${(Math.min(step, 3) / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
                  <h3 className="mb-6 text-xl font-black text-white">Bạn muốn bứt phá trên nền tảng nào?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["Facebook", "TikTok", "Instagram", "Zalo", "Google Maps", "Website"].map(platform => (
                      <button key={platform} onClick={() => nextStep(platform)} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm font-bold text-white transition-all hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                        {platform}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {step === 2 && (
                <motion.div key="step2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
                  <h3 className="mb-6 text-xl font-black text-white">Bạn đã có kênh/trang hoạt động chưa?</h3>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => nextStep("Có")} className="rounded-xl border border-white/10 bg-white/5 p-5 text-left text-base font-bold text-white transition-all hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                      Có, đang hoạt động nhưng chưa hiệu quả
                    </button>
                    <button onClick={() => nextStep("Chưa")} className="rounded-xl border border-white/10 bg-white/5 p-5 text-left text-base font-bold text-white transition-all hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                      Chưa, muốn xây dựng mới hoàn toàn
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
                  <h3 className="mb-6 text-xl font-black text-white">Ngân sách dự kiến hàng tháng của bạn?</h3>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => nextStep("Dưới 3tr")} className="rounded-xl border border-white/10 bg-white/5 p-5 text-left text-base font-bold text-white transition-all hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                      Dưới 3.000.000đ (Gói Khởi Động)
                    </button>
                    <button onClick={() => nextStep("3-7tr")} className="rounded-xl border border-white/10 bg-white/5 p-5 text-left text-base font-bold text-white transition-all hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                      3.000.000đ - 7.000.000đ (Gói Tăng Trưởng)
                    </button>
                    <button onClick={() => nextStep("Trên 7tr")} className="rounded-xl border border-white/10 bg-white/5 p-5 text-left text-base font-bold text-white transition-all hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                      Trên 7.000.000đ (Gói Đột Phá)
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
                  <h3 className="mb-2 text-xl font-black text-white">Thông tin liên hệ</h3>
                  <p className="mb-6 text-xs text-gray-400">Để chúng tôi gửi kết quả chuẩn đoán và tư vấn chi tiết hơn.</p>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        required 
                        value={userInfo.name}
                        onChange={e => setUserInfo({...userInfo, name: e.target.value})}
                        placeholder="Họ và tên" 
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none focus:border-primary" 
                      />
                    </div>
                    <div className="relative">
                      <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        required 
                        type="tel"
                        value={userInfo.phone}
                        onChange={e => setUserInfo({...userInfo, phone: e.target.value})}
                        placeholder="Số điện thoại" 
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none focus:border-primary" 
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-primary py-4 font-black text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                    >
                      {loading ? "ĐANG XỬ LÝ..." : "XEM KẾT QUẢ CHUẨN ĐOÁN"}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="result" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">Kết Quả Chuẩn Đoán</h3>
                  <p className="mb-6 text-gray-300 text-sm">
                    Dựa trên dữ liệu, tình trạng Marketing của bạn cần bứt phá tại <strong className="text-primary">{answers[1]}</strong>. <br/>
                    Gói dịch vụ tối ưu đề xuất: <br/>
                    <strong className="mt-2 block text-xl text-primary uppercase">Gói {answers[1]} {answers[3] === "Dưới 3tr" ? "Cơ Bản" : answers[3] === "3-7tr" ? "Pro" : "VIP"}</strong>
                  </p>
                  <div className="flex w-full gap-3">
                    <button onClick={restart} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-bold text-white hover:bg-white/10">
                      Làm lại
                    </button>
                    <button onClick={handleRegister} disabled={loading} className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50">
                      {loading ? "Đang xử lý..." : "Đăng Ký Ngay"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

