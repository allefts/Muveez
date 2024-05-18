package handlers

import (
	"github.com/allefts/muveez_server/store"
	"github.com/go-chi/chi/v5"
)

type MoviesService struct {
	store store.Store
}

func (s *MoviesService) RegisterRoutes(r *chi.Mux) {

}

func (s *MoviesService) findMovie(r *chi.Mux) {

}
