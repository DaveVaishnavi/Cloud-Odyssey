package routes

import (
	"cloud-project/controllers"
	"cloud-project/middleware"
	"github.com/gin-gonic/gin"
)

func PublicUserRoutes(router *gin.Engine) {
	router.POST("/api/auth/register", controllers.SignUp())
	router.POST("/api/auth/login", controllers.Login())
}

func ProtectedUserRoutes(router *gin.RouterGroup) {
	// Routes accessible by any authenticated user
	router.GET("/api/auth/me", controllers.GetCurrentUser())
	router.POST("/api/auth/logout", controllers.Logout())

	// Routes requiring specific roles
	masterRoutes := router.Group("/")
	masterRoutes.Use(middleware.RequireRole("Master"))
	{
		masterRoutes.GET("/api/users", controllers.GetUsers()) // Only Masters can list all users
	}

	// User details route - accessible by the user themselves or a Master
	router.GET("/api/auth/:_id", controllers.GetUser())
}

// SetupRoutes initializes all routes
func SetupRoutes(router *gin.Engine) {
	// Public routes
	PublicUserRoutes(router)

	// Protected routes (require authentication)
	protected := router.Group("/")
	protected.Use(middleware.Authentication())
	ProtectedUserRoutes(protected)
}