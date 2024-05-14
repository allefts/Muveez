package main

import (
	"fmt"

	"github.com/allefts/muveez_server/internals/db"
	"github.com/allefts/muveez_server/internals/handlers"
	"github.com/allefts/muveez_server/internals/models"
	"github.com/allefts/muveez_server/internals/routes"
	"github.com/allefts/muveez_server/internals/services"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	// e.Use(middleware.Logger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	//Initializing DB
	db, err := db.ConnectDB("../internals/db/Muveez.db")
	if err != nil {
		fmt.Printf("Error: %s", err)
	}

	userService := services.NewUserService(models.User{}, db)
	authHandler := handlers.NewAuthHandler(userService)

	routes.SetupRoutes(e, authHandler)
	e.Logger.Fatal(e.Start(":8000"))
}
