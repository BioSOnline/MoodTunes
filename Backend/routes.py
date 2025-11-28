from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from models import db, User, Song

# Create Blueprint for API routes
api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Flask backend is running'}), 200

# ============ AUTHENTICATION ROUTES ============

@api.route('/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or 'username' not in data or 'email' not in data or 'password' not in data:
            return jsonify({'error': 'Username, email, and password are required'}), 400
        
        # Validate password length
        if len(data['password']) < 6:
            return jsonify({'error': 'Password must be at least 6 characters long'}), 400
        
        # Check if user already exists
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already exists'}), 400
        
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already exists'}), 400
        
        # Create new user
        user = User(username=data['username'], email=data['email'])
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        
        return jsonify({
            'message': 'User registered successfully',
            'user': user.to_dict(),
            'access_token': access_token,
            'refresh_token': refresh_token
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/auth/login', methods=['POST'])
def login():
    """Login user and return JWT tokens"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or 'login' not in data or 'password' not in data:
            return jsonify({'error': 'Username/Email and password are required'}), 400
        
        # Find user by email or username
        login_identifier = data['login']
        user = User.query.filter(
            (User.email == login_identifier) | (User.username == login_identifier)
        ).first()
        
        # Check if user exists and password is correct
        if not user or not user.check_password(data['password']):
            return jsonify({'error': 'Invalid username/email or password'}), 401
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        
        return jsonify({
            'message': 'Login successful',
            'user': user.to_dict(),
            'access_token': access_token,
            'refresh_token': refresh_token
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/auth/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh access token using refresh token"""
    try:
        current_user_id = get_jwt_identity()
        access_token = create_access_token(identity=current_user_id)
        
        return jsonify({
            'access_token': access_token
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current authenticated user"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify(user.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============ USER ROUTES ============

@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    """Get all users (protected route)"""
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    """Get a specific user by ID (protected route)"""
    try:
        user = User.query.get(user_id)
        if user is None:
            return jsonify({'error': 'User not found'}), 404
        return jsonify(user.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    """Update an existing user (protected route)"""
    try:
        current_user_id = get_jwt_identity()
        
        # Users can only update their own profile
        if current_user_id != user_id:
            return jsonify({'error': 'Unauthorized to update this user'}), 403
        
        user = User.query.get(user_id)
        if user is None:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json()
        
        # Update username if provided
        if 'username' in data:
            # Check if username is already taken by another user
            existing = User.query.filter_by(username=data['username']).first()
            if existing and existing.id != user_id:
                return jsonify({'error': 'Username already exists'}), 400
            user.username = data['username']
        
        # Update email if provided
        if 'email' in data:
            # Check if email is already taken by another user
            existing = User.query.filter_by(email=data['email']).first()
            if existing and existing.id != user_id:
                return jsonify({'error': 'Email already exists'}), 400
            user.email = data['email']
        
        # Update password if provided
        if 'password' in data:
            if len(data['password']) < 6:
                return jsonify({'error': 'Password must be at least 6 characters long'}), 400
            user.set_password(data['password'])
        
        db.session.commit()
        return jsonify(user.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    """Delete a user (protected route)"""
    try:
        current_user_id = get_jwt_identity()
        
        # Users can only delete their own account
        if current_user_id != user_id:
            return jsonify({'error': 'Unauthorized to delete this user'}), 403
        
        user = User.query.get(user_id)
        if user is None:
            return jsonify({'error': 'User not found'}), 404
        
        db.session.delete(user)
        db.session.commit()
        
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# ============ SONG ROUTES ============

@api.route('/songs', methods=['GET'])
def get_songs():
    """Get all songs or filter by emotion"""
    try:
        # Check if emotion filter is provided
        emotion = request.args.get('emotion')
        
        if emotion:
            # Filter by emotion tag (case-insensitive)
            songs = Song.query.filter(Song.emotion_tag.ilike(emotion)).all()
        else:
            # Get all songs
            songs = Song.query.all()
        
        return jsonify([song.to_dict() for song in songs]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/songs/<int:song_id>', methods=['GET'])
def get_song(song_id):
    """Get a specific song by ID"""
    try:
        song = Song.query.get(song_id)
        if song is None:
            return jsonify({'error': 'Song not found'}), 404
        return jsonify(song.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/songs', methods=['POST'])
def create_song():
    """Create a new song"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or 'title' not in data or 'artist' not in data or 'emotion_tag' not in data:
            return jsonify({'error': 'Title, artist, and emotion_tag are required'}), 400
        
        # Create new song
        song = Song.from_dict(data)
        db.session.add(song)
        db.session.commit()
        
        return jsonify(song.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/songs/emotions', methods=['GET'])
def get_emotions():
    """Get list of available emotions"""
    try:
        # Get distinct emotion tags
        emotions = db.session.query(Song.emotion_tag).distinct().all()
        emotion_list = [emotion[0] for emotion in emotions]
        return jsonify({'emotions': emotion_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
