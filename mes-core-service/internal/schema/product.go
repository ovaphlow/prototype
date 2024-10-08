package schema

import "time"

type Product struct {
	ID     string    `json:"id"`
	Time   time.Time `json:"time"`
	State  string    `json:"state"`
	Name   string    `json:"name"`
	Detail string    `json:"detail"`
}
