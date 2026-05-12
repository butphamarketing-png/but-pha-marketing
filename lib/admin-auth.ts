import { createHash, createHmac, timingSafeEqual } from "crypto";
import { createServerClient } from "@/lib/supabase";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

type SessionPayload = {
  exp: number;
  nonce: string;
};

function base64UrlEncode(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function base64UrlDecode(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function getAdminPassword(): string {
  const password = (process.env.ADMIN_PASSWORD || "").trim();
  if (!password && process.env.NODE_ENV === "production") {
    throw new Error("Missing ADMIN_PASSWORD for production admin login.");
  }
  return password || "admin123";
}

function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

function getSessionSecret(): string {
  const secret = (process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET or SUPABASE_SERVICE_ROLE_KEY for admin session signing.");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  return cookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, part) => {
      const [name, ...rest] = part.split("=");
      if (!name) return acc;
      acc[name] = decodeURIComponent(rest.join("=") || "");
      return acc;
    }, {});
}

export async function validateAdminPassword(password: string): Promise<boolean> {
  try {
    // Ưu tiên 1: Kiểm tra mật khẩu từ biến môi trường (Environment Variable)
    const envPassword = (process.env.ADMIN_PASSWORD || "").trim();
    if (envPassword && password === envPassword) {
      return true;
    }

    // Ưu tiên 2: Kiểm tra mật khẩu tùy chỉnh từ Database (Supabase)
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "admin_auth_config")
      .maybeSingle();

    if (error) {
      console.error("[admin-auth] Failed to load custom admin password", error);
    }

    const passwordHash = typeof data?.value?.passwordHash === "string" ? data.value.passwordHash : "";
    if (passwordHash) {
      return hashPassword(password) === passwordHash;
    }

    // Ưu tiên 3: Mật khẩu mặc định nếu không có cấu hình nào khác
    return password === getAdminPassword();
  } catch (error) {
    console.error("[admin-auth] validateAdminPassword failed", error);
    return password === getAdminPassword();
  }
}

export function createAdminSessionToken(): string {
  const payload: SessionPayload = {
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    nonce: Math.random().toString(36).slice(2) + Date.now().toString(36),
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  const expectedSignature = sign(encodedPayload);
  const sigA = Buffer.from(signature);
  const sigB = Buffer.from(expectedSignature);
  if (sigA.length !== sigB.length) return false;
  if (!timingSafeEqual(sigA, sigB)) return false;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload;
    return Number.isFinite(payload.exp) && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function isAdminRequest(request: Request): boolean {
  const cookies = parseCookies(request.headers.get("cookie"));
  return verifyAdminSessionToken(cookies[ADMIN_SESSION_COOKIE]);
}
