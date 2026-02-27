from sqlalchemy import Column, Integer, String
from database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(64), unique=True, index=True, nullable=False)
    name = Column(String(128), nullable=False)
    sort_order = Column(Integer, default=0)
