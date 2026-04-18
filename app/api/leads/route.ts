import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET /api/leads Supabase error", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("GET /api/leads failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, phone, service, note, platform, url } = body;

    if (!type || !phone) {
      return NextResponse.json({ error: "Missing required fields: type, phone" }, { status: 400 });
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("leads")
      .insert({ type, name, phone, service, note, platform, url })
      .select()
      .single();

    if (error) {
      console.error("POST /api/leads Supabase error", error);
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("POST /api/leads failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
