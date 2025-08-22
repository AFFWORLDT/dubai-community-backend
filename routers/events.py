from fastapi import APIRouter, HTTPException, status, Depends, Query
from database import get_collection
from models import EventCreate, EventRSVP, Event
from auth import get_current_user_id
from location_utils import (
    create_location_document,
    validate_coordinates,
    format_location_response
)
from bson import ObjectId
from datetime import datetime
from typing import List, Optional

router = APIRouter(prefix="/events", tags=["Events"])

@router.post("/create", response_model=Event)
async def create_event(
    event_data: EventCreate,
    current_user_id: str = Depends(get_current_user_id)
):
    events_collection = get_collection("events")
    
    # Create new event
    event_dict = event_data.dict()
    event_dict["creator_id"] = current_user_id
    event_dict["participants"] = [current_user_id]  # Creator is automatically a participant
    event_dict["invited_users"] = event_data.invited_users or []
    event_dict["created_at"] = datetime.utcnow()
    
    # Handle location if provided
    if hasattr(event_data, 'location') and event_data.location:
        if not validate_coordinates(event_data.location.get('latitude'), event_data.location.get('longitude')):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid location coordinates"
            )
        
        location_doc = create_location_document(
            event_data.location['latitude'],
            event_data.location['longitude'],
            event_data.location.get('location_name')
        )
        event_dict["location"] = location_doc
    
    result = await events_collection.insert_one(event_dict)
    event_dict["_id"] = result.inserted_id
    
    # Convert to response format
    response_dict = {
        "id": str(event_dict["_id"]),
        "creator_id": event_dict["creator_id"],
        "title": event_dict["title"],
        "region": event_dict["region"],
        "interests": event_dict["interests"],
        "description": event_dict["description"],
        "cover_image": event_dict.get("cover_image"),
        "price_aed": event_dict.get("price_aed"),
        "invited_users": event_dict["invited_users"],
        "participants": event_dict["participants"],
        "created_at": event_dict["created_at"],
        "event_date": event_dict["event_date"],
        "location": format_location_response(event_dict.get("location"))
    }
    
    return Event(**response_dict)

@router.post("/rsvp")
async def rsvp_to_event(
    rsvp_data: EventRSVP,
    current_user_id: str = Depends(get_current_user_id)
):
    events_collection = get_collection("events")
    
    # Check if event exists
    event = await events_collection.find_one({"_id": ObjectId(rsvp_data.event_id)})
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    # Check if user is already a participant
    if current_user_id in event["participants"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already RSVP'd to this event"
        )
    
    # Add user to participants
    await events_collection.update_one(
        {"_id": ObjectId(rsvp_data.event_id)},
        {"$push": {"participants": current_user_id}}
    )
    
    return {"message": "Successfully RSVP'd to the event"}

@router.get("/upcoming", response_model=List[Event])
async def get_upcoming_events(
    region: Optional[str] = Query(None, description="Filter by region"),
    interests: Optional[str] = Query(None, description="Filter by interests (comma-separated)"),
    premium: Optional[bool] = Query(False, description="Premium filter")
):
    events_collection = get_collection("events")
    
    # Build filter
    filter_query = {"event_date": {"$gte": datetime.utcnow()}}
    
    if region:
        filter_query["region"] = region
    
    if interests:
        interest_list = [interest.strip() for interest in interests.split(",")]
        filter_query["interests"] = {"$in": interest_list}
    
    cursor = events_collection.find(filter_query).sort("event_date", 1)
    
    events = []
    async for event in cursor:
        response_dict = {
            "id": str(event["_id"]),
            "creator_id": event["creator_id"],
            "title": event["title"],
            "region": event["region"],
            "interests": event["interests"],
            "description": event["description"],
            "cover_image": event.get("cover_image"),
            "price_aed": event.get("price_aed"),
            "invited_users": event["invited_users"],
            "participants": event["participants"],
            "created_at": event["created_at"],
            "event_date": event["event_date"],
            "location": format_location_response(event.get("location"))
        }
        events.append(Event(**response_dict))
    
    return events


