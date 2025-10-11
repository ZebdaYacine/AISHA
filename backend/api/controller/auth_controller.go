package controller

import (
	"backend/api/controller/model"
	"backend/core"
	"backend/feature/auth/usecase"

	"github.com/gofiber/fiber/v2"
)

type AuthController struct {
	usecase usecase.AuthUsecase
}

func NewAuthController(uc usecase.AuthUsecase) *AuthController {
	return &AuthController{usecase: uc}
}

func (ac *AuthController) GoogleLogin(ctx *fiber.Ctx) error {
	url, err := ac.usecase.GoogleAuthURL(ctx.Context())
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(model.ErrorResponse{Message: err.Error()})
	}
	return ctx.Redirect(url, fiber.StatusTemporaryRedirect)
}

func (ac *AuthController) GoogleCallback(ctx *fiber.Ctx) error {
	state := ctx.Query("state")
	code := ctx.Query("code")
	if state == "" || code == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(model.ErrorResponse{Message: "missing state or code"})
	}

	result, err := ac.usecase.HandleGoogleCallback(ctx.Context(), state, code)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(model.ErrorResponse{Message: err.Error()})
	}

	return ctx.JSON(model.SuccessResponse{
		Message: "authenticated",
		Data: model.AuthResponse{
			AccessToken:  result.AccessToken,
			RefreshToken: result.RefreshToken,
			User:         result.User,
		},
	})
}

func (ac *AuthController) RefreshToken(ctx *fiber.Ctx) error {
	var req model.RefreshRequest
	if !core.ParseBody(ctx, &req) {
		return nil
	}

	if req.RefreshToken == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(model.ErrorResponse{Message: "refresh token required"})
	}

	result, err := ac.usecase.RefreshToken(ctx.Context(), req.RefreshToken)
	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(model.ErrorResponse{Message: err.Error()})
	}

	return ctx.JSON(model.SuccessResponse{
		Message: "token refreshed",
		Data: model.AuthResponse{
			AccessToken:  result.AccessToken,
			RefreshToken: result.RefreshToken,
			User:         result.User,
		},
	})
}

func (ac *AuthController) Me(ctx *fiber.Ctx) error {
	userID, err := core.GetUserID(ctx)
	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(model.ErrorResponse{Message: "unauthorized"})
	}

	user, err := ac.usecase.GetProfile(ctx.Context(), userID)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(model.ErrorResponse{Message: err.Error()})
	}

	return ctx.JSON(model.SuccessResponse{
		Message: "profile",
		Data:    user,
	})
}

func (ac *AuthController) Logout(ctx *fiber.Ctx) error {
	accessToken, err := core.GetBearerToken(ctx)
	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(model.ErrorResponse{Message: "unauthorized"})
	}

	var req model.LogoutRequest
	if err := ctx.BodyParser(&req); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(model.ErrorResponse{Message: "invalid request payload"})
	}

	if req.RefreshToken == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(model.ErrorResponse{Message: "refresh token required"})
	}

	if err := ac.usecase.Logout(ctx.Context(), accessToken, req.RefreshToken); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(model.ErrorResponse{Message: err.Error()})
	}

	return ctx.JSON(model.SuccessResponse{
		Message: "logged out",
		Data:    true,
	})
}
