FROM python:3.12-slim

# Install required system packages for MPI and build tools
RUN apt-get update && apt-get install -y \
    build-essential \
    mpich \
    curl \
    git \
 && rm -rf /var/lib/apt/lists/*

# Install Poetry
ENV POETRY_VERSION=1.7.1
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:$PATH"

# Set work directory
WORKDIR /app

# Copy project files
COPY pyproject.toml poetry.lock* ./
COPY src ./src

# Install dependencies
RUN poetry install --no-root

# Create temp dir for uploaded files
RUN mkdir -p /tmp/mpi_jobs

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI app
CMD ["poetry", "run", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
