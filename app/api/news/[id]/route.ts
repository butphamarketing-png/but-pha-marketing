import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const updates = await req.json();

    // Normalize field names to snake_case for Supabase
    const normalized: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(updates)) {
      if (k === "imageUrl") normalized["image_url"] = v;
      else if (k === "metaDescription") normalized["meta_description"] = v;
      else if (k === "keywordsMain") normalized["keywords_main"] = v;
      else if (k === "keywordsSecondary") normalized["keywords_secondary"] = v;
      else if (k === "publishedAt") normalized["published_at"] = v ? new Date(v as string).toISOString() : v;
      else normalized[k] = v;
    }
    normalized["updated_at"] = new Date().toISOString();

    const supabase = createServerClient();
    const { error } = await supabase
      .from("news")
      .update(normalized)
      .eq("id", id);

    if (error) {
      console.error("PATCH /api/news/[id] Supabase error", error);
      return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PATCH /api/news/[id] failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const supabase = createServerClient();
    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE /api/news/[id] Supabase error", error);
      return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/news/[id] failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
