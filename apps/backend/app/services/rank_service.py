from __future__ import annotations

from dataclasses import dataclass
from urllib.parse import urlparse

from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from app.models import Keyword, RankSnapshot, Site
from app.repositories.content_repository import ContentRepository
from app.services.serp_provider import SearchResult, SerpProvider


@dataclass
class RankAnalysis:
    keyword_id: str
    query: str
    current_rank: int | None
    previous_rank: int | None
    delta: int | None
    needs_update: bool
    top_results: list[dict]
    matched_url: str | None


class RankService:
    def __init__(self, serp_provider: SerpProvider, repository: ContentRepository) -> None:
        self.serp_provider = serp_provider
        self.repository = repository

    def track_keyword(
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
    ) -> RankAnalysis:
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

        results = self.serp_provider.search(keyword_phrase, locale=locale, device=device, num=10)
        matched_result = self._match_target(results, effective_target_url)
        current_rank = matched_result.position if matched_result else None
        previous_rank = self._previous_rank(db, keyword.id)
        delta = None
        if previous_rank is not None and current_rank is not None:
            delta = previous_rank - current_rank
        needs_update = self._needs_update(current_rank, previous_rank)
        serp_payload = [result.__dict__ for result in results]

        self.repository.add_rank_snapshot(
            db=db,
            keyword=keyword,
            rank=current_rank,
            url=matched_result.url if matched_result else effective_target_url,
            search_engine=search_engine,
            device=device,
            serp_json=serp_payload,
            article_id=article.id if article else None,
        )
        db.commit()

        return RankAnalysis(
            keyword_id=keyword.id,
            query=keyword_phrase,
            current_rank=current_rank,
            previous_rank=previous_rank,
            delta=delta,
            needs_update=needs_update,
            top_results=serp_payload,
            matched_url=matched_result.url if matched_result else None,
        )

    def serp_analysis(
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
        results = self.serp_provider.search(keyword_phrase, locale=locale, device=device, num=10)
        content_gap = self._derive_content_gap(results, keyword_phrase)
        self.repository.add_serp_snapshot(
            db=db,
            keyword=keyword,
            results_json=[result.__dict__ for result in results],
            content_gap_json=content_gap,
        )
        db.commit()
        return {
            "keywordId": keyword.id,
            "query": keyword_phrase,
            "results": [result.__dict__ for result in results],
            "contentGap": content_gap,
        }

    def _previous_rank(self, db: Session, keyword_id: str) -> int | None:
        row = db.scalar(
            select(RankSnapshot.rank)
            .where(RankSnapshot.keyword_id == keyword_id)
            .where(RankSnapshot.rank.is_not(None))
            .order_by(desc(RankSnapshot.captured_at))
        )
        return int(row) if row is not None else None

    def _match_target(self, results: list[SearchResult], target_url: str) -> SearchResult | None:
        target_domain = urlparse(target_url).netloc.lower()
        for result in results:
            result_domain = urlparse(result.url).netloc.lower()
            if target_domain and target_domain == result_domain:
                return result
        return None

    def _needs_update(self, current_rank: int | None, previous_rank: int | None) -> bool:
        if current_rank is None:
            return True
        if current_rank > 10:
            return True
        if previous_rank is None:
            return False
        return current_rank - previous_rank > 5

    def _derive_content_gap(self, results: list[SearchResult], keyword_phrase: str) -> list[dict]:
        gaps: list[dict] = []
        for result in results[:5]:
            gaps.append(
                {
                    "type": "heading",
                    "suggestion": f"Bo sung section lien quan toi {keyword_phrase}",
                    "sourceTitle": result.title,
                    "sourceUrl": result.url,
                }
            )
        if not gaps:
            gaps.append({"type": "coverage", "suggestion": f"Phat trien noi dung bao phu {keyword_phrase}"})
        return gaps
