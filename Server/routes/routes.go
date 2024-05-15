package routes

import (
	"github.com/allefts/muveez_server/handlers"
	"github.com/go-chi/chi/v5"
)

func SetupRoutes(r *chi.Mux) {
	r.Get("/auth/google/login", handlers.LoginWithGoogle)
	r.Get("/auth/google/callback", handlers.GoogleLoginCallback)
}
