package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
)

type Task struct {
	ID             string json:"id"
	Command        string json:"command"
	AssignedWorker string json:"assigned_worker"
	Status         string json:"status" // queued, running, completed, failed
	CreatedAt      string json:"created_at"
}

var (
	rdb *redis.Client
	ctx = context.Background()
)

func initRedis() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}
}

func assignWorker() (string, error) {
	return rdb.RPopLPush(ctx, "workers", "workers").Result()
}

func addTask(c *gin.Context) {
	var req struct {
		Command string json:"command"
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	worker, err := assignWorker()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to assign worker"})
		return
	}

	task := Task{
		ID:             uuid.New().String(),
		Command:        req.Command,
		AssignedWorker: worker,
		Status:         "queued",
		CreatedAt:      time.Now().Format(time.RFC3339),
	}
	b, _ := json.Marshal(task)

	queueKey := fmt.Sprintf("task_queue:%s", worker)
	if err := rdb.LPush(ctx, queueKey, b).Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to queue task"})
		return
	}
	rdb.HSet(ctx, "task_status", task.ID, task.Status)
	c.JSON(http.StatusOK, task)
}

func taskStatus(c *gin.Context) {
	id := c.Param("id")
	status, err := rdb.HGet(ctx, "task_status", id).Result()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"id": id, "status": status})
}

func retryTask(c *gin.Context) {
	id := c.Param("id")
	var found bool

	workerList, _ := rdb.LRange(ctx, "workers", 0, -1).Result()
	for _, worker := range workerList {
		queueKey := fmt.Sprintf("task_queue:%s", worker)
		taskData, _ := rdb.LRange(ctx, queueKey, 0, -1).Result()
		for _, entry := range taskData {
			var t Task
			if err := json.Unmarshal([]byte(entry), &t); err == nil && t.ID == id {
				if err := rdb.LPush(ctx, queueKey, entry).Err(); err == nil {
					rdb.HSet(ctx, "task_status", id, "queued")
					c.JSON(http.StatusOK, gin.H{"message": "Task re-queued"})
					return
				}
			}
		}
	}
	if !found {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found in queue"})
	}
}

func listQueue(c *gin.Context) {
	worker := c.Query("worker")
	if worker == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "worker query param required"})
		return
	}
	queueKey := fmt.Sprintf("task_queue:%s", worker)
	taskData, err := rdb.LRange(ctx, queueKey, 0, -1).Result()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching queue"})
		return
	}
	var tasks []Task
	for _, entry := range taskData {
		var t Task
		if err := json.Unmarshal([]byte(entry), &t); err == nil {
			tasks = append(tasks, t)
		}
	}
	c.JSON(http.StatusOK, tasks)
}

func main() {
	initRedis()
	r := gin.Default()

	r.POST("/queue/add", addTask)
	r.GET("/queue/status/:id", taskStatus)
	r.POST("/queue/retry/:id", retryTask)
	r.GET("/queue/list", listQueue)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8082"
	}
	r.Run(":" + port)
}