from __future__ import annotations

from sqlalchemy import func, select
from sqlalchemy.orm import Session
from slugify import slugify

from app.models import Article, ArticleVersion, Keyword, RankSnapshot, SerpSnapshot, Site


class ContentRepository:
    def get_or_create_site(
        self,
        db: Session,
        name: str,
        base_url: str,
        locale: str,
        workspace_id: str | None = None,
        brand_voice_json: dict | None = None,
    ) -> Site:
        site = db.scalar(select(Site).where(Site.base_url == base_url))
        if site:
            site.name = name
            site.locale = locale
            if workspace_id is not None:
                site.workspace_id = workspace_id
            if brand_voice_json is not None:
                site.brand_voice_json = brand_voice_json
            return site
        site = Site(
            name=name,
            base_url=base_url,
            locale=locale,
            workspace_id=workspace_id,
            brand_voice_json=brand_voice_json or {},
        )
        db.add(site)
        db.flush()
        return site

    def create_article(
        self,
        db: Session,
        site: Site,
        title: str,
        primary_keyword: str,
        search_intent: str,
        tone: str,
        target_length: int,
        published_url: str | None = None,
    ) -> Article:
        article = Article(
            site_id=site.id,
            title=title,
            slug=slugify(title),
            status="draft",
            primary_keyword=primary_keyword,
            search_intent=search_intent,
            tone=tone,
            target_length=target_length,
            published_url=published_url,
        )
        db.add(article)
        db.flush()
        return article

    def update_article(
        self,
        article: Article,
        title: str | None = None,
        primary_keyword: str | None = None,
        tone: str | None = None,
        target_length: int | None = None,
        search_intent: str | None = None,
        status: str | None = None,
        published_url: str | None = None,
    ) -> Article:
        if title is not None:
            article.title = title
            article.slug = slugify(title)
        if primary_keyword is not None:
            article.primary_keyword = primary_keyword
        if tone is not None:
            article.tone = tone
        if target_length is not None:
            article.target_length = target_length
        if search_intent is not None:
            article.search_intent = search_intent
        if status is not None:
            article.status = status
        if published_url is not None:
            article.published_url = published_url
        return article

    def next_version_number(self, db: Session, article_id: str) -> int:
        max_version = db.scalar(select(func.max(ArticleVersion.version_number)).where(ArticleVersion.article_id == article_id))
        return int(max_version or 0) + 1

    def create_version(
        self,
        db: Session,
        article: Article,
        content_markdown: str,
        outline_json: list[str],
        keywords_json: list[str],
        meta_title: str,
        meta_description: str,
        notes_json: list[str],
        created_by: str = "system",
    ) -> ArticleVersion:
        version = ArticleVersion(
            article_id=article.id,
            version_number=self.next_version_number(db, article.id),
            content_markdown=content_markdown,
            outline_json=outline_json,
            keywords_json=keywords_json,
            meta_title=meta_title,
            meta_description=meta_description,
            notes_json=notes_json,
            created_by=created_by,
        )
        db.add(version)
        db.flush()
        article.current_version_id = version.id
        return version

    def create_keyword(
        self,
        db: Session,
        site: Site,
        phrase: str,
        intent: str,
        difficulty: int = 0,
        priority: int = 0,
        article_id: str | None = None,
        target_url: str | None = None,
        search_engine: str = "google",
        locale: str = "vi-VN",
    ) -> Keyword:
        keyword = db.scalar(select(Keyword).where(Keyword.site_id == site.id, Keyword.phrase == phrase))
        if keyword:
            keyword.intent = intent
            keyword.difficulty = difficulty
            keyword.priority = priority
            keyword.article_id = article_id
            keyword.target_url = target_url
            keyword.search_engine = search_engine
            keyword.locale = locale
            return keyword
        keyword = Keyword(
            site_id=site.id,
            article_id=article_id,
            phrase=phrase,
            intent=intent,
            difficulty=difficulty,
            priority=priority,
            target_url=target_url,
            search_engine=search_engine,
            locale=locale,
        )
        db.add(keyword)
        db.flush()
        return keyword

    def add_rank_snapshot(
        self,
        db: Session,
        keyword: Keyword,
        rank: int | None,
        url: str | None,
        search_engine: str,
        device: str,
        serp_json: list[dict],
        article_id: str | None = None,
    ) -> RankSnapshot:
        snapshot = RankSnapshot(
            keyword_id=keyword.id,
            article_id=article_id or keyword.article_id,
            rank=rank,
            url=url,
            search_engine=search_engine,
            device=device,
            serp_json=serp_json,
        )
        db.add(snapshot)
        db.flush()
        return snapshot

    def add_serp_snapshot(
        self,
        db: Session,
        keyword: Keyword,
        results_json: list[dict],
        content_gap_json: list[dict],
    ) -> SerpSnapshot:
        snapshot = SerpSnapshot(
            keyword_id=keyword.id,
            results_json=results_json,
            content_gap_json=content_gap_json,
        )
        db.add(snapshot)
        db.flush()
        return snapshot

    def get_article(self, db: Session, article_id: str) -> Article | None:
        return db.get(Article, article_id)

    def get_latest_version(self, db: Session, article_id: str) -> ArticleVersion | None:
        return (
            db.query(ArticleVersion)
            .filter(ArticleVersion.article_id == article_id)
            .order_by(ArticleVersion.version_number.desc())
            .first()
        )

    def get_version(self, db: Session, version_id: str) -> ArticleVersion | None:
        return db.get(ArticleVersion, version_id)

    def get_version_by_number(self, db: Session, article_id: str, version_number: int) -> ArticleVersion | None:
        return db.scalar(
            select(ArticleVersion).where(
                ArticleVersion.article_id == article_id,
                ArticleVersion.version_number == version_number,
            )
        )

    def list_versions(self, db: Session, article_id: str) -> list[ArticleVersion]:
        return (
            db.query(ArticleVersion)
            .filter(ArticleVersion.article_id == article_id)
            .order_by(ArticleVersion.version_number.desc())
            .all()
        )
