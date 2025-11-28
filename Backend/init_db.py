"""
Database initialization script
Populates the songs table with sample data
"""
from app import create_app
from models import db, Song

def init_songs():
    """Initialize songs table with sample data"""
    app = create_app('development')
    
    with app.app_context():
        # Check if songs already exist
        if Song.query.count() > 0:
            print(f"Database already has {Song.query.count()} songs. Skipping initialization.")
            return
        
        # Sample songs data
        songs_data = [
            # Happy songs
            {'title': 'Happy', 'artist': 'Pharrell Williams', 'genre': 'Pop', 'emotion_tag': 'Happy', 'link': 'https://www.youtube.com/watch?v=ZbZSe6N_BXs'},
            {'title': "Don't Stop Me Now", 'artist': 'Queen', 'genre': 'Rock', 'emotion_tag': 'Happy', 'link': 'https://www.youtube.com/watch?v=HgzGwKwLmgM'},
            {'title': 'Walking on Sunshine', 'artist': 'Katrina and the Waves', 'genre': 'Pop', 'emotion_tag': 'Happy', 'link': 'https://www.youtube.com/watch?v=iPUmE-tne5U'},
            {'title': 'Good Vibrations', 'artist': 'The Beach Boys', 'genre': 'Rock', 'emotion_tag': 'Happy', 'link': 'https://www.youtube.com/watch?v=Eab_beh07HU'},
            {'title': 'I Gotta Feeling', 'artist': 'Black Eyed Peas', 'genre': 'Pop', 'emotion_tag': 'Happy', 'link': 'https://www.youtube.com/watch?v=uSD4vsh1zDA'},
            
            # Sad songs
            {'title': 'Someone Like You', 'artist': 'Adele', 'genre': 'Pop', 'emotion_tag': 'Sad', 'link': 'https://www.youtube.com/watch?v=hLQl3WQQoQ0'},
            {'title': 'The Night We Met', 'artist': 'Lord Huron', 'genre': 'Indie', 'emotion_tag': 'Sad', 'link': 'https://www.youtube.com/watch?v=KtlgYxa6BMU'},
            {'title': 'Hurt', 'artist': 'Johnny Cash', 'genre': 'Country', 'emotion_tag': 'Sad', 'link': 'https://www.youtube.com/watch?v=8AHCfZTRGiI'},
            {'title': 'Fix You', 'artist': 'Coldplay', 'genre': 'Alternative', 'emotion_tag': 'Sad', 'link': 'https://www.youtube.com/watch?v=k4V3Mo61fJM'},
            {'title': 'Tears in Heaven', 'artist': 'Eric Clapton', 'genre': 'Rock', 'emotion_tag': 'Sad', 'link': 'https://www.youtube.com/watch?v=JxPj3GAYYZ0'},
            
            # Angry songs
            {'title': 'Break Stuff', 'artist': 'Limp Bizkit', 'genre': 'Nu Metal', 'emotion_tag': 'Angry', 'link': 'https://www.youtube.com/watch?v=ZpUYjpKg9KY'},
            {'title': 'Killing in the Name', 'artist': 'Rage Against the Machine', 'genre': 'Rock', 'emotion_tag': 'Angry', 'link': 'https://www.youtube.com/watch?v=bWXazVhlyxQ'},
            {'title': 'Bodies', 'artist': 'Drowning Pool', 'genre': 'Metal', 'emotion_tag': 'Angry', 'link': 'https://www.youtube.com/watch?v=04F4xlWSFh0'},
            {'title': 'Freak on a Leash', 'artist': 'Korn', 'genre': 'Nu Metal', 'emotion_tag': 'Angry', 'link': 'https://www.youtube.com/watch?v=jRGrNDV2mKc'},
            {'title': 'Chop Suey!', 'artist': 'System of a Down', 'genre': 'Metal', 'emotion_tag': 'Angry', 'link': 'https://www.youtube.com/watch?v=CSvFpBOe8eY'},
            
            # Relaxed songs
            {'title': 'Weightless', 'artist': 'Marconi Union', 'genre': 'Ambient', 'emotion_tag': 'Relaxed', 'link': 'https://www.youtube.com/watch?v=UfcAVejslrU'},
            {'title': 'Clair de Lune', 'artist': 'Claude Debussy', 'genre': 'Classical', 'emotion_tag': 'Relaxed', 'link': 'https://www.youtube.com/watch?v=CvFH_6DNRCY'},
            {'title': 'Sunset Lover', 'artist': 'Petit Biscuit', 'genre': 'Electronic', 'emotion_tag': 'Relaxed', 'link': 'https://www.youtube.com/watch?v=wuCK-oiE3rM'},
            {'title': 'River Flows in You', 'artist': 'Yiruma', 'genre': 'Classical', 'emotion_tag': 'Relaxed', 'link': 'https://www.youtube.com/watch?v=7maJOI3QMu0'},
            {'title': 'Breathe', 'artist': 'Telepopmusik', 'genre': 'Electronic', 'emotion_tag': 'Relaxed', 'link': 'https://www.youtube.com/watch?v=vyut3GyQtn0'},
        ]
        
        # Add songs to database
        for song_data in songs_data:
            song = Song.from_dict(song_data)
            db.session.add(song)
        
        db.session.commit()
        print(f"Successfully added {len(songs_data)} songs to the database!")
        
        # Print summary
        for emotion in ['Happy', 'Sad', 'Angry', 'Relaxed']:
            count = Song.query.filter_by(emotion_tag=emotion).count()
            print(f"  - {emotion}: {count} songs")

if __name__ == '__main__':
    init_songs()
