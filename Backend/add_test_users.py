"""
Add test users - South Indian multi-regional users
"""
from app import create_app
from models import db, User

app = create_app()

test_users = [
    {'username': 'rajesh_bangalore', 'email': 'rajesh.kumar@bangalore.in', 'password': 'test123'},
    {'username': 'priya_chennai', 'email': 'priya.ramesh@chennai.in', 'password': 'test123'},
    {'username': 'venkat_hyderabad', 'email': 'venkat.reddy@hyderabad.in', 'password': 'test123'},
    {'username': 'lakshmi_kochi', 'email': 'lakshmi.nair@kochi.in', 'password': 'test123'},
    {'username': 'arun_mysore', 'email': 'arun.rao@mysore.in', 'password': 'test123'},
    {'username': 'deepa_vizag', 'email': 'deepa.sastry@vizag.in', 'password': 'test123'},
    {'username': 'karthik_coimbatore', 'email': 'karthik.swamy@coimbatore.in', 'password': 'test123'},
    {'username': 'meena_trivandrum', 'email': 'meena.pillai@trivandrum.in', 'password': 'test123'},
    {'username': 'suresh_madurai', 'email': 'suresh.iyer@madurai.in', 'password': 'test123'},
    {'username': 'anitha_mangalore', 'email': 'anitha.shetty@mangalore.in', 'password': 'test123'},
]

with app.app_context():
    print("\n=== Adding South Indian Test Users ===\n")
    
    for user_data in test_users:
        # Check if user already exists
        existing_user = User.query.filter(
            (User.username == user_data['username']) | 
            (User.email == user_data['email'])
        ).first()
        
        if existing_user:
            print(f"⚠️  User {user_data['username']} already exists, skipping...")
            continue
        
        # Create new user
        user = User(
            username=user_data['username'],
            email=user_data['email']
        )
        user.set_password(user_data['password'])
        
        db.session.add(user)
        print(f"✅ Added: {user_data['username']} ({user_data['email']})")
    
    db.session.commit()
    print(f"\n✨ Successfully added test users!")
    print(f"📝 Login with any username/email and password: test123\n")
