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
	r.Get("/user/lists", auth.RequireAuth(s.handleGetUserListsWithMovies, authHandler))
	r.Get("/lists", auth.RequireAuth(s.handleGetUserListsWithMovies, authHandler))

}

// Just Lists
func (s *ListsService) handleGetUserLists(w http.ResponseWriter, r *http.Request) {
	// session, _ := gothic.Store.Get(r, auth.SessionName)
	// email := session.Values["email"].(string)

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

	// for _, list := range lists {
	// 	fmt.Println("List Name: ", list.List.ListName, "\nList ID: ", list.List.ListID)
	// 	fmt.Println("# of Movies: ", len(list.Movies))
	// 	for _, movie := range list.Movies {
	// 		fmt.Println("Movie Title ", movie.Title, "\nMovie ID: ", movie.MovieId, "\nTMDB ID: ", movie.TmdbId, "\nOverview: ", movie.Overview, "\nURL: ", movie.ImageURL, "\nRelease Date: ", movie.ReleaseDate)
	// 	}
	// }

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
