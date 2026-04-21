import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const typeFilter = new URL(request.url).searchParams.get("type");
    const supabase = createServerClient();
    let query = supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (typeFilter) {
      query = query.eq("type", typeFilter);
    }
    const { data, error } = await query;

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
    const { type, name, phone, service, note, platform, url, clientId, clientName, logoUrl, rating, content } = body;

    if (!type || !phone) {
      return NextResponse.json({ error: "Missing required fields: type, phone" }, { status: 400 });
    }

    const finalNote =
      type === "review"
        ? JSON.stringify({
            kind: "review",
            clientId: typeof clientId === "number" ? clientId : 0,
            clientName: typeof clientName === "string" ? clientName : name || "",
            logoUrl: typeof logoUrl === "string" ? logoUrl : "",
            rating: typeof rating === "number" ? rating : 5,
            content: typeof content === "string" ? content : note || "",
          })
        : note;

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("leads")
      .insert({ type, name, phone, service, note: finalNote, platform, url })
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
