package session

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

type Store interface {
	SaveAccessToken(ctx context.Context, token, userID string, ttl time.Duration) error
	SaveRefreshToken(ctx context.Context, token, userID string, ttl time.Duration) error
	ValidateAccessToken(ctx context.Context, token string) (string, error)
	ValidateRefreshToken(ctx context.Context, token string) (string, error)
	DeleteTokens(ctx context.Context, accessToken, refreshToken string) error
}

type redisStore struct {
	client *redis.Client
}

func NewRedisStore(client *redis.Client) Store {
	return &redisStore{client: client}
}

func (s *redisStore) SaveAccessToken(ctx context.Context, token, userID string, ttl time.Duration) error {
	if token == "" || userID == "" {
		return fmt.Errorf("token and userID required")
	}
	return s.client.Set(ctx, accessKey(token), userID, ttl).Err()
}

func (s *redisStore) SaveRefreshToken(ctx context.Context, token, userID string, ttl time.Duration) error {
	if token == "" || userID == "" {
		return fmt.Errorf("token and userID required")
	}
	return s.client.Set(ctx, refreshKey(token), userID, ttl).Err()
}

func (s *redisStore) ValidateAccessToken(ctx context.Context, token string) (string, error) {
	userID, err := s.client.Get(ctx, accessKey(token)).Result()
	if err != nil {
		if err == redis.Nil {
			return "", fmt.Errorf("token not found")
		}
		return "", err
	}
	return userID, nil
}

func (s *redisStore) ValidateRefreshToken(ctx context.Context, token string) (string, error) {
	userID, err := s.client.Get(ctx, refreshKey(token)).Result()
	if err != nil {
		if err == redis.Nil {
			return "", fmt.Errorf("token not found")
		}
		return "", err
	}
	return userID, nil
}

func (s *redisStore) DeleteTokens(ctx context.Context, accessToken, refreshToken string) error {
	keys := make([]string, 0, 2)
	if accessToken != "" {
		keys = append(keys, accessKey(accessToken))
	}
	if refreshToken != "" {
		keys = append(keys, refreshKey(refreshToken))
	}
	if len(keys) == 0 {
		return fmt.Errorf("no tokens provided")
	}
	return s.client.Del(ctx, keys...).Err()
}

func accessKey(token string) string {
	return "auth:access:" + token
}

func refreshKey(token string) string {
	return "auth:refresh:" + token
}
