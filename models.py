from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User Models
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    region: str
    interests: List[str]
    bio: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[int] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    region: Optional[str] = None
    interests: Optional[List[str]] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    bio: Optional[str] = None
    profile_picture: Optional[str] = None

class LocationUpdate(BaseModel):
    latitude: float
    longitude: float
    location_name: Optional[str] = None
    share_location: bool = True

class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    region: str
    interests: List[str]
    connections_count: int
    created_at: datetime
    profile_picture: Optional[str] = None
    bio: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[int] = None
    boosted_until: Optional[datetime] = None
    last_login: Optional[datetime] = None
    # Location fields
    location: Optional[dict] = None
    share_location: bool = False
    last_location_update: Optional[datetime] = None

# Connection Models
class ConnectionRequest(BaseModel):
    to_user: str

class ConnectionResponse(BaseModel):
    request_id: str
    status: str

class Connection(BaseModel):
    id: str
    from_user: str
    to_user: str
    status: str
    created_at: datetime

# Group Models
class GroupCreate(BaseModel):
    name: str
    region: str
    interest: str
    visibility: str = "public"  # public or private

class GroupJoin(BaseModel):
    group_id: str

class Group(BaseModel):
    id: str
    name: str
    region: str
    interest: str
    members: List[str]
    visibility: str
    created_at: datetime

# Event Models
class EventCreate(BaseModel):
    title: str
    region: str
    interests: List[str]
    description: str
    cover_image: Optional[str] = None
    price_aed: Optional[float] = None
    invited_users: Optional[List[str]] = None
    event_date: datetime
    # Location for events
    location: Optional[dict] = None

class EventRSVP(BaseModel):
    event_id: str

class Event(BaseModel):
    id: str
    creator_id: str
    title: str
    region: str
    interests: List[str]
    description: str
    cover_image: Optional[str] = None
    price_aed: Optional[float] = None
    invited_users: List[str]
    participants: List[str]
    created_at: datetime
    event_date: datetime
    location: Optional[dict] = None

# Message Models
class MessageSend(BaseModel):
    to_user: str
    text: str
    attachments: Optional[List[str]] = None

class Message(BaseModel):
    id: str
    from_user: str
    to_user: str
    text: str
    attachments: Optional[List[str]] = None
    created_at: datetime
    read: bool = False

# Token Models
class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Cloudinary Models
class CloudinaryUploadResponse(BaseModel):
    public_id: str
    secure_url: str
    format: str
    resource_type: str
    width: Optional[int] = None
    height: Optional[int] = None

# Location Models
class NearbyUserResponse(BaseModel):
    id: str
    username: str
    profile_picture: Optional[str] = None
    bio: Optional[str] = None
    interests: List[str]
    distance_km: float
    location_name: Optional[str] = None
    last_active: Optional[datetime] = None

class LocationFilter(BaseModel):
    latitude: float
    longitude: float
    radius_km: float = 10.0
    interests: Optional[List[str]] = None
    age_min: Optional[int] = None
    age_max: Optional[int] = None
    gender: Optional[str] = None
    online_only: bool = False
