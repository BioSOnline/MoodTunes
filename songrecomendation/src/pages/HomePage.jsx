import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DottedSurface } from '../components/DottedSurface';

// Sample song data for each mood
const songData = {
  happy: [
    { id: 1, title: 'Happy', artist: 'Pharrell Williams', duration: '3:53', youtubeId: 'ZbZSe6N_BXs' },
    { id: 2, title: 'Good Vibrations', artist: 'The Beach Boys', duration: '3:36', youtubeId: 'Eab_beh07HU' },
    { id: 3, title: 'Walking on Sunshine', artist: 'Katrina and the Waves', duration: '3:59', youtubeId: 'iPUmE-tne5U' },
    { id: 4, title: 'Don\'t Stop Me Now', artist: 'Queen', duration: '3:29', youtubeId: 'HgzGwKwLmgM' },
    { id: 5, title: 'I Gotta Feeling', artist: 'The Black Eyed Peas', duration: '4:49', youtubeId: 'uSD4vsh1zDA' },
    { id: 6, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', duration: '4:30', youtubeId: 'OPf0YbXqDm0' },
  ],
  sad: [
    { id: 7, title: 'Someone Like You', artist: 'Adele', duration: '4:45', youtubeId: 'hLQl3WQQoQ0' },
    { id: 8, title: 'The Night We Met', artist: 'Lord Huron', duration: '3:28', youtubeId: 'KtlgYxa6BMU' },
    { id: 9, title: 'Hurt', artist: 'Johnny Cash', duration: '3:38', youtubeId: '8AHCfZTRGiI' },
    { id: 10, title: 'Mad World', artist: 'Gary Jules', duration: '3:08', youtubeId: '4N3N1MlvVc4' },
    { id: 11, title: 'Skinny Love', artist: 'Bon Iver', duration: '3:58', youtubeId: 'ssdgFoHLwnk' },
    { id: 12, title: 'Tears in Heaven', artist: 'Eric Clapton', duration: '4:32', youtubeId: 'JxPj3GAYYZ0' },
  ],
  angry: [
    { id: 13, title: 'Break Stuff', artist: 'Limp Bizkit', duration: '2:46', youtubeId: 'ZpUYjpKg9KY' },
    { id: 14, title: 'Killing in the Name', artist: 'Rage Against the Machine', duration: '5:13', youtubeId: 'bWXazVhlyxQ' },
    { id: 15, title: 'Bodies', artist: 'Drowning Pool', duration: '3:22', youtubeId: '04F4xlWSFh0' },
    { id: 16, title: 'Chop Suey!', artist: 'System of a Down', duration: '3:30', youtubeId: 'CSvFpBOe8eY' },
    { id: 17, title: 'Last Resort', artist: 'Papa Roach', duration: '3:20', youtubeId: 'j0lSpNtjPM8' },
    { id: 18, title: 'Down with the Sickness', artist: 'Disturbed', duration: '4:38', youtubeId: '09LTT0xwdfw' },
  ],
  relaxed: [
    { id: 19, title: 'Weightless', artist: 'Marconi Union', duration: '8:09', youtubeId: 'UfcAVejslrU' },
    { id: 20, title: 'Breathe Me', artist: 'Sia', duration: '4:33', youtubeId: 'SFGvmrJ5rjM' },
    { id: 21, title: 'Holocene', artist: 'Bon Iver', duration: '5:36', youtubeId: 'TWcyIpul8OE' },
    { id: 22, title: 'Clair de Lune', artist: 'Claude Debussy', duration: '5:24', youtubeId: 'CvFH_6DNRCY' },
    { id: 23, title: 'Sunset Lover', artist: 'Petit Biscuit', duration: '3:34', youtubeId: 'wuCK-oiE3rM' },
    { id: 24, title: 'Intro', artist: 'The xx', duration: '2:11', youtubeId: '3gxNW2Ulpwk' },
  ],
};

export const HomePage = () => {
  const [activeMood, setActiveMood] = useState('happy');
  const { user, logout } = useAuth();

  const moods = ['happy', 'sad', 'angry', 'relaxed'];

  const openYoutube = (youtubeId) => {
    const url = `https://www.youtube.com/watch?v=${youtubeId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <DottedSurface />
      <div className="app-container">
        <header className="app-header">
          <div className="header-top">
            <div className="app-branding">
              <h1 className="app-title">MoodTunes</h1>
              <p className="app-subtitle">Find the perfect song for your mood</p>
            </div>
            <div className="auth-section">
              <div className="user-menu">
                <span className="welcome-text">Welcome, {user?.username}</span>
                <button className="logout-button" onClick={logout}>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="tab-bar">
          {moods.map((mood) => (
            <button
              key={mood}
              className={`tab-button ${mood} ${activeMood === mood ? 'active' : ''}`}
              onClick={() => setActiveMood(mood)}
            >
              {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </button>
          ))}
        </div>

        <div className="song-list">
          {songData[activeMood].map((song) => (
            <div 
              key={song.id} 
              className={`song-item ${activeMood}`}
              onClick={() => openYoutube(song.youtubeId)}
              style={{ cursor: 'pointer' }}
              title="Click to play on YouTube"
            >
              <div className="song-info">
                <div className="song-details">
                  <div className="song-title">{song.title}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
                <div className="song-duration">
                  {song.duration}
                  <span className="play-icon" style={{ marginLeft: '10px' }}>▶</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
