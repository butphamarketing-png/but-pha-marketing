from __future__ import annotations

import json
from dataclasses import dataclass

from openai import OpenAI

from app.core.settings import Settings


@dataclass
class GeneratedContent:
    outline: list[str]
    keywords: list[str]
    search_intent: str
    article_markdown: str
    meta_title: str
    meta_description: str
    seo_recommendations: list[str]


class OpenAIWriter:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.client = OpenAI(api_key=settings.openai_api_key) if settings.openai_api_key else None

    @property
    def enabled(self) -> bool:
        return self.client is not None

    def generate_article(
        self,
        title: str,
        primary_keyword: str,
        tone: str,
        target_length: int,
        additional_keywords: list[str] | None = None,
        locale: str = "vi-VN",
        audience: str = "general",
        brief_context: dict | None = None,
    ) -> GeneratedContent:
        if not self.client:
            return self._fallback(title, primary_keyword, tone, target_length, additional_keywords, brief_context)

        brief_context_text = json.dumps(brief_context or {}, ensure_ascii=False)
        prompt = f"""
Ban la SEO content writer. Hay tra ve JSON hop le, khong markdown code fence.
Yeu cau:
- Viet bai bang ngon ngu {locale}
- Tone: {tone}
- Audience: {audience}
- Title: {title}
- Primary keyword: {primary_keyword}
- Additional keywords: {", ".join(additional_keywords or [])}
- Target length: {target_length}
- Brief context: {brief_context_text}

Schema JSON:
{{
  "outline": ["H1: ...", "H2: ..."],
  "keywords": ["..."],
  "search_intent": "informational|commercial|transactional|navigational",
  "article_markdown": "# ...",
  "meta_title": "...",
  "meta_description": "...",
  "seo_recommendations": ["..."]
}}
"""
        response = self.client.responses.create(
            model=self.settings.openai_model,
            reasoning={"effort": self.settings.openai_reasoning_effort},
            input=[
                {
                    "role": "system",
                    "content": "You generate SEO articles and strictly return valid JSON only.",
                },
                {"role": "user", "content": prompt},
            ],
        )
        raw = getattr(response, "output_text", "") or ""
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            return self._fallback(title, primary_keyword, tone, target_length, additional_keywords, brief_context)

        return GeneratedContent(
            outline=list(data.get("outline", [])),
            keywords=list(data.get("keywords", [primary_keyword])),
            search_intent=str(data.get("search_intent", "informational")),
            article_markdown=str(data.get("article_markdown", "")),
            meta_title=str(data.get("meta_title", title)),
            meta_description=str(data.get("meta_description", "")),
            seo_recommendations=list(data.get("seo_recommendations", [])),
        )

    def _fallback(
        self,
        title: str,
        primary_keyword: str,
        tone: str,
        target_length: int,
        additional_keywords: list[str] | None = None,
        brief_context: dict | None = None,
    ) -> GeneratedContent:
        keywords = [primary_keyword, *(additional_keywords or [])]
        brief_outline = list((brief_context or {}).get("outline", []) or [])
        brief_keywords = list((brief_context or {}).get("keywords", []) or [])
        brief_questions = list((brief_context or {}).get("questions", []) or [])
        outline = brief_outline or [
            f"H1: {title}",
            f"H2: {primary_keyword} la gi?",
            "H2: Loi ich chinh",
            "H2: Cach trien khai",
            "H2: FAQ",
        ]
        if brief_keywords:
            keywords = [primary_keyword, *brief_keywords[:4]]
        article_markdown = (
            f"# {title}\n\n"
            f"{title} la bai viet tap trung vao {primary_keyword}. "
            f"Noi dung duoc viet theo goc do {tone}.\n\n"
            "## Loi ich chinh\n\n"
            f"- Giai thich ro hon ve {primary_keyword}\n"
            "- Tang do sau noi dung\n"
            "- Chen internal link hop ly\n\n"
            "## FAQ\n\n"
            f"- {primary_keyword} la gi?\n"
            f"- Lam sao toi uu SEO cho {primary_keyword}?\n"
        )
        if brief_context:
            article_markdown += (
                "\n\n## Content brief\n\n"
                f"- Search intent: {brief_context.get('search_intent', 'informational')}\n"
                f"- Content angle: {brief_context.get('content_angle', '')}\n"
                f"- Keyword difficulty: {brief_context.get('difficulty_label', 'Medium')} ({brief_context.get('keyword_difficulty', 50)})\n"
            )
        if brief_questions:
            article_markdown += "\n" + "\n".join(f"- {question}" for question in brief_questions[:4])
        return GeneratedContent(
            outline=outline,
            keywords=keywords,
            search_intent="informational",
            article_markdown=article_markdown,
            meta_title=f"{title} | {primary_keyword}"[:60],
            meta_description=f"Huong dan toi uu SEO cho {primary_keyword}, co outline va draft ro rang."[:160],
            seo_recommendations=[
                "Chen keyword chinh vao title va doan mo dau",
                "Bo sung internal link",
                "Mo rong FAQ va conclusion",
            ],
        )
