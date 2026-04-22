# Data Schema and API Surface

## 1. Principles

- Multi-tenant by default
- Every content entity is versioned
- Heavy AI and crawl work runs through jobs
- Publish actions are explicit and auditable
- Refresh never overwrites the last approved version directly

## 2. Core Data Model

### 2.1 User
- `id`
- `workspace_id`
- `email`
- `name`
- `role`
- `status`
- `created_at`
- `updated_at`

### 2.2 Workspace
- `id`
- `name`
- `plan`
- `settings_json`
- `created_at`
- `updated_at`

### 2.3 Project
- `id`
- `workspace_id`
- `name`
- `description`
- `created_at`
- `updated_at`

### 2.4 Site
- `id`
- `project_id`
- `base_url`
- `cms_type`
- `locale`
- `brand_voice_json`
- `created_at`
- `updated_at`

### 2.5 Article
- `id`
- `site_id`
- `title`
- `slug`
- `status`
- `primary_keyword`
- `search_intent`
- `tone`
- `target_length`
- `current_version_id`
- `published_url`
- `created_at`
- `updated_at`

### 2.6 ArticleVersion
- `id`
- `article_id`
- `version_number`
- `content_html`
- `content_json`
- `outline_json`
- `notes`
- `created_by`
- `created_at`

### 2.7 Keyword
- `id`
- `site_id`
- `phrase`
- `locale`
- `intent`
- `difficulty`
- `priority`
- `created_at`
- `updated_at`

### 2.8 RankSnapshot
- `id`
- `keyword_id`
- `article_id`
- `rank`
- `url`
- `search_engine`
- `device`
- `captured_at`

### 2.9 SeoScore
- `id`
- `article_id`
- `version_id`
- `score`
- `breakdown_json`
- `issues_json`
- `captured_at`

### 2.10 SerpSnapshot
- `id`
- `keyword_id`
- `results_json`
- `captured_at`

### 2.11 InternalLinkSuggestion
- `id`
- `source_article_id`
- `target_article_id`
- `anchor_text`
- `reason`
- `confidence`
- `created_at`

### 2.12 ContentOpportunity
- `id`
- `site_id`
- `keyword`
- `intent`
- `difficulty`
- `impact_score`
- `effort_score`
- `status`
- `created_at`

### 2.13 Cluster
- `id`
- `site_id`
- `pillar_title`
- `pillar_keyword`
- `cluster_json`
- `created_at`

### 2.14 Plugin
- `id`
- `workspace_id`
- `name`
- `version`
- `manifest_json`
- `status`
- `created_at`
- `updated_at`

### 2.15 Job
- `id`
- `workspace_id`
- `type`
- `status`
- `payload_json`
- `result_json`
- `error_message`
- `run_after`
- `created_at`
- `updated_at`

### 2.16 Notification
- `id`
- `workspace_id`
- `user_id`
- `type`
- `title`
- `body`
- `read_at`
- `created_at`

### 2.17 AuditLog
- `id`
- `workspace_id`
- `actor_id`
- `entity_type`
- `entity_id`
- `action`
- `diff_json`
- `created_at`

## 3. Key Relationships

- `Workspace 1 -> N Project`
- `Project 1 -> N Site`
- `Site 1 -> N Article`
- `Article 1 -> N ArticleVersion`
- `Site 1 -> N Keyword`
- `Keyword 1 -> N RankSnapshot`
- `Article 1 -> N SeoScore`
- `Site 1 -> N ContentOpportunity`
- `Workspace 1 -> N Plugin`
- `Workspace 1 -> N Job`

## 4. API Surface

### 4.1 Auth and Account
- `POST /auth/login`
- `POST /auth/logout`
- `GET /me`
- `POST /users`
- `GET /users`
- `PATCH /users/:id`

### 4.2 Workspace and Projects
- `GET /workspaces`
- `POST /workspaces`
- `GET /projects`
- `POST /projects`
- `GET /sites`
- `POST /sites`
- `PATCH /sites/:id`

### 4.3 Articles
- `GET /articles`
- `POST /articles`
- `GET /articles/:id`
- `PATCH /articles/:id`
- `POST /articles/:id/outline`
- `POST /articles/:id/generate`
- `POST /articles/:id/refresh-draft`
- `POST /articles/:id/publish`
- `GET /articles/:id/versions`

### 4.4 SEO and Analysis
- `POST /articles/:id/seo-score`
- `GET /articles/:id/seo-scores`
- `POST /keywords`
- `GET /keywords`
- `POST /keywords/:id/track`
- `GET /keywords/:id/ranks`
- `POST /serp/analyze`
- `POST /content-opportunities`
- `GET /content-opportunities`

### 4.5 Linking and Clusters
- `POST /internal-links/suggest`
- `POST /internal-links/apply`
- `POST /clusters/generate`
- `GET /clusters`

### 4.6 Publishing and Indexing
- `POST /publish/jobs`
- `GET /jobs`
- `GET /jobs/:id`
- `POST /index/ping`

### 4.7 Dashboard and Notifications
- `GET /dashboard/summary`
- `GET /notifications`
- `PATCH /notifications/:id/read`

### 4.8 Plugins
- `GET /plugins`
- `POST /plugins`
- `PATCH /plugins/:id`
- `POST /plugins/:id/enable`
- `POST /plugins/:id/disable`

## 5. Main Request/Response Shapes

### 5.1 Article generate
Request:
```json
{
  "title": "string",
  "primaryKeyword": "string",
  "tone": "seo|sales|blog",
  "locale": "vi-VN",
  "targetLength": 1800
}
```

Response:
```json
{
  "articleId": "uuid",
  "outline": [],
  "keywords": [],
  "searchIntent": "informational",
  "draftVersionId": "uuid"
}
```

### 5.2 SEO score
Response:
```json
{
  "score": 82,
  "breakdown": {
    "keywords": 18,
    "headings": 20,
    "readability": 14,
    "links": 12,
    "length": 18
  },
  "issues": [
    "Missing H2 section",
    "Keyword density too low"
  ]
}
```

### 5.3 Rank snapshot
Response:
```json
{
  "keywordId": "uuid",
  "currentRank": 7,
  "delta": -3,
  "history": []
}
```

## 6. Job Types

- `outline_generation`
- `article_generation`
- `seo_scoring`
- `serp_analysis`
- `rank_tracking`
- `rank_decay_check`
- `refresh_generation`
- `internal_link_suggestion`
- `cluster_generation`
- `publish`
- `index_ping`

## 7. Error Handling

- Validation errors return 400
- Auth errors return 401
- Permission errors return 403
- Not found returns 404
- External provider failures return 502
- Job failures are stored in `Job.error_message`

