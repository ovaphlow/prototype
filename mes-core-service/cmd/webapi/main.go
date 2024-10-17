package main

import (
	"ovaphlow/mes/core/internal/infra"
	"ovaphlow/mes/core/internal/server"
)

func init() {
	infra.InitSlog()

	infra.InitPostgres()
}

func main() {
	server.HTTPServeSTDLIB("8088")
	// r := http.SetupRouter()
	// Listen and Server in 0.0.0.0:8088
	// r.Run(":8088")
}
