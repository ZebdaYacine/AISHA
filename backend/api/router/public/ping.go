package public

import (
	"backend/api/controller"

	"github.com/gofiber/fiber/v2"
)

func NewPingRouter(router fiber.Router, controller *controller.PingController) {
	router.Get("/ping", controller.Health)
}
