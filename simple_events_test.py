import requests
import json

BASE_URL = "http://localhost:8000"

def test_simple_events():
    """Test a simple events query"""
    print("Testing Simple Events Query")
    print("=" * 30)
    
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
    
    # Test regular events endpoint first
    response = requests.get(f"{BASE_URL}/events/upcoming", headers=headers)
    print(f"Regular events status: {response.status_code}")
    if response.status_code == 200:
        events = response.json()
        print(f"✅ Found {len(events)} events")
    
    # Test nearby events with minimal parameters
    params = {
        "latitude": 25.0920,
        "longitude": 55.1381,
        "radius_km": 10.0
    }
    
    response = requests.get(f"{BASE_URL}/events/nearby", params=params, headers=headers)
    print(f"Nearby events status: {response.status_code}")
    print(f"Response: {response.text[:200]}...")  # Show first 200 chars

if __name__ == "__main__":
    test_simple_events()
