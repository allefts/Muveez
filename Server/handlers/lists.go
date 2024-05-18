package handlers

import (
	"github.com/allefts/muveez_server/store"
	"github.com/go-chi/chi/v5"
)

type ListsService struct {
	store store.Store
}

func (s *ListsService) RegisterRoutes(r *chi.Mux) {

}

func (s *ListsService) handleCreateList() {

}

func (s *ListsService) handleEditList() {

}

func (s *ListsService) handleDeleteList() {

}
