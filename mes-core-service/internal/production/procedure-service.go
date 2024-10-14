package production

import (
	"database/sql"
	"encoding/json"
	"ovaphlow/mes/core/internal/infra"
	"ovaphlow/mes/core/internal/schema"
	"time"
)

type ProcedureApplicationService struct {
	db *sql.DB
}

func NewProcedureApplicationService(db *sql.DB) *ProcedureApplicationService {
	return &ProcedureApplicationService{
		db: db,
	}
}

func (s *ProcedureApplicationService) GetMany(filter [][]string) ([]map[string]interface{}, error) {
	builder, err := infra.NewSQLQueryBuilder(infra.Postgres, &infra.SCHEMA_NAME, &schema.ProcedureTableName).Select(nil)
	if err != nil {
		return nil, err
	}
	builder, err = builder.Where(filter)
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

func (s *ProcedureApplicationService) Create(row *schema.Procedure) error {
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
	err = infra.NewSQLSaveBuilder(infra.Postgres, &infra.SCHEMA_NAME, &schema.ProcedureTableName).Save(map[string]interface{}{
		"id":               id,
		"time":             now,
		"state":            string(stateJson),
		"process_route_id": row.ProcessRouteID,
		"sn":               row.SN,
		"detail":           row.Detail,
		"equipment":        "{}",
		"operation":        "{}",
		"qc":               "{}",
	})
	if err != nil {
		return err
	}
	return nil
}
