package middleware

import (
	"html"
	"net/http"
)

func XSSProtection(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		query := r.URL.Query()
		for key, values := range query {
			for i, value := range values {
				query[key][i] = html.EscapeString(value)
			}
		}
		r.URL.RawQuery = query.Encode()

		if err := r.ParseForm(); err == nil {
			for key, values := range r.PostForm {
				for i, value := range values {
					r.PostForm[key][i] = html.EscapeString(value)
				}
			}
		}

		next.ServeHTTP(w, r)
	})
}
