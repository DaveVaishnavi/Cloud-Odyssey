# 📘 API Documentation: Cloud Odyssey Microservices

This document provides a complete overview of all REST API endpoints for the five core microservices in **Cloud
Odyssey**.

---

## 🔐 1. Authentication Service

**Purpose**: Handles user login, registration, token-based authentication (JWT), and role-based access control.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user account. |
| `POST` | `/api/auth/login` | Authenticate user and issue a JWT. |
| `GET`  | `/api/auth/me` | Fetch the authenticated user's own profile. |
| `POST` | `/api/auth/logout` | Logout user and invalidate token. |
| `GET`  | `/api/users` | List all users (Only accessible to users with role "Master"). |
| `GET`  | `/api/auth/:_id` | Get details of a specific user by ID (Accessible to the user or a Master). |

---

## 🗓️ 2. Task Scheduler Service

**Purpose**: Schedules jobs and manages task queues.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/queue/add` | Submit a task with a command and auto-assign to a worker. |
| `GET`  | `/queue/status/:id` | Retrieve the status of a task using its ID. |
| `POST` | `/queue/retry/:id` | Requeue a failed or missed task based on task ID. |
| `GET`  | `/queue/list?worker=<worker_id>` | List tasks currently queued for a specific worker. |

---

## ⚙️ 3. Worker Service

**Purpose**: Executes assigned tasks and sends results; provides heartbeat updates.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/task/execute` | Execute a command locally and return result + status. |
| `POST` | `/heartbeat` | Worker node heartbeat endpoint to signal health. |

---

## 🧠 4. Master Service

**Purpose**: Coordinates task submission, compilation, execution, and real-time interaction using WebSockets.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/` | Health check endpoint for the master service. |
| `POST` | `/submit/` | Submit a file for compilation and execution. Returns job ID. |
| `WS`   | `/ws/{job_id}` | WebSocket connection for job execution, compilation feedback, and live result streaming. |
| `POST` | `/task/result` | Receive results from worker after task completion. |
| `POST` | `/heartbeat` | Receive periodic heartbeat pings from workers. |

---

## 📈 5. Monitoring Service

**Purpose**: Tracks logs, metrics, and system alerts.

No endpoints are exposed by this service. System health and other information is being tunneled across systems.

---

## 🔧 Notes

- All endpoints use JSON for request/response bodies unless specified (e.g., WebSocket).
- Some routes require authentication using Bearer tokens (JWT).
- Error codes follow standard HTTP conventions (e.g., 200, 400, 401, 404, 500).

