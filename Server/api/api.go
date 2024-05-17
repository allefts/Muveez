package api

import (
	"net/http"

	"github.com/allefts/muveez_server/store"
	"github.com/charmbracelet/log"
	"github.com/go-chi/chi/v5"
)

type APIServer struct {
	port  string
	store store.Store
}

func NewAPIServer(store store.Store) *APIServer {
	return &APIServer{
		port:  ":8000",
		store: store,
	}
}

func (s *APIServer) Serve() {
	router := chi.NewRouter()

	log.Info("Starting API Server on port " + s.port)

	log.Fatal(http.ListenAndServe(s.port, router))
}
