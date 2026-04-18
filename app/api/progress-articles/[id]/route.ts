import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient();
    const { error } = await supabase
      .from("progress_articles")
      .delete()
      .eq("id", parseInt(params.id, 10));

    if (error) {
      console.error("DELETE /api/progress-articles/[id] Supabase error", error);
      return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/progress-articles/[id] failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
