package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupManufacturingRoutes(router *gin.Engine) {
	router.GET("/core-api/manufacturing/equipment", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Equipment"})
	})

	router.GET("/core-api/manufacturing/qc", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "QC"})
	})
}
