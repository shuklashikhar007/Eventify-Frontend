package helpers

import "github.com/gin-gonic/gin"

func SetCookie(c *gin.Context, name, value string, cookieMaxAge int) {
	c.SetCookie(name, value, cookieMaxAge, "/", "", true /*Secure*/, true /*HttpOnly*/)
}

func ExpireCookie(c *gin.Context, name string) {
	c.SetCookie(name, "", -1, "/", "", true /*Secure*/, true /*HttpOnly*/)
}