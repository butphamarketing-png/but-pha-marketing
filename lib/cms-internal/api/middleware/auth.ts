import type { NextFunction, Request, Response } from "express";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
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

function extractSessionToken(req: Request): string | null {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) {
    return auth.slice(7).trim();
  }
  const cookies = parseCookies(req.headers.cookie);
  return cookies[ADMIN_SESSION_COOKIE] ?? null;
}

export function requireCmsAuth(req: Request, res: Response, next: NextFunction) {
  const token = extractSessionToken(req);
  if (!verifyAdminSessionToken(token)) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Đăng nhập CMS để tiếp tục.",
    });
  }
  return next();
}
