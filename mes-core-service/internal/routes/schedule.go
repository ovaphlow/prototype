package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupScheduleRoutes(router *gin.Engine) {
	router.GET("/core-api/schedule/order", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Schedule"})
	})

	router.GET("/core-api/schedule/plan", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Plan"})
	})

	router.GET("/core-api/schedule/dispatch", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Dispatch"})
	})
}
