package repository

import (
	"context"
	"fmt"
	"time"

	ent "backend/ent"
	entuser "backend/ent/user"
	"backend/feature/auth/domain/entities"
	domainRepo "backend/feature/auth/domain/repository"

	"github.com/google/uuid"
)

const providerGoogle = "google"

type entRepository struct {
	client *ent.Client
}

func NewEntRepository(client *ent.Client) domainRepo.AuthRepository {
	return &entRepository{client: client}
}

func (r *entRepository) UpsertOAuthUser(ctx context.Context, user *entities.OAuthUser) (*entities.OAuthUser, error) {
	if user.Provider == "" {
		user.Provider = providerGoogle
	}
	if user.Role == "" {
		user.Role = "user"
	}

	current := time.Now()

	existing, err := r.client.User.
		Query().
		Where(
			entuser.ProviderEQ(user.Provider),
			entuser.ProviderIDEQ(user.ProviderID),
		).
		Only(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, fmt.Errorf("failed to query user: %w", err)
	}

	if err == nil {
		updater := existing.Update().
			SetUpdatedAt(current).
			SetRole(user.Role).
			SetNillableEmail(optionalString(user.Email)).
			SetNillableName(optionalString(user.Name)).
			SetNillablePicture(optionalString(user.Picture)).
			SetNillableAccessToken(optionalString(user.AccessToken)).
			SetNillableRefreshToken(optionalString(user.RefreshToken)).
			SetNillableTokenType(optionalString(user.TokenType)).
			SetNillableExpiresAt(optionalTime(user.ExpiresAt))

		entUser, err := updater.Save(ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to update oauth user: %w", err)
		}
		return mapToDomain(entUser), nil
	}

	create := r.client.User.Create().
		SetProvider(user.Provider).
		SetProviderID(user.ProviderID).
		SetRole(user.Role).
		SetUpdatedAt(current).
		SetNillableEmail(optionalString(user.Email)).
		SetNillableName(optionalString(user.Name)).
		SetNillablePicture(optionalString(user.Picture))

	if user.ID != "" {
		uid, err := uuid.Parse(user.ID)
		if err != nil {
			return nil, fmt.Errorf("invalid user id: %w", err)
		}
		create.SetID(uid)
	}

	entUser, err := create.Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to create oauth user: %w", err)
	}
	return mapToDomain(entUser), nil
}

func (r *entRepository) GetUserByID(ctx context.Context, id string) (*entities.OAuthUser, error) {
	uid, err := uuid.Parse(id)
	if err != nil {
		return nil, fmt.Errorf("invalid user id: %w", err)
	}

	entUser, err := r.client.User.Get(ctx, uid)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, fmt.Errorf("user not found")
		}
		return nil, fmt.Errorf("failed to load user: %w", err)
	}
	return mapToDomain(entUser), nil
}

func mapToDomain(u *ent.User) *entities.OAuthUser {
	var (
		email   string
		name    string
		picture string
	)

	if u.Email != nil {
		email = *u.Email
	}
	if u.Name != nil {
		name = *u.Name
	}
	if u.Picture != nil {
		picture = *u.Picture
	}

	return &entities.OAuthUser{
		ID:         u.ID.String(),
		ProviderID: u.ProviderID,
		Email:      email,
		Name:       name,
		Picture:    picture,
		ExpiresAt:  valueOrZero(u.ExpiresAt),
		Role:       u.Role,
	}
}

func optionalString(value string) *string {
	if value == "" {
		return nil
	}
	return &value
}

func optionalTime(t time.Time) *time.Time {
	if t.IsZero() {
		return nil
	}
	return &t
}

func valueOrZero(t *time.Time) time.Time {
	if t == nil {
		return time.Time{}
	}
	return *t
}
