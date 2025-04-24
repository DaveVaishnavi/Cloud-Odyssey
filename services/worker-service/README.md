# ⚙️ Worker Service - Cloud Odyssey

## 📄 Overview

The Worker Service executes tasks that are assigned by the scheduler. It maintains a connection with the master service
to report task results and send heartbeat signals to indicate availability.

---

## 🚀 Features

- Periodic task polling from Redis
- Shell command execution
- Result reporting to master
- Health heartbeat endpoint

---

## 📦 Tech Stack

- **Language**: Go
- **Framework**: Gin
- **Task Queue**: Redis
- **Command Runner**: Bash via `exec`

---

## 🔧 Setup Instructions

```bash
go run main.go
```

Set `WORKER_ID` as an environment variable. Make sure Redis is running.

---

## 📡 API Endpoints

| Method | Endpoint        | Description |
|--------|------------------|-------------|
| `POST` | `/task/execute`  | Execute a command directly (for testing) |
| `POST` | `/heartbeat`     | Worker heartbeat to show it's alive |

---

## 📂 File Structure

```
src/main.go       # Worker service runner
tests             # Tests to check the functionality
```

---

## ✨ Maintainers

- Vaishnavi Virat Dave
- Kaashvi Jain
- Kajal
- Kumud
- Abhijna Raghavendra
- Anushka Jangid

