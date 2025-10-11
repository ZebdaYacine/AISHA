package private

import (
	"backend/api/controller"

	"github.com/gofiber/fiber/v2"
)

func NewProfileRouter(router fiber.Router, controller *controller.AuthController) {
	router.Get("/me", controller.Me)
}
