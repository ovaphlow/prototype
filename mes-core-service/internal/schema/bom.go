package schema

import "time"

var BomTableName string = "bom"

type Bom struct {
	ID        string    `json:"id"`
	Time      time.Time `json:"time"`
	State     string    `json:"state"`
	ProductID string    `json:"productId"`
	SN        string    `json:"sn"`
	Detail    string    `json:"detail"`
}
