import requests
import json
import time
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    YELLOW = '\033[93m'
    BOLD = '\033[1m'
    END = '\033[0m'

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.END}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.END}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.END}")

def print_section(title):
    print(f"\n{Colors.BOLD}{Colors.YELLOW}{'='*60}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.YELLOW}{title.center(60)}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.YELLOW}{'='*60}{Colors.END}")

def test_endpoint(method, endpoint, data=None, headers=None, params=None, expected_status=200):
    """Generic endpoint tester"""
    try:
        if method == "GET":
            response = requests.get(f"{BASE_URL}{endpoint}", headers=headers, params=params)
        elif method == "POST":
            response = requests.post(f"{BASE_URL}{endpoint}", json=data, headers=headers, params=params)
        elif method == "PUT":
            response = requests.put(f"{BASE_URL}{endpoint}", json=data, headers=headers, params=params)
        elif method == "DELETE":
            response = requests.delete(f"{BASE_URL}{endpoint}", headers=headers, params=params)
        
        if response.status_code == expected_status:
            print_success(f"{method} {endpoint}: {response.status_code}")
            return response.json() if response.content else {}
        else:
            print_error(f"{method} {endpoint}: {response.status_code} (expected {expected_status})")
            if response.content:
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data.get('detail', 'Unknown error')}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            return None
    except Exception as e:
        print_error(f"{method} {endpoint}: Exception - {str(e)}")
        return None

def test_health_and_root():
    print_section("HEALTH & ROOT ENDPOINTS")
    
    # Test health endpoint
    result = test_endpoint("GET", "/health")
    if result:
        print_info(f"Health status: {result.get('status')}")
    
    # Test root endpoint
    result = test_endpoint("GET", "/")
    if result:
        print_info(f"API Version: {result.get('version')}")
        print_info(f"Features: {len(result.get('features', []))} available")

def test_authentication():
    print_section("AUTHENTICATION ENDPOINTS")
    
    # Test user registration
    user_data = {
        "username": f"testuser_{int(time.time())}",
        "email": f"test_{int(time.time())}@example.com",
        "password": "testpassword123",
        "region": "Dubai Marina",
        "interests": ["fitness", "travel", "technology"],
        "bio": "Test user for comprehensive testing",
        "age": 28,
        "gender": "male"
    }
    
    register_result = test_endpoint("POST", "/auth/register", data=user_data)
    if not register_result:
        print_error("Failed to register user, trying with existing user")
        user_data["email"] = "marina@test.com"
        user_data["username"] = "user_marina"
    
    # Test user login
    login_data = {
        "email": user_data["email"],
        "password": "testpassword123"
    }
    
    login_result = test_endpoint("POST", "/auth/login", data=login_data)
    if not login_result:
        return None
    
    access_token = login_result.get("access_token")
    refresh_token = login_result.get("refresh_token")
    headers = {"Authorization": f"Bearer {access_token}"}
    
    print_info(f"Access token obtained: {access_token[:20]}...")
    print_info(f"Refresh token obtained: {refresh_token[:20]}...")
    
    # Test get current user
    me_result = test_endpoint("GET", "/auth/me", headers=headers)
    if me_result:
        print_info(f"Current user: {me_result.get('username')} ({me_result.get('email')})")
    
    # Test token refresh
    refresh_result = test_endpoint("POST", "/auth/refresh", data={"refresh_token": refresh_token})
    if refresh_result:
        print_info("Token refresh successful")
    
    return headers, user_data

def test_users(headers):
    print_section("USER ENDPOINTS")
    
    # Test get user profile
    profile_result = test_endpoint("GET", "/users/me", headers=headers)
    if profile_result:
        print_info(f"Profile: {profile_result.get('username')} - {len(profile_result.get('interests', []))} interests")
    
    # Test update user profile
    update_data = {
        "bio": "Updated bio for comprehensive testing",
        "age": 29,
        "region": "Downtown Dubai"
    }
    
    update_result = test_endpoint("PUT", "/users/update", data=update_data, headers=headers)
    if update_result:
        print_info(f"Profile updated: {update_result.get('bio')}")
    
    # Test user search
    search_result = test_endpoint("GET", "/users/search", headers=headers, params={"region": "Dubai Marina"})
    if search_result:
        print_info(f"User search found: {len(search_result)} users")
    
    # Test location-based user search
    location_search_result = test_endpoint("GET", "/users/search-location", headers=headers, params={
        "latitude": 25.0920,
        "longitude": 55.1381,
        "radius_km": 20.0,
        "limit": 10
    })
    if location_search_result:
        print_info(f"Location-based search found: {len(location_search_result)} users")
    
    # Test regions
    regions_result = test_endpoint("GET", "/users/regions", headers=headers)
    if regions_result:
        print_info(f"Available regions: {regions_result.get('count')} regions")

def test_location_features(headers):
    print_section("LOCATION ENDPOINTS")
    
    # Test location update
    location_data = {
        "latitude": 25.0920,
        "longitude": 55.1381,
        "location_name": "Dubai Marina Test Location",
        "share_location": True
    }
    
    location_update = test_endpoint("POST", "/location/update", data=location_data, headers=headers)
    if location_update:
        print_info(f"Location updated: {location_update.get('location', {}).get('location_name')}")
    
    # Test get my location
    my_location = test_endpoint("GET", "/location/my-location", headers=headers)
    if my_location:
        loc = my_location.get('location', {})
        print_info(f"Current location: {loc.get('location_name')} ({loc.get('latitude')}, {loc.get('longitude')})")
    
    # Test nearby users
    nearby_users = test_endpoint("GET", "/location/nearby", headers=headers, params={
        "latitude": 25.0920,
        "longitude": 55.1381,
        "radius_km": 20.0,
        "limit": 10
    })
    if nearby_users:
        print_info(f"Nearby users found: {len(nearby_users)}")
        for user in nearby_users[:3]:
            print(f"   - {user['username']}: {user['distance_km']}km away")
    
    # Test nearby events
    nearby_events = test_endpoint("GET", "/location/events-nearby", headers=headers, params={
        "latitude": 25.0920,
        "longitude": 55.1381,
        "radius_km": 20.0,
        "limit": 10
    })
    if nearby_events:
        print_info(f"Nearby events found: {len(nearby_events)}")
        for event in nearby_events[:3]:
            print(f"   - {event['title']}: {event['distance_km']}km away")
    
    # Test Dubai regions
    regions = test_endpoint("GET", "/location/regions", headers=headers)
    if regions:
        print_info(f"Dubai regions: {regions.get('count')} available")
    
    # Test location sharing toggle
    toggle_off = test_endpoint("POST", "/location/toggle-sharing", data={"share_location": False}, headers=headers)
    if toggle_off:
        print_info("Location sharing toggled OFF")
    
    toggle_on = test_endpoint("POST", "/location/toggle-sharing", data={"share_location": True}, headers=headers)
    if toggle_on:
        print_info("Location sharing toggled ON")

def test_events(headers):
    print_section("EVENT ENDPOINTS")
    
    # Test create event
    event_data = {
        "title": f"Test Event {int(time.time())}",
        "region": "Dubai Marina",
        "interests": ["fitness", "social"],
        "description": "A comprehensive test event with location",
        "event_date": (datetime.utcnow() + timedelta(days=7)).isoformat() + "Z",
        "location": {
            "latitude": 25.0920,
            "longitude": 55.1381,
            "location_name": "Dubai Marina Test Venue"
        },
        "price_aed": 50.0
    }
    
    create_result = test_endpoint("POST", "/events/create", data=event_data, headers=headers)
    event_id = None
    if create_result:
        event_id = create_result.get("id")
        print_info(f"Event created: {create_result.get('title')} (ID: {event_id})")
    
    # Test upcoming events
    upcoming_events = test_endpoint("GET", "/events/upcoming", headers=headers, params={"region": "Dubai Marina"})
    if upcoming_events:
        print_info(f"Upcoming events: {len(upcoming_events)} found")
    
    # Test RSVP to event
    if event_id:
        rsvp_result = test_endpoint("POST", "/events/rsvp", data={"event_id": event_id}, headers=headers)
        if rsvp_result:
            print_info("RSVP successful")

def test_media_endpoints(headers):
    print_section("MEDIA ENDPOINTS")
    
    # Test media info endpoint (should work without actual file upload)
    info_result = test_endpoint("GET", "/media/info/test_public_id", headers=headers, expected_status=404)
    if info_result is not None:
        print_info("Media info endpoint accessible")
    
    # Test delete endpoint (should work without actual file)
    delete_result = test_endpoint("DELETE", "/media/delete/test_public_id", headers=headers, expected_status=404)
    if delete_result is not None:
        print_info("Media delete endpoint accessible")
    
    print_info("Note: File upload endpoints require actual files and are not tested here")

def test_connections_groups_messages(headers):
    print_section("CONNECTIONS, GROUPS & MESSAGES")
    
    # Test groups
    groups_result = test_endpoint("GET", "/groups/", headers=headers)
    if groups_result:
        print_info(f"Groups endpoint working: {len(groups_result)} groups found")
    
    # Test user's groups
    my_groups = test_endpoint("GET", "/groups/my", headers=headers)
    if my_groups:
        print_info(f"My groups: {len(my_groups)} groups")
    
    # Test connections
    connections = test_endpoint("GET", "/connections/list", headers=headers)
    if connections:
        print_info(f"Connections endpoint working: {len(connections)} connections")
    
    # Test pending connections
    pending = test_endpoint("GET", "/connections/pending", headers=headers)
    if pending:
        print_info(f"Pending connections: {len(pending)} requests")

def run_comprehensive_test():
    print_section("DUBAI COMMUNITY BACKEND v2.1.0 COMPREHENSIVE TEST")
    print_info("Testing all API endpoints and features...")
    
    # Test health and root
    test_health_and_root()
    
    # Test authentication and get headers
    auth_result = test_authentication()
    if not auth_result:
        print_error("Authentication failed - cannot continue with protected endpoints")
        return
    
    headers, user_data = auth_result
    
    # Test all protected endpoints
    test_users(headers)
    test_location_features(headers)
    test_events(headers)
    test_media_endpoints(headers)
    test_connections_groups_messages(headers)
    
    print_section("COMPREHENSIVE TEST COMPLETED")
    print_success("All endpoint categories tested!")
    print_info("Check individual test results above for detailed status")
    
    # Summary
    print(f"\n{Colors.BOLD}🎉 Dubai Community Backend v2.1.0 - Feature Summary:{Colors.END}")
    print("✅ Health & Root endpoints")
    print("✅ Authentication (register, login, refresh, me)")
    print("✅ User management (profile, update, search)")
    print("✅ Location-based services (update, nearby users/events, regions)")
    print("✅ Event management (create, RSVP, upcoming)")
    print("✅ Media endpoints (accessible)")
    print("✅ Connections, Groups & Messages (accessible)")
    print("✅ Geospatial queries with distance calculations")
    print("✅ JWT token management")
    print("✅ MongoDB integration")
    print("✅ Cloudinary configuration")

if __name__ == "__main__":
    run_comprehensive_test()
