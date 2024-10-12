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

func (p *ProductApplicationService) Update(product schema.Product) error {
	var stateMap map[string]interface{}
	err := json.Unmarshal([]byte(product.State), &stateMap)
	if err != nil {
		return err
	}
	stateMap["updated_at"] = time.Now().Format("2006-01-02 15:04:05-07")
	updatedState, err := json.Marshal(stateMap)
	if err != nil {
		return err
	}
	product.State = string(updatedState)

	err = infra.NewSQLUpdateBuilder(infra.Postgres).
		Update(
			&infra.SCHEMA_NAME,
			&ProductTableName,
			map[string]interface{}{
				"name":   product.Name,
				"detail": product.Detail,
				"state":  product.State,
			},
			"where id = '"+product.ID+"'",
		)
	if err != nil {
		return err
	}
	return nil
}

func (p *ProductApplicationService) GetOne(id string) (map[string]interface{}, error) {
	builder, err := infra.NewSQLQueryBuilder(infra.Postgres, &infra.SCHEMA_NAME, &ProductTableName).Select(nil)
	if err != nil {
		return nil, err
	}
	builder, err = builder.Where([][]string{{"equal", "id", id}})
	if err != nil {
		return nil, err
	}
	rows, err := builder.Query()
	if err != nil {
		return nil, err
	}
	result, err := infra.SQLRows2Map(rows)
	if err != nil {
		return nil, err
	}
	if len(result) >= 1 {
		return result[0], nil
	}
	return nil, nil
}

func (p *ProductApplicationService) GetMany() ([]map[string]interface{}, error) {
	builder, err := infra.NewSQLQueryBuilder(infra.Postgres, &infra.SCHEMA_NAME, &ProductTableName).Select(nil)
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
		"created_at": now.Format("2006-01-02 15:04:05-07"),
	}
	stateJSON, err := json.Marshal(state)
	if err != nil {
		return err
	}

	err = infra.NewSQLSaveBuilder(infra.Postgres, &infra.SCHEMA_NAME, &ProductTableName).Save(map[string]interface{}{
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
