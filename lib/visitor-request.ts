export function normalizeVisitorPath(path: unknown) {
  return typeof path === "string" && path.trim() ? path.trim() : "/";
}

export function getVisitorClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function getVisitorUserAgent(request: Request) {
  return request.headers.get("user-agent") || "unknown";
}

export function isPrivateOrLocalIp(ip: string) {
  if (!ip || ip === "unknown") return true;
  if (ip === "::1" || ip.startsWith("127.")) return true;
  if (ip.startsWith("10.") || ip.startsWith("192.168.")) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)) return true;
  return false;
}
