package handlers

import (
	"net/http"
	"strconv"

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
	r.Get("/user/lists", auth.RequireAuth(s.handleGetUserListsWithMovies, authHandler))
	r.Get("/list/{id}", auth.RequireAuth(s.handleGetUserListWithMovies, authHandler))
	r.Post("/list", auth.RequireAuth(s.handleCreateList, authHandler))
}

func (s *ListsService) handleCreateList(w http.ResponseWriter, r *http.Request) {
	//Parses form values
	listName := r.FormValue("list_name")
	userId, err := strconv.Atoi(r.FormValue("user_id"))

	if err != nil {
		log.Info(err)
	}

	//Checks if the user already has a list with that name
	listNameAlreadyUsed, err := s.store.CheckForList(userId, listName)
	if listNameAlreadyUsed {
		utils.JSONResponse(w, "List already exists", http.StatusConflict)
		return
	}

	if err != nil {
		log.Info(err)
		utils.JSONResponse(w, "Error creating new list", http.StatusInternalServerError)
		return
	}

	//Creates list if no list found by that user
	err = s.store.CreateList(userId, listName)

	if err != nil {
		log.Info(err)
		utils.JSONResponse(w, "Error creating new list", http.StatusInternalServerError)
		return
	}

	utils.JSONResponse(w, "Successfully created list", http.StatusCreated)
}

// List with movies by id
func (s *ListsService) handleGetUserListWithMovies(w http.ResponseWriter, r *http.Request) {
	listId := chi.URLParam(r, "id")
	listWithMovies, err := s.store.GetUserListMovie(listId)

	if err != nil {
		log.Info(err)
	}

	utils.JSONResponse(w, listWithMovies, http.StatusOK)
}

// Lists With Movies
func (s *ListsService) handleGetUserListsWithMovies(w http.ResponseWriter, r *http.Request) {
	session, _ := gothic.Store.Get(r, auth.SessionName)
	email := session.Values["email"].(string)

	userID, err := s.store.GetUserIDFromEmail(email)
	if err != nil {
		log.Info(err)
	}

	lists, err := s.store.GetUserListsWithMovies(userID)
	if err != nil {
		log.Info(err)
	}

	if len(lists) == 0 {
		log.Info("User has no lists")
	}

	if err != nil {
		log.Info(err)
		utils.JSONResponse(w, types.Error{Message: "error getting user lists"}, http.StatusForbidden)
	}

	utils.JSONResponse(w, lists, http.StatusOK)
}

func (s *ListsService) handleEditList() {

}

func (s *ListsService) handleDeleteList() {

}
