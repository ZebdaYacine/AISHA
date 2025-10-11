package middleware

import (
	"strings"

	"backend/api/controller/model"
	"backend/feature/auth/session"
	"backend/util/token"

	"github.com/gofiber/fiber/v2"
)

func JWTAuthMiddleware(secret string, store session.Store) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		authHeader := ctx.Get("Authorization")
		if authHeader == "" {
			return ctx.Status(fiber.StatusUnauthorized).JSON(model.ErrorResponse{Message: "missing authorization header"})
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			return ctx.Status(fiber.StatusUnauthorized).JSON(model.ErrorResponse{Message: "invalid authorization header"})
		}

		tokenString := parts[1]
		if _, err := token.Validate(tokenString, secret); err != nil {
			return ctx.Status(fiber.StatusUnauthorized).JSON(model.ErrorResponse{Message: "invalid token"})
		}

		userIDValue, err := token.ExtractFieldFromToken(tokenString, secret, "id")
		if err != nil {
			return ctx.Status(fiber.StatusUnauthorized).JSON(model.ErrorResponse{Message: "invalid token"})
		}

		userID, ok := userIDValue.(string)
		if !ok || userID == "" {
			return ctx.Status(fiber.StatusUnauthorized).JSON(model.ErrorResponse{Message: "invalid token"})
		}

		if store != nil {
			storedUserID, err := store.ValidateAccessToken(ctx.Context(), tokenString)
			if err != nil || storedUserID != userID {
				return ctx.Status(fiber.StatusUnauthorized).JSON(model.ErrorResponse{Message: "token expired"})
			}
		}

		ctx.Locals("userID", userID)
		ctx.Locals("accessToken", tokenString)

		return ctx.Next()
	}
}
