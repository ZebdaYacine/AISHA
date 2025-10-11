package servers

import (
	"fmt"

	"backend/api/router"
	"backend/core"

	"github.com/gofiber/fiber/v2"
)

func InitServer(deps router.Dependencies, serverName string) error {
	switch serverName {
	case core.Fiber:
		return fiberServer(deps)
	default:
		return fmt.Errorf("unsupported server: %s", serverName)
	}
}

func fiberServer(deps router.Dependencies) error {
	app := fiber.New()
	router.Setup(app, deps)

	addr := fmt.Sprintf("%s:%s", deps.Config.ServerAddress, deps.Config.ServerPort)
	return app.Listen(addr)
}
