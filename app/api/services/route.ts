import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("services")
      .select("*");

    if (error) {
      console.error("GET /api/services Supabase error", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("GET /api/services failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
