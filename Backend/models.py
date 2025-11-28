from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime

# Initialize SQLAlchemy and Bcrypt
db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    """User model for authentication"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<User {self.username}>'
    
    def set_password(self, password):
        """Hash and set the password"""
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        """Check if the provided password matches the hash"""
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        """Convert user object to dictionary"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }
    
    @staticmethod
    def from_dict(data):
        """Create user object from dictionary"""
        return User(
            username=data.get('username'),
            email=data.get('email')
        )

class Song(db.Model):
    """Song model for music recommendations"""
    __tablename__ = 'songs'
    
    song_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    artist = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(100))
    emotion_tag = db.Column(db.String(50), nullable=False)
    link = db.Column(db.String(500))
    
    def __repr__(self):
        return f'<Song {self.title} by {self.artist}>'
    
    def to_dict(self):
        """Convert song object to dictionary"""
        return {
            'song_id': self.song_id,
            'title': self.title,
            'artist': self.artist,
            'genre': self.genre,
            'emotion_tag': self.emotion_tag,
            'link': self.link
        }
    
    @staticmethod
    def from_dict(data):
        """Create song object from dictionary"""
        return Song(
            title=data.get('title'),
            artist=data.get('artist'),
            genre=data.get('genre'),
            emotion_tag=data.get('emotion_tag'),
            link=data.get('link')
        )

