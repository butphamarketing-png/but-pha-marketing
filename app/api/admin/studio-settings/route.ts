export const dynamic = "force-dynamic";

import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  getOpenAiRuntimeConfig,
  getStudioSettings,
  sanitizeStudioSettings,
  type StudioSettingsValue,
} from "@/lib/studio-settings";

const TABLE_NAME = "site_settings";
const SETTINGS_KEY = "studio_settings";

function jsonError(message: string, status = 500, details?: unknown) {
  return NextResponse.json({ ok: false, error: message, ...(details ? { details } : {}) }, { status });
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
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

async function testOpenAiConnection() {
  const { apiKey, model } = await getOpenAiRuntimeConfig();
  if (!apiKey) {
    return {
      connected: false,
      message: "Chua co OpenAI API key tren server.",
    };
  }

  const client = new OpenAI({ apiKey });

  await client.responses.create({
    model,
    input: "Tra ve duy nhat tu OK.",
    max_output_tokens: 16,
  });

  return {
    connected: true,
    message: `Da ket noi OpenAI thanh cong voi model ${model}.`,
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

export async function POST(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return jsonError("Unauthorized", 401);
    }

    const settings = await getStudioSettings().catch(() => sanitizeStudioSettings(null));
    const openai = await testOpenAiConnection().catch((error) => ({
      connected: false,
      message: error instanceof Error && error.message ? error.message : "Khong the ket noi OpenAI luc nay.",
    }));

    return NextResponse.json({
      ok: true,
      openaiConnected: openai.connected,
      openaiMessage: openai.message,
      openaiKeySaved: Boolean(settings.openaiKey),
      serpApiKeySaved: Boolean(settings.serpApiKey),
      defaultLocation: settings.defaultLocation || "Vietnam",
      aiModel: settings.aiModel || "gpt-4-turbo",
    });
  } catch (error) {
    console.error("[API/admin/studio-settings POST] Failed:", error);
    return jsonError("Khong the kiem tra ket noi studio.", 500, error);
  }
}
