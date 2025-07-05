package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mitchellh/mapstructure"
	"github.com/shuklashikhar007/Eventify/backend/internal/helpers"
	"github.com/shuklashikhar007/Eventify/backend/internal/models"
)

// AuthMiddleware validates JWT token and sets user in context
func UserAuthMiddleware(c *gin.Context) {
	if c.Request.Method == "OPTIONS" {
        c.Next()
        return
    }

    authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization Header"})
		return
	}

	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid Authorization format"})
		return
	}

	claims, err := helpers.VerifyToken(parts[1])
	if err != nil {
		if err.Error() == "token has invalid claims: token is expired" {
			c.Redirect(http.StatusFound, "/auth/google/authorize")
			return
		}

		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	mapstructure.Decode(claims["user"], &user)

	c.Set("user", user)
    c.Next()
}