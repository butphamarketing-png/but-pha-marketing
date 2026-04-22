from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models import Article, Job
from app.repositories.content_repository import ContentRepository
from app.repositories.organization_repository import OrganizationRepository


class JobProcessor:
    def __init__(self, content_repository: ContentRepository, org_repository: OrganizationRepository) -> None:
        self.content_repository = content_repository
        self.org_repository = org_repository

    def process(self, db: Session, job: Job) -> None:
        if job.job_type == "publish":
            self._process_publish(db, job)
        elif job.job_type == "index_ping":
            self._process_index_ping(job)
        else:
            job.status = "failed"
            job.error_message = f"Unsupported job type: {job.job_type}"
            job.finished_at = datetime.now(timezone.utc)
        db.commit()

    def _process_publish(self, db: Session, job: Job) -> None:
        article_id = job.payload_json.get("article_id")
        article = self.content_repository.get_article(db, article_id)
        if not article:
            job.status = "failed"
            job.error_message = "Article not found"
            job.finished_at = datetime.now(timezone.utc)
            return
        job.status = "running"
        job.started_at = datetime.now(timezone.utc)
        current_version = self.content_repository.get_latest_version(db, article.id)
        article.status = "published"
        article.published_url = job.payload_json.get("publish_url") or article.published_url
        if current_version:
            article.current_version_id = current_version.id
        job.result_json = {
            "article_id": article.id,
            "published_url": article.published_url,
            "version_id": current_version.id if current_version else None,
        }
        job.status = "completed"
        job.finished_at = datetime.now(timezone.utc)

    def _process_index_ping(self, job: Job) -> None:
        job.status = "running"
        job.started_at = datetime.now(timezone.utc)
        job.result_json = {
            "submitted": True,
            "endpoint": "google-indexing-api-or-search-console",
            "message": "Index request queued",
        }
        job.status = "completed"
        job.finished_at = datetime.now(timezone.utc)
