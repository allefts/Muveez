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
	port        string
	store       *store.Storage
	authService *auth.AuthService
	cfg         *config.Config
}

func NewAPIServer(store *store.Storage, authService *auth.AuthService, cfg *config.Config) *APIServer {
	return &APIServer{
		port:        ":8000",
		store:       store,
		authService: authService,
		cfg:         cfg,
	}
}

func (s *APIServer) Serve() {
	router := chi.NewRouter()

	//AUTH SETUP
	authHandler := auth.NewAuthHandler(s.store, s.authService)
	authHandler.RegisterRoutes(router)

	log.Fatal(http.ListenAndServe(s.port, router))

	log.Info("Starting API Server on port " + s.port)
}
