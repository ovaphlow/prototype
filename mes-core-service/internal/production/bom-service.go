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

func (as *BomApplicationService) Create(bom schema.Bom) error {
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
