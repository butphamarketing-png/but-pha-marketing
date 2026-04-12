import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { db } from "@/lib/useData";

export function DecisionTreeQuiz({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);

  const nextStep = (answer: string) => {
    setAnswers({ ...answers, [step]: answer });
    if (step < 3) setStep(step + 1);
    else setStep(4); // Result
  };

  const restart = () => {
    setStep(1);
    setAnswers({});
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const pkgName = answers[3] === "Dưới 3tr" ? "Cơ Bản" : answers[3] === "3-7tr" ? "Pro" : "VIP";
      await db.leads.add({ 
        type: "audit", 
        platform: answers[1], 
        service: `Gói ${pkgName}`, 
        note: `Đã có kênh: ${answers[2]}, Ngân sách: ${answers[3]}`,
        phone: "0000000000" // Placeholder phone since we don't ask for it here
      });
      alert("Đăng ký thành công! Chúng tôi sẽ liên hệ tư vấn gói " + pkgName + ".");
      onClose();
    } catch (err) {
      alert("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-primary/30 bg-card p-8 shadow-2xl shadow-primary/20"
        >
          <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
            <X size={24} />
          </button>
          
          {step < 4 && (
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-sm text-gray-400">
                <span>Câu hỏi {step}/3</span>
                <span>{Math.round((step / 3) * 100)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-purple-400"
                  initial={{ width: `${((step - 1) / 3) * 100}%` }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="relative min-h-[250px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
                  <h3 className="mb-6 text-xl font-semibold text-white">Bạn muốn bứt phá trên nền tảng nào?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["Facebook", "TikTok", "Instagram", "Zalo", "Google Maps", "Website"].map(platform => (
                      <button key={platform} onClick={() => nextStep(platform)} className="rounded-lg border border-white/10 bg-white/5 p-4 text-center text-sm font-medium text-white transition-colors hover:bg-primary/20 hover:border-primary/50">
                        {platform}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {step === 2 && (
                <motion.div key="step2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
                  <h3 className="mb-6 text-xl font-semibold text-white">Bạn đã có kênh/trang hoạt động chưa?</h3>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => nextStep("Có")} className="rounded-lg border border-white/10 bg-white/5 p-4 text-left text-base font-medium text-white transition-colors hover:bg-primary/20 hover:border-primary/50">
                      Có, đang hoạt động nhưng chưa hiệu quả
                    </button>
                    <button onClick={() => nextStep("Chưa")} className="rounded-lg border border-white/10 bg-white/5 p-4 text-left text-base font-medium text-white transition-colors hover:bg-primary/20 hover:border-primary/50">
                      Chưa, muốn xây dựng mới hoàn toàn
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
                  <h3 className="mb-6 text-xl font-semibold text-white">Ngân sách dự kiến hàng tháng của bạn?</h3>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => nextStep("Dưới 3tr")} className="rounded-lg border border-white/10 bg-white/5 p-4 text-left text-base font-medium text-white transition-colors hover:bg-primary/20 hover:border-primary/50">
                      Dưới 3.000.000đ (Gói Khởi Động)
                    </button>
                    <button onClick={() => nextStep("3-7tr")} className="rounded-lg border border-white/10 bg-white/5 p-4 text-left text-base font-medium text-white transition-colors hover:bg-primary/20 hover:border-primary/50">
                      3.000.000đ - 7.000.000đ (Gói Tăng Trưởng)
                    </button>
                    <button onClick={() => nextStep("Trên 7tr")} className="rounded-lg border border-white/10 bg-white/5 p-4 text-left text-base font-medium text-white transition-colors hover:bg-primary/20 hover:border-primary/50">
                      Trên 7.000.000đ (Gói Đột Phá)
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="result" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">Gói Phù Hợp Với Bạn</h3>
                  <p className="mb-6 text-gray-300">
                    Dựa trên nhu cầu, chúng tôi đề xuất: <br/>
                    <strong className="mt-2 block text-xl text-primary">Gói {answers[1]} {answers[3] === "Dưới 3tr" ? "Cơ Bản" : answers[3] === "3-7tr" ? "Pro" : "VIP"}</strong>
                  </p>
                  <div className="flex w-full gap-3">
                    <button onClick={restart} className="flex-1 rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-medium text-white hover:bg-white/10">
                      Làm lại
                    </button>
                    <button onClick={() => { handleRegister(); }} disabled={loading} className="flex-1 rounded-lg bg-primary py-3 text-sm font-medium text-white hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(107,33,168,0.5)] disabled:opacity-50">
                      {loading ? "Đang gửi..." : "Đăng Ký Ngay"}
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
