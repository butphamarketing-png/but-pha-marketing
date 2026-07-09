"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Download,
  FolderOpen,
  ImageIcon,
  Redo2,
  Sparkles,
  Stamp,
  Undo2,
  Upload,
  Wand2,
} from "lucide-react";
import Link from "next/link";

const checkerBg =
  "bg-[linear-gradient(45deg,#eef2ff_25%,transparent_25%,transparent_75%,#eef2ff_75%),linear-gradient(45deg,#eef2ff_25%,transparent_25%,transparent_75%,#eef2ff_75%)] bg-[length:16px_16px] bg-[position:0_0,8px_8px]";

export function ToolShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f4f6fc]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
        <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-fuchsia-200/15 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
    </main>
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
    <header className="overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/80 p-5 shadow-brand backdrop-blur-md sm:p-6">
      <Link
        href={backHref}
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 transition hover:text-indigo-900"
      >
        <ArrowLeft size={14} />
        Tất cả công cụ
      </Link>
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-900 to-violet-600 text-white shadow-brand-accent">
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Công cụ miễn phí</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-indigo-950 sm:text-3xl">{title}</h1>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-600">
            Xin chào <span className="font-semibold text-indigo-900">{userName}</span>. {subtitle}
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
}: {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[1.35rem] border border-white/80 bg-white/90 p-5 shadow-brand backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-brand-lg sm:p-6"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-100/60 transition group-hover:bg-violet-200/60" />
      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-900 to-violet-600 text-white shadow-sm">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-indigo-950">{title}</h2>
            {badge ? (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                {badge}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-violet-700 group-hover:gap-2 transition-all">
            Mở công cụ →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CanvasToolbar({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-violet-100 bg-white/90 p-1 shadow-sm">
      <button
        type="button"
        onClick={onUndo}
        disabled={!canUndo}
        title="Hoàn tác (Ctrl+Z)"
        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-violet-50 disabled:opacity-40"
      >
        <Undo2 size={14} />
        Undo
      </button>
      <button
        type="button"
        onClick={onRedo}
        disabled={!canRedo}
        title="Làm lại (Ctrl+Y)"
        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-violet-50 disabled:opacity-40"
      >
        <Redo2 size={14} />
        Redo
      </button>
    </div>
  );
}

/** @deprecated Use ToolPageHeader on sub-routes */
export function ToolHero({
  userName,
  activeTab,
  onTabChange,
}: {
  userName: string;
  activeTab: "watermark" | "remove-bg";
  onTabChange: (tab: "watermark" | "remove-bg") => void;
}) {
  return (
    <header className="overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/80 p-5 shadow-brand backdrop-blur-md sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-900 to-violet-600 text-white shadow-brand-accent">
            <Stamp size={26} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Công cụ miễn phí</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-indigo-950 sm:text-3xl">Đóng dấu logo</h1>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-600">
              Xin chào <span className="font-semibold text-indigo-900">{userName}</span>. Xử lý 100% trên trình duyệt — không upload ảnh lên server.
            </p>
          </div>
        </div>
        <div className="inline-flex self-start rounded-2xl border border-violet-100 bg-violet-50/80 p-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => onTabChange("watermark")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === "watermark" ? "bg-white text-violet-700 shadow-sm" : "text-slate-600 hover:text-indigo-900"
            }`}
          >
            <Stamp size={16} />
            Đóng dấu
          </button>
          <button
            type="button"
            onClick={() => onTabChange("remove-bg")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === "remove-bg" ? "bg-white text-violet-700 shadow-sm" : "text-slate-600 hover:text-indigo-900"
            }`}
          >
            <Wand2 size={16} />
            Xóa nền AI
          </button>
        </div>
      </div>
    </header>
  );
}

export function LoginCard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f6fc] px-4 py-12">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 h-64 w-64 rounded-full bg-violet-300/25 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
      </div>
      <div className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 p-8 shadow-brand-lg backdrop-blur">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-900 to-violet-600 text-white">
            <Sparkles size={22} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-indigo-950">Bứt Phá Marketing</h1>
            <p className="text-sm text-slate-500">Đăng nhập để dùng công cụ</p>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}

export function ToolPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[1.35rem] border border-white/80 bg-white/90 p-4 shadow-brand backdrop-blur-sm sm:p-5 ${className}`}>
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
  step,
}: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const openPicker = () => inputRef.current?.click();

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        {step ? (
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-600 text-[11px] font-bold text-white">
            {step}
          </span>
        ) : null}
        <p className="text-sm font-bold text-indigo-950">{label}</p>
      </div>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") openPicker();
        }}
        onClick={openPicker}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          onFiles(event.dataTransfer.files);
        }}
        className={`group cursor-pointer rounded-2xl border-2 border-dashed p-4 transition-all duration-200 ${
          dragOver
            ? "scale-[1.01] border-violet-500 bg-violet-50 shadow-md"
            : "border-violet-200/80 bg-gradient-to-b from-violet-50/30 to-white hover:border-violet-400 hover:shadow-sm"
        }`}
      >
        {previewUrl ? (
          <div className="flex items-center gap-4">
            <div className={`overflow-hidden rounded-xl border border-violet-100 shadow-sm ${checkerBg}`}>
              <img src={previewUrl} alt="" className="h-20 w-20 object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-indigo-950">{fileName ?? "Đã chọn file"}</p>
              <p className="mt-0.5 text-xs text-slate-500">Nhấn hoặc kéo thả để thay đổi</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
              OK
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2.5 py-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700 transition group-hover:scale-105">
              <Upload size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-950">Kéo thả hoặc nhấn để chọn</p>
              <p className="mt-1 text-xs text-slate-500">{hint}</p>
            </div>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(event) => onFiles(event.target.files)}
          {...(directory ? { webkitdirectory: "", directory: "" } : {})}
        />
      </div>
    </div>
  );
}

export function StepProgress({
  steps,
}: {
  steps: { label: string; done: boolean }[];
}) {
  return (
    <ToolPanel>
      <div className="flex items-center justify-between gap-1">
        {steps.map((step, index) => (
          <div key={step.label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                  step.done
                    ? "bg-gradient-to-br from-violet-600 to-indigo-800 text-white shadow-md"
                    : "border-2 border-violet-200 bg-white text-violet-400"
                }`}
              >
                {step.done ? <Check size={14} /> : index + 1}
              </div>
              <span className={`text-[10px] font-semibold sm:text-xs ${step.done ? "text-indigo-900" : "text-slate-400"}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <div className={`mx-1 mb-5 h-0.5 flex-1 rounded-full ${step.done ? "bg-violet-400" : "bg-violet-100"}`} />
            ) : null}
          </div>
        ))}
      </div>
    </ToolPanel>
  );
}

export function ToolSection({
  title,
  children,
  defaultOpen = true,
  icon,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <ToolPanel className="!p-0 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left transition hover:bg-violet-50/50 sm:px-5"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-indigo-950">
          {icon}
          {title}
        </span>
        <ChevronDown size={18} className={`text-violet-500 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? <div className="space-y-3 border-t border-violet-50 px-4 pb-4 pt-3 sm:px-5">{children}</div> : null}
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
        <label className="text-xs font-medium text-slate-600">{label}</label>
        <span className="rounded-md bg-violet-50 px-2 py-0.5 text-xs font-bold text-violet-700">
          {value.toFixed(step < 1 ? 1 : 0)}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-violet-100 accent-violet-600"
      />
    </div>
  );
}

export function PresetGrid({
  presets,
  activeId,
  onSelect,
}: {
  presets: { id: string; name: string }[];
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
          className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
            activeId === preset.id
              ? "bg-gradient-to-r from-indigo-900 to-violet-600 text-white shadow-brand-accent"
              : "border border-violet-100 bg-violet-50/60 text-violet-900 hover:border-violet-300 hover:bg-violet-100"
          }`}
        >
          {preset.name}
        </button>
      ))}
    </div>
  );
}

export function UploadActionRow({
  onPickImages,
  onPickFolder,
}: {
  onPickImages: (files: FileList | null) => void;
  onPickFolder: (files: FileList | null) => void;
}) {
  const imageRef = useRef<HTMLInputElement>(null);
  const folderRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => imageRef.current?.click()}
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-violet-200 bg-white px-3 py-2 text-xs font-semibold text-violet-800 transition hover:bg-violet-50"
      >
        <ImageIcon size={14} />
        Nhiều ảnh
      </button>
      <button
        type="button"
        onClick={() => folderRef.current?.click()}
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <FolderOpen size={14} />
        Thư mục
      </button>
      <input ref={imageRef} type="file" accept="image/png,image/jpeg,image/webp" multiple className="hidden" onChange={(e) => onPickImages(e.target.files)} />
      <input
        ref={folderRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => onPickFolder(e.target.files)}
        {...{ webkitdirectory: "", directory: "" }}
      />
    </div>
  );
}

export function BtnPrimary({
  children,
  onClick,
  disabled,
  icon,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-900 to-violet-600 px-4 py-3 text-sm font-bold text-white shadow-brand-accent transition hover:opacity-95 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none"
    >
      {icon}
      {children}
    </button>
  );
}

export function BtnSecondary({
  children,
  onClick,
  disabled,
  icon,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-800 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {icon}
      {children}
    </button>
  );
}

export function PreviewFrame({
  children,
  empty,
}: {
  children?: ReactNode;
  empty?: ReactNode;
}) {
  return (
    <div
      className={`flex min-h-[360px] items-center justify-center overflow-auto rounded-2xl border border-violet-100 p-4 shadow-inner ${checkerBg}`}
    >
      {children ?? empty}
    </div>
  );
}

export function ImageThumbStrip({
  images,
  selectedIndex,
  onSelect,
}: {
  images: { file: File; dataUrl: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {images.map((img, index) => (
        <button
          key={`${img.file.name}-${index}`}
          type="button"
          onClick={() => onSelect(index)}
          className={`group relative shrink-0 overflow-hidden rounded-xl border-2 transition ${
            selectedIndex === index ? "border-violet-600 ring-2 ring-violet-200" : "border-transparent opacity-70 hover:opacity-100"
          }`}
        >
          <img src={img.dataUrl} alt="" className="h-16 w-16 object-cover" />
          {selectedIndex === index ? (
            <span className="absolute inset-x-0 bottom-0 bg-violet-600/90 py-0.5 text-[9px] font-bold text-white">Đang xem</span>
          ) : null}
        </button>
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
  return (
    <div className="rounded-2xl border border-violet-100 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">So sánh trước / sau</p>
        <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-bold text-violet-700">{split}%</span>
      </div>
      <div className="relative overflow-hidden rounded-xl shadow-sm">
        <img src={beforeUrl} alt="Trước" className="block w-full" />
        <img
          src={afterUrl}
          alt="Sau"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        />
        <div
          className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${split}%` }}
        />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={split}
        onChange={(e) => onSplitChange(Number(e.target.value))}
        className="mt-3 w-full accent-violet-600"
      />
    </div>
  );
}

export { checkerBg };
