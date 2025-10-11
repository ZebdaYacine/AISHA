package repository

import (
	"context"

	"backend/feature/auth/domain/entities"
)

type AuthRepository interface {
	UpsertOAuthUser(ctx context.Context, user *entities.OAuthUser) (*entities.OAuthUser, error)
	GetUserByID(ctx context.Context, id string) (*entities.OAuthUser, error)
}
