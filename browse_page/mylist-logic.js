
let myWatchlist = JSON.parse(localStorage.getItem('myWatchlist')) || [];

function renderMyList() {
    const grid = document.getElementById('movies-grid');
    const emptyState = document.getElementById('empty-state');
    const counter = document.getElementById('current-count');

    if (counter) {
        counter.innerText = myWatchlist.length;
    }

    
    if (myWatchlist.length === 0) {
        grid.innerHTML = "";
        emptyState.classList.remove('d-none');
        return;
    }

    emptyState.classList.add('d-none');


    grid.innerHTML = myWatchlist.map(movie => `
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="movie-card-new">
                <img src="${movie.poster}" class="poster-img" alt="${movie.title}">
                <div class="card-body-new">
                    <div class="movie-title-new">${movie.title}</div>

                    <a href="#" class="btn-details-new"
                       onclick="viewDetails('${movie.title.replace(/'/g, "\\'")}')">
                       Details
                    </a>

                    <button class="btn-remove-new"
                       onclick="removeItem('${movie.title.replace(/'/g, "\\'")}')">
                        <i class="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}


function removeItem(title) {
    myWatchlist = myWatchlist.filter(m => m.title !== title);
    localStorage.setItem('myWatchlist', JSON.stringify(myWatchlist));
    renderMyList();
}

// ============================================
// USER AUTHENTICATION STATUS
// ============================================
function updateAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navContainer = document.querySelector('.d-flex.align-items-center.gap-4');

    if (currentUser) {
        // User is logged in - show profile info
        navContainer.innerHTML = `
            <div class="profile-info">
                <span class="welcome-text">Welcome, ${currentUser.name}!</span>
                <button class="logout-btn" onclick="logout()">Logout</button>
            </div>
            <a href="plans.html" class="btn-upgrade-nav">UPGRADE PLAN</a>
        `;
    } else {
        // User not logged in - show login/signup links
        navContainer.innerHTML = `
            <a href="login.html" class="nav-link-item text-decoration-none">
                <i class="bi bi-person-circle"></i>
                <span>Login</span>
            </a>
            <a href="signup.html" class="nav-link-item text-decoration-none">
                <i class="bi bi-person-plus"></i>
                <span>Sign Up</span>
            </a>
            <a href="plans.html" class="btn-upgrade-nav">UPGRADE PLAN</a>
        `;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    updateAuthStatus();
    alert('Logged out successfully');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderMyList();
    updateAuthStatus();
});


function viewDetails(title) {
    const movie = myWatchlist.find(m => m.title === title);
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
    window.location.href = 'details.html';
}
