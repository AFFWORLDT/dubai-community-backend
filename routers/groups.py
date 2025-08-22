from fastapi import APIRouter, HTTPException, status, Depends, Query
from database import get_collection
from models import GroupCreate, GroupJoin, Group
from auth import get_current_user_id
from bson import ObjectId
from datetime import datetime
from typing import List, Optional

router = APIRouter(prefix="/groups", tags=["Groups"])

@router.post("/create", response_model=Group)
async def create_group(
    group_data: GroupCreate,
    current_user_id: str = Depends(get_current_user_id)
):
    groups_collection = get_collection("groups")
    
    # Check if group name already exists in the region
    existing_group = await groups_collection.find_one({
        "name": group_data.name,
        "region": group_data.region
    })
    
    if existing_group:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Group with this name already exists in this region"
        )
    
    # Create new group
    group_dict = group_data.dict()
    group_dict["members"] = [current_user_id]
    group_dict["created_at"] = datetime.utcnow()
    
    result = await groups_collection.insert_one(group_dict)
    group_dict["_id"] = result.inserted_id
    
    return Group(**group_dict)

@router.post("/join")
async def join_group(
    join_data: GroupJoin,
    current_user_id: str = Depends(get_current_user_id)
):
    groups_collection = get_collection("groups")
    
    # Check if group exists
    group = await groups_collection.find_one({"_id": ObjectId(join_data.group_id)})
    if not group:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Group not found"
        )
    
    # Check if user is already a member
    if current_user_id in group["members"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already a member of this group"
        )
    
    # Add user to group
    await groups_collection.update_one(
        {"_id": ObjectId(join_data.group_id)},
        {"$push": {"members": current_user_id}}
    )
    
    return {"message": "Successfully joined the group"}

@router.get("/my", response_model=List[Group])
async def get_my_groups(current_user_id: str = Depends(get_current_user_id)):
    groups_collection = get_collection("groups")
    
    cursor = groups_collection.find({"members": current_user_id})
    
    groups = []
    async for group in cursor:
        group["id"] = group["_id"]
        groups.append(Group(**group))
    
    return groups

@router.get("/", response_model=List[Group])
async def get_all_groups(
    region: Optional[str] = Query(None, description="Filter by region"),
    interest: Optional[str] = Query(None, description="Filter by interest"),
    premium: Optional[bool] = Query(False, description="Premium filter")
):
    groups_collection = get_collection("groups")
    
    # Build filter
    filter_query = {}
    if region:
        filter_query["region"] = region
    if interest:
        filter_query["interest"] = interest
    
    cursor = groups_collection.find(filter_query)
    
    groups = []
    async for group in cursor:
        group["id"] = group["_id"]
        groups.append(Group(**group))
    
    return groups
