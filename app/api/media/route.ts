import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("GET /api/media Supabase error", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("GET /api/media failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, name, type } = body;

    if (!url || !name || !type) {
      return NextResponse.json({ error: "Missing required fields: url, name, type" }, { status: 400 });
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("media")
      .insert({ url, name, type, timestamp: Date.now() })
      .select()
      .single();

    if (error) {
      console.error("POST /api/media Supabase error", error);
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("POST /api/media failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
