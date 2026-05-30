import type { StrategyFormSnapshot, PlatformFocus } from "./marketing-strategy-profiles";
import type { CompactStrategyContact } from "./strategy-cookies";

type SharePayloadV2 = {
  v: 2;
  companyName: string;
  industry: string;
  businessGoal: string;
  scale: string;
  budgetRange: string;
  platformFocus: PlatformFocus;
  existingAssets: string[];
};

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

function encodeToken(payload: unknown) {
  const json = JSON.stringify(payload);
  return btoa(unescape(encodeURIComponent(json)));
}

function decodeToken(token: string): unknown {
  const json = decodeURIComponent(escape(atob(token)));
  return JSON.parse(json);
}

export function isStrategyFormComplete(form: Partial<StrategyFormSnapshot>) {
  return [
    form.fullName,
    form.companyName,
    form.phone,
    form.address,
    form.email,
    form.industry,
    form.businessGoal,
    form.scale,
    form.budgetRange,
  ].every((v) => String(v ?? "").trim().length > 0);
}

/** Enough data to render strategy board (share link without PII). */
export function isStrategyViewReady(form: Partial<StrategyFormSnapshot>) {
  return [
    form.companyName,
    form.industry,
    form.businessGoal,
    form.scale,
    form.budgetRange,
  ].every((v) => String(v ?? "").trim().length > 0);
}

export function mergeSharedFormWithContact(
  form: StrategyFormSnapshot,
  contact: CompactStrategyContact | null,
): StrategyFormSnapshot {
  if (!contact) return form;
  return {
    ...form,
    fullName: form.fullName || contact.n,
    companyName: form.companyName || contact.c,
    phone: form.phone || contact.p,
    address: form.address || contact.a,
    email: form.email || contact.e,
  };
}

export function encodeStrategyShare(form: StrategyFormSnapshot): string {
  const payload: SharePayloadV2 = {
    v: 2,
    companyName: form.companyName,
    industry: form.industry,
    businessGoal: form.businessGoal,
    scale: form.scale,
    budgetRange: form.budgetRange,
    platformFocus: form.platformFocus ?? "strategy",
    existingAssets: form.existingAssets ?? [],
  };
  return encodeToken(payload);
}

function fromLegacyPayload(raw: Partial<StrategyFormSnapshot>): StrategyFormSnapshot {
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

export function decodeStrategyShare(token: string): StrategyFormSnapshot | null {
  try {
    const raw = decodeToken(token) as Partial<StrategyFormSnapshot> & Partial<SharePayloadV2>;

    if (raw.v === 2) {
      const form = {
        ...emptyForm(),
        companyName: raw.companyName ?? "",
        industry: raw.industry ?? "",
        businessGoal: raw.businessGoal ?? "",
        scale: raw.scale ?? "",
        budgetRange: raw.budgetRange ?? "",
        platformFocus: raw.platformFocus ?? "strategy",
        existingAssets: Array.isArray(raw.existingAssets) ? raw.existingAssets : [],
      };
      if (!isStrategyViewReady(form)) return null;
      return form;
    }

    if (!raw.companyName && !raw.industry && !raw.fullName) return null;
    return fromLegacyPayload(raw);
  } catch {
    return null;
  }
}

export function buildStrategyShareUrl(
  form: StrategyFormSnapshot,
  options?: { view?: boolean; origin?: string },
) {
  const base = options?.origin ?? (typeof window !== "undefined" ? window.location.origin : "");
  const token = encodeStrategyShare(form);
  const params = new URLSearchParams({ s: token });
  if (options?.view) params.set("view", "1");
  return `${base}/chienluocmarketing?${params.toString()}`;
}
