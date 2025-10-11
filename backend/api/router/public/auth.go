package public

import (
	"backend/api/controller"

	"github.com/gofiber/fiber/v2"
)

func NewAuthRouter(router fiber.Router, controller *controller.AuthController) {
	authGroup := router.Group("/auth")
	authGroup.Get("/google/login", controller.GoogleLogin)
	authGroup.Get("/google/callback", controller.GoogleCallback)
	authGroup.Post("/refresh", controller.RefreshToken)
}
