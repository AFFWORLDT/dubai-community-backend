import requests
import json
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000"

def create_event_with_location():
    """Create an event with location data"""
    print("Creating Event with Location")
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
    
    # Create event with location
    event_data = {
        "title": "Test Event with Location",
        "region": "Dubai Marina",
        "interests": ["fitness", "social"],
        "description": "A test event with location data",
        "event_date": (datetime.utcnow() + timedelta(days=7)).isoformat() + "Z",
        "location": {
            "latitude": 25.0920,
            "longitude": 55.1381,
            "location_name": "Dubai Marina"
        }
    }
    
    response = requests.post(f"{BASE_URL}/events/create", json=event_data, headers=headers)
    print(f"Create event status: {response.status_code}")
    if response.status_code == 200:
        event = response.json()
        print(f"✅ Event created: {event['title']}")
        print(f"   Location: {event.get('location')}")
    else:
        print(f"❌ Error: {response.text}")
    
    # Now test nearby events
    print("\nTesting nearby events...")
    params = {
        "latitude": 25.0920,
        "longitude": 55.1381,
        "radius_km": 10.0,
        "limit": 5
    }
    
    response = requests.get(f"{BASE_URL}/events/nearby", params=params, headers=headers)
    print(f"Events nearby status: {response.status_code}")
    if response.status_code == 200:
        events = response.json()
        print(f"✅ Found {len(events)} nearby events")
        for event in events:
            print(f"  - {event['title']} ({event['distance_km']}km away)")
    else:
        print(f"❌ Error: {response.text}")

if __name__ == "__main__":
    create_event_with_location()
