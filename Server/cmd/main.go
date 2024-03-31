package main

import (
	"fmt"

	"github.com/allefts/muveez_server/internals/db"
	"github.com/allefts/muveez_server/internals/routes"
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
	err := db.ConnectDB("../internals/db/Muveez.db")
	if err != nil {
		fmt.Printf("Error: %s", err)
	}

	e.GET("/", func(c echo.Context) error {
		fmt.Println("/ Endpoint")
		return c.JSON(200, "Hello World")
	})

	routes.SetupRoutes(e)

	e.Logger.Fatal(e.Start(":8000"))
}
