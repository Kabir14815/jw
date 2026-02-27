from fastapi import APIRouter, Depends
from database import get_db
from schemas import CategoryOut

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[CategoryOut])
def list_categories(db=Depends(get_db)):
    cursor = db.categories.find().sort("sort_order", 1).sort("name", 1)
    return [
        CategoryOut(
            id=str(c["_id"]),
            slug=c["slug"],
            name=c["name"],
            sort_order=c.get("sort_order", 0),
        )
        for c in cursor
    ]
