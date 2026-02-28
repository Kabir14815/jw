from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from database import get_db
from schemas import BannerOut, BannerCreate, BannerUpdate
from auth import require_admin

router = APIRouter(prefix="/banners", tags=["banners"])


def _to_banner_out(doc) -> BannerOut:
    return BannerOut(
        id=str(doc["_id"]),
        image_url=doc.get("image_url", ""),
        brand_label=doc.get("brand_label", "G"),
        brand_name=doc.get("brand_name", ""),
        presents=doc.get("presents", ""),
        collection_name=doc.get("collection_name", ""),
        cta=doc.get("cta", "SHOP NOW"),
        cta_href=doc.get("cta_href", "/shop"),
        sort_order=doc.get("sort_order", 0),
    )


@router.get("", response_model=list[BannerOut])
def list_banners(db=Depends(get_db)):
    """Public – list hero banners for landing page."""
    docs = list(db.banners.find().sort("sort_order", 1))
    return [_to_banner_out(d) for d in docs]


@router.post("", response_model=BannerOut, status_code=201)
def create_banner(banner: BannerCreate, db=Depends(get_db), _=Depends(require_admin)):
    doc = banner.model_dump()
    r = db.banners.insert_one(doc)
    doc["_id"] = r.inserted_id
    return _to_banner_out(doc)


@router.patch("/{banner_id}", response_model=BannerOut)
def update_banner(banner_id: str, body: BannerUpdate, db=Depends(get_db), _=Depends(require_admin)):
    try:
        oid = ObjectId(banner_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid banner id")
    updates = {k: v for k, v in body.model_dump(exclude_unset=True).items() if v is not None}
    if not updates:
        doc = db.banners.find_one({"_id": oid})
        if not doc:
            raise HTTPException(status_code=404, detail="Banner not found")
        return _to_banner_out(doc)
    result = db.banners.find_one_and_update(
        {"_id": oid}, {"$set": updates}, return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Banner not found")
    return _to_banner_out(result)


@router.delete("/{banner_id}", status_code=204)
def delete_banner(banner_id: str, db=Depends(get_db), _=Depends(require_admin)):
    try:
        oid = ObjectId(banner_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid banner id")
    result = db.banners.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Banner not found")
