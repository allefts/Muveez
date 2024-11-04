package auth

import (
	"context"
	"fmt"
	"net/http"

	"github.com/allefts/muveez_server/config"
	"github.com/allefts/muveez_server/store"
	"github.com/allefts/muveez_server/types"
	"github.com/allefts/muveez_server/utils"
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
	// goth.UseProviders(google.New(cfg.GoogleClientId, cfg.GoogleClientSecret, "http://localhost:8000/auth/google/callback", "email", "profile"))
	goth.UseProviders(google.New(cfg.GoogleClientId, cfg.GoogleClientSecret, "https://api.muveez.pro/auth/google/callback", "email", "profile"))

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

//ENDPOINTS FOR AUTH

// User hits this when clicked on Login with Google
func (s *AuthHandler) handleProviderLogin(w http.ResponseWriter, r *http.Request) {
	provider := chi.URLParam(r, "provider")
	r = r.WithContext(context.WithValue(r.Context(), "provider", provider))

	if u, err := gothic.CompleteUserAuth(w, r); err == nil {
		log.Info("User is already authenticated! %v", u)
		return
	} else {
		log.Info("Logging User In")
		gothic.BeginAuthHandler(w, r)
	}
}

// After user follows Google login procedure
func (s *AuthHandler) handleCallbackLogin(w http.ResponseWriter, r *http.Request) {
	provider := chi.URLParam(r, "provider")
	r = r.WithContext(context.WithValue(r.Context(), "provider", provider))

	u, err := gothic.CompleteUserAuth(w, r)
	if err != nil {
		log.Fatal(err)
		return
	}

	err = s.StoreUserSession(w, r, u)
	if err != nil {
		log.Fatal(err)
		return
	}

	//Redirect
	// w.Header().Set("Location", "http://localhost:4173")
	w.Header().Set("Location", "https://muveez.pro/lists")
	w.WriteHeader(http.StatusTemporaryRedirect)
}

// User hits the logout button
func (s *AuthHandler) handleLogout(w http.ResponseWriter, r *http.Request) {
	provider := chi.URLParam(r, "provider")
	r = r.WithContext(context.WithValue(r.Context(), "provider", provider))

	gothic.Logout(w, r)

	//Redirect
	// w.Header().Set("Location", "http://localhost:4173")
	w.Header().Set("Location", "https://muveez.pro/lists")
	w.WriteHeader(http.StatusTemporaryRedirect)
}

// Takes the request and reponse, retrieves the session and adds values needed into the session, saves session
func (s *AuthHandler) StoreUserSession(w http.ResponseWriter, r *http.Request, user goth.User) error {
	session, err := gothic.Store.Get(r, SessionName)

	if err != nil {
		return err
	}

	//CREATE USER IF NOT ONE
	if !s.store.IsThereUser(user.Email) {
		log.Info("Creating New User")
		s.store.CreateUser(user)
	}

	//SESSION VALUES SET HERE
	session.Values["name"] = user.Name
	session.Values["email"] = user.Email
	session.Values["avatarURL"] = user.AvatarURL
	session.Values["googleID"] = user.UserID

	err = session.Save(r, w)
	if err != nil {
		// http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}

	return nil
}

//MIDDLEWARE FOR AUTH

// Wraps an endpoint around an authentication barrier
func RequireAuth(next http.HandlerFunc, auth *AuthHandler) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, err := auth.GetSessionUser(r)
		if err != nil {
			log.Info(err)
			utils.JSONResponse(w, types.Error{Message: "User Unauthorized"}, http.StatusForbidden)
			return
		}
		log.Info("Hit Auth Middleware")
		next.ServeHTTP(w, r)
	})
}

//UTILITY FOR AUTH

// Checks if there is a session with a certain value attached to it
func (s *AuthHandler) GetSessionUser(r *http.Request) (types.UserSession, error) {
	session, err := gothic.Store.Get(r, SessionName)
	if err != nil {
		return types.UserSession{}, err
	}

	googleID := session.Values["googleID"]
	name := session.Values["name"]
	if googleID == nil || name == nil || googleID == "" || name == "" {
		return types.UserSession{}, fmt.Errorf("user is not authenticated! %v", googleID)
	}

	u := types.UserSession{Name: session.Values["name"].(string), Email: session.Values["email"].(string), GoogleID: session.Values["googleID"].(string)}
	return u, nil
}
