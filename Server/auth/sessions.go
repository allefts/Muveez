package auth

import "github.com/gorilla/sessions"

type SessionOptions struct {
	CookieKey string
	MaxAge    int
	HttpOnly  bool
	Secure    bool
}

func NewCookieStore(opts SessionOptions) *sessions.CookieStore {
	store := sessions.NewCookieStore([]byte(opts.CookieKey))

	store.MaxAge(opts.MaxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = opts.HttpOnly
	store.Options.Secure = opts.Secure
	return store
}
