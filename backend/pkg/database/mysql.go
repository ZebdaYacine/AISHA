package database

import (
	"context"
	"fmt"
	"time"

	ent "backend/ent"
	"backend/pkg"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	_ "github.com/go-sql-driver/mysql"
)

func NewEntClient(ctx context.Context, cfg pkg.AppConfig) (*ent.Client, error) {
	drv, err := sql.Open(dialect.MySQL, cfg.DatabaseURL)
	if err != nil {
		return nil, fmt.Errorf("failed to open mysql connection: %w", err)
	}

	db := drv.DB()
	db.SetMaxIdleConns(10)
	db.SetMaxOpenConns(50)
	db.SetConnMaxIdleTime(5 * time.Minute)
	db.SetConnMaxLifetime(60 * time.Minute)

	pingCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()
	if err := db.PingContext(pingCtx); err != nil {
		_ = drv.Close()
		return nil, fmt.Errorf("failed to ping mysql: %w", err)
	}

	client := ent.NewClient(ent.Driver(drv))

	if err := client.Schema.Create(ctx); err != nil {
		_ = client.Close()
		return nil, fmt.Errorf("failed to run ent schema migration: %w", err)
	}

	return client, nil
}
