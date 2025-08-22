import requests
import json

BASE_URL = "http://localhost:8000"

def test_login_and_location():
    """Test login and location features with existing users"""
    print("Testing Location Features with Existing Users")
    print("=" * 50)
    
    # Login with existing user
    login_data = {
        "email": "marina@test.com",
        "password": "testpassword123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print(f"Login: {response.status_code}")
    
    if response.status_code == 200:
        tokens = response.json()
        headers = {"Authorization": f"Bearer {tokens['access_token']}"}
        
        # Test location update
        location_data = {
            "latitude": 25.0920,
            "longitude": 55.1381,
            "location_name": "Dubai Marina Mall",
            "share_location": True
        }
        
        response = requests.post(f"{BASE_URL}/location/update", json=location_data, headers=headers)
        print(f"Update location: {response.status_code}")
        if response.status_code == 200:
            print("✅ Location updated successfully")
        
        # Test nearby users
        params = {
            "latitude": 25.0920,
            "longitude": 55.1381,
            "radius_km": 20.0,
            "limit": 10
        }
        
        response = requests.get(f"{BASE_URL}/location/nearby", params=params, headers=headers)
        print(f"Nearby users: {response.status_code}")
        if response.status_code == 200:
            users = response.json()
            print(f"✅ Found {len(users)} nearby users")
            for user in users[:3]:
                print(f"  - {user['username']} ({user['distance_km']}km away)")
        else:
            print(f"❌ Error: {response.text}")
        
        # Test nearby events
        response = requests.get(f"{BASE_URL}/events/nearby", params=params, headers=headers)
        print(f"Nearby events: {response.status_code}")
        if response.status_code == 200:
            events = response.json()
            print(f"✅ Found {len(events)} nearby events")
            for event in events:
                print(f"  - {event['title']} ({event['distance_km']}km away)")
        else:
            print(f"❌ Error: {response.text}")
        
        # Test Dubai regions
        response = requests.get(f"{BASE_URL}/location/regions", headers=headers)
        print(f"Dubai regions: {response.status_code}")
        if response.status_code == 200:
            regions = response.json()
            print(f"✅ Available regions: {regions['count']}")
        
        # Test location sharing toggle
        response = requests.post(f"{BASE_URL}/location/toggle-sharing", json={"share_location": False}, headers=headers)
        print(f"Toggle sharing off: {response.status_code}")
        if response.status_code == 200:
            print("✅ Location sharing toggled off")
        
        response = requests.post(f"{BASE_URL}/location/toggle-sharing", json={"share_location": True}, headers=headers)
        print(f"Toggle sharing on: {response.status_code}")
        if response.status_code == 200:
            print("✅ Location sharing toggled on")
    
    else:
        print(f"❌ Login failed: {response.json()}")

if __name__ == "__main__":
    test_login_and_location()
