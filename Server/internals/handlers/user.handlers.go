package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func LoginHandler(c echo.Context) error {
	// username := c.Request().FormValue("username")
	// password := c.Request().FormValue("password")

	return c.JSON(http.StatusOK, "Login Endpoint")
}

func RegisterHandle(c echo.Context) error {
	// db := db.GetDB()

	return c.JSON(http.StatusOK, "Register Endpoint")
}
