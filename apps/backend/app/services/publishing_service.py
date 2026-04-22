from __future__ import annotations

from sqlalchemy.orm import Session

from app.core.settings import Settings
from app.models import Job
from app.repositories.content_repository import ContentRepository
from app.repositories.organization_repository import OrganizationRepository
from app.core.queue import RedisQueue
from app.services.job_processor import JobProcessor


class PublishingService:
    def __init__(self, repository: ContentRepository, org_repository: OrganizationRepository, settings: Settings) -> None:
        self.repository = repository
        self.org_repository = org_repository
        self.settings = settings
        self.queue = RedisQueue()
        self.processor = JobProcessor(repository, org_repository)

    def enqueue_publish(self, db: Session, article_id: str, site_id: str | None, publish_url: str | None) -> Job:
        article = self.repository.get_article(db, article_id)
        if not article:
            raise ValueError("Article not found")
        job = Job(
            workspace_id=self._workspace_id_for_site(db, site_id or article.site_id),
            job_type="publish",
            status="queued",
            payload_json={
                "article_id": article_id,
                "site_id": site_id or article.site_id,
                "publish_url": publish_url or article.published_url,
            },
        )
        db.add(job)
        db.flush()
        db.commit()
        self.queue.enqueue(job.id, job.job_type)
        if not self.queue.available:
            self.processor.process(db, job)
        return job

    def enqueue_index_ping(self, db: Session, article_id: str, target_url: str | None) -> Job:
        article = self.repository.get_article(db, article_id)
        if not article:
            raise ValueError("Article not found")
        job = Job(
            workspace_id=self._workspace_id_for_site(db, article.site_id),
            job_type="index_ping",
            status="queued",
            payload_json={
                "article_id": article_id,
                "target_url": target_url or article.published_url,
            },
        )
        db.add(job)
        db.flush()
        db.commit()
        self.queue.enqueue(job.id, job.job_type)
        if not self.queue.available:
            self.processor.process(db, job)
        return job

    def list_jobs(self, db: Session) -> list[Job]:
        return db.query(Job).order_by(Job.created_at.desc()).all()

    def _workspace_id_for_site(self, db: Session, site_id: str) -> str | None:
        site = self.org_repository.get_site(db, site_id)
        return site.workspace_id if site else None
