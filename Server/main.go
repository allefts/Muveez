package main

import (
	"log"
	"net/http"
	"os"

	"github.com/allefts/muveez_server/routes"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	"github.com/michaeljs1990/sqlitestore"
)

var Store *sqlitestore.SqliteStore

func init() {
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}
}

func main() {
	//Store Creation for Sessions
	store, err := sqlitestore.NewSqliteStore("./db/Muveez.db", "sessions", "/", 3600, []byte(os.Getenv("SUPA_SECRET")))
	if err != nil {
		log.Fatal(err)
	}

	//App
	app := &Server{
		server: chi.NewRouter(),
		store:  store,
		db:     "TODO",
	}

	//Middleware
	app.server.Use(middleware.Logger)
	app.server.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"*", "http://localhost:5173", "http://localhost:8000"}, AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}, AllowedHeaders: []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
	}))

	//Routes and Handlers
	routes.SetupRoutes(app.server)

	//Starting Server
	http.ListenAndServe(os.Getenv("PORT"), app.server)
}

type Server struct {
	server *chi.Mux
	store  *sqlitestore.SqliteStore
	db     string
}
