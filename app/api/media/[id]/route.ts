import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);

    if (isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const supabase = createServerClient();
    const { error } = await supabase
      .from("media")
      .delete()
      .eq("id", idNum);

    if (error) {
      console.error("DELETE /api/media/[id] Supabase error", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/media/[id] failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
