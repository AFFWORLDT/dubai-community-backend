# Dubai Community Backend v2.1.0

A comprehensive FastAPI backend for the Dubai Community Meetups Platform with advanced location-based services, Cloudinary media integration, and enhanced social features.

## 🚀 New Features in v2.1.0

### 📍 **Location-Based Services**
- **Real-time Location Sharing**: Users can share their current location with privacy controls
- **Nearby User Discovery**: Find users within specified radius with distance calculations
- **Geospatial Event Filtering**: Discover events happening near you
- **Dubai Regions Support**: Comprehensive list of Dubai areas for filtering
- **Location-Based Search**: Advanced user search with location filters
- **Distance Calculations**: Accurate distance calculations using Haversine formula

### 🎯 **Advanced Filtering**
- **Radius-based Search**: Search within customizable radius (1-50km)
- **Interest-based Filtering**: Filter by specific interests
- **Age & Gender Filters**: Premium filtering options
- **Online Status**: Filter for currently active users
- **Location Privacy**: Toggle location sharing on/off

## 🛠 Tech Stack

- **Framework**: FastAPI 2.x
- **Database**: MongoDB with Motor (async driver)
- **Authentication**: JWT with refresh tokens
- **Media Storage**: Cloudinary
- **Geospatial**: MongoDB Geospatial indexes
- **Password Hashing**: bcrypt
- **Validation**: Pydantic v2
- **Server**: Uvicorn

## 📋 Prerequisites

- Python 3.8+
- MongoDB Atlas account
- Cloudinary account
- Virtual environment

## 🚀 Installation

1. **Clone and Setup**:
```bash
git clone <repository>
cd mybooking24.ae
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install Dependencies**:
```bash
pip install -r requirements.txt
```

3. **Environment Variables**:
Create a `.env` file:
```env
MONGODB_URI=mongodb+srv://affworldtechnologies:wMbiyR0ZM8JWfOYl@loc.6qmwn3p.mongodb.net/
DATABASE_NAME=dubia meetups
JWT_SECRET_KEY=your-super-secret-jwt-key-here
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

4. **Run the Application**:
```bash
python run.py
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

- **Interactive Docs**: http://localhost:8000/docs
- **OpenAPI Schema**: http://localhost:8000/openapi.json
- **Health Check**: http://localhost:8000/health

## 🗂 Database Collections

### Users Collection
```javascript
{
  "_id": ObjectId,
  "username": String,
  "email": String,
  "password_hash": String,
  "region": String,
  "interests": [String],
  "connections_count": Number,
  "created_at": Date,
  "profile_picture": String,
  "bio": String,
  "gender": String,
  "age": Number,
  "boosted_until": Date,
  "last_login": Date,
  "location": {
    "type": "Point",
    "coordinates": [longitude, latitude],
    "location_name": String,
    "updated_at": Date
  },
  "share_location": Boolean,
  "last_location_update": Date
}
```

### Events Collection
```javascript
{
  "_id": ObjectId,
  "creator_id": String,
  "title": String,
  "region": String,
  "interests": [String],
  "description": String,
  "cover_image": String,
  "price_aed": Number,
  "invited_users": [String],
  "participants": [String],
  "created_at": Date,
  "event_date": Date,
  "location": {
    "type": "Point",
    "coordinates": [longitude, latitude],
    "location_name": String,
    "updated_at": Date
  }
}
```

## 🔐 Authentication Endpoints

### POST `/auth/register`
Register a new user with location support:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword",
  "region": "Dubai Marina",
  "interests": ["fitness", "travel"],
  "bio": "Love exploring Dubai!",
  "age": 25,
  "gender": "male"
}
```

### POST `/auth/login`
Login and get access + refresh tokens:
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### POST `/auth/refresh`
Refresh access token using refresh token:
```json
{
  "refresh_token": "your-refresh-token"
}
```

## 📍 Location Endpoints

### POST `/location/update`
Update user's current location:
```json
{
  "latitude": 25.0920,
  "longitude": 55.1381,
  "location_name": "Dubai Marina Mall",
  "share_location": true
}
```

### GET `/location/nearby`
Find nearby users with advanced filtering:
```
GET /location/nearby?latitude=25.0920&longitude=55.1381&radius_km=10&interests=fitness,travel&age_min=20&age_max=30&gender=male&online_only=true&limit=20
```

### GET `/location/events-nearby`
Find nearby events:
```
GET /location/events-nearby?latitude=25.0920&longitude=55.1381&radius_km=10&interests=fitness&limit=10
```

### GET `/location/regions`
Get list of Dubai regions:
```
GET /location/regions
```

### POST `/location/toggle-sharing`
Toggle location sharing:
```json
{
  "share_location": true
}
```

## 👥 User Endpoints

### GET `/users/search-location`
Location-based user search:
```
GET /users/search-location?latitude=25.0920&longitude=55.1381&radius_km=10&interests=fitness&age_min=20&age_max=30&gender=male&online_only=true&limit=20
```

### GET `/users/regions`
Get available Dubai regions:
```
GET /users/regions
```

## 🎉 Event Endpoints

### POST `/events/create`
Create event with location:
```json
{
  "title": "Marina Fitness Meetup",
  "region": "Dubai Marina",
  "interests": ["fitness", "social"],
  "description": "Join us for an amazing workout!",
  "event_date": "2024-02-15T18:00:00Z",
  "location": {
    "latitude": 25.0920,
    "longitude": 55.1381,
    "location_name": "Dubai Marina"
  }
}
```

### GET `/events/nearby`
Find nearby events:
```
GET /events/nearby?latitude=25.0920&longitude=55.1381&radius_km=10&interests=fitness&limit=10
```

## 📸 Media Endpoints

### POST `/media/upload/image`
Upload profile picture or event cover:
```
POST /media/upload/image
Content-Type: multipart/form-data
file: [image file]
```

### POST `/media/upload/video`
Upload video content:
```
POST /media/upload/video
Content-Type: multipart/form-data
file: [video file]
```

## 🔧 Configuration

### MongoDB Geospatial Indexes
Create geospatial indexes for location-based queries:
```javascript
// Users collection
db.users.createIndex({ "location": "2dsphere" })

// Events collection  
db.events.createIndex({ "location": "2dsphere" })
```

### Cloudinary Configuration
```python
CLOUDINARY_CLOUD_NAME = "dbk0iancm"
CLOUDINARY_API_KEY = "xUDIPFGtlbFTd3ZoQttFDPVZ728"
CLOUDINARY_API_SECRET = "your-secret"
CLOUDINARY_UPLOAD_PRESET = "24booking"
```

## 🧪 Testing

Run the comprehensive location features test:
```bash
python test_location_features.py
```

This will test:
- ✅ Location Update & Sharing
- ✅ Nearby User Discovery
- ✅ Location-Based User Search
- ✅ Geospatial Event Creation
- ✅ Nearby Event Discovery
- ✅ Dubai Regions List
- ✅ Location Sharing Toggle
- ✅ Distance Calculations
- ✅ Coordinate Validation

## 🚀 Production Deployment

1. **Set Production Environment Variables**:
```env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET_KEY=your-production-secret
CLOUDINARY_API_SECRET=your-production-cloudinary-secret
```

2. **Create Geospatial Indexes**:
```javascript
use dubia_meetups
db.users.createIndex({ "location": "2dsphere" })
db.events.createIndex({ "location": "2dsphere" })
```

3. **Deploy with Gunicorn**:
```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 💰 Monetization Features

- **Premium Filters**: Age/gender filtering for premium users
- **Boosted Profiles**: Enhanced visibility for premium users
- **Event Ticketing**: Support for paid events
- **Location Analytics**: Premium location insights

## 🔮 Future Enhancements

- **WebSocket Support**: Real-time messaging and location updates
- **Push Notifications**: Location-based notifications
- **Route Planning**: Integration with maps for event directions
- **Group Location Sharing**: Share location with specific groups
- **Location History**: Track user movement patterns
- **Geofencing**: Automatic notifications when entering areas

## 📞 Support

For support and questions:
- Check the API documentation at `/docs`
- Review the test files for usage examples
- Contact the development team

---

**Dubai Community Backend v2.1.0** - Connecting people through location-based discovery! 🗺️✨
