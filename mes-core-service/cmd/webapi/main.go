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
	server.HTTPServe("8088")
}
