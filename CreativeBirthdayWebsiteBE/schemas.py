from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int

class TokenData(BaseModel):
    username: Optional[str] = None

class ImageBase(BaseModel):
    title: str
    description: Optional[str] = None
    url: str
    page: Optional[str] = "gallery"

class ImageCreate(ImageBase):
    pass

class ImageOut(ImageBase):
    id: str

    class Config:
        from_attributes = True
