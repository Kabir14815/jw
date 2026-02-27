from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from database import get_db
from schemas import OrderOut, OrderItemOut, ProductOut
from auth import get_current_user_id, require_admin

router = APIRouter(prefix="/orders", tags=["orders"])


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


def _order_with_items(db, o):
    items = list(db.order_items.find({"order_id": o["_id"]}))
    item_outs = []
    for oi in items:
        product = db.products.find_one({"_id": oi["product_id"]}) if oi.get("product_id") else None
        item_outs.append(
            OrderItemOut(
                id=str(oi["_id"]),
                product_id=str(oi["product_id"]),
                quantity=oi["quantity"],
                price=float(oi["price"]),
                product=_product_out(product),
            )
        )
    return OrderOut(
        id=str(o["_id"]),
        user_id=str(o["user_id"]),
        status=o.get("status", "pending"),
        total=float(o.get("total", 0)),
        created_at=o["created_at"].isoformat() if o.get("created_at") else "",
        items=item_outs,
    )


@router.post("", response_model=OrderOut)
def create_order(
    db=Depends(get_db),
    user_id: str | None = Depends(get_current_user_id),
):
    if not user_id:
        raise HTTPException(status_code=401, detail="Login to place order")
    user_oid = ObjectId(user_id)
    cart = list(db.cart_items.find({"user_id": user_oid}))
    if not cart:
        raise HTTPException(status_code=400, detail="Cart is empty")
    total = 0
    for c in cart:
        product = db.products.find_one({"_id": c["product_id"]}) if c.get("product_id") else None
        price = float(product["price"]) if product else 0
        total += c.get("quantity", 0) * price
    now = datetime.now(timezone.utc)
    order_doc = {"user_id": user_oid, "status": "pending", "total": total, "created_at": now}
    r = db.orders.insert_one(order_doc)
    order_id = r.inserted_id
    for c in cart:
        product = db.products.find_one({"_id": c["product_id"]}) if c.get("product_id") else None
        price = float(product["price"]) if product else 0
        db.order_items.insert_one({
            "order_id": order_id,
            "product_id": c["product_id"],
            "quantity": c.get("quantity", 0),
            "price": price,
        })
    db.cart_items.delete_many({"user_id": user_oid})
    order_doc["_id"] = order_id
    return _order_with_items(db, order_doc)


@router.get("", response_model=list[OrderOut])
def list_my_orders(
    db=Depends(get_db),
    user_id: str | None = Depends(get_current_user_id),
):
    if not user_id:
        return []
    user_oid = ObjectId(user_id)
    orders = list(db.orders.find({"user_id": user_oid}).sort("_id", -1))
    return [_order_with_items(db, o) for o in orders]


@router.get("/admin", response_model=list[OrderOut])
def list_all_orders(
    db=Depends(get_db),
    admin=Depends(require_admin),
):
    orders = list(db.orders.find().sort("_id", -1))
    return [_order_with_items(db, o) for o in orders]
