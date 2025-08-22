from fastapi import APIRouter, HTTPException, status, Depends
from database import get_collection
from models import MessageSend, Message
from auth import get_current_user_id
from bson import ObjectId
from datetime import datetime
from typing import List

router = APIRouter(prefix="/messages", tags=["Messages"])

@router.post("/send")
async def send_message(
    message_data: MessageSend,
    current_user_id: str = Depends(get_current_user_id)
):
    messages_collection = get_collection("messages")
    connections_collection = get_collection("connections")
    
    # Check if users are connected
    connection = await connections_collection.find_one({
        "$or": [
            {"from_user": current_user_id, "to_user": message_data.to_user, "status": "accepted"},
            {"from_user": message_data.to_user, "to_user": current_user_id, "status": "accepted"}
        ]
    })
    
    if not connection:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only send messages to your connections"
        )
    
    # Create message
    message_dict = {
        "from_user": current_user_id,
        "to_user": message_data.to_user,
        "text": message_data.text,
        "created_at": datetime.utcnow()
    }
    
    result = await messages_collection.insert_one(message_dict)
    message_dict["_id"] = result.inserted_id
    
    return {"message": "Message sent successfully", "message_id": str(result.inserted_id)}

@router.get("/{user_id}", response_model=List[Message])
async def get_chat_history(
    user_id: str,
    current_user_id: str = Depends(get_current_user_id)
):
    messages_collection = get_collection("messages")
    connections_collection = get_collection("connections")
    
    # Check if users are connected
    connection = await connections_collection.find_one({
        "$or": [
            {"from_user": current_user_id, "to_user": user_id, "status": "accepted"},
            {"from_user": user_id, "to_user": current_user_id, "status": "accepted"}
        ]
    })
    
    if not connection:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only view messages with your connections"
        )
    
    # Get messages between the two users
    cursor = messages_collection.find({
        "$or": [
            {"from_user": current_user_id, "to_user": user_id},
            {"from_user": user_id, "to_user": current_user_id}
        ]
    }).sort("created_at", 1)
    
    messages = []
    async for message in cursor:
        message["id"] = message["_id"]
        messages.append(Message(**message))
    
    return messages
