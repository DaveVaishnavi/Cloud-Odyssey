# Cloud Odyssey: Harnessing Idle Machines for Supercomputing 🚀

### Overview
Cloud Odyssey is a distributed cloud compute system that transforms idle machines into a high-performance computing (HPC) cluster. Using a Beowulf cluster architecture, users can SSH into a Master Node, submit parallel computation tasks, and leverage distributed worker nodes for execution.

### Features

✅ SSH-accessible environments – Run commands on the Master Node.   
✅ Beowulf-style computing – Tasks are distributed across worker nodes using OpenMPI & SLURM.   
✅ Dynamic Worker Nodes – Machines can join/leave the cluster as needed.    
✅ Remote Access Handling – Supports NAT/firewall traversal with LocalTunnel/ngrok.   
✅ Monitoring & Metrics – Uses Prometheus & Grafana for real-time system health tracking.   
✅ Containerized Deployment – Managed via Docker & Docker Compose.

### Setup & Installation

### Resources & References
📖 [Beowulf Cluster Basics](https://www.linux.com/training-tutorials/building-beowulf-cluster-just-13-steps/)   
📖 [OpenMPI Documentation](https://www.open-mpi.org/faq/)   
📖 [SLURM Workload Manager](https://slurm.schedmd.com/documentation.html)   
📖 [Prometheus](https://prometheus.io/docs/introduction/overview/) & [Grafana](https://grafana.com/docs/)

💻 Client-Side (Frontend)   
🔹 Framework: React (with TypeScript)   
🔹 UI Library: TailwindCSS for styling   
🔹 Terminal Emulation: xterm.js for web-based SSH   
🔹 State Management: React Context API or Zustand   
🔹 API Calls: Axios   
🔹 WebSockets: For real-time SSH & logs

🛠 Server-Side (Backend)    
1️⃣ Node Manager (Worker Node Management)   
🔹 Language: Golang   
🔹 Framework: Native Go with Gorilla Mux (for REST API)   
🔹 Database: PostgreSQL (for node metadata)   
🔹 Communication: gRPC or REST API

2️⃣ Task Scheduler (Job & Workload Distribution)   
🔹 Language: Python   
🔹 Framework: FastAPI   
🔹 Queue System: Redis Streams   
🔹 Task Execution: Python subprocess + Docker API

3️⃣ SSH Manager (Manages SSH Tunnels to Worker Nodes)   
🔹 Language: Python   
🔹 Framework: FastAPI   
🔹 Reverse Tunneling: Ngrok / LocalTunnel   
🔹 Shell Execution: paramiko or asyncssh

⚡ Beowulf Cluster (High-Performance Computing)   
🔹 Message Passing Interface (MPI): OpenMPI   
🔹 Job Scheduler: Slurm (for job distribution)   
🔹 Node Communication: Secure SSH connections

📊 Monitoring & Logging   
🔹 Metrics Collection: Prometheus    
🔹 Visualization Dashboard: Grafana    
🔹 Log Aggregation: Fluent Bit + Loki (optional)

🚀 Deployment & DevOps   
🔹 Containerization: Docker    
🔹 Orchestration: Docker Compose (for MVP), Kubernetes (later)   
🔹 CI/CD: GitHub Actions (Automated build, test, deploy)   
🔹 Reverse Proxy: NGINX

📜 Documentation & Repo Management   
🔹 Docs: Markdown-based Wiki (GitHub Wiki)    
🔹 API Documentation: Swagger UI for FastAPI

### Contributors