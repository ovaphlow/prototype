package routes

import (
	"encoding/json"
	"log"
	"net/http"
	"ovaphlow/mes/core/internal/infra"
	"ovaphlow/mes/core/internal/order"
)

func SetupOrderRoutes(router *http.ServeMux) {
	orderService := order.NewOrderApplicationService(infra.Postgres)

	router.HandleFunc("POST /core-api/order", func(w http.ResponseWriter, r *http.Request) {
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
		w.WriteHeader(http.StatusCreated)
	})
}
