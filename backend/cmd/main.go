package main

import (
	"context"
	"log"

	"backend/api/controller"
	"backend/api/router"
	"backend/api/servers"
	"backend/core"
	authRepo "backend/feature/auth/repository"
	"backend/feature/auth/session"
	"backend/feature/auth/state"
	"backend/feature/auth/usecase"
	"backend/pkg"
	"backend/pkg/database"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func main() {
	ctx := context.Background()

	cfg, err := pkg.LoadConfig("backend/.env")
	if err != nil {
		log.Fatalf("failed to load configuration: %v", err)
	}
	core.InitAppConfig(cfg)

	entClient, err := database.NewEntClient(ctx, cfg)
	if err != nil {
		log.Fatalf("failed to connect to mysql via ent: %v", err)
	}
	defer entClient.Close()

	redis, err := database.NewRedis(ctx, cfg)
	if err != nil {
		log.Fatalf("failed to connect to redis: %v", err)
	}
	defer redis.Close()

	repo := authRepo.NewEntRepository(entClient)

	oauthConfig := &oauth2.Config{
		ClientID:     cfg.GoogleClientID,
		ClientSecret: cfg.GoogleClientSecret,
		RedirectURL:  cfg.GoogleRedirectURL,
		Endpoint:     google.Endpoint,
		Scopes: []string{
			"openid",
			"profile",
			"email",
		},
	}

	stateStore := state.NewRedisStore(redis.Client)
	sessionStore := session.NewRedisStore(redis.Client)
	authUsecase := usecase.NewAuthUsecase(repo, oauthConfig, stateStore, sessionStore, cfg)

	authController := controller.NewAuthController(authUsecase)
	pingController := controller.NewPingController()

	deps := router.Dependencies{
		Config:         cfg,
		AuthController: authController,
		PingController: pingController,
		SessionStore:   sessionStore,
	}

	if err := servers.InitServer(deps, core.Fiber); err != nil {
		log.Fatalf("server exited with error: %v", err)
	}
}
