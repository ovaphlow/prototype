package schemas

import "time"

type Production struct {
	ID          string    `json:"id"`
	CreatedTime time.Time `json:"createdTime"`
	State       string    `json:"state"`
}
