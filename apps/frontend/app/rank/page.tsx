"use client";

import { useState } from "react";

import { apiFetch } from "../lib/api";

type RankResponse = {
  keyword_id: string;
  query: string;
  current_rank: number | null;
  previous_rank: number | null;
  delta: number | null;
  needs_update: boolean;
  top_results: Array<Record<string, string | number>>;
  matched_url: string | null;
};

export default function RankPage() {
  const [keyword, setKeyword] = useState("SEO content AI");
  const [targetUrl, setTargetUrl] = useState("https://example.com");
  const [articleId, setArticleId] = useState("");
  const [result, setResult] = useState<RankResponse | null>(null);

  async function track() {
    const response = await apiFetch("/rank/track", {
      method: "POST",
      body: JSON.stringify({
        article_id: articleId || null,
        site_base_url: "https://example.com",
        site_name: "Example Site",
        keyword,
        target_url: targetUrl,
        locale: "vi-VN",
        device: "desktop",
        search_engine: "google",
      }),
    });
    setResult(await response.json());
  }

  return (
    <main className="pageStack">
      <section className="hero">
        <div>
          <p className="eyebrow">Rank</p>
          <h2>Track keyword movement and decay.</h2>
          <p className="lead">Lien ket keyword voi article de theo doi rank theo thoi gian.</p>
        </div>
        <div className="heroCard">
          <div className="formGrid">
            <label>
              Article ID
              <input value={articleId} onChange={(event) => setArticleId(event.target.value)} />
            </label>
            <label>
              Keyword
              <input value={keyword} onChange={(event) => setKeyword(event.target.value)} />
            </label>
            <label>
              Target URL
              <input value={targetUrl} onChange={(event) => setTargetUrl(event.target.value)} />
            </label>
          </div>
          <div className="actions">
            <button onClick={track}>Track rank</button>
          </div>
        </div>
      </section>

      {result ? (
        <section className="panel">
          <h3>Current rank: {result.current_rank ?? "N/A"}</h3>
          <p>Needs update: {result.needs_update ? "Yes" : "No"}</p>
          <p>Delta: {result.delta ?? "N/A"}</p>
          <div className="stackList">
            {result.top_results.slice(0, 5).map((item, index) => (
              <article key={`${item.url ?? index}`} className="stackItem">
                <strong>{item.title as string}</strong>
                <span>{item.url as string}</span>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
