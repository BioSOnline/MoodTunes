import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DottedSurface } from './DottedSurface';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(loginInput, password);
      } else {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        await register(username, email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DottedSurface />
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <div className="auth-logo-wrapper">
              <span className="auth-logo-icon">🎵</span>
              <h1 className="auth-logo">MoodTunes</h1>
            </div>
            <p className="auth-tagline">Discover music that matches your every emotion</p>
          </div>

          <div className="auth-card">
            <div className="auth-tabs">
              <button
                className={`auth-tab ${isLogin ? 'active' : ''}`}
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
                disabled={loading}
              >
                Sign In
              </button>
              <button
                className={`auth-tab ${!isLogin ? 'active' : ''}`}
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
                disabled={loading}
              >
                Sign Up
              </button>
            </div>

            <h2 className="auth-title">
              {isLogin ? 'Welcome back!' : 'Join MoodTunes'}
            </h2>
            <p className="auth-subtitle">
              {isLogin ? 'Continue your musical journey' : 'Start discovering music for every mood'}
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={!isLogin}
                    placeholder="Choose a unique username"
                    disabled={loading}
                    autoComplete="username"
                    className="form-input"
                  />
                </div>
              )}

              {isLogin ? (
                <div className="form-group">
                  <label htmlFor="login" className="form-label">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Username or Email
                  </label>
                  <input
                    id="login"
                    type="text"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    required
                    placeholder="Enter username or email"
                    disabled={loading}
                    autoComplete="username"
                    className="form-input"
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    disabled={loading}
                    autoComplete="email"
                    className="form-input"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  minLength={6}
                  disabled={loading}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  className="form-input"
                />
                {!isLogin && (
                  <p className="form-hint">Minimum 6 characters</p>
                )}
              </div>

              {error && (
                <div className="error-message">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <button type="submit" className="auth-submit-button" disabled={loading}>
                {loading ? (
                  <>
                    <svg className="spinner" width="20" height="20" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/>
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"/>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>Test Account</span>
            </div>

            <div className="test-credentials">
              <p className="test-info">Try with: <strong>rajesh_bangalore</strong> / <strong>asd123</strong></p>
            </div>
          </div>

          <div className="auth-features">
            <div className="feature-item">
              <div className="feature-icon">🎭</div>
              <h3>Mood-Based</h3>
              <p>Music for every emotion</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎵</div>
              <h3>Curated Playlists</h3>
              <p>Hand-picked collections</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✨</div>
              <h3>Discover New</h3>
              <p>Find your next favorite</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
