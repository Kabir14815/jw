from pydantic import BaseModel, EmailStr, field_validator


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    role: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: str = "customer"


class CategoryOut(BaseModel):
    id: str
    slug: str
    name: str
    sort_order: int


class ProductOut(BaseModel):
    id: str
    category_id: str | None
    name: str
    slug: str
    description: str | None
    price: float
    image_url: str | None
    in_stock: int
    gold_weight_grams: float | None = None
    making_charges: float | None = None


class ProductCreate(BaseModel):
    category_id: str | None = None
    name: str
    slug: str
    description: str | None = None
    price: float = 0
    image_url: str | None = None
    in_stock: int = 1
    gold_weight_grams: float | None = None
    making_charges: float | None = None


class ProductUpdate(BaseModel):
    category_id: str | None = None
    name: str | None = None
    slug: str | None = None
    description: str | None = None
    price: float | None = None
    image_url: str | None = None
    in_stock: int | None = None
    gold_weight_grams: float | None = None
    making_charges: float | None = None


class GoldRateOut(BaseModel):
    value: float


class GoldRateUpdate(BaseModel):
    value: float


class CartItemOut(BaseModel):
    id: str
    product_id: str
    quantity: int
    product: ProductOut | None = None


class CartAdd(BaseModel):
    product_id: str  # MongoDB id as string
    quantity: int = 1

    @field_validator("product_id", mode="before")
    @classmethod
    def product_id_str(cls, v):
        return str(v) if v is not None else v


class OrderItemOut(BaseModel):
    id: str
    product_id: str
    quantity: int
    price: float
    product: ProductOut | None = None


class OrderOut(BaseModel):
    id: str
    user_id: str
    status: str
    total: float
    created_at: str
    items: list[OrderItemOut] = []
