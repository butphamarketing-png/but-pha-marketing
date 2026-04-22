from __future__ import annotations

import difflib
from urllib.parse import urlparse

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.settings import get_settings
from app.core.security import get_current_user
from app.models import Article, Job, RankSnapshot, User
from app.repositories.content_repository import ContentRepository
from app.repositories.organization_repository import OrganizationRepository
from app.schemas import (
    ArticleCreateRequest,
    ArticleDiffRequest,
    ArticleDiffResponse,
    ArticleDetailResponse,
    ArticleGenerateResponse,
    ArticleImportRequest,
    ArticleUpdateRequest,
    ArticleVersionCreateRequest,
    ArticleVersionSaveResponse,
    ContentAnalysisRequest,
    ContentBriefRequest,
    ContentBriefResponse,
    ContentRefreshRequest,
    ContentRefreshResponse,
    ArticleVersionResponse,
    ArticleExportResponse,
    JobResponse,
    LoginRequest,
    LoginResponse,
    PublishRequest,
    PublishResponse,
    RankTrackRequest,
    RankTrackResponse,
    RegisterWorkspaceRequest,
    SerpAnalysisRequest,
    SerpAnalysisResponse,
    SeoScoreResponse,
    SiteExportResponse,
    SiteImportRequest,
    SiteCreateRequest,
    SiteResponse,
    SiteUpdateRequest,
    WorkspaceExportResponse,
    WorkspaceImportRequest,
    WorkspaceMemberUpdateRequest,
    UserResponse,
    WorkspaceResponse,
)
from app.services.article_service import ArticleService
from app.services.auth_service import AuthService
from app.services.job_service import JobService
from app.services.publishing_service import PublishingService
from app.services.rank_service import RankService
from app.services.serp_provider import SerpProvider
from app.services.serp_service import SerpService
from app.services.seo_service import SeoService


router = APIRouter()
settings = get_settings()
content_repository = ContentRepository()
organization_repository = OrganizationRepository()
article_service = ArticleService()
seo_service = SeoService()
auth_service = AuthService(settings, organization_repository)
serp_provider = SerpProvider(settings)
rank_service = RankService(serp_provider, content_repository)
serp_service = SerpService(serp_provider, content_repository)
job_service = JobService()
publishing_service = PublishingService(content_repository, organization_repository, settings)


def _user_response(user: User) -> UserResponse:
    return UserResponse(
        id=user.id,
        email=user.email,
        name=user.name,
        roles=[{"workspace_id": membership.workspace_id, "role": membership.role} for membership in user.memberships],
    )


def _workspace_response(workspace) -> WorkspaceResponse:
    return WorkspaceResponse(
        id=workspace.id,
        name=workspace.name,
        slug=workspace.slug,
        plan=workspace.plan,
        sites=[
            {
                "id": site.id,
                "workspace_id": site.workspace_id,
                "name": site.name,
                "base_url": site.base_url,
                "locale": site.locale,
            }
            for site in workspace.sites
        ],
    )


def _site_response(site) -> SiteResponse:
    return SiteResponse(
        id=site.id,
        workspace_id=site.workspace_id,
        name=site.name,
        base_url=site.base_url,
        locale=site.locale,
        brand_voice_json=site.brand_voice_json or {},
    )


def _job_response(job: Job) -> JobResponse:
    return JobResponse(
        id=job.id,
        job_type=job.job_type,
        status=job.status,
        payload_json=job.payload_json or {},
        result_json=job.result_json or {},
        error_message=job.error_message,
        created_at=job.created_at.isoformat() if job.created_at else None,
        updated_at=job.updated_at.isoformat() if job.updated_at else None,
        started_at=job.started_at.isoformat() if job.started_at else None,
        finished_at=job.finished_at.isoformat() if job.finished_at else None,
    )


def _article_summary(article: Article) -> dict:
    return {
        "id": article.id,
        "site_id": article.site_id,
        "title": article.title,
        "slug": article.slug,
        "status": article.status,
        "primary_keyword": article.primary_keyword,
        "search_intent": article.search_intent,
        "tone": article.tone,
        "target_length": article.target_length,
        "published_url": article.published_url,
        "current_version_id": article.current_version_id,
        "created_at": article.created_at.isoformat() if article.created_at else None,
        "updated_at": article.updated_at.isoformat() if article.updated_at else None,
    }


def _site_summary(site) -> dict:
    return {
        "id": site.id,
        "workspace_id": site.workspace_id,
        "name": site.name,
        "base_url": site.base_url,
        "locale": site.locale,
        "brand_voice_json": site.brand_voice_json or {},
        "created_at": site.created_at.isoformat() if site.created_at else None,
        "updated_at": site.updated_at.isoformat() if site.updated_at else None,
    }


def _version_summary(version) -> ArticleVersionResponse:
    seo_analysis = seo_service.content_ai.analyze_content(
        content=version.content_markdown,
        primary_keyword=version.article.primary_keyword if version.article else "",
        title=version.article.title if version.article else None,
    )
    return ArticleVersionResponse(
        version_id=version.id,
        version_number=version.version_number,
        content_markdown=version.content_markdown,
        outline=version.outline_json or [],
        keywords=version.keywords_json or [],
        meta_title=version.meta_title,
        meta_description=version.meta_description,
        notes=version.notes_json or [],
        created_by=version.created_by,
        created_at=version.created_at.isoformat() if version.created_at else None,
        seo_score=seo_analysis["score"],
        seo_issues=seo_analysis["issues"],
    )


def _compare_versions(left_content: str, right_content: str) -> tuple[list[dict], dict[str, int]]:
    left_lines = left_content.splitlines()
    right_lines = right_content.splitlines()
    matcher = difflib.SequenceMatcher(a=left_lines, b=right_lines)
    changes: list[dict] = []
    summary = {"insertions": 0, "deletions": 0, "replacements": 0, "equal_lines": 0}
    for tag, left_start, left_end, right_start, right_end in matcher.get_opcodes():
        if tag == "equal":
            summary["equal_lines"] += left_end - left_start
            continue
        if tag == "insert":
            summary["insertions"] += right_end - right_start
        elif tag == "delete":
            summary["deletions"] += left_end - left_start
        elif tag == "replace":
            summary["replacements"] += max(left_end - left_start, right_end - right_start)
        changes.append(
            {
                "type": tag,
                "left": "\n".join(left_lines[left_start:left_end]),
                "right": "\n".join(right_lines[right_start:right_end]),
                "left_range": [left_start + 1, left_end],
                "right_range": [right_start + 1, right_end],
            }
        )
    return changes, summary


def _render_diff_markdown(article_title: str, changes: list[dict]) -> str:
    lines = [f"# Diff report for {article_title}", ""]
    for change in changes:
        lines.append(f"## {change['type']}")
        left = change.get("left", "").strip()
        right = change.get("right", "").strip()
        if left:
            lines.append("```diff")
            lines.append(f"- {left}")
            lines.append("```")
        if right:
            lines.append("```diff")
            lines.append(f"+ {right}")
            lines.append("```")
        lines.append("")
    return "\n".join(lines).strip() + "\n"


def _render_diff_html(article_title: str, changes: list[dict]) -> str:
    def esc(text: str) -> str:
        return (
            text.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
        )

    blocks = [
        "<html><head><meta charset='utf-8'><style>"
        "body{font-family:ui-sans-serif,system-ui;padding:24px;background:#fbf7ef;color:#1f1a17;}"
        "h1,h2{margin:0 0 12px;}"
        ".block{border:1px solid #e6d9c9;border-radius:16px;background:#fffdf9;padding:16px;margin:12px 0;}"
        ".left{background:rgba(164,58,54,.08);padding:10px;border-radius:10px;white-space:pre-wrap;}"
        ".right{background:rgba(15,118,110,.08);padding:10px;border-radius:10px;white-space:pre-wrap;}"
        ".type{font-weight:700;margin-bottom:8px;display:block;}"
        "</style></head><body>",
        f"<h1>Diff report for {esc(article_title)}</h1>",
    ]
    for change in changes:
        blocks.append("<div class='block'>")
        blocks.append(f"<span class='type'>{esc(str(change.get('type', 'change')))}</span>")
        if change.get("left"):
            blocks.append(f"<div class='left'>{esc(str(change.get('left')))}</div>")
        if change.get("right"):
            blocks.append(f"<div class='right'>{esc(str(change.get('right')))}</div>")
        blocks.append("</div>")
    blocks.append("</body></html>")
    return "".join(blocks)


def _get_workspace_role(user: User, workspace_id: str) -> str | None:
    for membership in user.memberships:
        if membership.workspace_id == workspace_id:
            return membership.role
    return None


def _require_workspace_admin(user: User, workspace_id: str) -> None:
    role = _get_workspace_role(user, workspace_id)
    if role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Workspace admin required")


def _require_workspace_editor(user: User, workspace_id: str) -> None:
    role = _get_workspace_role(user, workspace_id)
    if role not in {"admin", "editor"}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Workspace editor required")


@router.post("/auth/login", response_model=LoginResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> LoginResponse:
    try:
        result = auth_service.login(db, payload.email, payload.password)
    except PermissionError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(exc)) from exc
    user = organization_repository.get_user_by_email(db, payload.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return LoginResponse(
        access_token=result["access_token"],
        user=_user_response(user),
    )


@router.get("/me", response_model=UserResponse)
def me(current_user: User = Depends(get_current_user)) -> UserResponse:
    return _user_response(current_user)


@router.get("/workspaces", response_model=list[WorkspaceResponse])
def list_workspaces(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[WorkspaceResponse]:
    return [_workspace_response(workspace) for workspace in organization_repository.list_workspaces(db)]


@router.post("/workspaces", response_model=WorkspaceResponse)
def create_workspace(
    payload: RegisterWorkspaceRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> WorkspaceResponse:
    workspace = organization_repository.create_workspace(db, payload.name, payload.slug, payload.plan)
    organization_repository.add_member(db, workspace.id, current_user.id, "admin")
    db.commit()
    return _workspace_response(workspace)


@router.get("/workspaces/{workspace_id}/members")
def list_workspace_members(
    workspace_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict:
    _require_workspace_admin(current_user, workspace_id)
    members = organization_repository.list_members(db, workspace_id)
    return {
        "workspaceId": workspace_id,
        "members": [
            {
                "user_id": member.user_id,
                "role": member.role,
                "email": member.user.email if member.user else None,
                "name": member.user.name if member.user else None,
            }
            for member in members
        ],
    }


@router.patch("/workspaces/{workspace_id}/members/{user_id}")
def update_workspace_member_role(
    workspace_id: str,
    user_id: str,
    payload: WorkspaceMemberUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict:
    _require_workspace_admin(current_user, workspace_id)
    member = organization_repository.update_member_role(db, workspace_id, user_id, payload.role)
    if not member:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Member not found")
    db.commit()
    return {
        "workspaceId": workspace_id,
        "userId": user_id,
        "role": member.role,
    }


@router.get("/sites", response_model=list[SiteResponse])
def list_sites(
    workspace_id: str | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[SiteResponse]:
    return [_site_response(site) for site in organization_repository.list_sites(db, workspace_id)]


@router.post("/sites", response_model=SiteResponse)
def create_site(
    payload: SiteCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> SiteResponse:
    if not payload.workspace_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="workspace_id is required")
    _require_workspace_admin(current_user, payload.workspace_id)
    site = organization_repository.create_site(
        db,
        payload.workspace_id,
        payload.name,
        payload.base_url,
        payload.locale,
        payload.brand_voice_json,
    )
    db.commit()
    return _site_response(site)


@router.patch("/sites/{site_id}", response_model=SiteResponse)
def update_site(
    site_id: str,
    payload: SiteUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> SiteResponse:
    site = organization_repository.get_site(db, site_id)
    if not site:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Site not found")
    if site.workspace_id:
        _require_workspace_admin(current_user, site.workspace_id)
    organization_repository.update_site(db, site, payload.name, payload.locale, payload.brand_voice_json)
    db.commit()
    return _site_response(site)


@router.post("/articles", response_model=ArticleGenerateResponse)
def create_article(payload: ArticleCreateRequest, db: Session = Depends(get_db)) -> ArticleGenerateResponse:
    return article_service.create_article(db, payload)


@router.patch("/articles/{article_id}")
def update_article(
    article_id: str,
    payload: ArticleUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict:
    article = content_repository.get_article(db, article_id)
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    if article.site.workspace_id:
        _require_workspace_editor(current_user, article.site.workspace_id)
    content_repository.update_article(
        article,
        title=payload.title,
        primary_keyword=payload.primary_keyword,
        tone=payload.tone,
        target_length=payload.target_length,
        search_intent=payload.search_intent,
        status=payload.status,
        published_url=payload.published_url,
    )
    db.commit()
    return _article_summary(article)


@router.get("/articles")
def list_articles(db: Session = Depends(get_db)) -> dict:
    articles = db.query(Article).order_by(Article.created_at.desc()).all()
    return {
        "articles": [_article_summary(article) for article in articles]
    }


@router.get("/articles/{article_id}", response_model=ArticleDetailResponse)
def get_article_detail(article_id: str, db: Session = Depends(get_db)) -> ArticleDetailResponse:
    article = content_repository.get_article(db, article_id)
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    site = article.site
    latest_version = content_repository.get_latest_version(db, article_id)
    versions = content_repository.list_versions(db, article_id)
    return ArticleDetailResponse(
        article=_article_summary(article),
        site=_site_summary(site) if site else {},
        latest_version=_version_summary(latest_version).model_dump() if latest_version else None,
        versions=[_version_summary(version) for version in versions],
    )


@router.post("/articles/{article_id}/generate-outline")
def generate_outline(article_id: str) -> dict:
    return article_service.generate_outline(article_id)


@router.post("/articles/{article_id}/generate-draft")
def generate_draft(article_id: str) -> dict:
    return article_service.generate_draft(article_id)


@router.post("/articles/{article_id}/versions", response_model=ArticleVersionSaveResponse)
def save_article_version(
    article_id: str,
    payload: ArticleVersionCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ArticleVersionSaveResponse:
    article = content_repository.get_article(db, article_id)
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    if article.site.workspace_id:
        _require_workspace_editor(current_user, article.site.workspace_id)
    version = content_repository.create_version(
        db=db,
        article=article,
        content_markdown=payload.content_markdown,
        outline_json=payload.outline,
        keywords_json=payload.keywords,
        meta_title=payload.meta_title,
        meta_description=payload.meta_description,
        notes_json=payload.notes,
        created_by=payload.created_by,
    )
    db.commit()
    return ArticleVersionSaveResponse(article_id=article_id, version=_version_summary(version))


@router.post("/articles/{article_id}/seo-score", response_model=SeoScoreResponse)
def calculate_seo_score(article_id: str, db: Session = Depends(get_db)) -> SeoScoreResponse:
    return seo_service.calculate(db, article_id)


@router.post("/seo/analyze-content", response_model=SeoScoreResponse)
def analyze_content(payload: ContentAnalysisRequest) -> SeoScoreResponse:
    return seo_service.analyze_content(payload)


@router.post("/seo/generate-brief", response_model=ContentBriefResponse)
def generate_brief(payload: ContentBriefRequest) -> ContentBriefResponse:
    return seo_service.generate_brief(payload)


@router.post("/seo/refresh-draft", response_model=ContentRefreshResponse)
def refresh_draft(payload: ContentRefreshRequest) -> ContentRefreshResponse:
    return ContentRefreshResponse(**seo_service.refresh_draft(payload))


@router.post("/rank/track", response_model=RankTrackResponse)
def track_rank(payload: RankTrackRequest, db: Session = Depends(get_db)) -> RankTrackResponse:
    result = rank_service.track_keyword(
        db=db,
        site_base_url=payload.site_base_url,
        site_name=payload.site_name,
        keyword_phrase=payload.keyword,
        target_url=payload.target_url,
        article_id=payload.article_id,
        locale=payload.locale,
        device=payload.device,
        search_engine=payload.search_engine,
    )
    return RankTrackResponse(**result.__dict__)


@router.post("/serp/analyze", response_model=SerpAnalysisResponse)
def analyze_serp(payload: SerpAnalysisRequest, db: Session = Depends(get_db)) -> SerpAnalysisResponse:
    result = serp_service.analyze(
        db=db,
        site_base_url=payload.site_base_url,
        site_name=payload.site_name,
        keyword_phrase=payload.keyword,
        target_url=payload.target_url,
        article_id=payload.article_id,
        locale=payload.locale,
        device=payload.device,
        search_engine=payload.search_engine,
    )
    return SerpAnalysisResponse(**result)


@router.post("/publish/queue", response_model=PublishResponse)
def queue_publish(
    payload: PublishRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PublishResponse:
    article = content_repository.get_article(db, payload.article_id)
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    if article.site.workspace_id:
        _require_workspace_editor(current_user, article.site.workspace_id)
    try:
        job = publishing_service.enqueue_publish(db, payload.article_id, payload.site_id, payload.publish_url)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc
    return PublishResponse(
        job=_job_response(job).model_dump(),
        article={
            "id": article.id,
            "title": article.title,
            "status": article.status,
            "published_url": article.published_url,
            "current_version_id": article.current_version_id,
        },
    )


@router.post("/index/ping", response_model=PublishResponse)
def ping_index(
    payload: PublishRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PublishResponse:
    article = content_repository.get_article(db, payload.article_id)
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    if article.site.workspace_id:
        _require_workspace_editor(current_user, article.site.workspace_id)
    try:
        job = publishing_service.enqueue_index_ping(db, payload.article_id, payload.publish_url)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc
    return PublishResponse(
        job=_job_response(job).model_dump(),
        article={
            "id": article.id,
            "title": article.title,
            "status": article.status,
            "published_url": article.published_url,
            "current_version_id": article.current_version_id,
        },
    )


@router.get("/jobs", response_model=list[JobResponse])
def list_jobs(db: Session = Depends(get_db)) -> list[JobResponse]:
    return [_job_response(job) for job in job_service.list_jobs(db)]


@router.get("/exports/workspaces", response_model=WorkspaceExportResponse)
def export_workspaces(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> WorkspaceExportResponse:
    workspaces = organization_repository.list_workspaces(db)
    items = [
        {
            "id": workspace.id,
            "name": workspace.name,
            "slug": workspace.slug,
            "plan": workspace.plan,
            "site_count": len(workspace.sites),
            "member_count": len(workspace.members),
        }
        for workspace in workspaces
    ]
    return WorkspaceExportResponse(items=items)


@router.post("/imports/workspaces")
def import_workspaces(
    payload: WorkspaceImportRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict:
    imported = 0
    for item in payload.items:
        organization_repository.create_workspace(db, item.name, item.slug, item.plan)
        imported += 1
    db.commit()
    return {"imported": imported, "type": "workspaces"}


@router.get("/exports/sites", response_model=SiteExportResponse)
def export_sites(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> SiteExportResponse:
    sites = organization_repository.list_sites(db)
    return SiteExportResponse(
        items=[
            {
                "id": site.id,
                "workspace_id": site.workspace_id,
                "workspace_slug": site.workspace.slug if site.workspace else None,
                "name": site.name,
                "base_url": site.base_url,
                "locale": site.locale,
                "brand_voice_json": site.brand_voice_json or {},
            }
            for site in sites
        ]
    )


@router.post("/imports/sites")
def import_sites(
    payload: SiteImportRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict:
    imported = 0
    for item in payload.items:
        workspace_id = None
        if item.workspace_slug:
            workspace = organization_repository.get_workspace_by_slug(db, item.workspace_slug)
            if workspace:
                workspace_id = workspace.id
        organization_repository.create_site(
            db,
            workspace_id,
            item.name,
            item.base_url,
            item.locale,
            item.brand_voice_json,
        )
        imported += 1
    db.commit()
    return {"imported": imported, "type": "sites"}


@router.get("/exports/articles", response_model=ArticleExportResponse)
def export_articles(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> ArticleExportResponse:
    articles = db.query(Article).order_by(Article.created_at.desc()).all()
    items = []
    for article in articles:
        versions = content_repository.list_versions(db, article.id)
        items.append(
            {
                "id": article.id,
                "site_id": article.site_id,
                "site_base_url": article.site.base_url if article.site else None,
                "workspace_id": article.site.workspace_id if article.site else None,
                "workspace_slug": article.site.workspace.slug if article.site and article.site.workspace else None,
                "title": article.title,
                "slug": article.slug,
                "status": article.status,
                "primary_keyword": article.primary_keyword,
                "search_intent": article.search_intent,
                "tone": article.tone,
                "target_length": article.target_length,
                "published_url": article.published_url,
                "current_version_id": article.current_version_id,
                "versions": [
                    {
                        "version_id": version.id,
                        "version_number": version.version_number,
                        "content_markdown": version.content_markdown,
                        "outline_json": version.outline_json or [],
                        "keywords_json": version.keywords_json or [],
                        "meta_title": version.meta_title,
                        "meta_description": version.meta_description,
                        "notes_json": version.notes_json or [],
                        "created_by": version.created_by,
                        "created_at": version.created_at.isoformat() if version.created_at else None,
                    }
                    for version in versions
                ],
            }
        )
    return ArticleExportResponse(items=items)


@router.post("/imports/articles")
def import_articles(
    payload: ArticleImportRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict:
    imported_articles = 0
    imported_versions = 0
    for item in payload.items:
        workspace_id = None
        if item.workspace_slug:
            workspace = organization_repository.get_workspace_by_slug(db, item.workspace_slug)
            if workspace:
                workspace_id = workspace.id
        site = organization_repository.get_site_by_base_url(db, item.site_base_url)
        if site:
            site.name = site.name or item.site_base_url
            if workspace_id is not None:
                site.workspace_id = workspace_id
        else:
            site_name = urlparse(item.site_base_url).netloc or item.site_base_url
            site = organization_repository.create_site(
                db,
                workspace_id,
                site_name,
                item.site_base_url,
                "vi-VN",
                {},
            )
        article = db.query(Article).filter(Article.site_id == site.id, Article.slug == item.slug).first()
        if article:
            article.title = item.title
            article.status = item.status
            article.primary_keyword = item.primary_keyword
            article.search_intent = item.search_intent
            article.tone = item.tone
            article.target_length = item.target_length
            article.published_url = item.published_url
        else:
            article = content_repository.create_article(
                db,
                site=site,
                title=item.title,
                primary_keyword=item.primary_keyword,
                search_intent=item.search_intent,
                tone=item.tone,
                target_length=item.target_length,
                published_url=item.published_url,
            )
            article.slug = item.slug
        imported_articles += 1
        for version_item in sorted(item.versions, key=lambda version: version.version_number):
            existing_version = content_repository.get_version_by_number(db, article.id, version_item.version_number)
            if existing_version:
                continue
            content_repository.create_version(
                db,
                article=article,
                content_markdown=version_item.content_markdown,
                outline_json=version_item.outline_json,
                keywords_json=version_item.keywords_json,
                meta_title=version_item.meta_title,
                meta_description=version_item.meta_description,
                notes_json=version_item.notes_json,
                created_by=version_item.created_by,
            )
            imported_versions += 1
    db.commit()
    return {
        "imported_articles": imported_articles,
        "imported_versions": imported_versions,
        "type": "articles",
    }


@router.get("/articles/{article_id}/versions")
def list_article_versions(article_id: str, db: Session = Depends(get_db)) -> dict:
    versions = content_repository.list_versions(db, article_id)
    return {
        "articleId": article_id,
        "versions": [
            {
                "versionId": version.id,
                "versionNumber": version.version_number,
                "metaTitle": version.meta_title,
                "metaDescription": version.meta_description,
                "createdAt": version.created_at.isoformat() if version.created_at else None,
            }
            for version in versions
        ],
    }


@router.get("/articles/{article_id}/versions/{version_id}")
def get_article_version(article_id: str, version_id: str, db: Session = Depends(get_db)) -> dict:
    version = content_repository.get_version(db, version_id)
    if not version or version.article_id != article_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Version not found")
    return _version_summary(version).model_dump()


@router.post("/articles/{article_id}/version-diff", response_model=ArticleDiffResponse)
def compare_article_versions(article_id: str, payload: ArticleDiffRequest, db: Session = Depends(get_db)) -> ArticleDiffResponse:
    left_version = content_repository.get_version(db, payload.left_version_id)
    right_version = content_repository.get_version(db, payload.right_version_id)
    if not left_version or left_version.article_id != article_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Left version not found")
    if not right_version or right_version.article_id != article_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Right version not found")
    changes, summary = _compare_versions(left_version.content_markdown, right_version.content_markdown)
    return ArticleDiffResponse(
        article_id=article_id,
        left_version_id=left_version.id,
        right_version_id=right_version.id,
        summary=summary,
        changes=changes,
    )


@router.get("/articles/{article_id}/version-diff/export")
def export_article_version_diff(
    article_id: str,
    left_version_id: str,
    right_version_id: str,
    format: str = "markdown",
    db: Session = Depends(get_db),
) -> dict:
    left_version = content_repository.get_version(db, left_version_id)
    right_version = content_repository.get_version(db, right_version_id)
    if not left_version or left_version.article_id != article_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Left version not found")
    if not right_version or right_version.article_id != article_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Right version not found")
    changes, _summary = _compare_versions(left_version.content_markdown, right_version.content_markdown)
    article = content_repository.get_article(db, article_id)
    article_title = article.title if article else article_id
    safe_name = article.slug if article else article_id
    if format.lower() == "html":
        content = _render_diff_html(article_title, changes)
        return {
            "format": "html",
            "filename": f"{safe_name}-diff.html",
            "mimeType": "text/html",
            "content": content,
        }
    content = _render_diff_markdown(article_title, changes)
    return {
        "format": "markdown",
        "filename": f"{safe_name}-diff.md",
        "mimeType": "text/markdown",
        "content": content,
    }


@router.get("/dashboard/summary")
def dashboard_summary(db: Session = Depends(get_db)) -> dict:
    total_articles = db.query(Article).count()
    rank_down_alerts = db.query(RankSnapshot).filter(RankSnapshot.rank.is_not(None), RankSnapshot.rank > 10).count()
    average_score = 0
    articles = db.query(Article).limit(20).all()
    scores: list[int] = []
    for article in articles:
        version = content_repository.get_latest_version(db, article.id)
        if version:
            scores.append(
                seo_service.content_ai.analyze_content(
                    content=version.content_markdown,
                    primary_keyword=article.primary_keyword,
                    title=article.title,
                )["score"]
            )
    if scores:
        average_score = round(sum(scores) / len(scores))
    return {
        "totalArticles": total_articles,
        "needsRefresh": rank_down_alerts,
        "averageSeoScore": average_score,
        "rankDownAlerts": rank_down_alerts,
    }
