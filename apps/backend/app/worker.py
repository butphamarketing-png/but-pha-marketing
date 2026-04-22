from __future__ import annotations

import time

from app.core.database import SessionLocal
from app.core.queue import RedisQueue
from app.repositories.content_repository import ContentRepository
from app.repositories.organization_repository import OrganizationRepository
from app.models import Job
from app.services.job_processor import JobProcessor


def main() -> None:
    queue = RedisQueue()
    processor = JobProcessor(ContentRepository(), OrganizationRepository())
    while True:
        message = queue.dequeue(timeout=5)
        if not message:
            time.sleep(1)
            continue
        db = SessionLocal()
        try:
            job = db.get(Job, message.job_id)
            if job:
                processor.process(db, job)
        finally:
            db.close()


if __name__ == "__main__":
    main()
