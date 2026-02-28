"""Seed categories and sample products for MongoDB. Run from backend dir: python -m seed"""
from database import get_db, init_db
from auth import get_password_hash

def seed():
    init_db()
    db = get_db()
    first_run = db.categories.count_documents({}) == 0
    if first_run:
        categories = [
            {"slug": "all", "name": "All Jewellery", "sort_order": 0},
            {"slug": "gold", "name": "Gold", "sort_order": 1},
            {"slug": "diamond", "name": "Diamond", "sort_order": 2},
            {"slug": "earrings", "name": "Earrings", "sort_order": 3},
            {"slug": "rings", "name": "Rings", "sort_order": 4},
            {"slug": "daily-wear", "name": "Daily Wear", "sort_order": 5},
            {"slug": "collections", "name": "Collections", "sort_order": 6},
            {"slug": "wedding", "name": "Wedding", "sort_order": 7},
            {"slug": "gifting", "name": "Gifting", "sort_order": 8},
            {"slug": "more", "name": "More", "sort_order": 9},
        ]
        db.categories.insert_many(categories)
        cats = {c["slug"]: c["_id"] for c in db.categories.find()}
        products = [
            ("exquisite-vines-necklace", "Exquisite Vines Diamond Necklace Set", "Diamond necklace set", 89999.0, "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=85", "diamond"),
            ("classic-solitaire-ring", "Classic Solitaire Ring", "Elegant solitaire", 75000.0, "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=85", "rings"),
            ("heritage-gold-bangle", "Heritage Gold Bangle", "Traditional bangle", 45000.0, "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=85", "gold"),
        ]
        for slug, name, desc, price, img, cat_slug in products:
            db.products.insert_one({
                "name": name,
                "slug": slug,
                "description": desc,
                "price": price,
                "image_url": img,
                "category_id": cats.get(cat_slug),
                "in_stock": 1,
            })
        if not db.users.find_one({"email": "admin@garg.com"}):
            db.users.insert_one({
                "email": "admin@garg.com",
                "hashed_password": get_password_hash("admin123"),
                "role": "admin",
            })
        if db.banners.count_documents({}) == 0:
            banners = [
                {"image_url": "/banners/banner-traditional-gold.jpg", "brand_label": "G", "brand_name": "TRADITIONAL GOLD", "presents": "THE HOUSE OF GARG", "collection_name": "Swipe to unveil incredible inspiration", "cta": "SHOP NOW", "cta_href": "/shop", "sort_order": 0},
                {"image_url": "/banners/banner-jewelry-collection.webp", "brand_label": "G", "brand_name": "EXQUISITE & ELEGANT", "presents": "THE HOUSE OF GARG", "collection_name": "Discover our jewellery collection", "cta": "SHOP NOW", "cta_href": "/shop", "sort_order": 1},
                {"image_url": "/banners/banner-diamond-pendants.webp", "brand_label": "G", "brand_name": "DIAMOND PENDANTS", "presents": "THE HOUSE OF GARG", "collection_name": "Beautiful timeless pieces", "cta": "SHOP NOW", "cta_href": "/shop", "sort_order": 2},
            ]
            db.banners.insert_many(banners)
        print("Seeded categories, products, banners, and admin user (admin@garg.com / admin123).")
    elif db.banners.count_documents({}) == 0:
        banners = [
            {"image_url": "/banners/banner-traditional-gold.jpg", "brand_label": "G", "brand_name": "TRADITIONAL GOLD", "presents": "THE HOUSE OF GARG", "collection_name": "Swipe to unveil incredible inspiration", "cta": "SHOP NOW", "cta_href": "/shop", "sort_order": 0},
            {"image_url": "/banners/banner-jewelry-collection.webp", "brand_label": "G", "brand_name": "EXQUISITE & ELEGANT", "presents": "THE HOUSE OF GARG", "collection_name": "Discover our jewellery collection", "cta": "SHOP NOW", "cta_href": "/shop", "sort_order": 1},
            {"image_url": "/banners/banner-diamond-pendants.webp", "brand_label": "G", "brand_name": "DIAMOND PENDANTS", "presents": "THE HOUSE OF GARG", "collection_name": "Beautiful timeless pieces", "cta": "SHOP NOW", "cta_href": "/shop", "sort_order": 2},
        ]
        db.banners.insert_many(banners)
        print("Seeded banners.")
    else:
        print("Already seeded.")

if __name__ == "__main__":
    seed()
