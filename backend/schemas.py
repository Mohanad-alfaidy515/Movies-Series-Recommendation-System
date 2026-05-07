from pydantic import BaseModel, EmailStr
from typing import List, Optional

class MovieBase(BaseModel):
    title: str
    rating: Optional[float] = 0.0
    year: Optional[int] = None
    genre: Optional[str] = None
    poster: Optional[str] = None
    duration: Optional[str] = None
    director: Optional[str] = None
    cast: Optional[str] = None
    language: Optional[str] = None
    description: Optional[str] = None

class MovieCreate(MovieBase):
    pass

class MovieUpdate(MovieBase):
    title: Optional[str] = None

class MovieOut(MovieBase):
    id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(UserBase):
    id: int
    role: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None
