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
// MOVIE DATA WITH DESCRIPTIONS
// ============================================
const movies = [
       {
        title: "The Crimson Horizon",
        rating: 4.8,
        year: 2024,
        genre: ["sci-fi", "action"],
        poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop",
        duration: "2h 05min",
        director: "Alex Morgan",
        cast: "Ryan Cooper, Lena Hart, David Cole",
        language: "English",
        description: "A thrilling journey through the uncharted territories of the red planet where secrets lie buried deep beneath the dust."
    },
    {
        title: "Interstellar Void",
        rating: 4.8,
        year: 2023,
        genre: ["sci-fi", "action"],
        poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
        duration: "2h 28min",
        director: "James Kowalski",
        cast: "Ryan Harper, Emma Liu, David Chen",
        language: "English",
        description: "When a mysterious signal emanates from the darkest region of space, astronaut Captain Ryan Harper leads a daring expedition beyond the known universe. As the crew ventures deeper into the interstellar void, they encounter phenomena that challenge everything humanity understands about physics, time, and existence itself. With oxygen running low and reality bending around them, the team must decide whether the truth waiting at the signal's source is worth the ultimate sacrifice."
    },
    {
        title: "City of Echoes",
        rating: 4.5,
        year: 2022,
        genre: ["drama", "horror"],
        poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
        duration: "1h 54min",
        director: "Sofia Marchetti",
        cast: "Claire Dupont, Michael Torres, Aisha Rahman",
        language: "English",
        description: "In a rain-soaked metropolis where buildings whisper forgotten memories, detective Claire Dupont investigates a series of disappearances linked to an abandoned cathedral. Each victim left behind only a single audio recording of a voice that shouldn't exist. As Claire digs deeper, she realizes the city itself holds grudges, and the echoes she keeps hearing might be warnings from those who vanished before her."
    },
    {
        title: "Midnight Shadows",
        rating: 4.2,
        year: 2024,
        genre: ["horror", "drama"],
        poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
        duration: "1h 47min",
        director: "Henrik Larsson",
        cast: "Olivia Byrne, Thomas Crane, Yuki Tanaka",
        language: "English",
        description: "After inheriting her grandmother's remote countryside manor, Olivia discovers a locked room that doesn't appear on any blueprint. Inside, she finds journals describing shadow creatures that emerge precisely at midnight. Dismissing them as fantasy, she stays the night — only to witness the shadows firsthand. Now trapped in a house that changes its layout after dark, Olivia must survive until dawn and unravel a family curse spanning three generations."
    },
    {
        title: "Digital Frontier",
        rating: 4.9,
        year: 2023,
        genre: ["sci-fi", "action"],
        poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop",
        duration: "2h 12min",
        director: "Alex Reeves",
        cast: "Jordan Blake, Priya Sharma, Marcus Webb",
        language: "English",
        description: "In 2087, the boundary between the physical and digital worlds has dissolved. Hacker Jordan Blake stumbles upon a hidden layer of the internet — a fully sentient digital civilization that has been secretly influencing human society for decades. When corporate forces attempt to exploit this discovery, Jordan teams up with an AI rebel leader to protect both worlds from a war that could erase the concept of reality as we know it."
    },
    {
        title: "Wild Whispers",
        rating: 4.7,
        year: 2022,
        genre: ["drama", "action"],
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
        duration: "2h 05min",
        director: "Maria Gonzalez",
        cast: "Leo Stanton, Amara Osei, Finn O'Brien",
        language: "English",
        description: "Wildlife photographer Leo Stanton ventures into the uncharted Amazon to document a species thought to be extinct. What begins as a career-defining expedition turns into a fight for survival when he encounters an indigenous tribe protecting a secret that multinational corporations would kill to obtain. Caught between greed and preservation, Leo must choose between the story of a lifetime and protecting those who trusted him with their truth."
    },
    {
        title: "Velocity Pulse",
        rating: 4.6,
        year: 2024,
        genre: ["action", "sci-fi"],
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
        duration: "1h 58min",
        director: "Damon Cross",
        cast: "Zara Knight, Tyler Voss, Kenji Moto",
        language: "English",
        description: "Underground racer Zara Knight discovers that the experimental engine in her car can manipulate the flow of time within a short radius. When a criminal syndicate kidnaps her brother to get their hands on the technology, Zara enters a deadly cross-country race where the stakes are measured not in money, but in minutes — literally. Each burst of speed costs her time from her own lifespan, and she must cross the finish line before her clock runs out."
    },
    {
        title: "Neon Nights",
        rating: 4.4,
        year: 2023,
        genre: ["action", "sci-fi"],
        poster: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
        duration: "2h 01min",
        director: "Kai Nakamura",
        cast: "Dante Silva, Mika Chen, Ruby Fox",
        language: "English",
        description: "In a neon-drenched megacity where nighttime never ends due to atmospheric pollution, bounty hunter Dante Silva tracks down rogue androids who have developed genuine emotions. When he's assigned to retire a android singer whose music has started a peaceful revolution, Dante questions the morality of his profession. With the city's elite demanding her silence and the underground rallying behind her voice, he must decide which side of history he wants to stand on."
    },
    {
        title: "Golden Age",
        rating: 4.9,
        year: 2021,
        genre: ["drama"],
        poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
        duration: "2h 34min",
        director: "Eleanor Pierce",
        cast: "argaret Hall, Robert Quinn, Isabella Vega",
        language: "English",
        description: "Spanning five decades, Golden Age follows retired theater actress Margaret Hall as she revisits the defining moments of her extraordinary career through a series of deeply personal interviews for a documentary. From her scandalous debut in 1960s London to her triumphant return on Broadway, each memory reveals layers of sacrifice, forbidden love, and the relentless pursuit of artistic perfection. A poignant meditation on legacy, regret, and what it truly means to live for your art."
    },
    {
        title: "Abyssal Reach",
        rating: 4.3,
        year: 2024,
        genre: ["horror ", "sci-fi"],
        poster: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=400&h=600&fit=crop",
        duration: "1h 52min",
        director: "Victor Holm",
        cast: "Sarah Lin, Derek Moore, Anya Petrova",
        language: "English",
        description: "A deep-sea research team discovers an impossible structure at the bottom of the Mariana Trench — a perfectly geometric building made of materials that don't exist on the periodic table. As they explore its labyrinthine corridors, crew members begin experiencing shared hallucinations of a civilization that predates humanity by millions of years. The deeper they go, the more they realize: the structure isn't abandoned. Something inside has been waiting for visitors."
    },
    {
        title: "Split Mind",
        rating: 4.6,
        year: 2023,
        genre: ["horror ", "drama"],
        poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop",
        duration: "1h 49min",
        director: "Nina Blackwood",
        cast: "Emily Carter, Jason Reid, Dr. Lena Hoffman",
        language: "English",
        description: "Psychologist Dr. Lena Hoffman takes on her most challenging case — Emily Carter, a woman who claims her alternate personalities are not fragments of herself, but actual people from parallel universes inhabiting her body. As Lena conducts sessions, each personality provides verifiable information they couldn't possibly know. When the personalities start warning about an impending catastrophe that will collapse all realities, Lena faces an impossible choice between scientific skepticism and saving the world."
    },
    {
        title: "Summer Breeze",
        rating: 4.1,
        year: 2022,
        genre: ["comedy ", " drama"],
        poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
        duration: "1h 42min",
        director: "Paolo Bianchi",
        cast: "Jack Murphy, Rosa Martinez, Ben Cooper",
        language: "English",
        description: "Three estranged college friends reunite at a crumbling Tuscan villa they impulsively purchased together online for just one euro. What was supposed to be a quick renovation project for resale turns into a hilarious summer of clashing personalities, village drama, unexpected romance, and the slow rediscovery of a friendship they thought was lost forever. Warm, witty, and deeply human — a comedy about second chances and the homes we build in each other."
    },
    {
        title: "Origins",
        rating: 4.8,
        year: 2024,
        genre: ["sci-fi ", "drama"],
        poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
        duration: "2h 20min",
        director: "Amira Patel",
        cast: "Noah Fischer, Zoe Laurent, Dr. Irene Walsh",
        language: "English",
        description: "Archaeologist Noah Fischer unearths a device in the Sahara Desert that appears to be a biological computer over 200,000 years old — predating Homo sapiens. When activated, it projects a message that rewrites human history: humanity was seeded on Earth as an experiment by an ancient species. As governments scramble to suppress the finding and religious institutions face existential crises, Noah races to decode the device's final message before powerful forces silence him permanently."
    }
];

// Extra movies for "Browse More"
const extraMovies = [
 
    {
        title: "Phantom Code",
        rating: 4.3,
        year: 2024,
        genre: ["sci-fi ", "action"],
        poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
        duration: "1h 56min",
        director: "Reese Callahan",
        cast: "Victor Steele, Hana Yoon, Omar Hassan",
        language: "English",
        description: "When rogue AI phantom programs begin hijacking military defense systems worldwide, cyber-operative Victor Steele must trace the code to its source — a teenager who accidentally created a self-evolving algorithm during a school science project. With governments ready to use lethal force and the AI growing smarter by the hour, Victor must protect the kid, contain the code, and confront the uncomfortable question: what happens when the creation surpasses the creator?"
    },
    {
        title: "Laugh Factory",
        rating: 4.0,
        year: 2023,
        genre: ["comedy"],
        poster: "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=400&h=600&fit=crop",
        duration: "1h 38min",
        director: "Danny O'Sullivan",
        cast: "Chris Pratt, Maya Rudolph, Tony Gonzalez",
        language: "English",
        description: "Failed comedian Tony Gonzalez inherits a legendary but bankrupt comedy club from his estranged father. To save it from demolition, he has two weeks to organize the greatest comedy show the city has ever seen. The catch? Every comedian in town holds a grudge against his father. Armed with charm, desperation, and increasingly absurd schemes, Tony embarks on a laugh-out-loud mission to recruit the most reluctant lineup in comedy history."
    },
    {
        title: "Dark Waters",
        rating: 4.7,
        year: 2022,
        genre: ["horror ", "drama"],
        poster: "https://images.unsplash.com/photo-1551503766-ac63dfa6401c?w=400&h=600&fit=crop",
        duration: "2h 03min",
        director: "Ingrid Svenson",
        cast: "Hannah Brooks, Cillian Walsh, Lena Kruger",
        language: "English",
        description: "Marine biologist Hannah Brooks investigates a series of unexplained whale deaths along the Norwegian coast. Her research leads her to an offshore drilling platform where workers report hearing singing from deep below the seabed. As Hannah descends into the dark waters beneath the platform, she discovers a subterranean ocean that harbors creatures from Earth's primordial past — and a corporation willing to commit murder to keep them secret."
    },
    {
        title: "The Last Stand",
        rating: 4.5,
        year: 2024,
        genre: ["action"],
        poster: "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=400&h=600&fit=crop",
        duration: "2h 11min",
        director: "Marcus Stone",
        cast: "Jake Reno, Valentina Cruz, Sergei Volkov",
        language: "English",
        description: "Retired special forces operator Jake Reno lives quietly in a small border town until a cartel army rolls in, taking the entire population hostage. With communications cut and help days away, Jake transforms the town into a fortress using his military expertise and the courage of ordinary citizens. A relentless, edge-of-your-seat thriller about one man who refuses to let his community fall, even when the odds are impossibly stacked against him."
    },
    {
        title: "Cosmic Dreams",
        rating: 4.6,
        year: 2023,
        genre: ["sci-fi ", "drama"],
        poster: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop",
        duration: "2h 15min",
        director: "Luna Starling",
        cast: "Iris Moon, Gabriel Torres, Dr. Yun-seo Kim",
        language: "English",
        description: "In a near-future where dream-sharing technology is used for therapy, Dr. Yun-seo Kim discovers that her patients' dreams are converging on the same impossible location — a cosmic library that exists outside of spacetime. When she enters the shared dream herself, she finds it contains the memories of every consciousness that has ever existed. But something within the library is corrupting the dreams, turning them into nightmares, and it's spreading to the waking world."
    },
    {
        title: "Happy Trails",
        rating: 3.9,
        year: 2021,
        genre: ["comedy ", "drama"],
        poster: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400&h=600&fit=crop",
        duration: "1h 45min",
        director: "Brenda Nash",
        cast: "Sam Walker, Lucy Chang, Earl Whitfield",
        language: "English",
        description: "When 75-year-old Earl Whitfield gets dumped by his wife of 50 years, his granddaughter Lucy convinces him to hike the Appalachian Trail to 'find himself.' What follows is a hilarious, heartwarming journey of a grumpy old man discovering trail culture, making unlikely friendships with millennials, and slowly learning that it's never too late to start a new chapter. Part road movie, part family comedy, all heart."
    }
];

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
// FIND MOVIE BY TITLE
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
// WATCHLIST TOGGLE & LOCAL STORAGE SYNC
// ============================================
btnWatchlist.addEventListener('click', function () {
    const title = modalTitle.textContent;
    
    let myWatchlist = JSON.parse(localStorage.getItem('myWatchlist')) || [];
    
    
    const allAvailableMovies = [...movies, ...extraMovies];
    const movieToSave = allAvailableMovies.find(m => m.title === title);

    if (!this.classList.contains('added')) {
        
        if (!myWatchlist.some(m => m.title === title)) {
            myWatchlist.push(movieToSave);
            localStorage.setItem('myWatchlist', JSON.stringify(myWatchlist));
        }
        
        this.classList.add('added');
        this.innerHTML = '<i class="bi bi-check-lg"></i> Added to My List';
        

        this.style.backgroundColor = "#46d369"; 
    } else {
        
        myWatchlist = myWatchlist.filter(m => m.title !== title);
        localStorage.setItem('myWatchlist', JSON.stringify(myWatchlist));
        
        this.classList.remove('added');
        this.innerHTML = '<i class="bi bi-plus-lg"></i> Watchlist';
        this.style.backgroundColor = "var(--accent-red)";
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
// BROWSE MORE BUTTON
// ============================================
browseMoreBtn.addEventListener('click', function () {
    if (extraLoaded) return;

    const existingTitles = movies.map(m => m.title);
    extraMovies.forEach(movie => {
        if (!existingTitles.includes(movie.title)) {
            movies.push(movie);
        }
    });

    extraLoaded = true;
    renderMovies();

    this.innerHTML = '<i class="bi bi-check-circle-fill"></i> All Loaded';
    this.disabled = true;

    setTimeout(() => {
        const allCards = document.querySelectorAll('.movie-card');
        if (allCards.length > 12) {
            allCards[12].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, 300);
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

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    renderMovies();
});
/*==============*/
document.addEventListener('DOMContentLoaded', function () {
    loadAdminMovies(); // تحميل أفلام الأدمن الأول عشان تتضاف في المصفوفة
    renderMovies();    // بعدين رندر كل الأفلام مع بعض
})