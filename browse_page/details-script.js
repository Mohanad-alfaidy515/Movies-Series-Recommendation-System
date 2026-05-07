document.addEventListener('DOMContentLoaded', function () {
    
    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));


    if (selectedMovie) {
    
        document.getElementById('title').innerText = selectedMovie.title;
        document.getElementById('desc').innerText = selectedMovie.description || "No description available for this movie.";
        document.getElementById('year').innerText = selectedMovie.year || "2024";
        document.getElementById('rating').innerText = (selectedMovie.rating || "4.5") + "/5 Match";

        
        const posterPath = selectedMovie.poster || selectedMovie.img;
        const bgElement = document.getElementById('bg');
        if (posterPath) {
            bgElement.style.backgroundImage = `url('${posterPath}')`;
        }

        
        document.getElementById('subscribeBtn').addEventListener('click', function() {
            window.location.href = 'plans.html';
        });

    } else {
        
        window.location.href = "index.html";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const selectedId = localStorage.getItem('selectedMovieId');
    const allMovies = JSON.parse(localStorage.getItem('movies')) || [];
    
    const movie = allMovies.find(m => m.id == selectedId);

    if (movie) {
        
        document.querySelector('.hero-bg').style.backgroundImage = `url('${movie.poster}')`;
        
       
        document.querySelector('h1').innerText = movie.title;
        document.querySelector('.rating-text').innerText = `${movie.rating}/5`;
        document.querySelector('.year-text').innerText = movie.year;
        document.querySelector('.description-text').innerText = movie.description || "No description available.";
        
        
        if(document.querySelector('.director-info')) {
             document.querySelector('.director-info').innerText = `Director: ${movie.director}`;
        }
    }
});