import type { StrategyFormSnapshot } from "./marketing-strategy-profiles";

const DRAFT_KEY = "bpm-chienluocmarketing-draft";
const LEGACY_STEP_KEY = "bpm-chienluocmarketing-step";

export type StrategyDraftPayload = {
  form: StrategyFormSnapshot;
  step: number;
  savedAt: string;
};

const FORM_FIELDS: (keyof StrategyFormSnapshot)[] = [
  "fullName",
  "companyName",
  "phone",
  "address",
  "email",
  "industry",
  "businessGoal",
  "scale",
  "budgetRange",
];

export function hasStrategyDraftContent(form: Partial<StrategyFormSnapshot>) {
  return FORM_FIELDS.some((key) => String(form[key] ?? "").trim().length > 0);
}

function normalizeDraftForm(raw: Partial<StrategyFormSnapshot>): StrategyFormSnapshot {
  return {
    fullName: raw.fullName ?? "",
    companyName: raw.companyName ?? "",
    phone: raw.phone ?? "",
    address: raw.address ?? "",
    email: raw.email ?? "",
    industry: raw.industry ?? "",
    businessGoal: raw.businessGoal ?? "",
    scale: raw.scale ?? "",
    budgetRange: raw.budgetRange ?? "",
    existingAssets: Array.isArray(raw.existingAssets) ? raw.existingAssets : [],
  };
}

function parseLegacyDraft(raw: unknown): StrategyDraftPayload | null {
  if (!raw || typeof raw !== "object") return null;

  const obj = raw as Record<string, unknown>;

  // New format: { form, step, savedAt }
  if (obj.form && typeof obj.form === "object") {
    const form = normalizeDraftForm(obj.form as Partial<StrategyFormSnapshot>);
    if (!hasStrategyDraftContent(form)) return null;
    const step = typeof obj.step === "number" && obj.step >= 1 && obj.step <= 3 ? obj.step : 1;
    return {
      form,
      step,
      savedAt: typeof obj.savedAt === "string" ? obj.savedAt : new Date().toISOString(),
    };
  }

  // Legacy format: flat StrategyFormSnapshot
  const form = normalizeDraftForm(obj as Partial<StrategyFormSnapshot>);
  if (!hasStrategyDraftContent(form)) return null;

  let step = 1;
  if (typeof window !== "undefined") {
    const legacyStep = Number(localStorage.getItem(LEGACY_STEP_KEY));
    if (legacyStep >= 1 && legacyStep <= 3) step = legacyStep;
  }

  return { form, step, savedAt: new Date().toISOString() };
}

export function loadStrategyDraft(): StrategyDraftPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return parseLegacyDraft(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveStrategyDraft(form: StrategyFormSnapshot, step: number) {
  if (typeof window === "undefined") return;
  if (!hasStrategyDraftContent(form)) return;

  try {
    const payload: StrategyDraftPayload = {
      form: normalizeDraftForm(form),
      step: step >= 1 && step <= 3 ? step : 1,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    localStorage.removeItem(LEGACY_STEP_KEY);
  } catch {
    /* quota exceeded — ignore */
  }
}

export function clearStrategyDraft() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(DRAFT_KEY);
  localStorage.removeItem(LEGACY_STEP_KEY);
}

export function formatDraftSavedAt(iso: string) {
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}
