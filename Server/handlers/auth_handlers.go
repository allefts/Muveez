package handlers

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/allefts/muveez_server/utils"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var GoogleOAuthConfig = &oauth2.Config{
	RedirectURL: "http://localhost:8000/auth/google/callback",
	Scopes:      []string{"email", "profile"},
	Endpoint:    google.Endpoint,
}

func LoginWithGoogle(w http.ResponseWriter, r *http.Request) {
	GoogleOAuthConfig.ClientID = os.Getenv("GOOGLE_CLIENT_ID")
	GoogleOAuthConfig.ClientSecret = os.Getenv("GOOGLE_CLIENT_SECRET")
	http.Redirect(w, r, GoogleOAuthConfig.AuthCodeURL(utils.GenerateState(), oauth2.AccessTypeOffline), http.StatusTemporaryRedirect)
}

func GoogleLoginCallback(w http.ResponseWriter, r *http.Request) {
	if len(r.FormValue("state")) > 15 {
		//State
		_, err := GoogleOAuthConfig.Exchange(r.Context(), r.FormValue("code"), oauth2.AccessTypeOffline)
		if err != nil {
			log.Fatal(err)
		}

		// client := GoogleOAuthConfig.Client(r.Context(), tok)
	} else {
		//No State
		http.Redirect(w, r, "http://localhost:5173", http.StatusPermanentRedirect)
	}

	// http.Redirect(w, r, "http://localhost:5173", http.StatusPermanentRedirect)
}

func Logout(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Logout")
}
