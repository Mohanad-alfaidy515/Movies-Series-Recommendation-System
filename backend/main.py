from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, database, auth, schemas
from .database import engine, get_db

app = FastAPI(title="CINEMAX API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, specify the frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Database and Seed Data
@app.on_event("startup")
def startup_populate_db():
    # Create tables
    # Note: For MS SQL Server, ensure the database exists.
    try:
        models.Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f"Error creating tables: {e}")
        # If it fails (e.g. no driver), we might still want the app to start
        # so we can see the errors in logs or test other things.

    # Seed initial movies if table is empty
    db = next(get_db())
    if db.query(models.Movie).count() == 0:
        initial_movies = [
            {
                "title": "The Crimson Horizon",
                "rating": 4.8,
                "year": 2024,
                "genre": "sci-fi, action",
                "poster": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop",
                "duration": "2h 05min",
                "director": "Alex Morgan",
                "cast": "Ryan Cooper, Lena Hart, David Cole",
                "language": "English",
                "description": "A thrilling journey through the uncharted territories of the red planet where secrets lie buried deep beneath the dust."
            },
            {
                "title": "Interstellar Void",
                "rating": 4.8,
                "year": 2023,
                "genre": "sci-fi, action",
                "poster": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
                "duration": "2h 28min",
                "director": "James Kowalski",
                "cast": "Ryan Harper, Emma Liu, David Chen",
                "language": "English",
                "description": "When a mysterious signal emanates from the darkest region of space, astronaut Captain Ryan Harper leads a daring expedition beyond the known universe."
            },
            {
                "title": "City of Echoes",
                "rating": 4.5,
                "year": 2022,
                "genre": "drama, horror",
                "poster": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
                "duration": "1h 54min",
                "director": "Sofia Marchetti",
                "cast": "Claire Dupont, Michael Torres, Aisha Rahman",
                "language": "English",
                "description": "In a rain-soaked metropolis where buildings whisper forgotten memories..."
            },
            {
                "title": "Midnight Shadows",
                "rating": 4.2,
                "year": 2024,
                "genre": "horror, drama",
                "poster": "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
                "duration": "1h 47min",
                "director": "Henrik Larsson",
                "cast": "Olivia Byrne, Thomas Crane, Yuki Tanaka",
                "language": "English",
                "description": "After inheriting her grandmother's remote countryside manor..."
            },
            {
                "title": "Digital Frontier",
                "rating": 4.9,
                "year": 2023,
                "genre": "sci-fi, action",
                "poster": "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop",
                "duration": "2h 12min",
                "director": "Alex Reeves",
                "cast": "Jordan Blake, Priya Sharma, Marcus Webb",
                "language": "English",
                "description": "In 2087, the boundary between the physical and digital worlds has dissolved."
            }
            # Add more if needed, but these 5 are enough for seeding
        ]
        for m_data in initial_movies:
            db_movie = models.Movie(**m_data)
            db.add(db_movie)

        # Also seed an admin user
        admin_user = models.User(
            name="Admin User",
            email="admin@cinemax.com",
            hashed_password=auth.get_password_hash("admin123"),
            role="admin"
        )
        db.add(admin_user)

        db.commit()
    db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to CINEMAX API"}

from .routes import router
app.include_router(router)
