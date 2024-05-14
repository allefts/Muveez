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
		return c.JSON(http.StatusBadRequest, "could not parse data")
	}

	alreadyUser, _ := a.AuthService.GetUserByUsername(u.Username)

	if alreadyUser.Username != "" && alreadyUser.Email != "" {
		// User already exists
		return c.JSON(http.StatusInternalServerError, "User already exists")
	} else {
		//Create User
		a.AuthService.User.Email = u.Email
		a.AuthService.User.Username = u.Username
		a.AuthService.User.Password = u.Password

		err := a.AuthService.CreateUser()
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}
	}

	return c.JSON(http.StatusOK, "Register Endpoint")
}
