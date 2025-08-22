import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

async def check_indexes():
    """Check MongoDB indexes"""
    print("Checking MongoDB indexes...")
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    
    try:
        # Check users collection indexes
        print("\nUsers collection indexes:")
        user_indexes = await db.users.list_indexes().to_list(length=None)
        for idx in user_indexes:
            print(f"  - {idx['name']}: {idx['key']}")
        
        # Check events collection indexes
        print("\nEvents collection indexes:")
        event_indexes = await db.events.list_indexes().to_list(length=None)
        for idx in event_indexes:
            print(f"  - {idx['name']}: {idx['key']}")
        
        # Check if there are any events with location data
        print("\nChecking events with location data:")
        events_with_location = await db.events.count_documents({"location": {"$exists": True}})
        print(f"  Events with location: {events_with_location}")
        
        if events_with_location > 0:
            # Show sample event
            sample_event = await db.events.find_one({"location": {"$exists": True}})
            print(f"  Sample event location: {sample_event.get('location')}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
    
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(check_indexes())
