from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from bson import ObjectId
from config import settings
from database import get_db

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer(auto_error=False)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)


def decode_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
    except JWTError:
        return None


def get_user_by_email(db, email: str) -> dict | None:
    return db.users.find_one({"email": email})


def get_current_user_id(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
    db=Depends(get_db),
) -> str | None:
    if not credentials:
        return None
    payload = decode_token(credentials.credentials)
    if not payload or "sub" not in payload:
        return None
    user_id = payload.get("sub")
    if not user_id:
        return None
    try:
        oid = ObjectId(user_id)
    except Exception:
        return None
    user = db.users.find_one({"_id": oid})
    if not user:
        return None
    return str(user["_id"])


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
    db=Depends(get_db),
) -> dict | None:
    if not credentials:
        return None
    payload = decode_token(credentials.credentials)
    if not payload or "sub" not in payload:
        return None
    user_id = payload.get("sub")
    if not user_id:
        return None
    try:
        oid = ObjectId(user_id)
    except Exception:
        return None
    user = db.users.find_one({"_id": oid})
    if not user:
        return None
    return {"id": str(user["_id"]), "email": user["email"], "role": user.get("role", "customer")}


def require_admin(user: dict | None = Depends(get_current_user)):
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return user
