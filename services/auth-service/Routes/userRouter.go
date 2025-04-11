package routes

import (
	"cloud-project/controllers"
	"github.com/gin-gonic/gin"
)

func PublicUserRoutes(router *gin.Engine) {
	router.POST("/auth/register", controllers.SignUp())
	router.POST("/auth/login", controllers.Login())
}

func ProtectedUserRoutes(router *gin.RouterGroup) {
	// router.GET("/users", controllers.GetUsers())
	router.GET("/auth/:_id", controllers.GetUser())
	router.POST("/auth/logout", controllers.Logout())

}
