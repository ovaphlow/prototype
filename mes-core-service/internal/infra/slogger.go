package infra

import (
	"log"
	"log/slog"
	"os"
)

var Slogger *slog.Logger

func InitSlog() {
	log.Println("初始化日志组件")
	Slogger = slog.New(slog.NewTextHandler(os.Stdout, nil))
	slog.SetDefault(Slogger)
}
