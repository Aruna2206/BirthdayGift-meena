from typing import Optional
from beanie import Document
from pydantic import Field

class User(Document):
    username: str
    hashed_password: str

    class Settings:
        name = "users"

class Image(Document):
    title: str
    description: Optional[str] = None
    url: str
    filename: Optional[str] = None # Store filename for easier lookup
    content: Optional[bytes] = None # Store binary data for Vercel support
    page: str = "gallery"
    category: Optional[str] = None
    is_favorite: bool = False
    is_special: bool = False

    class Settings:
        name = "images"
