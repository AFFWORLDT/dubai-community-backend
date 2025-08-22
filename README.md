# 🗺️ Dubai Community Backend v2.1.0

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-API-blue.svg)](https://cloudinary.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A comprehensive **FastAPI backend** for the Dubai Community Meetups Platform with advanced location-based services, Cloudinary media integration, and enhanced social networking features.

## 🌟 Features

### 📍 **Location-Based Services**
- **Real-time Location Sharing** with privacy controls
- **Nearby User Discovery** with distance calculations using Haversine formula
- **Geospatial Event Filtering** - discover events happening near you
- **Dubai Regions Support** - comprehensive list of 48 Dubai areas
- **Location-Based Search** with advanced filtering options
- **Distance Calculations** with accurate geospatial queries

### 🔐 **Authentication & Security**
- **JWT Authentication** with access and refresh tokens
- **Secure Password Hashing** using bcrypt
- **Token-based User Sessions** with automatic refresh
- **Role-based Access Control** for premium features

### 📸 **Media Management**
- **Cloudinary Integration** for image and video uploads
- **Automatic Image Optimization** and transformations
- **Profile Picture Management** with secure deletion
- **Event Cover Images** with cloud storage
- **Media Attachments** in messages

### 👥 **Social Networking**
- **User Discovery** by region, interests, and location
- **Connection Management** with friend requests
- **Group Creation** and management (public/private)
- **Event Organization** with RSVP functionality
- **Real-time Messaging** with read status tracking

### 🎯 **Advanced Features**
- **Premium Filters** (age, gender, online status)
- **Boosted Profiles** for priority display
- **User Recommendations** based on interests
- **Event Ticketing** with payment support
- **Comprehensive Search** with multiple filters

## 🛠 Tech Stack

| Component | Technology | Version |
|-----------|------------|---------|
| **Framework** | FastAPI | 2.x |
| **Database** | MongoDB Atlas | Latest |
| **Async Driver** | Motor | 3.3+ |
| **Authentication** | JWT + bcrypt | Latest |
| **Media Storage** | Cloudinary | 1.33+ |
| **Validation** | Pydantic | 2.5+ |
| **Server** | Uvicorn | 0.24+ |
| **Geospatial** | MongoDB 2dsphere | Native |

## 📋 Prerequisites

- **Python 3.8+**
- **MongoDB Atlas** account
- **Cloudinary** account
- **Virtual environment** (recommended)

## 🚀 Quick Start

### 1. **Clone Repository**
```bash
git clone https://github.com/AFFWORLDT/dubai-community-backend.git
cd dubai-community-backend
```

### 2. **Setup Virtual Environment**
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. **Install Dependencies**
```bash
pip install -r requirements.txt
```

### 4. **Environment Configuration**
Create a `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
DATABASE_NAME=dubai_community
JWT_SECRET_KEY=your-super-secret-jwt-key-here
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 5. **Setup Database Indexes**
```bash
python setup_mongodb_indexes.py
```

### 6. **Run Application**
```bash
python run.py
```

The API will be available at: **http://localhost:8000**

## 📚 API Documentation

### **Interactive Docs**
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### **Core Endpoints**

#### 🔐 Authentication
```
POST /auth/register          # User registration
POST /auth/login            # User login
POST /auth/refresh          # Token refresh
```

#### 👤 User Management
```
GET    /users/profile       # Get user profile
PUT    /users/profile       # Update profile
GET    /users/search        # Search users
GET    /users/search-location # Location-based search
```

#### 📍 Location Services
```
POST   /location/update     # Update user location
GET    /location/nearby     # Find nearby users
GET    /location/regions    # Get Dubai regions
POST   /location/toggle-sharing # Toggle location sharing
GET    /location/events-nearby # Find nearby events
```

#### 🎉 Events
```
POST   /events/create       # Create event
GET    /events/upcoming     # Get upcoming events
POST   /events/{id}/rsvp    # RSVP to event
GET    /events/{id}         # Get event details
```

#### 📸 Media
```
POST   /media/upload/image  # Upload image
POST   /media/upload/video  # Upload video
DELETE /media/delete/{id}   # Delete media
```

## 🗄️ Database Schema

### **Users Collection**
```javascript
{
  "_id": ObjectId,
  "username": String,
  "email": String,
  "hashed_password": String,
  "region": String,
  "interests": [String],
  "profile_picture": String,
  "bio": String,
  "age": Number,
  "gender": String,
  "location": {
    "type": "Point",
    "coordinates": [longitude, latitude],
    "location_name": String
  },
  "share_location": Boolean,
  "last_location_update": Date,
  "connections_count": Number,
  "boosted_until": Date,
  "created_at": Date,
  "last_login": Date
}
```

### **Events Collection**
```javascript
{
  "_id": ObjectId,
  "creator_id": ObjectId,
  "title": String,
  "description": String,
  "region": String,
  "interests": [String],
  "event_date": Date,
  "location": {
    "type": "Point",
    "coordinates": [longitude, latitude],
    "location_name": String
  },
  "cover_image": String,
  "price_aed": Number,
  "participants": [ObjectId],
  "invited_users": [ObjectId],
  "created_at": Date
}
```

## 🔧 Configuration

### **Environment Variables**
| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | Required |
| `DATABASE_NAME` | Database name | `dubai_community` |
| `JWT_SECRET_KEY` | JWT signing key | Required |
| `JWT_ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Access token expiry | `30` |
| `REFRESH_TOKEN_EXPIRE_DAYS` | Refresh token expiry | `7` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `dbk0iancm` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `xUDIPFGtlbFTd3ZoQttFDPVZ728` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Required |

## 🧪 Testing

### **Run Tests**
```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

### **API Testing**
```bash
# Test authentication
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Test location update
curl -X POST "http://localhost:8000/location/update" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"latitude":25.2048,"longitude":55.2708,"share_location":true}'
```

## 📱 Mobile App Integration

This backend is designed to work seamlessly with the **Dubai Community React Native Mobile App**. See the [React Native Guide](REACT_NATIVE_GUIDE.md) for mobile app implementation details.

### **Key Mobile Features**
- **Real-time Location Updates**
- **Push Notifications** (ready for implementation)
- **Offline Support** with local caching
- **Background Location** tracking
- **Cross-platform** compatibility

## 🚀 Deployment

### **Docker Deployment**
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### **Cloud Deployment**
- **Heroku**: Ready for deployment
- **AWS**: Lambda + API Gateway compatible
- **Google Cloud**: Cloud Run ready
- **Azure**: App Service compatible

## 📊 Performance

### **Optimizations**
- **Async/Await** throughout the codebase
- **Database Indexing** for geospatial queries
- **Connection Pooling** with Motor
- **Caching** ready for Redis integration
- **Image Optimization** via Cloudinary

### **Monitoring**
- **Health Check**: `/health`
- **Metrics**: Ready for Prometheus integration
- **Logging**: Structured logging with correlation IDs
- **Error Tracking**: Sentry integration ready

## 🔒 Security

### **Security Features**
- **JWT Token Validation**
- **Password Hashing** with bcrypt
- **CORS Configuration**
- **Input Validation** with Pydantic
- **SQL Injection Protection** (MongoDB)
- **Rate Limiting** ready for implementation

### **Best Practices**
- **Environment Variables** for secrets
- **HTTPS Only** in production
- **Regular Security Updates**
- **Dependency Scanning**

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Setup**
```bash
# Install development dependencies
pip install -r requirements-dev.txt

# Run linting
flake8 .

# Run type checking
mypy .

# Run tests with coverage
pytest --cov=app tests/
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### **Documentation**
- [API Documentation](http://localhost:8000/docs)
- [React Native Guide](REACT_NATIVE_GUIDE.md)
- [Database Schema](README.md#database-schema)

### **Issues**
- **Bug Reports**: [GitHub Issues](https://github.com/AFFWORLDT/dubai-community-backend/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/AFFWORLDT/dubai-community-backend/discussions)

### **Contact**
- **Email**: support@dubaicommunity.com
- **Discord**: [Dubai Community](https://discord.gg/dubaicommunity)

## 🙏 Acknowledgments

- **FastAPI** team for the amazing framework
- **MongoDB** for the robust database
- **Cloudinary** for media management
- **Dubai Community** users for feedback and testing

---

**Built with ❤️ for the Dubai Community**

[![Dubai Community](https://img.shields.io/badge/Dubai-Community-blue.svg)](https://dubaicommunity.com)
[![Made with Love](https://img.shields.io/badge/Made%20with-Love-red.svg)](https://github.com/AFFWORLDT/dubai-community-backend)
