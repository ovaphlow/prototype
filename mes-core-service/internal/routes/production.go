package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupProductionRoutes(router *gin.Engine) {
	router.GET("/core-api/production/definition", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Production"})
	})

	router.GET("/core-api/production/bom", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "BOM"})
	})

	router.GET("/core-api/production/process-route", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Process Route"})
	})
}
