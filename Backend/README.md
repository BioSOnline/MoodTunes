# Flask Backend with SQLite Database

A Flask backend application with SQLite database connection and RESTful API endpoints.

## Setup Instructions

### 1. Create Virtual Environment (Recommended)
```bash
cd Backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the Application
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if the server is running

### User Management

#### Get All Users
- **GET** `/api/users`
- Response: Array of user objects

#### Get Single User
- **GET** `/api/users/<id>`
- Response: User object

#### Create User
- **POST** `/api/users`
- Body: `{"username": "string", "email": "string"}`
- Response: Created user object

#### Update User
- **PUT** `/api/users/<id>`
- Body: `{"username": "string", "email": "string"}` (both optional)
- Response: Updated user object

#### Delete User
- **DELETE** `/api/users/<id>`
- Response: Success message

## Example API Calls

### Create a User
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","email":"john@example.com"}'
```

### Get All Users
```bash
curl http://localhost:5000/api/users
```

### Get Specific User
```bash
curl http://localhost:5000/api/users/1
```

### Update User
```bash
curl -X PUT http://localhost:5000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"username":"john_updated"}'
```

### Delete User
```bash
curl -X DELETE http://localhost:5000/api/users/1
```

## Database

The application uses SQLite database which is automatically created in the `instance/database.db` file when you first run the application.

## Project Structure

```
Backend/
├── app.py              # Main Flask application
├── config.py           # Configuration settings
├── models.py           # Database models
├── routes.py           # API routes
├── requirements.txt    # Python dependencies
├── .gitignore         # Git ignore file
└── instance/          # Database folder (auto-created)
    └── database.db    # SQLite database (auto-created)
```

## Development

- The application runs in debug mode by default
- Database tables are automatically created on first run
- CORS is enabled for all routes to allow frontend integration
