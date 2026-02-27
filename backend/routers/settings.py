from fastapi import APIRouter, Depends
from database import get_db
from schemas import GoldRateOut, GoldRateUpdate
from auth import require_admin

router = APIRouter(prefix="/settings", tags=["settings"])

GOLD_RATE_KEY = "gold_rate_per_gram"
DEFAULT_GOLD_RATE = 6500.0


def get_gold_rate(db):
    doc = db.settings.find_one({"_id": GOLD_RATE_KEY})
    if doc is None:
        return DEFAULT_GOLD_RATE
    return float(doc.get("value", DEFAULT_GOLD_RATE))


@router.get("/gold-rate", response_model=GoldRateOut)
def read_gold_rate(db=Depends(get_db)):
    return GoldRateOut(value=get_gold_rate(db))


@router.put("/gold-rate", response_model=GoldRateOut)
def update_gold_rate(body: GoldRateUpdate, db=Depends(get_db), admin=Depends(require_admin)):
    if body.value < 0:
        body.value = 0
    db.settings.update_one(
        {"_id": GOLD_RATE_KEY},
        {"$set": {"value": body.value}},
        upsert=True,
    )
    return GoldRateOut(value=body.value)
