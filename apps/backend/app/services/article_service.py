from uuid import uuid4

from sqlalchemy.orm import Session

from app.schemas import ArticleCreateRequest, ArticleGenerateResponse
from app.core.settings import get_settings
from app.repositories.content_repository import ContentRepository
from app.services.openai_writer import OpenAIWriter


class ArticleService:
    def __init__(self) -> None:
        self.repository = ContentRepository()
        self.writer = OpenAIWriter(get_settings())

    def create_article(self, db: Session, payload: ArticleCreateRequest) -> ArticleGenerateResponse:
        generation = self.writer.generate_article(
            title=payload.title,
            primary_keyword=payload.primary_keyword,
            tone=payload.tone,
            target_length=payload.target_length,
            additional_keywords=payload.additional_keywords,
            locale=payload.locale,
            audience=payload.audience,
            brief_context=payload.brief_context,
        )
        site = self.repository.get_or_create_site(
            db=db,
            name=payload.site_name,
            base_url=payload.site_base_url,
            locale=payload.locale,
            workspace_id=payload.workspace_id,
        )
        article = self.repository.create_article(
            db=db,
            site=site,
            title=payload.title,
            primary_keyword=payload.primary_keyword,
            search_intent=generation.search_intent,
            tone=payload.tone,
            target_length=payload.target_length,
            published_url=payload.site_base_url,
        )
        version = self.repository.create_version(
            db=db,
            article=article,
            content_markdown=generation.article_markdown,
            outline_json=generation.outline,
            keywords_json=generation.keywords,
            meta_title=generation.meta_title,
            meta_description=generation.meta_description,
            notes_json=generation.seo_recommendations,
            created_by="openai" if self.writer.enabled else "fallback",
        )
        db.commit()
        return ArticleGenerateResponse(
            article_id=article.id,
            article_slug=article.slug,
            site_id=site.id,
            version_id=version.id,
            outline=generation.outline,
            keywords=generation.keywords,
            search_intent=generation.search_intent,
            draft_version_id=version.id,
            article_markdown=generation.article_markdown,
            meta_title=generation.meta_title,
            meta_description=generation.meta_description,
            seo_recommendations=generation.seo_recommendations,
        )

    def generate_outline(self, article_id: str) -> dict:
        return {
            "articleId": article_id,
            "outline": ["H1", "H2", "H3"],
            "status": "generated",
        }

    def generate_draft(self, article_id: str) -> dict:
        return {
            "articleId": article_id,
            "draftVersionId": str(uuid4()),
            "status": "generated",
        }
