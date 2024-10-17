package server

import (
	"log"
	"net/http"
	"ovaphlow/mes/core/internal/middleware"
	"ovaphlow/mes/core/internal/routes"
)

func HTTPServe(addr string) {
	router := http.NewServeMux()

	router.HandleFunc("GET /core-api/test", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello, World!"))
	})

	routes.SetupManufacturingRoutes(router)
	routes.SetupProductionRoutes(router)
	routes.SetupScheduleRoutes(router)
	routes.SetupStoreroomRoutes(router)

	stack := middleware.CreateStack(
		middleware.CORS,
		middleware.Logging,
		middleware.XSSProtection,
	)

	server := http.Server{
		Addr:    addr,
		Handler: stack(router),
	}

	log.Println("Starting server on ", addr)
	if err := server.ListenAndServe(); err != nil {
		log.Panicln("Error starting server:", err.Error())
	}
}
