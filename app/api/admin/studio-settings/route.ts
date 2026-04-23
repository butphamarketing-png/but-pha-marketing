export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { isAdminRequest } from "@/lib/admin-auth";

const TABLE_NAME = "site_settings";
const SETTINGS_KEY = "studio_settings";

type StudioSettingsValue = {
  openaiKey?: string;
  serpApiKey?: string;
  defaultLocation?: string;
  aiModel?: string;
};

function jsonError(message: string, status = 500, details?: unknown) {
  return NextResponse.json({ ok: false, error: message, ...(details ? { details } : {}) }, { status });
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeStudioSettings(value: unknown): StudioSettingsValue {
  const source = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return {
    openaiKey: normalizeString(source.openaiKey),
    serpApiKey: normalizeString(source.serpApiKey),
    defaultLocation: normalizeString(source.defaultLocation) || "Vietnam",
    aiModel: normalizeString(source.aiModel) || "gpt-4-turbo",
  };
}

function responseFromValue(value: StudioSettingsValue) {
  return {
    ok: true,
    openaiKeySaved: Boolean(value.openaiKey),
    serpApiKeySaved: Boolean(value.serpApiKey),
    defaultLocation: value.defaultLocation || "Vietnam",
    aiModel: value.aiModel || "gpt-4-turbo",
  };
}

export async function GET(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return jsonError("Unauthorized", 401);
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("value")
      .eq("key", SETTINGS_KEY)
      .maybeSingle();

    if (error) {
      return jsonError("Khong the tai cau hinh studio.", 500, error);
    }

    return NextResponse.json(responseFromValue(sanitizeStudioSettings(data?.value)));
  } catch (error) {
    console.error("[API/admin/studio-settings GET] Failed:", error);
    return jsonError("Khong the tai cau hinh studio.", 500, error);
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return jsonError("Unauthorized", 401);
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return jsonError("Invalid JSON body", 400);
    }

    const supabase = createServerClient();
    const { data: existing, error: readError } = await supabase
      .from(TABLE_NAME)
      .select("value")
      .eq("key", SETTINGS_KEY)
      .maybeSingle();

    if (readError) {
      return jsonError("Khong the doc cau hinh studio hien tai.", 500, readError);
    }

    const current = sanitizeStudioSettings(existing?.value);
    const openaiKey = normalizeString((body as Record<string, unknown>).openaiKey) || current.openaiKey || "";
    const serpApiKey = normalizeString((body as Record<string, unknown>).serpApiKey) || current.serpApiKey || "";
    const defaultLocation =
      normalizeString((body as Record<string, unknown>).defaultLocation) || current.defaultLocation || "Vietnam";
    const aiModel = normalizeString((body as Record<string, unknown>).aiModel) || current.aiModel || "gpt-4-turbo";

    const nextValue: StudioSettingsValue = {
      openaiKey,
      serpApiKey,
      defaultLocation,
      aiModel,
    };

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .upsert({ key: SETTINGS_KEY, value: nextValue }, { onConflict: "key" })
      .select("value")
      .single();

    if (error) {
      return jsonError("Khong the luu cau hinh studio.", 500, error);
    }

    return NextResponse.json(responseFromValue(sanitizeStudioSettings(data?.value)));
  } catch (error) {
    console.error("[API/admin/studio-settings PATCH] Failed:", error);
    return jsonError("Khong the luu cau hinh studio.", 500, error);
  }
}
