/* ==========================================================================
   BLUE SKY OTT - CORE JAVASCRIPT
   ========================================================================== */

// 1. App State
const state = {
  userName: '',
  activeTab: 'all', // all, tv, movies, sports
  searchQuery: '',
  carouselIndex: 0,
  carouselTimer: null,
  // Simulated Video Player state
  playerPlaying: false,
  playerDuration: 135, // in seconds (2h 15m)
  playerCurrentTime: 0,
  playerVolume: 80,
  playerMuted: false,
  playerInterval: null,
  currentItem: null
};

// 2. Media Database
const mediaData = [
  // --- SPORTS (Landscape Cards) ---
  {
    id: 'sport_1',
    type: 'sports',
    subType: 'live',
    title: 'India vs Pakistan - Asia Cup 2026',
    subtitle: 'Live • Cricket Stadium, Colombo',
    description: 'High-octane Asia Cup clash between arch-rivals India and Pakistan. Live scorecard updating from the field. Catch all the wickets, boundaries, and premium match action.',
    image: 'https://images.unsplash.com/photo-1531415080290-bc98545bab3c?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1531415080290-bc98545bab3c?auto=format&fit=crop&w=1200&q=80',
    rating: 'Live Match',
    year: '2026',
    duration: 'T20 Match',
    genres: 'Cricket • International • Live Sports',
    cast: 'Virat Kohli, Rohit Sharma, Babar Azam, Shaheen Afridi',
    liveScores: 'IND 158/3 (16.4 Overs) | Kohli 62*(41), Shaheen 2/32',
    isHero: true,
    heroLabel: 'Live Now'
  },
  {
    id: 'sport_2',
    type: 'sports',
    subType: 'live',
    title: 'Manchester United vs Liverpool',
    subtitle: 'Live • Old Trafford Stadium',
    description: 'The historic English football rivalry resumes live at Old Trafford. Liverpool is attacking aggressively while Man United holds a narrow lead in the second half.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    rating: 'Live Match',
    year: '2026',
    duration: '90 Mins',
    genres: 'Football • Premier League • Live Sports',
    cast: 'Bruno Fernandes, Marcus Rashford, Mohamed Salah, Luis Diaz',
    liveScores: 'MUN 2 - 1 LIV (82nd Min) | Salah 42\', Rashford 12\', Bruno 66\'(P)',
    isHero: true,
    heroLabel: 'Live Now'
  },
  {
    id: 'sport_3',
    type: 'sports',
    subType: 'live',
    title: 'Wimbledon Finals - Men\'s Singles',
    subtitle: 'Live • Centre Court, London',
    description: 'The pinnacle of grass court tennis. Carlos Alcaraz battles against the legendary Novak Djokovic in a thrilling five-setter masterpiece.',
    image: 'https://images.unsplash.com/photo-1622279457486-62dce4a4953f?auto=format&fit=crop&w=800&q=80',
    rating: 'Live Match',
    year: '2026',
    duration: 'Set 5',
    genres: 'Tennis • Grand Slam • Tournament',
    cast: 'Carlos Alcaraz, Novak Djokovic',
    liveScores: 'Alcaraz 2 - 2 Djokovic | 6-4, 5-7, 6-3, 3-6, 4-2'
  },
  {
    id: 'sport_4',
    type: 'sports',
    subType: 'replay',
    title: 'Real Madrid vs Barcelona - La Liga Replay',
    subtitle: 'Replay • El Clasico Highlights',
    description: 'Missed El Clasico? Catch the full premium replay and extended highlights of the most watched club football match on earth.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    rating: 'Highlights',
    year: '2026',
    duration: '22 Mins',
    genres: 'Football • La Liga • Spanish Club',
    cast: 'Vinicius Jr, Jude Bellingham, Robert Lewandowski, Pedri'
  },
  {
    id: 'sport_5',
    type: 'sports',
    subType: 'replay',
    title: 'Pro Kabaddi League - Panthers vs Mumba',
    subtitle: 'Highlights • High Speed Action',
    description: 'A spectacular raiding display by Jaipur Pink Panthers clinches a last-second victory against U Mumba in an adrenaline-filled contest.',
    image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&w=800&q=80',
    rating: 'Highlights',
    year: '2026',
    duration: '15 Mins',
    genres: 'Kabaddi • League Match • Indian Sports',
    cast: 'Arjun Deshwal, Guman Singh, Sunil Kumar'
  },

  // --- MOVIES (Portrait Cards) ---
  {
    id: 'movie_1',
    type: 'movies',
    title: 'The Nebula Project',
    subtitle: 'Sci-Fi • Blockbuster Movie',
    description: 'A daring expedition travels deep into an uncharted cosmic nebula to retrieve a forgotten energy source, discovering a complex alien biosphere in the process.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
    rating: 'IMDb 8.9',
    year: '2026',
    duration: '2h 15m',
    genres: 'Sci-Fi • Action • Space Adventure',
    cast: 'Jessica Chastain, Matthew McConaughey, Timothee Chalamet',
    isHero: true,
    heroLabel: 'Trending Movie'
  },
  {
    id: 'movie_2',
    type: 'movies',
    title: 'Echoes of Silence',
    subtitle: 'Mystery Thriller',
    description: 'An acoustic scientist investigating whale migrations in the deep arctic records a mysterious frequency sequence that seems to anticipate cataclysmic seismic events.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 8.2',
    year: '2025',
    duration: '1h 58m',
    genres: 'Mystery • Thriller • Drama',
    cast: 'Cillian Murphy, Emily Blunt, Florence Pugh'
  },
  {
    id: 'movie_3',
    type: 'movies',
    title: 'Neon Dreams',
    subtitle: 'Cyberpunk Action',
    description: 'In the dystopian streets of Tokyo 2099, a cybernetically enhanced mercenary searches for a lost hard drive containing code that can shut down the ruling corporate AI.',
    image: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 7.8',
    year: '2026',
    duration: '2h 05m',
    genres: 'Cyberpunk • Action • Thriller',
    cast: 'Keanu Reeves, Ana de Armas, Simu Liu'
  },
  {
    id: 'movie_4',
    type: 'movies',
    title: 'The Last Guardian',
    subtitle: 'High Fantasy Epic',
    description: 'A young squire is chosen by the last living dragon to protect the legendary golden core from a rising shadow army led by a corrupted sorcerer.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 8.5',
    year: '2025',
    duration: '2h 32m',
    genres: 'Fantasy • Adventure • Drama',
    cast: 'Ian McKellen, Cate Blanchett, Tom Holland'
  },
  {
    id: 'movie_5',
    type: 'movies',
    title: 'Love in Tokyo',
    subtitle: 'Romance & Drama',
    description: 'An American travel writer and a Japanese landscape architect find their worlds colliding over the course of one cherry blossom week in beautiful Tokyo.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 7.4',
    year: '2025',
    duration: '1h 45m',
    genres: 'Romance • Drama • Travel',
    cast: 'Emma Stone, Ken Watanabe, Steven Yeun'
  },

  // --- TV SHOWS (Portrait Cards) ---
  {
    id: 'show_1',
    type: 'tv',
    title: 'Shadow Symphony',
    subtitle: 'Crime Drama Series',
    description: 'A classic detective and a brilliant street musician form an unlikely alliance to solve a series of mysterious orchestra-themed murders plaguing the elite of Vienna.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=1200&q=80',
    rating: 'IMDb 8.7',
    year: '2026',
    duration: 'Season 1 • 8 Episodes',
    genres: 'Crime • Mystery • Thriller',
    cast: 'Benedict Cumberbatch, Jenna Ortega, Mads Mikkelsen',
    isHero: true,
    heroLabel: 'Hot New Series'
  },
  {
    id: 'show_2',
    type: 'tv',
    title: 'Cyber City',
    subtitle: 'Anime Series',
    description: 'A young hacker gets recruited by a rebel cell looking to expose the digital class divide inside the glowing cyberpunk megacity Neo-Seoul.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 8.6',
    year: '2025',
    duration: 'Season 2 • 12 Episodes',
    genres: 'Anime • Sci-Fi • Action',
    cast: 'Mamoru Miyano, Yuki Kaji, Kana Hanazawa'
  },
  {
    id: 'show_3',
    type: 'tv',
    title: 'House of Gold',
    subtitle: 'Historical Drama',
    description: 'An epic dynastic drama charting the rise and fall of a powerful banking family in 15th-century Florence during the height of the Renaissance.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 8.1',
    year: '2026',
    duration: 'Season 1 • 10 Episodes',
    genres: 'History • Drama • Politics',
    cast: 'Mads Mikkelsen, Pedro Pascal, Rebecca Ferguson'
  },
  {
    id: 'show_4',
    type: 'tv',
    title: 'Chef\'s Kitchen',
    subtitle: 'Culinary Reality Show',
    description: 'World-renowned chefs compete in high-pressure culinary challenges to earn a partnership at a three-Michelin-starred restaurant.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 7.9',
    year: '2025',
    duration: 'Season 4 • 14 Episodes',
    genres: 'Reality • Food • Competition',
    cast: 'Gordon Ramsay, Massimo Bottura'
  },
  {
    id: 'show_5',
    type: 'tv',
    title: 'Code Red',
    subtitle: 'Cyber Action Comedy',
    description: 'When a small-town veterinary clinic accidentally downloads government espionage software, the local vets become highly targets of international agencies.',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 7.5',
    year: '2026',
    duration: 'Season 1 • 6 Episodes',
    genres: 'Comedy • Action • Tech',
    cast: 'Ryan Reynolds, Awkwafina, Jack Black'
  },

  // --- ORIGINALS (Portrait Cards with Special Badges) ---
  {
    id: 'original_1',
    type: 'originals',
    title: 'Rising Star: The Kohli Story',
    subtitle: 'Documentary Special',
    description: 'An exclusive look into Virat Kohli\'s mental and physical training routines, childhood struggles, and his rise to international cricketing glory.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    rating: 'Originals',
    year: '2026',
    duration: '1h 32m',
    genres: 'Documentary • Cricket • Biography',
    cast: 'Virat Kohli, Sachin Tendulkar, Anushka Sharma'
  },
  {
    id: 'original_2',
    type: 'originals',
    title: 'Into the Abyss',
    subtitle: 'Nature Exploration Series',
    description: 'Explore the deepest trenches of our oceans to discover fluorescent creature life forms and underwater volcanic networks never captured before in 4K.',
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
    rating: 'Originals',
    year: '2025',
    duration: 'Season 1 • 5 Episodes',
    genres: 'Nature • Science • Adventure',
    cast: 'David Attenborough'
  },
  {
    id: 'original_3',
    type: 'originals',
    title: 'Comedy Night Live',
    subtitle: 'Stand-up Comedy Showcase',
    description: 'Blue Sky\'s flagship stand-up series bringing together the funniest comedians from across the country for a night of absolute laughter.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=800&q=80',
    rating: 'Originals',
    year: '2026',
    duration: '1h 15m',
    genres: 'Comedy • Standup • Stage',
    cast: 'Zakir Khan, Abhishek Upmanyu, Kanan Gill'
  },
  {
    id: 'original_4',
    type: 'originals',
    title: 'Virtual Reality',
    subtitle: 'Technology Docuseries',
    description: 'Delve into the future of humanity, examining how spatial computing, quantum intelligence, and simulated realities are redesigning our daily lives.',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80',
    rating: 'Originals',
    year: '2026',
    duration: 'Season 1 • 6 Episodes',
    genres: 'Technology • Science • Future',
    cast: 'Mark Zuckerberg, Palmer Luckey, Demis Hassabis'
  }
];

// 3. Initialization & Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is already signed in
  const savedName = localStorage.getItem('bluesky_username');
  if (savedName) {
    state.userName = savedName;
    switchToDashboard();
  }
  
  // Set up profile dropdown triggers
  const profileBtn = document.getElementById('profile-dropdown-btn');
  const dropdownMenu = document.getElementById('profile-dropdown-menu');
  if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    if (dropdownMenu) dropdownMenu.classList.remove('show');
  });

  // Logo home button click
  const logoBtn = document.getElementById('header-logo-btn');
  if (logoBtn) {
    logoBtn.addEventListener('click', () => {
      resetFilters();
    });
  }

  // Set up navigation tab listeners
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');
      const category = e.target.getAttribute('data-category');
      handleCategoryFilter(category);
    });
  });

  // Set up dynamic search typing filter
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      if (state.searchQuery) {
        clearSearchBtn.classList.remove('hidden');
      } else {
        clearSearchBtn.classList.add('hidden');
      }
      filterContent();
    });
  }

  // Clear search trigger
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      filterContent();
    });
  }

  // Reset filter button
  const resetBtn = document.getElementById('reset-filters-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetFilters();
    });
  }

  // Hero carousel control buttons
  document.getElementById('carousel-prev-btn').addEventListener('click', () => moveCarousel(-1));
  document.getElementById('carousel-next-btn').addEventListener('click', () => moveCarousel(1));

  // Modal setup
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  document.getElementById('modal-close-backdrop').addEventListener('click', closeModal);

  // Custom Video Player events
  setupPlayerEvents();
});

// 4. Welcome Screen Name Submit Handler
function handleNameSubmit() {
  const nameInput = document.getElementById('username-input');
  const name = nameInput.value.trim();
  if (name.length < 2) return;

  state.userName = name;
  localStorage.setItem('bluesky_username', name);
  
  // Transition styling
  const welcomeScreen = document.getElementById('welcome-screen');
  welcomeScreen.classList.add('fade-out');
  
  setTimeout(() => {
    welcomeScreen.classList.add('hidden');
    switchToDashboard();
  }, 600);
}

// Switch view screen
function switchToDashboard() {
  // Update names in the UI
  document.getElementById('user-display-name').textContent = state.userName;
  document.getElementById('dropdown-display-name').textContent = state.userName;
  document.getElementById('avatar-initial').textContent = state.userName.charAt(0).toUpperCase();

  // Show dashboard container
  const dashboard = document.getElementById('main-dashboard');
  dashboard.classList.remove('hidden');

  // Load content
  initCarousel();
  renderDashboardRows();
}

// Logout & profile adjustments
function changeName() {
  localStorage.removeItem('bluesky_username');
  location.reload();
}

function logout() {
  localStorage.removeItem('bluesky_username');
  location.reload();
}

// 5. Hero Widescreen Carousel Setup
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const indicators = document.getElementById('carousel-indicators');
  
  // Get items tagged for hero banner
  const heroItems = mediaData.filter(item => item.isHero);
  
  track.innerHTML = '';
  indicators.innerHTML = '';

  heroItems.forEach((item, index) => {
    // Generate slide
    const slide = document.createElement('div');
    slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
    slide.innerHTML = `
      <img src="${item.bannerImage || item.image}" alt="${item.title}" class="carousel-image">
      <div class="carousel-overlay">
        <div class="slide-category">
          ${item.subType === 'live' ? '<span class="live-indicator"></span>' : ''}
          ${item.heroLabel || item.type}
        </div>
        <h1 class="slide-title">${item.title}</h1>
        <p class="slide-description">${item.description}</p>
        <div class="slide-buttons">
          <button class="btn-watch" onclick="openDetails('${item.id}')">
            <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><path d="M8 5v14l11-7z"></path></svg>
            Play Now
          </button>
          <button class="btn-watchlist" onclick="toggleWatchlist('${item.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Watchlist
          </button>
        </div>
      </div>
    `;
    track.appendChild(slide);

    // Generate indicator dot
    const indicator = document.createElement('button');
    indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
    indicator.addEventListener('click', () => setCarouselSlide(index));
    indicators.appendChild(indicator);
  });

  state.carouselIndex = 0;
  startCarouselAutoSlide();

  // Stop auto slide on hover
  const container = document.getElementById('hero-carousel-container');
  container.addEventListener('mouseenter', stopCarouselAutoSlide);
  container.addEventListener('mouseleave', startCarouselAutoSlide);
}

function startCarouselAutoSlide() {
  stopCarouselAutoSlide();
  state.carouselTimer = setInterval(() => {
    moveCarousel(1);
  }, 5000);
}

function stopCarouselAutoSlide() {
  if (state.carouselTimer) {
    clearInterval(state.carouselTimer);
    state.carouselTimer = null;
  }
}

function moveCarousel(direction) {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');
  if (slides.length === 0) return;

  slides[state.carouselIndex].classList.remove('active');
  indicators[state.carouselIndex].classList.remove('active');

  state.carouselIndex = (state.carouselIndex + direction + slides.length) % slides.length;

  slides[state.carouselIndex].classList.add('active');
  indicators[state.carouselIndex].classList.add('active');
}

function setCarouselSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');
  if (slides.length === 0) return;

  slides[state.carouselIndex].classList.remove('active');
  indicators[state.carouselIndex].classList.remove('active');

  state.carouselIndex = index;

  slides[state.carouselIndex].classList.add('active');
  indicators[state.carouselIndex].classList.add('active');
}

// 6. Dynamic Dashboard Rows Generation
function renderDashboardRows() {
  const container = document.getElementById('rows-container');
  container.innerHTML = '';

  const rows = [
    { title: '🔴 Live Sports Action', category: 'sports', filterKey: 'sports' },
    { title: '🔥 Blockbuster Movies', category: 'movies', filterKey: 'movies' },
    { title: '📺 Popular TV Series', category: 'tv', filterKey: 'tv' },
    { title: '🌌 Blue Sky Originals', category: 'originals', filterKey: 'originals' }
  ];

  rows.forEach(row => {
    // If active tab doesn't match and tab is not 'all', skip row
    if (state.activeTab !== 'all' && state.activeTab !== row.filterKey) {
      return;
    }

    // Filter items for this row
    const items = mediaData.filter(item => item.type === row.filterKey);
    if (items.length === 0) return;

    // Create row structure
    const rowEl = document.createElement('div');
    rowEl.className = 'category-row';
    rowEl.innerHTML = `
      <div class="row-header">
        <h2 class="row-title">${row.title}</h2>
      </div>
      <div class="cards-container">
        <!-- Cards loaded dynamically -->
      </div>
    `;

    const cardsContainer = rowEl.querySelector('.cards-container');

    items.forEach(item => {
      const card = document.createElement('div');
      
      if (item.type === 'sports') {
        card.className = 'media-card landscape';
        card.innerHTML = `
          <div class="card-img-wrapper">
            <img src="${item.image}" alt="${item.title}">
            <div class="card-overlay">
              <div class="card-details">
                <span class="card-badge ${item.subType === 'live' ? 'live' : 'replay'}">${item.subType === 'live' ? 'Live' : 'Replay'}</span>
                <p class="card-title">${item.title}</p>
                <p class="card-subtitle">${item.subtitle}</p>
                ${item.liveScores ? `<div class="live-scores"><span class="live-indicator"></span> <span>${item.liveScores}</span></div>` : ''}
              </div>
            </div>
          </div>
        `;
      } else {
        card.className = 'media-card portrait';
        card.innerHTML = `
          <div class="card-img-wrapper">
            <img src="${item.image}" alt="${item.title}">
            <div class="card-overlay">
              <div class="card-details">
                <span class="card-badge premium">${item.type === 'originals' ? 'Original' : item.rating}</span>
                <p class="card-title">${item.title}</p>
                <p class="card-subtitle">${item.genres.split('•')[0]}</p>
              </div>
            </div>
          </div>
        `;
      }

      card.addEventListener('click', () => openDetails(item.id));
      cardsContainer.appendChild(card);
    });

    container.appendChild(rowEl);
  });
}

// 7. Filtering and Search Logic
function handleCategoryFilter(category) {
  state.activeTab = category;
  
  // Clear search query on category switch
  state.searchQuery = '';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  document.getElementById('clear-search-btn').classList.add('hidden');
  document.getElementById('results-header').classList.add('hidden');

  const heroSection = document.getElementById('hero-carousel-container');
  if (heroSection) {
    if (category === 'all') {
      heroSection.classList.remove('hidden');
      startCarouselAutoSlide();
    } else {
      heroSection.classList.add('hidden');
      stopCarouselAutoSlide();
    }
  }

  renderDashboardRows();
}

function filterContent() {
  const query = state.searchQuery.toLowerCase();
  const resultsHeader = document.getElementById('results-header');
  const searchQueryText = document.getElementById('search-query-text');
  const heroSection = document.getElementById('hero-carousel-container');
  const rowsContainer = document.getElementById('rows-container');

  if (!query) {
    // If search is empty, reset back to normal tab layout
    resultsHeader.classList.add('hidden');
    if (state.activeTab === 'all') {
      heroSection.classList.remove('hidden');
      startCarouselAutoSlide();
    }
    renderDashboardRows();
    return;
  }

  // Hide carousel when searching
  heroSection.classList.add('hidden');
  stopCarouselAutoSlide();
  
  // Show search results indicator
  resultsHeader.classList.remove('hidden');
  searchQueryText.textContent = state.searchQuery;

  // Filter items matching name, description, tags, cast
  const filtered = mediaData.filter(item => {
    return (
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.genres.toLowerCase().includes(query) ||
      (item.cast && item.cast.toLowerCase().includes(query))
    );
  });

  // Display matching items in a Grid layout
  rowsContainer.innerHTML = '';
  
  if (filtered.length === 0) {
    rowsContainer.innerHTML = `
      <div style="text-align: center; padding: 80px 20px; color: var(--text-secondary);">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 60px; height: 60px; color: var(--text-muted); margin-bottom: 15px;">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3 style="color: var(--text-primary); font-family: var(--font-title); margin-bottom: 8px;">No Results Found</h3>
        <p style="font-size: 14px;">We couldn't find any match for your search. Try checking your spelling or search other categories.</p>
      </div>
    `;
    return;
  }

  // Generate matching grid row
  const rowEl = document.createElement('div');
  rowEl.className = 'category-row';
  rowEl.innerHTML = `
    <div class="row-header">
      <h2 class="row-title">Search Results (${filtered.length})</h2>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; padding: 15px 0;">
      <!-- Grid items loaded -->
    </div>
  `;

  const gridContainer = rowEl.querySelector('div:nth-child(2)');

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'media-card landscape'; // use landscape for consistency in grid
    card.style.width = '100%';
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${item.image}" alt="${item.title}">
        <div class="card-overlay">
          <div class="card-details">
            <span class="card-badge premium">${item.type.toUpperCase()}</span>
            <p class="card-title">${item.title}</p>
            <p class="card-subtitle">${item.subtitle}</p>
          </div>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openDetails(item.id));
    gridContainer.appendChild(card);
  });

  rowsContainer.appendChild(rowEl);
}

function resetFilters() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  state.searchQuery = '';
  document.getElementById('clear-search-btn').classList.add('hidden');
  document.getElementById('results-header').classList.add('hidden');
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(l => l.classList.remove('active'));
  if (navLinks[0]) navLinks[0].classList.add('active');
  
  state.activeTab = 'all';
  
  const heroSection = document.getElementById('hero-carousel-container');
  if (heroSection) {
    heroSection.classList.remove('hidden');
    startCarouselAutoSlide();
  }
  
  renderDashboardRows();
}

function toggleWatchlist(itemId) {
  const item = mediaData.find(m => m.id === itemId);
  if (!item) return;
  
  // Custom watchlist notifications
  const btn = document.querySelector(`.carousel-slide.active .btn-watchlist`) || 
              document.querySelector(`.btn-watchlist`);
  if (btn) {
    if (btn.classList.contains('added')) {
      btn.classList.remove('added');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Watchlist`;
    } else {
      btn.classList.add('added');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;color:#22c55e;"><polyline points="20 6 9 17 4 12"></polyline></svg> Added`;
    }
  }
}

// 8. Detailed Modal Handlers
function openDetails(itemId) {
  const item = mediaData.find(m => m.id === itemId);
  if (!item) return;

  state.currentItem = item;
  
  // Populate details
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-rating').textContent = item.rating;
  document.getElementById('modal-year').textContent = item.year;
  document.getElementById('modal-duration').textContent = item.duration;
  document.getElementById('modal-genres').textContent = item.genres;
  document.getElementById('modal-description').textContent = item.description;
  document.getElementById('modal-cast').textContent = item.cast || 'N/A';
  
  // Set up player background poster
  const posterBg = document.getElementById('player-poster-bg');
  posterBg.style.backgroundImage = `url('${item.bannerImage || item.image}')`;
  document.getElementById('player-tag').textContent = item.type === 'sports' ? 'Live Sports' : 'Blue Sky Premium';
  
  // Pause any background auto-scrolling
  stopCarouselAutoSlide();

  // Reset player variables
  resetPlayerState();

  // Load Similar Content recommendations
  renderSimilarContent(item);

  // Show Modal
  const modal = document.getElementById('detail-modal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeModal() {
  const modal = document.getElementById('detail-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = ''; // Unlock scroll
  
  // Reset and pause player state
  pauseVideo();
  resetPlayerState();

  // Resume carousel if on main dashboard
  if (state.activeTab === 'all' && !state.searchQuery) {
    startCarouselAutoSlide();
  }
}

function renderSimilarContent(currentItem) {
  const grid = document.getElementById('similar-grid');
  grid.innerHTML = '';

  // Get other items of similar type
  const matches = mediaData.filter(item => item.type === currentItem.type && item.id !== currentItem.id).slice(0, 4);

  matches.forEach(item => {
    const card = document.createElement('div');
    card.className = 'similar-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="similar-overlay">
        <span class="similar-card-title">${item.title}</span>
      </div>
    `;
    card.addEventListener('click', () => {
      // Transition details within modal
      openDetails(item.id);
    });
    grid.appendChild(card);
  });
}

// 9. Premium Custom Video Player Controls Logic
function setupPlayerEvents() {
  const playBtn = document.getElementById('player-play-btn');
  const skipBack = document.getElementById('player-skip-back');
  const skipForward = document.getElementById('player-skip-forward');
  const muteBtn = document.getElementById('player-mute-btn');
  const volumeSlider = document.getElementById('player-volume');
  const timelineSlider = document.getElementById('player-timeline');
  const videoDisplay = document.getElementById('video-display');
  const fullscreenBtn = document.getElementById('player-fullscreen-btn');

  // Play Pause triggers
  playBtn.addEventListener('click', togglePlayState);
  videoDisplay.addEventListener('click', togglePlayState);

  // Skip buttons
  skipBack.addEventListener('click', () => skipTime(-10));
  skipForward.addEventListener('click', () => skipTime(10));

  // Volume control sliders
  muteBtn.addEventListener('click', toggleMute);
  volumeSlider.addEventListener('input', (e) => {
    state.playerVolume = e.target.value;
    state.playerMuted = (state.playerVolume == 0);
    updateVolumeUI();
  });

  // Drag timeline slider
  timelineSlider.addEventListener('input', (e) => {
    const percent = e.target.value;
    state.playerCurrentTime = Math.round((percent / 100) * state.playerDuration);
    updateTimelineUI();
  });

  // Fullscreen trigger API
  fullscreenBtn.addEventListener('click', () => {
    const container = document.querySelector('.modal-player-container');
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) { /* Safari */
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) { /* IE11 */
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });
}

function resetPlayerState() {
  state.playerPlaying = false;
  state.playerCurrentTime = 0;
  
  if (state.currentItem && state.currentItem.type === 'sports' && state.currentItem.subType === 'live') {
    state.playerDuration = 10800; // 3 hours in seconds for matches
  } else {
    state.playerDuration = 8100; // 2h 15m in seconds for typical movies
  }
  
  updateTimelineUI();
  updatePlayButtonUI();
  
  const spinner = document.getElementById('video-spinner');
  spinner.classList.add('hidden');

  const playOverlay = document.getElementById('play-state-overlay');
  playOverlay.classList.remove('show');

  const display = document.getElementById('video-display');
  display.classList.remove('playing');
}

function togglePlayState() {
  if (state.playerPlaying) {
    pauseVideo();
  } else {
    playVideo();
  }
}

function playVideo() {
  const spinner = document.getElementById('video-spinner');
  spinner.classList.remove('hidden');
  
  // Simulate buffering for 800ms
  setTimeout(() => {
    spinner.classList.add('hidden');
    state.playerPlaying = true;
    
    // Play state overlay animation pulse
    const playOverlay = document.getElementById('play-state-overlay');
    playOverlay.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>';
    playOverlay.classList.add('show');
    setTimeout(() => playOverlay.classList.remove('show'), 500);

    const display = document.getElementById('video-display');
    display.classList.add('playing');

    updatePlayButtonUI();
    
    // Start timeline progress
    clearInterval(state.playerInterval);
    state.playerInterval = setInterval(() => {
      state.playerCurrentTime++;
      if (state.playerCurrentTime >= state.playerDuration) {
        pauseVideo();
        state.playerCurrentTime = 0;
      }
      updateTimelineUI();
    }, 1000);
  }, 650);
}

function pauseVideo() {
  state.playerPlaying = false;
  clearInterval(state.playerInterval);
  
  const playOverlay = document.getElementById('play-state-overlay');
  playOverlay.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>';
  playOverlay.classList.add('show');
  setTimeout(() => playOverlay.classList.remove('show'), 500);

  const display = document.getElementById('video-display');
  display.classList.remove('playing');

  updatePlayButtonUI();
}

function skipTime(seconds) {
  state.playerCurrentTime = Math.max(0, Math.min(state.playerDuration, state.playerCurrentTime + seconds));
  updateTimelineUI();
}

function toggleMute() {
  state.playerMuted = !state.playerMuted;
  updateVolumeUI();
}

function updatePlayButtonUI() {
  const playBtn = document.getElementById('player-play-btn');
  const iconPlay = playBtn.querySelector('.icon-play');
  const iconPause = playBtn.querySelector('.icon-pause');
  
  if (state.playerPlaying) {
    iconPlay.classList.add('hidden');
    iconPause.classList.remove('hidden');
  } else {
    iconPlay.classList.remove('hidden');
    iconPause.classList.add('hidden');
  }
}

function updateVolumeUI() {
  const muteBtn = document.getElementById('player-mute-btn');
  const iconVolume = muteBtn.querySelector('.icon-volume');
  const iconMuted = muteBtn.querySelector('.icon-muted');
  const volumeSlider = document.getElementById('player-volume');
  
  if (state.playerMuted) {
    iconVolume.classList.add('hidden');
    iconMuted.classList.remove('hidden');
    volumeSlider.value = 0;
  } else {
    iconVolume.classList.remove('hidden');
    iconMuted.classList.add('hidden');
    volumeSlider.value = state.playerVolume;
  }
}

function updateTimelineUI() {
  const currentTimeText = document.getElementById('player-time-current');
  const totalTimeText = document.getElementById('player-time-total');
  const timelineSlider = document.getElementById('player-timeline');
  const progressFill = document.getElementById('player-progress');

  // Format times as string (h:mm:ss or m:ss)
  currentTimeText.textContent = formatTime(state.playerCurrentTime);
  totalTimeText.textContent = formatTime(state.playerDuration);

  // Update slider position
  const percentage = (state.playerCurrentTime / state.playerDuration) * 100;
  timelineSlider.value = percentage || 0;
  progressFill.style.width = `${percentage}%`;
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  const mStr = m.toString();
  const sStr = s.toString().padStart(2, '0');
  
  if (h > 0) {
    return `${h}:${mStr.padStart(2, '0')}:${sStr}`;
  }
  return `${m}:${sStr}`;
}
