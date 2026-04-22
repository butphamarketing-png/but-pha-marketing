from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AI SEO Content Platform API"
    environment: str = "development"
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/ai_seo"
    openai_api_key: str | None = None
    openai_model: str = "gpt-5.4"
    openai_reasoning_effort: str = "medium"
    serpapi_api_key: str | None = None
    serpapi_endpoint: str = "https://serpapi.com/search.json"
    default_site_base_url: str = "https://example.com"
    default_site_name: str = "Example Site"
    auth_secret_key: str = "change-me"
    access_token_expiry_minutes: int = 10080
    redis_url: str = "redis://localhost:6379/0"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
