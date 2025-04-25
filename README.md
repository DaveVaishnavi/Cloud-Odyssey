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

## Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open Pull Request
