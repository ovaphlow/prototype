package order

import (
	"database/sql"
	"encoding/json"
	"ovaphlow/mes/core/internal/infra"
	"ovaphlow/mes/core/internal/schema"
	"time"
)

type ApplicationService struct {
	db        *sql.DB
	orderRepo *OrderRepo
}

func NewApplicationService(db *sql.DB, orderRepo *OrderRepo) *ApplicationService {
	return &ApplicationService{
		db:        db,
		orderRepo: orderRepo,
	}
}

func (s *ApplicationService) Active(id string) error {
	s.orderRepo.UpdateStatusById("激活", id)
	return nil
}

func (s *ApplicationService) Suspend(id string) error {
	s.orderRepo.UpdateStatusById("挂起", id)
	return nil
}

func (s *ApplicationService) Get(id string) (map[string]interface{}, error) {
	return nil, nil
}

func (s *ApplicationService) GetMany() ([]map[string]interface{}, error) {
	builder, err := infra.NewSQLQueryBuilder(infra.Postgres, &infra.SCHEMA_NAME, &schema.OrderTableName).Select(nil)
	if err != nil {
		return nil, err
	}
	builder.Append("order by id desc")
	rows, err := builder.Query()
	if err != nil {
		return nil, err
	}
	result, err := infra.SQLRows2Map(rows)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (s *ApplicationService) Create(data map[string]interface{}) error {
	id, err := infra.GenerateKsuid()
	if err != nil {
		return err
	}
	now := time.Now().Format("2006-01-02 15:04:05-07")
	state := map[string]string{
		"created_at": now,
	}
	stateJson, err := json.Marshal(state)
	if err != nil {
		return err
	}

	detailJson, err := json.Marshal(data["detail"])
	if err != nil {
		return err
	}

	err = infra.NewSQLSaveBuilder(infra.Postgres, &infra.SCHEMA_NAME, &schema.OrderTableName).Save(map[string]interface{}{
		"id":         id,
		"time":       now,
		"state":      string(stateJson),
		"product_id": data["product_id"],
		"due_date":   data["due_date"],
		"detail":     string(detailJson), // Use the JSON string here
	})
	if err != nil {
		return err
	}
	return nil
}
