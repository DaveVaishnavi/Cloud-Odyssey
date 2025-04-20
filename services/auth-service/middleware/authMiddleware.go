package middleware

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	helper "cloud-project/helpers"
)

// Authentication verifies the JWT token in the request header
func Authentication() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientToken := c.Request.Header.Get("token")
		if clientToken == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "No authorization header provided"})
			c.Abort()
			return
		}

		claims, err := helper.ValidateToken(clientToken)
		if err != "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err})
			c.Abort()
			return
		}

		c.Set("userClaims", claims)
		c.Next()
	}
}

// RequireRole checks if the authenticated user has one of the required roles
func RequireRole(roles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get user claims from context (set by Authentication middleware)
		userClaims, exists := c.Get("userClaims")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
			c.Abort()
			return
		}

		claims := userClaims.(*helper.SignedDetails)
		userRole := claims.Role

		// If no specific roles are required, continue
		if len(roles) == 0 {
			c.Next()
			return
		}

		// Check if user's role is in the allowed roles
		allowed := false
		for _, role := range roles {
			if userRole == role {
				allowed = true
				break
			}
		}

		if !allowed {
			c.JSON(http.StatusForbidden, gin.H{"error": fmt.Sprintf("Access denied: role %s not authorized", userRole)})
			c.Abort()
			return
		}

		c.Next()
	}
}