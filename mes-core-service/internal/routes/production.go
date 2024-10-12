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
	bomService := production.NewBomApplicationService(infra.Postgres)
	processRouteService := production.NewProcessRouteApplicationService(infra.Postgres)

	router.GET("/core-api/production/product", func(c *gin.Context) {
		result, err := productService.GetMany()
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

	router.GET("/core-api/production/product/:id", func(c *gin.Context) {
		id := c.Param("id")
		result, err := productService.GetOne(id)
		if err != nil {
			log.Println(err.Error())
			c.Status(http.StatusInternalServerError)
			return
		}
		if result == nil {
			c.Status(http.StatusNotFound)
			return
		}
		c.JSON(http.StatusOK, result)
	})

	router.PUT("/core-api/production/product/:id", func(c *gin.Context) {
		id := c.Param("id")
		var product schema.Product
		if err := c.ShouldBindJSON(&product); err != nil {
			log.Println(err.Error())
			c.Status(http.StatusBadRequest)
			return
		}
		product.ID = id
		if err := productService.Update(product); err != nil {
			log.Println(err.Error())
			c.Status(http.StatusInternalServerError)
			return
		}
		c.Status(http.StatusOK)
	})

	router.GET("/core-api/production/bom", func(c *gin.Context) {
		result, err := bomService.GetMany()
		if err != nil {
			log.Println(err.Error())
			c.Status(http.StatusInternalServerError)
			return
		}
		if len(result) == 0 {
			c.JSON(http.StatusOK, []map[string]interface{}{})
			return
		}
		c.JSON(http.StatusOK, result)
	})

	router.POST("/core-api/production/bom", func(c *gin.Context) {
		var body schema.Bom
		if err := c.ShouldBindJSON(&body); err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := bomService.Create(&body); err != nil {
			log.Println(err.Error())
			c.Status(http.StatusInternalServerError)
			return
		}
		c.Status(http.StatusCreated)
	})

	router.GET("/core-api/production/process-route", func(c *gin.Context) {
		result, err := processRouteService.GetMany()
		if err != nil {
			log.Println(err.Error())
			c.Status(http.StatusInternalServerError)
			return
		}
		if len(result) == 0 {
			c.JSON(http.StatusOK, []map[string]interface{}{})
			return
		}
		c.JSON(http.StatusOK, result)
	})

	router.POST("/core-api/production/process-route", func(c *gin.Context) {
		var body schema.ProcessRoute
		if err := c.ShouldBindJSON(&body); err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := processRouteService.Create(&body); err != nil {
			log.Println(err.Error())
			c.Status(http.StatusInternalServerError)
			return
		}
		c.Status(http.StatusCreated)
	})
}
