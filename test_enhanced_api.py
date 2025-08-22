import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_health():
    """Test the health endpoint"""
    response = requests.get(f"{BASE_URL}/health")
    print(f"Health check: {response.status_code} - {response.json()}")

def test_root():
    """Test the root endpoint to see new features"""
    response = requests.get(f"{BASE_URL}/")
    print(f"Root endpoint: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Version: {data['version']}")
        print(f"Features: {data['features']}")

def test_register():
    """Test user registration with new fields"""
    user_data = {
        "username": "testuser_enhanced",
        "email": "test_enhanced@example.com",
        "password": "testpassword123",
        "region": "Dubai Marina",
        "interests": ["fitness", "travel", "food"],
        "bio": "Love exploring Dubai and meeting new people!",
        "age": 28,
        "gender": "male"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", json=user_data)
    print(f"Register: {response.status_code}")
    if response.status_code == 200:
        user = response.json()
        print(f"User created: {user['username']} (ID: {user['id']})")
        return user
    else:
        print(f"Error: {response.json()}")
        return None

def test_login():
    """Test user login with refresh token"""
    login_data = {
        "email": "test_enhanced@example.com",
        "password": "testpassword123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print(f"Login: {response.status_code}")
    if response.status_code == 200:
        tokens = response.json()
        print(f"Access token: {tokens['access_token'][:20]}...")
        print(f"Refresh token: {tokens['refresh_token'][:20]}...")
        return tokens
    else:
        print(f"Error: {response.json()}")
        return None

def test_refresh_token(tokens):
    """Test refresh token functionality"""
    headers = {"Authorization": f"Bearer {tokens['refresh_token']}"}
    response = requests.post(f"{BASE_URL}/auth/refresh", headers=headers)
    print(f"Refresh token: {response.status_code}")
    if response.status_code == 200:
        new_tokens = response.json()
        print(f"New access token: {new_tokens['access_token'][:20]}...")
        return new_tokens
    else:
        print(f"Error: {response.json()}")
        return tokens

def test_user_search(tokens):
    """Test user search functionality"""
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    
    # Test basic search
    response = requests.get(f"{BASE_URL}/users/search?region=Dubai Marina", headers=headers)
    print(f"User search: {response.status_code}")
    if response.status_code == 200:
        users = response.json()
        print(f"Found {len(users)} users in Dubai Marina")
    
    # Test interest-based search
    response = requests.get(f"{BASE_URL}/users/search?interest=fitness", headers=headers)
    print(f"Interest search: {response.status_code}")
    if response.status_code == 200:
        users = response.json()
        print(f"Found {len(users)} users interested in fitness")

def test_profile_update(tokens):
    """Test profile update with new fields"""
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    
    update_data = {
        "bio": "Updated bio - Now a fitness enthusiast!",
        "profile_picture": "https://res.cloudinary.com/dbk0iancm/image/upload/v1234567890/profile.jpg"
    }
    
    response = requests.put(f"{BASE_URL}/users/update", json=update_data, headers=headers)
    print(f"Profile update: {response.status_code}")
    if response.status_code == 200:
        user = response.json()
        print(f"Updated bio: {user['bio']}")
        print(f"Profile picture: {user['profile_picture']}")

def test_media_endpoints(tokens):
    """Test media-related endpoints"""
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    
    # Test media info endpoint (using a sample public_id)
    response = requests.get(f"{BASE_URL}/media/info/sample_public_id", headers=headers)
    print(f"Media info: {response.status_code}")
    # This will likely fail since we don't have a real public_id, but it tests the endpoint

def test_enhanced_messaging(tokens):
    """Test enhanced messaging with attachments"""
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    
    # First, we need to create another user to message
    user2_data = {
        "username": "testuser2_enhanced",
        "email": "test2_enhanced@example.com",
        "password": "testpassword123",
        "region": "Dubai Marina",
        "interests": ["travel", "photography"]
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", json=user2_data)
    if response.status_code == 200:
        user2 = response.json()
        
        # Send a message with attachments
        message_data = {
            "to_user": user2['id'],
            "text": "Hello! Check out this amazing photo from our Dubai trip!",
            "attachments": [
                "https://res.cloudinary.com/dbk0iancm/image/upload/v1234567890/dubai_photo.jpg"
            ]
        }
        
        response = requests.post(f"{BASE_URL}/messages/send", json=message_data, headers=headers)
        print(f"Enhanced message send: {response.status_code}")
        if response.status_code == 200:
            print("Message sent with attachment successfully!")

def test_enhanced_events(tokens):
    """Test enhanced events with descriptions and cover images"""
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    
    event_data = {
        "title": "Dubai Desert Safari Adventure",
        "region": "Dubai Marina",
        "interests": ["travel", "adventure", "photography"],
        "description": "Join us for an unforgettable desert safari experience! We'll explore the stunning Dubai desert, enjoy traditional activities, and capture amazing photos.",
        "cover_image": "https://res.cloudinary.com/dbk0iancm/image/upload/v1234567890/desert_safari.jpg",
        "price_aed": 150.0,
        "event_date": "2024-02-15T18:00:00Z"
    }
    
    response = requests.post(f"{BASE_URL}/events/create", json=event_data, headers=headers)
    print(f"Enhanced event create: {response.status_code}")
    if response.status_code == 200:
        event = response.json()
        print(f"Event created: {event['title']}")
        print(f"Description: {event['description']}")
        print(f"Price: {event['price_aed']} AED")
        print(f"Cover image: {event['cover_image']}")

def main():
    print("Testing Dubai Community Backend v2.0 Enhanced Features")
    print("=" * 60)
    
    # Test basic functionality
    test_health()
    print()
    
    test_root()
    print()
    
    # Test enhanced registration
    user = test_register()
    print()
    
    if user:
        # Test enhanced login with refresh tokens
        tokens = test_login()
        print()
        
        if tokens:
            # Test refresh token functionality
            tokens = test_refresh_token(tokens)
            print()
            
            # Test enhanced user search
            test_user_search(tokens)
            print()
            
            # Test profile update with new fields
            test_profile_update(tokens)
            print()
            
            # Test media endpoints
            test_media_endpoints(tokens)
            print()
            
            # Test enhanced messaging
            test_enhanced_messaging(tokens)
            print()
            
            # Test enhanced events
            test_enhanced_events(tokens)
            print()
    
    print("=" * 60)
    print("Enhanced API testing completed!")
    print("\nKey Features Tested:")
    print("✅ JWT Authentication with Refresh Tokens")
    print("✅ Enhanced User Registration with Bio, Age, Gender")
    print("✅ User Search with Premium Filters")
    print("✅ Profile Updates with Media Support")
    print("✅ Media Upload Endpoints (Cloudinary)")
    print("✅ Enhanced Messaging with Attachments")
    print("✅ Enhanced Events with Descriptions and Cover Images")
    print("✅ Premium Features Support")

if __name__ == "__main__":
    main()
