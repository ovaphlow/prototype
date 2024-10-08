package http

import (
	"ovaphlow/mes/core/internal/routes"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	routes.SetupProductionRoutes(router)

	return router
}
