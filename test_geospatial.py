import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

async def test_geospatial():
    """Test geospatial queries directly"""
    print("Testing Geospatial Queries")
    print("=" * 30)
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    
    try:
        # Test users geospatial query
        print("Testing users geospatial query...")
        user_pipeline = [
            {
                "$geoNear": {
                    "near": {
                        "type": "Point",
                        "coordinates": [55.1381, 25.0920]  # longitude, latitude
                    },
                    "distanceField": "distance",
                    "spherical": True,
                    "distanceMultiplier": 0.001
                }
            },
            {"$limit": 5}
        ]
        
        users = []
        async for user in db.users.aggregate(user_pipeline):
            users.append({
                "username": user["username"],
                "distance": user.get("distance", 0)
            })
        
        print(f"✅ Found {len(users)} users")
        for user in users:
            print(f"  - {user['username']}: {user['distance']}km")
        
        # Test events geospatial query
        print("\nTesting events geospatial query...")
        event_pipeline = [
            {
                "$geoNear": {
                    "near": {
                        "type": "Point",
                        "coordinates": [55.1381, 25.0920]  # longitude, latitude
                    },
                    "distanceField": "distance",
                    "spherical": True,
                    "distanceMultiplier": 0.001
                }
            },
            {"$limit": 5}
        ]
        
        events = []
        async for event in db.events.aggregate(event_pipeline):
            events.append({
                "title": event["title"],
                "distance": event.get("distance", 0)
            })
        
        print(f"✅ Found {len(events)} events")
        for event in events:
            print(f"  - {event['title']}: {event['distance']}km")
        
    except Exception as e:
        print(f"❌ Error: {e}")
    
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(test_geospatial())
