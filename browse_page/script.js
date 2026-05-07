// ============================================
// LOAD ADMIN MOVIES INTO MAIN ARRAY
// ============================================
function loadAdminMovies() {
    const adminMovies = JSON.parse(localStorage.getItem('movies')) || [];
    adminMovies.forEach(movie => {
        
        const formatted = {
            title: movie.title,
            rating: parseFloat(movie.rating) || 0,
            year: parseInt(movie.year) || 2024,
            genre: movie.category ? [movie.category.toLowerCase()] : ["drama"],
            poster: movie.poster || movie.img || '',
            duration: movie.duration || 'N/A',
            director: movie.director || 'N/A',
            cast: movie.cast || 'N/A',
            language: movie.language || 'English',
            description: movie.description || 'No description available.'
        };
        // نضيف الفيلم بس لو مش موجود بالفعل
        if (!movies.some(m => m.title === formatted.title)) {
            movies.push(formatted);
        }
    });
}
// ============================================
// MOVIE DATA (FETCHED FROM API)
// ============================================
let movies = [];

async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:8000/movies');
        const data = await response.json();
        movies = data.map(m => ({
            ...m,
            genre: m.genre ? m.genre.split(', ') : []
        }));
        renderMovies();
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// ============================================
// APPLICATION STATE
// ============================================
let currentFilter = 'all';
let searchQuery = '';
let extraLoaded = false;

// ============================================
// DOM ELEMENTS
// ============================================
const moviesGrid = document.getElementById('moviesGrid');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const browseMoreBtn = document.getElementById('browseMoreBtn');

// Modal elements
const movieModal = new bootstrap.Modal(document.getElementById('movieModal'));
const modalTitle = document.getElementById('modalTitle');
const modalTags = document.getElementById('modalTags');
const modalBanner = document.getElementById('modalBanner');
const modalPoster = document.getElementById('modalPoster');
const modalMeta = document.getElementById('modalMeta');
const modalDescription = document.getElementById('modalDescription');
const modalInfoGrid = document.getElementById('modalInfoGrid');
const btnWatchlist = document.getElementById('btnWatchlist');

// ============================================
// UTILITY: FALLBACK IMAGE SVG
// ============================================
function getFallbackSvg(title) {
    const encoded = encodeURIComponent(title);
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E` +
        `%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E` +
        `%3Cstop offset='0%25' stop-color='%23222'/%3E` +
        `%3Cstop offset='100%25' stop-color='%23111'/%3E` +
        `%3C/linearGradient%3E%3C/defs%3E` +
        `%3Crect width='400' height='600' fill='url(%23g)'/%3E` +
        `%3Ctext x='50%25' y='48%25' dominant-baseline='middle' text-anchor='middle' ` +
        `fill='%23555' font-family='Arial,sans-serif' font-size='16'%3E${encoded}%3C/text%3E` +
        `%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' ` +
        `fill='%23333' font-family='Arial,sans-serif' font-size='40'%3E%F0%9F%8E%AC%3C/text%3E` +
        `%3C/svg%3E`;
}

// ============================================
// FIND MOVIE BY ID OR TITLE
// ============================================
function findMovie(title) {
    return movies.find(m => m.title === title) || null;
}

// ============================================
// OPEN MOVIE MODAL
// ============================================
function openMovieDetail(title) {

    const movie = findMovie(title);
    if (!movie) return;

    modalBanner.style.backgroundImage = `url('${movie.poster}')`;

    modalTitle.textContent = movie.title;

    modalTags.innerHTML = movie.genre.join(' - ');

    modalMeta.innerHTML = `
<div class="modal-meta-item">
<i class="bi bi-star-fill"></i>
<span class="meta-value">${movie.rating}/5</span>
</div>

<div class="modal-meta-item">
<i class="bi bi-calendar3"></i>
<span class="meta-value">${movie.year}</span>
</div>

<div class="modal-meta-item">
<i class="bi bi-clock"></i>
<span class="meta-value">${movie.duration}</span>
</div>

<div class="modal-meta-item">
<i class="bi bi-translate"></i>
<span class="meta-value">${movie.language}</span>
</div>
`;

    modalDescription.textContent = movie.description;

    modalInfoGrid.innerHTML = `
<div class="info-grid-item">
<div class="info-grid-label">Director: </div>
<div class="info-grid-value">${movie.director}</div>
</div>

<div class="info-grid-item">
<div class="info-grid-label">Cast: </div>
<div class="info-grid-value">${movie.cast}</div>
</div>
`;

    btnWatchlist.classList.remove('added');
    btnWatchlist.innerHTML = '<i class="bi bi-plus-lg"></i> Watchlist';

    movieModal.show();

}

// ============================================
// RENDER MOVIES
// ============================================
function renderMovies() {
    let filtered = [...movies];

    // Genre filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(movie =>

            movie.genre.some(g =>
                g.replace('-', '').trim().toLowerCase() === currentFilter.toLowerCase()
            )

        );
    }

    // Search filter
    if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(movie =>
            movie.title.toLowerCase().includes(q) ||
            movie.genre.some(g => g.toLowerCase().includes(q)) ||
            movie.year.toString().includes(q) ||
            movie.director.toLowerCase().includes(q) ||
            movie.cast.toLowerCase().includes(q)
        );
    }

    // No results
    if (filtered.length === 0) {
        moviesGrid.innerHTML = '';
        noResults.classList.remove('d-none');
        return;
    }

    noResults.classList.add('d-none');

    // Build cards HTML
    moviesGrid.innerHTML = filtered.map((movie, index) => `
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
            <div class="movie-card" style="animation-delay: ${index * 0.06}s" data-title="${movie.title}">
                <div class="movie-poster-wrapper">
                    <img
                        src="${movie.poster}"
                        alt="${movie.title}"
                        class="movie-poster"
                        loading="lazy"
                        onerror="this.onerror=null; this.src='${getFallbackSvg(movie.title)}';"
                    >
                    <div class="movie-overlay">
                        <button class="overlay-play-btn" title="Play ${movie.title}" aria-label="Play ${movie.title}">
                            <i class="bi bi-play-fill"></i>
                        </button>
                    </div>
                </div>
                <div class="movie-info">
                    <div class="movie-title" title="${movie.title}">${movie.title}</div>
                    <div class="movie-meta">
                        <span class="movie-rating">
                            <i class="bi bi-star-fill"></i> ${movie.rating}/5
                        </span>
                        <span class="movie-year">${movie.year}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Attach click events
    attachCardEvents();
}

// ============================================
// CARD CLICK EVENTS
// ============================================
function attachCardEvents() {
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            // If play button was clicked, handle separately
            if (e.target.closest('.overlay-play-btn')) return;

            const title = this.dataset.title;
            openMovieDetail(title);
        });
    });

    const playBtns = document.querySelectorAll('.overlay-play-btn');
    playBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const card = this.closest('.movie-card');
            const title = card.dataset.title;
            console.log(`Playing: ${title}`);
            // Could open video player here
        });
    });
}

// ============================================
// WATCHLIST TOGGLE & API SYNC
// ============================================
btnWatchlist.addEventListener('click', async function () {
    const title = modalTitle.textContent;
    const movie = findMovie(title);
    if (!movie) return;

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login to manage your watchlist');
        return;
    }

    if (!this.classList.contains('added')) {
        try {
            const response = await fetch(`http://localhost:8000/watchlist/${movie.id}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                this.classList.add('added');
                this.innerHTML = '<i class="bi bi-check-lg"></i> Added to My List';
                this.style.backgroundColor = "#46d369";
            }
        } catch (error) {
            console.error('Error adding to watchlist:', error);
        }
    } else {
        try {
            const response = await fetch(`http://localhost:8000/watchlist/${movie.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                this.classList.remove('added');
                this.innerHTML = '<i class="bi bi-plus-lg"></i> Watchlist';
                this.style.backgroundColor = "var(--accent-red)";
            }
        } catch (error) {
            console.error('Error removing from watchlist:', error);
        }
    }
});

// ============================================
// MODAL PLAY BUTTON
// ============================================
document.querySelector('.btn-modal-play')?.addEventListener('click', function () {
    const title = modalTitle.textContent;
    alert(`Playing: ${title}`);
    movieModal.hide();
});

// ============================================
// MODAL SHARE BUTTON
// ============================================
document.querySelector('.btn-modal-share')?.addEventListener('click', function () {
    const title = modalTitle.textContent;
    if (navigator.share) {
        navigator.share({
            title: `CINEMAX - ${title}`,
            text: `Check out "${title}" on CINEMAX!`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`Check out "${title}" on CINEMAX! ${window.location.href}`).then(() => {
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="bi bi-check-lg"></i>';
            setTimeout(() => {
                this.innerHTML = originalHTML;
            }, 1500);
        });
    }
});

// ============================================
// FILTER BUTTONS
// ============================================
filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.filter;
        renderMovies();
    });
});

// ============================================
// SEARCH INPUT
// ============================================

searchInput.addEventListener('input', function () {
    searchQuery = this.value;
    renderMovies();
});

searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        this.value = '';
        searchQuery = '';
        renderMovies();
        this.blur();
    }
});

// ============================================
// BROWSE MORE BUTTON (REMOVED HARDCODED)
// ============================================
browseMoreBtn.addEventListener('click', function () {
    this.innerHTML = '<i class="bi bi-check-circle-fill"></i> All Loaded';
    this.disabled = true;
});

// ============================================
// USER AUTHENTICATION STATUS
// ============================================
function updateAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navContainer = document.querySelector('.d-flex.align-items-center.gap-4');

    if (currentUser) {
        // User is logged in - show profile info
        navContainer.innerHTML = `
            <a href="mylist.html" class="nav-link-item text-decoration-none">
                <i class="bi bi-plus-square"></i>
                <span>My List</span>
            </a>
            <div class="profile-info">
                <span class="welcome-text">Welcome, ${currentUser.name}!</span>
                <button class="logout-btn" onclick="logout()">Logout</button>
            </div>
        `;
    } else {
        // User not logged in - show login/signup links
        navContainer.innerHTML = `
            <a href="mylist.html" class="nav-link-item text-decoration-none">
                <i class="bi bi-plus-square"></i>
                <span>My List</span>
            </a>
            <a href="login.html" class="nav-link-item text-decoration-none">
                <i class="bi bi-person-circle"></i>
                <span>Login</span>
            </a>
            <a href="signup.html" class="nav-link-item text-decoration-none">
                <i class="bi bi-person-plus"></i>
                <span>Sign Up</span>
            </a>
        `;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    updateAuthStatus();
    alert('Logged out successfully');
}

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileSearchInput = document.getElementById('mobileSearchInput');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('bi-list');
            this.querySelector('i').classList.toggle('bi-x');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.remove('bi-x');
                mobileMenuToggle.querySelector('i').classList.add('bi-list');
            }
        });

        // Sync mobile search with desktop search
        if (mobileSearchInput && searchInput) {
            mobileSearchInput.addEventListener('input', function() {
                searchInput.value = this.value;
                searchQuery = this.value;
                renderMovies();
            });

            searchInput.addEventListener('input', function() {
                mobileSearchInput.value = this.value;
            });
        }
    }
}

// ============================================
// FILTER MOVIES FUNCTION FOR FOOTER LINKS
// ============================================
function filterMovies(genre) {
    currentFilter = genre;
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === genre) {
            btn.classList.add('active');
        }
    });
    renderMovies();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateAuthStatus();
    initMobileMenu();
    fetchMovies();
});

// ============================================
// HERO BUTTONS
// ============================================
document.querySelector('.btn-play')?.addEventListener('click', function () {
    alert('Playing: The Crimson Horizon');
});

document.querySelector('.btn-details')?.addEventListener('click', function () {
    openMovieDetail('The Crimson Horizon');
});