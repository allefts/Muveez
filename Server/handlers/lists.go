package handlers

import (
	"encoding/json"
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
	r.Delete("/list", auth.RequireAuth(s.handleDeleteList, authHandler))
	r.Post("/list/{id}", auth.RequireAuth(s.handleAddMovieToList, authHandler))
}

func (s *ListsService) handleAddMovieToList(w http.ResponseWriter, r *http.Request) {
	listId := chi.URLParam(r, "id")

	var movieToAdd types.Movie
	err := json.NewDecoder(r.Body).Decode(&movieToAdd)
	if err != nil {
		log.Info(err)
		return
	}

	//Gets list with movies
	listWMovies, err := s.store.GetUserListMovie(listId)
	if err != nil {
		log.Info(err)
		return
	}

	//Check if movie already in list
	movieAlreadyInList := false
	for _, movie := range listWMovies.Movies {
		if movie.TmdbId == movieToAdd.TmdbId {
			movieAlreadyInList = true
			break
		}
	}

	if movieAlreadyInList {
		utils.JSONResponse(w, "Movie already in list", http.StatusFound)
		return
	}

	//Add movie to list
	err = s.store.AddMovieToList(listId, movieToAdd)
	if err != nil {
		log.Info(err)
		return
	}

	utils.JSONResponse(w, "Movie added", http.StatusOK)
}

func (s *ListsService) handleDeleteList(w http.ResponseWriter, r *http.Request) {
	var listMovie types.ListMovieIDS
	err := json.NewDecoder(r.Body).Decode(&listMovie)

	if err != nil {
		log.Info(err)
		return
	}

	err = s.store.DeleteMovieFromList(listMovie.ListId, listMovie.MovieId)
	if err != nil {
		log.Info(err)
		return
	}
	utils.JSONResponse(w, "Deleted movie from list", http.StatusOK)
}

func (s *ListsService) handleCreateList(w http.ResponseWriter, r *http.Request) {
	//Parses form values
	listName := r.FormValue("list_name")
	userId, err := strconv.Atoi(r.FormValue("user_id"))

	if err != nil {
		log.Info(err)
		return
	}

	//Check if user already has 10 lists
	userLists, err := s.store.GetUserLists(userId)
	if err != nil {
		log.Info(err)
		return
	}

	if len(userLists) == 10 {
		utils.JSONResponse(w, "Lists amount reached", http.StatusConflict)
		return
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
		return
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
		return
	}

	lists, err := s.store.GetUserListsWithMovies(userID)
	if err != nil {
		log.Info(err)
		utils.JSONResponse(w, types.Error{Message: "error getting user lists"}, http.StatusForbidden)
		return
	}

	if len(lists) == 0 {
		log.Info("User has no lists")
		utils.JSONResponse(w, []types.ListsWithMovies{}, http.StatusOK)
		return
	}

	utils.JSONResponse(w, lists, http.StatusOK)
}
