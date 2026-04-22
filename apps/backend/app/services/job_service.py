from __future__ import annotations

from sqlalchemy.orm import Session

from app.models import Job


class JobService:
    def list_jobs(self, db: Session) -> list[Job]:
        return db.query(Job).order_by(Job.created_at.desc()).all()
