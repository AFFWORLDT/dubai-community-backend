import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

async def setup_indexes():
    """Set up MongoDB indexes for the application"""
    print("Setting up MongoDB indexes...")
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    
    try:
        # Create geospatial index for users collection
        print("Creating geospatial index for users.location...")
        await db.users.create_index([("location", "2dsphere")])
        print("✅ Users geospatial index created")
        
        # Create geospatial index for events collection
        print("Creating geospatial index for events.location...")
        await db.events.create_index([("location", "2dsphere")])
        print("✅ Events geospatial index created")
        
        # Create other useful indexes
        print("Creating other indexes...")
        
        # Users indexes
        await db.users.create_index([("email", 1)], unique=True)
        await db.users.create_index([("username", 1)], unique=True)
        await db.users.create_index([("region", 1)])
        await db.users.create_index([("interests", 1)])
        await db.users.create_index([("share_location", 1)])
        await db.users.create_index([("last_location_update", -1)])
        
        # Events indexes
        await db.events.create_index([("creator_id", 1)])
        await db.events.create_index([("region", 1)])
        await db.events.create_index([("interests", 1)])
        await db.events.create_index([("event_date", 1)])
        await db.events.create_index([("created_at", -1)])
        
        # Connections indexes
        await db.connections.create_index([("from_user", 1)])
        await db.connections.create_index([("to_user", 1)])
        await db.connections.create_index([("status", 1)])
        
        # Messages indexes
        await db.messages.create_index([("from_user", 1)])
        await db.messages.create_index([("to_user", 1)])
        await db.messages.create_index([("created_at", -1)])
        
        # Groups indexes
        await db.groups.create_index([("region", 1)])
        await db.groups.create_index([("interest", 1)])
        await db.groups.create_index([("members", 1)])
        
        print("✅ All indexes created successfully!")
        
    except Exception as e:
        print(f"❌ Error creating indexes: {e}")
    
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(setup_indexes())
