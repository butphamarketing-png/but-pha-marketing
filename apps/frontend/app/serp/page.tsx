"use client";

import { useState } from "react";

import { apiFetch } from "../lib/api";

type SerpResponse = {
  keywordId: string;
  query: string;
  results: Array<Record<string, string | number>>;
  contentGap: Array<Record<string, string>>;
};

export default function SerpPage() {
  const [keyword, setKeyword] = useState("SEO content AI");
  const [articleId, setArticleId] = useState("");
  const [targetUrl, setTargetUrl] = useState("https://example.com");
  const [result, setResult] = useState<SerpResponse | null>(null);

  async function run() {
    const response = await apiFetch("/serp/analyze", {
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
          <p className="eyebrow">SERP</p>
          <h2>Analyze top results and content gaps.</h2>
          <p className="lead">Lay top 10 SERP de de xuat outline va content gap cho bai viet.</p>
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
            <button onClick={run}>Analyze SERP</button>
          </div>
        </div>
      </section>

      {result ? (
        <section className="panel">
          <h3>Content gap</h3>
          <ul className="suggestions">
            {result.contentGap.map((item, index) => (
              <li key={`${item.topic ?? index}`}>{item.topic ?? item.suggestion}</li>
            ))}
          </ul>
          <div className="stackList">
            {result.results.slice(0, 5).map((item, index) => (
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
