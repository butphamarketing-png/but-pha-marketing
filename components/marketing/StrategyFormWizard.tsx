"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Globe,
  Heart,
  Info,
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

export function FormStepIndicator({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick?: (step: number) => void;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-1 sm:gap-2">
        {FORM_STEPS.map(({ step, label, desc }, i) => {
          const active = currentStep === step;
          const done = currentStep > step;
          const clickable = done && onStepClick;
          return (
            <div key={step} className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onStepClick(step)}
                className={`flex min-w-0 flex-1 flex-col items-center text-center ${clickable ? "cursor-pointer" : "cursor-default"}`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black transition ${
                    active
                      ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg ring-4 ring-violet-200"
                      : done
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-violet-100 text-violet-400"
                  }`}
                >
                  {done ? "✓" : step}
                </span>
                <p className={`mt-1.5 truncate text-[9px] font-black uppercase sm:text-[10px] ${active ? "text-violet-800" : done ? "text-emerald-700" : "text-slate-400"}`}>
                  {label}
                </p>
                <p className="hidden truncate text-[9px] text-slate-400 md:block">{desc}</p>
              </button>
              {i < FORM_STEPS.length - 1 && (
                <div className={`mb-5 hidden h-1 flex-1 rounded-full sm:block ${done ? "bg-emerald-300" : "bg-violet-100"}`} />
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
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase text-slate-500">Doanh nghiệp đã có gì?</p>
      <p className="rounded-lg border border-violet-100 bg-violet-50/50 px-3 py-2 text-[11px] leading-relaxed text-slate-600">
        Chọn <strong className="text-violet-800">「Đã có」</strong> cho từng kênh bạn đang sở hữu. Hệ thống sẽ đề xuất <strong>cải tạo</strong> thay vì xây mới — giá hiển thị ở trang kết quả.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {CHANNEL_ASSET_IDS.map((id) => {
          const meta = EXISTING_ASSET_OPTIONS.find((a) => a.id === id)!;
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
                {owned ? "✓ Đã có" : "Chưa có"}
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
          <strong>Đang chạy quảng cáo</strong> (Facebook / Google)
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
          {submitting ? "Đang xử lý..." : "Xem kết quả"} <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}

export function StrategySubmitConfirmModal({
  open,
  onBack,
  onContinue,
  continuing,
  summary,
}: {
  open: boolean;
  onBack: () => void;
  onContinue: () => void;
  continuing?: boolean;
  summary?: { company: string; industry: string; goal: string; budget: string; focus: string; assets: string[] };
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Đóng"
        className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm"
        onClick={onBack}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg rounded-3xl border border-violet-100 bg-white p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="strategy-confirm-title"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg">
          <Info size={28} />
        </div>
        <h2 id="strategy-confirm-title" className="mt-4 text-xl font-black leading-snug text-slate-900">
          Xác nhận trước khi xem kết quả
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Những gì bạn chọn sẽ ảnh hưởng đến kết quả phù hợp nhất nên hãy chắc chắn rằng bạn nhập chính xác thông tin?
        </p>

        {summary && (
          <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50/60 p-4">
            <p className="text-[10px] font-black uppercase text-violet-600">Thông tin sẽ dùng để tính</p>
            <ul className="mt-2 space-y-1.5 text-[11px] text-slate-700">
              <li><strong>Công ty:</strong> {summary.company}</li>
              <li><strong>Ngành:</strong> {summary.industry}</li>
              <li><strong>Mục tiêu:</strong> {summary.goal}</li>
              <li><strong>Ngân sách:</strong> {summary.budget}</li>
              <li><strong>Ưu tiên:</strong> {summary.focus}</li>
              {summary.assets.length > 0 && (
                <li><strong>Đã có:</strong> {summary.assets.join(", ")}</li>
              )}
            </ul>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={continuing}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-violet-200 py-3.5 text-sm font-black text-violet-700 transition hover:bg-violet-50 disabled:opacity-50"
          >
            <ArrowLeft size={16} /> Quay Lại
          </button>
          <button
            type="button"
            onClick={onContinue}
            disabled={continuing}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-700 to-fuchsia-600 py-3.5 text-sm font-black text-white shadow-lg disabled:opacity-60"
          >
            {continuing ? "Đang xử lý..." : "Tiếp tục"} <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
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

export function FormProgressBar({ percent, step }: { percent: number; step?: number }) {
  const stepMeta = step ? FORM_STEPS.find((s) => s.step === step) : null;
  return (
    <div className="mb-4 rounded-xl border border-violet-100 bg-violet-50/50 px-4 py-3">
      <div className="mb-2 flex justify-between text-[10px] font-bold text-violet-700">
        <span>
          {stepMeta ? `Bước ${step}/${TOTAL_FORM_STEPS} — ${stepMeta.label}` : "Tiến độ form"}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-violet-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>
    </div>
  );
}

export function FormLivePreview({
  industry,
  businessGoal,
  budgetRange,
  tierLabel,
  monthTotal,
  itemCount,
  existingAssets,
}: {
  industry: string;
  businessGoal: string;
  budgetRange: string;
  tierLabel: string;
  monthTotal: number;
  itemCount: number;
  existingAssets: string[];
}) {
  if (industry.trim().length < 2) return null;

  const owned = EXISTING_ASSET_OPTIONS.filter((a) => existingAssets.includes(a.id));

  return (
    <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50/50 p-4">
      <p className="flex items-center gap-2 text-[10px] font-black uppercase text-violet-700">
        <Sparkles size={14} /> Xem trước đề xuất (ước tính)
      </p>
      <p className="mt-2 text-sm font-black text-slate-800">
        Gói {tierLabel} · ~{formatVnd(monthTotal)}/tháng
      </p>
      <p className="mt-1 text-[11px] text-slate-600">
        {businessGoal} · {budgetRange} · {itemCount} hạng mục dự kiến
      </p>
      {owned.length > 0 && (
        <p className="mt-2 text-[10px] text-emerald-700">
          ✓ Đã có: {owned.map((a) => a.label).join(", ")} — combo sẽ tính cải tạo thay vì xây mới
        </p>
      )}
      <p className="mt-2 text-[10px] italic text-slate-500">
        Báo giá chính xác hiển thị sau khi bấm &quot;Xem kết quả&quot;.
      </p>
    </div>
  );
}
