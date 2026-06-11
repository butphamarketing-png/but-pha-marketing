import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { deleteFromR2, getR2StoragePathFromUrl, isR2Configured } from "@/lib/r2-storage";

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
    const { data: item, error: fetchError } = await supabase
      .from("media")
      .select("url")
      .eq("id", idNum)
      .maybeSingle();

    if (fetchError) {
      console.error("DELETE /api/media/[id] fetch error", fetchError);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    const { error } = await supabase.from("media").delete().eq("id", idNum);

    if (error) {
      console.error("DELETE /api/media/[id] Supabase error", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    if (item?.url && isR2Configured()) {
      const storagePath = getR2StoragePathFromUrl(item.url);
      if (storagePath) {
        try {
          await deleteFromR2(storagePath);
        } catch (deleteError) {
          console.error("DELETE /api/media/[id] R2 delete failed", deleteError);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/media/[id] failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
