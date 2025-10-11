package database

import (
	"context"
	"fmt"
	"time"

	"backend/pkg"

	"github.com/redis/go-redis/v9"
)

type Redis struct {
	Client *redis.Client
}

func NewRedis(ctx context.Context, cfg pkg.AppConfig) (*Redis, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     cfg.RedisAddr,
		Password: cfg.RedisPassword,
		DB:       cfg.RedisDB,
	})

	ctx, cancel := context.WithTimeout(ctx, 2*time.Second)
	defer cancel()

	if err := client.Ping(ctx).Err(); err != nil {
		client.Close()
		return nil, fmt.Errorf("failed to connect to redis: %w", err)
	}

	return &Redis{Client: client}, nil
}

func (r *Redis) Close() {
	if r != nil && r.Client != nil {
		_ = r.Client.Close()
	}
}
