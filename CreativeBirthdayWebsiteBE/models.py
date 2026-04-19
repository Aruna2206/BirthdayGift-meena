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
    page: str = "gallery"
    category: Optional[str] = None # Added for categorization (Gifted from Him, Make my day, Good Memories of my life)
    is_favorite: bool = False      # Added for favorites
    is_special: bool = False       # Added for special ones

    class Settings:
        name = "images"
