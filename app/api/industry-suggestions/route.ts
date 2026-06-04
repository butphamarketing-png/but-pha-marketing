import { NextResponse } from "next/server";
import {
  getIndustrySuggestionsFullCount,
  searchIndustrySuggestionsFull,
} from "@/lib/industry-suggestions-server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("count") === "1") {
      return NextResponse.json({ count: getIndustrySuggestionsFullCount() });
    }

    const q = searchParams.get("q") ?? "";
    const limit = Math.min(20, Math.max(1, Number(searchParams.get("limit") ?? 12) || 12));
    const suggestions = searchIndustrySuggestionsFull(q, limit);
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("[API/industry-suggestions GET] Failed:", error);
    return NextResponse.json({ suggestions: [], count: 0 }, { status: 500 });
  }
}
