package routes

import (
	"net/http"
)

func SetupScheduleRoutes(router *http.ServeMux) {
	router.HandleFunc("GET /core-api/schedule/order", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Schedule"))
	})

	router.HandleFunc("GET /core-api/schedule/plan", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Plan"))
	})

	router.HandleFunc("GET /core-api/schedule/dispatch", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Dispatch"))
	})
}
