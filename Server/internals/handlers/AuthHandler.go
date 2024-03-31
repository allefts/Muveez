package handlers

import (
	"fmt"
	"net/http"

	"github.com/allefts/muveez_server/internals/db"
	"github.com/labstack/echo/v4"
)

func LoginHandler(c echo.Context) error {
	username := c.Request().FormValue("username")
	// password := c.Request().FormValue("password")
	user, err := db.GetUserById(username)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Found User: ", user.Username, user.Password, user.Created_On)

	return c.JSON(http.StatusOK, "Login Endpoint")
}

func RegisterHandle(c echo.Context) error {
	// db := db.GetDB()

	return c.JSON(http.StatusOK, "Register Endpoint")
}
