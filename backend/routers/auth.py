from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from schemas import LoginRequest, Token
from auth import get_password_hash, create_access_token, get_user_by_email, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
def login(req: LoginRequest, db=Depends(get_db)):
    user = get_user_by_email(db, req.email)
    if not user:
        doc = {
            "email": req.email,
            "hashed_password": get_password_hash(req.password),
            "role": "admin" if req.role == "admin" else "customer",
        }
        r = db.users.insert_one(doc)
        user_id = str(r.inserted_id)
        role = doc["role"]
    else:
        if not verify_password(req.password, user["hashed_password"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        user_id = str(user["_id"])
        role = user.get("role", "customer")
    token = create_access_token(data={"sub": user_id})
    return Token(
        access_token=token,
        user_id=user_id,
        email=req.email,
        role=role,
    )
