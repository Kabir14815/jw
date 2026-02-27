from fastapi import APIRouter, Depends, HTTPException, Query
from bson import ObjectId
from database import get_db
from schemas import ProductOut, ProductCreate, ProductUpdate
from auth import get_current_user_id, require_admin
from routers.settings import get_gold_rate

router = APIRouter(prefix="/products", tags=["products"])


def _product_out(doc, gold_rate: float | None = None) -> ProductOut:
    price = float(doc.get("price", 0))
    weight = doc.get("gold_weight_grams")
    making = doc.get("making_charges") or 0
    if weight is not None and gold_rate is not None and gold_rate > 0:
        price = float(weight) * gold_rate + float(making)
    return ProductOut(
        id=str(doc["_id"]),
        category_id=str(doc["category_id"]) if doc.get("category_id") else None,
        name=doc["name"],
        slug=doc["slug"],
        description=doc.get("description"),
        price=round(price, 2),
        image_url=doc.get("image_url"),
        in_stock=doc.get("in_stock", 1),
        gold_weight_grams=float(weight) if weight is not None else None,
        making_charges=float(making) if making else None,
    )


@router.get("", response_model=list[ProductOut])
def list_products(
    q: str | None = Query(None),
    category: str | None = Query(None),
    db=Depends(get_db),
):
    gold_rate = get_gold_rate(db)
    filt = {}
    if q:
        filt["$or"] = [
            {"name": {"$regex": q, "$options": "i"}},
            {"description": {"$regex": q, "$options": "i"}},
        ]
    if category:
        cat = db.categories.find_one({"slug": category})
        if cat:
            filt["category_id"] = cat["_id"]
    cursor = db.products.find(filt).sort("_id", 1)
    return [_product_out(d, gold_rate) for d in cursor]


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: str, db=Depends(get_db)):
    try:
        oid = ObjectId(product_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Product not found")
    p = db.products.find_one({"_id": oid})
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return _product_out(p, get_gold_rate(db))


@router.post("", response_model=ProductOut)
def create_product(
    body: ProductCreate,
    db=Depends(get_db),
    admin=Depends(require_admin),
):
    category_id = None
    if body.category_id:
        try:
            category_id = ObjectId(body.category_id)
        except Exception:
            pass
    doc = {
        "category_id": category_id,
        "name": body.name,
        "slug": body.slug,
        "description": body.description,
        "price": body.price,
        "image_url": body.image_url,
        "in_stock": body.in_stock,
        "gold_weight_grams": body.gold_weight_grams,
        "making_charges": body.making_charges if body.making_charges is not None else 0,
    }
    r = db.products.insert_one(doc)
    doc["_id"] = r.inserted_id
    return _product_out(doc, get_gold_rate(db))


@router.patch("/{product_id}", response_model=ProductOut)
def update_product(
    product_id: str,
    body: ProductUpdate,
    db=Depends(get_db),
    admin=Depends(require_admin),
):
    try:
        oid = ObjectId(product_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Product not found")
    p = db.products.find_one({"_id": oid})
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    upd = body.model_dump(exclude_unset=True)
    if "category_id" in upd:
        if upd["category_id"]:
            try:
                upd["category_id"] = ObjectId(upd["category_id"])
            except Exception:
                upd["category_id"] = None
        else:
            upd["category_id"] = None
    if "making_charges" in upd and upd["making_charges"] is None:
        upd["making_charges"] = 0
    db.products.update_one({"_id": oid}, {"$set": upd})
    p = db.products.find_one({"_id": oid})
    return _product_out(p, get_gold_rate(db))


@router.delete("/{product_id}")
def delete_product(
    product_id: str,
    db=Depends(get_db),
    admin=Depends(require_admin),
):
    try:
        oid = ObjectId(product_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Product not found")
    result = db.products.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"ok": True}
