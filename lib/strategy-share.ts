import type { StrategyFormSnapshot } from "./marketing-strategy-profiles";

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

export function encodeStrategyShare(form: StrategyFormSnapshot): string {
  const payload = {
    fullName: form.fullName,
    companyName: form.companyName,
    phone: form.phone,
    address: form.address,
    email: form.email,
    industry: form.industry,
    businessGoal: form.businessGoal,
    scale: form.scale,
    budgetRange: form.budgetRange,
    existingAssets: form.existingAssets ?? [],
  };
  const json = JSON.stringify(payload);
  return btoa(unescape(encodeURIComponent(json)));
}

export function decodeStrategyShare(token: string): StrategyFormSnapshot | null {
  try {
    const json = decodeURIComponent(escape(atob(token)));
    const raw = JSON.parse(json) as Partial<StrategyFormSnapshot>;
    if (!raw.companyName && !raw.industry && !raw.fullName) return null;
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
