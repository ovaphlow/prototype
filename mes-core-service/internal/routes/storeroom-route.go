package routes

import (
	"net/http"
)

func SetupStoreroomRoutes(router *http.ServeMux) {
	router.HandleFunc("GET /core-api/storeroom/raw-material", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Storeroom"))
	})

	router.HandleFunc("GET /core-api/storeroom/semi-finished", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Semi-Finished"))
	})

	router.HandleFunc("GET /core-api/storeroom/finished", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Finished"))
	})
}
