package router

import (
	"strings"

	"backend/api/controller"
	"backend/api/controller/middleware"
	"backend/api/router/private"
	"backend/api/router/public"
	"backend/feature/auth/session"
	"backend/pkg"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

type Dependencies struct {
	Config         pkg.AppConfig
	AuthController *controller.AuthController
	PingController *controller.PingController
	SessionStore   session.Store
}

func Setup(app *fiber.App, deps Dependencies) {
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: strings.Join(deps.Config.AllowedOrigins, ","),
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
	}))

	publicRouter := app.Group("/")
	public.NewPingRouter(publicRouter, deps.PingController)
	public.NewAuthRouter(publicRouter, deps.AuthController)

	profileRouter := app.Group("/profile", middleware.JWTAuthMiddleware(deps.Config.SecretKey, deps.SessionStore))
	private.NewProfileRouter(profileRouter, deps.AuthController)

	authRouter := app.Group("/auth", middleware.JWTAuthMiddleware(deps.Config.SecretKey, deps.SessionStore))
	private.NewAuthRouter(authRouter, deps.AuthController)
}
