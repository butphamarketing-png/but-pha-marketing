import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

function jsonError(message: string, status: number, details?: unknown) {
  return NextResponse.json(
    { ok: false, error: message, ...(details ? { details } : {}) },
    { status }
  );
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const platform = searchParams.get("platform");

    if (!platform) {
      return jsonError("Missing platform query parameter", 400);
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("platform, content, updated_at")
      .eq("platform", platform)
      .maybeSingle();

    if (error) {
      console.error("GET /api/content Supabase error", error);
      return jsonError("Failed to fetch page content", 500, error);
    }

    return NextResponse.json({
      ok: true,
      platform,
      content: data?.content ?? null,
      updatedAt: data?.updated_at ?? null,
    });
  } catch (error) {
    console.error("GET /api/content failed", error);
    return jsonError("Internal Server Error", 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const platform = typeof body?.platform === "string" ? body.platform.trim() : "";
    const content = body?.content ?? null;

    if (!platform) {
      return jsonError("Missing platform in request body", 400);
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("page_content")
      .upsert({ platform, content }, { onConflict: "platform" })
      .select("platform, content, updated_at")
      .single();

    if (error) {
      console.error("POST /api/content Supabase error", error);
      return jsonError("Failed to save page content", 500, error);
    }

    return NextResponse.json({
      ok: true,
      data: {
        platform: data.platform,
        content: data.content,
        updatedAt: data.updated_at,
      },
    });
  } catch (error) {
    console.error("POST /api/content failed", error);
    return jsonError("Invalid JSON body", 400);
  }
}