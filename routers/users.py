from fastapi import APIRouter, HTTPException, status, Depends, Query
from database import get_collection
from models import UserUpdate, UserResponse
from auth import get_current_user, get_current_user_id
from location_utils import (
    get_location_filters, 
    validate_coordinates,
    format_location_response,
    get_dubai_regions
)
from bson import ObjectId
from typing import List, Optional
from datetime import datetime, timedelta

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=UserResponse)
async def get_profile(current_user = Depends(get_current_user)):
    # Convert to response format
    response_dict = {
        "id": str(current_user["_id"]),
        "username": current_user["username"],
        "email": current_user["email"],
        "region": current_user["region"],
        "interests": current_user["interests"],
        "connections_count": current_user["connections_count"],
        "created_at": current_user["created_at"],
        "profile_picture": current_user.get("profile_picture"),
        "bio": current_user.get("bio"),
        "gender": current_user.get("gender"),
        "age": current_user.get("age"),
        "boosted_until": current_user.get("boosted_until"),
        "last_login": current_user.get("last_login"),
        "location": format_location_response(current_user.get("location")),
        "share_location": current_user.get("share_location", False),
        "last_location_update": current_user.get("last_location_update")
    }
    
    return UserResponse(**response_dict)

@router.put("/update", response_model=UserResponse)
async def update_profile(
    user_update: UserUpdate,
    current_user = Depends(get_current_user),
    current_user_id: str = Depends(get_current_user_id)
):
    users_collection = get_collection("users")
    
    # Prepare update data
    update_data = {}
    if user_update.region is not None:
        update_data["region"] = user_update.region
    if user_update.interests is not None:
        update_data["interests"] = user_update.interests
    if user_update.age is not None:
        update_data["age"] = user_update.age
    if user_update.gender is not None:
        update_data["gender"] = user_update.gender
    if user_update.bio is not None:
        update_data["bio"] = user_update.bio
    if user_update.profile_picture is not None:
        update_data["profile_picture"] = user_update.profile_picture
    
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields to update"
        )
    
    # Update user
    result = await users_collection.update_one(
        {"_id": ObjectId(current_user_id)},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Get updated user
    updated_user = await users_collection.find_one({"_id": ObjectId(current_user_id)})
    
    # Convert to response format
    response_dict = {
        "id": str(updated_user["_id"]),
        "username": updated_user["username"],
        "email": updated_user["email"],
        "region": updated_user["region"],
        "interests": updated_user["interests"],
        "connections_count": updated_user["connections_count"],
        "created_at": updated_user["created_at"],
        "profile_picture": updated_user.get("profile_picture"),
        "bio": updated_user.get("bio"),
        "gender": updated_user.get("gender"),
        "age": updated_user.get("age"),
        "boosted_until": updated_user.get("boosted_until"),
        "last_login": updated_user.get("last_login"),
        "location": format_location_response(updated_user.get("location")),
        "share_location": updated_user.get("share_location", False),
        "last_location_update": updated_user.get("last_location_update")
    }
    
    return UserResponse(**response_dict)

@router.get("/search", response_model=List[UserResponse])
async def search_users(
    region: Optional[str] = Query(None, description="Filter by region"),
    interest: Optional[str] = Query(None, description="Filter by interest"),
    premium: Optional[bool] = Query(False, description="Premium filter for age/gender"),
    age_min: Optional[int] = Query(None, description="Minimum age (premium)"),
    age_max: Optional[int] = Query(None, description="Maximum age (premium)"),
    gender: Optional[str] = Query(None, description="Gender filter (premium)"),
    current_user_id: str = Depends(get_current_user_id)
):
    users_collection = get_collection("users")
    
    # Build filter query
    filter_query = {"_id": {"$ne": ObjectId(current_user_id)}}  # Exclude current user
    
    if region:
        filter_query["region"] = region
    
    if interest:
        filter_query["interests"] = {"$in": [interest]}
    
    # Premium filters
    if premium:
        if age_min is not None:
            filter_query["age"] = {"$gte": age_min}
        if age_max is not None:
            if "age" in filter_query:
                filter_query["age"]["$lte"] = age_max
            else:
                filter_query["age"] = {"$lte": age_max}
        if gender:
            filter_query["gender"] = gender
    
    # Sort by boosted users first, then by creation date
    cursor = users_collection.find(filter_query).sort([
        ("boosted_until", -1),
        ("created_at", -1)
    ]).limit(50)
    
    users = []
    async for user in cursor:
        response_dict = {
            "id": str(user["_id"]),
            "username": user["username"],
            "email": user["email"],
            "region": user["region"],
            "interests": user["interests"],
            "connections_count": user["connections_count"],
            "created_at": user["created_at"],
            "profile_picture": user.get("profile_picture"),
            "bio": user.get("bio"),
            "gender": user.get("gender"),
            "age": user.get("age"),
            "boosted_until": user.get("boosted_until"),
            "last_login": user.get("last_login"),
            "location": format_location_response(user.get("location")),
            "share_location": user.get("share_location", False),
            "last_location_update": user.get("last_location_update")
        }
        users.append(UserResponse(**response_dict))
    
    return users

@router.get("/search-location")
async def search_users_by_location(
    latitude: float = Query(..., description="Your current latitude"),
    longitude: float = Query(..., description="Your current longitude"),
    radius_km: float = Query(10.0, description="Search radius in kilometers"),
    interests: Optional[str] = Query(None, description="Comma-separated interests to filter by"),
    age_min: Optional[int] = Query(None, description="Minimum age filter"),
    age_max: Optional[int] = Query(None, description="Maximum age filter"),
    gender: Optional[str] = Query(None, description="Gender filter"),
    online_only: bool = Query(False, description="Show only online users"),
    limit: int = Query(50, description="Maximum number of users to return"),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Search users by location with advanced filtering
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
    async for user in users_collection.aggregate(pipeline):
        response_dict = {
            "id": str(user["_id"]),
            "username": user["username"],
            "email": user["email"],
            "region": user["region"],
            "interests": user["interests"],
            "connections_count": user["connections_count"],
            "created_at": user["created_at"],
            "profile_picture": user.get("profile_picture"),
            "bio": user.get("bio"),
            "gender": user.get("gender"),
            "age": user.get("age"),
            "boosted_until": user.get("boosted_until"),
            "last_login": user.get("last_login"),
            "location": format_location_response(user.get("location")),
            "share_location": user.get("share_location", False),
            "last_location_update": user.get("last_location_update"),
            "distance_km": round(user.get("distance", 0), 2)
        }
        users.append(response_dict)
    
    return users

@router.get("/regions")
async def get_available_regions():
    """
    Get list of available Dubai regions for filtering
    """
    regions = get_dubai_regions()
    return {
        "regions": regions,
        "count": len(regions)
    }
