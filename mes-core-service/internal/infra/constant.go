package infra

import (
	"log"
	"strconv"
	"strings"
)

var SCHEMA_NAME string = "mes"

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
