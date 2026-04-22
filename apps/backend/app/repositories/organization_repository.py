from __future__ import annotations

from slugify import slugify
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Site, User, Workspace, WorkspaceMember


class OrganizationRepository:
    def create_workspace(self, db: Session, name: str, slug: str, plan: str = "free") -> Workspace:
        workspace = db.scalar(select(Workspace).where(Workspace.slug == slug))
        if workspace:
            workspace.name = name
            workspace.plan = plan
            return workspace
        workspace = Workspace(name=name, slug=slugify(slug), plan=plan)
        db.add(workspace)
        db.flush()
        return workspace

    def list_workspaces(self, db: Session) -> list[Workspace]:
        return db.query(Workspace).order_by(Workspace.created_at.desc()).all()

    def get_workspace(self, db: Session, workspace_id: str) -> Workspace | None:
        return db.get(Workspace, workspace_id)

    def get_workspace_by_slug(self, db: Session, slug: str) -> Workspace | None:
        return db.scalar(select(Workspace).where(Workspace.slug == slug))

    def create_site(
        self,
        db: Session,
        workspace_id: str | None,
        name: str,
        base_url: str,
        locale: str,
        brand_voice_json: dict,
    ) -> Site:
        site = db.scalar(select(Site).where(Site.base_url == base_url))
        if site:
            if workspace_id is not None:
                site.workspace_id = workspace_id
            site.name = name
            site.locale = locale
            site.brand_voice_json = brand_voice_json
            return site
        site = Site(
            workspace_id=workspace_id,
            name=name,
            base_url=base_url,
            locale=locale,
            brand_voice_json=brand_voice_json,
        )
        db.add(site)
        db.flush()
        return site

    def list_sites(self, db: Session, workspace_id: str | None = None) -> list[Site]:
        query = db.query(Site)
        if workspace_id:
            query = query.filter(Site.workspace_id == workspace_id)
        return query.order_by(Site.created_at.desc()).all()

    def get_site(self, db: Session, site_id: str) -> Site | None:
        return db.get(Site, site_id)

    def get_site_by_base_url(self, db: Session, base_url: str) -> Site | None:
        return db.scalar(select(Site).where(Site.base_url == base_url))

    def update_site(
        self,
        db: Session,
        site: Site,
        name: str | None = None,
        locale: str | None = None,
        brand_voice_json: dict | None = None,
    ) -> Site:
        if name is not None:
            site.name = name
        if locale is not None:
            site.locale = locale
        if brand_voice_json is not None:
            site.brand_voice_json = brand_voice_json
        return site

    def get_or_create_user(self, db: Session, email: str, name: str, password_hash: str) -> User:
        user = db.scalar(select(User).where(User.email == email))
        if user:
            return user
        user = User(email=email, name=name, password_hash=password_hash)
        db.add(user)
        db.flush()
        return user

    def get_user(self, db: Session, user_id: str) -> User | None:
        return db.get(User, user_id)

    def get_user_by_email(self, db: Session, email: str) -> User | None:
        return db.scalar(select(User).where(User.email == email))

    def add_member(self, db: Session, workspace_id: str, user_id: str, role: str) -> WorkspaceMember:
        member = db.scalar(
            select(WorkspaceMember).where(
                WorkspaceMember.workspace_id == workspace_id,
                WorkspaceMember.user_id == user_id,
            )
        )
        if member:
            member.role = role
            return member
        member = WorkspaceMember(workspace_id=workspace_id, user_id=user_id, role=role)
        db.add(member)
        db.flush()
        return member

    def update_member_role(self, db: Session, workspace_id: str, user_id: str, role: str) -> WorkspaceMember | None:
        member = db.scalar(
            select(WorkspaceMember).where(
                WorkspaceMember.workspace_id == workspace_id,
                WorkspaceMember.user_id == user_id,
            )
        )
        if not member:
            return None
        member.role = role
        return member

    def list_members(self, db: Session, workspace_id: str) -> list[WorkspaceMember]:
        return db.query(WorkspaceMember).filter(WorkspaceMember.workspace_id == workspace_id).all()
