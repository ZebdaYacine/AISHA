package controller

import (
	"time"

	"backend/api/controller/model"

	"github.com/gofiber/fiber/v2"
)

type PingController struct{}

func NewPingController() *PingController {
	return &PingController{}
}

func (pc *PingController) Health(ctx *fiber.Ctx) error {
	return ctx.JSON(model.SuccessResponse{
		Message: "ok",
		Data: map[string]any{
			"timestamp": time.Now().UTC(),
			"service":   "aisha-backend",
		},
	})
}
