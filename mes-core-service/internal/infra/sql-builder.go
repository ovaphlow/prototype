package infra

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"
	"strings"
)

func GetColumns(db *sql.DB, s, t *string) ([]string, error) {
	query := `
	select column_name
	from information_schema.columns
	where table_schema = $1 and table_name = $2
	order by ordinal_position;
	`
	rows, err := db.Query(query, s, t)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	columns := []string{}
	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			return nil, err
		}
		columns = append(columns, name)
	}
	return columns, nil
}

type SQLQueryBuilder struct {
	postgres   *sql.DB
	schema     string
	table      string
	query      string
	parameters []string
}

func NewSQLQueryBuilder(postgres *sql.DB, schema, table *string) *SQLQueryBuilder {
	return &SQLQueryBuilder{
		postgres: postgres,
		schema:   *schema,
		table:    *table,
	}
}

func (qb *SQLQueryBuilder) Select(columns []string) (*SQLQueryBuilder, error) {
	qb.query = "select "
	var err error
	if len(columns) == 0 {
		columns, err = GetColumns(qb.postgres, &qb.schema, &qb.table)
		if err != nil {
			return nil, err
		}
	}
	qb.query += strings.Join(columns, ", ")
	if qb.schema != "" {
		qb.query += " from " + qb.schema + "." + qb.table
	} else {
		qb.query += " from " + qb.table
	}
	return qb, nil
}

func (qb *SQLQueryBuilder) Where(conditions [][]string) (*SQLQueryBuilder, error) {
	var c []string
	for _, condition := range conditions {
		if condition[0] == "equal" {
			if len(condition) < 3 {
				continue
			}
			c = append(c, condition[1]+" = $"+strconv.Itoa(len(qb.parameters)+1))
			qb.parameters = append(qb.parameters, condition[2])
		}
		if condition[0] == "in" {
			if len(condition) <= 2 {
				continue
			}
			values := condition[2:]
			placeholders := make([]string, len(values))
			for i := range values {
				placeholders[i] = "$" + strconv.Itoa(i+1)
			}
			c = append(c, condition[1]+" in ("+strings.Join(placeholders, ", ")+")")
			qb.parameters = append(qb.parameters, values...)
		}
	}
	if len(c) > 0 {
		qb.query += " where " + strings.Join(c, " and ")
	}
	return qb, nil
}

func (qb *SQLQueryBuilder) Append(last string) *SQLQueryBuilder {
	qb.query += " " + last
	return qb
}

func (qb *SQLQueryBuilder) Build() (string, []string) {
	return qb.query, qb.parameters
}

func (qb *SQLQueryBuilder) Query() (*sql.Rows, error) {
	p := make([]interface{}, len(qb.parameters))
	for i, v := range qb.parameters {
		p[i] = v
	}
	return qb.postgres.Query(qb.query, p...)
}

func SQLRows2Map(rows *sql.Rows) ([]map[string]interface{}, error) {
	columns, err := rows.Columns()
	if err != nil {
		return nil, err
	}
	var result []map[string]interface{}
	values := make([]interface{}, len(columns))
	valuePtrs := make([]interface{}, len(columns))
	for rows.Next() {
		for i := range columns {
			valuePtrs[i] = &values[i]
		}
		if err := rows.Scan(valuePtrs...); err != nil {
			return nil, err
		}
		m := make(map[string]interface{})
		for i, col := range columns {
			val := values[i]
			if val == nil {
				m[col] = nil
			} else {
				switch v := val.(type) {
				case []byte:
					m[col] = string(v)
				default:
					m[col] = v
				}
			}
		}
		result = append(result, m)
	}
	return result, nil
}

type SQLSaveBuilder struct {
	db     *sql.DB
	schema *string
	table  *string
}

func NewSQLSaveBuilder(db *sql.DB, schema, table *string) *SQLSaveBuilder {
	return &SQLSaveBuilder{
		db:     db,
		schema: schema,
		table:  table,
	}
}

func (sb *SQLSaveBuilder) Save(row map[string]interface{}) error {
	columns, err := GetColumns(sb.db, sb.schema, sb.table)
	if err != nil {
		return err
	}
	var columnNames []string
	var values []string
	for _, column := range columns {
		if _, ok := row[column]; ok {
			columnNames = append(columnNames, column)
			values = append(values, fmt.Sprintf("%v", row[column]))
		}
	}
	query := fmt.Sprintf(
		"insert into %s.%s (%s) values (",
		*sb.schema,
		*sb.table,
		strings.Join(columnNames, ", "),
	)
	if len(values) == 0 {
		return nil
	}
	for i := 0; i < len(values); i++ {
		query += "$" + strconv.Itoa(i+1)
		if i < len(values)-1 {
			query += ", "
		}
	}
	query += ")"
	p := make([]interface{}, len(values))
	for i, v := range values {
		p[i] = v
	}
	_, err = sb.db.Exec(query, p...)
	return err
}

type SQLUpdateBuilder struct {
	db *sql.DB
}

func NewSQLUpdateBuilder(db *sql.DB) *SQLUpdateBuilder {
	builder := SQLUpdateBuilder{}
	builder.db = db
	return &builder
}

func (ub *SQLUpdateBuilder) Update(s, t *string, row map[string]interface{}, where string) error {
	columns, err := GetColumns(ub.db, s, t)
	if err != nil {
		return err
	}
	var columnNames []string
	var values []string
	for _, column := range columns {
		if _, ok := row[column]; ok {
			columnNames = append(columnNames, column)
			values = append(values, fmt.Sprintf("%v", row[column]))
		}
	}
	query := fmt.Sprintf(
		"update %s.%s set ",
		*s,
		*t,
	)
	if len(values) == 0 {
		return nil
	}
	for i := 0; i < len(values); i++ {
		query += columnNames[i] + " = $" + strconv.Itoa(i+1)
		if i < len(values)-1 {
			query += ", "
		}
	}
	query += " " + where
	log.Println(query)
	log.Println(values)
	p := make([]interface{}, len(values))
	for i, v := range values {
		p[i] = v
	}
	_, err = ub.db.Exec(query, p...)
	return err
}
