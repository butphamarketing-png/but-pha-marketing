type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function getNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function getJson(value: unknown): JsonValue | undefined {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    Array.isArray(value) ||
    isRecord(value)
  ) {
    return value as JsonValue;
  }

  return undefined;
}

export function normalizeClientPortalPayload(input: unknown) {
  const body = isRecord(input) ? input : {};
  const payload: Record<string, JsonValue> = {};

  const username = getString(body.username);
  const password = getString(body.password);
  const clientName = getString(body.clientName) ?? getString(body.client_name);
  const phone = getString(body.phone);
  const platform = getString(body.platform);
  const daysRemaining =
    getNumber(body.daysRemaining) ?? getNumber(body.days_remaining);
  const postsCount = getNumber(body.postsCount) ?? getNumber(body.posts_count);
  const progressPercent =
    getNumber(body.progressPercent) ?? getNumber(body.progress_percent);
  const weeklyReports = getJson(body.weeklyReports ?? body.weekly_reports);

  if (username !== undefined) payload.username = username;
  if (password !== undefined) payload.password = password;
  if (clientName !== undefined) payload.client_name = clientName;
  if (phone !== undefined) payload.phone = phone;
  if (platform !== undefined) payload.platform = platform;
  if (daysRemaining !== undefined) payload.days_remaining = daysRemaining;
  if (postsCount !== undefined) payload.posts_count = postsCount;
  if (progressPercent !== undefined) payload.progress_percent = progressPercent;
  if (weeklyReports !== undefined) payload.weekly_reports = weeklyReports;

  return payload;
}
