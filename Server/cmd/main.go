package main

import (
	"fmt"

	"github.com/allefts/muveez_server/internals/db"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())

	//Connect DB
	_, err := db.ConnectDB("./Muveez.db")
	if err != nil {
		fmt.Printf("Error: %s", err)
	}

	e.GET("/", func(c echo.Context) error {
		return c.String(200, "Hello World")
	})

	e.Logger.Fatal(e.Start(":8000"))
}
