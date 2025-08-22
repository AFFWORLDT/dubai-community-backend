import requests
import json

BASE_URL = "http://localhost:8000"

def debug_events():
    """Debug the events nearby endpoint"""
    print("Debugging Events Nearby Endpoint")
    print("=" * 40)
    
    # Login
    login_data = {
        "email": "marina@test.com",
        "password": "testpassword123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    if response.status_code != 200:
        print(f"Login failed: {response.status_code}")
        return
    
    tokens = response.json()
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    
    # Test events nearby
    params = {
        "latitude": 25.0920,
        "longitude": 55.1381,
        "radius_km": 10.0,
        "limit": 5
    }
    
    response = requests.get(f"{BASE_URL}/events/nearby", params=params, headers=headers)
    print(f"Events nearby status: {response.status_code}")
    print(f"Response: {response.text}")

if __name__ == "__main__":
    debug_events()
