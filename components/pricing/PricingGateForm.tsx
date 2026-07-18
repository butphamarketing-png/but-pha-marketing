"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Lock } from "lucide-react";
import { captureBanggiaAttribution, getBanggiaAttribution, getBanggiaClientContext } from "@/lib/banggia-attribution";
import { formatBanggiaPhoneDisplay } from "@/lib/banggia-prefs";
import {
  isValidBanggiaName,
  isValidBanggiaPhone,
  normalizeBanggiaPhone,
  sanitizeBanggiaPhoneInput,
} from "@/lib/banggia-validation";
import { markBanggiaUnlocked } from "@/lib/marketing-popup-gate";
import { AnimatedCheckmark } from "./AnimatedCheckmark";

type PricingGateFormProps = {
  onUnlocked: () => void;
  onUnlockStart?: () => void;
};

type FormPhase = "form" | "success";

const SUCCESS_DELAY_MS = 1000;

function ValidFieldIcon({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500"
        >
          <Check className="h-4 w-4" aria-hidden />
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
}

export function PricingGateForm({ onUnlocked, onUnlockStart }: PricingGateFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<FormPhase>("form");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const hasPulsedRef = useRef(false);
  const [ctaPulse, setCtaPulse] = useState(false);

  const normalizedPhone = normalizeBanggiaPhone(phone);
  const nameValid = isValidBanggiaName(name);
  const phoneValid = isValidBanggiaPhone(normalizedPhone);
  const canSubmit = nameValid && phoneValid && !loading && phase === "form";
  const phoneDisplay = phoneValid ? formatBanggiaPhoneDisplay(normalizedPhone) : phone;

  const phoneError = useMemo(() => {
    if (!phoneTouched || !normalizedPhone) return null;
    if (!phoneValid) return "Số điện thoại không hợp lệ.";
    return null;
  }, [normalizedPhone, phoneTouched, phoneValid]);

  useEffect(() => {
    if (canSubmit && !hasPulsedRef.current) {
      hasPulsedRef.current = true;
      setCtaPulse(true);
      const timer = window.setTimeout(() => setCtaPulse(false), 700);
      return () => window.clearTimeout(timer);
    }
    if (!canSubmit) hasPulsedRef.current = false;
  }, [canSubmit]);

  useEffect(() => {
    if (phase !== "success") return;
    setProgress(0);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      setProgress(Math.min(elapsed / SUCCESS_DELAY_MS, 1));
      if (elapsed < SUCCESS_DELAY_MS) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  const handlePhoneChange = (raw: string) => {
    setPhone(sanitizeBanggiaPhoneInput(raw));
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    const normalized = normalizeBanggiaPhone(phone);
    setPhone(normalized ? formatBanggiaPhoneDisplay(normalized) : normalized);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPhoneTouched(true);
    setError(null);

    const finalPhone = normalizeBanggiaPhone(phone);
    setPhone(formatBanggiaPhoneDisplay(finalPhone));

    if (!isValidBanggiaName(name) || !isValidBanggiaPhone(finalPhone)) return;

    captureBanggiaAttribution();
    const attribution = getBanggiaAttribution();
    const clientContext = getBanggiaClientContext();

    setLoading(true);
    try {
      const response = await fetch("/api/banggia-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: finalPhone,
          referrer: clientContext.referrer,
          device: clientContext.device,
          browser: clientContext.browser,
          ...attribution,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setError(payload?.error || "Không thể xác thực. Vui lòng thử lại.");
        return;
      }

      markBanggiaUnlocked({ name: name.trim(), phone: finalPhone });
      setPhase("success");
      onUnlockStart?.();
      window.setTimeout(() => {
        onUnlocked();
      }, SUCCESS_DELAY_MS);
    } catch {
      setError("Không kết nối được máy chủ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        className="absolute inset-0 bg-[#08090c]/70"
        aria-hidden
        initial={{ opacity: 1, backdropFilter: "blur(16px)" }}
        animate={{
          opacity: phase === "success" ? 0 : 1,
          backdropFilter: phase === "success" ? "blur(0px)" : "blur(16px)",
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 16 }}
        animate={
          phase === "success" && progress > 0.82
            ? { opacity: 0, scale: 0.97, y: -10 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={
          phase === "success" && progress > 0.82
            ? { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
            : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
        }
        className="relative w-full max-w-md border border-white/10 bg-[#0e1016]/95 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-9"
        role="dialog"
        aria-modal="true"
        aria-labelledby="banggia-gate-title"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className="mb-6 flex justify-center"
        >
          <Image src="/logo.png" alt="Bứt Phá Marketing" width={72} height={72} className="h-16 w-16 object-contain" />
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === "form" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <div className="mb-6 text-center">
                <h1
                  id="banggia-gate-title"
                  className="text-2xl font-semibold tracking-tight text-white sm:text-[1.65rem]"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                >
                  Mở bảng giá dịch vụ
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-white/45">
                  Nhập họ tên và hotline để xem giá. Mỗi số chỉ đăng ký một lần — lần sau không cần nhập lại.
                </p>
                <p className="mt-3 border border-amber-200/20 bg-amber-200/[0.06] px-3 py-2 text-xs font-medium text-amber-100/80">
                  Website từ 3 triệu · Fanpage từ 500K · Maps từ 300K
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="banggia-name" className="mb-1.5 block text-sm font-medium text-white/70">
                    Họ và tên <span className="text-amber-200/80">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="banggia-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Nhập họ và tên"
                      autoComplete="name"
                      aria-invalid={name.length > 0 && !nameValid}
                      className={`w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-amber-200/40 ${
                        nameValid ? "border-emerald-400/40" : ""
                      }`}
                    />
                    <ValidFieldIcon show={nameValid} />
                  </div>
                </div>

                <div>
                  <label htmlFor="banggia-phone" className="mb-1.5 block text-sm font-medium text-white/70">
                    Hotline <span className="text-amber-200/80">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="banggia-phone"
                      type="tel"
                      inputMode="tel"
                      value={phoneDisplay}
                      onChange={(event) => handlePhoneChange(event.target.value)}
                      onBlur={handlePhoneBlur}
                      placeholder="Nhập số điện thoại"
                      autoComplete="tel"
                      aria-invalid={!!phoneError}
                      aria-describedby={phoneError ? "banggia-phone-error" : undefined}
                      className={`w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-amber-200/40 ${
                        phoneValid ? "border-emerald-400/40" : phoneError ? "border-red-400/50" : ""
                      }`}
                    />
                    <ValidFieldIcon show={phoneValid} />
                  </div>
                  {phoneError ? (
                    <p id="banggia-phone-error" className="mt-1.5 text-sm text-red-300" role="alert">
                      {phoneError}
                    </p>
                  ) : null}
                </div>

                {error ? (
                  <p className="text-sm text-red-300" role="alert">
                    {error}
                  </p>
                ) : null}

                <motion.button
                  type="submit"
                  disabled={!canSubmit}
                  animate={
                    ctaPulse
                      ? {
                          scale: [1, 1.02, 1],
                          boxShadow: [
                            "0 4px 14px rgba(196,149,90,0.25)",
                            "0 8px 24px rgba(196,149,90,0.4)",
                            "0 4px 14px rgba(196,149,90,0.25)",
                          ],
                        }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.55 }}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-amber-200 px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0b0d12] shadow-md transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35 disabled:shadow-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Đang xử lý...
                    </>
                  ) : (
                    "Xem bảng giá"
                  )}
                </motion.button>

                <p className="flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-white/35">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/30" aria-hidden />
                  <span>Thông tin được bảo mật và chỉ dùng để tư vấn dịch vụ.</span>
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="py-4 text-center"
              aria-live="polite"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                <AnimatedCheckmark />
              </div>
              <p className="text-lg font-semibold text-white">Cảm ơn bạn.</p>
              <p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/50">
                <Loader2 className="h-4 w-4 animate-spin text-amber-200" aria-hidden />
                Đang mở bảng giá...
              </p>
              <div className="mx-auto mt-5 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-amber-200"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
