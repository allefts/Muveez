package main

import (
	"github.com/allefts/muveez_server/api"
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
	sqlStorage := db.NewSQLiteStorage(cfg)
	db, err := sqlStorage.Init()
	if err != nil {
		log.Fatal(err)
	}

	//STORE SETUP
	store := store.NewStore(db)

	//SERVER SETUP
	server := api.NewAPIServer(store, &cfg)
	server.Serve()
}
