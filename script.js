// API Configuration
const API_BASE_URL = 'http://localhost:5001/api';

// DOM Elements
const moodButtons = document.querySelectorAll('.mood-btn');
const songsGrid = document.getElementById('songs-grid');
const resultsTitle = document.getElementById('results-title');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

// State
let currentMood = null;

// Event Listeners
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const emotion = button.dataset.emotion;
        selectMood(button, emotion);
    });
});

// Select Mood Function
function selectMood(button, emotion) {
    // Update active state
    moodButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    currentMood = emotion;

    // Fetch songs for selected mood
    fetchSongsByMood(emotion);
}

// Fetch Songs by Mood
async function fetchSongsByMood(emotion) {
    // Show loading state
    showLoading();

    try {
        const response = await fetch(`${API_BASE_URL}/songs?emotion=${emotion}`);

        if (!response.ok) {
            throw new Error('Failed to fetch songs');
        }

        const songs = await response.json();

        // Display songs
        displaySongs(songs, emotion);

    } catch (err) {
        console.error('Error fetching songs:', err);
        showError();
    }
}

// Display Songs
function displaySongs(songs, emotion) {
    // Hide loading and error
    loading.classList.remove('show');
    error.classList.remove('show');

    // Update results title
    resultsTitle.textContent = `${emotion} Songs (${songs.length} found)`;

    // Clear previous songs
    songsGrid.innerHTML = '';

    if (songs.length === 0) {
        songsGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No songs found for this mood.</p>';
        songsGrid.classList.add('show');
        return;
    }

    // Create song cards
    songs.forEach(song => {
        const songCard = createSongCard(song);
        songsGrid.appendChild(songCard);
    });

    // Show songs grid
    songsGrid.classList.add('show');
}

// Create Song Card
function createSongCard(song) {
    const card = document.createElement('div');
    card.className = `song-card ${song.emotion_tag.toLowerCase()}`;

    card.innerHTML = `
        <h3 class="song-title">${escapeHtml(song.title)}</h3>
        <p class="song-artist">by ${escapeHtml(song.artist)}</p>
        ${song.genre ? `<span class="song-genre">${escapeHtml(song.genre)}</span>` : ''}
        ${song.link ? `<a href="${escapeHtml(song.link)}" target="_blank" rel="noopener noreferrer" class="song-link">🎵 Listen Now</a>` : ''}
    `;

    return card;
}

// Show Loading State
function showLoading() {
    songsGrid.classList.remove('show');
    error.classList.remove('show');
    loading.classList.add('show');
}

// Show Error State
function showError() {
    loading.classList.remove('show');
    songsGrid.classList.remove('show');
    error.classList.add('show');
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Check Backend Connection on Load
async function checkBackendConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            console.log('✅ Backend connection successful');
        } else {
            console.warn('⚠️ Backend responded with error');
        }
    } catch (err) {
        console.error('❌ Backend connection failed:', err);
        console.log('Make sure the Flask server is running on http://localhost:5001');
    }
}

// Initialize
checkBackendConnection();
