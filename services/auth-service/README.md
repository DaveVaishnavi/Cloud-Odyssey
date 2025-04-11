# 🛡️ Auth Microservice - README

This microservice provides user authentication and user data management using **Gin (Go)** and **MongoDB**, designed as part of a **microservices architecture**.

---

## 🌐 Public Routes

Accessible without authentication.

### `POST /auth/register`

Registers a new user.

**Request Body:**

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "yourpassword",
  "phone": "1234567890"
}
```

**Response:**

- 201 Created on success
- 400/500 on validation or server error

---

### `POST /auth/login`

Logs in a user and returns **access and refresh tokens**.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "token": "<JWT access token>",
  "refresh_token": "<refresh token>"
}
```

---

## 🔐 Protected Routes

Require JWT authentication (use middleware).

### `GET /auth/:_id`

Get user details by MongoDB `_id`.

**URL Parameter:**

- `_id`: MongoDB ObjectId (e.g., `607f1f77bcf86cd799439011`)

**Response:**

```json
{
  "_id": "...",
  "first_name": "...",
  "last_name": "...",
  "email": "...",
  ...
}
```

**Error Example:**

```json
{
  "error": "User not found",
  "details": "mongo: no documents in result"
}
```

---

### `POST /auth/logout`

Logs the user out by invalidating their refresh token.

**Response:**

- 200 OK on success

---

## 🛠 Implementation Notes

- Ensure `_id` is treated as `primitive.ObjectID` when querying MongoDB:
  ```go
  objID, err := primitive.ObjectIDFromHex(userId)
  ```
- Use `userCollection.FindOne(ctx, bson.M{"_id": objID})` for accurate queries.
- Use middleware to protect routes:
  ```go
  router.Use(AuthMiddleware())
  ```

---

## 📂 Project Structure

```
├── controllers
│   └── authController.go
├── routes
│   └── authRoutes.go
├── models
│   └── user.go
├── middleware
│   └── authMiddleware.go
├── main.go
```

---
