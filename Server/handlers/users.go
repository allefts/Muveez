package handlers

import (
	"net/http"

	"github.com/allefts/muveez_server/auth"
	"github.com/allefts/muveez_server/store"
	"github.com/allefts/muveez_server/utils"
	"github.com/go-chi/chi/v5"
	"github.com/markbates/goth/gothic"
)

type UsersService struct {
	store *store.Storage
}

func NewUserService(store *store.Storage) *UsersService {
	return &UsersService{
		store: store,
	}
}

func (s *UsersService) RegisterRoutes(r *chi.Mux) {
	r.Get("/user", s.GetUser)
}

func (s *UsersService) GetUser(w http.ResponseWriter, r *http.Request) {
	session, _ := gothic.Store.Get(r, auth.SessionName)
	name := session.Values["name"]

	utils.JSONResponse(w, name, 200)
}

func (s *UsersService) handleCreateUser() {

}

func (s *UsersService) handleEditUser() {

}

func (s *UsersService) handleDeleteUser() {

}
