from __future__ import annotations

import math
import re


class ContentAIService:
    _sentence_splitter = re.compile(r"[.!?]+|\n+")
    _heading_pattern = re.compile(r"^(#{1,6})\s+(.+)$", re.MULTILINE)
    _link_pattern = re.compile(r"\[[^\]]+\]\([^)]+\)|https?://\S+")

    def build_outline(self, title: str, primary_keyword: str, tone: str) -> list[str]:
        tone = tone.lower()
        common = [
            f"H1: {title}",
            f"H2: {primary_keyword} la gi?",
            "H2: Loi ich chinh",
            "H2: Cach thuc trien khai",
            "H2: Luu y toi uu SEO",
            "H2: FAQ",
        ]
        if tone == "sales":
            return [
                f"H1: {title}",
                "H2: Van de cua khach hang",
                "H2: Giai phap de xuat",
                "H2: Loi ich va khoi hoach",
                "H2: CTA",
            ]
        if tone == "blog":
            return [
                f"H1: {title}",
                "H2: Mo dau",
                "H2: Huong dan chi tiet",
                "H2: Vi du thuc te",
                "H2: FAQ",
                "H2: Ket luan",
            ]
        return common

    def generate_article_markdown(
        self,
        title: str,
        primary_keyword: str,
        tone: str,
        target_length: int,
        additional_keywords: list[str] | None = None,
    ) -> tuple[list[str], str, str, str, list[str]]:
        outline = self.build_outline(title, primary_keyword, tone)
        extra_keywords = additional_keywords or []
        keyword_line = ", ".join([primary_keyword, *extra_keywords[:4]])
        meta_title = self._build_meta_title(title, primary_keyword)
        meta_description = self._build_meta_description(title, primary_keyword, tone)
        recommendations = [
            "Chen keyword chinh vao H1, doan mo dau va it nhat 1 H2",
            "Them 1-2 internal links lien quan",
            "Dung FAQ de mo rong long-tail keyword",
        ]
        article = self._compose_article(title, primary_keyword, tone, target_length, keyword_line, outline)
        return outline, article, meta_title, meta_description, recommendations

    def generate_content_brief(
        self,
        keyword: str,
        title: str | None = None,
        audience: str = "general",
        tone: str = "seo",
        locale: str = "vi-VN",
        target_length: int = 1800,
        serp_gap: list[dict] | None = None,
        competitor_notes: list[str] | None = None,
        keyword_difficulty: int | None = None,
    ) -> dict:
        title_text = title or keyword.title()
        outline = self.build_outline(title_text, keyword, tone)
        gap_topics = [str(item.get("topic", "")) for item in (serp_gap or []) if item.get("topic")]
        content_angle = self._brief_angle(keyword, audience, tone, gap_topics, competitor_notes or [])
        estimated_difficulty = keyword_difficulty if keyword_difficulty is not None else self._estimate_keyword_difficulty(
            serp_gap or [],
            competitor_notes or [],
            target_length,
        )
        questions = [
            f"{keyword} la gi?",
            f"Lam sao toi uu SEO cho {keyword}?",
            f"Phan nao trong bai giup tang rank cho {keyword}?",
        ]
        if gap_topics:
            questions.extend([f"Lam ro {topic}" for topic in gap_topics[:3]])
        internal_links = self._internal_link_suggestions(keyword, len(serp_gap or []))
        meta_title = self._meta_title_suggestion(title_text, keyword)
        meta_description = self._meta_description_suggestion(title_text, keyword)
        summary = (
            f"Brief cho {keyword} theo tone {tone}, audience {audience}, locale {locale}. "
            f"Tap trung search intent va SERP gap."
        )
        return {
            "keyword": keyword,
            "title": title_text,
            "search_intent": "informational",
            "content_angle": content_angle,
            "target_length": target_length,
            "keyword_difficulty": estimated_difficulty,
            "difficulty_label": self._difficulty_label(estimated_difficulty),
            "outline": outline,
            "keywords": [keyword, *gap_topics[:4]],
            "questions": questions,
            "internal_link_suggestions": internal_links,
            "meta_title_suggestion": meta_title,
            "meta_description_suggestion": meta_description,
            "summary": summary,
        }

    def analyze_content(
        self,
        content: str,
        primary_keyword: str,
        title: str | None = None,
    ) -> dict:
        normalized = content.strip()
        word_count = self._word_count(normalized)
        sentence_count = max(1, len([s for s in self._sentence_splitter.split(normalized) if s.strip()]))
        heading_matches = self._heading_pattern.findall(normalized)
        heading_count = len(heading_matches)
        heading_structure = [f"{level} {text}" for level, text in heading_matches]
        links = len(self._link_pattern.findall(normalized))
        keyword_count = self._count_keyword(normalized, primary_keyword)
        keyword_density = (keyword_count / max(1, word_count)) * 100
        avg_sentence_length = word_count / sentence_count
        title_has_keyword = bool(title and primary_keyword.lower() in title.lower())
        first_keyword_position = self._first_keyword_position(normalized, primary_keyword)

        keyword_score = self._score_keyword(keyword_density, title_has_keyword, keyword_count)
        heading_score = self._score_heading(heading_count, normalized)
        readability_score = self._score_readability(avg_sentence_length)
        link_score = self._score_links(links)
        length_score = self._score_length(word_count)
        structure_score = self._score_structure(normalized)

        breakdown = {
            "keywords": keyword_score,
            "headings": heading_score,
            "readability": readability_score,
            "links": link_score,
            "length": length_score,
            "structure": structure_score,
        }
        score = self._weighted_score(breakdown)
        issues, suggestions = self._build_feedback(
            word_count,
            heading_count,
            keyword_density,
            avg_sentence_length,
            links,
            title_has_keyword,
        )
        meta_title_suggestion = self._meta_title_suggestion(title, primary_keyword)
        meta_description_suggestion = self._meta_description_suggestion(title, primary_keyword)
        recommended_outline = self._recommended_outline(title, primary_keyword, heading_structure)
        content_summary = self._content_summary(word_count, heading_count, keyword_density, links)
        internal_link_suggestions = self._internal_link_suggestions(primary_keyword, links)

        return {
            "score": score,
            "breakdown": breakdown,
            "issues": issues,
            "suggestions": suggestions,
            "metrics": {
                "wordCount": float(word_count),
                "sentenceCount": float(sentence_count),
                "headingCount": float(heading_count),
                "keywordDensity": round(keyword_density, 2),
                "averageSentenceLength": round(avg_sentence_length, 2),
                "internalLinks": float(links),
            },
            "heading_structure": heading_structure,
            "recommended_outline": recommended_outline,
            "meta_title_suggestion": meta_title_suggestion,
            "meta_description_suggestion": meta_description_suggestion,
            "internal_link_suggestions": internal_link_suggestions,
            "content_summary": content_summary,
            "keyword_in_title": title_has_keyword,
            "keyword_occurrences": keyword_count,
            "first_keyword_position": first_keyword_position,
        }

    def refresh_content(
        self,
        content: str,
        primary_keyword: str,
        title: str | None = None,
        competitor_notes: list[str] | None = None,
        serp_gap: list[dict] | None = None,
    ) -> dict:
        analysis = self.analyze_content(content, primary_keyword, title)
        current_score = analysis["score"]
        outline = self.build_outline(title or primary_keyword.title(), primary_keyword, "seo")
        notes = [*(competitor_notes or [])]
        gap_notes = self._serp_gap_notes(serp_gap or [])
        notes.extend(gap_notes)
        revised = self._compose_refresh_draft(
            title=title or primary_keyword.title(),
            primary_keyword=primary_keyword,
            outline=outline,
            notes=notes,
            current_content=content,
            serp_gap=serp_gap or [],
        )
        revised_analysis = self.analyze_content(revised, primary_keyword, title)
        return {
            "revised_markdown": revised,
            "improvement_notes": [*analysis["suggestions"], *gap_notes],
            "before_score": current_score,
            "after_score": revised_analysis["score"],
        }

    def _compose_article(
        self,
        title: str,
        primary_keyword: str,
        tone: str,
        target_length: int,
        keyword_line: str,
        outline: list[str],
    ) -> str:
        intro = (
            f"{title} la bai viet tap trung vao {primary_keyword}. "
            f"Noi dung duoc viet theo goc do {tone}, co toi uu keyword, heading va internal link."
        )
        body_sections = []
        for section in outline[1:]:
            section_title = section.split(": ", 1)[-1]
            body_sections.append(
                f"## {section_title}\n\n"
                f"Phan nay trien khai y chinh ve {primary_keyword}, "
                f"co chen tu khoa phu, vi du thuc te va lien ket bo tro de tang chieu sau noi dung."
            )
        faq = (
            "## FAQ\n\n"
            f"- {primary_keyword} la gi?\n"
            f"- Lam sao toi uu SEO cho {primary_keyword}?\n"
            f"- Cac loi thuong gap khi viet ve {primary_keyword} la gi?"
        )
        cta = "## Ket luan\n\nTom lai, hay duy tri do sau noi dung, cap nhat dinh ky va them internal link hop ly."
        footer = (
            f"**Keywords:** {keyword_line}\n\n"
            f"**Target length:** {target_length} tu"
        )
        return "\n\n".join([f"# {title}", intro, *body_sections, faq, cta, footer])

    def _compose_refresh_draft(
        self,
        title: str,
        primary_keyword: str,
        outline: list[str],
        notes: list[str],
        current_content: str,
        serp_gap: list[dict],
    ) -> str:
        sections = [f"# {title}", "## Ban cap nhat"]
        sections.append(
            f"Tai ban cap nhat nay, noi dung duoc mo rong de phu hop hon voi search intent cho {primary_keyword}."
        )
        if serp_gap:
            sections.append(
                "## SERP gap can bo sung\n\n"
                + "\n".join(
                    f"- {str(item.get('topic', 'Unknown topic'))}: {str(item.get('reason', 'Need coverage'))}"
                    for item in serp_gap[:5]
                )
            )
        for section in outline[1:]:
            section_title = section.split(": ", 1)[-1]
            sections.append(
                f"## {section_title}\n\n"
                f"Bo sung thong tin bo tro, vi du, va goc nhin thuc chien ve {primary_keyword}."
            )
        if notes:
            sections.append("## Diem can bo sung\n\n" + "\n".join(f"- {note}" for note in notes[:6]))
        sections.append("## Ghi chu refresh\n\nNoi dung nay duoc tao lai tu ban nhap cu, khong overwrite truc tiep version da duyet.")
        sections.append("## Ket luan\n\nDuy tri cap nhat dinh ky de giu vung hieu suat SEO.")
        if current_content.strip():
            sections.append("<!-- source retained for analysis -->")
        return "\n\n".join(sections)

    def _build_meta_title(self, title: str, primary_keyword: str) -> str:
        if primary_keyword.lower() in title.lower():
            return title[:60]
        return f"{title} | {primary_keyword}".strip()[:60]

    def _build_meta_description(self, title: str, primary_keyword: str, tone: str) -> str:
        tone_label = "toi uu SEO" if tone != "sales" else "thuyet phuc chuyen doi"
        text = f"{title}: huong dan {tone_label} cho {primary_keyword}, co outline ro rang, keywords va goi y cai thien."
        return text[:160]

    def _word_count(self, text: str) -> int:
        words = re.findall(r"\b[\w'-]+\b", text)
        return len(words)

    def _count_keyword(self, text: str, keyword: str) -> int:
        pattern = re.escape(keyword.strip().lower())
        return len(re.findall(pattern, text.lower()))

    def _first_keyword_position(self, text: str, keyword: str) -> int | None:
        lowered = text.lower()
        target = keyword.strip().lower()
        if not target:
            return None
        index = lowered.find(target)
        return index if index >= 0 else None

    def _score_keyword(self, density: float, title_has_keyword: bool, keyword_count: int) -> int:
        score = 20
        if 0.6 <= density <= 2.5:
            score = 25
        elif density < 0.2:
            score = 12
        elif density > 4:
            score = 14
        if title_has_keyword:
            score += 3
        if keyword_count >= 3:
            score += 2
        return min(25, score)

    def _score_heading(self, heading_count: int, content: str) -> int:
        if heading_count >= 5:
            return 20
        if heading_count == 4:
            return 17
        if heading_count == 3:
            return 14
        if heading_count == 2:
            return 10
        return 6 if content else 0

    def _score_readability(self, avg_sentence_length: float) -> int:
        if avg_sentence_length <= 18:
            return 15
        if avg_sentence_length <= 24:
            return 13
        if avg_sentence_length <= 30:
            return 10
        return 6

    def _score_links(self, links: int) -> int:
        if links >= 3:
            return 15
        if links == 2:
            return 12
        if links == 1:
            return 8
        return 3

    def _score_length(self, word_count: int) -> int:
        if word_count >= 1500:
            return 15
        if word_count >= 900:
            return 13
        if word_count >= 600:
            return 10
        if word_count >= 300:
            return 7
        return 4

    def _score_structure(self, content: str) -> int:
        has_faq = "faq" in content.lower()
        has_conclusion = "ket luan" in content.lower() or "conclusion" in content.lower()
        score = 0
        score += 5 if has_faq else 2
        score += 5 if has_conclusion else 2
        return min(10, score)

    def _weighted_score(self, breakdown: dict[str, int]) -> int:
        total = sum(breakdown.values())
        score = math.floor(total)
        return max(0, min(100, score))

    def _build_feedback(
        self,
        word_count: int,
        heading_count: int,
        keyword_density: float,
        avg_sentence_length: float,
        links: int,
        title_has_keyword: bool,
    ) -> tuple[list[str], list[str]]:
        issues: list[str] = []
        suggestions: list[str] = []

        if word_count < 600:
            issues.append("Do dai bai con ngan")
            suggestions.append("Mo rong bai viet them vi du, FAQ va phan giai thich")
        if heading_count < 3:
            issues.append("Thieu heading structure")
            suggestions.append("Them it nhat 3 heading H2/H3")
        if keyword_density < 0.25:
            issues.append("Mat do keyword qua thap")
            suggestions.append("Chen keyword chinh vao mo dau, 1 H2 va ket luan")
        if keyword_density > 4.5:
            issues.append("Mat do keyword qua cao")
            suggestions.append("Giam lap lai keyword va them bien the tu khoa")
        if avg_sentence_length > 28:
            issues.append("Cau van qua dai")
            suggestions.append("Rut ngan cau, uu tien doan ngan va ro y")
        if links == 0:
            issues.append("Chua co internal link")
            suggestions.append("Them 2-3 internal links lien quan")
        if not title_has_keyword:
            issues.append("Title chua chua keyword chinh")
            suggestions.append("Chen keyword chinh vao title")
        if not issues:
            issues.append("Noi dung on dinh")
            suggestions.append("Co the tiep tuc them schema, FAQ va internal link")
        return issues, suggestions

    def _meta_title_suggestion(self, title: str | None, primary_keyword: str) -> str:
        base = title or primary_keyword.title()
        if primary_keyword.lower() in base.lower():
            return base[:60]
        return f"{primary_keyword} | {base}"[:60]

    def _meta_description_suggestion(self, title: str | None, primary_keyword: str) -> str:
        base = title or primary_keyword.title()
        text = f"{base}: huong dan toi uu SEO, giup lam ro search intent, heading structure, va internal link cho {primary_keyword}."
        return text[:160]

    def _recommended_outline(self, title: str | None, primary_keyword: str, headings: list[str]) -> list[str]:
        if headings:
            return [f"{heading}" for heading in headings[:8]]
        base_title = title or primary_keyword.title()
        return [
            f"H1: {base_title}",
            f"H2: {primary_keyword} la gi?",
            "H2: Loi ich chinh",
            "H2: Cach trien khai",
            "H2: Luu y toi uu SEO",
            "H2: FAQ",
        ]

    def _content_summary(self, word_count: int, heading_count: int, keyword_density: float, links: int) -> str:
        return (
            f"Bai viet co {word_count} tu, {heading_count} heading, mat do keyword {round(keyword_density, 2)}%, "
            f"va {links} internal link."
        )

    def _internal_link_suggestions(self, primary_keyword: str, links: int) -> list[str]:
        suggestions = [
            f"Link tu doan mo dau sang bai tru cot lien quan den {primary_keyword}",
            f"Chen 1 internal link vao phan giai thich chinh ve {primary_keyword}",
        ]
        if links == 0:
            suggestions.append("Them them 1 link ve bai dich vu/giai phap de tang do phu noi bo")
        return suggestions

    def _brief_angle(
        self,
        keyword: str,
        audience: str,
        tone: str,
        serp_gap_topics: list[str],
        competitor_notes: list[str],
    ) -> str:
        base = f"Tap trung giai quyet search intent cho {keyword} voi goc nhin {tone} danh cho {audience}."
        if serp_gap_topics:
            base += f" Bo sung cac gap topic: {', '.join(serp_gap_topics[:3])}."
        if competitor_notes:
            base += f" Canh tranh voi: {', '.join(competitor_notes[:3])}."
        return base

    def _estimate_keyword_difficulty(
        self,
        serp_gap: list[dict],
        competitor_notes: list[str],
        target_length: int,
    ) -> int:
        gap_pressure = min(40, len(serp_gap) * 6)
        note_pressure = min(20, len(competitor_notes) * 4)
        length_pressure = 10 if target_length >= 1800 else 6 if target_length >= 1200 else 2
        score = 20 + gap_pressure + note_pressure + length_pressure
        return max(5, min(100, score))

    def _difficulty_label(self, difficulty: int) -> str:
        if difficulty < 35:
            return "Easy"
        if difficulty < 60:
            return "Medium"
        if difficulty < 80:
            return "Hard"
        return "Very hard"

    def _serp_gap_notes(self, serp_gap: list[dict]) -> list[str]:
        notes: list[str] = []
        for item in serp_gap[:5]:
            topic = str(item.get("topic", "SERP gap"))
            reason = str(item.get("reason", "Need stronger coverage"))
            notes.append(f"SERP gap: {topic} - {reason}")
        return notes

