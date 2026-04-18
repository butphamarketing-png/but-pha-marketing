import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");
    if (!clientId) return NextResponse.json({ error: "ClientId required" }, { status: 400 });

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("progress_articles")
      .select("*")
      .eq("client_id", parseInt(clientId))
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET /api/progress-articles Supabase error", error);
      return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("GET /api/progress-articles failed", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("progress_articles")
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error("POST /api/progress-articles Supabase error", error);
      return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("POST /api/progress-articles failed", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = createServerClient();
    const { error } = await supabase
      .from("progress_articles")
      .delete()
      .eq("id", parseInt(id));

    if (error) {
      console.error("DELETE /api/progress-articles Supabase error", error);
      return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/progress-articles failed", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
