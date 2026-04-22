from sqlalchemy.orm import Session

from app.schemas import ContentAnalysisRequest, ContentBriefRequest, ContentBriefResponse, ContentRefreshRequest, SeoScoreResponse
from app.repositories.content_repository import ContentRepository
from app.services.content_ai_service import ContentAIService


class SeoService:
    def __init__(self) -> None:
        self.content_ai = ContentAIService()
        self.repository = ContentRepository()

    def calculate(self, db: Session, article_id: str) -> SeoScoreResponse:
        article = self.repository.get_article(db, article_id)
        version = self.repository.get_latest_version(db, article_id)
        if article and version:
            analysis = self.content_ai.analyze_content(
                content=version.content_markdown,
                primary_keyword=article.primary_keyword,
                title=article.title,
            )
        else:
            analysis = self.content_ai.analyze_content(
                content=(
                    "# Example Article\n\n"
                    "This is a sample article about SEO content AI. "
                    "It includes keyword usage, heading structure, and internal links.\n\n"
                    "## Main section\n\n"
                    "The article explains how to improve SEO and content quality.\n\n"
                    "## FAQ\n\n"
                    "- What is SEO content AI?\n"
                    "- How does it improve rankings?\n\n"
                    "[Internal link](https://example.com/internal)"
                ),
                primary_keyword="SEO content AI",
                title="Example Article",
            )
        return SeoScoreResponse(**analysis)

    def analyze_content(self, payload: ContentAnalysisRequest) -> SeoScoreResponse:
        analysis = self.content_ai.analyze_content(
            content=payload.content,
            primary_keyword=payload.primary_keyword,
            title=payload.title,
        )
        return SeoScoreResponse(**analysis)

    def generate_brief(self, payload: ContentBriefRequest) -> ContentBriefResponse:
        brief = self.content_ai.generate_content_brief(
            keyword=payload.keyword,
            title=payload.title,
            audience=payload.audience,
            tone=payload.tone,
            locale=payload.locale,
            target_length=payload.target_length,
            serp_gap=payload.serp_gap,
            competitor_notes=payload.competitor_notes,
            keyword_difficulty=payload.keyword_difficulty,
        )
        return ContentBriefResponse(**brief)

    def refresh_draft(self, payload: ContentRefreshRequest) -> dict:
        return self.content_ai.refresh_content(
            content=payload.content,
            primary_keyword=payload.primary_keyword,
            title=payload.title,
            competitor_notes=payload.competitor_notes,
            serp_gap=payload.serp_gap,
        )
