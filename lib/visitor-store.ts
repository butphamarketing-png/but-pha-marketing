import { createServerClient } from "@/lib/supabase";
import { sendVisitorSuspiciousAlert, shouldSendVisitorAlert } from "@/lib/visitor-alert-email";
import { resolveVisitorGeo } from "@/lib/visitor-geo";
import { getVisitorClientIp, getVisitorUserAgent, normalizeVisitorPath } from "@/lib/visitor-request";
import { assessVisitorRisk } from "@/lib/visitor-risk";
import type { VisitorGeo, VisitorRiskLevel, VisitorSession } from "@/lib/visitor-types";

const SETTINGS_KEY = "visitor_tracking";
const MAX_LEGACY_ENTRIES = 200;
const MAX_TABLE_SESSIONS = 500;

type DbRow = {
  id: string;
  ip: string;
  user_agent: string;
  first_seen_at: string;
  last_seen_at: string;
  hits: number;
  paths: string[] | null;
  city: string | null;
  region: string | null;
  country: string | null;
  country_code: string | null;
  risk_score: number;
  risk_level: VisitorRiskLevel;
  risk_flags: string[] | null;
  linked_lead_phone: string | null;
  linked_lead_name: string | null;
  last_alerted_at: string | null;
  hits_last_1h?: number;
};

function isMissingTableError(error: unknown) {
  return (
    !!error &&
    typeof error === "object" &&
    "code" in error &&
    (error as { code?: string }).code === "PGRST205"
  );
}

function rowToSession(row: DbRow): VisitorSession {
  return {
    id: row.id,
    ip: row.ip,
    userAgent: row.user_agent,
    firstSeenAt: row.first_seen_at,
    lastSeenAt: row.last_seen_at,
    hits: row.hits,
    paths: Array.isArray(row.paths) ? row.paths : [],
    city: row.city,
    region: row.region,
    country: row.country,
    countryCode: row.country_code,
    riskScore: row.risk_score,
    riskLevel: row.risk_level,
    riskFlags: Array.isArray(row.risk_flags) ? row.risk_flags : [],
    linkedLeadPhone: row.linked_lead_phone,
    linkedLeadName: row.linked_lead_name,
    lastAlertedAt: row.last_alerted_at,
  };
}

function geoFromSession(session: Pick<VisitorSession, "city" | "region" | "country" | "countryCode">): VisitorGeo {
  return {
    city: session.city,
    region: session.region,
    country: session.country,
    countryCode: session.countryCode,
  };
}

async function findLinkedLead(ip: string) {
  const supabase = createServerClient();
  const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  const needle = `%"ip":"${ip}"%`;

  const { data, error } = await supabase
    .from("leads")
    .select("phone, name")
    .gte("created_at", since)
    .ilike("note", needle)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !data?.[0]) return null;
  return { phone: data[0].phone as string, name: (data[0].name as string) || null };
}

function computeHitsLast1h(lastSeenAt: string, hits: number, previousHitsLast1h?: number) {
  const hourAgo = Date.now() - 60 * 60 * 1000;
  const lastSeen = new Date(lastSeenAt).getTime();
  if (lastSeen < hourAgo) return 1;
  return (previousHitsLast1h ?? hits - 1) + 1;
}

async function recordVisitTable(request: Request, path: string): Promise<VisitorSession | null> {
  const supabase = createServerClient();
  const ip = getVisitorClientIp(request);
  const userAgent = getVisitorUserAgent(request);
  const now = new Date().toISOString();

  const { data: existing, error: loadError } = await supabase
    .from("visitor_sessions")
    .select("*")
    .eq("ip", ip)
    .maybeSingle();

  if (loadError) {
    if (isMissingTableError(loadError)) return null;
    throw loadError;
  }

  const previousLevel = (existing?.risk_level as VisitorRiskLevel | undefined) ?? null;
  const paths: string[] = Array.isArray(existing?.paths)
    ? existing.paths.includes(path)
      ? existing.paths
      : [...existing.paths, path]
    : [path];

  const hits = (existing?.hits ?? 0) + 1;
  const hitsLast1h = computeHitsLast1h(
    existing?.last_seen_at ?? now,
    hits,
    typeof existing?.hits_last_1h === "number" ? existing.hits_last_1h : undefined,
  );

  const geo = await resolveVisitorGeo(request, ip, existing ? geoFromSession(rowToSession(existing as DbRow)) : null);

  let linkedLeadPhone = existing?.linked_lead_phone ?? null;
  let linkedLeadName = existing?.linked_lead_name ?? null;
  if (!linkedLeadPhone) {
    const linked = await findLinkedLead(ip);
    if (linked) {
      linkedLeadPhone = linked.phone;
      linkedLeadName = linked.name;
    }
  }

  const risk = assessVisitorRisk({
    hits,
    paths,
    userAgent,
    countryCode: geo.countryCode,
    hitsLast1h,
  });

  const payload = {
    ip,
    user_agent: userAgent,
    first_seen_at: existing?.first_seen_at ?? now,
    last_seen_at: now,
    hits,
    hits_last_1h: hitsLast1h,
    paths,
    city: geo.city,
    region: geo.region,
    country: geo.country,
    country_code: geo.countryCode,
    risk_score: risk.score,
    risk_level: risk.level,
    risk_flags: risk.flags,
    linked_lead_phone: linkedLeadPhone,
    linked_lead_name: linkedLeadName,
    updated_at: now,
  };

  let saved: DbRow;

  if (existing?.id) {
    const { data, error } = await supabase
      .from("visitor_sessions")
      .update(payload)
      .eq("id", existing.id)
      .select("*")
      .single();
    if (error) throw error;
    saved = data as DbRow;
  } else {
    const { data, error } = await supabase
      .from("visitor_sessions")
      .insert(payload)
      .select("*")
      .single();
    if (error) throw error;
    saved = data as DbRow;
  }

  const session = rowToSession(saved);

  if (shouldSendVisitorAlert(session, previousLevel)) {
    await sendVisitorSuspiciousAlert(session).catch((err) => {
      console.error("[visitor-store] alert email failed", err);
    });
    await supabase
      .from("visitor_sessions")
      .update({ last_alerted_at: now })
      .eq("id", session.id);
    session.lastAlertedAt = now;
  }

  return session;
}

type LegacyEntry = VisitorSession & { hitsLast1h?: number };

async function loadLegacyEntries(): Promise<LegacyEntry[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", SETTINGS_KEY)
    .maybeSingle();

  if (error) throw error;
  const entries = data?.value?.entries;
  return Array.isArray(entries) ? (entries as LegacyEntry[]) : [];
}

async function saveLegacyEntries(entries: LegacyEntry[]) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: SETTINGS_KEY, value: { entries } }, { onConflict: "key" });
  if (error) throw error;
}

async function recordVisitLegacy(request: Request, path: string): Promise<VisitorSession> {
  const ip = getVisitorClientIp(request);
  const userAgent = getVisitorUserAgent(request);
  const now = new Date().toISOString();

  const entries = await loadLegacyEntries();
  const index = entries.findIndex((entry) => entry.ip === ip);
  const existing = index >= 0 ? entries[index] : null;
  const previousLevel = existing?.riskLevel ?? null;

  const paths = existing?.paths?.includes(path) ? existing.paths : [...(existing?.paths ?? []), path];
  const hits = (existing?.hits ?? 0) + 1;
  const hitsLast1h = computeHitsLast1h(existing?.lastSeenAt ?? now, hits, existing?.hitsLast1h);

  const geo = await resolveVisitorGeo(request, ip, existing ? geoFromSession(existing) : null);

  let linkedLeadPhone = existing?.linkedLeadPhone ?? null;
  let linkedLeadName = existing?.linkedLeadName ?? null;
  if (!linkedLeadPhone) {
    const linked = await findLinkedLead(ip);
    if (linked) {
      linkedLeadPhone = linked.phone;
      linkedLeadName = linked.name;
    }
  }

  const risk = assessVisitorRisk({
    hits,
    paths,
    userAgent,
    countryCode: geo.countryCode,
    hitsLast1h,
  });

  const session: LegacyEntry = {
    id: existing?.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ip,
    userAgent,
    firstSeenAt: existing?.firstSeenAt ?? now,
    lastSeenAt: now,
    hits,
    hitsLast1h,
    paths,
    city: geo.city,
    region: geo.region,
    country: geo.country,
    countryCode: geo.countryCode,
    riskScore: risk.score,
    riskLevel: risk.level,
    riskFlags: risk.flags,
    linkedLeadPhone,
    linkedLeadName,
    lastAlertedAt: existing?.lastAlertedAt ?? null,
  };

  if (shouldSendVisitorAlert(session, previousLevel)) {
    await sendVisitorSuspiciousAlert(session).catch((err) => {
      console.error("[visitor-store] alert email failed", err);
    });
    session.lastAlertedAt = now;
  }

  const next = [...entries];
  if (index >= 0) next[index] = session;
  else next.unshift(session);

  const sorted = next
    .sort((a, b) => +new Date(b.lastSeenAt) - +new Date(a.lastSeenAt))
    .slice(0, MAX_LEGACY_ENTRIES);

  await saveLegacyEntries(sorted);
  return session;
}

export async function recordVisitorHit(request: Request, rawPath: unknown) {
  const path = normalizeVisitorPath(rawPath);
  try {
    const fromTable = await recordVisitTable(request, path);
    if (fromTable) return fromTable;
  } catch (error) {
    if (!isMissingTableError(error)) {
      console.error("[visitor-store] table write failed, falling back to legacy", error);
    }
  }
  return recordVisitLegacy(request, path);
}

export async function listVisitorSessions(options?: { suspiciousOnly?: boolean }) {
  const supabase = createServerClient();

  try {
    let query = supabase
      .from("visitor_sessions")
      .select("*")
      .order("last_seen_at", { ascending: false })
      .limit(MAX_TABLE_SESSIONS);

    if (options?.suspiciousOnly) {
      query = query.in("risk_level", ["watch", "alert"]);
    }

    const { data, error } = await query;
    if (error) {
      if (isMissingTableError(error)) throw error;
      throw error;
    }

    const visitors = (data as DbRow[]).map(rowToSession);
    return {
      visitors,
      totalVisitors: visitors.length,
      totalHits: visitors.reduce((sum, v) => sum + v.hits, 0),
      suspiciousCount: visitors.filter((v) => v.riskLevel !== "normal").length,
      storage: "table" as const,
    };
  } catch (error) {
    if (!isMissingTableError(error)) throw error;
  }

  const legacy = await loadLegacyEntries();
  const sorted = [...legacy].sort((a, b) => +new Date(b.lastSeenAt) - +new Date(a.lastSeenAt));
  const filtered = options?.suspiciousOnly
    ? sorted.filter((v) => v.riskLevel === "watch" || v.riskLevel === "alert")
    : sorted;

  return {
    visitors: filtered,
    totalVisitors: sorted.length,
    totalHits: sorted.reduce((sum, v) => sum + v.hits, 0),
    suspiciousCount: sorted.filter((v) => v.riskLevel !== "normal").length,
    storage: "legacy" as const,
  };
}
