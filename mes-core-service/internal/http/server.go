package http

import (
	"ovaphlow/mes/core/internal/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/secure"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.Use(cors.Default())

	router.Use(gin.Logger())

	router.Use(gin.Recovery())

	secureMiddleware := secure.New(secure.Config{
		FrameDeny:             true,
		ContentTypeNosniff:    true,
		BrowserXssFilter:      true,
		ContentSecurityPolicy: "default-src 'self'",
		ReferrerPolicy:        "no-referrer",
	})
	router.Use(secureMiddleware)

	routes.SetupProductionRoutes(router)

	return router
}
