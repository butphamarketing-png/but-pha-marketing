import { NextResponse } from "next/server";
import { getCmsUserFromToken } from "@/lib/cms-auth";

function getBearerToken(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7).trim() || null;
}

export async function GET(request: Request) {
  try {
    const user = await getCmsUserFromToken(getBearerToken(request));
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("GET /cms/api/auth/me failed", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
