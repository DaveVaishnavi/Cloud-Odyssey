package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
)

type Task struct {
	ID             string `json:"id"`
	Command        string `json:"command"`
	AssignedWorker string `json:"assigned_worker"`
	Status         string `json:"status"`
	CreatedAt      string `json:"created_at"`
}

var (
	rdb      *redis.Client
	ctx      = context.Background()
	workerID string
)

func initRedis() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	if _, err := rdb.Ping(ctx).Result(); err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}
}

func executeCommand(cmdStr string) (string, error) {
	cmd := exec.Command("bash", "-c", cmdStr)
	var out bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &out
	err := cmd.Run()
	return out.String(), err
}

func pollTasks() {
	queueKey := fmt.Sprintf("task_queue:%s", workerID)
	for {
		result, err := rdb.RPop(ctx, queueKey).Result()
		if err == redis.Nil {
			time.Sleep(2 * time.Second)
			continue
		} else if err != nil {
			log.Println("Error fetching task:", err)
			continue
		}

		var task Task
		if err := json.Unmarshal([]byte(result), &task); err != nil {
			log.Println("Invalid task data:", err)
			continue
		}

		log.Printf("Executing task: %s\n", task.ID)
		output, err := executeCommand(task.Command)
		if err != nil {
			task.Status = "failed"
		} else {
			task.Status = "completed"
		}

		sendResult(task.ID, output, task.Status)
		rdb.HSet(ctx, "task_status", task.ID, task.Status)
	}
}

func sendResult(taskID, result, status string) {
	payload := map[string]string{
		"task_id": taskID,
		"output":  result,
		"status":  status,
	}
	jsonData, _ := json.Marshal(payload)
	_, err := http.Post("http://master-service:8080/task/result", "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		log.Printf("Failed to send result for task %s: %v\n", taskID, err)
	}
}

func heartbeat() {
	for {
		payload := map[string]string{
			"worker_id": workerID,
			"status":    "healthy",
		}
		jsonData, _ := json.Marshal(payload)
		_, err := http.Post("http://master-service:8080/heartbeat", "application/json", bytes.NewBuffer(jsonData))
		if err != nil {
			log.Println("Heartbeat failed:", err)
		}
		time.Sleep(10 * time.Second)
	}
}

func setupReverseSSHTunnel() {
	masterUser := os.Getenv("MASTER_USER") // e.g., ubuntu
	masterHost := os.Getenv("MASTER_HOST") // e.g., ec2-X-X-X-X.compute.amazonaws.com
	remotePort := os.Getenv("REMOTE_PORT") // e.g., 2222
	localPort := os.Getenv("LOCAL_PORT")   // e.g., 22

	if masterUser == "" || masterHost == "" || remotePort == "" || localPort == "" {
		log.Println("Skipping reverse SSH tunnel: Missing environment variables")
		return
	}

	cmdStr := fmt.Sprintf("ssh -N -R %s:localhost:%s %s@%s -o StrictHostKeyChecking=no",
		remotePort, localPort, masterUser, masterHost)

	log.Printf("Establishing reverse SSH tunnel: %s\n", cmdStr)
	cmd := exec.Command("bash", "-c", cmdStr)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	go func() {
		if err := cmd.Run(); err != nil {
			log.Printf("Failed to establish SSH tunnel: %v\n", err)
		}
	}()
}

func main() {
	workerID = os.Getenv("WORKER_ID")
	if workerID == "" {
		workerID = uuid.New().String()
	}

	initRedis()
	setupReverseSSHTunnel()
	go pollTasks()
	go heartbeat()

	r := gin.Default()

	r.POST("/task/execute", func(c *gin.Context) {
		var task Task
		if err := c.ShouldBindJSON(&task); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task data"})
			return
		}

		output, err := executeCommand(task.Command)
		if err != nil {
			task.Status = "failed"
		} else {
			task.Status = "completed"
		}
		rdb.HSet(ctx, "task_status", task.ID, task.Status)
		sendResult(task.ID, output, task.Status)
		c.JSON(http.StatusOK, gin.H{"status": task.Status, "output": output})
	})

	r.POST("/heartbeat", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "alive"})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8083"
	}
	r.Run(":" + port)
}
