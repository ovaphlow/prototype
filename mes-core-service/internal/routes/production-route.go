package routes

import (
	"encoding/json"
	"log"
	"net/http"
	"ovaphlow/mes/core/internal/infra"
	"ovaphlow/mes/core/internal/production"
	"ovaphlow/mes/core/internal/schema"
)

func SetupProductionRoutes(router *http.ServeMux) {
	productRepo := production.NewProductRepository(infra.Postgres)
	productService := production.NewProductApplicationService(*productRepo)
	bomService := production.NewBomApplicationService(infra.Postgres)
	processRouteService := production.NewProcessRouteApplicationService(infra.Postgres)
	procedureService := production.NewProcedureApplicationService(infra.Postgres)

	router.HandleFunc("GET /core-api/production/product", func(w http.ResponseWriter, r *http.Request) {
		result, err := productService.GetMany()
		if err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		if len(result) == 0 {
			w.Write([]byte("[]"))
			return
		}
		if err := json.NewEncoder(w).Encode(result); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
		}
	})

	router.HandleFunc("POST /core-api/production/product", func(w http.ResponseWriter, r *http.Request) {
		var product schema.Product
		if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("请求错误", r), http.StatusBadRequest)
			return
		}
		if err := productService.Save(product); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
	})

	router.HandleFunc("GET /core-api/production/product/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		result, err := productService.GetOne(id)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
		if result == nil {
			http.Error(w, infra.MakeHTTPErrorResponse("未找到", r), http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(result); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
		}
	})

	router.HandleFunc("PUT /core-api/production/product/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		var product schema.Product
		if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("请求错误", r), http.StatusBadRequest)
			return
		}
		product.ID = id
		if err := productService.Update(product); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
	})

	router.HandleFunc("GET /core-api/production/bom", func(w http.ResponseWriter, r *http.Request) {
		result, err := bomService.GetMany()
		if err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
		w.Header().Set("content-type", "application/json")
		w.WriteHeader(http.StatusOK)
		if len(result) == 0 {
			w.Write([]byte("[]"))
			return
		}
		if err := json.NewEncoder(w).Encode(result); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
		}
	})

	router.HandleFunc("POST /core-api/production/bom", func(w http.ResponseWriter, r *http.Request) {
		var body schema.Bom
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("请求错误", r), http.StatusBadRequest)
			return
		}
		if err := bomService.Create(&body); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
	})

	router.HandleFunc("GET /core-api/production/process-route", func(w http.ResponseWriter, r *http.Request) {
		result, err := processRouteService.GetMany()
		if err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
		w.Header().Set("content-type", "application/json")
		w.WriteHeader(http.StatusOK)
		if len(result) == 0 {
			w.Write([]byte("[]"))
			return
		}
		if err := json.NewEncoder(w).Encode(result); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
		}
	})

	router.HandleFunc("POST /core-api/production/process-route", func(w http.ResponseWriter, r *http.Request) {
		var body schema.ProcessRoute
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("请求错误", r), http.StatusBadRequest)
			return
		}
		if err := processRouteService.Create(&body); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
	})

	router.HandleFunc("GET /core-api/production/process-route/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		result, err := processRouteService.GetOne(id)
		if err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
		if result == nil {
			http.Error(w, infra.MakeHTTPErrorResponse("未找到", r), http.StatusNotFound)
			return
		}
		w.Header().Set("content-type", "application/json")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(result); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
		}
	})

	router.HandleFunc("GET /core-api/production/procedure", func(w http.ResponseWriter, r *http.Request) {
		option := r.URL.Query().Get("option")
		if option == "" {
			result, err := procedureService.GetMany([][]string{})
			if err != nil {
				log.Println(err.Error())
				http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
				return
			}
			w.Header().Set("content-type", "application/json")
			w.WriteHeader(http.StatusOK)
			if len(result) == 0 {
				w.Write([]byte("[]"))
				return
			}
			if err := json.NewEncoder(w).Encode(result); err != nil {
				log.Println(err.Error())
				http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			}
			return
		} else if option == "default-filter" {
			filter := r.URL.Query().Get("filter")
			if filter == "" {
				http.Error(w, infra.MakeHTTPErrorResponse("请求错误", r), http.StatusBadRequest)
				return
			}
			f, err := infra.ParseQueryString2DefaultFilter(filter)
			if err != nil {
				log.Println(err.Error())
				http.Error(w, infra.MakeHTTPErrorResponse("请求错误", r), http.StatusBadRequest)
				return
			}
			result, err := procedureService.GetMany(f)
			if err != nil {
				log.Println(err.Error())
				http.Error(w, infra.MakeHTTPErrorResponse("请求错误", r), http.StatusBadRequest)
				return
			}
			w.Header().Set("content-type", "application/json")
			w.WriteHeader(http.StatusOK)
			if len(result) == 0 {
				w.Write([]byte("[]"))
				return
			}
			if err := json.NewEncoder(w).Encode(result); err != nil {
				log.Println(err.Error())
				http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			}
			return
		} else {
			http.Error(w, infra.MakeHTTPErrorResponse("请求错误", r), http.StatusBadRequest)
		}
	})

	router.HandleFunc("POST /core-api/production/procedure", func(w http.ResponseWriter, r *http.Request) {
		var body schema.Procedure
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("请求错误", r), http.StatusBadRequest)
			return
		}
		if err := procedureService.Create(&body); err != nil {
			log.Println(err.Error())
			http.Error(w, infra.MakeHTTPErrorResponse("服务器错误", r), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
	})
}
