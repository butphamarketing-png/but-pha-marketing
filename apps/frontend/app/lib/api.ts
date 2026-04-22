const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export async function apiFetch(path: string, init?: RequestInit) {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("access_token") : null;
  return fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
}

export function saveAccessToken(token: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("access_token", token);
  }
}
