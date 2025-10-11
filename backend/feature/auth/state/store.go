package state

import (
	"context"
	"time"

	"github.com/redis/go-redis/v9"
)

type Store interface {
	Save(ctx context.Context, state string, ttl time.Duration) error
	Consume(ctx context.Context, state string) (bool, error)
}

type redisStore struct {
	client *redis.Client
}

func NewRedisStore(client *redis.Client) Store {
	return &redisStore{client: client}
}

func (s *redisStore) Save(ctx context.Context, state string, ttl time.Duration) error {
	return s.client.Set(ctx, stateKey(state), "1", ttl).Err()
}

func (s *redisStore) Consume(ctx context.Context, state string) (bool, error) {
	key := stateKey(state)
	res, err := s.client.Del(ctx, key).Result()
	if err != nil {
		return false, err
	}
	return res == 1, nil
}

func stateKey(state string) string {
	return "oauth:state:" + state
}
