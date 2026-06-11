import { NextRequest, NextResponse } from "next/server";
import { canUseCmsDatabase, handleCmsApiRequest } from "@/lib/cms-express-bridge";

export const runtime = "nodejs";

const CMS_API_URL = (process.env.CMS_API_URL || "http://localhost:8081").replace(/\/$/, "");

async function proxyRequest(request: NextRequest, pathSegments: string[]) {
  if (canUseCmsDatabase()) {
    const local = await handleCmsApiRequest(request, pathSegments);
    if (local) return local;
  }
  const targetPath = `/api/${pathSegments.join("/")}`;
  const url = new URL(targetPath, CMS_API_URL);
  url.search = request.nextUrl.search;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  const upstream = await fetch(url, init);
  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}
