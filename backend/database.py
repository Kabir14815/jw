from pymongo import MongoClient
from config import settings

_client = None


def get_client():
    global _client
    if _client is None:
        _client = MongoClient(settings.mongodb_uri)
    return _client


def get_db():
    client = get_client()
    # URI contains database name (e.g. rr_enterprise)
    return client.get_default_database() or client.get_database("rr_enterprise")


def init_db():
    db = get_db()
    db.users.create_index("email", unique=True)
    db.products.create_index("slug", unique=True)
    db.categories.create_index("slug", unique=True)
    db.cart_items.create_index([("user_id", 1), ("product_id", 1)])
    db.orders.create_index("user_id")
    db.order_items.create_index("order_id")
