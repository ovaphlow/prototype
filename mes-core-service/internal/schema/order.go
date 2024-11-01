package schema

var OrderTableName = "order"

type Order struct {
	ID        string `json:"id"`
	Time      string `json:"time"`
	State     string `json:"state"`
	ProductID string `json:"product_id"`
	DueDate   string `json:"due_date"`
	Detail    string `json:"detail"`
}
