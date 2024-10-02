package main

import "ovaphlow/mes/core/internal/http"

func main() {
	r := http.SetupRouter()
	// Listen and Server in 0.0.0.0:8088
	r.Run(":8088")
}
