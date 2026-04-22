from __future__ import annotations

import json
from dataclasses import dataclass

import redis

from app.core.settings import get_settings


QUEUE_NAME = "ai_seo_jobs"


@dataclass
class QueueMessage:
    job_id: str
    job_type: str


class RedisQueue:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.client = redis.Redis.from_url(getattr(self.settings, "redis_url", "redis://localhost:6379/0"), decode_responses=True)
        self.available = True
        try:
            self.client.ping()
        except redis.RedisError:
            self.available = False

    def enqueue(self, job_id: str, job_type: str) -> None:
        if not self.available:
            return
        self.client.rpush(QUEUE_NAME, json.dumps({"job_id": job_id, "job_type": job_type}))

    def dequeue(self, timeout: int = 1) -> QueueMessage | None:
        if not self.available:
            return None
        item = self.client.blpop(QUEUE_NAME, timeout=timeout)
        if not item:
            return None
        _, payload = item
        data = json.loads(payload)
        return QueueMessage(job_id=data["job_id"], job_type=data["job_type"])
