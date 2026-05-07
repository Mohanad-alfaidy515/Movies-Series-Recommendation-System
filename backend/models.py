from sqlalchemy import Column, Integer, String, Float, ForeignKey, Table
from sqlalchemy.orm import relationship
from .database import Base

watchlist = Table(
    "watchlist",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("movie_id", Integer, ForeignKey("movies.id"), primary_key=True),
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="user") # 'admin' or 'user'

    watchlist_items = relationship("Movie", secondary=watchlist, backref="watchlisted_by")

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True, nullable=False)
    rating = Column(Float, default=0.0)
    year = Column(Integer)
    genre = Column(String(255)) # Comma separated genres
    poster = Column(String(1000))
    duration = Column(String(100))
    director = Column(String(255))
    cast = Column(String(1000))
    language = Column(String(100))
    description = Column(String(2000))
