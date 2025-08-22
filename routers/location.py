from fastapi import APIRouter, HTTPException, status, Depends, Query, Body
from database import get_collection
from models import LocationUpdate, NearbyUserResponse, LocationFilter
from auth import get_current_user_id
from location_utils import (
    create_location_document, 
    get_location_filters, 
    sort_by_distance,
    format_location_response,
    validate_coordinates,
    calculate_distance,
    get_dubai_regions
)
from bson import ObjectId
from datetime import datetime, timedelta
from typing import List, Optional

router = APIRouter(prefix="/location", tags=["Location"])

@router.post("/update")
async def update_location(
    location_data: LocationUpdate,
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Update user's current location and sharing preferences
    """
    users_collection = get_collection("users")
    
    # Validate coordinates
    if not validate_coordinates(location_data.latitude, location_data.longitude):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid coordinates provided"
        )
    
    # Create location document
    location_doc = create_location_document(
        location_data.latitude,
        location_data.longitude,
        location_data.location_name
    )
    
    # Update user's location and sharing preferences
    update_data = {
        "location": location_doc,
        "share_location": location_data.share_location,
        "last_location_update": datetime.utcnow()
    }
    
    result = await users_collection.update_one(
        {"_id": ObjectId(current_user_id)},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return {
        "message": "Location updated successfully",
        "location": format_location_response(location_doc),
        "share_location": location_data.share_location
    }

@router.get("/nearby", response_model=List[NearbyUserResponse])
async def get_nearby_users(
    latitude: float = Query(..., description="Your current latitude"),
    longitude: float = Query(..., description="Your current longitude"),
    radius_km: float = Query(10.0, description="Search radius in kilometers"),
    interests: Optional[str] = Query(None, description="Comma-separated interests to filter by"),
    age_min: Optional[int] = Query(None, description="Minimum age filter"),
    age_max: Optional[int] = Query(None, description="Maximum age filter"),
    gender: Optional[str] = Query(None, description="Gender filter"),
    online_only: bool = Query(False, description="Show only online users (active in last 30 minutes)"),
    limit: int = Query(50, description="Maximum number of users to return"),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Find nearby users with various filters
    """
    users_collection = get_collection("users")
    
    # Validate coordinates
    if not validate_coordinates(latitude, longitude):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid coordinates provided"
        )
    
    # Parse interests
    interest_list = None
    if interests:
        interest_list = [interest.strip() for interest in interests.split(",")]
    
    # Create aggregation pipeline with $geoNear as first stage
    pipeline = [
        {
            "$geoNear": {
                "near": {
                    "type": "Point",
                    "coordinates": [longitude, latitude]
                },
                "distanceField": "distance",
                "spherical": True,
                "distanceMultiplier": 0.001,  # Convert to kilometers
                "maxDistance": radius_km * 1000  # Convert to meters
            }
        },
        {
            "$match": {
                "_id": {"$ne": ObjectId(current_user_id)},  # Exclude current user
                "share_location": True
            }
        }
    ]
    
    # Add additional filters
    additional_filters = {}
    
    # Add interest filter
    if interest_list:
        additional_filters["interests"] = {"$in": interest_list}
    
    # Add age filter
    if age_min is not None or age_max is not None:
        age_filter = {}
        if age_min is not None:
            age_filter["$gte"] = age_min
        if age_max is not None:
            age_filter["$lte"] = age_max
        additional_filters["age"] = age_filter
    
    # Add gender filter
    if gender:
        additional_filters["gender"] = gender
    
    # Add online filter (users active in last 30 minutes)
    if online_only:
        additional_filters["last_location_update"] = {
            "$gte": datetime.utcnow() - timedelta(minutes=30)
        }
    
    if additional_filters:
        pipeline.append({"$match": additional_filters})
    
    pipeline.append({"$limit": limit})
    
    users = []
    try:
        async for user in users_collection.aggregate(pipeline):
            users.append(NearbyUserResponse(
                id=str(user["_id"]),
                username=user["username"],
                profile_picture=user.get("profile_picture"),
                bio=user.get("bio"),
                interests=user["interests"],
                distance_km=round(user.get("distance", 0), 2),
                location_name=user.get("location", {}).get("location_name"),
                last_active=user.get("last_location_update")
            ))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error in geospatial query: {str(e)}"
        )
    
    return users

@router.get("/regions")
async def get_dubai_regions_list():
    """
    Get list of all Dubai regions for filtering
    """
    regions = get_dubai_regions()
    return {
        "regions": regions,
        "count": len(regions)
    }

@router.get("/my-location")
async def get_my_location(current_user_id: str = Depends(get_current_user_id)):
    """
    Get current user's location and sharing status
    """
    users_collection = get_collection("users")
    
    user = await users_collection.find_one({"_id": ObjectId(current_user_id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    location_info = {
        "location": format_location_response(user.get("location")),
        "share_location": user.get("share_location", False),
        "last_location_update": user.get("last_location_update")
    }
    
    return location_info

@router.post("/toggle-sharing")
async def toggle_location_sharing(
    share_data: dict = Body(...),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Toggle location sharing on/off
    """
    users_collection = get_collection("users")
    
    share_location = share_data.get("share_location")
    if share_location is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="share_location field is required"
        )
    
    result = await users_collection.update_one(
        {"_id": ObjectId(current_user_id)},
        {"$set": {"share_location": share_location}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return {
        "message": f"Location sharing {'enabled' if share_location else 'disabled'}",
        "share_location": share_location
    }

@router.get("/events-nearby")
async def get_nearby_events(
    latitude: float = Query(..., description="Your current latitude"),
    longitude: float = Query(..., description="Your current longitude"),
    radius_km: float = Query(10.0, description="Search radius in kilometers"),
    interests: Optional[str] = Query(None, description="Comma-separated interests to filter by"),
    limit: int = Query(20, description="Maximum number of events to return"),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Find nearby events with location-based filtering
    """
    events_collection = get_collection("events")
    
    # Validate coordinates
    if not validate_coordinates(latitude, longitude):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid coordinates provided"
        )
    
    # Parse interests
    interest_list = None
    if interests:
        interest_list = [interest.strip() for interest in interests.split(",")]
    
    # Create aggregation pipeline with $geoNear as first stage
    pipeline = [
        {
            "$geoNear": {
                "near": {
                    "type": "Point",
                    "coordinates": [longitude, latitude]  # MongoDB uses [longitude, latitude]
                },
                "distanceField": "distance",
                "spherical": True,
                "distanceMultiplier": 0.001,  # Convert to kilometers
                "maxDistance": radius_km * 1000  # Convert to meters
            }
        }
    ]
    
    # Add filters
    filters = {}
    if interest_list:
        filters["interests"] = {"$in": interest_list}
    
    if filters:
        pipeline.append({"$match": filters})
    
    pipeline.append({"$limit": limit})
    
    events = []
    try:
        async for event in events_collection.aggregate(pipeline):
            events.append({
                "id": str(event["_id"]),
                "title": event["title"],
                "description": event.get("description", ""),
                "region": event.get("region", ""),
                "interests": event.get("interests", []),
                "event_date": event.get("event_date"),
                "distance_km": round(event.get("distance", 0), 2),
                "location": format_location_response(event.get("location")),
                "participants_count": len(event.get("participants", [])),
                "price_aed": event.get("price_aed"),
                "cover_image": event.get("cover_image")
            })
    except Exception as e:
        print(f"Geospatial query error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error in geospatial query: {str(e)}"
        )
    
    return events
