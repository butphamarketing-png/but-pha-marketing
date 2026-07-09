"use client";

import { ToolToastProvider } from "@/components/tools/ToolToast";
import { WatermarkAuthProvider } from "@/components/tools/WatermarkAuthProvider";
import { useWatermarkAuth } from "@/hooks/useWatermarkAuth";
import { LoginCard } from "@/components/tools/watermark-ui";

function WatermarkLoginGateInner({ children }: { children: React.ReactNode }) {
  const { session, fullName, setFullName, email, setEmail, phone, setPhone, loginError, handleLogin } = useWatermarkAuth();

  if (!session) {
    return (
      <LoginCard>
        <form className="space-y-4" onSubmit={handleLogin}>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Họ và tên</span>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Gmail</span>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              placeholder="example@gmail.com"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Số điện thoại</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              placeholder="09xxxxxxxx"
            />
          </label>
          {loginError ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600">{loginError}</p> : null}
          <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-indigo-900 to-violet-600 px-4 py-3 text-sm font-bold text-white shadow-brand-accent transition hover:opacity-95">
            Đăng nhập
          </button>
          <p className="text-center text-xs leading-relaxed text-slate-500">Mỗi Gmail + số điện thoại chỉ được đăng nhập một lần trên thiết bị hiện tại.</p>
        </form>
      </LoginCard>
    );
  }

  return <>{children}</>;
}

export function WatermarkLoginGate({ children }: { children: React.ReactNode }) {
  return (
    <WatermarkAuthProvider>
      <ToolToastProvider>
        <WatermarkLoginGateInner>{children}</WatermarkLoginGateInner>
      </ToolToastProvider>
    </WatermarkAuthProvider>
  );
}

export function useWatermarkSession() {
  const { session } = useWatermarkAuth();
  return session;
}
