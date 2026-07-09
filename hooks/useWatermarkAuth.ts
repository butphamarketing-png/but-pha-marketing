"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { SESSION_KEY, USED_IDENTITIES_KEY } from "@/lib/watermark-core";

export type LoginSession = {
  fullName: string;
  email: string;
  phone: string;
  acceptedAt: string;
};

export type WatermarkAuthContextValue = {
  session: LoginSession | null;
  fullName: string;
  setFullName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  loginError: string;
  handleLogin: (event: React.FormEvent) => void;
};

export const WatermarkAuthContext = createContext<WatermarkAuthContextValue | null>(null);

export function useWatermarkAuthState(): WatermarkAuthContextValue {
  const [session, setSession] = useState<LoginSession | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) setSession(JSON.parse(raw));
  }, []);

  const handleLogin = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const emailValid = /^[^\s@]+@gmail\.com$/i.test(email.trim());
      const phoneDigits = phone.replace(/\D/g, "");
      const phoneValid = /^0\d{9,10}$/.test(phoneDigits);
      if (!fullName.trim()) {
        setLoginError("Vui lòng nhập họ và tên.");
        return;
      }
      if (!emailValid) {
        setLoginError("Vui lòng dùng Gmail hợp lệ.");
        return;
      }
      if (!phoneValid) {
        setLoginError("Số điện thoại cần đúng định dạng Việt Nam.");
        return;
      }
      const usedRaw = localStorage.getItem(USED_IDENTITIES_KEY);
      const used: { emails: string[]; phones: string[] } = usedRaw ? JSON.parse(usedRaw) : { emails: [], phones: [] };
      const normalizedEmail = email.trim().toLowerCase();
      if (used.emails.includes(normalizedEmail)) {
        setLoginError("Gmail này đã đăng nhập trước đó trên thiết bị này.");
        return;
      }
      if (used.phones.includes(phoneDigits)) {
        setLoginError("Số điện thoại này đã đăng nhập trước đó trên thiết bị này.");
        return;
      }
      used.emails.push(normalizedEmail);
      used.phones.push(phoneDigits);
      localStorage.setItem(USED_IDENTITIES_KEY, JSON.stringify(used));
      const nextSession: LoginSession = {
        fullName: fullName.trim(),
        email: normalizedEmail,
        phone: phoneDigits,
        acceptedAt: new Date().toISOString(),
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
      setSession(nextSession);
      setLoginError("");
    },
    [fullName, email, phone],
  );

  return { session, fullName, setFullName, email, setEmail, phone, setPhone, loginError, handleLogin };
}

export function useWatermarkAuth() {
  const ctx = useContext(WatermarkAuthContext);
  if (!ctx) throw new Error("useWatermarkAuth must be used within WatermarkAuthProvider");
  return ctx;
}
