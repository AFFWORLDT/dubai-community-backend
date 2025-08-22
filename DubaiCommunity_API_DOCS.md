
# Dubai Community Backend – Enhanced API Docs (MVP Scope)

## 🏗 Tech Stack
- **Backend:** FastAPI (Python 3.11+)
- **Database:** MongoDB (Atlas / Local) via **Motor**
- **Auth:** JWT Tokens (with refresh tokens for better UX)
- **Image Storage:** S3-compatible (DigitalOcean Spaces, AWS S3) for profile pics & event banners
- **Async Tasks:** Celery + Redis (for notifications, emails)
- **Future Upgrade:** WebSockets for live chat + notifications

---

## 📂 Collections (MongoDB)

### `users`
```json
{
  "_id": "ObjectId",
  "username": "rahul",
  "email": "rahul@example.com",
  "password_hash": "string",
  "profile_picture": "https://cdn/.../profile.jpg",
  "bio": "Love travel & fitness",
  "region": "Dubai Marina",
  "gender": "male",
  "age": 28,
  "interests": ["fitness", "travel"],
  "connections_count": 5,
  "boosted_until": "timestamp | null",
  "created_at": "timestamp",
  "last_login": "timestamp"
}
```

### `connections`
```json
{
  "_id": "ObjectId",
  "from_user": "user_id",
  "to_user": "user_id",
  "status": "pending | accepted | rejected | blocked",
  "created_at": "timestamp"
}
```

### `groups`
```json
{
  "_id": "ObjectId",
  "name": "Fitness Buddies Dubai",
  "region": "Dubai Marina",
  "interest": "fitness",
  "members": ["user_id1", "user_id2"],
  "visibility": "public | private",
  "created_at": "timestamp"
}
```

### `events`
```json
{
  "_id": "ObjectId",
  "creator_id": "user_id",
  "title": "Desert Safari Trip",
  "region": "Dubai Marina",
  "interests": ["travel", "adventure"],
  "description": "Join us for an exciting desert safari trip!",
  "cover_image": "https://cdn/.../event.jpg",
  "price_aed": 100,
  "invited_users": ["user_id1", "user_id2"],
  "participants": ["user_id"],
  "created_at": "timestamp",
  "event_date": "timestamp"
}
```

### `messages`
```json
{
  "_id": "ObjectId",
  "from_user": "user_id",
  "to_user": "user_id",
  "text": "Hello!",
  "attachments": ["https://cdn/.../file.png"],
  "created_at": "timestamp",
  "read": true
}
```

---

## 🔑 Authentication APIs
- **POST `/auth/register`** → Register user  
- **POST `/auth/login`** → Login + return access + refresh token  
- **POST `/auth/refresh`** → Renew JWT token  
- **GET `/auth/me`** → Get current profile  

---

## 👤 User APIs
- **GET `/users/me`** → Get own profile  
- **PUT `/users/update`** → Update profile (bio, age, gender, interests, profile_picture)  
- **GET `/users/search?region=Dubai Marina&interest=travel`** → Discover users by filters  

---

## 🔗 Connection APIs
- **POST `/connections/request`** → Send request  
- **POST `/connections/respond`** → Accept/Reject  
- **GET `/connections/pending`** → Incoming requests  
- **GET `/connections/list`** → Accepted connections  
- **DELETE `/connections/block/{user_id}`** → Block user  

---

## 💬 Messaging APIs
- **POST `/messages/send`** → Send message (text + optional attachment)  
- **GET `/messages/{user_id}`** → Chat history  
- **GET `/messages/unread`** → Unread message count  

---

## 👥 Group APIs
- **POST `/groups/create`** → Create group  
- **POST `/groups/join`** → Join group  
- **GET `/groups/my`** → My groups  
- **GET `/groups`** → Explore groups (filter: region/interest/public)  

---

## 🎉 Event APIs
- **POST `/events/create`** → Create event  
- **POST `/events/rsvp`** → RSVP  
- **GET `/events/upcoming`** → Explore events  
- **GET `/events/my`** → My created + joined events  

---

## 🔔 Notifications (MVP+)
- **GET `/notifications`** → List notifications (new request, RSVP, message)  
- **PATCH `/notifications/read`** → Mark as read  

---

## 💰 Monetization Hooks
- **Premium Filters:** Paid users can search with age/gender filters  
- **Event Ticketing:** Paid RSVP → Stripe/PayPal integration  
- **Boosted Profiles:** Appear on top in discovery (boosted_until field)  
- **Group Upgrades:** Private/paid groups for trips  

---

## 🚀 MVP Scope
✅ Register/Login (JWT with refresh)  
✅ Profile setup (region, bio, interests, pic)  
✅ Discover users by interest/region  
✅ Connection requests (send/respond/list/block)  
✅ 1-on-1 Messaging (send + unread count)  
✅ Groups (create/join/list)  
✅ Events (create/rsvp/list)  
✅ Basic Notifications  
