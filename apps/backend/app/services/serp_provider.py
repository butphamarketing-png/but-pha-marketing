from __future__ import annotations

from dataclasses import dataclass

import httpx

from app.core.settings import Settings


@dataclass
class SearchResult:
    position: int
    title: str
    url: str
    snippet: str = ""


class SerpProvider:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    def search(self, query: str, locale: str = "vi-VN", device: str = "desktop", num: int = 10) -> list[SearchResult]:
        if not self.settings.serpapi_api_key:
            return [
                SearchResult(
                    position=1,
                    title=f"{query} - Example result",
                    url="https://example.com",
                    snippet=f"Demo SERP data for {query}",
                ),
                SearchResult(
                    position=2,
                    title=f"Guides about {query}",
                    url="https://example.com/guides",
                    snippet=f"Supporting article for {query}",
                ),
                SearchResult(
                    position=3,
                    title=f"{query} best practices",
                    url="https://example.org/best-practices",
                    snippet=f"Search result sample for {query}",
                ),
                SearchResult(
                    position=4,
                    title=f"Complete guide to {query}",
                    url="https://example.net/guide",
                    snippet=f"Extended guide about {query}",
                ),
                SearchResult(
                    position=5,
                    title=f"{query} FAQ",
                    url="https://example.com/faq",
                    snippet=f"FAQ results for {query}",
                ),
            ][:num]

        params = {
            "engine": "google",
            "q": query,
            "hl": locale.split("-")[0],
            "gl": locale.split("-")[-1].lower() if "-" in locale else "vn",
            "num": num,
            "api_key": self.settings.serpapi_api_key,
        }
        if device == "mobile":
            params["device"] = "mobile"

        with httpx.Client(timeout=30) as client:
            response = client.get(self.settings.serpapi_endpoint, params=params)
            response.raise_for_status()
            payload = response.json()

        organic = payload.get("organic_results", [])[:num]
        results: list[SearchResult] = []
        for index, item in enumerate(organic, start=1):
            results.append(
                SearchResult(
                    position=index,
                    title=str(item.get("title", "")),
                    url=str(item.get("link", "")),
                    snippet=str(item.get("snippet", "")),
                )
            )
        return results
