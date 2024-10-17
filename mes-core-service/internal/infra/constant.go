package infra

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"
)

var SCHEMA_NAME string = "mes"

func MakeHTTPErrorResponse(title string, r *http.Request) string {
	res := map[string]string{
		"type":     "about:blank",
		"title":    title,
		"detail":   "",
		"instance": r.Method + " " + r.RequestURI,
	}
	result, err := json.Marshal(res)
	if err != nil {
		log.Println("Error marshalling HTTP error response:", err)
		return ""
	}
	return string(result)
}

func ParseQueryString2DefaultFilter(qs string) ([][]string, error) {
	result := [][]string{}
	if qs == "" {
		return result, nil
	}
	filter := strings.Split(qs, ",")

	if filter[0] == "equal" {
		c, err := strconv.Atoi(filter[1])
		if err != nil {
			return nil, err
		}
		v := filter[2 : 2+c]
		result = append(result, append([]string{"equal"}, v...))
	}
	log.Println(result)
	return result, nil
}
