package order

import (
	"database/sql"
	"fmt"
	"ovaphlow/mes/core/internal/infra"
)

type OrderRepo struct {
	db *sql.DB
}

func NewOrderRepo(db *sql.DB) *OrderRepo {
	return &OrderRepo{
		db: db,
	}
}

func (r *OrderRepo) UpdateStatusById(status string, id string) error {
	q := fmt.Sprintf(`UPDATE %s.order SET detail = jsonb_set(detail, '{status}', to_jsonb($1::text)) WHERE id = $2`, infra.SCHEMA_NAME)
	_, err := r.db.Exec(q, status, id)
	if err != nil {
		return err
	}
	return nil
}
