package handlers

import (
	"net/http"

	"github.com/allefts/muveez_server/store"
	"github.com/go-chi/chi/v5"
)

type MoviesService struct {
	store *store.Storage
}

func NewMovieService(store *store.Storage) *MoviesService {
	return &MoviesService{
		store: store,
	}
}

func (s *MoviesService) RegisterRoutes(r *chi.Mux) {

}

func (s *MoviesService) findMovie(w http.ResponseWriter, r *http.Request) {

}
