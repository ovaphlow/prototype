package order

import (
	"database/sql"
	"fmt"
	"ovaphlow/mes/core/internal/infra"
	"time"
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
	now := time.Now().Format("2006-01-02 15:04:05-07")
	q := fmt.Sprintf(
		`
		UPDATE %s.order
		SET detail = jsonb_set(detail, '{status}', to_jsonb($1::text)),
			state = jsonb_set(state, '{updated_at}', to_jsonb($2::text))
		WHERE id = $3`,
		infra.SCHEMA_NAME,
	)
	stmt, err := r.db.Prepare(q)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(status, now, id)
	if err != nil {
		return err
	}
	return nil
}
