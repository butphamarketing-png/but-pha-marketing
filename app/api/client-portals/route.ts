import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { normalizeClientPortalPayload } from "./payload";

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("client_portals")
      .select("*");

    if (error) {
      console.error("GET /api/client-portals Supabase error", error);
      return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("GET /api/client-portals failed", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = normalizeClientPortalPayload(body);

    if (!payload.username || !payload.password || !payload.client_name) {
      return NextResponse.json(
        { error: "username, password, clientName are required" },
        { status: 400 },
      );
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("client_portals")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("POST /api/client-portals Supabase error", error);
      return NextResponse.json(
        { error: error.message || "Failed to create" },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("POST /api/client-portals failed", error);
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
      .from("client_portals")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE /api/client-portals Supabase error", error);
      return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/client-portals failed", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const body = await req.json();
    const payload = normalizeClientPortalPayload(body);
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("client_portals")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("PATCH /api/client-portals Supabase error", error);
      return NextResponse.json(
        { error: error.message || "Failed to update" },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("PATCH /api/client-portals failed", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
