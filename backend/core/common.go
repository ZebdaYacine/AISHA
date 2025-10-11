package core

import (
	"strings"

	"backend/api/controller/model"
	"backend/util/token"

	"github.com/gofiber/fiber/v2"
)

// ParseBody attempts to bind the request body to the provided struct pointer.
func ParseBody[T any](ctx *fiber.Ctx, payload *T) bool {
	if err := ctx.BodyParser(payload); err != nil {
		ctx.Status(fiber.StatusBadRequest).JSON(model.ErrorResponse{Message: "invalid request payload"})
		return false
	}
	return true
}

// GetUserID extracts the user identifier from the Authorization header if present.
func GetUserID(ctx *fiber.Ctx) (string, error) {
	if userID, ok := ctx.Locals("userID").(string); ok && userID != "" {
		return userID, nil
	}

	tokenString, err := GetBearerToken(ctx)
	if err != nil {
		return "", err
	}

	value, err := token.ExtractFieldFromToken(tokenString, AppConfig().SecretKey, "id")
	if err != nil {
		return "", err
	}

	if str, ok := value.(string); ok && str != "" {
		return str, nil
	}
	return "", fiber.ErrUnauthorized
}

func GetBearerToken(ctx *fiber.Ctx) (string, error) {
	if tokenString, ok := ctx.Locals("accessToken").(string); ok && tokenString != "" {
		return tokenString, nil
	}

	authHeader := ctx.Get("Authorization")
	if authHeader == "" {
		return "", fiber.ErrUnauthorized
	}

	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
		return "", fiber.ErrUnauthorized
	}

	return parts[1], nil
}
