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

func parseQueryString(filter []string) ([]string, error) {
	if filter[0] == "equal" {
		c, err := strconv.Atoi(filter[1])
		if err != nil {
			return nil, err
		}
		v := filter[2 : 2+c]
		return append([]string{"equal"}, v...), nil
	} else if filter[0] == "not-equal" {
		c, err := strconv.Atoi(filter[1])
		if err != nil {
			return nil, err
		}
		v := filter[2 : 2+c]
		return append([]string{"not-equal"}, v...), nil
	} else if filter[0] == "in" {
		c, err := strconv.Atoi(filter[1])
		if err != nil {
			return nil, err
		}
		v := filter[2 : 2+c]
		return append([]string{"in"}, v...), nil
	} else if filter[0] == "not-in" {
		c, err := strconv.Atoi(filter[1])
		if err != nil {
			return nil, err
		}
		v := filter[2 : 2+c]
		return append([]string{"not-in"}, v...), nil
	}
	return nil, nil
}

func ParseQueryString2DefaultFilter(qs string) ([][]string, error) {
	result := [][]string{}
	if qs == "" {
		return result, nil
	}
	filter := strings.Split(qs, ",")

	for len(filter) > 0 {
		qty, err := strconv.Atoi(filter[1])
		if err != nil {
			return nil, err
		}
		p := filter[0 : 2+qty]
		parameter, err := parseQueryString(p)
		if err != nil {
			return nil, err
		}
		result = append(result, parameter)
		filter = filter[2+qty:]
	}
	log.Println(result)
	return result, nil
}
