import { NextResponse } from "next/server";
import { authenticateCmsLogin, createCmsSessionToken } from "@/lib/cms-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email : "";
    const password = typeof body?.password === "string" ? body.password : "";

    const user = await authenticateCmsLogin(email, password);
    if (!user) {
      return NextResponse.json({ error: "Email hoặc mật khẩu không đúng" }, { status: 401 });
    }

    return NextResponse.json({
      token: createCmsSessionToken(),
      user,
    });
  } catch (error) {
    console.error("POST /cms/api/auth/login failed", error);
    return NextResponse.json({ error: "Đăng nhập thất bại" }, { status: 500 });
  }
}
