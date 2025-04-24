# 🗓️ Task Scheduler Service - Cloud Odyssey

## 📄 Overview

The Task Scheduler Service is the core job distribution engine of Cloud Odyssey. It accepts task requests, assigns them
to available workers, manages queues, tracks task status, and supports retries.

---

## 🚀 Features

- Queue-based task distribution
- Automatic worker assignment using Redis
- Retry failed tasks
- View queue and task status

---

## 📦 Tech Stack

- **Language**: Go
- **Queue Management**: Redis

---

## 🔧 Setup Instructions

```bash
go run main.go
```

Make sure Redis is running on `localhost:6379`

---

## 📡 API Endpoints

| Method | Endpoint                 | Description |
|--------|--------------------------|-------------|
| `POST` | `/queue/add`             | Add a task to the scheduler queue |
| `GET`  | `/queue/status/:id`      | Get the status of a specific task |
| `POST` | `/queue/retry/:id`       | Retry a failed task by ID |
| `GET`  | `/queue/list?worker=id`  | View all queued tasks for a specific worker |

---

## 📂 File Structure

```
main.go              # Entry point for the task scheduler
handlers.go          # Task handlers for enqueue, status, retry, etc.
```

---

## ✨ Maintainers

- Vaishnavi Virat Dave
- Kaashvi Jain
- Kajal
- Kumud
- Abhijna Raghavendra
- Anushka Jangid

