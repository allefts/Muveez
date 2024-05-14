package handlers

import (
	"fmt"
	"net/http"

	"github.com/allefts/muveez_server/internals/models"
	"github.com/allefts/muveez_server/internals/services"
	"github.com/labstack/echo/v4"
)

type AuthHandler struct {
	AuthService *services.UserServices
}

func NewAuthHandler(userService *services.UserServices) *AuthHandler {
	return &AuthHandler{AuthService: userService}
}

func (a *AuthHandler) LoginHandler(c echo.Context) error {
	username := c.Request().FormValue("username")
	// password := c.Request().FormValue("password")

	user, err := a.AuthService.GetUserByUsername(username)

	fmt.Println("User: ", user)
	fmt.Println("Error: ", err)

	return c.JSON(http.StatusOK, "Login Endpoint")
}

func (a *AuthHandler) RegisterHandler(c echo.Context) error {
	u := &models.SignInCrendentials{}
	if err := c.Bind(u); err != nil {
		c.JSON(http.StatusBadRequest, "Error creating user")
	}
	// db := db.GetDB()

	return c.JSON(http.StatusOK, "Register Endpoint")
}
