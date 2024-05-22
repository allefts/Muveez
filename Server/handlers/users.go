package handlers

import (
	"net/http"

	"github.com/allefts/muveez_server/auth"
	"github.com/allefts/muveez_server/store"
	"github.com/allefts/muveez_server/types"
	"github.com/allefts/muveez_server/utils"
	"github.com/charmbracelet/log"
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

func (s *UsersService) RegisterRoutes(r *chi.Mux, authHandler *auth.AuthHandler) {
	r.Get("/user", auth.RequireAuth(s.getUserHandler, authHandler))
}

func (s *UsersService) getUserHandler(w http.ResponseWriter, r *http.Request) {
	session, _ := gothic.Store.Get(r, auth.SessionName)
	user, err := s.store.GetUser(session.Values["email"].(string))

	if err != nil {
		log.Info(err)
		utils.JSONResponse(w, types.Error{Message: "error getting user"}, http.StatusForbidden)
	}

	utils.JSONResponse(w, user, 200)
}

func (s *UsersService) handleEditUser() {

}

func (s *UsersService) handleDeleteUser() {

}
