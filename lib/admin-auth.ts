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
  return (process.env.ADMIN_PASSWORD || "admin123").trim();
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
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "admin_auth_config")
      .maybeSingle();

    if (error) {
      console.error("[admin-auth] Failed to load custom admin password", error);
      return false;
    }

    const passwordHash = typeof data?.value?.passwordHash === "string" ? data.value.passwordHash : "";
    if (passwordHash) {
      return hashPassword(password) === passwordHash;
    }

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
