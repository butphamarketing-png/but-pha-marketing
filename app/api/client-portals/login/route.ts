import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { username, password, platform } = await req.json();

    if (!username || !password || !platform) {
      return NextResponse.json(
        { error: "Username, password va platform la bat buoc." },
        { status: 400 },
      );
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("client_portals")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .eq("platform", platform)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("POST /api/client-portals/login Supabase error", error);
      return NextResponse.json({ error: "Failed to login" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(
        { error: "Sai tai khoan, mat khau hoac nen tang." },
        { status: 401 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("POST /api/client-portals/login failed", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
