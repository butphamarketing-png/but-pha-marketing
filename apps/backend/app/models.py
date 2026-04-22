from __future__ import annotations

from datetime import datetime
from uuid import uuid4

from sqlalchemy import JSON, Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.core.database import Base


def _uuid() -> str:
    return str(uuid4())


def _utcnow() -> datetime:
    return datetime.utcnow()


class Site(Base):
    __tablename__ = "sites"

    id = Column(String(36), primary_key=True, default=_uuid)
    workspace_id = Column(String(36), ForeignKey("workspaces.id", ondelete="SET NULL"), nullable=True, index=True)
    name = Column(String(255), nullable=False)
    base_url = Column(String(512), nullable=False, unique=True, index=True)
    locale = Column(String(32), nullable=False, default="vi-VN")
    brand_voice_json = Column(JSON, nullable=False, default=dict)
    created_at = Column(DateTime, nullable=False, default=_utcnow)
    updated_at = Column(DateTime, nullable=False, default=_utcnow, onupdate=_utcnow)

    workspace = relationship("Workspace", back_populates="sites")
    articles = relationship("Article", back_populates="site", cascade="all, delete-orphan")
    keywords = relationship("Keyword", back_populates="site", cascade="all, delete-orphan")


class Article(Base):
    __tablename__ = "articles"

    id = Column(String(36), primary_key=True, default=_uuid)
    site_id = Column(String(36), ForeignKey("sites.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(512), nullable=False)
    slug = Column(String(512), nullable=False, index=True)
    status = Column(String(32), nullable=False, default="draft")
    primary_keyword = Column(String(255), nullable=False)
    search_intent = Column(String(64), nullable=False, default="informational")
    tone = Column(String(32), nullable=False, default="seo")
    target_length = Column(Integer, nullable=False, default=1800)
    current_version_id = Column(String(36), nullable=True)
    published_url = Column(String(1024), nullable=True)
    created_at = Column(DateTime, nullable=False, default=_utcnow)
    updated_at = Column(DateTime, nullable=False, default=_utcnow, onupdate=_utcnow)

    site = relationship("Site", back_populates="articles")
    versions = relationship("ArticleVersion", back_populates="article", cascade="all, delete-orphan")
    keywords = relationship("Keyword", back_populates="article")
    rank_snapshots = relationship("RankSnapshot", back_populates="article")


class ArticleVersion(Base):
    __tablename__ = "article_versions"

    id = Column(String(36), primary_key=True, default=_uuid)
    article_id = Column(String(36), ForeignKey("articles.id", ondelete="CASCADE"), nullable=False, index=True)
    version_number = Column(Integer, nullable=False)
    content_markdown = Column(Text, nullable=False)
    outline_json = Column(JSON, nullable=False, default=list)
    keywords_json = Column(JSON, nullable=False, default=list)
    meta_title = Column(String(255), nullable=False)
    meta_description = Column(String(512), nullable=False)
    notes_json = Column(JSON, nullable=False, default=list)
    created_by = Column(String(255), nullable=False, default="system")
    created_at = Column(DateTime, nullable=False, default=_utcnow)

    article = relationship("Article", back_populates="versions")


class Keyword(Base):
    __tablename__ = "keywords"

    id = Column(String(36), primary_key=True, default=_uuid)
    site_id = Column(String(36), ForeignKey("sites.id", ondelete="CASCADE"), nullable=False, index=True)
    article_id = Column(String(36), ForeignKey("articles.id", ondelete="SET NULL"), nullable=True, index=True)
    phrase = Column(String(255), nullable=False, index=True)
    intent = Column(String(64), nullable=False, default="informational")
    difficulty = Column(Integer, nullable=False, default=0)
    priority = Column(Integer, nullable=False, default=0)
    target_url = Column(String(1024), nullable=True)
    search_engine = Column(String(64), nullable=False, default="google")
    locale = Column(String(32), nullable=False, default="vi-VN")
    created_at = Column(DateTime, nullable=False, default=_utcnow)
    updated_at = Column(DateTime, nullable=False, default=_utcnow, onupdate=_utcnow)

    site = relationship("Site", back_populates="keywords")
    article = relationship("Article", back_populates="keywords")
    rank_snapshots = relationship("RankSnapshot", back_populates="keyword", cascade="all, delete-orphan")
    serp_snapshots = relationship("SerpSnapshot", back_populates="keyword", cascade="all, delete-orphan")


class RankSnapshot(Base):
    __tablename__ = "rank_snapshots"

    id = Column(String(36), primary_key=True, default=_uuid)
    keyword_id = Column(String(36), ForeignKey("keywords.id", ondelete="CASCADE"), nullable=False, index=True)
    article_id = Column(String(36), ForeignKey("articles.id", ondelete="SET NULL"), nullable=True, index=True)
    rank = Column(Integer, nullable=True)
    url = Column(String(1024), nullable=True)
    search_engine = Column(String(64), nullable=False, default="google")
    device = Column(String(32), nullable=False, default="desktop")
    serp_json = Column(JSON, nullable=False, default=list)
    captured_at = Column(DateTime, nullable=False, default=_utcnow, index=True)

    keyword = relationship("Keyword", back_populates="rank_snapshots")
    article = relationship("Article", back_populates="rank_snapshots")


class SerpSnapshot(Base):
    __tablename__ = "serp_snapshots"

    id = Column(String(36), primary_key=True, default=_uuid)
    keyword_id = Column(String(36), ForeignKey("keywords.id", ondelete="CASCADE"), nullable=False, index=True)
    results_json = Column(JSON, nullable=False, default=list)
    content_gap_json = Column(JSON, nullable=False, default=list)
    fetched_at = Column(DateTime, nullable=False, default=_utcnow)

    keyword = relationship("Keyword", back_populates="serp_snapshots")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=_uuid)
    entity_type = Column(String(64), nullable=False)
    entity_id = Column(String(36), nullable=False, index=True)
    action = Column(String(64), nullable=False)
    diff_json = Column(JSON, nullable=False, default=dict)
    created_at = Column(DateTime, nullable=False, default=_utcnow, index=True)


class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(String(36), primary_key=True, default=_uuid)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False, unique=True, index=True)
    plan = Column(String(32), nullable=False, default="free")
    created_at = Column(DateTime, nullable=False, default=_utcnow)
    updated_at = Column(DateTime, nullable=False, default=_utcnow, onupdate=_utcnow)

    sites = relationship("Site", back_populates="workspace", cascade="all, delete-orphan")
    members = relationship("WorkspaceMember", back_populates="workspace", cascade="all, delete-orphan")
    jobs = relationship("Job", back_populates="workspace", cascade="all, delete-orphan")


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=_uuid)
    email = Column(String(255), nullable=False, unique=True, index=True)
    name = Column(String(255), nullable=False)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, nullable=False, default=_utcnow)
    updated_at = Column(DateTime, nullable=False, default=_utcnow, onupdate=_utcnow)

    memberships = relationship("WorkspaceMember", back_populates="user", cascade="all, delete-orphan")


class WorkspaceMember(Base):
    __tablename__ = "workspace_members"

    id = Column(String(36), primary_key=True, default=_uuid)
    workspace_id = Column(String(36), ForeignKey("workspaces.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    role = Column(String(32), nullable=False, default="viewer")
    created_at = Column(DateTime, nullable=False, default=_utcnow)

    workspace = relationship("Workspace", back_populates="members")
    user = relationship("User", back_populates="memberships")


class Job(Base):
    __tablename__ = "jobs"

    id = Column(String(36), primary_key=True, default=_uuid)
    workspace_id = Column(String(36), ForeignKey("workspaces.id", ondelete="SET NULL"), nullable=True, index=True)
    job_type = Column(String(64), nullable=False, index=True)
    status = Column(String(32), nullable=False, default="queued", index=True)
    payload_json = Column(JSON, nullable=False, default=dict)
    result_json = Column(JSON, nullable=False, default=dict)
    error_message = Column(Text, nullable=True)
    created_by = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime, nullable=False, default=_utcnow, index=True)
    updated_at = Column(DateTime, nullable=False, default=_utcnow, onupdate=_utcnow)
    started_at = Column(DateTime, nullable=True)
    finished_at = Column(DateTime, nullable=True)

    workspace = relationship("Workspace", back_populates="jobs")
