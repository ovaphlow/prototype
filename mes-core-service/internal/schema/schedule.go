package schema

type Schedule struct {
	ID           int    `json:"id"`
	Time         string `json:"time"`
	State        string `json:"state"`
	StartingDate string `json:"starting_date"`
	OrderID      string `json:"order_id"`
	ProductID    string `json:"product_id"`
	BomIDRaw     string `json:"bom_id_raw"`
	BomIDSemi    string `json:"bom_id_semi"`
	Detail       string `json:"detail"`
}
