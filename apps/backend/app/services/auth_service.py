from __future__ import annotations

import hashlib
from datetime import datetime, timedelta, timezone

import jwt
from sqlalchemy.orm import Session

from app.core.settings import Settings
from app.repositories.organization_repository import OrganizationRepository


class AuthService:
    def __init__(self, settings: Settings, repository: OrganizationRepository) -> None:
        self.settings = settings
        self.repository = repository

    def hash_password(self, password: str) -> str:
        payload = f"{self.settings.auth_secret_key}:{password}".encode("utf-8")
        return hashlib.sha256(payload).hexdigest()

    def verify_password(self, password: str, password_hash: str) -> bool:
        return self.hash_password(password) == password_hash

    def create_token(self, user_id: str, email: str) -> str:
        now = datetime.now(timezone.utc)
        expires = now + timedelta(minutes=self.settings.access_token_expiry_minutes)
        token = jwt.encode(
            {
                "sub": user_id,
                "email": email,
                "iat": int(now.timestamp()),
                "exp": int(expires.timestamp()),
            },
            self.settings.auth_secret_key,
            algorithm="HS256",
        )
        return token

    def authenticate(self, db: Session, email: str, password: str):
        user = self.repository.get_user_by_email(db, email)
        if not user or not self.verify_password(password, user.password_hash):
            return None
        return user

    def login(self, db: Session, email: str, password: str) -> dict:
        user = self.authenticate(db, email, password)
        if not user:
            raise PermissionError("Invalid credentials")
        token = self.create_token(user.id, user.email)
        memberships = [
            {"workspace_id": membership.workspace_id, "role": membership.role}
            for membership in user.memberships
        ]
        return {
            "access_token": token,
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "roles": memberships,
            },
        }
