import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Phone as PhoneIcon, Link as LinkIcon } from "lucide-react";
import { db } from "@/lib/useData";
import { useRouter } from "next/navigation";

interface DecisionTreeQuizProps {
  isOpen?: boolean;
  onClose?: () => void;
  isInline?: boolean;
  platform?: string;
}

export function DecisionTreeQuiz({ isOpen = false, onClose, isInline = false, platform }: DecisionTreeQuizProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", phone: "", fbLink: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    if (isInline && isOpen) {
      const element = document.getElementById("audit");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [isInline, isOpen]);

  const validateFBLink = (link: string) => {
    const fbRegex = /^https?:\/\/(www\.)?(facebook\.com|fb\.com)\/.+/i;
    return fbRegex.test(link);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const nextStep = (answer: string) => {
    setAnswers({ ...answers, [step]: answer });
    if (step < 3) setStep(step + 1);
    else setStep(4);
  };

  const restart = () => {
    setStep(1);
    setAnswers({});
    setUserInfo({ name: "", phone: "", fbLink: "" });
    setErrors({});
  };

  const handleRegister = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!userInfo.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    }

    if (!userInfo.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!validatePhone(userInfo.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ. Ví dụ: 0912345678";
    }

    if (!userInfo.fbLink.trim()) {
      newErrors.fbLink = "Vui lòng nhập link Facebook";
    } else if (!validateFBLink(userInfo.fbLink)) {
      newErrors.fbLink = "Link Facebook không hợp lệ. Ví dụ: https://facebook.com/yourpage";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const pkgName = answers[3] === "Dưới 3tr" ? "Cơ Bản" : answers[3] === "3-7tr" ? "Pro" : "VIP";

      await db.leads.add({
        type: "audit",
        platform: answers[1] || platform || "Unknown",
        service: `Gói ${pkgName}`,
        name: userInfo.name,
        phone: userInfo.phone,
        note: `FB Link: ${userInfo.fbLink}, Đã có kênh: ${answers[2]}, Ngân sách: ${answers[3]}`,
      });

      window.dispatchEvent(new CustomEvent("quizCompleted"));

      alert("Chuẩn đoán thành công. Hệ thống sẽ chuyển bạn đến trang dịch vụ phù hợp.");

      if (onClose) onClose();

      const path = (answers[1] || platform || "facebook").toLowerCase().replace(" ", "-");
      router.push(`/${path}`);
    } catch {
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (isInline && !isOpen) return null;

  const content = (
    <div className={`relative ${isInline ? "mx-auto w-full max-w-4xl" : "w-full max-w-lg"} overflow-hidden ${isInline ? "bg-transparent p-0" : "rounded-2xl border border-primary/30 bg-card p-8 shadow-2xl shadow-primary/20"}`}>
      {!isInline && (
        <button onClick={onClose} className="absolute right-4 top-4 z-10 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
      )}

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

      <div className={`relative ${isInline ? "min-h-[400px]" : "min-h-[300px]"}`}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
              <h3 className="mb-6 text-xl font-black text-white">Bạn muốn bứt phá trên nền tảng nào?</h3>
              <div className="grid grid-cols-2 gap-3">
                {["Facebook", "TikTok", "Instagram", "Zalo", "Google Maps", "Website"].map((item) => (
                  <button key={item} onClick={() => nextStep(item)} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm font-bold text-white transition-all hover:border-primary hover:bg-primary hover:shadow-lg hover:shadow-primary/20">
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
              <h3 className="mb-6 text-xl font-black text-white">Bạn đã có kênh hoặc trang hoạt động chưa?</h3>
              <div className="flex flex-col gap-3">
                <button onClick={() => nextStep("Có")} className="rounded-xl border border-white/10 bg-white/5 p-5 text-left text-base font-bold text-white transition-all hover:border-primary hover:bg-primary hover:shadow-lg hover:shadow-primary/20">
                  Có, đang hoạt động nhưng chưa hiệu quả
                </button>
                <button onClick={() => nextStep("Chưa")} className="rounded-xl border border-white/10 bg-white/5 p-5 text-left text-base font-bold text-white transition-all hover:border-primary hover:bg-primary hover:shadow-lg hover:shadow-primary/20">
                  Chưa, muốn xây dựng mới hoàn toàn
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
              <h3 className="mb-6 text-xl font-black text-white">Ngân sách dự kiến hàng tháng của bạn?</h3>
              <div className="flex flex-col gap-3">
                <button onClick={() => nextStep("Dưới 3tr")} className="rounded-xl border border-white/10 bg-white/5 p-5 text-left text-base font-bold text-white transition-all hover:border-primary hover:bg-primary hover:shadow-lg hover:shadow-primary/20">
                  Dưới 3.000.000đ (Gói Khởi Động)
                </button>
                <button onClick={() => nextStep("3-7tr")} className="rounded-xl border border-white/10 bg-white/5 p-5 text-left text-base font-bold text-white transition-all hover:border-primary hover:bg-primary hover:shadow-lg hover:shadow-primary/20">
                  3.000.000đ - 7.000.000đ (Gói Tăng Trưởng)
                </button>
                <button onClick={() => nextStep("Trên 7tr")} className="rounded-xl border border-white/10 bg-white/5 p-5 text-left text-base font-bold text-white transition-all hover:border-primary hover:bg-primary hover:shadow-lg hover:shadow-primary/20">
                  Trên 7.000.000đ (Gói Đột Phá)
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="absolute inset-0">
              <h3 className="mb-2 text-xl font-black text-white">Thông tin liên hệ để chuẩn đoán chính xác</h3>
              <p className="mb-6 text-xs text-gray-400">Chúng tôi cần thông tin chính xác để phân tích kênh của bạn và đưa ra chuẩn đoán phù hợp nhất.</p>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    required
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    placeholder="Họ và tên"
                    className={`w-full rounded-xl border bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition-colors ${errors.name ? "border-red-500" : "border-white/10 focus:border-primary"}`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>

                <div className="relative">
                  <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    required
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    placeholder="Số điện thoại (VD: 0912345678)"
                    className={`w-full rounded-xl border bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition-colors ${errors.phone ? "border-red-500" : "border-white/10 focus:border-primary"}`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>

                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    required
                    type="url"
                    value={userInfo.fbLink}
                    onChange={(e) => setUserInfo({ ...userInfo, fbLink: e.target.value })}
                    placeholder="Link Facebook của bạn (VD: https://facebook.com/yourpage)"
                    className={`w-full rounded-xl border bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition-colors ${errors.fbLink ? "border-red-500" : "border-white/10 focus:border-primary"}`}
                  />
                  {errors.fbLink && <p className="mt-1 text-xs text-red-400">{errors.fbLink}</p>}
                </div>

                <button type="submit" disabled={loading} className="w-full rounded-xl bg-primary py-4 font-black text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50">
                  {loading ? "ĐANG PHÂN TÍCH KÊNH CỦA BẠN..." : "BẮT ĐẦU CHUẨN ĐOÁN"}
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
              <p className="mb-6 text-sm text-gray-300">
                Dựa trên dữ liệu kênh của bạn, tình trạng marketing cần được tối ưu trên <strong className="text-primary">{answers[1] || platform}</strong>.
                <br />
                Gói dịch vụ phù hợp đề xuất:
                <br />
                <strong className="mt-2 block text-xl uppercase text-primary">
                  Gói {answers[1] || platform} {answers[3] === "Dưới 3tr" ? "Cơ Bản" : answers[3] === "3-7tr" ? "Pro" : "VIP"}
                </strong>
              </p>
              <div className="flex w-full gap-3">
                <button onClick={restart} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-bold text-white hover:bg-white/10">
                  Làm lại
                </button>
                <button onClick={() => void handleRegister()} disabled={loading} className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50">
                  {loading ? "Đang xử lý..." : "Đăng Ký Gói Này Ngay"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (isInline) {
    return content;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
          {content}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
