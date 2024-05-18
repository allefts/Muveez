package handlers

import (
	"github.com/allefts/muveez_server/store"
	"github.com/go-chi/chi/v5"
)

type UsersService struct {
	store store.Store
}

func (s *UsersService) RegisterRoutes(r *chi.Mux) {

}

func (s *UsersService) handleCreateUser() {

}

func (s *UsersService) handleEditUser() {

}

func (s *UsersService) handleDeleteUser() {

}
