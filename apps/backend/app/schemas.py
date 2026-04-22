from pydantic import BaseModel, Field


class ArticleCreateRequest(BaseModel):
    workspace_id: str | None = None
    title: str = Field(min_length=1)
    primary_keyword: str = Field(min_length=1)
    tone: str = "seo"
    locale: str = "vi-VN"
    target_length: int = 1800
    audience: str = "general"
    additional_keywords: list[str] = Field(default_factory=list)
    site_base_url: str = "https://example.com"
    site_name: str = "Example Site"
    brief_context: dict | None = None


class ArticleUpdateRequest(BaseModel):
    title: str | None = None
    primary_keyword: str | None = None
    tone: str | None = None
    target_length: int | None = None
    search_intent: str | None = None
    status: str | None = None
    published_url: str | None = None


class ArticleGenerateResponse(BaseModel):
    article_id: str
    article_slug: str
    site_id: str
    version_id: str
    outline: list[str]
    keywords: list[str]
    search_intent: str
    draft_version_id: str
    article_markdown: str
    meta_title: str
    meta_description: str
    seo_recommendations: list[str]


class ArticleVersionCreateRequest(BaseModel):
    content_markdown: str = Field(min_length=1)
    outline: list[str] = Field(default_factory=list)
    keywords: list[str] = Field(default_factory=list)
    meta_title: str = Field(min_length=1)
    meta_description: str = Field(min_length=1)
    notes: list[str] = Field(default_factory=list)
    created_by: str = "editor"


class ArticleVersionResponse(BaseModel):
    version_id: str
    version_number: int
    content_markdown: str
    outline: list[str]
    keywords: list[str]
    meta_title: str
    meta_description: str
    notes: list[str]
    created_by: str
    created_at: str | None = None
    seo_score: int | None = None
    seo_issues: list[str] = Field(default_factory=list)


class ArticleVersionSaveResponse(BaseModel):
    article_id: str
    version: ArticleVersionResponse


class ArticleDetailResponse(BaseModel):
    article: dict
    site: dict
    latest_version: dict | None = None
    versions: list[ArticleVersionResponse] = Field(default_factory=list)


class ArticleDiffRequest(BaseModel):
    left_version_id: str
    right_version_id: str


class ArticleDiffResponse(BaseModel):
    article_id: str
    left_version_id: str
    right_version_id: str
    summary: dict[str, int]
    changes: list[dict]


class SeoScoreResponse(BaseModel):
    score: int
    breakdown: dict[str, int]
    issues: list[str]
    suggestions: list[str]
    metrics: dict[str, float]
    heading_structure: list[str] = Field(default_factory=list)
    recommended_outline: list[str] = Field(default_factory=list)
    meta_title_suggestion: str = ""
    meta_description_suggestion: str = ""
    internal_link_suggestions: list[str] = Field(default_factory=list)
    content_summary: str = ""
    keyword_in_title: bool = False
    keyword_occurrences: int = 0
    first_keyword_position: int | None = None


class ContentAnalysisRequest(BaseModel):
    content: str = Field(min_length=1)
    primary_keyword: str = Field(min_length=1)
    title: str | None = None
    locale: str = "vi-VN"


class ContentRefreshRequest(BaseModel):
    content: str = Field(min_length=1)
    primary_keyword: str = Field(min_length=1)
    title: str | None = None
    competitor_notes: list[str] = Field(default_factory=list)
    serp_gap: list[dict] = Field(default_factory=list)


class ContentRefreshResponse(BaseModel):
    revised_markdown: str
    improvement_notes: list[str]
    before_score: int
    after_score: int


class ContentBriefRequest(BaseModel):
    keyword: str = Field(min_length=1)
    title: str | None = None
    audience: str = "general"
    tone: str = "seo"
    locale: str = "vi-VN"
    target_length: int = 1800
    serp_gap: list[dict] = Field(default_factory=list)
    competitor_notes: list[str] = Field(default_factory=list)
    keyword_difficulty: int | None = None


class ContentBriefResponse(BaseModel):
    keyword: str
    title: str
    search_intent: str
    content_angle: str
    target_length: int
    keyword_difficulty: int
    difficulty_label: str
    outline: list[str]
    keywords: list[str]
    questions: list[str]
    internal_link_suggestions: list[str]
    meta_title_suggestion: str
    meta_description_suggestion: str
    summary: str


class RankTrackRequest(BaseModel):
    article_id: str | None = None
    site_base_url: str = "https://example.com"
    site_name: str = "Example Site"
    keyword: str = Field(min_length=1)
    target_url: str | None = None
    locale: str = "vi-VN"
    device: str = "desktop"
    search_engine: str = "google"


class RankTrackResponse(BaseModel):
    keyword_id: str
    query: str
    current_rank: int | None
    previous_rank: int | None
    delta: int | None
    needs_update: bool
    top_results: list[dict]
    matched_url: str | None


class SerpAnalysisRequest(BaseModel):
    article_id: str | None = None
    site_base_url: str = "https://example.com"
    site_name: str = "Example Site"
    keyword: str = Field(min_length=1)
    target_url: str | None = None
    locale: str = "vi-VN"
    device: str = "desktop"
    search_engine: str = "google"


class SerpAnalysisResponse(BaseModel):
    keywordId: str
    query: str
    results: list[dict]
    contentGap: list[dict]


class RegisterWorkspaceRequest(BaseModel):
    name: str = Field(min_length=1)
    slug: str = Field(min_length=1)
    plan: str = "free"


class WorkspaceResponse(BaseModel):
    id: str
    name: str
    slug: str
    plan: str
    sites: list[dict] = Field(default_factory=list)


class WorkspaceMemberUpdateRequest(BaseModel):
    role: str = Field(min_length=1)


class SiteCreateRequest(BaseModel):
    workspace_id: str | None = None
    name: str = Field(min_length=1)
    base_url: str = Field(min_length=1)
    locale: str = "vi-VN"
    brand_voice_json: dict = Field(default_factory=dict)


class SiteUpdateRequest(BaseModel):
    name: str | None = None
    locale: str | None = None
    brand_voice_json: dict | None = None


class SiteResponse(BaseModel):
    id: str
    workspace_id: str | None
    name: str
    base_url: str
    locale: str
    brand_voice_json: dict


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    roles: list[dict] = Field(default_factory=list)


class LoginRequest(BaseModel):
    email: str = Field(min_length=1)
    password: str = Field(min_length=1)


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class PublishRequest(BaseModel):
    article_id: str = Field(min_length=1)
    site_id: str | None = None
    publish_url: str | None = None


class JobResponse(BaseModel):
    id: str
    job_type: str
    status: str
    payload_json: dict
    result_json: dict
    error_message: str | None
    created_at: str | None = None
    updated_at: str | None = None
    started_at: str | None = None
    finished_at: str | None = None


class PublishResponse(BaseModel):
    job: dict
    article: dict


class WorkspaceImportItem(BaseModel):
    name: str
    slug: str
    plan: str = "free"


class WorkspaceImportRequest(BaseModel):
    items: list[WorkspaceImportItem] = Field(default_factory=list)


class SiteImportItem(BaseModel):
    workspace_slug: str | None = None
    name: str
    base_url: str
    locale: str = "vi-VN"
    brand_voice_json: dict = Field(default_factory=dict)


class SiteImportRequest(BaseModel):
    items: list[SiteImportItem] = Field(default_factory=list)


class ArticleImportVersionItem(BaseModel):
    version_number: int
    content_markdown: str
    outline_json: list[str] = Field(default_factory=list)
    keywords_json: list[str] = Field(default_factory=list)
    meta_title: str
    meta_description: str
    notes_json: list[str] = Field(default_factory=list)
    created_by: str = "import"


class ArticleImportItem(BaseModel):
    workspace_slug: str | None = None
    site_base_url: str
    title: str
    slug: str
    status: str = "draft"
    primary_keyword: str
    search_intent: str = "informational"
    tone: str = "seo"
    target_length: int = 1800
    published_url: str | None = None
    versions: list[ArticleImportVersionItem] = Field(default_factory=list)


class ArticleImportRequest(BaseModel):
    items: list[ArticleImportItem] = Field(default_factory=list)


class WorkspaceExportResponse(BaseModel):
    items: list[dict]


class SiteExportResponse(BaseModel):
    items: list[dict]


class ArticleExportResponse(BaseModel):
    items: list[dict]
