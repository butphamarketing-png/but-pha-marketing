import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("client_portals")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("POST /api/client-portals/login Supabase error", error);
      return NextResponse.json({ error: "Failed to login" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("POST /api/client-portals/login failed", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
