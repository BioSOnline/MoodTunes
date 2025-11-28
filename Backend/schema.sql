-- Songs Database Schema
-- This file contains the SQL setup for the songs table

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS songs;

-- Create songs table
CREATE TABLE songs (
    song_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    emotion_tag VARCHAR(50) NOT NULL,
    link VARCHAR(500)
);

-- Insert sample song data
INSERT INTO songs (title, artist, genre, emotion_tag, link) VALUES
-- Happy songs
('Happy', 'Pharrell Williams', 'Pop', 'Happy', 'https://www.youtube.com/watch?v=ZbZSe6N_BXs'),
('Don''t Stop Me Now', 'Queen', 'Rock', 'Happy', 'https://www.youtube.com/watch?v=HgzGwKwLmgM'),
('Walking on Sunshine', 'Katrina and the Waves', 'Pop', 'Happy', 'https://www.youtube.com/watch?v=iPUmE-tne5U'),
('Good Vibrations', 'The Beach Boys', 'Rock', 'Happy', 'https://www.youtube.com/watch?v=Eab_beh07HU'),
('I Gotta Feeling', 'Black Eyed Peas', 'Pop', 'Happy', 'https://www.youtube.com/watch?v=uSD4vsh1zDA'),

-- Sad songs
('Someone Like You', 'Adele', 'Pop', 'Sad', 'https://www.youtube.com/watch?v=hLQl3WQQoQ0'),
('The Night We Met', 'Lord Huron', 'Indie', 'Sad', 'https://www.youtube.com/watch?v=KtlgYxa6BMU'),
('Hurt', 'Johnny Cash', 'Country', 'Sad', 'https://www.youtube.com/watch?v=8AHCfZTRGiI'),
('Fix You', 'Coldplay', 'Alternative', 'Sad', 'https://www.youtube.com/watch?v=k4V3Mo61fJM'),
('Tears in Heaven', 'Eric Clapton', 'Rock', 'Sad', 'https://www.youtube.com/watch?v=JxPj3GAYYZ0'),

-- Angry songs
('Break Stuff', 'Limp Bizkit', 'Nu Metal', 'Angry', 'https://www.youtube.com/watch?v=ZpUYjpKg9KY'),
('Killing in the Name', 'Rage Against the Machine', 'Rock', 'Angry', 'https://www.youtube.com/watch?v=bWXazVhlyxQ'),
('Bodies', 'Drowning Pool', 'Metal', 'Angry', 'https://www.youtube.com/watch?v=04F4xlWSFh0'),
('Freak on a Leash', 'Korn', 'Nu Metal', 'Angry', 'https://www.youtube.com/watch?v=jRGrNDV2mKc'),
('Chop Suey!', 'System of a Down', 'Metal', 'Angry', 'https://www.youtube.com/watch?v=CSvFpBOe8eY'),

-- Relaxed songs
('Weightless', 'Marconi Union', 'Ambient', 'Relaxed', 'https://www.youtube.com/watch?v=UfcAVejslrU'),
('Clair de Lune', 'Claude Debussy', 'Classical', 'Relaxed', 'https://www.youtube.com/watch?v=CvFH_6DNRCY'),
('Sunset Lover', 'Petit Biscuit', 'Electronic', 'Relaxed', 'https://www.youtube.com/watch?v=wuCK-oiE3rM'),
('River Flows in You', 'Yiruma', 'Classical', 'Relaxed', 'https://www.youtube.com/watch?v=7maJOI3QMu0'),
('Breathe', 'Telepopmusik', 'Electronic', 'Relaxed', 'https://www.youtube.com/watch?v=vyut3GyQtn0');

-- Verify data
SELECT COUNT(*) as total_songs FROM songs;
SELECT emotion_tag, COUNT(*) as count FROM songs GROUP BY emotion_tag;
