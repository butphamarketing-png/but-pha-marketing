from __future__ import annotations

from sqlalchemy.orm import Session

from app.repositories.content_repository import ContentRepository
from app.services.serp_provider import SerpProvider


class SerpService:
    def __init__(self, serp_provider: SerpProvider, repository: ContentRepository) -> None:
        self.serp_provider = serp_provider
        self.repository = repository

    def analyze(
        self,
        db: Session,
        site_base_url: str,
        site_name: str,
        keyword_phrase: str,
        target_url: str | None,
        article_id: str | None = None,
        locale: str = "vi-VN",
        device: str = "desktop",
        search_engine: str = "google",
    ) -> dict:
        rank_service_results = self.serp_provider.search(keyword_phrase, locale=locale, device=device, num=10)
        site = self.repository.get_or_create_site(db, site_name, site_base_url, locale)
        article = self.repository.get_article(db, article_id) if article_id else None
        effective_target_url = target_url or (article.published_url if article and article.published_url else site_base_url)
        keyword = self.repository.create_keyword(
            db=db,
            site=site,
            phrase=keyword_phrase,
            intent="informational",
            article_id=article.id if article else None,
            target_url=effective_target_url,
            search_engine=search_engine,
            locale=locale,
        )
        content_gap = [
            {
                "topic": f"Mo rong ve {keyword_phrase}",
                "priority": "high" if index < 3 else "medium",
                "reason": f"Doi thu {item.title} dang xep hanh muc quan trong",
                "sourceUrl": item.url,
            }
            for index, item in enumerate(rank_service_results, start=1)
        ]
        self.repository.add_serp_snapshot(
            db=db,
            keyword=keyword,
            results_json=[result.__dict__ for result in rank_service_results],
            content_gap_json=content_gap,
        )
        db.commit()
        return {
            "keywordId": keyword.id,
            "query": keyword_phrase,
            "results": [result.__dict__ for result in rank_service_results],
            "contentGap": content_gap,
        }
