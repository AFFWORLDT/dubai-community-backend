import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test the health endpoint"""
    response = requests.get(f"{BASE_URL}/health")
    print(f"Health check: {response.status_code} - {response.json()}")

def test_register():
    """Test user registration"""
    user_data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpassword123",
        "region": "Dubai Marina",
        "interests": ["fitness", "travel"]
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", json=user_data)
    print(f"Register: {response.status_code}")
    if response.status_code == 200:
        print(f"User created: {response.json()}")
    else:
        print(f"Error: {response.json()}")

def test_login():
    """Test user login"""
    login_data = {
        "email": "test@example.com",
        "password": "testpassword123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print(f"Login: {response.status_code}")
    if response.status_code == 200:
        token = response.json()["access_token"]
        print(f"Token received: {token[:20]}...")
        return token
    else:
        print(f"Error: {response.json()}")
        return None

def test_protected_endpoint(token):
    """Test a protected endpoint"""
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/auth/me", headers=headers)
    print(f"Protected endpoint: {response.status_code}")
    if response.status_code == 200:
        print(f"User profile: {response.json()}")
    else:
        print(f"Error: {response.json()}")

if __name__ == "__main__":
    print("Testing Dubai Community Backend API...")
    print("=" * 50)
    
    # Test health endpoint
    test_health()
    print()
    
    # Test registration
    test_register()
    print()
    
    # Test login
    token = test_login()
    print()
    
    # Test protected endpoint
    if token:
        test_protected_endpoint(token)
    
    print("=" * 50)
    print("Test completed!")
