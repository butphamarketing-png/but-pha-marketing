import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = createServerClient();
    
    // 1. Fetch total posts count
    const { count: totalPosts } = await supabase
      .from("news")
      .select("*", { count: "exact", head: true });

    // 2. Fetch published posts count
    const { count: publishedPosts } = await supabase
      .from("news")
      .select("*", { count: "exact", head: true })
      .eq("published", true);

    // 3. Fetch needs update (SEO score < 60)
    // Note: We'd normally filter by seo_score column if it exists in DB
    const { count: needsUpdate } = await supabase
      .from("news")
      .select("*", { count: "exact", head: true })
      .lt("seo_score", 60);

    // 4. Calculate Average SEO Score
    const { data: seoData } = await supabase
      .from("news")
      .select("seo_score");
    
    const avgSeoScore = seoData && seoData.length > 0
      ? Math.round(seoData.reduce((acc, curr) => acc + (curr.seo_score || 0), 0) / seoData.length)
      : 0;

    // 5. Fetch Priority Posts (dropping rank or low SEO)
    const { data: priorityPosts } = await supabase
      .from("news")
      .select("id, title, seo_score, tracked_keyword")
      .lt("seo_score", 50)
      .limit(3);

    const data = {
      totalPosts: totalPosts || 0,
      publishedPosts: publishedPosts || 0,
      needsUpdate: needsUpdate || 0,
      avgSeoScore: avgSeoScore,
      traffic: "0K", // Traffic often comes from GSC/GA API, mocking for now
      changes: {
        totalPosts: 0,
        publishedPosts: 0,
        needsUpdate: 0,
        avgSeoScore: 0,
        traffic: 0,
      },
      priorityPosts: (priorityPosts || []).map(p => ({
        id: p.id,
        title: p.title,
        problem: "SEO thấp",
        metric: `${p.seo_score}/100`,
        status: "warning",
      })),
      droppingPosts: [], // Real data would come from KeywordRanking table
      risingPosts: [],
      trend: [],
    };

    return NextResponse.json(data);
  } catch (err) {
    console.error("Dashboard overview API error:", err);
    // Fallback to static mock if DB call fails completely
    return NextResponse.json({
      totalPosts: 0,
      publishedPosts: 0,
      needsUpdate: 0,
      avgSeoScore: 0,
      traffic: "0K",
      priorityPosts: [],
      trend: []
    });
  }
}
