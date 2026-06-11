import type { Express, Request, Response } from "express";
import { EventEmitter } from "node:events";
import { NextRequest, NextResponse } from "next/server";
import { createRequest, createResponse } from "node-mocks-http";

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

function waitForResponse(mockRes: ReturnType<typeof createResponse>): Promise<void> {
  return new Promise((resolve, reject) => {
    if (mockRes._isEndCalled()) {
      resolve();
      return;
    }

    const timeout = setTimeout(() => {
      reject(new Error("CMS API handler timeout"));
    }, 25_000);

    const done = () => {
      clearTimeout(timeout);
      resolve();
    };

    const events = mockRes as ReturnType<typeof createResponse> & EventEmitter;
    events.on("finish", done);
    events.on("close", done);
    events.on("error", (error: Error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}

export async function handleCmsApiRequest(
  request: NextRequest,
  pathSegments: string[],
): Promise<NextResponse | null> {
  if (!hasCmsDatabase()) {
    return null;
  }

  try {
    const app = await getCmsApp();
    const targetPath = `/api/${pathSegments.join("/")}`;
    const query = request.nextUrl.search || "";
    const url = `${targetPath}${query}`;

    let body: Record<string, unknown> | string | undefined;
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

    const mockReq = createRequest({
      method: request.method as "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD",
      url,
      headers,
      body: body as never,
    });

    const mockRes = createResponse({ eventEmitter: EventEmitter });

    await new Promise<void>((resolve, reject) => {
      (mockRes as ReturnType<typeof createResponse> & EventEmitter).on("error", reject);
      try {
        app(mockReq as Request, mockRes as Response);
        waitForResponse(mockRes).then(resolve).catch(reject);
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

    if (mockRes.statusCode === 204) {
      return new NextResponse(null, { status: 204, headers: responseHeaders });
    }

    const data = mockRes._getBuffer();
    const payload = data.length > 0 ? new Uint8Array(data) : null;
    return new NextResponse(payload, {
      status: mockRes.statusCode || 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("[cms-api] handler failed", pathSegments.join("/"), error);
    return NextResponse.json(
      { error: "CMS API error", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
