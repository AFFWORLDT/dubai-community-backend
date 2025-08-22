from fastapi import APIRouter, HTTPException, status, Depends
from database import get_collection
from models import ConnectionRequest, ConnectionResponse, Connection
from auth import get_current_user_id
from bson import ObjectId
from datetime import datetime
from typing import List

router = APIRouter(prefix="/connections", tags=["Connections"])

@router.post("/request")
async def send_connection_request(
    request: ConnectionRequest,
    current_user_id: str = Depends(get_current_user_id)
):
    connections_collection = get_collection("connections")
    users_collection = get_collection("users")
    
    # Check if target user exists
    target_user = await users_collection.find_one({"_id": ObjectId(request.to_user)})
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check if request already exists
    existing_request = await connections_collection.find_one({
        "from_user": current_user_id,
        "to_user": request.to_user
    })
    
    if existing_request:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Connection request already sent"
        )
    
    # Create connection request
    connection_data = {
        "from_user": current_user_id,
        "to_user": request.to_user,
        "status": "pending",
        "created_at": datetime.utcnow()
    }
    
    result = await connections_collection.insert_one(connection_data)
    
    return {"message": "Connection request sent successfully", "request_id": str(result.inserted_id)}

@router.post("/respond")
async def respond_to_connection_request(
    response: ConnectionResponse,
    current_user_id: str = Depends(get_current_user_id)
):
    connections_collection = get_collection("connections")
    users_collection = get_collection("users")
    
    # Find the connection request
    connection = await connections_collection.find_one({
        "_id": ObjectId(response.request_id),
        "to_user": current_user_id,
        "status": "pending"
    })
    
    if not connection:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Connection request not found"
        )
    
    # Update connection status
    await connections_collection.update_one(
        {"_id": ObjectId(response.request_id)},
        {"$set": {"status": response.status}}
    )
    
    # If accepted, update connection counts for both users
    if response.status == "accepted":
        await users_collection.update_one(
            {"_id": ObjectId(connection["from_user"])},
            {"$inc": {"connections_count": 1}}
        )
        await users_collection.update_one(
            {"_id": ObjectId(current_user_id)},
            {"$inc": {"connections_count": 1}}
        )
    
    return {"message": f"Connection request {response.status}"}

@router.get("/pending", response_model=List[Connection])
async def get_pending_requests(current_user_id: str = Depends(get_current_user_id)):
    connections_collection = get_collection("connections")
    
    cursor = connections_collection.find({
        "to_user": current_user_id,
        "status": "pending"
    })
    
    connections = []
    async for connection in cursor:
        connection["id"] = connection["_id"]
        connections.append(Connection(**connection))
    
    return connections

@router.get("/list", response_model=List[Connection])
async def get_accepted_connections(current_user_id: str = Depends(get_current_user_id)):
    connections_collection = get_collection("connections")
    
    cursor = connections_collection.find({
        "$or": [
            {"from_user": current_user_id, "status": "accepted"},
            {"to_user": current_user_id, "status": "accepted"}
        ]
    })
    
    connections = []
    async for connection in cursor:
        connection["id"] = connection["_id"]
        connections.append(Connection(**connection))
    
    return connections
