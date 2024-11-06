package schema

var ProcessRouteTableName = "process_route"

type ProcessRoute struct {
	ID        string `json:"jd"`
	Time      string `json:"time"`
	State     string `json:"state"`
	ProductID string `json:"product_id"`
	SN        string `json:"sn"`
	Detail    string `json:"detail"`
}
