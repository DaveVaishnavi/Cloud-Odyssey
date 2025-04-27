# Cloud Odyssey: Harnessing Idle Machines for Supercomputing 🚀

Cloud Odyssey is a distributed cloud compute system that transforms idle machines into a high-performance computing (HPC) cluster. Using a Beowulf cluster architecture, users can SSH into a Master Node, submit parallel computation tasks, and leverage distributed worker nodes for execution.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Monitoring & Logging](#monitoring--logging)
- [Resources & References](#resources--references)
- [Contributing](#contributing)

## Overview

Cloud Odyssey simplifies cloud resource management by providing a unified interface to work with different cloud service providers and enables Beowulf-style computing across distributed machines. It now features Dockerized microservices for easier deployment and orchestration.

## Features

- ✅ SSH-accessible environments – Run commands on the Master Node
- ✅ Beowulf-style computing – Tasks are distributed across worker nodes using OpenMPI & SLURM
- ✅ Multi-cloud support – Manage resources across AWS, Azure, Google Cloud, and more
- ✅ Dynamic Worker Nodes – Machines can join/leave the cluster as needed
- ✅ Resource monitoring – Track utilization, performance, and costs of cloud resources
- ✅ Workflows and automation – Create automated workflows for cloud operations
- ✅ Security management – Enforce security policies and monitor compliance
- ✅ Containerized Deployment – Managed via Docker & Docker Compose
- ✅ Monitoring & Metrics – Prometheus & Grafana integration

## Prerequisites

- Docker & Docker Compose installed
- Node.js (v16.x or higher)
- Redis (v6.0 or higher)
- PostgreSQL (v13 or higher)
- Python (v3.8 or higher)
- Access credentials for desired cloud providers

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/DaveVaishnavi/Cloud-Odyssey.git
cd Cloud-Odyssey
```

### 2. Set up environment variables
Copy and edit the provided `.env.example` files in backend, frontend, and other relevant services:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3. Build and start Docker containers
```bash
docker-compose up --build
```

## Configuration

### 1. Cloud Provider Configuration
Create a `cloud-config.json` in `backend/config/` with your credentials.

### 2. Database Setup
PostgreSQL is containerized. It initializes automatically on `docker-compose up`.

## Usage

### 1. Access the App
Visit: [http://localhost:3000](http://localhost:3000)

### 2. SSH into Master Node
```bash
ssh user@master-node-ip
```

### 3. Submit Parallel Job
Upload the MPI job file

### 4. Default Admin Login
- **Username**: admin@cloudodyssey.com
- **Password**: CloudOdyssey@2023

> Change the password after first login.


## Monitoring & Logging

- **Metrics**: Prometheus at `http://localhost:9090`
- **Dashboards**: Grafana at `http://localhost:3001`
- **Logs**: Fluent Bit + Loki (optional), container logs via `docker logs`

## Resources & References

- 📖 [Beowulf Cluster Basics](https://www.linux.com/training-tutorials/building-beowulf-cluster-just-13-steps/)
- 📖 [OpenMPI Documentation](https://www.open-mpi.org/faq/)
- 📖 [Prometheus Docs](https://prometheus.io/docs/introduction/overview/)
- 📖 [Grafana Docs](https://grafana.com/docs/)

## Client-Side (Frontend)
- React
- Material UI
- WebSockets

## Server-Side (Backend)

### 1. Node Manager
- Go
- MongoDB
- gRPC / REST

### 2. Task Scheduler
- Python + FastAPI
- Redis Streams
- Docker-based Task Runner

### 3. SSH Manager
- Python + FastAPI
- LocalTunnel

The entire system can be divided into 5 micro-services as follows:
![image](https://github.com/user-attachments/assets/11cc80e0-a360-41e7-92d4-26dd3b139d7b)

## Some snapshots
- Homepage
  ![image](https://github.com/user-attachments/assets/e7009889-169d-448c-9e48-72232f55fe52)
  
- Our USPs
  ![image](https://github.com/user-attachments/assets/0724a052-e728-4bc2-a8df-925f5c57fe70)
  
- Key features
  ![image](https://github.com/user-attachments/assets/e26042e1-1429-4849-8735-ca8b9d0042f0)
  
- Use cases
  ![image](https://github.com/user-attachments/assets/f67cd4f5-0c4d-4625-b472-3fb680e2a3f5)
  
- Team modal
  ![image](https://github.com/user-attachments/assets/fe35e0a3-64d4-4c04-8fd0-58312a15c5ca)
  
- Register page
  ![image](https://github.com/user-attachments/assets/a309ee8e-eefd-4f50-9466-5ed77a2de96e)
  
- Login page
  ![image](https://github.com/user-attachments/assets/2bd584ff-b3d7-4dd1-b57a-c9766125bb23)
  
- Master node dashboard
  - System metrics
    ![image](https://github.com/user-attachments/assets/48da9c83-21ae-4fcb-bab7-170c3ce7c237)
    
  - Grafana dashboard
    ![image](https://github.com/user-attachments/assets/8b2d487f-f264-474e-ae23-389081f80ddb)
    
  - Worker node status
    ![image](https://github.com/user-attachments/assets/8700af03-481c-421e-b234-17e6442f5703)
    
  - System resource utilization
    ![image](https://github.com/user-attachments/assets/4f739c19-d05e-4f6f-a5c5-37b2ddf39bcd)
    
  - Memory usage
    ![image](https://github.com/user-attachments/assets/c6ad623f-30f0-4e1e-856e-dfb6d1b5cc69)
    
  - Job status
    ![image](https://github.com/user-attachments/assets/f631906c-0109-4213-9661-8c38113d4cda)
    
  - Upload MPI file modal
    ![image](https://github.com/user-attachments/assets/34fd62e1-455e-434c-b85a-dbb27787d626)
    
  - Download results modal
    ![WhatsApp Image 2025-04-26 at 4 24 20 PM](https://github.com/user-attachments/assets/43c1b909-a93f-409e-b28d-9f3207427436)
    
- Worker node dashboard
  - System metrics
    ![image](https://github.com/user-attachments/assets/90cf3fcf-7b3d-4e17-9734-b7d44b8e86f2)
    
  - Grafana dashboard
    ![image](https://github.com/user-attachments/assets/1b9760fc-a615-4d9d-a3ea-470cbcfe71e8)
    
  - Resource allocation
    ![image](https://github.com/user-attachments/assets/f2460e91-332b-4b92-a1ca-c666723c2a9e)
    
  - Earnings overview
    ![image](https://github.com/user-attachments/assets/6f372c67-1a06-41f4-90e7-873067c3f4c3)
    
  - CPU and memory usage trends
    ![image](https://github.com/user-attachments/assets/a27aa7f7-f170-4e4e-be8d-7de3b307b872)
    
  - System information
    ![image](https://github.com/user-attachments/assets/62ffd2b2-2986-4498-aabc-5a3c2903a534)
    
  - Recent activity list
    ![image](https://github.com/user-attachments/assets/0873aa28-9c90-4f0a-a5b1-0af2d0c7b4ec)
    
  - Worker node resource threshold settings modal
    ![image](https://github.com/user-attachments/assets/79ecafa5-33ec-449f-b8b0-2f110f2391b6)
    
  - Dashboard when resources are being shared
    ![image](https://github.com/user-attachments/assets/f0465e39-2ffb-4a71-88bc-8044980ddd2e)
    
- MongoDB Compass DB view
  ![image](https://github.com/user-attachments/assets/bd0b93e8-f51b-44be-9ffc-823bce990b27)

## Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open Pull Request
