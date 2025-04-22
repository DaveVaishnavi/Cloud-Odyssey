# Dockerfile

FROM golang:1.21 as builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o worker-service .

# Final runtime image
FROM debian:bullseye-slim

RUN apt-get update && \
    apt-get install -y openssh-client bash ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/worker-service /app/worker-service

ENV PORT=8083

ENTRYPOINT ["/app/worker-service"]
