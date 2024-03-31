package routes

import (
	"github.com/allefts/muveez_server/internals/handlers"
	"github.com/labstack/echo/v4"
)

func SetupRoutes(e *echo.Echo) {
	e.POST("/login", handlers.LoginHandler)
	e.POST("/register", handlers.RegisterHandle)
}
