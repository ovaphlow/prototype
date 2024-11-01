package order

import (
	"database/sql"
	"encoding/json"
	"ovaphlow/mes/core/internal/infra"
	"ovaphlow/mes/core/internal/schema"
	"time"
)

type OrderApplicationService struct {
	db *sql.DB
}

func NewOrderApplicationService(db *sql.DB) *OrderApplicationService {
	return &OrderApplicationService{
		db: db,
	}
}

func (s *OrderApplicationService) Get(id string) (map[string]interface{}, error) {
	return nil, nil
}

func (s *OrderApplicationService) GetMany() ([]map[string]interface{}, error) {
	return nil, nil
}

func (s *OrderApplicationService) Create(data map[string]interface{}) error {
	id, err := infra.GenerateKsuid()
	if err != nil {
		return err
	}
	now := time.Now()
	state := map[string]string{
		"created_at": now.Format(time.RFC3339),
	}
	stateJson, err := json.Marshal(state)
	if err != nil {
		return err
	}
	err = infra.NewSQLSaveBuilder(infra.Postgres, &infra.SCHEMA_NAME, &schema.OrderTableName).Save(map[string]interface{}{
		"id":         id,
		"time":       now,
		"state":      string(stateJson),
		"product_id": data["product_id"],
		"due_date":   data["due_date"],
		"detail":     data["detail"],
	})
	if err != nil {
		return err
	}
	return nil
}
