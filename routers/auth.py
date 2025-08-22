from fastapi import APIRouter, HTTPException, status, Depends
from datetime import timedelta
from database import get_collection
from models import UserCreate, UserLogin, UserResponse, Token
from auth import get_password_hash, verify_password, create_access_token, create_refresh_token, get_current_user, verify_refresh_token
from config import settings
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse)
async def register(user_data: UserCreate):
    users_collection = get_collection("users")
    
    # Check if user already exists
    existing_user = await users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    existing_username = await users_collection.find_one({"username": user_data.username})
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create new user
    user_dict = user_data.dict()
    user_dict["password_hash"] = get_password_hash(user_data.password)
    user_dict["connections_count"] = 0
    user_dict["created_at"] = datetime.utcnow()
    user_dict["last_login"] = datetime.utcnow()
    
    # Remove plain password from dict
    del user_dict["password"]
    
    result = await users_collection.insert_one(user_dict)
    user_dict["_id"] = result.inserted_id
    
    # Convert to response format
    response_dict = {
        "id": str(user_dict["_id"]),
        "username": user_dict["username"],
        "email": user_dict["email"],
        "region": user_dict["region"],
        "interests": user_dict["interests"],
        "connections_count": user_dict["connections_count"],
        "created_at": user_dict["created_at"],
        "profile_picture": user_dict.get("profile_picture"),
        "bio": user_dict.get("bio"),
        "gender": user_dict.get("gender"),
        "age": user_dict.get("age"),
        "boosted_until": user_dict.get("boosted_until"),
        "last_login": user_dict.get("last_login")
    }
    
    return UserResponse(**response_dict)

@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin):
    users_collection = get_collection("users")
    
    user = await users_collection.find_one({"email": user_credentials.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    if not verify_password(user_credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Update last login
    await users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"last_login": datetime.utcnow()}}
    )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(data={"sub": user["email"]})
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "refresh_token": refresh_token
    }

@router.post("/refresh", response_model=Token)
async def refresh_token(token_data: dict):
    refresh_token = token_data.get("refresh_token")
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="refresh_token is required"
        )
    email = await verify_refresh_token(refresh_token)
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": email}, expires_delta=access_token_expires
    )
    new_refresh_token = create_refresh_token(data={"sub": email})
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "refresh_token": new_refresh_token
    }

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user = Depends(get_current_user)):
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
        "last_login": current_user.get("last_login")
    }
    
    return UserResponse(**response_dict)
