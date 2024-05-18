package auth

import (
	"context"
	"fmt"
	"net/http"

	"github.com/allefts/muveez_server/config"
	"github.com/allefts/muveez_server/store"
	"github.com/charmbracelet/log"
	"github.com/go-chi/chi/v5"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

const SessionName = "user-session"

type AuthService struct {
}

type AuthHandler struct {
	store *store.Storage
	auth  *AuthService
}

func NewAuthService(store *sessions.CookieStore) *AuthService {
	gothic.Store = store
	cfg := config.InitConfig()
	goth.UseProviders(google.New(cfg.GoogleClientId, cfg.GoogleClientSecret, "http://localhost:8000/auth/google/callback", "email", "profile"))

	return &AuthService{}
}

func NewAuthHandler(s *store.Storage, a *AuthService) *AuthHandler {
	return &AuthHandler{store: s, auth: a}
}

func (s *AuthHandler) RegisterRoutes(r *chi.Mux) {
	r.Get("/auth/{provider}", s.handleProviderLogin)
	r.Get("/auth/{provider}/callback", s.handleCallbackLogin)
	r.Get("/logout/{provider}", s.handleLogout)
}

// @Endpoint
// User hits this when clicked on Login with Google
func (s *AuthHandler) handleProviderLogin(w http.ResponseWriter, r *http.Request) {
	provider := chi.URLParam(r, "provider")
	r = r.WithContext(context.WithValue(r.Context(), "provider", provider))

	if _, err := gothic.CompleteUserAuth(w, r); err == nil {
		log.Info("User is already authenticated!")
	} else {
		gothic.BeginAuthHandler(w, r)
	}
}

// @Endpoint
// After user follows Google login procedure
func (s *AuthHandler) handleCallbackLogin(w http.ResponseWriter, r *http.Request) {
	provider := chi.URLParam(r, "provider")
	r = r.WithContext(context.WithValue(r.Context(), "provider", provider))

	u, err := gothic.CompleteUserAuth(w, r)
	if err != nil {
		log.Fatal(err)
		return
	}

	log.Info(u.Name)

	err = s.StoreUserSession(w, r, u)
	if err != nil {
		log.Fatal(err)
		return
	}

	w.Header().Set("Location", "/")
	w.WriteHeader(http.StatusTemporaryRedirect)
}

// @Endpoint
// User hits the logout button
func (s *AuthHandler) handleLogout(w http.ResponseWriter, r *http.Request) {
	provider := chi.URLParam(r, "provider")
	r = r.WithContext(context.WithValue(r.Context(), "provider", provider))

	gothic.Logout(w, r)

	w.Header().Set("Location", "/")
	w.WriteHeader(http.StatusTemporaryRedirect)
}

// @Endpoint/Utility
// Takes the request and reponse, retrieves the session and adds values needed into the session, saves session
func (s *AuthHandler) StoreUserSession(w http.ResponseWriter, r *http.Request, user goth.User) error {
	session, _ := gothic.Store.Get(r, SessionName)

	//Set session values here
	session.Values["name"] = user.Name

	err := session.Save(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}

	return nil
}

// @Utility
// Checks if there is a session with a certain value attached to it
func (s *AuthHandler) GetSessionUser(w http.ResponseWriter, r *http.Request) (goth.User, err) {
	session, err := gothic.Store.Get(r, SessionName)
	if err != nil {
		return goth.User{}, err
	}

	u := session.Values["name"]
	if u == nil {
		return goth.User{}, fmt.Errorf("user is not authenticated! %v", u)
	}

	return u.(goth.User), nil

}

// @Middleware
// Wraps an endpoint around an authentication barrier
func RequireAuth(handlerFunc http.HandlerFunc, auth *AuthHandler) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user, err := auth.GetSessionUser(w, r)
		if err != nil {
			log.Fatal(err)
			http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
			return
		}

		log.Info("User is authenticated! user: %v!", user.Name)
	})
}
