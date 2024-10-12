package schema

var ProcedureTableName = "procedure"

type Procedure struct {
	ID             string `json:"id"`
	Time           string `json:"time"`
	State          string `json:"state"`
	ProcessRouteID string `json:"process_route_id"`
	SN             string `json:"sn"`
	Detail         string `json:"detail"`
	Equipment      string `json:"equipment"`
	Operation      string `json:"operation"`
	QC             string `json:"qc"`
}
