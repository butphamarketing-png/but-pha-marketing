from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import app.models  # noqa: F401
from app.core.database import Base
from app.core.settings import Settings
from app.repositories.organization_repository import OrganizationRepository
from app.services.auth_service import AuthService


def test_auth_service_generates_token():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()
    try:
        settings = Settings(auth_secret_key="test-secret", access_token_expiry_minutes=60)
        repo = OrganizationRepository()
        auth = AuthService(settings, repo)
        user = repo.get_or_create_user(db, "admin@example.com", "Admin", auth.hash_password("admin123"))
        token = auth.create_token(user.id, user.email)
        assert token
    finally:
        db.close()
