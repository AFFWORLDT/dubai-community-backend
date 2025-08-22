# Dubai Community Backend -- API Documentation

## 🏗 Tech Stack

-   **Backend:** FastAPI (Python)
-   **Database:** MongoDB (Atlas / Local)
-   **Auth:** JWT Tokens
-   **Async DB Driver:** Motor

------------------------------------------------------------------------

## 📂 Collections (MongoDB)

### `users`

``` json
{
  "_id": "ObjectId",
  "username": "rahul",
  "email": "rahul@example.com",
  "password_hash": "string",
  "region": "Dubai Marina",
  "interests": ["fitness", "travel"],
  "connections_count": 5,
  "created_at": "timestamp"
}
```

### `connections`

``` json
{
  "_id": "ObjectId",
  "from_user": "user_id",
  "to_user": "user_id",
  "status": "pending | accepted | rejected | blocked",
  "created_at": "timestamp"
}
```

### `groups`

``` json
{
  "_id": "ObjectId",
  "name": "Fitness Buddies Dubai",
  "region": "Dubai Marina",
  "interest": "fitness",
  "members": ["user_id1", "user_id2"],
  "created_at": "timestamp"
}
```

### `events`

``` json
{
  "_id": "ObjectId",
  "creator_id": "user_id",
  "title": "Desert Safari Trip",
  "region": "Dubai Marina",
  "interests": ["travel", "adventure"],
  "invited_users": ["user_id1", "user_id2"],
  "participants": ["user_id"],
  "created_at": "timestamp",
  "event_date": "timestamp"
}
```

### `messages`

``` json
{
  "_id": "ObjectId",
  "from_user": "user_id",
  "to_user": "user_id",
  "text": "Hello!",
  "created_at": "timestamp"
}
```

------------------------------------------------------------------------

## 🔑 Authentication

-   **POST `/auth/register`** → Create a new user
-   **POST `/auth/login`** → Get JWT token
-   **GET `/auth/me`** → Get current logged-in user profile

------------------------------------------------------------------------

## 👤 User APIs

-   **GET `/users/me`** → Get profile
-   **PUT `/users/update`** → Update region, interests, age, gender, bio

------------------------------------------------------------------------

## 🔗 Connection APIs

-   **POST `/connections/request`**

``` json
{ "to_user": "user_id" }
```

-   **POST `/connections/respond`**

``` json
{ "request_id": "id", "status": "accepted" }
```

-   **GET `/connections/pending`** → List incoming requests
-   **GET `/connections/list`** → List accepted connections
    (friends/partners)

------------------------------------------------------------------------

## 💬 Messaging APIs

-   **POST `/messages/send`**

``` json
{ "to_user": "user_id", "text": "Hello!" }
```

-   **GET `/messages/{user_id}`** → Fetch chat history with a connection

------------------------------------------------------------------------

## 👥 Group APIs

-   **POST `/groups/create`** → Create a new group
-   **POST `/groups/join`** → Join a group
-   **GET `/groups/my`** → List groups user is part of
-   **GET `/groups`** → List all groups (filter by region/interests)

------------------------------------------------------------------------

## 🎉 Event APIs

-   **POST `/events/create`** → Create a new event
-   **POST `/events/rsvp`** → RSVP to an event
-   **GET `/events/upcoming`** → List upcoming events (optional filter
    by region/interests)

------------------------------------------------------------------------

## 💰 Monetization Hooks

-   Premium Filters → API parameter: `?premium=true`
-   Event Ticketing → Paid RSVP (`price_aed` in event collection)
-   Boosted Profiles → `users.boosted_until` field for priority display

------------------------------------------------------------------------

## 🚀 MVP Scope

✅ Auth (register/login)\
✅ Profile setup (region + interests)\
✅ Connection requests (send/respond/list)\
✅ Groups (create/join/list)\
✅ Events (create/rsvp/list)\
✅ Messaging (send/fetch)

------------------------------------------------------------------------

## 🔧 Notes

-   Use JWT `Authorization: Bearer <token>` for all protected endpoints\
-   MongoDB `_id` fields are ObjectIds\
-   Future enhancements: real-time messaging (WebSocket), location-based
    events, group trip payments
