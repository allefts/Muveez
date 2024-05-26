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

type ListsService struct {
	store *store.Storage
}

func NewListsService(store *store.Storage) *ListsService {
	return &ListsService{
		store: store,
	}
}

func (s *ListsService) RegisterRoutes(r *chi.Mux, authHandler *auth.AuthHandler) {
	r.Get("/user/lists", auth.RequireAuth(s.handleGetUserLists, authHandler))

}

func (s *ListsService) handleGetUserLists(w http.ResponseWriter, r *http.Request) {
	session, _ := gothic.Store.Get(r, auth.SessionName)
	userId := session.Values["userId"].(int)

	lists, err := s.store.GetUserLists(userId)
	if err != nil {
		log.Info(err)
		utils.JSONResponse(w, types.Error{Message: "error getting user lists"}, http.StatusForbidden)
	}

	utils.JSONResponse(w, lists, http.StatusOK)
}

func (s *ListsService) handleCreateList() {

}

func (s *ListsService) handleEditList() {

}

func (s *ListsService) handleDeleteList() {

}
