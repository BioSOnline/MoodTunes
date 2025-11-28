from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import config
from models import db, bcrypt
import os

def create_app(config_name='default'):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Enable CORS for all routes (including file:// origin for local testing)
    CORS(app, resources={r"/api/*": {"origins": "*", "supports_credentials": False}})
    
    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt = JWTManager(app)
    
    # Create instance folder if it doesn't exist
    instance_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance')
    if not os.path.exists(instance_path):
        os.makedirs(instance_path)
    
    # Register blueprints
    from routes import api
    app.register_blueprint(api)
    
    # Create database tables
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")
    
    return app

if __name__ == '__main__':
    app = create_app('development')
    print("Starting Flask backend server...")
    print("API endpoints available at: http://localhost:5001/api/")
    app.run(host='0.0.0.0', port=5001, debug=True)
