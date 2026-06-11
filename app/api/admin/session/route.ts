import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, getAdminAuthConfig, verifyAdminSessionToken } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const token = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE}=`))
    ?.split("=")
    .slice(1)
    .join("=") || "";

  const authenticated = verifyAdminSessionToken(decodeURIComponent(token));
  const config = authenticated ? await getAdminAuthConfig() : null;
  return NextResponse.json({
    ok: true,
    authenticated,
    email: config?.email ?? null,
  });
}

