document.getElementById('addMovieForm').addEventListener('submit', function(e) {
    e.preventDefault();


    const newMovie = {
        id: Date.now(), 
        title: document.getElementById('movieTitle').value,
        category: document.getElementById('movieCategory').value,
        year: document.getElementById('movieYear').value,
        rating: document.getElementById('movieRating').value,
        duration: document.getElementById('movieDuration').value,
        director: document.getElementById('movieDirector').value,
        language: document.getElementById('movieLanguage').value,
        cast: document.getElementById('movieCast').value,
        poster: document.getElementById('movieImg').value,
        description: document.getElementById('movieDesc').value
    };

    
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.push(newMovie);
    localStorage.setItem('movies', JSON.stringify(movies));

    alert('Movie added successfully! 🎬');
    this.reset(); 
    displayAdminMovies(); 
});


function displayAdminMovies() {
    const list = document.getElementById('adminMoviesList');
    if (!list) return;
    
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    list.innerHTML = movies.map(movie => `
        <div style="background: #222; padding: 10px; margin-bottom: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span><strong>${movie.title}</strong> (${movie.year})</span>
            <button onclick="deleteMovie(${movie.id})" style="background: #e50914; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Delete</button>
        </div>
    `).join('');
}

function deleteMovie(id) {
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies = movies.filter(m => m.id !== id);
    localStorage.setItem('movies', JSON.stringify(movies));
    displayAdminMovies();
}

document.addEventListener('DOMContentLoaded', displayAdminMovies);

document.addEventListener('DOMContentLoaded', function() {
    const code = prompt("Enter Admin Access Code:");
    if (code === "123") {
        displayMoviesForAdmin();
    } else {
        alert("Incorrect code! Redirecting...");
        window.location.href = 'index.html';
    }
});