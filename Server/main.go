package main

import (
	"github.com/allefts/muveez_server/api"
	"github.com/allefts/muveez_server/auth"
	"github.com/allefts/muveez_server/config"
	"github.com/allefts/muveez_server/db"
	"github.com/allefts/muveez_server/store"
	"github.com/charmbracelet/log"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	log.Info("Loaded .ENV")
}

func main() {
	//CONFIG SETUP
	cfg := config.InitConfig()

	//DB SETUP
	sqlStorage := db.NewMySQLStorage(cfg)
	db, err := sqlStorage.Init()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	//STORE SETUP
	store := store.NewStore(db)

	//SESSION SETUP
	sessionStore := auth.NewCookieStore(
		auth.SessionOptions{
			CookieKey: cfg.SupaSecret,
			MaxAge:    60 * 60 * 24 * 2,
			HttpOnly:  true,
			Secure:    true,
		})
	authService := auth.NewAuthService(sessionStore)

	//SERVER SETUP
	server := api.NewAPIServer(store, authService, cfg)
	server.Serve()
}
