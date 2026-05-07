from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta
from . import models, schemas, auth, database

router = APIRouter()

# --- Auth Routes ---
@router.post("/auth/signup", response_model=schemas.UserOut)
def signup(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(
        email=user.email,
        name=user.name,
        hashed_password=hashed_password,
        role="user"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/auth/login", response_model=schemas.Token)
def login(user_credentials: schemas.UserLogin, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    if not user or not auth.verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email, "role": user.role}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/auth/me", response_model=schemas.UserOut)
def get_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

# --- Movie Routes ---
@router.get("/movies", response_model=List[schemas.MovieOut])
def get_movies(db: Session = Depends(database.get_db)):
    return db.query(models.Movie).all()

@router.get("/movies/{movie_id}", response_model=schemas.MovieOut)
def get_movie(movie_id: int, db: Session = Depends(database.get_db)):
    movie = db.query(models.Movie).filter(models.Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

@router.post("/movies", response_model=schemas.MovieOut)
def create_movie(movie: schemas.MovieCreate, db: Session = Depends(database.get_db), admin: models.User = Depends(auth.get_current_admin)):
    db_movie = models.Movie(**movie.dict())
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie

@router.put("/movies/{movie_id}", response_model=schemas.MovieOut)
def update_movie(movie_id: int, movie_update: schemas.MovieUpdate, db: Session = Depends(database.get_db), admin: models.User = Depends(auth.get_current_admin)):
    db_movie = db.query(models.Movie).filter(models.Movie.id == movie_id).first()
    if not db_movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    update_data = movie_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_movie, key, value)

    db.commit()
    db.refresh(db_movie)
    return db_movie

@router.delete("/movies/{movie_id}")
def delete_movie(movie_id: int, db: Session = Depends(database.get_db), admin: models.User = Depends(auth.get_current_admin)):
    db_movie = db.query(models.Movie).filter(models.Movie.id == movie_id).first()
    if not db_movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    db.delete(db_movie)
    db.commit()
    return {"message": "Movie deleted successfully"}

# --- Watchlist Routes ---
@router.get("/watchlist", response_model=List[schemas.MovieOut])
def get_watchlist(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    return current_user.watchlist_items

@router.post("/watchlist/{movie_id}")
def add_to_watchlist(movie_id: int, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    movie = db.query(models.Movie).filter(models.Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    if movie in current_user.watchlist_items:
        return {"message": "Movie already in watchlist"}

    current_user.watchlist_items.append(movie)
    db.commit()
    return {"message": "Movie added to watchlist"}

@router.delete("/watchlist/{movie_id}")
def remove_from_watchlist(movie_id: int, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    movie = db.query(models.Movie).filter(models.Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    if movie not in current_user.watchlist_items:
        raise HTTPException(status_code=400, detail="Movie not in watchlist")

    current_user.watchlist_items.remove(movie)
    db.commit()
    return {"message": "Movie removed from watchlist"}
