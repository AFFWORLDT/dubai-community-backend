from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import connect_to_mongo, close_mongo_connection
from routers import auth, users, connections, groups, events, messages, media, location

app = FastAPI(
    title="Dubai Community Backend",
    description="API for Dubai Community Meetups Platform with Cloudinary Integration and Location Services",
    version="2.1.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(connections.router)
app.include_router(groups.router)
app.include_router(events.router)
app.include_router(messages.router)
app.include_router(media.router)
app.include_router(location.router)

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

@app.get("/")
async def root():
    return {
        "message": "Dubai Community Backend API",
        "version": "2.1.0",
        "docs": "/docs",
        "features": [
            "JWT Authentication with Refresh Tokens",
            "Cloudinary Media Upload",
            "Location-Based Services",
            "Nearby User Discovery",
            "Geospatial Event Filtering",
            "User Discovery & Connections",
            "Groups & Events",
            "Real-time Messaging",
            "Premium Features Support"
        ]
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
