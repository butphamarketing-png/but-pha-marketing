import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { isAdminRequest, validateAdminPassword } from "@/lib/admin-auth";

const AUTH_CONFIG_KEY = "admin_auth_config";

function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export async function POST(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : "";
    const newPassword = typeof body?.newPassword === "string" ? body.newPassword.trim() : "";

    if (!(await validateAdminPassword(currentPassword))) {
      return NextResponse.json({ ok: false, error: "Mật khẩu hiện tại không đúng." }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ ok: false, error: "Mật khẩu mới cần ít nhất 6 ký tự." }, { status: 400 });
    }

    const supabase = createServerClient();
    const { error } = await supabase
      .from("site_settings")
      .upsert(
        {
          key: AUTH_CONFIG_KEY,
          value: { passwordHash: hashPassword(newPassword) },
        },
        { onConflict: "key" },
      );

    if (error) {
      console.error("POST /api/admin/password Supabase error", error);
      return NextResponse.json({ ok: false, error: "Không thể lưu mật khẩu mới." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/admin/password failed", error);
    return NextResponse.json({ ok: false, error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }
}
