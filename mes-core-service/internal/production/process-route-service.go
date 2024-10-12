package production

import (
	"database/sql"
	"encoding/json"
	"ovaphlow/mes/core/internal/infra"
	"ovaphlow/mes/core/internal/schema"
	"time"
)

type ProcessRouteApplicationService struct {
	db *sql.DB
}

func NewProcessRouteApplicationService(db *sql.DB) *ProcessRouteApplicationService {
	return &ProcessRouteApplicationService{
		db: db,
	}
}

func (s *ProcessRouteApplicationService) GetMany() ([]map[string]interface{}, error) {
	builder, err := infra.NewSQLQueryBuilder(infra.Postgres, &infra.SCHEMA_NAME, &schema.ProcessRouteTableName).Select(nil)
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

func (s *ProcessRouteApplicationService) Create(d *schema.ProcessRoute) error {
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

	err = infra.NewSQLSaveBuilder(infra.Postgres, &infra.SCHEMA_NAME, &schema.ProcessRouteTableName).Save(map[string]interface{}{
		"id":         id,
		"time":       now,
		"state":      string(stateJson),
		"product_id": d.ProductID,
		"sn":         d.SN,
		"detail":     d.Detail,
	})
	if err != nil {
		return err
	}
	return nil
}
