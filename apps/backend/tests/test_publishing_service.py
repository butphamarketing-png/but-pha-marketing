from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import app.models  # noqa: F401
from app.core.database import Base
from app.core.settings import Settings
from app.repositories.content_repository import ContentRepository
from app.repositories.organization_repository import OrganizationRepository
from app.services.publishing_service import PublishingService


def test_publish_service_falls_back_without_redis():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()
    try:
        content_repo = ContentRepository()
        org_repo = OrganizationRepository()
        settings = Settings(default_site_base_url="https://example.com")
        workspace = org_repo.create_workspace(db, "Test Workspace", "test-workspace", "pro")
        site = org_repo.create_site(db, workspace.id, "Test Site", "https://test.example.com", "vi-VN", {})
        article = content_repo.create_article(
            db,
            site=site,
            title="Test Article",
            primary_keyword="test keyword",
            search_intent="informational",
            tone="seo",
            target_length=1200,
            published_url=None,
        )
        content_repo.create_version(
            db,
            article=article,
            content_markdown="# Test Article\n\nContent for testing.",
            outline_json=["H1: Test Article"],
            keywords_json=["test keyword"],
            meta_title="Test Article | test keyword",
            meta_description="Test description",
            notes_json=[],
        )
        db.commit()
        service = PublishingService(content_repo, org_repo, settings)
        service.queue.available = False
        job = service.enqueue_publish(db, article.id, site.id, "https://test.example.com/test-article")
        refreshed = db.get(type(article), article.id)
        assert job.status == "completed"
        assert refreshed is not None
        assert refreshed.status == "published"
    finally:
        db.close()
