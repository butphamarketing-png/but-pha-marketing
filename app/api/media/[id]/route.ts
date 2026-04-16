import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/src";
import { mediaItems } from "@/lib/db/src/schema";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    
    if (isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await db.delete(mediaItems).where(eq(mediaItems.id, idNum)).execute();
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/media/[id] failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}