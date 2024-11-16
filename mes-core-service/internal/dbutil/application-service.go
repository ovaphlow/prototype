package dbutil

import "database/sql"

type ApplicationService struct {
	db *sql.DB
}

func NewApplicationService(db *sql.DB) *ApplicationService {
	return &ApplicationService{db: db}
}
