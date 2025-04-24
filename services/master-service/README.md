# 🧠 Master Service - Cloud Odyssey

## 📄 Overview

The Master Service acts as the orchestrator of Cloud Odyssey, coordinating code compilation, distributed execution
across worker nodes, and real-time interaction through WebSocket. It connects users with system internals using FastAPI.

---

## 🚀 Features

- File upload and source code management
- Compilation feedback over WebSocket
- Distributed execution via MPI
- Real-time updates from workers

---

## 📦 Tech Stack

- **Language**: Python
- **Framework**: FastAPI
- **Message Protocol**: WebSocket
- **Parallel Runtime**: OpenMPI

---

## 🔧 Setup Instructions

Build and run using docker

## 📡 API Endpoints

| Method | Endpoint           | Description |
|--------|--------------------|-------------|
| `GET`  | `/`                | Master health check |
| `POST` | `/submit/`         | Upload code file and get job ID |
| `WS`   | `/ws/{job_id}`     | Interactive WebSocket for execution feedback |
| `POST` | `/task/result`     | Receive results from worker nodes |
| `POST` | `/heartbeat`       | Receive heartbeat from worker nodes |

---

## 📂 File Structure

```
main.py              # Entry point for FastAPI
src/handlers/        # Compilation, MPI runner, scheduler connection
src/utils/           # File management and path resolution
```

---

## ✨ Maintainers

- Vaishnavi Virat Dave
- Kaashvi Jain
- Kajal
- Kumud
- Abhijna Raghavendra
- Anushka Jangid

