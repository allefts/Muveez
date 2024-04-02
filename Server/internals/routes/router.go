package routes

import (
	"github.com/allefts/muveez_server/internals/handlers"
	"github.com/labstack/echo/v4"
)

func SetupRoutes(e *echo.Echo, ah *handlers.AuthHandler) {
	e.POST("/login", ah.LoginHandler)
	e.POST("/register", ah.RegisterHandler)
}
