"""initial schema

Revision ID: 0001_initial
Revises:
Create Date: 2026-04-22
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "sites",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("base_url", sa.String(length=512), nullable=False, unique=True),
        sa.Column("locale", sa.String(length=32), nullable=False, server_default=sa.text("'vi-VN'")),
        sa.Column("brand_voice_json", sa.JSON(), nullable=False, server_default=sa.text("'{}'::json")),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
    )

    op.create_table(
        "articles",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("site_id", sa.String(length=36), sa.ForeignKey("sites.id", ondelete="CASCADE"), nullable=False),
        sa.Column("title", sa.String(length=512), nullable=False),
        sa.Column("slug", sa.String(length=512), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False, server_default=sa.text("'draft'")),
        sa.Column("primary_keyword", sa.String(length=255), nullable=False),
        sa.Column("search_intent", sa.String(length=64), nullable=False, server_default=sa.text("'informational'")),
        sa.Column("tone", sa.String(length=32), nullable=False, server_default=sa.text("'seo'")),
        sa.Column("target_length", sa.Integer(), nullable=False, server_default=sa.text("1800")),
        sa.Column("current_version_id", sa.String(length=36), nullable=True),
        sa.Column("published_url", sa.String(length=1024), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_articles_site_id", "articles", ["site_id"], unique=False)
    op.create_index("ix_articles_slug", "articles", ["slug"], unique=False)

    op.create_table(
        "keywords",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("site_id", sa.String(length=36), sa.ForeignKey("sites.id", ondelete="CASCADE"), nullable=False),
        sa.Column("article_id", sa.String(length=36), sa.ForeignKey("articles.id", ondelete="SET NULL"), nullable=True),
        sa.Column("phrase", sa.String(length=255), nullable=False),
        sa.Column("intent", sa.String(length=64), nullable=False, server_default=sa.text("'informational'")),
        sa.Column("difficulty", sa.Integer(), nullable=False, server_default=sa.text("0")),
        sa.Column("priority", sa.Integer(), nullable=False, server_default=sa.text("0")),
        sa.Column("target_url", sa.String(length=1024), nullable=True),
        sa.Column("search_engine", sa.String(length=64), nullable=False, server_default=sa.text("'google'")),
        sa.Column("locale", sa.String(length=32), nullable=False, server_default=sa.text("'vi-VN'")),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_keywords_site_id", "keywords", ["site_id"], unique=False)
    op.create_index("ix_keywords_article_id", "keywords", ["article_id"], unique=False)
    op.create_index("ix_keywords_phrase", "keywords", ["phrase"], unique=False)

    op.create_table(
        "article_versions",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("article_id", sa.String(length=36), sa.ForeignKey("articles.id", ondelete="CASCADE"), nullable=False),
        sa.Column("version_number", sa.Integer(), nullable=False),
        sa.Column("content_markdown", sa.Text(), nullable=False),
        sa.Column("outline_json", sa.JSON(), nullable=False),
        sa.Column("keywords_json", sa.JSON(), nullable=False),
        sa.Column("meta_title", sa.String(length=255), nullable=False),
        sa.Column("meta_description", sa.String(length=512), nullable=False),
        sa.Column("notes_json", sa.JSON(), nullable=False),
        sa.Column("created_by", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_article_versions_article_id", "article_versions", ["article_id"], unique=False)

    op.create_table(
        "rank_snapshots",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("keyword_id", sa.String(length=36), sa.ForeignKey("keywords.id", ondelete="CASCADE"), nullable=False),
        sa.Column("article_id", sa.String(length=36), sa.ForeignKey("articles.id", ondelete="SET NULL"), nullable=True),
        sa.Column("rank", sa.Integer(), nullable=True),
        sa.Column("url", sa.String(length=1024), nullable=True),
        sa.Column("search_engine", sa.String(length=64), nullable=False, server_default=sa.text("'google'")),
        sa.Column("device", sa.String(length=32), nullable=False, server_default=sa.text("'desktop'")),
        sa.Column("serp_json", sa.JSON(), nullable=False),
        sa.Column("captured_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_rank_snapshots_keyword_id", "rank_snapshots", ["keyword_id"], unique=False)
    op.create_index("ix_rank_snapshots_article_id", "rank_snapshots", ["article_id"], unique=False)
    op.create_index("ix_rank_snapshots_captured_at", "rank_snapshots", ["captured_at"], unique=False)

    op.create_table(
        "serp_snapshots",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("keyword_id", sa.String(length=36), sa.ForeignKey("keywords.id", ondelete="CASCADE"), nullable=False),
        sa.Column("results_json", sa.JSON(), nullable=False),
        sa.Column("content_gap_json", sa.JSON(), nullable=False),
        sa.Column("fetched_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_serp_snapshots_keyword_id", "serp_snapshots", ["keyword_id"], unique=False)

    op.create_table(
        "audit_logs",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("entity_type", sa.String(length=64), nullable=False),
        sa.Column("entity_id", sa.String(length=36), nullable=False),
        sa.Column("action", sa.String(length=64), nullable=False),
        sa.Column("diff_json", sa.JSON(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_audit_logs_entity_id", "audit_logs", ["entity_id"], unique=False)
    op.create_index("ix_audit_logs_created_at", "audit_logs", ["created_at"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_audit_logs_created_at", table_name="audit_logs")
    op.drop_index("ix_audit_logs_entity_id", table_name="audit_logs")
    op.drop_table("audit_logs")
    op.drop_index("ix_serp_snapshots_keyword_id", table_name="serp_snapshots")
    op.drop_table("serp_snapshots")
    op.drop_index("ix_rank_snapshots_captured_at", table_name="rank_snapshots")
    op.drop_index("ix_rank_snapshots_article_id", table_name="rank_snapshots")
    op.drop_index("ix_rank_snapshots_keyword_id", table_name="rank_snapshots")
    op.drop_table("rank_snapshots")
    op.drop_index("ix_article_versions_article_id", table_name="article_versions")
    op.drop_table("article_versions")
    op.drop_index("ix_keywords_phrase", table_name="keywords")
    op.drop_index("ix_keywords_article_id", table_name="keywords")
    op.drop_index("ix_keywords_site_id", table_name="keywords")
    op.drop_table("keywords")
    op.drop_index("ix_articles_slug", table_name="articles")
    op.drop_index("ix_articles_site_id", table_name="articles")
    op.drop_table("articles")
    op.drop_table("sites")
