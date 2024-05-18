package auth

import (
	"context"
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
	r.Get("/auth/logout/provider", nil)
	r.Get("/login", s.handleLogin)
}

func (s *AuthHandler) handleLogin(w http.ResponseWriter, r *http.Request) {

}

func (s *AuthHandler) handleProviderLogin(w http.ResponseWriter, r *http.Request) {
	provider := chi.URLParam(r, "provider")
	r = r.WithContext(context.WithValue(r.Context(), "provider", provider))

	if _, err := gothic.CompleteUserAuth(w, r); err == nil {
		log.Info("User is already authenticated!")
	} else {
		gothic.BeginAuthHandler(w, r)
	}
}

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

func (s *AuthHandler) StoreUserSession(w http.ResponseWriter, r *http.Request, user goth.User) error {
	provider := chi.URLParam(r, "provider")
	r = r.WithContext(context.WithValue(r.Context(), "provider", provider))

	session, _ := gothic.Store.Get(r, SessionName)

	err := session.Save(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}

	return nil
}
