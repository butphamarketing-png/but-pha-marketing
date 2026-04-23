import { NextResponse } from "next/server";
import { ensureUniqueNewsSlug } from "@/lib/news-slug";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  try {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) {
      return NextResponse.json({ error: "Server misconfigured: Missing SUPABASE_SERVICE_ROLE_KEY" }, { status: 500 });
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("GET /api/news Supabase error", error);
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("GET /api/news failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title, content, category, published, description,
      imageUrl, slug, hot, metaDescription, keywordsMain,
      keywordsSecondary, publishedAt,
    } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Missing required fields: title, content" }, { status: 400 });
    }

    const supabase = createServerClient();
    const { data: existingRows, error: existingError } = await supabase.from("news").select("id,slug,title");

    if (existingError) {
      console.error("POST /api/news preload slug error", existingError);
      return NextResponse.json({ error: `Database error: ${existingError.message}` }, { status: 500 });
    }

    const uniqueSlug = ensureUniqueNewsSlug(existingRows || [], { slug, title });
    const id = uniqueSlug || crypto.randomUUID();
    const { data, error } = await supabase
      .from("news")
      .insert({
        id,
        title,
        content,
        category: category || "blog",
        published: published !== false,
        description: description || "",
        image_url: imageUrl || "",
        slug: uniqueSlug,
        hot: !!hot,
        meta_description: metaDescription || "",
        keywords_main: keywordsMain || "",
        keywords_secondary: keywordsSecondary || "",
        timestamp: Date.now(),
        published_at: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("POST /api/news Supabase error", error);
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("POST /api/news failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing required field: id" }, { status: 400 });
    }

    // Normalize field names to snake_case for Supabase
    const normalized: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(updates)) {
      if (k === "imageUrl") normalized["image_url"] = v;
      else if (k === "metaDescription") normalized["meta_description"] = v;
      else if (k === "keywordsMain") normalized["keywords_main"] = v;
      else if (k === "keywordsSecondary") normalized["keywords_secondary"] = v;
      else if (k === "publishedAt") normalized["published_at"] = v ? new Date(v as string).toISOString() : v;
      else if (k === "timestamp") normalized["timestamp"] = typeof v === "string" ? parseInt(v) : v;
      else normalized[k] = v;
    }
    normalized["updated_at"] = new Date().toISOString();

    const supabase = createServerClient();
    const shouldResolveSlug = typeof normalized["slug"] === "string" || typeof normalized["title"] === "string";

    if (shouldResolveSlug) {
      const { data: currentRow, error: currentError } = await supabase.from("news").select("id,title,slug").eq("id", id).maybeSingle();
      if (currentError) {
        console.error("PATCH /api/news current slug error", currentError);
        return NextResponse.json({ error: `Database error: ${currentError.message}` }, { status: 500 });
      }

      const { data: existingRows, error: existingError } = await supabase.from("news").select("id,slug,title");
      if (existingError) {
        console.error("PATCH /api/news preload slug error", existingError);
        return NextResponse.json({ error: `Database error: ${existingError.message}` }, { status: 500 });
      }

      normalized["slug"] = ensureUniqueNewsSlug(existingRows || [], {
        slug: typeof normalized["slug"] === "string" ? normalized["slug"] : (currentRow?.slug ?? ""),
        title: typeof normalized["title"] === "string" ? normalized["title"] : (currentRow?.title ?? ""),
        excludeId: id,
      });
    }

    const { error } = await supabase
      .from("news")
      .update(normalized)
      .eq("id", id);

    if (error) {
      console.error("PATCH /api/news Supabase error", error);
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PATCH /api/news failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing required parameter: id" }, { status: 400 });
    }

    const supabase = createServerClient();
    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE /api/news Supabase error", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/news failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
