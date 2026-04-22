"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { apiFetch } from "../lib/api";

type Article = {
  id: string;
  site_id: string;
  title: string;
  slug: string;
  status: string;
  primary_keyword: string;
  search_intent: string;
  tone: string;
  published_url: string | null;
};

type GeneratedArticle = {
  article_id: string;
  article_slug: string;
  site_id: string;
  version_id: string;
  outline: string[];
  keywords: string[];
  search_intent: string;
  draft_version_id: string;
  article_markdown: string;
  meta_title: string;
  meta_description: string;
  seo_recommendations: string[];
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

type SerpGapItem = {
  type?: string;
  suggestion?: string;
  reason?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  topic?: string;
};

function estimateKeywordDifficulty(gapItems: SerpGapItem[]) {
  return Math.max(5, Math.min(95, 20 + gapItems.length * 8));
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState("SEO Content AI");
  const [primaryKeyword, setPrimaryKeyword] = useState("SEO content AI");
  const [siteName, setSiteName] = useState("Example Site");
  const [siteBaseUrl, setSiteBaseUrl] = useState("https://example.com");
  const [workspaceId, setWorkspaceId] = useState("");
  const [tone, setTone] = useState("seo");
  const [generated, setGenerated] = useState<GeneratedArticle | null>(null);
  const [brief, setBrief] = useState<ContentBrief | null>(null);
  const [serpGap, setSerpGap] = useState<SerpGapItem[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      const response = await apiFetch("/articles");
      const data = await response.json();
      setArticles(data.articles ?? []);
    } catch {
      setArticles([]);
    }
  }

  async function createArticle(briefContext?: ContentBrief | null) {
    try {
      const response = await apiFetch("/articles", {
        method: "POST",
        body: JSON.stringify({
          workspace_id: workspaceId || null,
          title,
          primary_keyword: primaryKeyword,
          tone,
          locale: "vi-VN",
          target_length: 1800,
          audience: "general",
          additional_keywords: [primaryKeyword, "SEO", "content"],
          site_name: siteName,
          site_base_url: siteBaseUrl,
          brief_context: briefContext ?? brief,
        }),
      });
      const data = (await response.json()) as GeneratedArticle;
      setGenerated(data);
      await loadArticles();
    } catch {
      return;
    }
  }

  async function loadSerpGap() {
    try {
      const response = await apiFetch("/serp/analyze", {
        method: "POST",
        body: JSON.stringify({
          site_base_url: siteBaseUrl,
          site_name: siteName,
          keyword: primaryKeyword,
          target_url: null,
          locale: "vi-VN",
          device: "desktop",
          search_engine: "google",
        }),
      });
      const data = (await response.json()) as { contentGap: SerpGapItem[] };
      setSerpGap(data.contentGap ?? []);
      setStatus("SERP gap loaded");
      return data.contentGap ?? [];
    } catch {
      setStatus("Failed to load SERP gap");
      setSerpGap([]);
      return [];
    }
  }

  async function generateBrief(overrideGap?: SerpGapItem[]) {
    try {
      const effectiveGap = overrideGap ?? (serpGap.length ? serpGap : await loadSerpGap());
      const response = await apiFetch("/seo/generate-brief", {
        method: "POST",
        body: JSON.stringify({
          keyword: primaryKeyword,
          title,
          audience: "general",
          tone,
          locale: "vi-VN",
          target_length: 1800,
          serp_gap: effectiveGap,
          competitor_notes: effectiveGap.map((item) => item.reason || item.suggestion || item.topic || "").filter(Boolean),
          keyword_difficulty: estimateKeywordDifficulty(effectiveGap),
        }),
      });
      const data = (await response.json()) as ContentBrief;
      setBrief(data);
      return data;
    } catch {
      setBrief(null);
      return null;
    }
  }

  async function runOneClickFlow() {
    try {
      setStatus("Loading SERP gap...");
      const gap = serpGap.length ? serpGap : await loadSerpGap();
      setStatus("Generating brief...");
      const freshBrief = await generateBrief(gap);
      if (!freshBrief) {
        setStatus("Failed to generate brief");
        return;
      }
      setStatus("Generating article from brief...");
      await createArticle(freshBrief);
      setStatus("Brief and article generated");
    } catch {
      setStatus("One-click flow failed");
      return;
    }
  }

  return (
    <main className="pageStack">
      <section className="hero">
        <div>
          <p className="eyebrow">Articles</p>
          <h2>Create, version, and publish SEO content.</h2>
          <p className="lead">Generate outline, draft, meta data, and version history from one place.</p>
        </div>
        <div className="heroCard">
          <h3>New article</h3>
          <div className="formGrid">
            <label>
              Workspace ID
              <input value={workspaceId} onChange={(event) => setWorkspaceId(event.target.value)} />
            </label>
            <label>
              Site name
              <input value={siteName} onChange={(event) => setSiteName(event.target.value)} />
            </label>
            <label>
              Site URL
              <input value={siteBaseUrl} onChange={(event) => setSiteBaseUrl(event.target.value)} />
            </label>
            <label>
              Tone
              <select value={tone} onChange={(event) => setTone(event.target.value)}>
                <option value="seo">SEO</option>
                <option value="sales">Sales</option>
                <option value="blog">Blog</option>
              </select>
            </label>
            <label>
              Title
              <input value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>
            <label>
              Primary keyword
              <input value={primaryKeyword} onChange={(event) => setPrimaryKeyword(event.target.value)} />
            </label>
          </div>
          {status ? <p className="statusText">{status}</p> : null}
          <div className="actions">
            <button type="button" onClick={loadSerpGap}>
              Load SERP gap
            </button>
            <button type="button" onClick={generateBrief}>
              Generate brief
            </button>
            <button type="button" onClick={runOneClickFlow}>
              Brief + generate
            </button>
            <button type="button" onClick={createArticle}>
              Generate
            </button>
          </div>
        </div>
      </section>

      {generated ? (
        <section className="panel">
          <h3>Generated</h3>
          <p>{generated.meta_title}</p>
          <p>{generated.meta_description}</p>
          <pre className="codeBlock">{generated.article_markdown}</pre>
        </section>
      ) : null}

      {brief ? (
        <section className="panel">
          <h3>Content brief</h3>
          <p className="lead">{brief.summary}</p>
          <div className="twoCols">
            <div className="stackItem">
              <strong>Content angle</strong>
              <span>{brief.content_angle}</span>
              <span>Difficulty: {brief.difficulty_label} ({brief.keyword_difficulty})</span>
            </div>
            <div className="stackItem">
              <strong>Meta title</strong>
              <span>{brief.meta_title_suggestion}</span>
              <span>Meta description: {brief.meta_description_suggestion}</span>
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
          <div className="twoCols">
            <div>
              <h4>Keywords</h4>
              <ul className="suggestions">
                {brief.keywords.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Internal links</h4>
              <ul className="suggestions">
                {brief.internal_link_suggestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          {serpGap.length ? (
            <div>
              <h4>SERP gap inputs</h4>
              <ul className="suggestions">
                {serpGap.map((item, index) => (
                  <li key={`${item.topic ?? item.suggestion ?? index}`}>
                    {item.topic ?? item.suggestion ?? item.reason ?? "Gap item"}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="panel">
        <h3>Articles</h3>
        <div className="stackList">
          {articles.map((article) => (
            <article key={article.id} className="stackItem">
              <strong>{article.title}</strong>
              <span>{article.primary_keyword}</span>
              <span>{article.status}</span>
              <span>{article.published_url ?? "Draft"}</span>
              <Link className="inlineLink" href={`/articles/${article.id}`}>
                Open detail
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
