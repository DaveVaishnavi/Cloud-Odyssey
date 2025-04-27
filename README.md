# 🌌 **Cloud Odyssey: Turning Idle Machines into Supercomputers**

> _"Unleash the hidden power of your machines. Transform, Connect, Compute."_

---

# 📅 Table of Contents

- [🌌 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Prerequisites](#-prerequisites)
- [⚙️ Installation](#-installation)
- [🧹 Configuration](#-configuration)
- [🚀 Usage](#-usage)
- [📊 Monitoring & Logging](#-monitoring--logging)
- [🛠️ Architecture](#-architecture)
- [🛠️ Techstack](#-techstack)
- [🖼️ Snapshots](#-snapshots)
- [📘️ Resources & References](#-resources--references)
- [🤝 Contributing](#-contributing)

---

# 🌌 Overview

**Cloud Odyssey** is a distributed cloud compute platform that unites idle machines into a formidable high-performance computing (HPC) cluster. Using a Beowulf cluster design, users can SSH into a Master Node, submit parallel computing tasks, and tap into a dynamic pool of worker nodes across multi-cloud platforms.

> **Your Machines. Your Cloud. Your Power.**

---

# ✨ Features

- ✅ **SSH-ready Environments** — Directly command the Master Node.
- ✅ **Beowulf Computing** — Distributed tasks with OpenMPI & SLURM.
- ✅ **Multi-cloud Flexibility** — Integrates AWS, Azure, GCP, and others.
- ✅ **Dynamic Node Management** — Plug-and-play workers.
- ✅ **Resource Monitoring** — Visualize cost, performance, and utilization.
- ✅ **Automated Workflows** — Cloud operation made easy.
- ✅ **Built-in Security** — Policy and compliance ready.
- ✅ **Dockerized Microservices** — Quick and clean deployment.
- ✅ **Prometheus + Grafana** — Metrics, dashboards, and alerts.

---

# 🛠️ Prerequisites

- Docker & Docker Compose
- Node.js (v16.x+)
- Redis (v6.x+)
- PostgreSQL (v13+)
- Python (v3.8+)
- Access to preferred cloud providers (optional)

---

# ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/DaveVaishnavi/Cloud-Odyssey.git
cd Cloud-Odyssey
```

### 2. Set up Environment Variables

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3. Launch the System

```bash
docker-compose up --build
```

---

# 🧹 Configuration

- **Cloud Config**: Add your credentials to `backend/config/cloud-config.json`.
- **Database**: PostgreSQL auto-initializes via Docker Compose.

---

# 🚀 Usage

- Access Frontend at [http://localhost:3000](http://localhost:3000)
- SSH into the Master Node:

```bash
ssh user@master-node-ip
```

- Upload and submit your MPI jobs.
- Default Admin Login:
  - **Username**: `admin@cloudodyssey.com`
  - **Password**: `CloudOdyssey@2023`

> ⚡ **Don't forget to update your password!**

---

# 📊 Monitoring & Logging

- **Prometheus** Metrics: [http://localhost:9090](http://localhost:9090)
- **Grafana** Dashboards: [http://localhost:3001](http://localhost:3001)
- **Logs**: Fluent Bit + Loki, or use `docker logs`.

---

# 🛠️ Architecture

The system is split into five key microservices:

![Microservices Architecture](https://github.com/user-attachments/assets/11cc80e0-a360-41e7-92d4-26dd3b139d7b)

---

# 💻 Techstack

- **Frontend**:  
  ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) 
  ![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white) 
  ![WebSocket](https://img.shields.io/badge/WebSocket-3A3A3A?style=for-the-badge&logo=websocket&logoColor=white)

- **Node Manager**:  
  ![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white) 
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) 
  ![gRPC](https://img.shields.io/badge/gRPC-4285F4?style=for-the-badge&logo=grpc&logoColor=white) 
  ![REST](https://img.shields.io/badge/REST-02569B?style=for-the-badge&logo=rest&logoColor=white)

- **Task Scheduler**:  
  ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) 
  ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white) 
  ![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

- **SSH Manager**:  
  ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) 
  ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white) 
  ![LocalTunnel](https://img.shields.io/badge/LocalTunnel-000000?style=for-the-badge&logo=localtunnel&logoColor=white)

- **Database Layer**:  
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white) 
  ![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white) 
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)


---

# 🖼️ Snapshots

<details>
  <summary><strong>🌐 Homepage & Features</strong></summary>

- Homepage
  
  ![Homepage](https://github.com/user-attachments/assets/e7009889-169d-448c-9e48-72232f55fe52)

- USPs
  
  ![Our USPs](https://github.com/user-attachments/assets/0724a052-e728-4bc2-a8df-925f5c57fe70)

- Key Features
  
  ![Key Features](https://github.com/user-attachments/assets/e26042e1-1429-4849-8735-ca8b9d0042f0)

- Use Cases
  
  ![Use Cases](https://github.com/user-attachments/assets/f67cd4f5-0c4d-4625-b472-3fb680e2a3f5)


- Team Modal
  
  ![Team Modal](https://github.com/user-attachments/assets/fe35e0a3-64d4-4c04-8fd0-58312a15c5ca)
  

</details>

<details>
  <summary><strong>👤 Authentication</strong></summary>

- Register Page
  
  ![Register](https://github.com/user-attachments/assets/a309ee8e-eefd-4f50-9466-5ed77a2de96e)

- Login Page
  
  ![Login](https://github.com/user-attachments/assets/2bd584ff-b3d7-4dd1-b57a-c9766125bb23)

</details>

<details>
  <summary><strong>💻 Master Node Dashboard</strong></summary>

- System Metrics
  
  ![System Metrics](https://github.com/user-attachments/assets/48da9c83-21ae-4fcb-bab7-170c3ce7c237)

- Grafana Dashboard
  
  ![Grafana Dashboard](https://github.com/user-attachments/assets/8b2d487f-f264-474e-ae23-389081f80ddb)

- Worker Node Status
  
  ![Worker Node Status](https://github.com/user-attachments/assets/8700af03-481c-421e-b234-17e6442f5703)

- System Resource Utilization
  
  ![System Resource Utilization](https://github.com/user-attachments/assets/4f739c19-d05e-4f6f-a5c5-37b2ddf39bcd)

- Memory Usage
  
  ![Memory Usage](https://github.com/user-attachments/assets/c6ad623f-30f0-4e1e-856e-dfb6d1b5cc69)

- Job Status
  
  ![Job Status](https://github.com/user-attachments/assets/f631906c-0109-4213-9661-8c38113d4cda)

- Upload MPI File Modal
  
  ![Upload MPI File](https://github.com/user-attachments/assets/34fd62e1-455e-434c-b85a-dbb27787d626)

- Download Results Modal
  
  ![Download Results](https://github.com/user-attachments/assets/43c1b909-a93f-409e-b28d-9f3207427436)

</details>

<details>
  <summary><strong>🔧 Worker Node Dashboard</strong></summary>

- Worker System Metrics
  
  ![Worker System Metrics](https://github.com/user-attachments/assets/90cf3fcf-7b3d-4e17-9734-b7d44b8e86f2)

- Worker Grafana
  
  ![Worker Grafana](https://github.com/user-attachments/assets/1b9760fc-a615-4d9d-a3ea-470cbcfe71e8)

- Resource Allocation
  
  ![Resource Allocation](https://github.com/user-attachments/assets/f2460e91-332b-4b92-a1ca-c666723c2a9e)

- Earnings Overview
  
  ![Earnings Overview](https://github.com/user-attachments/assets/6f372c67-1a06-41f4-90e7-873067c3f4c3)

- CPU & Memory Trends
  
  ![CPU and Memory Usage](https://github.com/user-attachments/assets/a27aa7f7-f170-4e4e-be8d-7de3b307b872)

- System Info
  
  ![System Info](https://github.com/user-attachments/assets/62ffd2b2-2986-4498-aabc-5a3c2903a534)

- Recent Activity
  
  ![Recent Activity](https://github.com/user-attachments/assets/0873aa28-9c90-4f0a-a5b1-0af2d0c7b4ec)

- Threshold Settings
  
  ![Threshold Settings](https://github.com/user-attachments/assets/79ecafa5-33ec-449f-b8b0-2f110f2391b6)

- Sharing Resources
  
  ![Sharing Resources](https://github.com/user-attachments/assets/f0465e39-2ffb-4a71-88bc-8044980ddd2e)

</details>

<details>
  <summary><strong>📂 Database View</strong></summary>

- MongoDB Compass View

  ![MongoDB view](https://github.com/user-attachments/assets/138bb1a1-9afc-40f2-8b52-b6396dc86179)


</details>

---

# 📘️ Resources & References

- [Beowulf Cluster Basics](https://www.linux.com/training-tutorials/building-beowulf-cluster-just-13-steps/)
- [OpenMPI Documentation](https://www.open-mpi.org/faq/)
- [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/)
- [Grafana Documentation](https://grafana.com/docs/)

---

# 🤝 Contributing

We welcome all contributions!

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

> **Built with ❤️ by Cloud Enthusiasts.**

