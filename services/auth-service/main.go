package main

import (
	"cloud-project/database"
	"cloud-project/middleware"
	"cloud-project/routes"
	"os"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

var AppointmentConnection *mongo.Collection = database.OpenCollection(database.Client, "user")

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	router := gin.New()
	router.Use(gin.Logger())

	// Register public routes
	routes.PublicUserRoutes(router)

	// Apply auth middleware for protected routes
	protected := router.Group("/")
	protected.Use(middleware.Authentication())

	// Register protected routes
	routes.ProtectedUserRoutes(protected)

	router.Run(":" + port)
}
