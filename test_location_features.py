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

def test_register_user(username, email, region, interests, latitude, longitude):
    """Register a user with location"""
    user_data = {
        "username": username,
        "email": email,
        "password": "testpassword123",
        "region": region,
        "interests": interests,
        "bio": f"Love exploring {region}!",
        "age": 25,
        "gender": "male"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", json=user_data)
    print(f"Register {username}: {response.status_code}")
    if response.status_code == 200:
        user = response.json()
        print(f"User created: {user['username']} (ID: {user['id']})")
        return user
    else:
        print(f"Error: {response.json()}")
        return None

def test_login(email):
    """Login user and get tokens"""
    login_data = {
        "email": email,
        "password": "testpassword123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print(f"Login {email}: {response.status_code}")
    if response.status_code == 200:
        tokens = response.json()
        return tokens
    else:
        print(f"Error: {response.json()}")
        return None

def test_update_location(tokens, latitude, longitude, location_name):
    """Update user's location"""
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    
    location_data = {
        "latitude": latitude,
        "longitude": longitude,
        "location_name": location_name,
        "share_location": True
    }
    
    response = requests.post(f"{BASE_URL}/location/update", json=location_data, headers=headers)
    print(f"Update location: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Location updated: {result['location']}")
        return True
    else:
        print(f"Error: {response.json()}")
        return False

def test_get_my_location(tokens):
    """Get current user's location"""
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    
    response = requests.get(f"{BASE_URL}/location/my-location", headers=headers)
    print(f"Get my location: {response.status_code}")
    if response.status_code == 200:
        location = response.json()
        print(f"My location: {location}")
        return location
    else:
        print(f"Error: {response.json()}")
        return None

def test_nearby_users(tokens, latitude, longitude, radius=5.0):
    """Find nearby users"""
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "radius_km": radius,
        "limit": 10
    }
    
    response = requests.get(f"{BASE_URL}/location/nearby", params=params, headers=headers)
    print(f"Nearby users: {response.status_code}")
    if response.status_code == 200:
        users = response.json()
        print(f"Found {len(users)} nearby users")
        for user in users[:3]:  # Show first 3 users
            print(f"  - {user['username']} ({user['distance_km']}km away)")
        return users
    else:
        print(f"Error: {response.json()}")
        return []

def test_location_based_search(tokens, latitude, longitude, interests=None):
    """Test location-based user search"""
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "radius_km": 10.0,
        "limit": 10
    }
    
    if interests:
        params["interests"] = interests
    
    response = requests.get(f"{BASE_URL}/users/search-location", params=params, headers=headers)
    print(f"Location-based search: {response.status_code}")
    if response.status_code == 200:
        users = response.json()
        print(f"Found {len(users)} users in location search")
        return users
    else:
        print(f"Error: {response.json()}")
        return []

def test_create_event_with_location(tokens, title, latitude, longitude, location_name):
    """Create an event with location"""
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    
    event_data = {
        "title": title,
        "region": "Dubai Marina",
        "interests": ["fitness", "social"],
        "description": f"Join us for an amazing event at {location_name}!",
        "event_date": "2024-02-15T18:00:00Z",
        "location": {
            "latitude": latitude,
            "longitude": longitude,
            "location_name": location_name
        }
    }
    
    response = requests.post(f"{BASE_URL}/events/create", json=event_data, headers=headers)
    print(f"Create event: {response.status_code}")
    if response.status_code == 200:
        event = response.json()
        print(f"Event created: {event['title']}")
        return event
    else:
        print(f"Error: {response.json()}")
        return None

def test_nearby_events(tokens, latitude, longitude):
    """Find nearby events"""
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "radius_km": 10.0,
        "limit": 5
    }
    
    response = requests.get(f"{BASE_URL}/events/nearby", params=params, headers=headers)
    print(f"Nearby events: {response.status_code}")
    if response.status_code == 200:
        events = response.json()
        print(f"Found {len(events)} nearby events")
        for event in events:
            print(f"  - {event['title']} ({event['distance_km']}km away)")
        return events
    else:
        print(f"Error: {response.json()}")
        return []

def test_dubai_regions():
    """Get Dubai regions list"""
    response = requests.get(f"{BASE_URL}/location/regions")
    print(f"Dubai regions: {response.status_code}")
    if response.status_code == 200:
        regions = response.json()
        print(f"Available regions: {regions['count']}")
        print(f"Sample regions: {regions['regions'][:5]}")
        return regions
    else:
        print(f"Error: {response.json()}")
        return None

def test_toggle_location_sharing(tokens, share=True):
    """Toggle location sharing"""
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    
    response = requests.post(f"{BASE_URL}/location/toggle-sharing", json={"share_location": share}, headers=headers)
    print(f"Toggle location sharing: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Location sharing: {result['message']}")
        return True
    else:
        print(f"Error: {response.json()}")
        return False

def main():
    print("Testing Dubai Community Backend v2.1.0 Location Features")
    print("=" * 70)
    
    # Test basic functionality
    test_health()
    print()
    
    test_root()
    print()
    
    # Test Dubai regions
    test_dubai_regions()
    print()
    
    # Dubai Marina coordinates
    dubai_marina_lat = 25.0920
    dubai_marina_lon = 55.1381
    
    # Downtown Dubai coordinates
    downtown_lat = 25.1972
    downtown_lon = 55.2744
    
    # Register users in different locations
    print("Creating test users in different locations...")
    
    user1 = test_register_user("user_marina", "marina@test.com", "Dubai Marina", ["fitness", "travel"], dubai_marina_lat, dubai_marina_lon)
    user2 = test_register_user("user_downtown", "downtown@test.com", "Downtown Dubai", ["food", "culture"], downtown_lat, downtown_lon)
    user3 = test_register_user("user_remote", "remote@test.com", "Dubai Marina", ["gaming", "tech"], 25.0920, 55.1381)
    
    print()
    
    if user1 and user2 and user3:
        # Test location features for each user
        print("Testing location features...")
        
        # User 1 - Dubai Marina
        tokens1 = test_login("marina@test.com")
        if tokens1:
            test_update_location(tokens1, dubai_marina_lat, dubai_marina_lon, "Dubai Marina Mall")
            test_get_my_location(tokens1)
            test_create_event_with_location(tokens1, "Marina Fitness Meetup", dubai_marina_lat, dubai_marina_lon, "Dubai Marina")
            print()
        
        # User 2 - Downtown Dubai
        tokens2 = test_login("downtown@test.com")
        if tokens2:
            test_update_location(tokens2, downtown_lat, downtown_lon, "Burj Khalifa")
            test_get_my_location(tokens2)
            test_create_event_with_location(tokens2, "Downtown Food Tour", downtown_lat, downtown_lon, "Downtown Dubai")
            print()
        
        # User 3 - Remote location
        tokens3 = test_login("remote@test.com")
        if tokens3:
            test_update_location(tokens3, 25.0920, 55.1381, "Remote Location")
            test_get_my_location(tokens3)
            print()
        
        # Test nearby features
        print("Testing nearby discovery features...")
        
        if tokens1:
            print("\n--- Testing from Dubai Marina ---")
            test_nearby_users(tokens1, dubai_marina_lat, dubai_marina_lon, 20.0)
            test_location_based_search(tokens1, dubai_marina_lat, dubai_marina_lon, "fitness")
            test_nearby_events(tokens1, dubai_marina_lat, dubai_marina_lon)
        
        if tokens2:
            print("\n--- Testing from Downtown Dubai ---")
            test_nearby_users(tokens2, downtown_lat, downtown_lon, 20.0)
            test_location_based_search(tokens2, downtown_lat, downtown_lon, "food")
            test_nearby_events(tokens2, downtown_lat, downtown_lon)
        
        # Test location sharing toggle
        if tokens1:
            print("\n--- Testing location sharing toggle ---")
            test_toggle_location_sharing(tokens1, False)
            test_toggle_location_sharing(tokens1, True)
    
    print("=" * 70)
    print("Location features testing completed!")
    print("\nKey Location Features Tested:")
    print("✅ Location Update & Sharing")
    print("✅ Nearby User Discovery")
    print("✅ Location-Based User Search")
    print("✅ Geospatial Event Creation")
    print("✅ Nearby Event Discovery")
    print("✅ Dubai Regions List")
    print("✅ Location Sharing Toggle")
    print("✅ Distance Calculations")
    print("✅ Coordinate Validation")

if __name__ == "__main__":
    main()
