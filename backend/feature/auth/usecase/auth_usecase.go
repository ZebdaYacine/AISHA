package usecase

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"backend/feature/auth/domain/entities"
	domainRepo "backend/feature/auth/domain/repository"
	"backend/feature/auth/session"
	"backend/feature/auth/state"
	"backend/pkg"
	"backend/util/token"

	"golang.org/x/oauth2"
)

type AuthUsecase interface {
	GoogleAuthURL(ctx context.Context) (string, error)
	HandleGoogleCallback(ctx context.Context, state, code string) (*entities.AuthResult, error)
	RefreshToken(ctx context.Context, refreshToken string) (*entities.AuthResult, error)
	Logout(ctx context.Context, accessToken, refreshToken string) error
	GetProfile(ctx context.Context, userID string) (*entities.OAuthUser, error)
}

type authUsecase struct {
	repo         domainRepo.AuthRepository
	oauthConfig  *oauth2.Config
	stateStore   state.Store
	sessionStore session.Store
	config       pkg.AppConfig
	httpClient   *http.Client
}

type googleUserInfo struct {
	ID      string `json:"sub"`
	Email   string `json:"email"`
	Name    string `json:"name"`
	Picture string `json:"picture"`
}

func NewAuthUsecase(repo domainRepo.AuthRepository, oauthConfig *oauth2.Config, stateStore state.Store, sessionStore session.Store, config pkg.AppConfig) AuthUsecase {
	return &authUsecase{
		repo:         repo,
		oauthConfig:  oauthConfig,
		stateStore:   stateStore,
		sessionStore: sessionStore,
		config:       config,
		httpClient:   &http.Client{Timeout: 10 * time.Second},
	}
}

func (u *authUsecase) GoogleAuthURL(ctx context.Context) (string, error) {
	state, err := generateState()
	if err != nil {
		return "", err
	}

	if err := u.stateStore.Save(ctx, state, u.config.OAuthStateTTL); err != nil {
		return "", fmt.Errorf("failed to persist oauth state: %w", err)
	}

	url := u.oauthConfig.AuthCodeURL(state, oauth2.AccessTypeOffline)
	return url, nil
}

func (u *authUsecase) HandleGoogleCallback(ctx context.Context, state, code string) (*entities.AuthResult, error) {
	valid, err := u.stateStore.Consume(ctx, state)
	if err != nil {
		return nil, fmt.Errorf("failed to validate state: %w", err)
	}
	if !valid {
		return nil, fmt.Errorf("invalid or expired state")
	}

	oauthToken, err := u.oauthConfig.Exchange(ctx, code)
	if err != nil {
		return nil, fmt.Errorf("failed to exchange code for token: %w", err)
	}

	userInfo, err := u.fetchGoogleUser(ctx, oauthToken)
	if err != nil {
		return nil, err
	}

	domainUser := &entities.OAuthUser{
		Provider:     "google",
		ProviderID:   userInfo.ID,
		Email:        userInfo.Email,
		Name:         userInfo.Name,
		Picture:      userInfo.Picture,
		AccessToken:  oauthToken.AccessToken,
		RefreshToken: oauthToken.RefreshToken,
		TokenType:    oauthToken.TokenType,
		ExpiresAt:    oauthToken.Expiry,
		Role:         "user",
	}

	savedUser, err := u.repo.UpsertOAuthUser(ctx, domainUser)
	if err != nil {
		return nil, fmt.Errorf("failed to persist user: %w", err)
	}

	accessToken, refreshToken, err := u.issueSessionTokens(ctx, savedUser.ID, savedUser.Role)
	if err != nil {
		return nil, err
	}

	return &entities.AuthResult{
		User:         sanitizeUser(savedUser),
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (u *authUsecase) RefreshToken(ctx context.Context, refreshToken string) (*entities.AuthResult, error) {
	if refreshToken == "" {
		return nil, fmt.Errorf("refresh token is required")
	}

	if err := token.ValidateTokenType(refreshToken, u.config.SecretKey, "refresh"); err != nil {
		return nil, fmt.Errorf("invalid refresh token: %w", err)
	}

	userID, err := u.sessionStore.ValidateRefreshToken(ctx, refreshToken)
	if err != nil {
		return nil, fmt.Errorf("refresh token expired or revoked")
	}

	user, err := u.repo.GetUserByID(ctx, userID)
	if err != nil {
		return nil, err
	}

	accessToken, newRefreshToken, err := u.issueSessionTokens(ctx, user.ID, user.Role)
	if err != nil {
		return nil, err
	}

	_ = u.sessionStore.DeleteTokens(ctx, "", refreshToken)

	return &entities.AuthResult{
		User:         sanitizeUser(user),
		AccessToken:  accessToken,
		RefreshToken: newRefreshToken,
	}, nil
}

func (u *authUsecase) Logout(ctx context.Context, accessToken, refreshToken string) error {
	if accessToken == "" && refreshToken == "" {
		return fmt.Errorf("at least one token is required")
	}
	return u.sessionStore.DeleteTokens(ctx, accessToken, refreshToken)
}

func (u *authUsecase) GetProfile(ctx context.Context, userID string) (*entities.OAuthUser, error) {
	user, err := u.repo.GetUserByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	return sanitizeUser(user), nil
}

func (u *authUsecase) fetchGoogleUser(ctx context.Context, token *oauth2.Token) (*googleUserInfo, error) {
	client := u.oauthConfig.Client(ctx, token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v3/userinfo")
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve user info: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status from google userinfo: %s", resp.Status)
	}

	var info googleUserInfo
	if err := json.NewDecoder(resp.Body).Decode(&info); err != nil {
		return nil, fmt.Errorf("failed to decode user info: %w", err)
	}

	if info.ID == "" {
		return nil, fmt.Errorf("google response missing user id")
	}

	return &info, nil
}

func (u *authUsecase) issueSessionTokens(ctx context.Context, userID, role string) (string, string, error) {
	accessToken, err := token.CreateAccessToken(userID, role, u.config.SecretKey, u.config.SessionTokenTTL)
	if err != nil {
		return "", "", fmt.Errorf("failed to generate access token: %w", err)
	}

	refreshToken, err := token.CreateRefreshToken(userID, role, u.config.SecretKey, u.config.RefreshTokenTTL)
	if err != nil {
		return "", "", fmt.Errorf("failed to generate refresh token: %w", err)
	}

	if err := u.sessionStore.SaveAccessToken(ctx, accessToken, userID, u.config.SessionTokenTTL); err != nil {
		return "", "", fmt.Errorf("failed to persist access token: %w", err)
	}

	if err := u.sessionStore.SaveRefreshToken(ctx, refreshToken, userID, u.config.RefreshTokenTTL); err != nil {
		return "", "", fmt.Errorf("failed to persist refresh token: %w", err)
	}

	return accessToken, refreshToken, nil
}

func sanitizeUser(user *entities.OAuthUser) *entities.OAuthUser {
	if user == nil {
		return nil
	}
	sanitized := *user
	sanitized.AccessToken = ""
	sanitized.RefreshToken = ""
	sanitized.TokenType = ""
	return &sanitized
}

func generateState() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", fmt.Errorf("failed to generate state: %w", err)
	}
	return base64.RawURLEncoding.EncodeToString(b), nil
}
