# 🔐 Authentication Service - Cloud Odyssey

## 📄 Overview

The Authentication Service is responsible for handling user registration, login, token management (JWT), and role-based
access control for Cloud Odyssey. It enables secure interactions between users and other microservices.

---

## 🚀 Features

- User registration and login
- JWT-based session management
- Role-based access control (Master, Worker, etc.)
- Middleware-protected routes
- User profile retrieval

---

## 📦 Tech Stack

- **Language**: Go
- **Framework**: Gin
- **Authentication**: JWT
- **Middleware**: Custom Role-based Access Control

---

## 🔧 Setup Instructions

```bash
go run main.go
```

---

## 📡 API Endpoints

### Public Routes

| Method | Endpoint              | Description |
|--------|------------------------|-------------|
| `POST` | `/api/auth/register`   | Register a new user account |
| `POST` | `/api/auth/login`      | Login and receive JWT token |

### Protected Routes (require token)

| Method | Endpoint             | Description |
|--------|-----------------------|-------------|
| `GET`  | `/api/auth/me`        | Get current user's profile |
| `POST` | `/api/auth/logout`    | Logout current user |
| `GET`  | `/api/auth/:_id`      | Get user by ID (self or Master only) |

### Admin-Only (Master Role)

| Method | Endpoint       | Description |
|--------|----------------|-------------|
| `GET`  | `/api/users`   | List all users |

---

## 🔐 Example JWT Header

```http
Authorization: Bearer <token>
Content-Type: application/json
```

---

## 📂 File Structure

```
routes/            # Route definitions
controllers/       # Business logic handlers
middleware/        # Auth middleware and role guards
main.go            # Server entry point
```

---

## ✨ Maintainers

- Vaishnavi Virat Dave
- Kaashvi Jain
- Kajal
- Kumud
- Abhijna Raghavendra
- Anushka Jangid

