import { createHash, createHmac, timingSafeEqual } from "crypto";
import { createServerClient } from "@/lib/supabase";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const DEFAULT_ADMIN_EMAIL = "butphamarketing@gmail.com";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

export type AdminAuthConfig = {
  email: string;
  passwordHash: string;
};

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

export function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function getAdminAuthConfig(): Promise<AdminAuthConfig> {
  const fallbackEmail = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim();
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "admin_auth_config")
      .maybeSingle();

    if (error) {
      console.error("[admin-auth] Failed to load admin auth config", error);
      return { email: fallbackEmail, passwordHash: "" };
    }

    const value = data?.value && typeof data.value === "object" ? (data.value as Record<string, unknown>) : {};
    return {
      email: typeof value.email === "string" && value.email.trim() ? value.email.trim() : fallbackEmail,
      passwordHash: typeof value.passwordHash === "string" ? value.passwordHash : "",
    };
  } catch (error) {
    console.error("[admin-auth] getAdminAuthConfig failed", error);
    return { email: fallbackEmail, passwordHash: "" };
  }
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
    const envPassword = (process.env.ADMIN_PASSWORD || "").trim();
    if (envPassword && password === envPassword) {
      return true;
    }

    const { passwordHash } = await getAdminAuthConfig();
    if (passwordHash) {
      return hashPassword(password) === passwordHash;
    }

    return password === getAdminPassword();
  } catch (error) {
    console.error("[admin-auth] validateAdminPassword failed", error);
    return password === getAdminPassword();
  }
}

export async function validateAdminLogin(email: string, password: string): Promise<boolean> {
  const config = await getAdminAuthConfig();
  const expectedEmail = normalizeEmail(config.email);
  if (normalizeEmail(email) !== expectedEmail) {
    return false;
  }
  return validateAdminPassword(password);
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
