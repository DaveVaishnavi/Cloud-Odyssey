package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func setupRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	initRedis()
	r := gin.Default()
	r.POST("/queue/add", addTask)
	r.GET("/queue/status/:id", taskStatus)
	r.POST("/queue/retry/:id", retryTask)
	r.GET("/queue/list", listQueue)
	return r
}

func TestTaskFlow(t *testing.T) {
	os.Setenv("PORT", "8082")
	r := setupRouter()

	// Setup: Add at least one worker to the Redis "workers" list
	rdb.LPush(ctx, "workers", "worker-test")

	// 1. Add a task
	command := `{"command": "echo Hello"}`
	req := httptest.NewRequest("POST", "/queue/add", bytes.NewBufferString(command))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var task Task
	err := json.Unmarshal(w.Body.Bytes(), &task)
	assert.NoError(t, err)
	assert.Equal(t, "echo Hello", task.Command)
	assert.Equal(t, "queued", task.Status)

	// 2. Check task status
	statusReq := httptest.NewRequest("GET", fmt.Sprintf("/queue/status/%s", task.ID), nil)
	statusResp := httptest.NewRecorder()
	r.ServeHTTP(statusResp, statusReq)

	assert.Equal(t, http.StatusOK, statusResp.Code)

	var statusRespData map[string]string
	json.Unmarshal(statusResp.Body.Bytes(), &statusRespData)
	assert.Equal(t, "queued", statusRespData["status"])

	// 3. List queue
	listReq := httptest.NewRequest("GET", "/queue/list?worker=worker-test", nil)
	listResp := httptest.NewRecorder()
	r.ServeHTTP(listResp, listReq)

	assert.Equal(t, http.StatusOK, listResp.Code)
	var tasks []Task
	json.Unmarshal(listResp.Body.Bytes(), &tasks)
	assert.True(t, len(tasks) >= 1)

	// 4. Retry task
	retryReq := httptest.NewRequest("POST", fmt.Sprintf("/queue/retry/%s", task.ID), nil)
	retryResp := httptest.NewRecorder()
	r.ServeHTTP(retryResp, retryReq)

	assert.Equal(t, http.StatusOK, retryResp.Code)
}

func TestInvalidAdd(t *testing.T) {
	r := setupRouter()

	req := httptest.NewRequest("POST", "/queue/add", bytes.NewBufferString(`{}`))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestListQueueWithoutParam(t *testing.T) {
	r := setupRouter()

	req := httptest.NewRequest("GET", "/queue/list", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}
