from app.services.content_ai_service import ContentAIService


def test_analyze_content_produces_score_and_suggestions():
    service = ContentAIService()
    result = service.analyze_content(
        content=(
            "# SEO Content AI\n\n"
            "SEO content AI giup viet bai nhanh hon.\n\n"
            "## Loi ich chinh\n\n"
            "- Co keyword\n\n"
            "## FAQ\n\n"
            "- SEO content AI la gi?\n\n"
            "[Link](https://example.com)"
        ),
        primary_keyword="SEO content AI",
        title="SEO Content AI",
    )
    assert result["score"] > 0
    assert result["issues"]
    assert result["suggestions"]
    assert result["heading_structure"]
    assert result["recommended_outline"]
    assert result["meta_title_suggestion"]
    assert result["meta_description_suggestion"]
    assert result["internal_link_suggestions"]
    assert result["content_summary"]
    assert result["keyword_occurrences"] >= 1


def test_refresh_content_produces_new_draft_and_score_gain():
    service = ContentAIService()
    result = service.refresh_content(
        content="Short article about SEO content AI.",
        primary_keyword="SEO content AI",
        title="SEO Content AI",
        competitor_notes=["Need FAQ", "Need internal links"],
    )
    assert result["revised_markdown"]
    assert result["before_score"] <= result["after_score"]
    assert result["improvement_notes"]


def test_generate_content_brief_uses_keyword_and_outline():
    service = ContentAIService()
    result = service.generate_content_brief(
        keyword="SEO content AI",
        title="SEO Content AI",
        audience="general",
        tone="seo",
        serp_gap=[{"topic": "FAQ", "reason": "Competitors cover it"}],
    )
    assert result["keyword"] == "SEO content AI"
    assert result["keyword_difficulty"] >= 5
    assert result["difficulty_label"]
    assert result["outline"]
    assert result["questions"]
    assert result["internal_link_suggestions"]
    assert result["meta_title_suggestion"]
    assert result["meta_description_suggestion"]
