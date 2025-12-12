"""
Database migration script to add password_hash column
"""
from app import create_app
from models import db
import sqlite3

app = create_app()

with app.app_context():
    # Get database path
    db_path = app.config['SQLALCHEMY_DATABASE_URI'].replace('sqlite:///', '')
    
    # Connect directly to SQLite
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if password_hash column exists
        cursor.execute("PRAGMA table_info(users)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'password_hash' not in columns:
            print("Adding password_hash column to users table...")
            cursor.execute("ALTER TABLE users ADD COLUMN password_hash VARCHAR(255)")
            conn.commit()
            print("Migration completed successfully!")
        else:
            print("password_hash column already exists.")
            
    except Exception as e:
        print(f"Error during migration: {e}")
        conn.rollback()
    finally:
        conn.close()
