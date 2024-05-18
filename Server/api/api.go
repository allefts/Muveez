package api

import (
	"net/http"

	"github.com/allefts/muveez_server/auth"
	"github.com/allefts/muveez_server/config"
	"github.com/allefts/muveez_server/store"
	"github.com/charmbracelet/log"
	"github.com/go-chi/chi/v5"
)

type APIServer struct {
	port  string
	store *store.Storage
	cfg   *config.Config
}

func NewAPIServer(store *store.Storage, cfg *config.Config) *APIServer {
	return &APIServer{
		port:  ":8000",
		store: store,
		cfg:   cfg,
	}
}

func (s *APIServer) Serve() {
	router := chi.NewRouter()

	//AUTH SETUP
	sessionStore := auth.NewCookieStore(auth.SessionOptions{CookieKey: s.cfg.SupaSecret, MaxAge: 60 * 60 * 24 * 2, HttpOnly: true, Secure: false})
	authService := auth.NewAuthService(sessionStore)
	authHandler := auth.NewAuthHandler(s.store, authService)
	authHandler.RegisterRoutes(router)

	log.Fatal(http.ListenAndServe(s.port, router))

	log.Info("Starting API Server on port " + s.port)
}
