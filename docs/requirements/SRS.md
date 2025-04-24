# 📄 Software Requirements Specification (SRS)

## 🧾 1. Project Overview

**Project Name**: Cloud Odyssey  
**Date**: 28/03/2025  
**Version**: 1.0

### 🌟 Abstract

Cloud Odyssey is a high-performance, distributed cloud computing system that leverages idle computational resources in a
decentralized Beowulf cluster. Designed for executing parallel workloads via secure SSH access, it supports real-time
scheduling with OpenMPI and SLURM, dynamic worker node orchestration, and robust monitoring through Prometheus and
Grafana.

---

## 👥 2. Stakeholders

| Role | Stakeholder |
|------|-------------|
| End Users | Researchers, Scientists, Academic Institutions, Enterprises |
| Development Team | Vaishnavi Virat Dave, Kaashvi Jain, Kajal, Kumud, Abhijna Raghavendra, Anushka Jangid |
| System Maintainers | Open Source Contributors |

---

## 🧩 3. Functional Requirements

1. ✅ **Secure SSH Login**: Users must authenticate securely into the Master Node.
2. ⚙️ **Task Scheduling**: SLURM + OpenMPI must be used for scheduling tasks.
3. 🔁 **Dynamic Node Orchestration**: Worker nodes should self-register/unregister.
4. 🧠 **Parallel Task Execution**: Computations must utilize parallel processing.
5. 🔐 **Remote Accessibility**: Enable access behind NAT/firewalls via LocalTunnel/ngrok.
6. 📈 **System Monitoring**: Integrate Prometheus + Grafana for performance tracking.

---

## 📉 4. Non-Functional Requirements

1. 🔒 **Security**: All communications must be encrypted (TLS/SSH).
2. 📈 **Scalability**: The system must scale horizontally across nodes.
3. ⚡ **Low Footprint**: Worker nodes should consume minimal resources.
4. 📝 **Logging**: Efficient telemetry for diagnostics and performance analysis.
5. 🧩 **Modularity**: Microservices architecture with independent deployments.

---

## 🖥️ 5. System Architecture

- **Master Node**: Central task coordinator with secure SSH access.
- **Worker Nodes**: Execute parallel tasks and report health metrics.
- **APIs**: RESTful APIs built using FastAPI and Fiber.
- **Monitoring Stack**: Prometheus for metrics + Grafana for visualization.

---

## 🔍 6. Use Case Summary

### 👤 Use Case: Submit Task

**Actors**: User, Scheduler, Master, Worker  
**Flow**:

1. User logs in → Submits task to Scheduler
2. Scheduler allocates task → Master coordinates execution
3. Worker completes job → Results returned to User

### 👤 Use Case: Monitor System

**Actors**: User, Monitoring Service  
**Flow**:

1. User queries metrics/logs → Monitoring returns visual reports

---

## 🛠️ 7. External Dependencies

- **Software**:
    - OpenMPI, SLURM, OpenSSH, NFS
    - FastAPI (Python), Fiber (Go), MongoDB, Redis Streams
    - Prometheus, Grafana, Docker, Docker Compose
- **Hardware**:
    - Multi-core processors
    - Minimum 8GB RAM per node
    - High-speed networking infrastructure

---

## 🧪 8. Verification Checklist

- [x] Are both functional and non-functional requirements clearly defined?
- [x] Are security and scalability requirements explicitly stated?
- [x] Are all technologies and tools listed?
- [x] Are advantages over commercial cloud providers justified?
- [x] Is the system designed with modularity and extensibility?

---

## 📌 9. Appendix

- 🔗 [Feasibility Study Report](../assets/PDF/Feasibility%20Study%20Report.pdf)
- 📋 [Design Document](../assets/PDF/Design%20Document%20.pdf)
- 💼 [Project Proposal](../assets/PDF/Project%20Proposal.pdf)
