from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from database import get_db
from schemas import CartItemOut, CartAdd, ProductOut
from auth import get_current_user_id

router = APIRouter(prefix="/cart", tags=["cart"])


def _product_out(doc) -> ProductOut | None:
    if not doc:
        return None
    return ProductOut(
        id=str(doc["_id"]),
        category_id=str(doc["category_id"]) if doc.get("category_id") else None,
        name=doc["name"],
        slug=doc["slug"],
        description=doc.get("description"),
        price=float(doc["price"]),
        image_url=doc.get("image_url"),
        in_stock=doc.get("in_stock", 1),
    )


@router.get("", response_model=list[CartItemOut])
def get_cart(
    db=Depends(get_db),
    user_id: str | None = Depends(get_current_user_id),
):
    if not user_id:
        return []
    oid = ObjectId(user_id)
    items = list(db.cart_items.find({"user_id": oid}))
    out = []
    for x in items:
        product = db.products.find_one({"_id": x["product_id"]}) if x.get("product_id") else None
        out.append(
            CartItemOut(
                id=str(x["_id"]),
                product_id=str(x["product_id"]),
                quantity=x.get("quantity", 1),
                product=_product_out(product),
            )
        )
    return out


@router.get("/count")
def get_cart_count(
    db=Depends(get_db),
    user_id: str | None = Depends(get_current_user_id),
):
    if not user_id:
        return {"count": 0}
    oid = ObjectId(user_id)
    pipeline = [
        {"$match": {"user_id": oid}},
        {"$group": {"_id": None, "total": {"$sum": "$quantity"}}},
    ]
    cur = list(db.cart_items.aggregate(pipeline))
    n = cur[0]["total"] if cur else 0
    return {"count": int(n)}


@router.post("", response_model=CartItemOut)
def add_to_cart(
    body: CartAdd,
    db=Depends(get_db),
    user_id: str | None = Depends(get_current_user_id),
):
    if not user_id:
        raise HTTPException(status_code=401, detail="Login to add to cart")
    try:
        product_oid = ObjectId(body.product_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Product not found")
    product = db.products.find_one({"_id": product_oid})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    user_oid = ObjectId(user_id)
    existing = db.cart_items.find_one({"user_id": user_oid, "product_id": product_oid})
    if existing:
        new_qty = existing.get("quantity", 0) + body.quantity
        db.cart_items.update_one(
            {"_id": existing["_id"]},
            {"$set": {"quantity": new_qty}},
        )
        updated = db.cart_items.find_one({"_id": existing["_id"]})
        return CartItemOut(
            id=str(updated["_id"]),
            product_id=str(updated["product_id"]),
            quantity=updated["quantity"],
            product=_product_out(product),
        )
    doc = {"user_id": user_oid, "product_id": product_oid, "quantity": body.quantity}
    r = db.cart_items.insert_one(doc)
    return CartItemOut(
        id=str(r.inserted_id),
        product_id=str(product_oid),
        quantity=body.quantity,
        product=_product_out(product),
    )


@router.delete("/{item_id}")
def remove_from_cart(
    item_id: str,
    db=Depends(get_db),
    user_id: str | None = Depends(get_current_user_id),
):
    if not user_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        oid = ObjectId(item_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Cart item not found")
    result = db.cart_items.delete_one({"_id": oid, "user_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return {"ok": True}
