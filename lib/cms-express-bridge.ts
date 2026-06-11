import type { Express, Request, Response } from "express";
import { EventEmitter } from "node:events";
import { NextRequest, NextResponse } from "next/server";
import httpMocks from "node-mocks-http";

let cmsApp: Express | null = null;

async function getCmsApp(): Promise<Express> {
  if (!cmsApp) {
    const mod = await import("@/lib/cms-internal/api/app");
    cmsApp = mod.default;
  }
  return cmsApp;
}

function hasCmsDatabase(): boolean {
  return Boolean(process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL);
}

export function canUseCmsDatabase(): boolean {
  return hasCmsDatabase();
}

export async function handleCmsApiRequest(
  request: NextRequest,
  pathSegments: string[],
): Promise<NextResponse | null> {
  if (!hasCmsDatabase()) {
    return null;
  }

  const app = await getCmsApp();
  const targetPath = `/api/${pathSegments.join("/")}`;
  const query = request.nextUrl.search || "";
  const url = `${targetPath}${query}`;

  let body: Record<string, unknown> | string | undefined = undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    } else {
      const text = await request.text();
      body = text || undefined;
    }
  }

  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const mockReq = httpMocks.createRequest({
    method: request.method as "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD",
    url,
    headers,
    // node-mocks-http Body type is narrower than our parsed payload
    body: body as never,
  });

  const mockRes = httpMocks.createResponse({ eventEmitter: EventEmitter });

  await new Promise<void>((resolve, reject) => {
    mockRes.on("end", () => resolve());
    mockRes.on("error", reject);
    try {
      app(mockReq as Request, mockRes as Response);
    } catch (error) {
      reject(error);
    }
  });

  const responseHeaders = new Headers();
  const rawHeaders = mockRes.getHeaders() as Record<string, string | number | string[]>;
  for (const [key, value] of Object.entries(rawHeaders)) {
    if (Array.isArray(value)) {
      value.forEach((item) => responseHeaders.append(key, String(item)));
    } else if (value !== undefined) {
      responseHeaders.set(key, String(value));
    }
  }

  const data = mockRes._getBuffer();
  if (mockRes.statusCode === 204) {
    return new NextResponse(null, { status: 204, headers: responseHeaders });
  }

  const payload = data.length > 0 ? new Uint8Array(data) : null;
  return new NextResponse(payload, {
    status: mockRes.statusCode,
    headers: responseHeaders,
  });
}
