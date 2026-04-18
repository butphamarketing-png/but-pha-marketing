import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

const TABLE_NAME = "site_settings";

function jsonError(message: string, status: number, details?: unknown) {
  return NextResponse.json(
    {
      ok: false,
      error: message,
      ...(details ? { details } : {}),
    },
    { status }
  );
}

function handleSupabaseError(error: unknown, context: string) {
  console.error(`${context} Supabase error`, error);

  if (error && typeof error === "object") {
    const code = "code" in error ? error.code : undefined;
    const message = "message" in error ? error.message : undefined;

    if (code === "PGRST205") {
      return jsonError(
        "Database table 'public.site_settings' does not exist. Run the SQL migration first.",
        500,
        { code, message }
      );
    }

    return jsonError("Supabase request failed", 500, { code, message });
  }

  return jsonError("Internal Server Error", 500);
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");
    if (!key) return jsonError("Missing key query parameter", 400);

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("key, value, updated_at")
      .eq("key", key)
      .maybeSingle();

    if (error) {
      return handleSupabaseError(error, "GET /api/settings");
    }

    return NextResponse.json({
      ok: true,
      key,
      value: data?.value ?? null,
      updatedAt: data?.updated_at ?? null,
    });
  } catch (error) {
    console.error("GET /api/settings failed", error);
    return jsonError("Internal Server Error", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const key = typeof body?.key === "string" ? body.key.trim() : "";
    const value = body?.value ?? null;
    if (!key) return jsonError("Missing key in request body", 400);

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .upsert({ key, value }, { onConflict: "key" })
      .select("key, value, updated_at")
      .single();

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
    console.error("PATCH /api/settings failed", error);
    return jsonError("Invalid JSON body", 400);
  }
}
