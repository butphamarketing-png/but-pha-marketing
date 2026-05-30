import type { StrategyFormSnapshot, PlatformFocus } from "./marketing-strategy-profiles";
import {
  clearStrategyCookies,
  loadRememberPreference,
  readContactFromCookie,
  readDraftFromCookie,
  saveRememberPreference,
  writeContactToCookie,
  writeDraftToCookie,
  type CompactStrategyContact,
  type CompactStrategyDraft,
} from "./strategy-cookies";

const DRAFT_KEY = "bpm-chienluocmarketing-draft";
const LEGACY_STEP_KEY = "bpm-chienluocmarketing-step";

export type StrategyDraftPayload = {
  form: StrategyFormSnapshot;
  step: number;
  savedAt: string;
};

export type StrategyDraftSource = "cookie" | "local" | "contact";

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

const CONTACT_FIELDS: (keyof Pick<StrategyFormSnapshot, "fullName" | "companyName" | "phone" | "address" | "email">)[] = [
  "fullName",
  "companyName",
  "phone",
  "address",
  "email",
];

export function hasStrategyDraftContent(form: Partial<StrategyFormSnapshot>) {
  return FORM_FIELDS.some((key) => String(form[key] ?? "").trim().length > 0);
}

export function hasStrategyContactContent(form: Partial<StrategyFormSnapshot>) {
  return CONTACT_FIELDS.some((key) => String(form[key] ?? "").trim().length > 0);
}

function emptyForm(): StrategyFormSnapshot {
  return {
    fullName: "",
    companyName: "",
    phone: "",
    address: "",
    email: "",
    industry: "",
    businessGoal: "",
    scale: "",
    budgetRange: "",
    platformFocus: "strategy",
    existingAssets: [],
  };
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
    platformFocus: (raw.platformFocus as PlatformFocus) ?? "strategy",
    existingAssets: Array.isArray(raw.existingAssets) ? raw.existingAssets : [],
  };
}

function toCompactDraft(payload: StrategyDraftPayload): CompactStrategyDraft {
  const f = payload.form;
  return {
    v: 1,
    n: f.fullName,
    c: f.companyName,
    p: f.phone,
    a: f.address,
    e: f.email,
    i: f.industry,
    g: f.businessGoal,
    l: f.scale,
    b: f.budgetRange,
    f: f.platformFocus,
    x: f.existingAssets,
    s: payload.step,
    t: payload.savedAt,
  };
}

function fromCompactDraft(compact: CompactStrategyDraft): StrategyDraftPayload {
  return {
    form: normalizeDraftForm({
      fullName: compact.n,
      companyName: compact.c,
      phone: compact.p,
      address: compact.a,
      email: compact.e,
      industry: compact.i,
      businessGoal: compact.g,
      scale: compact.l,
      budgetRange: compact.b,
      platformFocus: (compact.f as PlatformFocus) || "strategy",
      existingAssets: compact.x,
    }),
    step: compact.s >= 1 && compact.s <= 4 ? compact.s : 1,
    savedAt: compact.t || new Date().toISOString(),
  };
}

function toCompactContact(form: StrategyFormSnapshot): CompactStrategyContact {
  return {
    v: 1,
    n: form.fullName,
    c: form.companyName,
    p: form.phone,
    a: form.address,
    e: form.email,
  };
}

function fromCompactContact(contact: CompactStrategyContact): Partial<StrategyFormSnapshot> {
  return {
    fullName: contact.n,
    companyName: contact.c,
    phone: contact.p,
    address: contact.a,
    email: contact.e,
  };
}

function parseLegacyDraft(raw: unknown): StrategyDraftPayload | null {
  if (!raw || typeof raw !== "object") return null;

  const obj = raw as Record<string, unknown>;

  if (obj.form && typeof obj.form === "object") {
    const form = normalizeDraftForm(obj.form as Partial<StrategyFormSnapshot>);
    if (!hasStrategyDraftContent(form)) return null;
    const step = typeof obj.step === "number" && obj.step >= 1 && obj.step <= 4 ? obj.step : 1;
    return {
      form,
      step,
      savedAt: typeof obj.savedAt === "string" ? obj.savedAt : new Date().toISOString(),
    };
  }

  const form = normalizeDraftForm(obj as Partial<StrategyFormSnapshot>);
  if (!hasStrategyDraftContent(form)) return null;

  let step = 1;
  if (typeof window !== "undefined") {
    const legacyStep = Number(localStorage.getItem(LEGACY_STEP_KEY));
    if (legacyStep >= 1 && legacyStep <= 4) step = legacyStep;
  }

  return { form, step, savedAt: new Date().toISOString() };
}

function loadLocalStorageDraft(): StrategyDraftPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return parseLegacyDraft(JSON.parse(raw));
  } catch {
    return null;
  }
}

function saveLocalStorageDraft(payload: StrategyDraftPayload) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    localStorage.removeItem(LEGACY_STEP_KEY);
  } catch {
    /* quota exceeded */
  }
}

export function loadStrategyDraft(): { draft: StrategyDraftPayload; source: StrategyDraftSource } | null {
  if (typeof window === "undefined") return null;

  const localDraft = loadLocalStorageDraft();
  const cookieDraft = readDraftFromCookie();

  if (cookieDraft && localDraft) {
    const fromCookie = fromCompactDraft(cookieDraft);
    const cookieTime = new Date(fromCookie.savedAt).getTime();
    const localTime = new Date(localDraft.savedAt).getTime();
    if (localTime > cookieTime) {
      saveStrategyDraft(localDraft.form, localDraft.step);
      return { draft: localDraft, source: "local" };
    }
  }

  if (cookieDraft) {
    const draft = fromCompactDraft(cookieDraft);
    if (hasStrategyDraftContent(draft.form)) {
      return { draft, source: "cookie" };
    }
  }

  if (localDraft) {
    if (loadRememberPreference()) {
      saveStrategyDraft(localDraft.form, localDraft.step);
    }
    return { draft: localDraft, source: "local" };
  }

  const contact = readContactFromCookie();
  if (contact) {
    const partial = fromCompactContact(contact);
    const form = normalizeDraftForm({ ...emptyForm(), ...partial });
    if (hasStrategyContactContent(form)) {
      return {
        draft: { form, step: 1, savedAt: new Date().toISOString() },
        source: "contact",
      };
    }
  }

  return null;
}

export { loadRememberPreference, saveRememberPreference };

export function saveStrategyDraft(form: StrategyFormSnapshot, step: number) {
  if (typeof window === "undefined") return;
  if (!loadRememberPreference()) return;
  if (!hasStrategyDraftContent(form)) return;

  const payload: StrategyDraftPayload = {
    form: normalizeDraftForm(form),
    step: step >= 1 && step <= 4 ? step : 1,
    savedAt: new Date().toISOString(),
  };

  const compact = toCompactDraft(payload);
  writeDraftToCookie(compact);
  saveLocalStorageDraft(payload);

  if (hasStrategyContactContent(form)) {
    writeContactToCookie(toCompactContact(form));
  }
}

export function clearStrategyDraft() {
  if (typeof window === "undefined") return;
  clearStrategyCookies();
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

export function getDraftSourceLabel(source: StrategyDraftSource) {
  switch (source) {
    case "cookie":
      return "cookie trình duyệt";
    case "contact":
      return "cookie liên hệ";
    case "local":
      return "bộ nhớ thiết bị";
  }
}
