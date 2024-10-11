package production

import (
	"encoding/json"
	"ovaphlow/mes/core/internal/infra"
	"ovaphlow/mes/core/internal/schema"
	"time"
)

type BomApplicationService struct {
}

func NewBomApplicationService() *BomApplicationService {
	return &BomApplicationService{}
}

func (s *BomApplicationService) GetMany() ([]map[string]interface{}, error) {
	builder, err := infra.NewSQLQueryBuilder().Init(infra.Postgres).Select(nil, &infra.SCHEMA_NAME, &schema.BomTableName)
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

func (s *BomApplicationService) Create(bom schema.Bom) error {
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

	err = infra.NewSQLSaveBuilder(infra.Postgres).Save(&infra.SCHEMA_NAME, &schema.BomTableName, map[string]interface{}{
		"id":         id,
		"time":       now,
		"state":      string(stateJson),
		"product_id": bom.ProductID,
		"sn":         bom.SN,
		"detail":     bom.Detail,
	})
	if err != nil {
		return err
	}
	return nil
}
