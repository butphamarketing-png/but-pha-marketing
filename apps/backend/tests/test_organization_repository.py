from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import app.models  # noqa: F401
from app.core.database import Base
from app.repositories.organization_repository import OrganizationRepository


def test_create_workspace_and_site():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()
    try:
        repo = OrganizationRepository()
        workspace = repo.create_workspace(db, "Test Workspace", "test-workspace", "pro")
        site = repo.create_site(db, workspace.id, "Test Site", "https://test.example.com", "vi-VN", {})
        db.commit()
        assert workspace.id
        assert site.workspace_id == workspace.id
    finally:
        db.close()
