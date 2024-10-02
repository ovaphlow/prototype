package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupStoreroomRoutes(router *gin.Engine) {
	router.GET("/core-api/storeroom/raw-material", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Storeroom"})
	})

	router.GET("/core-api/storeroom/semi-finished", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Semi-Finished"})
	})

	router.GET("/core-api/storeroom/finished", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Finished"})
	})
}
