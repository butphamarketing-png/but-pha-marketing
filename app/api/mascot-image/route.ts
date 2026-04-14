import { promises as fs } from "fs";
import { NextResponse } from "next/server";

const MASCOT_FILE =
  "C:/Users/Admin/.cursor/projects/c-Users-Admin-Downloads-ButPhaMarketing-1/assets/c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_b7d6197e47f298422e3db0cdd01f36b5_images_image-898d8010-4782-43a5-8610-6d8630952000.png";

export async function GET() {
  try {
    const imageBuffer = await fs.readFile(MASCOT_FILE);
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Mascot image not found" }, { status: 404 });
  }
}
