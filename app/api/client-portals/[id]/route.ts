import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("client_portals")
      .select("*")
      .eq("id", parseInt(id, 10))
      .single();

    if (error) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/client-portals/[id] failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const payload = await req.json();
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("client_portals")
      .update(payload)
      .eq("id", parseInt(id, 10))
      .select()
      .single();

    if (error) {
      console.error("PATCH /api/client-portals/[id] Supabase error", error);
      return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("PATCH /api/client-portals/[id] failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const supabase = createServerClient();
    const { error } = await supabase
      .from("client_portals")
      .delete()
      .eq("id", parseInt(id, 10));

    if (error) {
      console.error("DELETE /api/client-portals/[id] Supabase error", error);
      return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/client-portals/[id] failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
