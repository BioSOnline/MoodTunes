# MoodTunes - Mood-Based Music Recommendations 🎵

> **College Project** | Web Development & Database Management

A full-stack web application that recommends music based on your current mood. This project demonstrates modern web development practices using Flask backend with SQLite database and vanilla JavaScript frontend.

![MoodTunes Interface](https://img.shields.io/badge/Status-Active-success)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![Flask](https://img.shields.io/badge/Flask-3.0.0-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey)

## 📚 Project Overview

This project was developed as part of a college coursework to demonstrate:
- Full-stack web application development
- RESTful API design and implementation
- Database design and management with SQLite
- Modern frontend development with vanilla JavaScript
- Responsive UI/UX design principles

## Features

- 🎭 **Mood-Based Filtering**: Select from Happy, Sad, Angry, or Relaxed moods
- 🎵 **Song Recommendations**: Get curated song lists for each mood
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 🔗 **Direct Links**: Click to listen on YouTube/Spotify
- 📊 **RESTful API**: Clean API endpoints for song data

## Project Structure

```
musid/
├── Backend/                    # Flask backend application
│   ├── app.py                 # Main Flask application
│   ├── config.py              # Configuration settings
│   ├── models.py              # Database models (User, Song)
│   ├── routes.py              # API routes
│   ├── init_db.py             # Database initialization script
│   ├── schema.sql             # SQL schema and sample data
│   ├── requirements.txt       # Python dependencies
│   └── instance/              # Database folder (auto-created)
│       └── database.db        # SQLite database
├── index.html                 # Frontend HTML
├── style.css                  # Frontend styles
├── script.js                  # Frontend JavaScript
└── README.md                  # This file
```

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- A modern web browser

## Setup Instructions

### 1. Clone or Download the Project

```bash
cd /path/to/musid
```

### 2. Set Up the Backend

#### Navigate to Backend Directory

```bash
cd Backend
```

#### Create Virtual Environment (Recommended)

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- Flask 3.0.0
- Flask-SQLAlchemy 3.1.1
- Flask-CORS 4.0.0

#### Initialize Database with Sample Songs

```bash
python init_db.py
```

This will create the database and populate it with 20 sample songs (5 for each mood).

Expected output:
```
Database tables created successfully!
Successfully added 20 songs to the database!
  - Happy: 5 songs
  - Sad: 5 songs
  - Angry: 5 songs
  - Relaxed: 5 songs
```

### 3. Start the Backend Server

```bash
python app.py
```

The server will start on `http://localhost:5001`

Expected output:
```
Database tables created successfully!
Starting Flask backend server...
API endpoints available at: http://localhost:5001/api/
 * Running on http://127.0.0.1:5001
```

**Note**: If port 5001 is already in use (e.g., by AirPlay Receiver on macOS), you can:
- Disable AirPlay Receiver in System Preferences → General → AirDrop & Handoff
- Or change the port in `app.py` (line 40)

### 4. Open the Frontend

Open `index.html` in your web browser:

**Option 1: Direct File**
```bash
# From the project root directory
open index.html  # macOS
# or
start index.html  # Windows
# or
xdg-open index.html  # Linux
```

**Option 2: Use a Simple HTTP Server (Recommended)**
```bash
# From the project root directory
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### 5. Use the Application

1. **Select a Mood**: Click on one of the four mood buttons (Happy, Sad, Angry, Relaxed)
2. **View Songs**: The app will fetch and display songs matching your mood
3. **Listen**: Click "🎵 Listen Now" on any song card to open it on YouTube/Spotify

## API Endpoints

The backend provides the following REST API endpoints:

### Health Check
```
GET /api/health
```
Returns server status.

### Songs

#### Get All Songs
```
GET /api/songs
```
Returns all songs in the database.

#### Get Songs by Mood
```
GET /api/songs?emotion=<mood>
```
Returns songs filtered by emotion tag (Happy, Sad, Angry, Relaxed).

**Example:**
```bash
curl 'http://localhost:5001/api/songs?emotion=Happy'
```

#### Get Available Emotions
```
GET /api/songs/emotions
```
Returns list of all available emotion tags.

#### Get Single Song
```
GET /api/songs/<song_id>
```
Returns a specific song by ID.

#### Create Song
```
POST /api/songs
Content-Type: application/json

{
  "title": "Song Title",
  "artist": "Artist Name",
  "genre": "Genre",
  "emotion_tag": "Happy",
  "link": "https://youtube.com/..."
}
```

### Users

The backend also includes user management endpoints (for future features):
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/users/<id>` - Get specific user
- `PUT /api/users/<id>` - Update user
- `DELETE /api/users/<id>` - Delete user

## Database Schema

### Songs Table

| Column      | Type         | Description                     |
|-------------|-------------|---------------------------------|
| song_id     | INTEGER (PK) | Unique ID (auto-increment)      |
| title       | VARCHAR(255) | Song name                       |
| artist      | VARCHAR(255) | Singer/Composer                 |
| genre       | VARCHAR(100) | Music type                      |
| emotion_tag | VARCHAR(50)  | Happy / Sad / Angry / Relaxed   |
| link        | VARCHAR(500) | Song URL (YouTube/Spotify etc.) |

## Troubleshooting

### Port Already in Use

If you see "Address already in use" error:

```bash
# Find and kill the process using port 5001
lsof -ti:5001 | xargs kill -9

# Then restart the server
python app.py
```

### CORS Errors

If you see CORS errors in the browser console:
- Make sure the backend server is running
- Use a local HTTP server instead of opening the HTML file directly
- The backend is configured to allow all origins for development

### Database Issues

To reset the database:

```bash
# Stop the server (Ctrl+C)
# Delete the database
rm instance/database.db

# Reinitialize
python init_db.py

# Restart server
python app.py
```

### No Songs Displayed

1. Check that the backend server is running on port 5001
2. Open browser console (F12) to see any error messages
3. Verify the API is working: `curl http://localhost:5001/api/health`
4. Check that songs were initialized: `curl http://localhost:5001/api/songs`

## Adding More Songs

You can add songs in two ways:

### Method 1: Using the API

```bash
curl -X POST http://localhost:5001/api/songs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Song",
    "artist": "Artist Name",
    "genre": "Pop",
    "emotion_tag": "Happy",
    "link": "https://youtube.com/..."
  }'
```

### Method 2: Edit init_db.py

Add your songs to the `songs_data` list in `Backend/init_db.py` and run:

```bash
# Delete existing database first
rm instance/database.db

# Reinitialize with new songs
python init_db.py
```

## Technologies Used

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Lightweight SQL database
- **Flask-CORS** - Cross-Origin Resource Sharing support

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **Vanilla JavaScript** - Dynamic functionality
- **Fetch API** - HTTP requests to backend

## Future Enhancements

- [ ] User authentication and personalized playlists
- [ ] Spotify/YouTube API integration for embedded players
- [ ] More emotion categories
- [ ] Song rating and favorites
- [ ] Search functionality
- [ ] Mobile app version

## License

This project is open source and available for educational purposes.

## Support

If you encounter any issues:
1. Check the Troubleshooting section above
2. Ensure all dependencies are installed correctly
3. Verify Python and pip versions meet requirements
4. Check that both backend and frontend are running

---

**Enjoy discovering music that matches your mood! 🎵**

## Developer

Created by **Adnan**
