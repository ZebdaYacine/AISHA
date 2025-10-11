package private

import (
	"backend/api/controller"

	"github.com/gofiber/fiber/v2"
)

func NewAuthRouter(router fiber.Router, controller *controller.AuthController) {
	router.Post("/logout", controller.Logout)
}
