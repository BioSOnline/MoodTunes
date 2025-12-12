import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DottedSurface } from '../components/DottedSurface';
import './HomePage.css';

// Sample song data for each mood with album art
const songData = {
  happy: [
    { id: 1, title: 'Happy', artist: 'Pharrell Williams', duration: '3:53', youtubeId: 'ZbZSe6N_BXs', genre: 'Pop', year: 2013 },
    { id: 2, title: 'Good Vibrations', artist: 'The Beach Boys', duration: '3:36', youtubeId: 'Eab_beh07HU', genre: 'Rock', year: 1966 },
    { id: 3, title: 'Walking on Sunshine', artist: 'Katrina and the Waves', duration: '3:59', youtubeId: 'iPUmE-tne5U', genre: 'Pop', year: 1983 },
    { id: 4, title: 'Don\'t Stop Me Now', artist: 'Queen', duration: '3:29', youtubeId: 'HgzGwKwLmgM', genre: 'Rock', year: 1978 },
    { id: 5, title: 'I Gotta Feeling', artist: 'The Black Eyed Peas', duration: '4:49', youtubeId: 'uSD4vsh1zDA', genre: 'Pop', year: 2009 },
    { id: 6, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', duration: '4:30', youtubeId: 'OPf0YbXqDm0', genre: 'Funk', year: 2014 },
  ],
  sad: [
    { id: 7, title: 'Someone Like You', artist: 'Adele', duration: '4:45', youtubeId: 'hLQl3WQQoQ0', genre: 'Soul', year: 2011 },
    { id: 8, title: 'The Night We Met', artist: 'Lord Huron', duration: '3:28', youtubeId: 'KtlgYxa6BMU', genre: 'Indie', year: 2015 },
    { id: 9, title: 'Hurt', artist: 'Johnny Cash', duration: '3:38', youtubeId: '8AHCfZTRGiI', genre: 'Country', year: 2002 },
    { id: 10, title: 'Mad World', artist: 'Gary Jules', duration: '3:08', youtubeId: '4N3N1MlvVc4', genre: 'Alternative', year: 2001 },
    { id: 11, title: 'Skinny Love', artist: 'Bon Iver', duration: '3:58', youtubeId: 'ssdgFoHLwnk', genre: 'Indie', year: 2007 },
    { id: 12, title: 'Tears in Heaven', artist: 'Eric Clapton', duration: '4:32', youtubeId: 'JxPj3GAYYZ0', genre: 'Rock', year: 1992 },
  ],
  angry: [
    { id: 13, title: 'Break Stuff', artist: 'Limp Bizkit', duration: '2:46', youtubeId: 'ZpUYjpKg9KY', genre: 'Metal', year: 2000 },
    { id: 14, title: 'Killing in the Name', artist: 'Rage Against the Machine', duration: '5:13', youtubeId: 'bWXazVhlyxQ', genre: 'Metal', year: 1992 },
    { id: 15, title: 'Bodies', artist: 'Drowning Pool', duration: '3:22', youtubeId: '04F4xlWSFh0', genre: 'Metal', year: 2001 },
    { id: 16, title: 'Chop Suey!', artist: 'System of a Down', duration: '3:30', youtubeId: 'CSvFpBOe8eY', genre: 'Metal', year: 2001 },
    { id: 17, title: 'Last Resort', artist: 'Papa Roach', duration: '3:20', youtubeId: 'j0lSpNtjPM8', genre: 'Rock', year: 2000 },
    { id: 18, title: 'Down with the Sickness', artist: 'Disturbed', duration: '4:38', youtubeId: '09LTT0xwdfw', genre: 'Metal', year: 2000 },
  ],
  relaxed: [
    { id: 19, title: 'Weightless', artist: 'Marconi Union', duration: '8:09', youtubeId: 'UfcAVejslrU', genre: 'Ambient', year: 2011 },
    { id: 20, title: 'Breathe Me', artist: 'Sia', duration: '4:33', youtubeId: 'SFGvmrJ5rjM', genre: 'Alternative', year: 2004 },
    { id: 21, title: 'Holocene', artist: 'Bon Iver', duration: '5:36', youtubeId: 'TWcyIpul8OE', genre: 'Indie', year: 2011 },
    { id: 22, title: 'Clair de Lune', artist: 'Claude Debussy', duration: '5:24', youtubeId: 'CvFH_6DNRCY', genre: 'Classical', year: 1905 },
    { id: 23, title: 'Sunset Lover', artist: 'Petit Biscuit', duration: '3:34', youtubeId: 'wuCK-oiE3rM', genre: 'Electronic', year: 2015 },
    { id: 24, title: 'Intro', artist: 'The xx', duration: '2:11', youtubeId: '3gxNW2Ulpwk', genre: 'Indie', year: 2009 },
  ],
};

const moodEmojis = {
  happy: '😊',
  sad: '😢',
  angry: '😤',
  relaxed: '😌'
};

const moodDescriptions = {
  happy: 'Uplifting tracks to boost your spirits',
  sad: 'Emotional songs for reflective moments',
  angry: 'Intense music to channel your energy',
  relaxed: 'Calm melodies for peace and tranquility'
};

export const HomePage = () => {
  const [activeMood, setActiveMood] = useState('happy');
  const [searchTerm, setSearchTerm] = useState('');
  const [playingId, setPlayingId] = useState(null);
  const { user, logout } = useAuth();

  const moods = ['happy', 'sad', 'angry', 'relaxed'];

  const filteredSongs = songData[activeMood].filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openYoutube = (youtubeId, songId) => {
    setPlayingId(songId);
    const url = `https://www.youtube.com/watch?v=${youtubeId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => setPlayingId(null), 2000);
  };

  return (
    <>
      <DottedSurface />
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <div className="app-branding">
              <div className="logo-wrapper">
                <span className="logo-icon">🎵</span>
                <h1 className="app-title">MoodTunes</h1>
              </div>
              <p className="app-subtitle">Discover music that matches your vibe</p>
            </div>
            <div className="user-section">
              <div className="user-avatar">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <span className="user-name">{user?.username}</span>
                <button className="logout-btn" onClick={logout}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="mood-section">
          <div className="mood-header">
            <h2 className="section-title">How are you feeling?</h2>
            <div className="search-box">
              <svg className="search-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search songs, artists, or genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="mood-tabs">
            {moods.map((mood) => (
              <button
                key={mood}
                className={`mood-tab mood-tab-${mood} ${activeMood === mood ? 'active' : ''}`}
                onClick={() => setActiveMood(mood)}
              >
                <span className="mood-emoji">{moodEmojis[mood]}</span>
                <span className="mood-name">{mood.charAt(0).toUpperCase() + mood.slice(1)}</span>
                <span className="song-count">{songData[mood].length}</span>
              </button>
            ))}
          </div>

          <div className="mood-description">
            <p>{moodDescriptions[activeMood]}</p>
          </div>
        </div>

        <div className="playlist-section">
          <div className="playlist-header">
            <h3 className="playlist-title">
              {filteredSongs.length} {filteredSongs.length === 1 ? 'Song' : 'Songs'}
            </h3>
            <div className="playlist-actions">
              <button className="action-btn">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Play All
              </button>
              <button className="action-btn">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
                Shuffle
              </button>
            </div>
          </div>

          <div className="song-grid">
            {filteredSongs.map((song, index) => (
              <div 
                key={song.id} 
                className={`song-card song-card-${activeMood} ${playingId === song.id ? 'playing' : ''}`}
                onClick={() => openYoutube(song.youtubeId, song.id)}
              >
                <div className="song-card-header">
                  <div className="song-number">{index + 1}</div>
                  <button className="play-button">
                    <svg width="24" height="24" fill="currentColor">
                      <polygon points="8 5 19 12 8 19 8 5"/>
                    </svg>
                  </button>
                </div>
                <div className="song-card-body">
                  <h4 className="song-card-title">{song.title}</h4>
                  <p className="song-card-artist">{song.artist}</p>
                  <div className="song-card-meta">
                    <span className="genre-badge">{song.genre}</span>
                    <span className="year-badge">{song.year}</span>
                  </div>
                </div>
                <div className="song-card-footer">
                  <span className="duration-badge">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {song.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredSongs.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <h3>No songs found</h3>
              <p>Try adjusting your search or select a different mood</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
