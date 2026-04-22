from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, SessionLocal, engine
from app.core.settings import get_settings
import app.models  # noqa: F401
from app.routes import router
from app.repositories.organization_repository import OrganizationRepository
from app.services.auth_service import AuthService


settings = get_settings()
organization_repository = OrganizationRepository()
auth_service = AuthService(settings, organization_repository)


app = FastAPI(title="AI SEO Content Platform API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        workspace = organization_repository.create_workspace(db, "Default Workspace", "default-workspace", "pro")
        user = organization_repository.get_user_by_email(db, "admin@example.com")
        if not user:
            user = organization_repository.get_or_create_user(
                db,
                "admin@example.com",
                "Admin",
                auth_service.hash_password("admin123"),
        )
        organization_repository.add_member(db, workspace.id, user.id, "admin")
        existing_site = organization_repository.get_site_by_base_url(db, settings.default_site_base_url)
        if not existing_site:
            organization_repository.create_site(
                db,
                workspace.id,
                settings.default_site_name,
                settings.default_site_base_url,
                "vi-VN",
                {},
            )
        db.commit()
    finally:
        db.close()


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}
