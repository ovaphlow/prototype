package production

import (
	"encoding/json"
	"ovaphlow/mes/core/internal/infra"
	"ovaphlow/mes/core/internal/schema"
	"time"
)

type ProductApplicationService struct {
	productRepo ProductRepository
}

func NewProductApplicationService(productRepo ProductRepository) *ProductApplicationService {
	return &ProductApplicationService{
		productRepo: productRepo,
	}
}

func (p *ProductApplicationService) List() ([]map[string]interface{}, error) {
	builder, err := infra.NewSQLQueryBuilder().Init(infra.Postgres).Select(nil, &infra.SCHEMA_NAME, &ProductTableName)
	if err != nil {
		return nil, err
	}
	builder = builder.Append("order by time desc limit 20")
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

func (p *ProductApplicationService) Save(product schema.Product) error {
	id, err := infra.GenerateKsuid()
	if err != nil {
		return nil
	}
	now := time.Now()

	state := map[string]string{
		"created_at": now.Format("2006-01-02 15:04:05.000-07"),
	}
	stateJSON, err := json.Marshal(state)
	if err != nil {
		return err
	}

	err = infra.NewSQLSaveBuilder(infra.Postgres).Save(&infra.SCHEMA_NAME, &ProductTableName, map[string]interface{}{
		"id":     id,
		"time":   now.Format("2006-01-02 15:04:05-07"),
		"state":  string(stateJSON),
		"name":   product.Name,
		"detail": product.Detail,
	})
	if err != nil {
		return err
	}
	return nil
}

type ProductDomainService struct {
}

type ProductDomainEventService struct {
}
