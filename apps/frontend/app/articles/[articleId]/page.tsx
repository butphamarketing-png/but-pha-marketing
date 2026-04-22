"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { apiFetch } from "../../lib/api";

type Version = {
  version_id: string;
  version_number: number;
  content_markdown: string;
  outline: string[];
  keywords: string[];
  meta_title: string;
  meta_description: string;
  notes: string[];
  created_by: string;
  created_at: string | null;
  seo_score: number | null;
  seo_issues: string[];
};

type ArticleDetail = {
  article: {
    id: string;
    site_id: string;
    title: string;
    slug: string;
    status: string;
    primary_keyword: string;
    search_intent: string;
    tone: string;
    target_length: number;
    published_url: string | null;
    current_version_id: string | null;
  };
  site: {
    id: string;
    name: string;
    base_url: string;
    locale: string;
  };
  latest_version: Version | null;
  versions: Version[];
};

type DiffResponse = {
  article_id: string;
  left_version_id: string;
  right_version_id: string;
  summary: {
    insertions: number;
    deletions: number;
    replacements: number;
    equal_lines: number;
  };
  changes: Array<{
    type: string;
    left: string;
    right: string;
    left_range: number[];
    right_range: number[];
  }>;
};

type DiffExportResponse = {
  format: string;
  filename: string;
  mimeType: string;
  content: string;
};

function splitLines(text: string) {
  return text ? text.split(/\r?\n/) : [];
}

export default function ArticleDetailPage() {
  const params = useParams() as { articleId?: string | string[] };
  const articleId = Array.isArray(params.articleId) ? params.articleId[0] : params.articleId;
  const [detail, setDetail] = useState<ArticleDetail | null>(null);
  const [leftVersionId, setLeftVersionId] = useState("");
  const [rightVersionId, setRightVersionId] = useState("");
  const [diff, setDiff] = useState<DiffResponse | null>(null);
  const [message, setMessage] = useState("");
  const [showDebugJson, setShowDebugJson] = useState(false);
  const [showAllDiffs, setShowAllDiffs] = useState(false);
  const [exportPreview, setExportPreview] = useState<DiffExportResponse | null>(null);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorPrimaryKeyword, setEditorPrimaryKeyword] = useState("");
  const [editorTone, setEditorTone] = useState("seo");
  const [editorTargetLength, setEditorTargetLength] = useState(1800);
  const [editorContent, setEditorContent] = useState("");
  const [editorMetaTitle, setEditorMetaTitle] = useState("");
  const [editorMetaDescription, setEditorMetaDescription] = useState("");
  const [editorOutlineText, setEditorOutlineText] = useState("");
  const [editorKeywordsText, setEditorKeywordsText] = useState("");
  const [editorNotesText, setEditorNotesText] = useState("");
  const [editorStatus, setEditorStatus] = useState("");

  useEffect(() => {
    if (articleId) {
      loadDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  if (!articleId) {
    return (
      <main className="pageStack">
        <section className="panel">
          <h3>Missing article id</h3>
        </section>
      </main>
    );
  }

  async function loadDetail() {
    setMessage("");
    try {
      const response = await apiFetch(`/articles/${articleId}`);
      const data = (await response.json()) as ArticleDetail;
      setDetail(data);
      const currentVersion = data.latest_version ?? data.versions[0] ?? null;
      setEditorTitle(data.article.title);
      setEditorPrimaryKeyword(data.article.primary_keyword);
      setEditorTone(data.article.tone);
      setEditorTargetLength(data.article.target_length);
      setEditorContent(currentVersion?.content_markdown ?? "");
      setEditorMetaTitle(currentVersion?.meta_title ?? data.article.title);
      setEditorMetaDescription(currentVersion?.meta_description ?? "");
      setEditorOutlineText((currentVersion?.outline ?? []).join("\n"));
      setEditorKeywordsText((currentVersion?.keywords ?? []).join(", "));
      setEditorNotesText((currentVersion?.notes ?? []).join("\n"));
      setEditorStatus("");
      const versions = data.versions ?? [];
      const latest = versions[0]?.version_id ?? "";
      const previous = versions[1]?.version_id ?? latest;
      setRightVersionId(latest);
      setLeftVersionId(previous || latest);
      setDiff(null);
      setShowAllDiffs(false);
    } catch {
      setDetail(null);
      setMessage("Khong tai duoc article detail.");
    }
  }

  const versionOptions = useMemo(() => detail?.versions ?? [], [detail]);
  const visibleChanges = useMemo(() => {
    if (!diff) {
      return [];
    }
    return showAllDiffs ? diff.changes : diff.changes.slice(0, 6);
  }, [diff, showAllDiffs]);

  async function saveArticleMetadata() {
    if (!articleId) {
      return;
    }
    try {
      setEditorStatus("Saving article metadata...");
      await apiFetch(`/articles/${articleId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: editorTitle,
          primary_keyword: editorPrimaryKeyword,
          tone: editorTone,
          target_length: editorTargetLength,
        }),
      });
      setEditorStatus("Article metadata saved");
      await loadDetail();
    } catch {
      setEditorStatus("Failed to save article metadata");
    }
  }

  async function saveNewVersion() {
    if (!articleId) {
      return;
    }
    try {
      setEditorStatus("Saving new version...");
      const response = await apiFetch(`/articles/${articleId}/versions`, {
        method: "POST",
        body: JSON.stringify({
          content_markdown: editorContent,
          outline: editorOutlineText
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean),
          keywords: editorKeywordsText
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          meta_title: editorMetaTitle,
          meta_description: editorMetaDescription,
          notes: editorNotesText
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean),
          created_by: "editor",
        }),
      });
      const data = (await response.json()) as { version: Record<string, unknown> };
      setEditorStatus(`Saved version ${String(data.version?.version_number ?? "")}`);
      await loadDetail();
    } catch {
      setEditorStatus("Failed to save new version");
    }
  }

  async function exportDiff(format: "markdown" | "html") {
    if (!leftVersionId || !rightVersionId) {
      return;
    }
    try {
      const response = await apiFetch(
        `/articles/${articleId}/version-diff/export?left_version_id=${encodeURIComponent(leftVersionId)}&right_version_id=${encodeURIComponent(rightVersionId)}&format=${format}`,
      );
      const data = (await response.json()) as DiffExportResponse;
      setExportPreview(data);
      const blob = new Blob([data.content], { type: data.mimeType });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = data.filename;
      anchor.click();
      window.URL.revokeObjectURL(url);
    } catch {
      setExportPreview(null);
    }
  }

  async function loadDiff() {
    if (!leftVersionId || !rightVersionId) {
      return;
    }
    try {
      const response = await apiFetch(`/articles/${articleId}/version-diff`, {
        method: "POST",
        body: JSON.stringify({
          left_version_id: leftVersionId,
          right_version_id: rightVersionId,
        }),
      });
      setDiff((await response.json()) as DiffResponse);
    } catch {
      setDiff(null);
    }
  }

  return (
    <main className="pageStack">
      <section className="hero">
        <div>
          <p className="eyebrow">Article detail</p>
          <h2>Detail, versions, and diff viewer.</h2>
          <p className="lead">Xem full metadata, danh sach version, va so sanh thay doi giua hai ban.</p>
        </div>
        <div className="heroCard">
          <h3>Current article</h3>
          {detail?.article ? (
            <div className="stackList">
              <div className="stackItem">
                <strong>{detail.article.title}</strong>
                <span>{detail.article.primary_keyword}</span>
                <span>{detail.article.status}</span>
                <span>{detail.site?.base_url}</span>
              </div>
            </div>
          ) : (
            <p>{message || "Dang tai..."}</p>
          )}
          <div className="actions">
            <button type="button" onClick={loadDetail}>
              Reload
            </button>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="actions">
          <h3>Editor</h3>
          <button type="button" onClick={saveArticleMetadata}>
            Save article metadata
          </button>
          <button type="button" onClick={saveNewVersion}>
            Save new version
          </button>
        </div>
        {editorStatus ? <p className="statusText">{editorStatus}</p> : null}
        <div className="formGrid">
          <label>
            Article title
            <input value={editorTitle} onChange={(event) => setEditorTitle(event.target.value)} />
          </label>
          <label>
            Primary keyword
            <input value={editorPrimaryKeyword} onChange={(event) => setEditorPrimaryKeyword(event.target.value)} />
          </label>
          <label>
            Tone
            <select value={editorTone} onChange={(event) => setEditorTone(event.target.value)}>
              <option value="seo">SEO</option>
              <option value="sales">Sales</option>
              <option value="blog">Blog</option>
            </select>
          </label>
          <label>
            Target length
            <input
              type="number"
              value={editorTargetLength}
              onChange={(event) => setEditorTargetLength(Number(event.target.value))}
            />
          </label>
          <label className="textareaLabel">
            Meta title
            <input value={editorMetaTitle} onChange={(event) => setEditorMetaTitle(event.target.value)} />
          </label>
          <label className="textareaLabel">
            Meta description
            <input value={editorMetaDescription} onChange={(event) => setEditorMetaDescription(event.target.value)} />
          </label>
        </div>
        <div className="twoCols">
          <label className="textareaLabel">
            Outline
            <textarea value={editorOutlineText} onChange={(event) => setEditorOutlineText(event.target.value)} />
          </label>
          <label className="textareaLabel">
            Keywords
            <textarea value={editorKeywordsText} onChange={(event) => setEditorKeywordsText(event.target.value)} />
          </label>
        </div>
        <label className="textareaLabel">
          Notes
          <textarea value={editorNotesText} onChange={(event) => setEditorNotesText(event.target.value)} />
        </label>
        <label className="textareaLabel">
          Content
          <textarea value={editorContent} onChange={(event) => setEditorContent(event.target.value)} />
        </label>
      </section>

      <section className="panel">
        <h3>Version compare</h3>
        <div className="formGrid">
          <label>
            Left version
            <select value={leftVersionId} onChange={(event) => setLeftVersionId(event.target.value)}>
              {versionOptions.map((version) => (
                <option key={version.version_id} value={version.version_id}>
                  v{version.version_number} - {version.meta_title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Right version
            <select value={rightVersionId} onChange={(event) => setRightVersionId(event.target.value)}>
              {versionOptions.map((version) => (
                <option key={version.version_id} value={version.version_id}>
                  v{version.version_number} - {version.meta_title}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="actions">
          <button type="button" onClick={loadDiff}>
            Compare versions
          </button>
          <button type="button" onClick={() => exportDiff("markdown")}>
            Export Markdown
          </button>
          <button type="button" onClick={() => exportDiff("html")}>
            Export HTML
          </button>
        </div>
        {diff ? (
          <div className="resultBlock">
            <div className="miniStats">
              <div className="card">
                <span>Insertions</span>
                <strong>{diff.summary.insertions}</strong>
              </div>
              <div className="card">
                <span>Deletions</span>
                <strong>{diff.summary.deletions}</strong>
              </div>
              <div className="card">
                <span>Replacements</span>
                <strong>{diff.summary.replacements}</strong>
              </div>
              <div className="card">
                <span>Equal lines</span>
                <strong>{diff.summary.equal_lines}</strong>
              </div>
            </div>
            <div className="stackList">
              {visibleChanges.map((change, index) => (
                <article key={`${change.type}-${index}`} className="stackItem">
                  <strong>{change.type}</strong>
                  <span>
                    Left {change.left_range[0]}-{change.left_range[1]} | Right {change.right_range[0]}-
                    {change.right_range[1]}
                  </span>
                  <div className="diffGrid">
                    <div className="diffSide">
                      {splitLines(change.left || "").map((line, lineIndex) => (
                        <div
                          key={`${index}-left-${lineIndex}`}
                          className={`diffLine ${change.type === "delete" || change.type === "replace" ? "diffLineDelete" : ""}`}
                        >
                          <span>{change.left_range[0] + lineIndex}</span>
                          <code>{line || " "}</code>
                        </div>
                      ))}
                      {!change.left ? <div className="diffLine diffLineEmpty">-</div> : null}
                    </div>
                    <div className="diffSide">
                      {splitLines(change.right || "").map((line, lineIndex) => (
                        <div
                          key={`${index}-right-${lineIndex}`}
                          className={`diffLine ${change.type === "insert" || change.type === "replace" ? "diffLineInsert" : ""}`}
                        >
                          <span>{change.right_range[0] + lineIndex}</span>
                          <code>{line || " "}</code>
                        </div>
                      ))}
                      {!change.right ? <div className="diffLine diffLineEmpty">-</div> : null}
                    </div>
                  </div>
                </article>
              ))}
              {!showAllDiffs && diff.changes.length > visibleChanges.length ? (
                <button type="button" className="stackButton" onClick={() => setShowAllDiffs(true)}>
                  Show remaining {diff.changes.length - visibleChanges.length} diff blocks
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>

      {exportPreview ? (
        <section className="panel">
          <h3>Diff export preview</h3>
          <p className="lead">
            {exportPreview.filename} · {exportPreview.mimeType}
          </p>
          <pre className="codeBlock">{exportPreview.content}</pre>
        </section>
      ) : null}

      <section className="panel">
        <h3>Version history</h3>
        <div className="stackList">
          {detail?.versions.map((version) => (
            <article key={version.version_id} className="stackItem">
              <strong>v{version.version_number}</strong>
              <span>{version.meta_title}</span>
              <span>{version.meta_description}</span>
              <span>{version.created_by}</span>
              <span>SEO score: {version.seo_score ?? "n/a"}</span>
              {version.seo_issues?.length ? <span>{version.seo_issues.join(" · ")}</span> : null}
            </article>
          )) ?? <p>No versions.</p>}
        </div>
      </section>

      <section className="panel">
        <div className="actions">
          <h3>Article JSON</h3>
          <button type="button" className="filterButton" onClick={() => setShowDebugJson((current) => !current)}>
            {showDebugJson ? "Hide debug JSON" : "Show debug JSON"}
          </button>
        </div>
        {showDebugJson ? <pre className="codeBlock">{JSON.stringify(detail, null, 2)}</pre> : <p className="lead">Debug JSON is hidden by default to keep the page fast.</p>}
      </section>
    </main>
  );
}


