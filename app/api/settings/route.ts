export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

const TABLE_NAME = "site_settings";

function mergeSettingsValue(currentValue: unknown, patchValue: unknown) {
  if (
    currentValue &&
    typeof currentValue === "object" &&
    !Array.isArray(currentValue) &&
    patchValue &&
    typeof patchValue === "object" &&
    !Array.isArray(patchValue)
  ) {
    return {
      ...(currentValue as Record<string, unknown>),
      ...(patchValue as Record<string, unknown>),
    };
  }

  return patchValue;
}

function jsonError(message: string, status: number = 500, details: unknown = null) {
  console.error(`[API/settings] Error ${status}: ${message}`, details);
  return NextResponse.json({ ok: false, error: message, ...(details ? { details } : {}) }, { status });
}

function handleSupabaseError(error: unknown, context: string) {
  console.error(`${context} Supabase error:`, error);
  if (error && typeof error === "object") {
    const code = "code" in error ? (error as any).code : undefined;
    const message = "message" in error ? (error as any).message : "Unknown error";
    if (code === "PGRST205") {
      return jsonError("Database table 'public.site_settings' missing. Run SQL migration.", 500, { code, message });
    }
    return jsonError("Supabase request failed", 500, { code, message });
  }
  return jsonError("Internal Server Error", 500);
}

export async function GET(request: Request) {
  try {
    console.log(`[API/settings] GET started: ${request.url.slice(-80)}`);
    const url = new URL(request.url);
    const key = url.searchParams.get("key");
    if (!key) return jsonError("Missing 'key' query parameter", 400);

    console.log(`[API/settings GET] Processing key="${key}", service_role=${process.env.SUPABASE_SERVICE_ROLE_KEY ? process.env.SUPABASE_SERVICE_ROLE_KEY.slice(0,8)+'...' : 'MISSING'}`);
    
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return jsonError("Server misconfigured: SUPABASE_SERVICE_ROLE_KEY environment variable missing", 500);
    }
    
    console.log('[API/settings GET] Environment OK, creating Supabase client...');
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("key, value, updated_at")
      .eq("key", key)
      .maybeSingle();

    console.log('[API/settings GET] Supabase response:', {
      hasData: !!data,
      errorCode: error?.code,
      errorMsg: error?.message,
      dataPreview: data ? { key: data.key, valueType: typeof data.value, valueSize: JSON.stringify(data.value)?.length } : null
    });

    if (error) {
      return handleSupabaseError(error, "GET /api/settings");
    }

    return NextResponse.json({
      ok: true,
      key: data?.key ?? key,
      value: data?.value ?? null,
      updatedAt: data?.updated_at ?? null,
    });
  } catch (error) {
    console.error("[API/settings GET] Unexpected error:", error);
    return jsonError("Internal server error during GET", 500, error);
  }
}

export async function PATCH(request: Request) {
  try {
    console.log(`[API/settings] PATCH started: ${request.url.slice(-80)}`);
    const body = await request.json().catch(() => null);
    if (!body) return jsonError("Invalid or empty JSON body", 400);
    
    const key = typeof body?.key === "string" ? body.key.trim() : "";
    const value = body?.value;
    if (!key) return jsonError("Missing 'key' in request body", 400);
    if (value === undefined || value === null) {
      return jsonError("'value' is required in request body", 400);
    }

    console.log(`[API/settings PATCH] Processing key="${key}", valueType=${typeof value} (size: ${JSON.stringify(value)?.length ?? 0}), service_role=${process.env.SUPABASE_SERVICE_ROLE_KEY ? process.env.SUPABASE_SERVICE_ROLE_KEY.slice(0,8)+'...' : 'MISSING'}`);
    
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return jsonError("Server misconfigured: SUPABASE_SERVICE_ROLE_KEY environment variable missing", 500);
    }
    
    console.log('[API/settings PATCH] Environment OK, creating Supabase client...');
    const supabase = createServerClient();

    const { data: existing, error: readError } = await supabase
      .from(TABLE_NAME)
      .select("value")
      .eq("key", key)
      .maybeSingle();

    if (readError) {
      return handleSupabaseError(readError, "PATCH /api/settings (read current value)");
    }

    const mergedValue = mergeSettingsValue(existing?.value ?? null, value);

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .upsert({ key, value: mergedValue }, { onConflict: "key" })
      .select("key, value, updated_at")
      .single();

    console.log('[API/settings PATCH] Supabase response:', {
      hasData: !!data,
      errorCode: error?.code,
      errorMsg: error?.message,
      dataPreview: data ? { key: data.key, valueType: typeof data.value, valueSize: JSON.stringify(data.value)?.length } : null
    });

    if (error) {
      return handleSupabaseError(error, "PATCH /api/settings");
    }

    return NextResponse.json({
      ok: true,
      data: {
        key: data.key,
        value: data.value,
        updatedAt: data.updated_at,
      },
    });
  } catch (error) {
    console.error("[API/settings PATCH] Unexpected error:", error);
    return jsonError("Invalid JSON body or server error", 400, error);
  }
}
