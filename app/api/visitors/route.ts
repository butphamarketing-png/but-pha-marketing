import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { isAdminRequest } from "@/lib/admin-auth";

type VisitorEntry = {
  id: string;
  ip: string;
  userAgent: string;
  firstSeenAt: string;
  lastSeenAt: string;
  hits: number;
  paths: string[];
};

const SETTINGS_KEY = "visitor_tracking";
const MAX_ENTRIES = 200;

function normalizePath(path: unknown) {
  return typeof path === "string" && path.trim() ? path.trim() : "/";
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip") || "unknown";
}

function getUserAgent(request: Request) {
  return request.headers.get("user-agent") || "unknown";
}

async function loadEntries() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", SETTINGS_KEY)
    .maybeSingle();

  if (error) throw error;
  return Array.isArray(data?.value?.entries) ? (data.value.entries as VisitorEntry[]) : [];
}

async function saveEntries(entries: VisitorEntry[]) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: SETTINGS_KEY, value: { entries } }, { onConflict: "key" });

  if (error) throw error;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const path = normalizePath(body?.path);
    const ip = getClientIp(request);
    const userAgent = getUserAgent(request);
    const now = new Date().toISOString();

    const entries = await loadEntries();
    const existingIndex = entries.findIndex((entry) => entry.ip === ip);

    if (existingIndex >= 0) {
      const current = entries[existingIndex];
      entries[existingIndex] = {
        ...current,
        userAgent,
        lastSeenAt: now,
        hits: current.hits + 1,
        paths: current.paths.includes(path) ? current.paths : [...current.paths, path],
      };
    } else {
      entries.unshift({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        ip,
        userAgent,
        firstSeenAt: now,
        lastSeenAt: now,
        hits: 1,
        paths: [path],
      });
    }

    await saveEntries(entries.slice(0, MAX_ENTRIES));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/visitors failed", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

export async function GET(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const entries = await loadEntries();
    const visitors = [...entries].sort((a, b) => +new Date(b.lastSeenAt) - +new Date(a.lastSeenAt));

    return NextResponse.json({
      ok: true,
      totalVisitors: visitors.length,
      totalHits: visitors.reduce((sum, visitor) => sum + visitor.hits, 0),
      visitors,
    });
  } catch (error) {
    console.error("GET /api/visitors failed", error);
    return NextResponse.json({
      ok: true,
      totalVisitors: 0,
      totalHits: 0,
      visitors: [],
    });
  }
}
