package api

import (
	"net/http"

	"github.com/allefts/muveez_server/auth"
	"github.com/allefts/muveez_server/config"
	"github.com/allefts/muveez_server/handlers"
	"github.com/allefts/muveez_server/store"
	"github.com/charmbracelet/log"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
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
	// currUser := &goth.User{}

	//MIDDLEWARE
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	//AUTH SETUP
	authHandler := auth.NewAuthHandler(s.store, s.authService)
	authHandler.RegisterRoutes(router)

	//USER SETUP
	userService := handlers.NewUserService(s.store)
	userService.RegisterRoutes(router, authHandler)

	log.Info("Starting API Server on port " + s.port)
	log.Fatal(http.ListenAndServe(s.port, router))

}
