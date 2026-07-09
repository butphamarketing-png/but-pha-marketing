"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle2, X, XCircle } from "lucide-react";

type ToastItem = { id: number; message: string; type: "success" | "error" };

type ToastContextValue = {
  toast: (message: string, type?: "success" | "error") => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToolToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3200);
  }, []);

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
        {items.map((item) => (
          <div
            key={item.id}
            className={`pointer-events-auto flex items-start gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-brand-lg backdrop-blur-md animate-in slide-in-from-right-4 ${
              item.type === "success"
                ? "border-emerald-200/80 bg-white/95 text-emerald-900"
                : "border-rose-200/80 bg-white/95 text-rose-900"
            }`}
          >
            {item.type === "success" ? <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" /> : <XCircle size={18} className="mt-0.5 shrink-0 text-rose-600" />}
            <span className="flex-1 leading-snug">{item.message}</span>
            <button type="button" onClick={() => dismiss(item.id)} className="shrink-0 text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToolToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) return { toast: () => undefined };
  return ctx;
}
