"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Globe,
  Heart,
  MapPin,
  Sparkles,
  TrendingUp,
  UserPlus,
  Wallet,
  Facebook,
  Layers,
} from "lucide-react";
import {
  BUSINESS_GOALS,
  CHANNEL_ASSET_IDS,
  CHANNEL_OWNED_SETUP,
  EXISTING_ASSET_OPTIONS,
  PLATFORM_FOCUS_OPTIONS,
  formatVnd,
  type PlatformFocus,
} from "@/lib/marketing-strategy-profiles";
import { formatDraftSavedAt } from "@/lib/strategy-storage";

export const FORM_STEPS = [
  { step: 1, label: "Liên hệ", desc: "Thông tin cơ bản" },
  { step: 2, label: "Ngành & mục tiêu", desc: "Ngành nghề kinh doanh" },
  { step: 3, label: "Nền tảng", desc: "Ưu tiên & tài sản hiện có" },
  { step: 4, label: "Ngân sách", desc: "Quy mô & mức chi" },
] as const;

export const TOTAL_FORM_STEPS = FORM_STEPS.length;

const GOAL_META: Record<string, { icon: typeof UserPlus; hint: string; color: string }> = {
  "Tăng khách hàng mới": {
    icon: UserPlus,
    hint: "Maps, ads & inbox — kéo lead nhanh",
    color: "border-emerald-400 bg-emerald-50 text-emerald-800",
  },
  "Tăng doanh thu": {
    icon: TrendingUp,
    hint: "Chuyển đổi web + remarketing",
    color: "border-blue-400 bg-blue-50 text-blue-800",
  },
  "Xây dựng thương hiệu": {
    icon: Sparkles,
    hint: "Content & showcase trước ads",
    color: "border-violet-400 bg-violet-50 text-violet-800",
  },
  "Giữ chân khách cũ": {
    icon: Heart,
    hint: "Nuôi content, CSKH & review",
    color: "border-rose-400 bg-rose-50 text-rose-800",
  },
};

const FOCUS_ICON: Record<PlatformFocus, typeof Layers> = {
  strategy: Layers,
  maps: MapPin,
  fanpage: Facebook,
  website: Globe,
};

const CHANNEL_ICON: Record<(typeof CHANNEL_ASSET_IDS)[number], typeof Globe> = {
  website: Globe,
  fanpage: Facebook,
  maps: MapPin,
};

export function FormStepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-1 sm:gap-2">
        {FORM_STEPS.map(({ step, label, desc }, i) => {
          const active = currentStep === step;
          const done = currentStep > step;
          return (
            <div key={step} className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
              <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black transition ${
                    active
                      ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md"
                      : done
                        ? "bg-emerald-500 text-white"
                        : "bg-violet-100 text-violet-400"
                  }`}
                >
                  {done ? "✓" : step}
                </span>
                <p className={`mt-1.5 truncate text-[9px] font-black uppercase sm:text-[10px] ${active ? "text-violet-800" : "text-slate-400"}`}>
                  {label}
                </p>
                <p className="hidden truncate text-[9px] text-slate-400 md:block">{desc}</p>
              </div>
              {i < FORM_STEPS.length - 1 && (
                <div className={`mb-5 hidden h-0.5 flex-1 sm:block ${done ? "bg-emerald-300" : "bg-violet-100"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function GoalCards({
  value,
  onChange,
}: {
  value: string;
  onChange: (goal: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {BUSINESS_GOALS.map((goal) => {
        const meta = GOAL_META[goal] ?? GOAL_META["Tăng khách hàng mới"];
        const Icon = meta.icon;
        const selected = value === goal;
        return (
          <button
            key={goal}
            type="button"
            onClick={() => onChange(goal)}
            className={`rounded-xl border-2 p-3 text-left transition hover:shadow-md ${
              selected ? `${meta.color} ring-2 ring-violet-300` : "border-slate-200 bg-white hover:border-violet-200"
            }`}
          >
            <div className="flex items-start gap-2">
              <Icon size={18} className={selected ? "opacity-100" : "text-slate-400"} />
              <div>
                <p className="text-xs font-black text-slate-800">{goal}</p>
                <p className="mt-0.5 text-[10px] text-slate-500">{meta.hint}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function FormIntroPanel() {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <p className="text-xs font-black uppercase text-violet-300">4 bước — xem chiến lược cuối</p>
      <ol className="mt-3 space-y-2 text-sm text-violet-100">
        {FORM_STEPS.map(({ step, label, desc }) => (
          <li key={step} className="flex gap-2">
            <span className="font-black text-violet-300">{step}.</span>
            <span>
              <strong className="text-white">{label}</strong>
              <span className="block text-[11px] text-violet-200/70">{desc}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 rounded-xl border border-violet-400/20 bg-violet-900/30 px-3 py-2 text-[11px] leading-relaxed text-violet-100/90">
        Điền đủ thông tin — báo giá từng phần & chiến lược chi tiết chỉ hiển thị sau bước cuối.
      </p>
    </div>
  );
}

export function PlatformFocusCards({
  value,
  onChange,
}: {
  value: PlatformFocus;
  onChange: (focus: PlatformFocus) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase text-slate-500">Bạn muốn đẩy mạnh nền tảng nào? *</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {PLATFORM_FOCUS_OPTIONS.map((opt) => {
          const Icon = FOCUS_ICON[opt.id];
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`rounded-xl border-2 p-3 text-left transition hover:shadow-md ${
                selected
                  ? "border-violet-500 bg-violet-50 ring-2 ring-violet-200"
                  : "border-slate-200 bg-white hover:border-violet-200"
              }`}
            >
              <div className="flex items-start gap-2">
                <Icon size={18} className={selected ? "text-violet-700" : "text-slate-400"} />
                <div>
                  <p className="text-xs font-black text-slate-800">{opt.label}</p>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-slate-500">{opt.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function OwnedChannelCards({
  ownedIds,
  onToggle,
}: {
  ownedIds: string[];
  onToggle: (id: string) => void;
}) {
  const ownedPriceLabel = (id: (typeof CHANNEL_ASSET_IDS)[number]) =>
    formatVnd(CHANNEL_OWNED_SETUP[id].price);

  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase text-slate-500">Doanh nghiệp đã có gì?</p>
      <p className="text-[11px] text-slate-500">
        Chọn kênh <strong className="text-slate-700">đã có sẵn</strong> — chỉ tính phí cải tạo theo bảng giá (một lần), không xây mới.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {CHANNEL_ASSET_IDS.map((id) => {
          const meta = EXISTING_ASSET_OPTIONS.find((a) => a.id === id)!;
          const setup = CHANNEL_OWNED_SETUP[id];
          const Icon = CHANNEL_ICON[id];
          const owned = ownedIds.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => onToggle(id)}
              className={`rounded-xl border-2 p-4 text-left transition hover:shadow-md ${
                owned
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200"
                  : "border-slate-200 bg-slate-50 hover:border-violet-200"
              }`}
            >
              <Icon size={20} className={owned ? "text-emerald-700" : "text-slate-400"} />
              <p className="mt-2 text-xs font-black text-slate-800">{meta.label}</p>
              <p className={`mt-1 text-[10px] font-bold ${owned ? "text-emerald-700" : "text-slate-400"}`}>
                {owned ? `✓ Đã có — ${setup.label} ${ownedPriceLabel(id)}` : "Chưa có — tính xây mới"}
              </p>
            </button>
          );
        })}
      </div>
      <label className="mt-2 flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
        <input
          type="checkbox"
          checked={ownedIds.includes("ads")}
          onChange={() => onToggle("ads")}
          className="h-4 w-4 rounded border-violet-300 text-violet-600"
        />
        <span className="text-xs text-slate-700">
          <strong>Đang chạy quảng cáo</strong> — bỏ phí quản lý ads, tập trung tối ưu nội dung
        </span>
      </label>
    </div>
  );
}

export function DeploymentTimelinePanel({
  timeline,
}: {
  timeline: { week: string; task: string }[];
}) {
  return (
    <div className="rounded-2xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-white p-5">
      <p className="flex items-center gap-2 text-base font-black text-slate-900">
        <CalendarDays size={18} className="text-violet-700" /> Timeline triển khai
      </p>
      <ul className="mt-4 space-y-3">
        {timeline.map((t, i) => (
          <li key={t.week} className="flex gap-3 rounded-xl border border-violet-100 bg-white p-3 shadow-sm">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-700 text-xs font-black text-white">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-black text-violet-900">{t.week}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-slate-700">{t.task}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FormNavButtons({
  step,
  totalSteps = TOTAL_FORM_STEPS,
  onBack,
  onNext,
  onSubmit,
  submitting,
  canNext,
}: {
  step: number;
  totalSteps?: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  submitting: boolean;
  canNext: boolean;
}) {
  return (
    <div className="mt-6 flex gap-3">
      {step > 1 && (
        <button
          type="button"
          onClick={onBack}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-violet-200 py-4 text-sm font-black text-violet-700 transition hover:bg-violet-50"
        >
          <ArrowLeft size={16} /> Quay lại
        </button>
      )}
      {step < totalSteps ? (
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-700 to-fuchsia-600 py-4 text-sm font-black uppercase tracking-widest text-white disabled:opacity-50"
        >
          Tiếp tục <ArrowRight size={16} />
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting || !canNext}
          className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-700 to-fuchsia-600 py-4 text-sm font-black uppercase tracking-widest text-white disabled:opacity-60"
        >
          {submitting ? "Đang xử lý..." : "Xem chiến lược"} <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}

export function DraftRestoredBanner({
  savedAt,
  source,
  onClear,
}: {
  savedAt?: string;
  source?: "cookie" | "local" | "contact";
  onClear: () => void;
}) {
  const when = savedAt ? formatDraftSavedAt(savedAt) : "";
  const sourceLabel =
    source === "cookie"
      ? "cookie trình duyệt (90 ngày)"
      : source === "contact"
        ? "cookie liên hệ đã lưu"
        : "bộ nhớ thiết bị";

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5">
      <div>
        <p className="text-xs font-bold text-emerald-800">✓ Đã tự điền lại thông tin bạn nhập trước đó</p>
        <p className="text-[10px] text-emerald-700/80">
          Lưu qua {sourceLabel}
          {when ? ` · lần cuối ${when}` : ""}
        </p>
      </div>
      <button type="button" onClick={onClear} className="text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-800">
        Xoá & nhập mới
      </button>
    </div>
  );
}

export function RememberCookieToggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-violet-200 bg-white px-3 py-2.5 transition hover:border-violet-300">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-violet-300 text-violet-600 focus:ring-violet-500"
      />
      <span className="min-w-0">
        <span className="text-xs font-bold text-violet-900">Lưu thông tin bằng cookie (90 ngày)</span>
        <span className="mt-0.5 block text-[10px] leading-relaxed text-violet-600/90">
          Tự điền lại họ tên, SĐT, email, địa chỉ và tiến độ form khi quay lại. Chỉ lưu trên trình duyệt này — bỏ chọn hoặc bấm &quot;Xoá&quot; để xóa ngay.
        </span>
      </span>
    </label>
  );
}

export function FieldError({ message }: { message?: string | null }) {
  if (!message) return null;
  return <p className="text-[10px] font-bold text-red-500">{message}</p>;
}

export function SharedPreviewBanner({ onCompleteContact }: { onCompleteContact: () => void }) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 print:hidden">
      <div className="min-w-0">
        <p className="text-xs font-bold text-amber-900">👀 Bản xem trước chiến lược (link chia sẻ)</p>
        <p className="text-[10px] leading-relaxed text-amber-800/90">
          Chiến lược hiển thị để tham khảo. Bổ sung liên hệ và gửi form để But Pha lưu lead và tư vấn trực tiếp.
        </p>
      </div>
      <button
        type="button"
        onClick={onCompleteContact}
        className="shrink-0 rounded-full bg-amber-600 px-4 py-2 text-[10px] font-black uppercase text-white hover:bg-amber-700"
      >
        Bổ sung liên hệ
      </button>
    </div>
  );
}

/** @deprecated Form-only preview removed — kept for type compatibility if imported elsewhere */
export function LiveStrategySidebar({ form: _form }: { form: unknown }) {
  return <FormIntroPanel />;
}

export function BudgetSimulator({
  form: _form,
  onSelectBudget: _onSelectBudget,
}: {
  form: unknown;
  onSelectBudget: (budget: string) => void;
}) {
  return null;
}

export function FormProgressBar({ percent }: { percent: number }) {
  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between text-[10px] font-bold text-violet-600">
        <span>Tiến độ form</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-violet-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
