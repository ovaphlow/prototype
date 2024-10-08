package routes

import (
	"log"
	"net/http"
	"ovaphlow/mes/core/internal/infra"
	"ovaphlow/mes/core/internal/production"
	"ovaphlow/mes/core/internal/schema"

	"github.com/gin-gonic/gin"
)

func SetupProductionRoutes(router *gin.Engine) {
	productRepo := production.NewProductRepository(infra.Postgres)
	productService := production.NewProductApplicationService(*productRepo)

	router.GET("/core-api/production/product", func(c *gin.Context) {
		result, err := productService.List()
		if err != nil {
			log.Println(err.Error())
			c.Status(http.StatusInternalServerError)
			return
		}
		if len(result) == 0 {
			c.JSON(http.StatusOK, []schema.Product{})
			return
		}
		c.JSON(http.StatusOK, result)
	})

	router.POST("/core-api/production/product", func(c *gin.Context) {
		var product schema.Product
		if err := c.ShouldBindJSON(&product); err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := productService.Save(product); err != nil {
			log.Println(err.Error())
			c.Status(http.StatusInternalServerError)
			return
		}
		c.Status(http.StatusCreated)
	})

	router.GET("/core-api/production/bom", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "BOM"})
	})

	router.GET("/core-api/production/process-route", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Process Route"})
	})
}
