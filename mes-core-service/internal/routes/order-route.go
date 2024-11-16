package routes

import (
	"encoding/json"
	"log"
	"net/http"
	"ovaphlow/mes/core/internal/infra"
	"ovaphlow/mes/core/internal/order"
)

func SetupOrderRoutes(router *http.ServeMux, prefix string) {
	orderRepo := order.NewOrderRepo(infra.Postgres)
	orderService := order.NewApplicationService(infra.Postgres, orderRepo)

	router.HandleFunc("PUT "+prefix+"/order/{id}/{action}", func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		action := r.PathValue("action")
		if id == "" || action == "" {
			http.Error(w, infra.MakeHTTPErrorResponse("请求错误", r), http.StatusBadRequest)
			return
		}
		if action == "active" {
			if err := orderService.Active(id); err != nil {
				log.Println(err.Error())
				http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			}
		} else if action == "suspend" {
			if err := orderService.Suspend(id); err != nil {
				log.Println(err.Error())
				http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			}
		}
		w.WriteHeader(http.StatusOK)
	})

	router.HandleFunc("GET "+prefix+"/order", func(w http.ResponseWriter, r *http.Request) {
		data, err := orderService.GetMany()
		if err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(data); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
	})

	router.HandleFunc("POST "+prefix+"/order", func(w http.ResponseWriter, r *http.Request) {
		var data map[string]interface{}
		if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("请求错误", r), http.StatusBadRequest)
			return
		}
		if err := orderService.Create(data); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
		// Return the created data in the response
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(data); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
	})
}
