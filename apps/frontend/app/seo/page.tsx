"use client";

import { useEffect, useState } from "react";

import { apiFetch } from "../lib/api";

type SeoAnalysis = {
  score: number;
  breakdown: Record<string, number>;
  issues: string[];
  suggestions: string[];
  metrics: Record<string, number>;
  heading_structure: string[];
  recommended_outline: string[];
  meta_title_suggestion: string;
  meta_description_suggestion: string;
  internal_link_suggestions: string[];
  content_summary: string;
  keyword_in_title: boolean;
  keyword_occurrences: number;
  first_keyword_position: number | null;
};

type SerpAnalysis = {
  keywordId: string;
  query: string;
  results: Array<Record<string, unknown>>;
  contentGap: Array<Record<string, unknown>>;
};

type ContentBrief = {
  keyword: string;
  title: string;
  search_intent: string;
  content_angle: string;
  target_length: number;
  keyword_difficulty: number;
  difficulty_label: string;
  outline: string[];
  keywords: string[];
  questions: string[];
  internal_link_suggestions: string[];
  meta_title_suggestion: string;
  meta_description_suggestion: string;
  summary: string;
};

export default function SeoPage() {
  const [title, setTitle] = useState("SEO Content AI");
  const [keyword, setKeyword] = useState("SEO content AI");
  const [content, setContent] = useState(`# SEO Content AI\n\n## Loi ich chinh\n\n- Co outline\n- Co keyword\n\n## FAQ\n\n- SEO content AI la gi?`);
  const [analysis, setAnalysis] = useState<SeoAnalysis | null>(null);
  const [status, setStatus] = useState("");
  const [serpAnalysis, setSerpAnalysis] = useState<SerpAnalysis | null>(null);
  const [brief, setBrief] = useState<ContentBrief | null>(null);
  const [briefStatus, setBriefStatus] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void generateBrief();
    }, 600);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, keyword, serpAnalysis]);

  function estimateKeywordDifficulty(gapLength: number) {
    return Math.max(5, Math.min(95, 20 + gapLength * 8));
  }

  async function generateBrief(gapOverride?: Array<Record<string, unknown>>) {
    const effectiveGap = gapOverride ?? serpAnalysis?.contentGap ?? [];
    setBriefStatus("Generating brief...");
    try {
      const response = await apiFetch("/seo/generate-brief", {
        method: "POST",
        body: JSON.stringify({
          keyword,
          title,
          audience: "general",
          tone: "seo",
          locale: "vi-VN",
          target_length: 1800,
          serp_gap: effectiveGap,
          competitor_notes: effectiveGap.map((item) => String(item.reason ?? item.suggestion ?? item.topic ?? "")).filter(Boolean),
          keyword_difficulty: estimateKeywordDifficulty(effectiveGap.length),
        }),
      });
      setBrief((await response.json()) as ContentBrief);
      setBriefStatus("Brief ready");
    } catch {
      setBrief(null);
      setBriefStatus("Brief unavailable");
    }
  }

  async function analyze() {
    setStatus("Analyzing...");
    const response = await apiFetch("/seo/analyze-content", {
      method: "POST",
      body: JSON.stringify({
        content,
        primary_keyword: keyword,
        title,
        locale: "vi-VN",
      }),
    });
    setAnalysis(await response.json());
    setStatus("Analysis complete");
  }

  async function refresh() {
    setStatus("Refreshing draft...");
    const response = await apiFetch("/seo/refresh-draft", {
      method: "POST",
      body: JSON.stringify({
        content,
        primary_keyword: keyword,
        title,
        competitor_notes: ["Thieu internal link", "Can them FAQ"],
        serp_gap: serpAnalysis?.contentGap ?? [],
      }),
    });
    const data = await response.json();
    setContent(data.revised_markdown);
    setStatus(`Draft refreshed. Score ${data.after_score}`);
  }

  async function loadSerpGap() {
    setStatus("Loading SERP gap...");
    try {
      const response = await apiFetch("/serp/analyze", {
        method: "POST",
        body: JSON.stringify({
          site_base_url: "https://example.com",
          site_name: "Example Site",
          keyword,
          target_url: null,
          locale: "vi-VN",
          device: "desktop",
          search_engine: "google",
        }),
      });
      const data = (await response.json()) as SerpAnalysis;
      setSerpAnalysis(data);
      setStatus("SERP gap loaded");
    } catch {
      setSerpAnalysis(null);
      setStatus("Failed to load SERP gap");
    }
  }

  return (
    <main className="pageStack">
      <section className="hero">
        <div>
          <p className="eyebrow">SEO</p>
          <h2>Score, diagnose, and refresh content.</h2>
          <p className="lead">Phan tich noi dung va tao ban refresh de khong overwrite version cu.</p>
        </div>
        <div className="heroCard">
          <div className="formGrid">
            <label>
              Title
              <input value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>
            <label>
              Primary keyword
              <input value={keyword} onChange={(event) => setKeyword(event.target.value)} />
            </label>
          </div>
          {status ? <p className="statusText">{status}</p> : null}
          {briefStatus ? <p className="statusText">{briefStatus}</p> : null}
        </div>
      </section>

      {brief ? (
        <section className="panel">
          <h3>Auto brief</h3>
          <p className="lead">{brief.summary}</p>
          <div className="chips">
            <span>Difficulty: {brief.difficulty_label} ({brief.keyword_difficulty})</span>
            <span>Intent: {brief.search_intent}</span>
            <span>Target: {brief.target_length} words</span>
          </div>
          <div className="twoCols">
            <div className="stackItem">
              <strong>Content angle</strong>
              <span>{brief.content_angle}</span>
            </div>
            <div className="stackItem">
              <strong>Meta suggestions</strong>
              <span>{brief.meta_title_suggestion}</span>
              <span>{brief.meta_description_suggestion}</span>
            </div>
          </div>
          <div className="twoCols">
            <div>
              <h4>Outline</h4>
              <ul className="suggestions">
                {brief.outline.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Questions</h4>
              <ul className="suggestions">
                {brief.questions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4>Internal links</h4>
            <ul className="suggestions">
              {brief.internal_link_suggestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="panel">
        <div className="actions">
          <button type="button" onClick={loadSerpGap}>
            Load SERP gap
          </button>
        </div>
        {serpAnalysis ? (
          <div className="twoCols">
            <div>
              <h4>Content gap</h4>
              <ul className="suggestions">
                {serpAnalysis.contentGap.map((item) => (
                  <li key={String(item.topic ?? item.reason)}>{String(item.topic ?? item.reason)}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Top results</h4>
              <ul className="suggestions">
                {serpAnalysis.results.slice(0, 5).map((item, index) => (
                  <li key={`${String(item.title ?? "result")}-${index}`}>{String(item.title ?? item.url ?? "Result")}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </section>

      <section className="panel">
        <label className="textareaLabel">
          Content
          <textarea value={content} onChange={(event) => setContent(event.target.value)} />
        </label>
        <div className="actions">
          <button onClick={analyze}>Analyze</button>
          <button onClick={refresh}>Refresh draft</button>
        </div>
      </section>

      {analysis ? (
        <section className="panel">
          <div className="scoreCard">
            <span>SEO score</span>
            <strong>{analysis.score}</strong>
          </div>
          <p className="lead">{analysis.content_summary}</p>
          <div className="chips">
            {Object.entries(analysis.breakdown).map(([key, value]) => (
              <span key={key}>
                {key}: {value}
              </span>
            ))}
          </div>
          <div className="chips">
            <span>Word count: {analysis.metrics.wordCount}</span>
            <span>Heading count: {analysis.metrics.headingCount}</span>
            <span>Keyword density: {analysis.metrics.keywordDensity}%</span>
            <span>First keyword position: {analysis.first_keyword_position ?? "n/a"}</span>
          </div>
          <div className="twoCols">
            <div>
              <h4>Issues</h4>
              <ul className="suggestions">
                {analysis.issues.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Suggestions</h4>
              <ul className="suggestions">
                {analysis.suggestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="twoCols">
            <div className="stackItem">
              <strong>Meta title suggestion</strong>
              <span>{analysis.meta_title_suggestion}</span>
              <span>Keyword in title: {analysis.keyword_in_title ? "Yes" : "No"}</span>
            </div>
            <div className="stackItem">
              <strong>Meta description suggestion</strong>
              <span>{analysis.meta_description_suggestion}</span>
              <span>Keyword occurrences: {analysis.keyword_occurrences}</span>
            </div>
          </div>
          <div className="twoCols">
            <div>
              <h4>Heading structure</h4>
              <ul className="suggestions">
                {analysis.heading_structure.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Recommended outline</h4>
              <ul className="suggestions">
                {analysis.recommended_outline.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4>Internal link suggestions</h4>
            <ul className="suggestions">
              {analysis.internal_link_suggestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
