document.getElementById('addMovieForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login as admin first');
        return;
    }

    const newMovie = {
        title: document.getElementById('movieTitle').value,
        genre: document.getElementById('movieCategory').value,
        year: parseInt(document.getElementById('movieYear').value),
        rating: parseFloat(document.getElementById('movieRating').value),
        duration: document.getElementById('movieDuration').value,
        director: document.getElementById('movieDirector').value,
        language: document.getElementById('movieLanguage').value,
        cast: document.getElementById('movieCast').value,
        poster: document.getElementById('movieImg').value,
        description: document.getElementById('movieDesc').value
    };

    try {
        const response = await fetch('http://localhost:8000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newMovie)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.detail || 'Failed to add movie');
        }

        alert('Movie added successfully! 🎬');
        this.reset();
        displayAdminMovies();
    } catch (error) {
        alert(error.message);
    }
});


async function displayAdminMovies() {
    const list = document.getElementById('adminMoviesList');
    if (!list) return;
    
    try {
        const response = await fetch('http://localhost:8000/movies');
        const movies = await response.json();

        list.innerHTML = movies.map(movie => `
            <div style="background: #222; padding: 10px; margin-bottom: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                <span><strong>${movie.title}</strong> (${movie.year})</span>
                <button onclick="deleteMovie(${movie.id})" style="background: #e50914; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Delete</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error displaying movies:', error);
    }
}

async function deleteMovie(id) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login as admin first');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.detail || 'Failed to delete movie');
        }

        displayAdminMovies();
    } catch (error) {
        alert(error.message);
    }
}

document.addEventListener('DOMContentLoaded', displayAdminMovies);

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        const code = prompt("Enter Admin Access Code:");
        if (code !== "123") {
            alert("Unauthorized access! Redirecting...");
            window.location.href = 'index.html';
        }
    }
});