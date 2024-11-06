package routes

import (
	"net/http"
)

func SetupManufacturingRoutes(router *http.ServeMux) {
	router.HandleFunc("GET /core-api/manufacturing/equipment", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Equipment"))
	})

	router.HandleFunc("GET /core-api/manufacuring/qc", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("QC"))
	})
}
