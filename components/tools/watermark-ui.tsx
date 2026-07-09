"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Download,
  FolderOpen,
  Grid3x3,
  ImageIcon,
  Maximize2,
  Minimize2,
  Moon,
  Redo2,
  Sparkles,
  Sun,
  Undo2,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { PRESET_ANCHOR_VISUAL, toolTokens } from "@/lib/tool-design-tokens";

const checkerBg =
  "bg-[linear-gradient(45deg,#eef2ff_25%,transparent_25%,transparent_75%,#eef2ff_75%),linear-gradient(45deg,#eef2ff_25%,transparent_25%,transparent_75%,#eef2ff_75%)] bg-[length:16px_16px] bg-[position:0_0,8px_8px]";

export function ToolNavBar({ userName }: { userName?: string }) {
  return (
    <nav className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80">
      <div className="flex items-center gap-3">
        <Link href="/" className="text-sm font-extrabold text-indigo-950 dark:text-white">
          Bứt Phá
        </Link>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <Link href="/cong-cu" className="text-xs font-semibold text-violet-700 hover:text-indigo-900 dark:text-violet-300">
          Công cụ
        </Link>
      </div>
      {userName ? (
        <span className="truncate text-xs font-medium text-slate-600 dark:text-slate-300">
          Xin chào, <span className="font-semibold text-indigo-900 dark:text-white">{userName}</span>
        </span>
      ) : null}
    </nav>
  );
}

export function ToolFooter() {
  return (
    <footer className="mt-8 rounded-2xl border border-indigo-100/80 bg-white/70 px-5 py-4 text-center text-xs text-slate-600 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
      Cần thiết kế banner, catalog hoặc chạy ads?{" "}
      <Link href="/lien-he" className="font-semibold text-violet-700 hover:underline dark:text-violet-300">
        Liên hệ Bứt Phá Marketing
      </Link>
    </footer>
  );
}

export function ToolShell({ children, userName }: { children: ReactNode; userName?: string }) {
  const [dark, setDark] = useState(false);

  return (
    <main className={`min-h-screen ${toolTokens.shellBg} transition-colors`}>
      <div className={`${dark ? "dark" : ""}`}>
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-900/20" />
          <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-900/20" />
        </div>
        <div className="relative mx-auto max-w-7xl px-3 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => setDark((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-violet-100 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-violet-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              title="Đổi giao diện sáng/tối"
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
              {dark ? "Sáng" : "Tối"}
            </button>
          </div>
          <ToolNavBar userName={userName} />
          {children}
          <ToolFooter />
        </div>
      </div>
    </main>
  );
}

export function ToolHubHeader({ userName, title, subtitle }: { userName: string; title: string; subtitle: string }) {
  return (
    <header className={`overflow-hidden ${toolTokens.headerRadius} border border-white/60 bg-white/80 p-6 shadow-brand backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80`}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Bứt Phá Marketing</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-indigo-950 dark:text-white">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Xin chào <span className="font-semibold text-indigo-900 dark:text-white">{userName}</span>. {subtitle}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {["100% trên trình duyệt", "Không upload server", "Lưu logo & preset tự động"].map((item) => (
          <li key={item} className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-800 dark:bg-violet-950/50 dark:text-violet-200">
            {item}
          </li>
        ))}
      </ul>
    </header>
  );
}

export function ToolPageHeader({
  userName,
  title,
  subtitle,
  icon,
  backHref = "/cong-cu",
}: {
  userName: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  backHref?: string;
}) {
  return (
    <header className={`overflow-hidden ${toolTokens.headerRadius} border border-white/60 bg-white/80 p-5 shadow-brand backdrop-blur-md sm:p-6 dark:border-slate-700 dark:bg-slate-900/80`}>
      <Link href={backHref} className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 transition hover:text-indigo-900 dark:text-violet-300">
        <ArrowLeft size={14} />
        Tất cả công cụ
      </Link>
      <div className="flex items-start gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${toolTokens.accentGradient} text-white shadow-brand-accent`}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Công cụ miễn phí</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-indigo-950 sm:text-3xl dark:text-white">{title}</h1>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Xin chào <span className="font-semibold text-indigo-900 dark:text-white">{userName}</span>. {subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}

export function ToolHubCard({
  href,
  title,
  description,
  icon,
  badge,
  disabled,
}: {
  href?: string;
  title: string;
  description: string;
  icon: ReactNode;
  badge?: string;
  disabled?: boolean;
}) {
  const inner = (
    <>
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-100/60 transition group-hover:bg-violet-200/60" />
      <div className="relative flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${toolTokens.accentGradient} text-white shadow-sm`}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-indigo-950 dark:text-white">{title}</h2>
            {badge ? (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">{badge}</span>
            ) : null}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
          {!disabled ? (
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-violet-700 transition-all group-hover:gap-2 dark:text-violet-300">
              Mở công cụ →
            </span>
          ) : (
            <span className="mt-3 inline-block text-xs font-bold uppercase tracking-wide text-slate-400">Sắp ra mắt</span>
          )}
        </div>
      </div>
    </>
  );

  if (disabled || !href) {
    return (
      <div className="relative overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-slate-50/80 p-5 opacity-80 sm:p-6 dark:border-slate-700 dark:bg-slate-800/50">
        {inner}
      </div>
    );
  }

  return (
    <Link href={href} className="group relative block overflow-hidden rounded-[1.35rem] border border-white/80 bg-white/90 p-5 shadow-brand backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-brand-lg sm:p-6 dark:border-slate-700 dark:bg-slate-900/80">
      {inner}
    </Link>
  );
}

export function HubSeoBlock() {
  return (
    <section className={`${toolTokens.panelRadius} border border-indigo-100/90 bg-white/90 p-6 shadow-brand dark:border-slate-700 dark:bg-slate-900/80`}>
      <h2 className="text-xl font-bold text-indigo-950 dark:text-white">Công cụ xử lý ảnh miễn phí cho marketer</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Bộ công cụ Bứt Phá Marketing giúp bạn đóng dấu logo hàng loạt và xóa nền ảnh sản phẩm ngay trên trình duyệt. Phù hợp cho shop online, agency và team content cần xử lý nhanh mà không lo lộ dữ liệu khách hàng.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Tất cả thao tác chạy client-side — ảnh không được gửi lên server. Sau lần tải model AI đầu tiên, công cụ xóa nền có thể dùng offline.
      </p>
    </section>
  );
}

export function OnboardingTip({ storageKey, message }: { storageKey: string; message: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(storageKey)) setVisible(true);
  }, [storageKey]);

  if (!visible) return null;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-violet-200 bg-violet-50/80 px-4 py-3 text-xs leading-relaxed text-violet-900 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-100">
      <Sparkles size={16} className="mt-0.5 shrink-0" />
      <p className="flex-1">{message}</p>
      <button
        type="button"
        onClick={() => {
          localStorage.setItem(storageKey, "1");
          setVisible(false);
        }}
        className="shrink-0 font-bold text-violet-700"
      >
        Đã hiểu
      </button>
    </div>
  );
}

export function CanvasToolbar({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  zoom,
  onZoomChange,
  showGrid,
  onToggleGrid,
  onFullscreen,
}: {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  zoom?: "fit" | "100";
  onZoomChange?: (z: "fit" | "100") => void;
  showGrid?: boolean;
  onToggleGrid?: () => void;
  onFullscreen?: () => void;
}) {
  const btn = "inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:bg-violet-50 disabled:opacity-40 dark:text-slate-200 dark:hover:bg-slate-700";

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-xl border border-violet-100 bg-white/95 p-1 shadow-sm dark:border-slate-600 dark:bg-slate-800/95">
      <button type="button" onClick={onUndo} disabled={!canUndo} title="Hoàn tác (Ctrl+Z)" className={btn}>
        <Undo2 size={14} />
        Hoàn tác
      </button>
      <button type="button" onClick={onRedo} disabled={!canRedo} title="Làm lại (Ctrl+Y)" className={btn}>
        <Redo2 size={14} />
        Làm lại
      </button>
      {onZoomChange ? (
        <>
          <span className="mx-0.5 h-4 w-px bg-violet-100 dark:bg-slate-600" />
          <button type="button" onClick={() => onZoomChange("fit")} className={`${btn} ${zoom === "fit" ? "bg-violet-100 text-violet-800" : ""}`}>
            Vừa khung
          </button>
          <button type="button" onClick={() => onZoomChange("100")} className={`${btn} ${zoom === "100" ? "bg-violet-100 text-violet-800" : ""}`}>
            100%
          </button>
        </>
      ) : null}
      {onToggleGrid ? (
        <button type="button" onClick={onToggleGrid} className={`${btn} ${showGrid ? "bg-violet-100 text-violet-800" : ""}`} title="Lưới safe area">
          <Grid3x3 size={14} />
        </button>
      ) : null}
      {onFullscreen ? (
        <button type="button" onClick={onFullscreen} className={btn} title="Xem toàn màn hình">
          <Maximize2 size={14} />
        </button>
      ) : null}
    </div>
  );
}

export function LoginCard({ children }: { children: ReactNode }) {
  return (
    <main className={`flex min-h-screen items-center justify-center ${toolTokens.shellBg} px-4 py-12`}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 h-64 w-64 rounded-full bg-violet-300/25 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
      </div>
      <div className="relative grid w-full max-w-4xl gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="hidden overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-brand-lg backdrop-blur lg:block">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-600">Trước / Sau</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-100 p-2">
              <img src="/cong-cu/sample-photo.svg" alt="Trước" className="rounded-lg" />
              <p className="mt-2 text-center text-xs font-semibold text-slate-500">Ảnh gốc</p>
            </div>
            <div className={`rounded-xl p-2 ${checkerBg}`}>
              <div className="flex h-full min-h-[120px] items-center justify-center rounded-lg bg-violet-600/10 text-xs font-bold text-violet-700">
                + Logo watermark
              </div>
              <p className="mt-2 text-center text-xs font-semibold text-slate-500">Sau đóng dấu</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">Xử lý hàng loạt, preset theo %, xuất ZIP — không cần Photoshop.</p>
        </div>
        <div className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 p-8 shadow-brand-lg backdrop-blur">
          <div className="mb-6 flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toolTokens.accentGradient} text-white`}>
              <Sparkles size={22} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-indigo-950">Bứt Phá Marketing</h1>
              <p className="text-sm text-slate-500">Đăng nhập để dùng công cụ</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

export function ToolPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${toolTokens.panelRadius} border border-white/80 bg-white/90 p-4 shadow-brand backdrop-blur-sm sm:p-5 dark:border-slate-700 dark:bg-slate-900/80 ${className}`}>
      {children}
    </div>
  );
}

type DropZoneProps = {
  label: string;
  hint: string;
  accept: string;
  multiple?: boolean;
  directory?: boolean;
  onFiles: (files: FileList | null) => void;
  previewUrl?: string;
  fileName?: string;
  fileMeta?: string;
  step?: number;
};

export function WatermarkDropZone({
  label,
  hint,
  accept,
  multiple,
  directory,
  onFiles,
  previewUrl,
  fileName,
  fileMeta,
  step,
}: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const openPicker = () => inputRef.current?.click();

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        {step ? <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-600 text-[11px] font-bold text-white">{step}</span> : null}
        <p className="text-sm font-bold text-indigo-950 dark:text-white">{label}</p>
      </div>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openPicker();
        }}
        onClick={openPicker}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          onFiles(e.dataTransfer.files);
        }}
        className={`group cursor-pointer rounded-2xl border-2 border-dashed p-4 transition-all duration-200 ${
          dragOver
            ? "scale-[1.01] border-violet-500 bg-violet-50 shadow-md dark:bg-violet-950/30"
            : "border-violet-200/80 bg-gradient-to-b from-violet-50/30 to-white hover:border-violet-400 hover:shadow-sm dark:from-slate-800/50 dark:to-slate-900/50"
        }`}
      >
        {previewUrl ? (
          <div className="flex items-center gap-4">
            <div className={`overflow-hidden rounded-xl border border-violet-100 shadow-sm ${checkerBg}`}>
              <img src={previewUrl} alt="" className="h-20 w-20 object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-indigo-950 dark:text-white">{fileName ?? "Đã chọn file"}</p>
              {fileMeta ? <p className="mt-0.5 text-xs font-medium text-violet-700 dark:text-violet-300">{fileMeta}</p> : null}
              <p className="mt-0.5 text-xs text-slate-500">Nhấn hoặc kéo thả để thay đổi</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">OK</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2.5 py-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700 transition group-hover:scale-105">
              <Upload size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-950 dark:text-white">Kéo thả hoặc nhấn để chọn</p>
              <p className="mt-1 text-xs text-slate-500">{hint}</p>
            </div>
          </div>
        )}
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="hidden" onChange={(e) => onFiles(e.target.files)} {...(directory ? { webkitdirectory: "", directory: "" } : {})} />
      </div>
    </div>
  );
}

export function StepProgress({ steps }: { steps: { label: string; done: boolean }[] }) {
  return (
    <ToolPanel>
      <div className="flex items-center justify-between gap-1">
        {steps.map((step, index) => (
          <div key={step.label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                  step.done ? "bg-gradient-to-br from-violet-600 to-indigo-800 text-white shadow-md" : "border-2 border-violet-200 bg-white text-violet-400 dark:bg-slate-800"
                }`}
                title={step.label}
              >
                {step.done ? <Check size={14} /> : index + 1}
              </div>
              <span className={`text-[10px] font-semibold sm:text-xs ${step.done ? "text-indigo-900 dark:text-white" : "text-slate-400"}`}>{step.label}</span>
            </div>
            {index < steps.length - 1 ? <div className={`mx-1 mb-5 h-0.5 flex-1 rounded-full ${step.done ? "bg-violet-400" : "bg-violet-100"}`} /> : null}
          </div>
        ))}
      </div>
    </ToolPanel>
  );
}

export function ToolSection({ title, children, defaultOpen = true, icon }: { title: string; children: ReactNode; defaultOpen?: boolean; icon?: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <ToolPanel className="!p-0 overflow-hidden">
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between px-4 py-3.5 text-left transition hover:bg-violet-50/50 sm:px-5 dark:hover:bg-slate-800/50">
        <span className="flex items-center gap-2 text-sm font-bold text-indigo-950 dark:text-white">
          {icon}
          {title}
        </span>
        <ChevronDown size={18} className={`text-violet-500 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? <div className="space-y-3 border-t border-violet-50 px-4 pb-4 pt-3 sm:px-5 dark:border-slate-700">{children}</div> : null}
    </ToolPanel>
  );
}

export function RangeField({
  label,
  value,
  min,
  max,
  step,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-slate-600 dark:text-slate-300">{label}</label>
        <span className="rounded-md bg-violet-50 px-2 py-0.5 text-xs font-bold tabular-nums text-violet-700 dark:bg-violet-950/50 dark:text-violet-200">
          {value.toFixed(step < 1 ? 1 : 0)}
          {suffix}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="tool-range w-full cursor-pointer" />
    </div>
  );
}

function PresetMiniVisual({ anchor }: { anchor: string }) {
  const pos = PRESET_ANCHOR_VISUAL[anchor] ?? PRESET_ANCHOR_VISUAL.center;
  return (
    <div className="relative h-10 w-10 shrink-0 rounded-lg border border-violet-200/80 bg-gradient-to-br from-slate-50 to-violet-50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-700">
      <span className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-violet-600 shadow-sm" style={{ left: pos.x, top: pos.y }} />
    </div>
  );
}

export function PresetGrid({
  presets,
  activeId,
  onSelect,
}: {
  presets: { id: string; name: string; anchor?: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {presets.map((preset) => (
        <button
          key={preset.id}
          type="button"
          onClick={() => onSelect(preset.id)}
          className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs font-semibold transition ${
            activeId === preset.id
              ? "bg-gradient-to-r from-indigo-900 to-violet-600 text-white shadow-brand-accent"
              : "border border-violet-100 bg-violet-50/60 text-violet-900 hover:border-violet-300 hover:bg-violet-100 dark:border-slate-600 dark:bg-slate-800 dark:text-violet-100"
          }`}
        >
          <PresetMiniVisual anchor={preset.anchor ?? preset.id} />
          <span className="min-w-0 flex-1 leading-tight">{preset.name}</span>
        </button>
      ))}
    </div>
  );
}

export function UploadActionRow({ onPickImages, onPickFolder }: { onPickImages: (files: FileList | null) => void; onPickFolder: (files: FileList | null) => void }) {
  const imageRef = useRef<HTMLInputElement>(null);
  const folderRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => imageRef.current?.click()} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-violet-200 bg-white px-3 py-2 text-xs font-semibold text-violet-800 transition hover:bg-violet-50 dark:border-slate-600 dark:bg-slate-800 dark:text-violet-200">
        <ImageIcon size={14} />
        Nhiều ảnh
      </button>
      <button type="button" onClick={() => folderRef.current?.click()} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
        <FolderOpen size={14} />
        Thư mục
      </button>
      <input ref={imageRef} type="file" accept="image/png,image/jpeg,image/webp" multiple className="hidden" onChange={(e) => onPickImages(e.target.files)} />
      <input ref={folderRef} type="file" multiple accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(e) => onPickFolder(e.target.files)} {...{ webkitdirectory: "", directory: "" }} />
    </div>
  );
}

export function BtnPrimary({ children, onClick, disabled, icon, className = "" }: { children: ReactNode; onClick?: () => void; disabled?: boolean; icon?: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-xl ${toolTokens.accentGradient} px-4 py-3 text-sm font-bold text-white shadow-brand-accent transition hover:opacity-95 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

export function BtnSecondary({ children, onClick, disabled, icon, className = "" }: { children: ReactNode; onClick?: () => void; disabled?: boolean; icon?: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-800 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-violet-200 ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

export function PreviewFrame({ children, empty, showGrid }: { children?: ReactNode; empty?: ReactNode; showGrid?: boolean }) {
  return (
    <div className={`relative flex ${toolTokens.previewMinHeight} items-center justify-center overflow-auto rounded-2xl border border-violet-100 p-4 shadow-inner dark:border-slate-600 ${checkerBg}`}>
      {showGrid ? (
        <div
          className="pointer-events-none absolute inset-4 rounded-xl border-2 border-dashed border-violet-300/50"
          style={{ margin: "3%" }}
          title="Safe area 3%"
        />
      ) : null}
      {children ?? empty}
    </div>
  );
}

export function ImageThumbStrip({
  images,
  selectedIndex,
  onSelect,
  onRemove,
}: {
  images: { file: File; dataUrl: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onRemove?: (index: number) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory">
      {images.map((img, index) => (
        <div key={`${img.file.name}-${index}`} className="relative shrink-0 snap-start">
          <button
            type="button"
            onClick={() => onSelect(index)}
            className={`block overflow-hidden rounded-xl border-2 transition ${
              selectedIndex === index ? "border-violet-600 ring-2 ring-violet-200" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img src={img.dataUrl} alt="" className="h-16 w-16 object-cover" />
            <span className="block max-w-[64px] truncate px-1 py-0.5 text-[9px] font-medium text-slate-600 dark:text-slate-300">{img.file.name}</span>
          </button>
          {onRemove ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(index);
              }}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm"
              title="Xóa ảnh"
            >
              <X size={10} />
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function CompareSlider({
  beforeUrl,
  afterUrl,
  split,
  onSplitChange,
}: {
  beforeUrl: string;
  afterUrl: string;
  split: number;
  onSplitChange: (value: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pct = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
      onSplitChange(Math.round(pct));
    },
    [onSplitChange],
  );

  return (
    <div className="rounded-2xl border border-violet-100 bg-white p-4 dark:border-slate-600 dark:bg-slate-900/80">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">So sánh trước / sau</p>
        <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-bold tabular-nums text-violet-700 dark:bg-violet-950/50 dark:text-violet-200">{split}%</span>
      </div>
      <div
        ref={containerRef}
        className="relative cursor-ew-resize overflow-hidden rounded-xl shadow-sm select-none"
        onPointerDown={(e) => {
          dragging.current = true;
          updateFromClientX(e.clientX);
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (dragging.current) updateFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
      >
        <img src={beforeUrl} alt="Trước" className="block w-full" draggable={false} />
        <img src={afterUrl} alt="Sau" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }} draggable={false} />
        <div className="pointer-events-none absolute bottom-2 left-2 rounded bg-black/50 px-2 py-0.5 text-[10px] font-bold text-white">Trước</div>
        <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-violet-600/80 px-2 py-0.5 text-[10px] font-bold text-white">Sau</div>
        <div className="pointer-events-none absolute bottom-0 top-0 w-1 bg-white shadow-lg" style={{ left: `${split}%`, transform: "translateX(-50%)" }}>
          <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-violet-600 shadow-lg">
            <span className="text-[10px] font-bold text-white">↔</span>
          </div>
        </div>
      </div>
      <input type="range" min={0} max={100} step={1} value={split} onChange={(e) => onSplitChange(Number(e.target.value))} className="tool-range mt-3 w-full" />
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function BatchProgressBar({
  current,
  total,
  running,
  isPaused,
  onPause,
  onResume,
  onCancel,
}: {
  current: number;
  total: number;
  running: boolean;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
}) {
  if (total <= 0) return null;
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mt-4 space-y-2">
      <div className="h-2 overflow-hidden rounded-full bg-violet-100 dark:bg-slate-700">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-700 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-center text-xs font-medium text-slate-600 dark:text-slate-300">
        {current} / {total} ảnh ({pct}%){isPaused ? " · Đang tạm dừng" : ""}
      </p>
      <div className="flex gap-2">
        <button type="button" onClick={isPaused ? onResume : onPause} disabled={!running} className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-semibold disabled:opacity-40 dark:border-slate-600">
          {isPaused ? "Tiếp tục" : "Tạm dừng"}
        </button>
        <button type="button" onClick={onCancel} disabled={!running} className="flex-1 rounded-xl border border-rose-200 py-2 text-xs font-semibold text-rose-600 disabled:opacity-40">
          Hủy
        </button>
      </div>
    </div>
  );
}

export function ProgressRing({ percent, label }: { percent: number; label: string }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="88" height="88" className="-rotate-90">
        <circle cx="44" cy="44" r={r} fill="none" stroke="#ede9fe" strokeWidth="8" />
        <circle cx="44" cy="44" r={r} fill="none" stroke="#7c3aed" strokeWidth="8" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-300" />
      </svg>
      <p className="text-center text-xs font-medium text-violet-800 dark:text-violet-200">{label}</p>
      <p className="text-lg font-bold tabular-nums text-indigo-950 dark:text-white">{percent}%</p>
    </div>
  );
}

export function ShimmerBox({ className = "" }: { className?: string }) {
  return <div className={`tool-shimmer rounded-xl ${className}`} />;
}

export function MobileStickyBar({ children }: { children: ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-violet-100 bg-white/95 p-3 shadow-brand-lg backdrop-blur-md lg:hidden dark:border-slate-700 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-lg gap-2">{children}</div>
    </div>
  );
}

export function MobileToolTabs({
  active,
  onChange,
  tabs,
}: {
  active: string;
  onChange: (id: string) => void;
  tabs: { id: string; label: string }[];
}) {
  return (
    <div className="flex gap-1 rounded-xl border border-violet-100 bg-violet-50/60 p-1 lg:hidden dark:border-slate-600 dark:bg-slate-800/60">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`flex-1 rounded-lg px-2 py-2 text-xs font-semibold transition ${active === tab.id ? "bg-white text-violet-700 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function KeyboardShortcutsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  const shortcuts = [
    ["Ctrl + Z", "Hoàn tác"],
    ["Ctrl + Y", "Làm lại"],
    ["?", "Hiện phím tắt"],
  ];
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-brand-lg dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-indigo-950 dark:text-white">Phím tắt</h3>
          <button type="button" onClick={onClose}>
            <Minimize2 size={18} />
          </button>
        </div>
        <ul className="space-y-2">
          {shortcuts.map(([key, desc]) => (
            <li key={key} className="flex justify-between text-sm">
              <kbd className="rounded bg-violet-50 px-2 py-0.5 font-mono text-xs font-bold text-violet-800 dark:bg-slate-800 dark:text-violet-200">{key}</kbd>
              <span className="text-slate-600 dark:text-slate-300">{desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function FullscreenPreview({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <button type="button" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white" onClick={onClose}>
        <X size={24} />
      </button>
      <img src={url} alt="Preview" className="max-h-full max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

export { checkerBg };
