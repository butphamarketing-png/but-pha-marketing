import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET /api/orders Supabase error", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("GET /api/orders failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, pkg, tabLabel, platform, duration, total, payMethod } = body;

    if (!name || !phone || !pkg || !tabLabel || !platform || !duration || !total || !payMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("orders")
      .insert({
        name,
        phone,
        pkg,
        tab_label: tabLabel,
        platform,
        duration,
        total,
        pay_method: payMethod,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("POST /api/orders Supabase error", error);
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("POST /api/orders failed", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
